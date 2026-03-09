from app.services.langgraph_agent import run_chat
from app.services.retrieval_service import retrieval_service


def initialize_chat_service() -> dict[str, object]:
    return retrieval_service.bootstrap()


def ingest_knowledge_base(reset: bool = True) -> dict[str, object]:
    return retrieval_service.ingest_profile(reset=reset)


def generate_chat_response(message: str) -> str:
    return run_chat(message)
