import logging

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

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
