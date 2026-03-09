from dataclasses import dataclass
from typing import Any

import psycopg
from psycopg.types.json import Jsonb

from app.core.config import settings


@dataclass
class RetrievedChunk:
    source: str
    chunk_id: int
    content: str
    metadata: dict[str, Any]
    score: float


class VectorRepository:
    def __init__(self, db_url: str, embedding_dimension: int) -> None:
        self.db_url = db_url
        self.embedding_dimension = embedding_dimension
        self.table_name = "rajat_profile_embeddings"

    @property
    def is_configured(self) -> bool:
        return bool(self.db_url)

    def ensure_schema(self) -> None:
        if not self.is_configured:
            return

        with psycopg.connect(self.db_url, autocommit=True) as conn:
            with conn.cursor() as cur:
                cur.execute("CREATE EXTENSION IF NOT EXISTS vector;")
                cur.execute(
                    f"""
                    CREATE TABLE IF NOT EXISTS {self.table_name} (
                        id BIGSERIAL PRIMARY KEY,
                        source TEXT NOT NULL,
                        chunk_id INTEGER NOT NULL,
                        content TEXT NOT NULL,
                        metadata JSONB NOT NULL DEFAULT '{{}}'::jsonb,
                        embedding VECTOR({self.embedding_dimension}) NOT NULL,
                        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
                    );
                    """
                )
                cur.execute(
                    f"""
                    CREATE UNIQUE INDEX IF NOT EXISTS uq_{self.table_name}_source_chunk
                    ON {self.table_name}(source, chunk_id);
                    """
                )
                cur.execute(
                    f"""
                    CREATE INDEX IF NOT EXISTS idx_{self.table_name}_embedding
                    ON {self.table_name}
                    USING ivfflat (embedding vector_cosine_ops)
                    WITH (lists = 50);
                    """
                )

    def clear_source(self, source: str) -> None:
        if not self.is_configured:
            return
        with psycopg.connect(self.db_url, autocommit=True) as conn:
            with conn.cursor() as cur:
                cur.execute(f"DELETE FROM {self.table_name} WHERE source = %s;", (source,))

    def upsert_chunks(
        self,
        source: str,
        chunks: list[tuple[int, str, dict[str, Any], list[float]]],
    ) -> None:
        if not self.is_configured or not chunks:
            return

        with psycopg.connect(self.db_url, autocommit=True) as conn:
            with conn.cursor() as cur:
                for chunk_id, content, metadata, embedding in chunks:
                    embedding_vector = "[" + ",".join(f"{value:.8f}" for value in embedding) + "]"
                    cur.execute(
                        f"""
                        INSERT INTO {self.table_name} (source, chunk_id, content, metadata, embedding)
                        VALUES (%s, %s, %s, %s, %s::vector)
                        ON CONFLICT (source, chunk_id)
                        DO UPDATE SET
                            content = EXCLUDED.content,
                            metadata = EXCLUDED.metadata,
                            embedding = EXCLUDED.embedding;
                        """,
                        (source, chunk_id, content, Jsonb(metadata), embedding_vector),
                    )

    def similarity_search(self, query_embedding: list[float], top_k: int = 4) -> list[RetrievedChunk]:
        if not self.is_configured:
            return []

        query_vector = "[" + ",".join(f"{value:.8f}" for value in query_embedding) + "]"

        with psycopg.connect(self.db_url, autocommit=True) as conn:
            with conn.cursor() as cur:
                cur.execute(
                    f"""
                    SELECT source, chunk_id, content, metadata, (embedding <=> %s::vector) AS distance
                    FROM {self.table_name}
                    ORDER BY embedding <=> %s::vector
                    LIMIT %s;
                    """,
                    (query_vector, query_vector, top_k),
                )
                rows = cur.fetchall()

        chunks: list[RetrievedChunk] = []
        for source, chunk_id, content, metadata, distance in rows:
            score = 1.0 - float(distance)
            chunks.append(
                RetrievedChunk(
                    source=source,
                    chunk_id=chunk_id,
                    content=content,
                    metadata=metadata or {},
                    score=score,
                )
            )
        return chunks


vector_repository = VectorRepository(
    db_url=settings.supabase_db_url,
    embedding_dimension=settings.embedding_dimension,
)
