from functools import lru_cache

from app.core.config import settings


class EmbeddingService:
    def __init__(self) -> None:
        if not settings.use_local_embeddings:
            raise RuntimeError("Local embeddings are disabled by configuration.")
        try:
            from langchain_huggingface import HuggingFaceEmbeddings
        except ModuleNotFoundError as exc:  # pragma: no cover - runtime dependency guard
            raise RuntimeError(
                "langchain-huggingface is not installed. Enable local embeddings only when this package is available."
            ) from exc
        self._embeddings = HuggingFaceEmbeddings(
            model_name=settings.embedding_model_name,
            model_kwargs={"device": "cpu"},
            encode_kwargs={"normalize_embeddings": True},
        )

    @property
    def model(self):
        return self._embeddings

    def embed_documents(self, texts: list[str]) -> list[list[float]]:
        return self._embeddings.embed_documents(texts)

    def embed_query(self, text: str) -> list[float]:
        return self._embeddings.embed_query(text)


@lru_cache
def get_embedding_service() -> EmbeddingService:
    return EmbeddingService()
