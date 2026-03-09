from functools import lru_cache

from langchain_core.messages import AIMessage, BaseMessage, HumanMessage, SystemMessage
from langchain_core.tools import tool
from langchain_groq import ChatGroq
from langgraph.graph import END, START, StateGraph
from langgraph.prebuilt import ToolNode
from pydantic import BaseModel, ConfigDict, Field

from app.core.config import settings
from app.services.retrieval_service import retrieval_service

SYSTEM_PROMPT = """
You are RajatGPT, a portfolio assistant for Rajat Khandelwal.

Rules:
1) Answer only from provided profile knowledge and tool results.
2) If information is missing, say that clearly and ask a short follow-up.
3) Keep answers concise and professional.
4) Do not invent contact details, companies, dates, or achievements.
"""


def _render_chunks(chunks: list[dict[str, object]], heading: str) -> str:
    if not chunks:
        return f"{heading}: no matches found."

    lines = [f"{heading}:"]
    for index, chunk in enumerate(chunks, start=1):
        content = str(chunk.get("content", "")).strip().replace("\n", " ")
        score = chunk.get("score", 0.0)
        lines.append(f"{index}. score={score:.4f} | {content}")
    return "\n".join(lines)


@tool
def search_faiss(query: str) -> str:
    """Search Rajat profile data from FAISS vector index."""
    results = retrieval_service.search_faiss(query=query, top_k=4)
    return _render_chunks(results, "FAISS context")


@tool
def search_postgres(query: str) -> str:
    """Search Rajat profile data from Supabase Postgres pgvector table."""
    results = retrieval_service.search_postgres(query=query, top_k=4)
    return _render_chunks(results, "Postgres context")


TOOLS = [search_faiss, search_postgres]
tool_node = ToolNode(TOOLS)


class ChatState(BaseModel):
    question: str
    messages: list[BaseMessage] = Field(default_factory=list)
    answer: str = ""

    model_config = ConfigDict(arbitrary_types_allowed=True)


@lru_cache
def get_llm() -> ChatGroq:
    if not settings.groq_api_key:
        raise RuntimeError("GROQ_API_KEY is missing in environment.")
    return ChatGroq(
        model=settings.groq_model,
        api_key=settings.groq_api_key,
        temperature=0.2,
    )


def _agent_node(state: ChatState) -> dict[str, object]:
    llm = get_llm().bind_tools(TOOLS)
    response = llm.invoke(state.messages)
    return {"messages": [*state.messages, response]}


def _seed_tools_node(state: ChatState) -> dict[str, object]:
    seed_call = AIMessage(
        content="Gather profile context before answering.",
        tool_calls=[
            {
                "name": "search_faiss",
                "args": {"query": state.question},
                "id": "seed_faiss",
                "type": "tool_call",
            },
            {
                "name": "search_postgres",
                "args": {"query": state.question},
                "id": "seed_postgres",
                "type": "tool_call",
            },
        ],
    )
    return {"messages": [*state.messages, seed_call]}


def _tools_node(state: ChatState) -> dict[str, object]:
    result = tool_node.invoke({"messages": state.messages})
    tool_messages = result.get("messages", [])
    return {"messages": [*state.messages, *tool_messages]}


def _route(state: ChatState) -> str:
    if not state.messages:
        return "final"
    last_message = state.messages[-1]
    if isinstance(last_message, AIMessage) and last_message.tool_calls:
        return "tools"
    return "final"


def _finalize_node(state: ChatState) -> dict[str, str]:
    for message in reversed(state.messages):
        if isinstance(message, AIMessage):
            if isinstance(message.content, str):
                return {"answer": message.content.strip()}
            return {"answer": str(message.content)}
    return {"answer": "I could not generate a response yet. Please try again."}


@lru_cache
def get_chat_graph():
    graph = StateGraph(ChatState)
    graph.add_node("seed_tools", _seed_tools_node)
    graph.add_node("agent", _agent_node)
    graph.add_node("tools", _tools_node)
    graph.add_node("final", _finalize_node)

    graph.add_edge(START, "seed_tools")
    graph.add_edge("seed_tools", "tools")
    graph.add_edge("tools", "agent")
    graph.add_conditional_edges("agent", _route, {"tools": "tools", "final": "final"})
    graph.add_edge("final", END)
    return graph.compile()


def run_chat(question: str) -> str:
    initial_state = ChatState(
        question=question,
        messages=[SystemMessage(content=SYSTEM_PROMPT), HumanMessage(content=question)],
    )
    result = get_chat_graph().invoke(initial_state)
    return str(result.get("answer", "")).strip()
