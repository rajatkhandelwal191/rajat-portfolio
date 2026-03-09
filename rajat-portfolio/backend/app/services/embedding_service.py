from functools import lru_cache

from langchain_huggingface import HuggingFaceEmbeddings

from app.core.config import settings


class EmbeddingService:
    def __init__(self) -> None:
        self._embeddings = HuggingFaceEmbeddings(
            model_name=settings.embedding_model_name,
            model_kwargs={"device": "cpu"},
            encode_kwargs={"normalize_embeddings": True},
        )

    @property
    def model(self) -> HuggingFaceEmbeddings:
        return self._embeddings

    def embed_documents(self, texts: list[str]) -> list[list[float]]:
        return self._embeddings.embed_documents(texts)

    def embed_query(self, text: str) -> list[float]:
        return self._embeddings.embed_query(text)


@lru_cache
def get_embedding_service() -> EmbeddingService:
    return EmbeddingService()
