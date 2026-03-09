from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.services.chat_service import generate_chat_response, ingest_knowledge_base

router = APIRouter()


class ChatRequest(BaseModel):
    message: str


class ChatResponse(BaseModel):
    reply: str


class IngestRequest(BaseModel):
    reset: bool = True


class IngestResponse(BaseModel):
    status: str
    detail: dict[str, object]


@router.post("", response_model=ChatResponse)
def chat(request: ChatRequest) -> ChatResponse:
    try:
        reply = generate_chat_response(request.message)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Chat pipeline failed: {exc}") from exc
    return ChatResponse(reply=reply)


@router.post("/ingest", response_model=IngestResponse)
def ingest(request: IngestRequest) -> IngestResponse:
    try:
        detail = ingest_knowledge_base(reset=request.reset)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Ingestion failed: {exc}") from exc
    return IngestResponse(status="ok", detail=detail)
