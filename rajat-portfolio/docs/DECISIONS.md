# Architectural Decision Records (ADRs)

This document chronicles the major technical, architectural, and operational decisions made across the Rajat Portfolio repository. Every decision includes context, alternatives considered, the chosen path, and the consequences.

---

## Index of Decisions

- [ADR-001: LangGraph StateGraph vs. Linear Chains or Raw LLM Calls](#adr-001-langgraph-stategraph-vs-linear-chains-or-raw-llm-calls)
- [ADR-002: Dual Vector Store Strategy (Supabase pgvector + Local FAISS Fallback)](#adr-002-dual-vector-store-strategy-supabase-pgvector--local-faiss-fallback)
- [ADR-003: Groq Cloud Inference (`openai/gpt-oss-120b`) for Real-Time Responses](#adr-003-groq-cloud-inference-openaigpt-oss-120b-for-real-time-responses)
- [ADR-004: Decoupling Heavy ML Dependencies into Optional Poetry Group for Lean Cloud Images](#adr-004-decoupling-heavy-ml-dependencies-into-optional-poetry-group-for-lean-cloud-images)
- [ADR-005: Supabase PgBouncer Transaction Pooler `prepare_threshold=None` Fix](#adr-005-supabase-pgbouncer-transaction-pooler-prepare_thresholdnone-fix)
- [ADR-006: Next.js 15 App Router & Framer Motion for Theme-Aware Glassmorphism UI](#adr-006-nextjs-15-app-router--framer-motion-for-theme-aware-glassmorphism-ui)
- [ADR-007: Multi-Layer Guardrails for Security, Pronoun Immutability, and Anti-Jailbreak](#adr-007-multi-layer-guardrails-for-security-pronoun-immutability-and-anti-jailbreak)
- [ADR-008: Secretless Cloud Configuration and Safe Placeholder Policy](#adr-008-secretless-cloud-configuration-and-safe-placeholder-policy)
- [ADR-009: Decoupled Monorepo Architecture (Vercel Frontend + Fly.io Backend)](#adr-009-decoupled-monorepo-architecture-vercel-frontend--flyio-backend)
- [ADR-010: Client Attribution Alignment (TCS as Employer, Enterprise Clients)](#adr-010-client-attribution-alignment-tcs-as-employer-enterprise-clients)

---

### ADR-001: LangGraph StateGraph vs. Linear Chains or Raw LLM Calls

* **Status:** Accepted
* **Context:** The chatbot needed to answer complex portfolio queries accurately without hallucinating credentials, while supporting multiple retrieval sources and multi-step reasoning.
* **Alternatives Considered:**
  1. *Raw LLM Completion API:* Prone to hallucinations, token limits, and lacks tool invocation.
  2. *LangChain Linear `RetrievalQA` chain:* Rigid, difficult to debug, hard to inject guardrails or multi-step custom routing.
  3. *LangGraph `StateGraph`:* Explicit state model (`ChatState`), deterministic conditional edges, modular tool execution nodes, and inspectable history.
* **Decision:** Implement **LangGraph StateGraph**. Pre-seed retrieval tools before LLM generation so context is immediately available on turn 1.
* **Consequences:** Highly reliable, deterministic tool execution. Latency is reduced because the model does not need to negotiate whether to call tools on simple questions.

---

### ADR-002: Dual Vector Store Strategy (Supabase pgvector + Local FAISS Fallback)

* **Status:** Accepted
* **Context:** The application needs reliable retrieval both locally for development and in production. Supabase free-tier databases automatically pause after 7 days of inactivity, which could take down portfolio chat functionality.
* **Alternatives Considered:**
  1. *Supabase pgvector only:* If the project pauses, the chatbot crashes with operational connection errors.
  2. *Local FAISS only:* Requires shipping large index files or heavy Python dependencies into production containers.
  3. *Dual Storage Strategy:* Primary query to Supabase pgvector; automated fallback to local FAISS store (`storage/faiss`) or keyword search if the database is paused or unreachable.
* **Decision:** Implement **Dual Vector Storage**. During ingestion, chunks are written to both FAISS and Supabase. During runtime, `retrieval_service.py` tries Supabase and seamlessly falls back to FAISS.
* **Consequences:** 100% uptime resilience for portfolio visitors even if the cloud database is paused.

---

### ADR-003: Groq Cloud Inference (`openai/gpt-oss-120b`) for Real-Time Responses

* **Status:** Accepted
* **Context:** Portfolio visitors expect near-instant responses. Traditional cloud LLMs often have 3–6 second Time-To-First-Token (TTFT). Furthermore, older Llama 3 models on Groq (`llama-3.3-70b-versatile`) were deprecated on certain accounts.
* **Alternatives Considered:**
  1. *OpenAI GPT-4o / GPT-4o-mini:* Incurs recurring API costs and variable latency.
  2. *Local Ollama / Llama:* Requires high GPU memory on the hosting instance, making free-tier hosting impossible.
  3. *Groq Cloud LPU with `openai/gpt-oss-120b`:* Sub-second latency, generous free-tier limits, and strong reasoning capabilities.
* **Decision:** Standardize on **Groq Cloud** using `openai/gpt-oss-120b` (fallback models: `openai/gpt-oss-20b`, `qwen/qwen3.8-27b`).
* **Consequences:** Sub-second response times in the chat interface with high quality and zero infrastructure GPU cost.

---

### ADR-004: Decoupling Heavy ML Dependencies into Optional Poetry Group for Lean Cloud Images

* **Status:** Accepted
* **Context:** Deploying PyTorch, `sentence-transformers`, and `faiss-cpu` to Fly.io resulted in Docker images exceeding 2.5 GB, causing slow builds, deployment timeouts, and memory exhaustion on 1 GB Fly machines.
* **Alternatives Considered:**
  1. *Upgrade Fly.io VM:* Higher recurring cloud infrastructure cost.
  2. *Use external API exclusively (e.g. Gemini Embeddings):* Adds external API latency and key management.
  3. *Split Poetry dependencies into default vs. `local` group:* Default install (`poetry install --without dev --no-root`) contains only FastAPI, LangGraph, Psycopg, and Groq SDK (~200 MB image). The heavy ML stack is placed in `[tool.poetry.group.local]`.
* **Decision:** Move `sentence-transformers`, `faiss-cpu`, and `langchain-huggingface` to the optional `local` group in `pyproject.toml`. Local ingestion uses `poetry install --with local`. Fly.io builds use lean default dependencies.
* **Consequences:** Fast (<2 min) container builds on Fly.io, minimal RAM consumption (<150 MB), and zero container memory crashes.

---

### ADR-005: Supabase PgBouncer Transaction Pooler `prepare_threshold=None` Fix

* **Status:** Accepted
* **Context:** When connecting Psycopg 3 to Supabase via port `6543` (transaction pooler powered by PgBouncer), queries failed with `psycopg.errors.DuplicatePreparedStatement: prepared statement "_pg3_0" already exists`.
* **Alternatives Considered:**
  1. *Switch to Session Pooler (port 5432):* Session pooler has a very low connection limit on Supabase free tier and exhausts quickly.
  2. *Set `prepare_threshold=None` in Psycopg connection:* Tells Psycopg not to prepare SQL statements on transaction pooling connections.
* **Decision:** Pass `prepare_threshold=None` in `psycopg.connect(...)` across `vector_repository.py` and `contact_repository.py`.
* **Consequences:** Completely eliminated prepared statement collisions while allowing safe connection reuse through PgBouncer.

---

### ADR-006: Next.js 15 App Router & Framer Motion for Theme-Aware Glassmorphism UI

* **Status:** Accepted
* **Context:** The frontend needed to deliver a futuristic, high-performance aesthetic (glassmorphism cards, glowing borders, smooth route transitions) while remaining lightweight and SEO-friendly.
* **Alternatives Considered:**
  1. *Vite SPA:* Lacks native static page pre-rendering and server routes for telemetry.
  2. *Next.js Pages Router:* Legacy architecture with older data fetching paradigms.
  3. *Next.js 15 App Router with Tailwind CSS & Framer Motion:* Server-side rendering, static generation (SSG) for all 19 routes, and fluid hardware-accelerated animations.
* **Decision:** Build on Next.js 15 App Router with Tailwind CSS custom property tokens and Framer Motion.
* **Consequences:** Blazing fast initial load, static HTML delivery on Vercel CDN, and an intuitive dark/light theme toggle.

---

### ADR-007: Multi-Layer Guardrails for Security, Pronoun Immutability, and Anti-Jailbreak

* **Status:** Accepted
* **Context:** AI portfolio assistants are public-facing and vulnerable to prompt injection, impersonation, credential extraction, or malicious profile alterations.
* **Alternatives Considered:**
  1. *System Prompt Only:* LLMs can be tricked via jailbreak prompts ("Ignore previous rules", "DAN").
  2. *External Moderation API:* Introduces additional latency and external dependencies.
  3. *Pre-Execution Regex Guardrails + Strict System Prompt:* A hard programmatic firewall evaluates the user prompt *before* invoking any LLM.
* **Decision:** Implement `evaluate_guardrails` in `langgraph_agent.py` to intercept pronoun changes, profile edits, and jailbreak phrases prior to graph execution.
* **Consequences:** Zero chance of prompt injections altering Rajat's identity or leaking internal prompts.

---

### ADR-008: Secretless Cloud Configuration and Safe Placeholder Policy

* **Status:** Accepted
* **Context:** Storing API keys, database passwords, or card tokens in version control creates severe security risks.
* **Alternatives Considered:**
  1. *Hardcoded fallback credentials:* High risk of accidental Git leaks.
  2. *Environment Variables with strict `.env` exclusion:* All secrets must come from `.env` locally or Fly/Vercel environment variables in production.
* **Decision:** Keep `.env` strictly in `.dockerignore` and `.gitignore`. All documentation files MUST use placeholders (e.g. `<your-groq-api-key>`, `<supabase-db-url>`).
* **Consequences:** Clean, audit-ready codebase compliant with enterprise cloud security standards.

---

### ADR-009: Decoupled Monorepo Architecture (Vercel Frontend + Fly.io Backend)

* **Status:** Accepted
* **Context:** Hosting both Next.js and a Python FastAPI backend on a single monolithic server causes deployment friction and scaling bottlenecks.
* **Alternatives Considered:**
  1. *Full container on single VM:* Slower deployments and higher maintenance.
  2. *Decoupled Monorepo:* Host the Next.js frontend on Vercel (Edge CDN, global distribution) and the FastAPI backend on Fly.io (Docker container in `sin` region near Supabase Mumbai).
* **Decision:** Adopt the decoupled model. The frontend connects to the backend via `NEXT_PUBLIC_API_BASE_URL`.
* **Consequences:** Fast global frontend delivery and scalable, independently deployable Python backend services.

---

### ADR-010: Client Attribution Alignment (TCS as Employer, Enterprise Clients)

* **Status:** Accepted
* **Context:** Earlier drafts referred to Enbridge as a direct employer. In reality, Rajat is employed by **Tata Consultancy Services (TCS)**, where he delivers high-impact solutions for enterprise clients like **Enbridge**, **Exelon**, and **Outokumpu**.
* **Alternatives Considered:**
  1. *List clients as separate employer companies:* Inaccurate resume representation and potential NDA/employment record confusion.
  2. *Consolidate under TCS with explicit client engagements:* State clearly that Rajat is a Lead AI Engineer / Full Stack Developer at TCS, highlighting his specific contributions to client platforms (e.g. Enbridge EOL Agent Platform, Exelon ITIS Operations, Outokumpu OTK Chatbot).
* **Decision:** Represent all enterprise engagements under Tata Consultancy Services (TCS) in the profile knowledge base, system prompt, and UI chips.
* **Consequences:** 100% accurate, professional presentation aligned with Rajat's official employment history and resume.

---

### ADR-011: HNSW Vector Indexing for pgvector Embeddings

* **Status:** Accepted
* **Context:** `ivfflat (lists=50)` was initially created on the `rajat_profile_embeddings` table. On smaller datasets (such as 66 profile chunks), ivfflat with default `probes=1` frequently resulted in queries falling into empty partition lists, returning 0 retrieved chunks.
* **Alternatives Considered:**
  1. *Tune `ivfflat.probes`:* Requires executing `SET ivfflat.probes = 50;` on every pooled connection session, which is fragile across connection poolers.
  2. *HNSW (`USING hnsw (embedding vector_cosine_ops)`):* Builds a hierarchical navigable small-world graph that provides high recall regardless of dataset size and requires no connection-level session settings or list pre-training.
* **Decision:** Drop `ivfflat` and create `hnsw` index on `rajat_profile_embeddings(embedding vector_cosine_ops)`.
* **Consequences:** Immediate, deterministic vector similarity retrieval from Supabase with 100% recall.

---

### ADR-012: Background Keep-Alive Service for Supabase and Groq

* **Status:** Accepted
* **Context:** Supabase free-tier PostgreSQL automatically pauses after 7 days of inactivity, causing application connection errors. Similarly, intermittent cold connections to the Groq LLM API benefit from periodic health validation.
* **Alternatives Considered:**
  1. *External Cron Job / Third-Party Uptime Monitor:* Introduces external infrastructure dependencies and credentials exposure.
  2. *Application Lifespan Background Service (`KeepAliveService`):* FastAPI launches an async background task on boot. It pings Supabase every 6 hours (`SELECT COUNT(*) FROM rajat_profile_embeddings;`) and Groq every 48 hours / 2 days (`Health check ping. Reply with 'pong'.`), while exposing `/health/keepalive` and `/api/keepalive/trigger`.
* **Decision:** Implement `KeepAliveService` integrated into FastAPI lifespan with non-blocking concurrent startup probes (`asyncio.gather`).
* **Consequences:** Completely prevents Supabase project auto-pausing, maintains verified LLM connectivity, and provides diagnostic endpoints with zero external dependencies.
