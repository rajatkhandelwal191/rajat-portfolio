from functools import lru_cache
import json
import logging
from urllib import error as urllib_error
from urllib import request as urllib_request

from app.core.config import settings

logger = logging.getLogger("app.embedding_service")


class EmbeddingService:
    def __init__(self) -> None:
        self.provider = settings.resolved_embedding_provider()
        self._embeddings = None
        self._gemini_model: str | None = None
        self._gemini_api_key: str | None = None

        if self.provider == "none":
            logger.warning("Embedding provider disabled (provider=none); retrieval will use keyword fallback.")
            return

        if self.provider == "local":
            try:
                from langchain_huggingface import HuggingFaceEmbeddings
            except ModuleNotFoundError as exc:  # pragma: no cover - runtime dependency guard
                raise RuntimeError(
                    "langchain-huggingface is not installed. Use `poetry install --with local` or switch to EMBEDDING_PROVIDER=gemini."
                ) from exc
            self._embeddings = HuggingFaceEmbeddings(
                model_name=settings.embedding_model_name,
                model_kwargs={"device": "cpu"},
                encode_kwargs={"normalize_embeddings": True},
            )
            return

        if self.provider == "gemini":
            if not settings.gemini_api_key:
                raise RuntimeError("GEMINI_API_KEY is missing while EMBEDDING_PROVIDER=gemini.")
            model = settings.gemini_embedding_model.strip() or "models/text-embedding-004"
            if not model.startswith("models/"):
                model = f"models/{model}"
            self._gemini_model = model
            self._gemini_api_key = settings.gemini_api_key
            return

        raise RuntimeError(f"Unsupported embedding provider: {self.provider}")

    @property
    def model(self):
        if self.provider != "local" or self._embeddings is None:
            raise RuntimeError("Embedding model object is available only for local provider.")
        return self._embeddings

    @property
    def supports_faiss(self) -> bool:
        return self.provider == "local"

    @property
    def is_enabled(self) -> bool:
        return self.provider != "none"

    def _gemini_embed(self, text: str, task_type: str) -> list[float]:
        if not self._gemini_model or not self._gemini_api_key:
            raise RuntimeError("Gemini embedding provider is not initialized.")
        payload = {
            "model": self._gemini_model,
            "content": {"parts": [{"text": text or " "}]},
            "taskType": task_type,
            "outputDimensionality": settings.embedding_dimension,
        }
        endpoint = (
            f"https://generativelanguage.googleapis.com/v1beta/{self._gemini_model}:embedContent"
            f"?key={self._gemini_api_key}"
        )
        req = urllib_request.Request(
            url=endpoint,
            data=json.dumps(payload).encode("utf-8"),
            headers={"Content-Type": "application/json"},
            method="POST",
        )
        try:
            with urllib_request.urlopen(req, timeout=30) as response:
                response_data = json.loads(response.read().decode("utf-8"))
        except urllib_error.HTTPError as exc:
            body = exc.read().decode("utf-8", errors="ignore")
            raise RuntimeError(f"Gemini embedding HTTP {exc.code}: {body[:300]}") from exc
        except urllib_error.URLError as exc:
            raise RuntimeError(f"Gemini embedding network error: {exc}") from exc

        values = response_data.get("embedding", {}).get("values", [])
        if not values:
            raise RuntimeError("Gemini embedding response did not return vector values.")
        return [float(value) for value in values]

    def embed_documents(self, texts: list[str]) -> list[list[float]]:
        if not texts:
            return []
        if self.provider == "local":
            return self._embeddings.embed_documents(texts)
        if self.provider == "gemini":
            return [self._gemini_embed(text, task_type="RETRIEVAL_DOCUMENT") for text in texts]
        raise RuntimeError("Embeddings are disabled (provider=none).")

    def embed_query(self, text: str) -> list[float]:
        if self.provider == "local":
            return self._embeddings.embed_query(text)
        if self.provider == "gemini":
            return self._gemini_embed(text, task_type="RETRIEVAL_QUERY")
        raise RuntimeError("Embeddings are disabled (provider=none).")


@lru_cache
def get_embedding_service() -> EmbeddingService:
    return EmbeddingService()
