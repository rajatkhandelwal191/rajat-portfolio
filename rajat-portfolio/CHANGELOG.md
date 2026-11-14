# Changelog

All notable changes to the **Rajat Portfolio** monorepo are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

---

## [0.4.0] - 2026-11-14

### Added
- **Enbridge EOL Agent Platform Knowledge:** Integrated 17 detailed technical sections covering React/TypeScript frontend, FastAPI backend, Microsoft Agent Framework orchestration, latency optimization, Azure AI Search RAG, Microsoft Foundry web grounding, ServiceNow CMDB ingestion, PostgreSQL Flexible Server, Azure Durable Functions, Docker/ACR hosting, Azure networking, secretless identity (OIDC + Managed Identity), Bicep IaC, Application Insights observability, and testing.
- **Client Attribution Framing:** Correctly structured Rajat's profile under **Tata Consultancy Services (TCS)** with explicit client engagements for **Enbridge**, **Exelon**, and **Outokumpu**.
- **Vector Re-indexing:** Expanded profile chunk count from 29 to 66 chunks and re-indexed into the local FAISS vector store (`storage/faiss`).
- **Chatbot UI Improvements:** Added `"Tell me about your work & clients"` prompt chip in `ChatbotWindow.tsx` and updated intent classification keywords (`tcs`, `client`, `enbridge`, `exelon`, `outokumpu`, `eol`).
- **Comprehensive Documentation Suite:** Created `docs/AGENTS.md`, `docs/DECISIONS.md`, `docs/FRONTEND.md`, `docs/BACKEND.md`, and `docs/RUNBOOK.md` as the unified technical reference standard.

---

## [0.3.1] - 2026-09-30

### Fixed
- **Groq Model Update:** Updated Groq model from deprecated `llama-3.3-70b-versatile` to `openai/gpt-oss-120b`, resolving 404 model-not-found errors.
- **Supabase PgBouncer Fix:** Added `prepare_threshold=None` to `psycopg.connect(...)` across `vector_repository.py` and `contact_repository.py` to fix `DuplicatePreparedStatement` on Supabase transaction pooler (port 6543).

### Added
- **Resume Download Pipeline:** Placed official resume PDF at `frontend/public/Rajat_Khandelwal_Resume.pdf`, wired the Experience page download button, and trained RajatGPT to automatically supply download links upon request.
- **Knowledge Base Refinement:** Removed mechanical engineering references and re-indexed 29 chunks to Supabase pgvector and FAISS.
- **Initial Operations Guide:** Documented commands, account IDs, chatbot flow, chunks architecture, and troubleshooting in `OPERATIONS_GUIDE.md`.

---

## [0.3.0] - 2026-03-11

### Added
- **Contact Form Persistence:** Implemented `contact_submissions` table auto-creation in Supabase Postgres, added `POST /api/contact` endpoint, and wired frontend form with live submission feedback.
- **Admin Dashboard:** Created password-protected admin dashboard at `/contact/admin` backed by `GET /api/contact/submissions` and authenticated via `CONTACT_ADMIN_PASSWORD`.
- **Profile Knowledge Base Update:** Added detailed TCS experience cards and project breakdowns for TCS Innovista User Analysis, ITIS Infra Ops, and OTK Chatbot.

---

## [0.2.0] - 2026-03-09

### Added
- **LangGraph RAG Backend:** Built agentic chatbot using LangGraph `StateGraph`, Groq inference, dual vector store (Supabase pgvector + FAISS fallback), and paragraph-aware markdown chunking.
- **Pre-Seeded Retrieval:** Seeded FAISS and Postgres tool calls prior to LLM generation in LangGraph flow to enforce strict context grounding.
- **Embedding Diagnostics:** Added `GET /api/chat/embedding-status` and `backend/scripts/check_embedding_status.py` for live embedding validation.
- **Frontend Event Telemetry:** Added Next.js server route `/api/frontend-log` and backend route `/api/chat/frontend-event` to capture UI click, prompt, and error telemetry in terminal logs.

### Changed
- **Poetry Dependency Decoupling:** Moved heavy ML dependencies (`sentence-transformers`, `faiss-cpu`, `langchain-huggingface`) to optional Poetry `local` group, reducing Fly.io Docker image size to under 200 MB.
- **Lazy Loading:** Switched embedding model initialization to lazy loading in `retrieval_service.py` to prevent backend import crashes during deployment.

---

## [0.1.0] - 2026-03-02

### Added
- **Monorepo Scaffold:** Initialized decoupled repository with Next.js 15 App Router frontend and FastAPI backend.
- **Dual-Theme Portfolio UI:** Built modern glassmorphism design system with Tailwind CSS and Framer Motion supporting dark/light mode toggle.
- **Interactive Pages:** Implemented `/` (Landing), `/about` (Bio & philosophy), `/projects` (Project deep dives), `/experience` (Timeline), and `/contact` (Contact form).
- **RajatGPT Drawer:** Designed floating / docked AI chat terminal with suggestion chips and responsive mobile layout.
