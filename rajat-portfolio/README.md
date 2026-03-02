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

## Notes
- Keep secrets in `.env` only.
- Update `tracking.md` after each change or bug fix.
