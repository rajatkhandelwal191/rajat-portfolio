import asyncio
from datetime import datetime, timedelta, timezone
import logging
from time import perf_counter
from typing import Any

from langchain_core.messages import HumanMessage

from app.core.config import settings
from app.database.vector_repository import vector_repository
from app.services.langgraph_agent import get_llm

logger = logging.getLogger("app.keepalive")


class KeepAliveService:
    def __init__(self) -> None:
        self.is_running: bool = False
        self._task: asyncio.Task[None] | None = None
        self.last_supabase_result: dict[str, Any] | None = None
        self.last_groq_result: dict[str, Any] | None = None
        self.next_supabase_at: datetime | None = None
        self.next_groq_at: datetime | None = None

    @property
    def supabase_interval(self) -> timedelta:
        return timedelta(hours=settings.supabase_keepalive_hours)

    @property
    def groq_interval(self) -> timedelta:
        return timedelta(hours=settings.groq_keepalive_hours)

    async def ping_supabase(self) -> dict[str, Any]:
        """Runs a lightweight count query on Supabase PostgreSQL to prevent project auto-pausing."""
        if not vector_repository.is_configured:
            return {
                "status": "skipped",
                "timestamp": datetime.now(timezone.utc).isoformat(),
                "message": "Supabase database URL is not configured",
            }

        start = perf_counter()
        try:
            def _query() -> int:
                with vector_repository._connect() as conn:
                    with conn.cursor() as cur:
                        cur.execute("SELECT COUNT(*) FROM rajat_profile_embeddings;")
                        row = cur.fetchone()
                        return int(row[0]) if row else 0

            count = await asyncio.to_thread(_query)
            duration_ms = (perf_counter() - start) * 1000
            result = {
                "status": "ok",
                "timestamp": datetime.now(timezone.utc).isoformat(),
                "duration_ms": round(duration_ms, 2),
                "chunk_count": count,
                "error": None,
            }
            logger.info(
                "Supabase keep-alive successful: %d chunks found | duration=%.2fms",
                count,
                duration_ms,
            )
            return result
        except Exception as exc:
            duration_ms = (perf_counter() - start) * 1000
            result = {
                "status": "error",
                "timestamp": datetime.now(timezone.utc).isoformat(),
                "duration_ms": round(duration_ms, 2),
                "chunk_count": None,
                "error": str(exc),
            }
            logger.exception("Supabase keep-alive check failed: %s", exc)
            return result

    async def ping_groq(self) -> dict[str, Any]:
        """Runs a minimal token completion request to Groq LLM to keep API connectivity verified."""
        if not settings.groq_api_key:
            return {
                "status": "skipped",
                "timestamp": datetime.now(timezone.utc).isoformat(),
                "message": "GROQ_API_KEY is not configured",
            }

        start = perf_counter()
        try:
            llm = get_llm()
            response = await llm.ainvoke(
                [HumanMessage(content="Health check ping. Reply with 'pong'.")]
            )
            content = str(response.content).strip()
            duration_ms = (perf_counter() - start) * 1000
            result = {
                "status": "ok",
                "timestamp": datetime.now(timezone.utc).isoformat(),
                "duration_ms": round(duration_ms, 2),
                "response": content[:100],
                "error": None,
            }
            logger.info(
                "Groq keep-alive successful: '%s' | duration=%.2fms",
                content[:30],
                duration_ms,
            )
            return result
        except Exception as exc:
            duration_ms = (perf_counter() - start) * 1000
            result = {
                "status": "error",
                "timestamp": datetime.now(timezone.utc).isoformat(),
                "duration_ms": round(duration_ms, 2),
                "response": None,
                "error": str(exc),
            }
            logger.exception("Groq keep-alive check failed: %s", exc)
            return result

    async def trigger_check(self, target: str = "all") -> dict[str, Any]:
        """Manually or periodically trigger keepalive checks for Supabase, Groq, or both."""
        now = datetime.now(timezone.utc)
        results: dict[str, Any] = {}

        tasks = []
        keys = []

        if target in ("all", "supabase"):
            tasks.append(self.ping_supabase())
            keys.append("supabase")

        if target in ("all", "groq"):
            tasks.append(self.ping_groq())
            keys.append("groq")

        if tasks:
            outcomes = await asyncio.gather(*tasks, return_exceptions=True)
            for key, outcome in zip(keys, outcomes):
                if isinstance(outcome, Exception):
                    res = {
                        "status": "error",
                        "timestamp": now.isoformat(),
                        "error": str(outcome),
                    }
                else:
                    res = outcome
                if key == "supabase":
                    self.last_supabase_result = res
                    self.next_supabase_at = now + self.supabase_interval
                elif key == "groq":
                    self.last_groq_result = res
                    self.next_groq_at = now + self.groq_interval
                results[key] = res

        return results

    def get_status(self) -> dict[str, Any]:
        """Returns the current state and metrics of the keepalive service."""
        return {
            "enabled": settings.enable_keepalive,
            "running": self.is_running,
            "supabase": {
                "interval_hours": settings.supabase_keepalive_hours,
                "last_result": self.last_supabase_result,
                "next_run": self.next_supabase_at.isoformat() if self.next_supabase_at else None,
            },
            "groq": {
                "interval_hours": settings.groq_keepalive_hours,
                "last_result": self.last_groq_result,
                "next_run": self.next_groq_at.isoformat() if self.next_groq_at else None,
            },
        }

    async def _loop(self) -> None:
        """Background loop executing checks on schedule."""
        logger.info(
            "KeepAliveService background loop started (Supabase every %sh, Groq every %sh)",
            settings.supabase_keepalive_hours,
            settings.groq_keepalive_hours,
        )

        if settings.keepalive_run_on_startup:
            logger.info("Executing initial keepalive check on startup...")
            await self.trigger_check("all")

        while self.is_running:
            try:
                await asyncio.sleep(60)  # Check every 60 seconds
                if not self.is_running:
                    break

                now = datetime.now(timezone.utc)
                if self.next_supabase_at and now >= self.next_supabase_at:
                    await self.trigger_check("supabase")

                if self.next_groq_at and now >= self.next_groq_at:
                    await self.trigger_check("groq")

            except asyncio.CancelledError:
                logger.info("KeepAliveService background loop cancelled.")
                break
            except Exception as loop_exc:
                logger.exception("Unexpected error in keepalive loop: %s", loop_exc)
                await asyncio.sleep(60)

    def start(self) -> None:
        if not settings.enable_keepalive:
            logger.info("KeepAliveService is disabled by configuration (ENABLE_KEEPALIVE=false).")
            return

        if self.is_running:
            return

        self.is_running = True
        self._task = asyncio.create_task(self._loop(), name="keepalive_service_loop")

    async def stop(self) -> None:
        if not self.is_running:
            return

        self.is_running = False
        if self._task:
            self._task.cancel()
            try:
                await self._task
            except asyncio.CancelledError:
                pass
            self._task = None
        logger.info("KeepAliveService stopped.")


keepalive_service = KeepAliveService()
