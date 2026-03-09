# Rajat Portfolio

Monorepo for a personal portfolio website with an AI assistant.

## Stack
- Frontend: Next.js (App Router), Tailwind CSS, Framer Motion
- Backend: FastAPI, Poetry, LangChain
- Data: Supabase + pgvector
- Deploy: Vercel (frontend), fly.io (backend)

## Project Structure
- `frontend/` Next.js app
- `backend/` FastAPI + LangChain app
- `.env` local environment configuration
- `tracking.md` implementation and bug-fix log

## Quick Start
### 1) Clone and configure
1. Copy `.env.example` values into `.env` and fill real keys.

### 2) Frontend
```bash
cd frontend
npm install
npm run dev
```

### 3) Backend
```bash
cd backend
poetry install
poetry run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Embedding modes
- Cloud recommended: `EMBEDDING_PROVIDER=gemini`, `GEMINI_API_KEY=...`, `USE_FAISS=false`
- Local only: `EMBEDDING_PROVIDER=local`, `USE_LOCAL_EMBEDDINGS=true`, `USE_FAISS=true`
- No embeddings fallback: `EMBEDDING_PROVIDER=none` (keyword search only)

For local embedding/FAISS workflows only (not needed on Fly):
```bash
cd backend
poetry install --with local
```

## Backend Endpoints
- `GET /health` - API health check
- `GET /bootstrap` - startup indexing/bootstrap status
- `POST /api/chat` - RajatGPT chat endpoint
- `POST /api/chat/ingest` - force re-ingest profile markdown and refresh vectors

Sample chat request:
```bash
curl -X POST http://localhost:8000/api/chat \
  -H "Content-Type: application/json" \
  -d "{\"message\":\"Tell me about Rajat's AI experience\"}"
```

## Notes
- Keep secrets in `.env` only.
- Update `tracking.md` after each change or bug fix.
