from typing import Any

import psycopg
from psycopg.types.json import Jsonb

from app.core.config import settings


class ContactRepository:
    def __init__(self, db_url: str) -> None:
        self.db_url = db_url
        self.table_name = "contact_submissions"

    @property
    def is_configured(self) -> bool:
        return bool(self.db_url)

    def ensure_schema(self) -> None:
        if not self.is_configured:
            return

        with psycopg.connect(self.db_url, autocommit=True) as conn:
            with conn.cursor() as cur:
                cur.execute(
                    f"""
                    CREATE TABLE IF NOT EXISTS {self.table_name} (
                        id BIGSERIAL PRIMARY KEY,
                        name TEXT NOT NULL,
                        email TEXT NOT NULL,
                        company TEXT,
                        message TEXT NOT NULL,
                        metadata JSONB NOT NULL DEFAULT '{{}}'::jsonb,
                        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
                    );
                    """
                )
                cur.execute(
                    f"""
                    CREATE INDEX IF NOT EXISTS idx_{self.table_name}_created_at
                    ON {self.table_name}(created_at DESC);
                    """
                )

    def insert_submission(
        self,
        *,
        name: str,
        email: str,
        company: str | None,
        message: str,
        metadata: dict[str, Any] | None = None,
    ) -> int:
        if not self.is_configured:
            raise RuntimeError("Database is not configured for contact submissions.")

        self.ensure_schema()

        with psycopg.connect(self.db_url, autocommit=True) as conn:
            with conn.cursor() as cur:
                cur.execute(
                    f"""
                    INSERT INTO {self.table_name} (name, email, company, message, metadata)
                    VALUES (%s, %s, %s, %s, %s)
                    RETURNING id;
                    """,
                    (name, email, company, message, Jsonb(metadata or {})),
                )
                row = cur.fetchone()
                if not row:
                    raise RuntimeError("Failed to store contact submission.")
                return int(row[0])

    def list_submissions(
        self,
        *,
        name: str | None = None,
        email: str | None = None,
        company: str | None = None,
        date_from: str | None = None,
        date_to: str | None = None,
        limit: int = 100,
    ) -> list[dict[str, Any]]:
        if not self.is_configured:
            raise RuntimeError("Database is not configured for contact submissions.")

        self.ensure_schema()
        safe_limit = max(1, min(limit, 500))

        where_clauses: list[str] = []
        params: list[Any] = []

        if name:
            where_clauses.append("name ILIKE %s")
            params.append(f"%{name.strip()}%")
        if email:
            where_clauses.append("email ILIKE %s")
            params.append(f"%{email.strip()}%")
        if company:
            where_clauses.append("company ILIKE %s")
            params.append(f"%{company.strip()}%")
        if date_from:
            where_clauses.append("created_at::date >= %s::date")
            params.append(date_from)
        if date_to:
            where_clauses.append("created_at::date <= %s::date")
            params.append(date_to)

        where_sql = f"WHERE {' AND '.join(where_clauses)}" if where_clauses else ""

        with psycopg.connect(self.db_url, autocommit=True) as conn:
            with conn.cursor() as cur:
                cur.execute(
                    f"""
                    SELECT id, name, email, company, message, metadata, created_at
                    FROM {self.table_name}
                    {where_sql}
                    ORDER BY created_at DESC
                    LIMIT %s;
                    """,
                    (*params, safe_limit),
                )
                rows = cur.fetchall()

        return [
            {
                "id": int(row[0]),
                "name": row[1],
                "email": row[2],
                "company": row[3] or "",
                "message": row[4],
                "metadata": row[5] or {},
                "created_at": row[6],
            }
            for row in rows
        ]


contact_repository = ContactRepository(settings.supabase_db_url)
