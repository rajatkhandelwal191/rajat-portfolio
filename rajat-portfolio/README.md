# Rajat Portfolio

Decoupled monorepo for a personal portfolio website with an AI assistant (**RajatGPT**).

* **Frontend:** Next.js 15 (App Router), React 19, Tailwind CSS, Framer Motion (Hosted on [Vercel](https://rajat-portfolio-ten.vercel.app/))
* **Backend:** FastAPI, Python 3.12, LangGraph, Groq Cloud, Psycopg 3 (Hosted on [Fly.io](https://rajat-khandelwal.fly.dev/))
* **Database & Vectors:** Supabase PostgreSQL + pgvector (Mumbai `ap-south-1`) with local FAISS fallback
* **Author:** Rajat Khandelwal — Lead AI Engineer & Full Stack Developer at Tata Consultancy Services (TCS)

---

## 📚 Master Documentation Hub

All architecture, operational runbooks, technical decisions, and specifications are centralized in the `docs/` directory. **Always refer to these documents for context:**

| Document | Purpose |
| :--- | :--- |
| 🚀 **[`docs/RUNBOOK.md`](docs/RUNBOOK.md)** | **Definitive operating runbook:** local setup, execution, vector re-indexing, testing commands, production deployment, and troubleshooting. |
| 🤖 **[`docs/AGENTS.md`](docs/AGENTS.md)** | **RajatGPT AI agent specification:** LangGraph state machine, tools (`search_faiss`, `search_postgres`), multi-layer guardrails, prompt rules. |
| ⚖️ **[`docs/DECISIONS.md`](docs/DECISIONS.md)** | **Architectural Decision Records (ADRs):** Rationale behind LangGraph, dual vector store, Groq, dependency decoupling, PgBouncer fix, etc. |
| 💻 **[`docs/FRONTEND.md`](docs/FRONTEND.md)** | **Frontend specification:** Next.js 15 App Router, component trees, glassmorphism design tokens, theme engine, and telemetry logging. |
| ⚙️ **[`docs/BACKEND.md`](docs/BACKEND.md)** | **Backend specification:** FastAPI service architecture, endpoints, dual vector retrieval coordinator, and Poetry dependency groups. |
| 🏛️ **[`ARCHITECTURE.md`](ARCHITECTURE.md)** | **System architecture overview:** End-to-end Mermaid diagrams, monorepo layout, and persistence schemas. |
| 📜 **[`CHANGELOG.md`](CHANGELOG.md)** | **Release changelog:** Chronological record of all updates, features, optimizations, and bug fixes. |

---

## Quick Start Summary

For the complete, step-by-step operating guide, see **[`docs/RUNBOOK.md`](docs/RUNBOOK.md)**.

### 1) Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev
# Running on http://localhost:3000
```

### 2) Backend (FastAPI)
```bash
cd backend
# Lean install (default):
poetry install --no-root

# Or with local embedding / FAISS support:
poetry install --with local --no-root

poetry run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
# API running on http://localhost:8000
# Interactive docs on http://localhost:8000/docs
```

### 3) Re-indexing Vector Embeddings
```bash
cd backend
poetry run python -c "from app.services.retrieval_service import retrieval_service; print(retrieval_service.ingest_profile(reset=True))"
# Or via HTTP:
# POST http://localhost:8000/api/chat/ingest with body {"reset": true}
```

---

## Security Note

Keep all secrets in `.env` or deployment environment secret managers (Fly Secrets, Vercel Environment Variables). Never commit credentials to version control. All documentation files use safe placeholders.
