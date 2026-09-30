# Rajat Portfolio — Operations, Architecture & Maintenance Guide

This document is the single source of truth for restarting, managing, and maintaining this repository. If you return to this project after a break, refer to this guide or ask an AI agent to read this document.

---

## 1. Quick Startup Commands

Always run the frontend and backend in **two separate terminal windows**:

### Terminal 1: Frontend (Next.js)
```powershell
cd C:\Users\rajat\OneDrive\Desktop\rajat_portfolio\rajat-portfolio\frontend
npm run dev
```
* **Local URL:** http://localhost:3000
* **Framework:** Next.js (App Router), Tailwind CSS, Framer Motion

### Terminal 2: Backend (FastAPI + LangGraph)
```powershell
cd C:\Users\rajat\OneDrive\Desktop\rajat_portfolio\rajat-portfolio\backend
poetry run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```
* **Local API URL:** http://localhost:8000
* **Interactive API Docs (Swagger):** http://localhost:8000/docs
* **Framework:** FastAPI, LangGraph, LangChain, Psycopg 3

---

## 2. Accounts, Credentials & Service IDs

| Service | Account / Email | Resource ID / Identifier | Notes & Gotchas |
| :--- | :--- | :--- | :--- |
| **Git / Repo** | `rajatkhandelwal191@gmail.com` | `rajatkhandelwal191/rajat-portfolio` | Author email in commit history. |
| **Fly.io** | **`rajjukhandelwal33712@gmail.com`** | App: `rajat-khandelwal`<br>Region: `sin` (Singapore)<br>URL: `https://rajat-khandelwal.fly.dev` | If suspended, check billing/verification on fly.io/user/settings. Deployed secret: `GROQ_MODEL=openai/gpt-oss-120b`. |
| **Supabase** | `rajatkhandelwal191@gmail.com` | Project Ref: **`hboesngotiorbxrywlsk`**<br>Region: `ap-south-1` (Mumbai) | **Auto-Pause:** Supabase free tier pauses after 7 days of inactivity. Go to supabase.com/dashboard and click **"Restore project"**. |
| **Groq Cloud** | `rajatkhandelwal191@gmail.com` | Model: **`openai/gpt-oss-120b`** | Model `llama-3.3-70b-versatile` was decommissioned/inaccessible on this tier. Active models on this key: `openai/gpt-oss-120b`, `openai/gpt-oss-20b`, `qwen/qwen3.8-27b`. |

---

## 3. Chatbot Flow (RajatGPT)

1. **User input:** User asks a question in the Next.js chat drawer.
2. **Frontend request:** POST to `http://localhost:8000/api/chat` with `{"message": "..."}`.
3. **LangGraph Agent (`app/services/langgraph_agent.py`):**
   - **Step 1:** Pre-seeds tool calls (`search_faiss` + `search_postgres`).
   - **Step 2:** Calls `retrieval_service`:
     - Queries Supabase pgvector (`rajat_profile_embeddings` table) using cosine similarity.
     - Falls back to local FAISS store (`storage/faiss`) if Supabase is offline.
   - **Step 3:** Context chunks are injected into the prompt along with the system prompt rules.
   - **Step 4:** Invokes Groq LLM (`openai/gpt-oss-120b`).
   - **Step 5:** Returns grounded answer to the frontend.
4. **Resume Request Rule:** If user asks for Rajat's resume or CV, the assistant provides `[Download Rajat's Resume](/Rajat_Khandelwal_Resume.pdf)`.

---

## 4. Chunks & Knowledge Base Architecture

* **Source File:** `backend/app/data/rajat_khandelwal_profile.md`
* **Embedding Model:** `sentence-transformers/all-MiniLM-L6-v2` (384 dimensions)
* **Total Chunks:** **29 chunks**
* **Chunk Splitter:** Paragraph-aware chunking with 900-character upper limit (`app.services.knowledge_base`).
* **Supabase Table:** `rajat_profile_embeddings` (with pgvector index and full-text search tsvector).
* **Supabase Transaction Pooler Fix:** Supabase PgBouncer pooler (port 6543) requires `prepare_threshold=None` in `psycopg.connect(...)` to prevent `DuplicatePreparedStatement: prepared statement "_pg3_0" already exists`. Configured in `vector_repository.py` and `contact_repository.py`.

### How to Re-Vectorize (Re-ingest) Profile:
Whenever you edit `rajat_khandelwal_profile.md` or want to force a refresh:
```powershell
cd C:\Users\rajat\OneDrive\Desktop\rajat_portfolio\rajat-portfolio\backend
poetry run python -c "from app.services.retrieval_service import retrieval_service; print(retrieval_service.ingest_profile(reset=True))"
```
Or via HTTP:
```bash
curl -X POST http://localhost:8000/api/chat/ingest
```

---

## 5. Resume Storage & Updates

* **File Location:** `rajat-portfolio/frontend/public/Rajat_Khandelwal_Resume.pdf`
* **Public URL:**
  - Local: `http://localhost:3000/Rajat_Khandelwal_Resume.pdf`
  - Production (Vercel): `https://<your-domain>/Rajat_Khandelwal_Resume.pdf`
* **UI Trigger:** Experience page (`frontend/src/app/experience/page.tsx`) "Download Resume" button links directly to this file.
* **To Update the Resume:**
  1. Replace `rajat-portfolio/frontend/public/Rajat_Khandelwal_Resume.pdf` with your new PDF.
  2. If experience details or dates changed, update `backend/app/data/rajat_khandelwal_profile.md`.
  3. Run the re-vectorization command in Section 4.

---

## 6. Common Issues & Troubleshooting

1. **`FATAL: tenant/user postgres.hboesngotiorbxrywlsk not found`**
   - **Cause:** Supabase project paused due to inactivity.
   - **Fix:** Log in to supabase.com/dashboard and unpause the project.

2. **`Error code: 404 - model_not_found` from Groq**
   - **Cause:** Model name in `.env` (`GROQ_MODEL`) was removed or deprecated.
   - **Fix:** Keep `GROQ_MODEL=openai/gpt-oss-120b` (or `openai/gpt-oss-20b`) in `.env` and `config.py`.

3. **`DuplicatePreparedStatement: prepared statement _pg3_0 already exists`**
   - **Cause:** Psycopg 3 prepared statements conflicting with Supabase PgBouncer pooler.
   - **Fix:** Keep `prepare_threshold=None` in all psycopg database connections.
