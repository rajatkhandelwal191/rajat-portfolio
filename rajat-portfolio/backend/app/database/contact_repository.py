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


contact_repository = ContactRepository(settings.supabase_db_url)
