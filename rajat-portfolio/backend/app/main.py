from contextlib import asynccontextmanager
import logging
from time import perf_counter

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

from app.api.chat_routes import router as chat_router
from app.api.contact_routes import router as contact_router
from app.core.config import settings
from app.database.contact_repository import contact_repository
from app.core.logging_config import configure_logging
from app.services.chat_service import initialize_chat_service

configure_logging()
logger = logging.getLogger("app.main")


@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        if contact_repository.is_configured:
            try:
                contact_repository.ensure_schema()
                logger.info("Contact submissions schema ensured.")
            except Exception as contact_exc:  # pragma: no cover - external db failures
                logger.exception("Failed to ensure contact submissions schema: %s", contact_exc)
        app.state.bootstrap = initialize_chat_service()
        logger.info("Bootstrap completed: %s", app.state.bootstrap)
    except Exception as exc:  # pragma: no cover - startup fallback path
        app.state.bootstrap = {"error": str(exc)}
        logger.exception("Bootstrap failed: %s", exc)
    yield


app = FastAPI(title="Rajat Portfolio API", version="0.1.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.middleware("http")
async def log_requests(request: Request, call_next):
    start = perf_counter()
    logger.info("Request started: %s %s", request.method, request.url.path)
    try:
        response = await call_next(request)
    except Exception as exc:  # pragma: no cover - middleware exception path
        duration_ms = (perf_counter() - start) * 1000
        logger.exception(
            "Request failed: %s %s | duration_ms=%.2f | error=%s",
            request.method,
            request.url.path,
            duration_ms,
            exc,
        )
        raise

    duration_ms = (perf_counter() - start) * 1000
    logger.info(
        "Request finished: %s %s | status=%s | duration_ms=%.2f",
        request.method,
        request.url.path,
        response.status_code,
        duration_ms,
    )
    return response


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/bootstrap")
def bootstrap_status() -> dict[str, object]:
    return getattr(app.state, "bootstrap", {"status": "unknown"})


app.include_router(chat_router, prefix="/api/chat", tags=["chat"])
app.include_router(contact_router, prefix="/api/contact", tags=["contact"])
