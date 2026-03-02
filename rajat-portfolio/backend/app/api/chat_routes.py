from fastapi import APIRouter
from pydantic import BaseModel

from app.services.chat_service import generate_chat_response

router = APIRouter()


class ChatRequest(BaseModel):
    message: str


class ChatResponse(BaseModel):
    reply: str


@router.post("", response_model=ChatResponse)
def chat(request: ChatRequest) -> ChatResponse:
    reply = generate_chat_response(request.message)
    return ChatResponse(reply=reply)
