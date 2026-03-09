from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.chat_routes import router as chat_router
from app.core.config import settings
from app.services.chat_service import initialize_chat_service


@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        app.state.bootstrap = initialize_chat_service()
    except Exception as exc:  # pragma: no cover - startup fallback path
        app.state.bootstrap = {"error": str(exc)}
    yield


app = FastAPI(title="Rajat Portfolio API", version="0.1.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/bootstrap")
def bootstrap_status() -> dict[str, object]:
    return getattr(app.state, "bootstrap", {"status": "unknown"})


app.include_router(chat_router, prefix="/api/chat", tags=["chat"])
