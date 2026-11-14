# Operational Runbook: Setup, Execution, Ingestion & Deployment

This runbook is the definitive step-by-step operating guide for the **Rajat Portfolio** monorepo. Follow this guide to configure environments, run the system locally, re-vectorize knowledge bases, test endpoints, deploy to production, and resolve operational issues.

---

## 1. Prerequisites & Tooling

Ensure the following tools are installed on your machine:

* **Node.js:** v18+ (verified with `v22.15.0`)
* **npm:** v9+ (verified with `10.9.2`)
* **Python:** 3.11 or 3.12 (verified with `3.12.6`)
* **Poetry:** 1.8+ or 2.x (verified with `2.2.1`)
* **Flyctl:** (Optional, for backend cloud deployment - verified with `v0.4.110`)
* **Git**

---

## 2. Environment Configuration (`.env`)

Create a `.env` file at the repository root (`rajat-portfolio/.env`) based on `.env.example`.

> [!CAUTION]
> **Never commit real credentials to version control.** Always use environment variables in deployment environments and keep `.env` in `.gitignore`.

### Safe `.env` Template:

```ini
# ==========================================
# Frontend Configuration
# ==========================================
# Local development points to localhost; production points to Fly.io
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000

# ==========================================
# Backend API & Server Configuration
# ==========================================
ENV=development
API_HOST=0.0.0.0
API_PORT=8000
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001,https://rajat-portfolio-ten.vercel.app

# ==========================================
# LLM Inference (Groq Cloud)
# ==========================================
GROQ_MODEL=openai/gpt-oss-120b
GROQ_API_KEY=<your-groq-api-key>

# ==========================================
# Supabase PostgreSQL + pgvector
# ==========================================
# Transaction pooler connection string (port 6543)
SUPABASE_DB_URL=postgresql://postgres.<project-ref>:<db-password>@aws-1-ap-south-1.pooler.supabase.com:6543/postgres
SUPABASE_URL=https://<project-ref>.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>

# ==========================================
# Vector Search & Knowledge Base Configuration
# ==========================================
EMBEDDING_MODEL_NAME=sentence-transformers/all-MiniLM-L6-v2
EMBEDDING_DIMENSION=384
PROFILE_MARKDOWN_PATH=app/data/rajat_khandelwal_profile.md
FAISS_STORAGE_PATH=storage/faiss
AUTO_INGEST_ON_STARTUP=true

# ==========================================
# Admin Credentials
# ==========================================
# Password used to view contact submissions at /contact/admin
CONTACT_ADMIN_PASSWORD=<your-admin-password>
```

---

## 3. Running Locally (Step-by-Step)

Always run the frontend and backend in **two separate terminal windows**:

### Terminal 1: Frontend (Next.js)

```powershell
# 1. Navigate to frontend folder
cd C:\Users\rajat\OneDrive\Desktop\rajat_portfolio\rajat-portfolio\frontend

# 2. Install node dependencies
npm install

# 3. Start development server
npm run dev

# Note: If port 3000 is occupied by another process, run:
npm run dev -- -p 3001
```

* **Frontend URL:** `http://localhost:3000` (or `http://localhost:3001`)
* **Hard Refresh:** Use `Ctrl + F5` to clear browser cache when styles or tokens change.

---

### Terminal 2: Backend (FastAPI + LangGraph)

```powershell
# 1. Navigate to backend folder
cd C:\Users\rajat\OneDrive\Desktop\rajat_portfolio\rajat-portfolio\backend

# 2. Install dependencies with local ML group (enables FAISS & sentence-transformers)
poetry install --with local --no-root

# 3. Start backend ASGI server
poetry run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

* **API Base URL:** `http://localhost:8000`
* **Interactive API Docs (Swagger):** `http://localhost:8000/docs`
* **Health Endpoint:** `http://localhost:8000/health`

---

## 4. Chunking, Embedding & Knowledge Ingestion

Whenever you modify `rajat_khandelwal_profile.md` or need to refresh vectors in Supabase and FAISS:

### Method A: Via CLI Command (Recommended for Local Dev)

```powershell
cd C:\Users\rajat\OneDrive\Desktop\rajat_portfolio\rajat-portfolio\backend
poetry run python -c "from app.services.retrieval_service import retrieval_service; print(retrieval_service.ingest_profile(reset=True))"
```

*Expected output:*
```text
{'chunks_indexed': 66, 'faiss_ready': True, 'stored_in_postgres': True, ...}
```

### Method B: Via Postman / curl (HTTP API)

```bash
curl -X POST http://localhost:8000/api/chat/ingest \
  -H "Content-Type: application/json" \
  -d '{"reset": true}'
```

*Expected JSON response:*
```json
{
  "status": "ok",
  "detail": {
    "chunks_indexed": 66,
    "faiss_ready": true,
    "stored_in_postgres": true,
    "postgres_error": null,
    "skipped": false
  }
}
```

---

## 5. Verification & Testing

### 5.1 Test Chatbot Query via Postman or curl

```bash
curl -X POST http://localhost:8000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Where does Rajat work and what clients has he worked for?"}'
```

