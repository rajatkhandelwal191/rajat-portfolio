import logging

from app.services.langgraph_agent import run_chat
from app.services.retrieval_service import retrieval_service

logger = logging.getLogger("app.chat_service")


def initialize_chat_service() -> dict[str, object]:
    logger.info("Initializing chat service bootstrap")
    details = retrieval_service.bootstrap()
    logger.info("Chat service bootstrap result: %s", details)
    return details


def ingest_knowledge_base(reset: bool = True) -> dict[str, object]:
    logger.info("Ingest knowledge base called | reset=%s", reset)
    details = retrieval_service.ingest_profile(reset=reset)
    logger.info("Ingest knowledge base result: %s", details)
    return details


def generate_chat_response(message: str) -> str:
    logger.info("Generate chat response called | message_preview=%s", message[:120])
    response = run_chat(message)
    logger.info("Generate chat response finished | reply_chars=%s", len(response))
    return response
