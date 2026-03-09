from pathlib import Path

from langchain_core.documents import Document

from app.core.config import settings

SOURCE_ID = "rajat_profile_markdown"


def load_profile_markdown() -> str:
    profile_path = Path(settings.profile_markdown_path)
    if not profile_path.exists():
        raise FileNotFoundError(f"Profile markdown file not found: {profile_path}")
    return profile_path.read_text(encoding="utf-8")


def chunk_profile_markdown(content: str, chunk_size: int = 900) -> list[str]:
    paragraphs = [part.strip() for part in content.split("\n\n") if part.strip()]
    chunks: list[str] = []
    current_chunk = ""

    for paragraph in paragraphs:
        candidate = f"{current_chunk}\n\n{paragraph}".strip() if current_chunk else paragraph
        if len(candidate) <= chunk_size:
            current_chunk = candidate
            continue

        if current_chunk:
            chunks.append(current_chunk)

        if len(paragraph) <= chunk_size:
            current_chunk = paragraph
            continue

        start = 0
        while start < len(paragraph):
            end = min(start + chunk_size, len(paragraph))
            chunks.append(paragraph[start:end].strip())
            start = end
        current_chunk = ""

    if current_chunk:
        chunks.append(current_chunk)

    return chunks


def load_profile_documents() -> list[Document]:
    content = load_profile_markdown()
    chunks = chunk_profile_markdown(content)

    return [
        Document(
            page_content=chunk,
            metadata={
                "source": SOURCE_ID,
                "chunk_id": idx,
                "title": "Rajat Khandelwal Profile",
            },
        )
        for idx, chunk in enumerate(chunks)
    ]