*Expected response:*
A structured reply stating Rajat works as a Lead AI Engineer / Full Stack Developer at **Tata Consultancy Services (TCS)**, highlighting client work for **Enbridge**, **Exelon**, and **Outokumpu**.

### 5.2 Test Contact Submission

```bash
curl -X POST http://localhost:8000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Recruiter",
    "email": "jane@enterprise.com",
    "company": "Tech Corp",
    "message": "Interested in discussing an AI Engineering role."
  }'
```

*Expected response:*
```json
{
  "status": "received",
  "submission_id": 1
}
```

### 5.3 Review Contact Inquiries (Admin)
Navigate in your browser to:
`http://localhost:3000/contact/admin` (or `https://rajat-portfolio-ten.vercel.app/contact/admin`)
Enter the configured `CONTACT_ADMIN_PASSWORD` to inspect submitted contact inquiries.

### 5.4 Test Automated Keep-Alive Probes (Supabase & Groq)

Check the real-time background probe status:
```bash
curl http://localhost:8000/health/keepalive
```
*Expected response:*
```json
{
  "enabled": true,
  "running": true,
  "supabase": {
    "interval_hours": 6.0,
    "last_result": {
      "status": "ok",
      "timestamp": "...",
      "duration_ms": 240.5,
      "chunk_count": 66,
      "error": null
    },
    "next_run": "..."
  },
  "groq": {
    "interval_hours": 48.0,
    "last_result": {
      "status": "ok",
      "timestamp": "...",
      "duration_ms": 1137.2,
      "response": "pong",
      "error": null
    },
    "next_run": "..."
  }
}
```

Trigger an on-demand probe immediately:
```bash
curl -X POST "http://localhost:8000/api/keepalive/trigger?target=all"
```

---

## 6. Production Deployment

### 6.1 Backend Deployment to Fly.io

1. **Verify `fly.toml`:**
   - App Name: `rajat-khandelwal`
   - Primary Region: `sin` (Singapore, near Supabase Mumbai)
   - Port: `8000`

2. **Set Environment Secrets on Fly.io:**
   ```bash
   flyctl secrets set -a rajat-khandelwal \
     GROQ_API_KEY="<your-groq-key>" \
     GROQ_MODEL="openai/gpt-oss-120b" \
     SUPABASE_DB_URL="postgresql://postgres.<ref>:<pass>@aws-1-ap-south-1.pooler.supabase.com:6543/postgres" \
     CONTACT_ADMIN_PASSWORD="<admin-password>" \
     ALLOWED_ORIGINS="https://rajat-portfolio-ten.vercel.app,http://localhost:3000" \
     USE_LOCAL_EMBEDDINGS="false" \
     USE_FAISS="false" \
     AUTO_INGEST_ON_STARTUP="false"
   ```

3. **Deploy from backend directory:**
   ```powershell
   cd C:\Users\rajat\OneDrive\Desktop\rajat_portfolio\rajat-portfolio\backend
   flyctl deploy -a rajat-khandelwal
   ```

4. **Verify Live Health Check:**
   ```bash
   curl https://rajat-khandelwal.fly.dev/health
   # Returns: {"status": "ok"}
   ```

---

### 6.2 Frontend Deployment to Vercel

1. **Vercel Project:** `rajat-portfolio` (Connected to Git repository).
2. **Production Domain:** `https://rajat-portfolio-ten.vercel.app/`
3. **Environment Variable:**
   In Vercel Project Settings -> Environment Variables:
   - `NEXT_PUBLIC_API_BASE_URL` = `https://rajat-khandelwal.fly.dev`
4. **Trigger Build:** Git push to `main` automatically triggers Vercel static build (`next build`).

---

## 7. Troubleshooting & FAQ

### Issue 1: `FATAL: tenant/user postgres.hboesngotiorbxrywlsk not found`
* **Root Cause:** The free-tier Supabase database was automatically paused after 7 days of inactivity.
* **Resolution:** Log in to `https://supabase.com/dashboard`, select project `hboesngotiorbxrywlsk`, and click **"Restore project"**. The database will resume in under 60 seconds. Note: The local FAISS fallback ensures local chat continues working even when Supabase is paused.

### Issue 2: `psycopg.errors.DuplicatePreparedStatement: prepared statement "_pg3_0" already exists`
* **Root Cause:** PgBouncer transaction poolers on port 6543 do not support named prepared statements across pooled connections.
* **Resolution:** Ensure `prepare_threshold=None` is set in `psycopg.connect(...)`. This is pre-configured in `vector_repository.py` and `contact_repository.py`.

### Issue 3: `Error code: 404 - model_not_found` from Groq
* **Root Cause:** The model set in `GROQ_MODEL` was deprecated by Groq.
* **Resolution:** Update `GROQ_MODEL` in `.env` and Fly secrets to `openai/gpt-oss-120b` (or `openai/gpt-oss-20b`).

### Issue 4: Next.js Port 3000 Collision
* **Root Cause:** Another Node or dev process is already listening on port 3000.
* **Resolution:** Run `npm run dev -- -p 3001` to start the frontend on port 3001.
