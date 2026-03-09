from pathlib import Path
from threading import Lock
from typing import Any

from langchain_community.vectorstores import FAISS

from app.core.config import settings
from app.database.vector_repository import RetrievedChunk, vector_repository
from app.services.embedding_service import EmbeddingService, get_embedding_service
from app.services.knowledge_base import SOURCE_ID, load_profile_documents


class RetrievalService:
    def __init__(self) -> None:
        self._embedding_service: EmbeddingService | None = None
        self._faiss_store: FAISS | None = None
        self._lock = Lock()

    @property
    def embedding_service(self) -> EmbeddingService:
        if self._embedding_service is None:
            self._embedding_service = get_embedding_service()
        return self._embedding_service

    def _format_chunk(self, content: str, source: str, chunk_id: int, score: float) -> dict[str, Any]:
        return {
            "source": source,
            "chunk_id": chunk_id,
            "content": content,
            "score": score,
        }

    def _load_faiss_from_disk(self) -> bool:
        path = Path(settings.faiss_storage_path)
        if not path.exists():
            return False

        self._faiss_store = FAISS.load_local(
            folder_path=str(path),
            embeddings=self.embedding_service.model,
            allow_dangerous_deserialization=True,
        )
        return True

    def bootstrap(self) -> dict[str, Any]:
        details: dict[str, Any] = {"faiss_loaded": False, "auto_ingested": False}
        try:
            details["faiss_loaded"] = self._load_faiss_from_disk()
        except Exception as exc:  # pragma: no cover - defensive startup fallback
            details["faiss_load_error"] = str(exc)

        if settings.auto_ingest_on_startup:
            ingest_result = self.ingest_profile(reset=False)
            details["auto_ingested"] = True
            details["ingest"] = ingest_result

        return details

    def ingest_profile(self, reset: bool = True) -> dict[str, Any]:
        with self._lock:
            documents = load_profile_documents()
            texts = [doc.page_content for doc in documents]
            metadatas = [doc.metadata for doc in documents]
            embeddings = self.embedding_service.embed_documents(texts)

            faiss_pairs = list(zip(texts, embeddings, strict=True))
            self._faiss_store = FAISS.from_embeddings(
                text_embeddings=faiss_pairs,
                embedding=self.embedding_service.model,
                metadatas=metadatas,
            )

            faiss_path = Path(settings.faiss_storage_path)
            faiss_path.mkdir(parents=True, exist_ok=True)
            self._faiss_store.save_local(folder_path=str(faiss_path))

            stored_in_postgres = False
            postgres_error: str | None = None
            if vector_repository.is_configured:
                try:
                    vector_repository.ensure_schema()
                    if reset:
                        vector_repository.clear_source(SOURCE_ID)
                    rows = [
                        (
                            metadata.get("chunk_id", index),
                            text,
                            metadata,
                            embedding,
                        )
                        for index, (metadata, text, embedding) in enumerate(
                            zip(metadatas, texts, embeddings, strict=True)
                        )
                    ]
                    vector_repository.upsert_chunks(source=SOURCE_ID, chunks=rows)
                    stored_in_postgres = True
                except Exception as exc:  # pragma: no cover - external db errors
                    postgres_error = str(exc)

            return {
                "chunks_indexed": len(texts),
                "faiss_ready": self._faiss_store is not None,
                "stored_in_postgres": stored_in_postgres,
                "postgres_error": postgres_error,
            }

    def search_faiss(self, query: str, top_k: int = 4) -> list[dict[str, Any]]:
        if not query.strip():
            return []

        with self._lock:
            if self._faiss_store is None:
                self._load_faiss_from_disk()
            if self._faiss_store is None:
                return []

            matches = self._faiss_store.similarity_search_with_score(query=query, k=top_k)

        results: list[dict[str, Any]] = []
        for document, raw_score in matches:
            metadata = document.metadata or {}
            results.append(
                self._format_chunk(
                    content=document.page_content,
                    source=metadata.get("source", SOURCE_ID),
                    chunk_id=int(metadata.get("chunk_id", -1)),
                    score=float(raw_score),
                )
            )
        return results

    def search_postgres(self, query: str, top_k: int = 4) -> list[dict[str, Any]]:
        if not query.strip() or not vector_repository.is_configured:
            return []

        query_embedding = self.embedding_service.embed_query(query)
        chunks: list[RetrievedChunk] = vector_repository.similarity_search(
            query_embedding=query_embedding,
            top_k=top_k,
        )
        return [
            self._format_chunk(
                content=chunk.content,
                source=chunk.source,
                chunk_id=chunk.chunk_id,
                score=chunk.score,
            )
            for chunk in chunks
        ]


retrieval_service = RetrievalService()
