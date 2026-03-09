import logging

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.core.config import settings
from app.services.embedding_service import get_embedding_service
from app.services.chat_service import generate_chat_response, ingest_knowledge_base

router = APIRouter()
logger = logging.getLogger("app.chat_routes")


class ChatRequest(BaseModel):
    message: str


class ChatResponse(BaseModel):
    reply: str


class IngestRequest(BaseModel):
    reset: bool = True


class IngestResponse(BaseModel):
    status: str
    detail: dict[str, object]


class FrontendEventRequest(BaseModel):
    level: str = "info"
    event: str
    context: dict[str, object] = {}


class EmbeddingStatusResponse(BaseModel):
    configured_provider: str
    resolved_provider: str
    embeddings_enabled: bool
    supports_faiss: bool
    embedding_dimension: int
    local_embedding_model: str
    gemini_embedding_model: str
    gemini_key_configured: bool
    gemini_key_suffix: str | None = None
    probe_text: str
    probe_vector_dimension: int | None = None
    probe_error: str | None = None
    initialization_error: str | None = None


@router.post("", response_model=ChatResponse)
def chat(request: ChatRequest) -> ChatResponse:
    logger.info("Chat request received | message_preview=%s", request.message[:120])
    try:
        reply = generate_chat_response(request.message)
    except Exception as exc:
        logger.exception("Chat pipeline failed: %s", exc)
        raise HTTPException(status_code=500, detail=f"Chat pipeline failed: {exc}") from exc
    logger.info("Chat request succeeded | reply_chars=%s", len(reply))
    return ChatResponse(reply=reply)


@router.post("/ingest", response_model=IngestResponse)
def ingest(request: IngestRequest) -> IngestResponse:
    logger.info("Ingest requested | reset=%s", request.reset)
    try:
        detail = ingest_knowledge_base(reset=request.reset)
    except Exception as exc:
        logger.exception("Ingestion failed: %s", exc)
        raise HTTPException(status_code=500, detail=f"Ingestion failed: {exc}") from exc
    logger.info("Ingest succeeded | detail=%s", detail)
    return IngestResponse(status="ok", detail=detail)


@router.post("/frontend-event")
def frontend_event(request: FrontendEventRequest) -> dict[str, str]:
    payload = {"event": request.event, "context": request.context}
    level = request.level.lower().strip()

    if level == "error":
        logger.error("Frontend event: %s", payload)
    elif level == "warning":
        logger.warning("Frontend event: %s", payload)
    else:
        logger.info("Frontend event: %s", payload)

    return {"status": "logged"}


@router.get("/embedding-status", response_model=EmbeddingStatusResponse)
def embedding_status(probe: str = "Who is Rajat Khandelwal?") -> EmbeddingStatusResponse:
    suffix = settings.gemini_api_key[-4:] if settings.gemini_api_key else None
    status = EmbeddingStatusResponse(
        configured_provider=settings.embedding_provider,
        resolved_provider=settings.resolved_embedding_provider(),
        embeddings_enabled=False,
        supports_faiss=False,
        embedding_dimension=settings.embedding_dimension,
        local_embedding_model=settings.embedding_model_name,
        gemini_embedding_model=settings.gemini_embedding_model,
        gemini_key_configured=bool(settings.gemini_api_key),
        gemini_key_suffix=suffix,
        probe_text=probe,
    )
    try:
        embedding_service = get_embedding_service()
    except Exception as exc:
        status.initialization_error = str(exc)
        logger.exception("Embedding status init failed: %s", exc)
        return status

    status.embeddings_enabled = embedding_service.is_enabled
    status.supports_faiss = embedding_service.supports_faiss

    if embedding_service.is_enabled:
        try:
            vector = embedding_service.embed_query(probe)
            status.probe_vector_dimension = len(vector)
        except Exception as exc:
            status.probe_error = str(exc)
            logger.exception("Embedding status probe failed: %s", exc)

    return status
