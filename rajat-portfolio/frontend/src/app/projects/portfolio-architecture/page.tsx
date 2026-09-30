"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { logUiEvent } from "../../../lib/frontendLogger";

type Theme = "light" | "dark";

const navItems = [
  { href: "/", icon: "home", label: "Home" },
  { href: "/about", icon: "person", label: "About" },
  { href: "/projects", icon: "code_blocks", label: "Projects", active: true },
  { href: "/experience", icon: "history_edu", label: "Experience" },
  { href: "/resume", icon: "description", label: "Resume" },
  { href: "/contact", icon: "alternate_email", label: "Contact" },
  { href: "/#chatbot", icon: "smart_toy", label: "RajatGPT" },
];

const archPipeline = [
  {
    step: "1. Client UI",
    title: "Next.js 15 (React 19)",
    icon: "devices",
    badge: "Frontend Layer",
    detail:
      "Modern dual-theme portfolio with Framer Motion, glassmorphism design tokens, floating dock navigation, and interactive RajatGPT chat drawer.",
  },
  {
    step: "2. Edge CDN",
    title: "Vercel Edge Network",
    icon: "public",
    badge: "Edge Caching",
    detail:
      "Global low-latency delivery. Static resume PDF is served instantly from /public/Rajat_Khandelwal_Resume.pdf with zero database cold starts.",
  },
  {
    step: "3. API Gateway",
    title: "FastAPI ASGI Service",
    icon: "api",
    badge: "Backend Layer",
    detail:
      "Dockerized FastAPI app deployed on Fly.io (Singapore region, port 8000). Features CORS origin validation, health checks, and structured logging.",
  },
  {
    step: "4. Agentic Orchestrator",
    title: "LangGraph StateGraph",
    icon: "account_tree",
    badge: "AI Agent",
    detail:
      "Multi-node agentic loop. Executes pre-seeded tool calling nodes (_seed_tools_node -> ToolNode) to guarantee factual retrieval before LLM generation.",
  },
  {
    step: "5. Dual Vector Store",
    title: "Supabase pgvector + FAISS",
    icon: "database",
    badge: "Hybrid Retrieval",
    detail:
      "Queries 29 dense 384-dim vectors in Supabase Postgres using cosine distance (IVFFlat). Automatically falls back to local FAISS if Supabase pauses.",
  },
  {
    step: "6. LPU Inference",
    title: "Groq Cloud (120B Model)",
    icon: "bolt",
    badge: "LLM Reasoning",
    detail:
      "Groq LPU runs openai/gpt-oss-120b with <1s latency. Strictly enforced prompt rules prevent hallucinations and return the resume link on demand.",
  },
];

const techStack = [
  {
    category: "Frontend Stack",
    items: [
      { name: "Next.js 15", desc: "App Router, Server & Client Components, Edge API routes" },
      { name: "React 19", desc: "Modern concurrent UI primitives, hooks & transitions" },
      { name: "TypeScript 5", desc: "Strict end-to-end type safety" },
      { name: "Tailwind CSS", desc: "CSS variable tokens, responsive dark & light patterns" },
      { name: "Framer Motion", desc: "Smooth layout transitions, expandable cards & drawers" },
      { name: "Axios", desc: "HTTP communication with backend API and error handling" },
    ],
  },
  {
    category: "Backend & Orchestration",
    items: [
      { name: "FastAPI", desc: "High-performance Python ASGI backend with async endpoints" },
      { name: "LangGraph", desc: "StateGraph workflow orchestrating multi-step agentic nodes" },
      { name: "LangChain Core", desc: "Prompt templates, tools binding, and message abstractions" },
      { name: "Groq Cloud LPU", desc: "Ultra-fast inference running openai/gpt-oss-120b" },
      { name: "Pydantic v2", desc: "Strict schema validation for settings, chat state & inputs" },
      { name: "Poetry", desc: "Deterministic dependency isolation and virtual environment" },
    ],
  },
  {
    category: "Vector Search & Data",
    items: [
      { name: "Supabase PostgreSQL", desc: "Managed cloud Postgres database hosted in Mumbai (ap-south-1)" },
      { name: "pgvector", desc: "Vector similarity search using 384-dim cosine distance" },
      { name: "FAISS", desc: "Local in-memory Facebook AI Similarity Search fallback index" },
      { name: "SentenceTransformers", desc: "sentence-transformers/all-MiniLM-L6-v2 dense embeddings" },
      { name: "Psycopg 3", desc: "Configured with prepare_threshold=None for PgBouncer compatibility" },
    ],
  },
  {
    category: "Cloud & Infrastructure",
    items: [
      { name: "Vercel", desc: "Global Edge deployment for Next.js frontend and static assets" },
      { name: "Fly.io", desc: "Dockerized FastAPI container running in Singapore (sin) region" },
      { name: "Docker", desc: "Lightweight multi-stage container image for backend runtime" },
      { name: "Supabase S3 / Pooler", desc: "Transaction pooler on port 6543 with PgBouncer" },
    ],
  },
];

const sampleChunks = [
  { id: "00", title: "Header & Contact Links", content: "AI Engineer — GenAI & LLM Specialist. Location: Delhi, India. Email, Phone, LinkedIn, GitHub, Resume PDF link." },
  { id: "01", title: "Professional Summary", content: "Lead AI Engineer with 4.29+ years experience architecting enterprise-grade AI systems, Agentic AI, LangGraph, Azure cloud." },
  { id: "02", title: "Core Skills & Competencies", content: "Generative AI, LangGraph, Azure (AKS, Functions), FastAPI, Next.js, pgvector, Supabase, FAISS, Docker, Kubernetes." },
  { id: "03-05", title: "TCS ITIS Agentic AI Workflows", content: "Current role: Heatmap, patch compliance, drive cleanup agents, blob leasing/locking, 70-80% manual effort reduction." },
  { id: "06-08", title: "TCS Innovista User Analysis", content: "ITSM ticket automation (~100K records), Azure Functions, HuggingFace BART/T5 summarization, Cosmos DB & Power BI." },
  { id: "09-11", title: "Outokumpu (OTK) Chatbot", content: "Multilingual GenAI & RAG chatbot, OpenAI APIs, Node.js + Flask microservices, ServiceNow, zero SLA breaches." },
  { id: "12-14", title: "Pepcoding, CRIS & Education", content: "Assistant tutor (Java DSA/LeetCode). CRIS software intern. B.Tech (2021) from Govt Engineering College Bikaner." },
  { id: "15-23", title: "RAG Playground Architecture", content: "Interactive 9-stage RAG pipeline demo (Next.js, FastAPI, Qdrant, React Flow), evaluation metrics, multi-provider support." },
  { id: "24-26", title: "Capstone Enterprise Assistant", content: "LangGraph supervisor architecture, SQLite operational tools, RFP proposal drafting, multi-agent coordination." },
  { id: "27-28", title: "MobiKwik Tracker & Skills Matrix", content: "Next.js 14, Supabase, RLS, Cloudflare R2, and complete categorized technical skills matrix." },
];

export default function PortfolioArchitecturePage() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [activeTab, setActiveTab] = useState<"pipeline" | "tech" | "chunks" | "engineering">("pipeline");
  const isDark = theme === "dark";

  const footerText = useMemo(
    () => `(c) ${new Date().getFullYear()} Rajat Khandelwal. Portfolio Architecture Showcase.`,
    [],
  );

  return (
    <div
      className={`portfolio-shell relative min-h-screen w-full overflow-x-hidden ${
        isDark ? "dark-pattern" : "light-pattern"
      }`}
      data-theme={theme}
    >
      {/* Floating Left Navigation Rail */}
      <aside className="nav-float fixed left-6 top-1/2 z-50 hidden -translate-y-1/2 flex-col items-center gap-6 rounded-full border border-[var(--nav-border)] px-3 py-6 lg:flex">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            onClick={() => logUiEvent("nav_click", { target: item.href, label: item.label })}
            className={`nav-btn relative flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 ${
              item.active
                ? "bg-[var(--cream-active)] text-black shadow-md"
                : "text-[var(--text-muted)] hover:bg-white/10 hover:text-[var(--text-primary)]"
            }`}
          >
            <span className="material-symbols-outlined text-lg">{item.icon}</span>
            <span className="nav-tooltip pointer-events-none absolute left-full ml-4 whitespace-nowrap rounded-md bg-black/80 px-2 py-1 text-xs text-white opacity-0 backdrop-blur-sm transition-opacity">
              {item.label}
            </span>
          </Link>
        ))}
      </aside>

      {/* Main Content Area */}
      <div className="relative z-10 flex min-h-screen flex-col lg:pl-28">
        <header className="sticky top-0 z-40 border-b border-[var(--header-border)] bg-[var(--header-bg)] px-6 py-4 backdrop-blur-md">
          <div className="mx-auto flex max-w-6xl items-center justify-between">
            <Link
              href="/projects"
              className="flex items-center gap-2 text-sm font-semibold tracking-wider text-[var(--cream-active)]"
            >
              <span className="material-symbols-outlined text-base">arrow_back</span>
              BACK TO PROJECTS
            </Link>

            <div className="flex items-center gap-3">
              <Link
                href="/resume"
                className="inline-flex items-center gap-2 rounded-xl border border-[var(--glass-card-border)] bg-white/5 px-3 py-1.5 text-xs font-medium text-[var(--text-primary)] transition hover:bg-white/10"
              >
                <span className="material-symbols-outlined text-sm">description</span>
                Resume
              </Link>

              <button
                type="button"
                onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
                aria-label="Toggle theme"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--glass-card-border)] bg-white/5 text-[var(--text-primary)] transition hover:bg-white/10"
              >
                <span className="material-symbols-outlined text-base">
                  {isDark ? "light_mode" : "dark_mode"}
                </span>
              </button>
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">
          {/* Hero Banner */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10 rounded-2xl border border-[var(--glass-card-border)] bg-[var(--glass-card-bg)] p-8 shadow-2xl backdrop-blur-md"
          >
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3.5 py-1 text-xs font-semibold text-purple-400">
                  <span className="h-2 w-2 rounded-full bg-purple-400 animate-pulse" />
                  Full-Stack Monorepo Architecture
                </div>
                <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-4xl">
                  How This Portfolio & RajatGPT Were Built
                </h1>
                <p className="mt-2 max-w-3xl text-base text-[var(--text-muted)]">
                  An inside look into the modern architecture powering this website: a decoupled monorepo combining Next.js 15, FastAPI, LangGraph multi-tool state machine, Groq 120B inference, and dual vector stores.
                </p>

                <div className="mt-5 flex flex-wrap gap-2 text-xs">
                  <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-[var(--text-primary)]">
                    ⚡ Groq LPU (&lt;1s Latency)
                  </span>
                  <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-[var(--text-primary)]">
                    🧠 LangGraph Pre-Seeded RAG
                  </span>
                  <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-[var(--text-primary)]">
                    📦 29 pgvector Chunks
                  </span>
                  <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-[var(--text-primary)]">
                    🌐 Vercel + Fly.io + Supabase
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href="#chatbot"
                  onClick={() => {
                    const el = document.getElementById("chatbot");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-2 rounded-xl bg-[var(--cream-active)] px-5 py-2.5 text-sm font-semibold text-black transition hover:opacity-90 shadow-md"
                >
                  <span className="material-symbols-outlined text-base">smart_toy</span>
                  Test Chatbot
                </a>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-[var(--glass-card-border)] pt-6 sm:grid-cols-4">
              <div>
                <p className="text-xs text-[var(--text-muted)]">Frontend</p>
                <p className="text-base font-bold text-[var(--text-primary)]">Next.js 15 App Router</p>
              </div>
              <div>
                <p className="text-xs text-[var(--text-muted)]">Backend</p>
                <p className="text-base font-bold text-[var(--text-primary)]">FastAPI + LangGraph</p>
              </div>
              <div>
                <p className="text-xs text-[var(--text-muted)]">LLM Provider</p>
                <p className="text-base font-bold text-[var(--text-primary)]">Groq 120B (LPU)</p>
              </div>
              <div>
                <p className="text-xs text-[var(--text-muted)]">Vector DB</p>
                <p className="text-base font-bold text-[var(--text-primary)]">Supabase + FAISS</p>
              </div>
            </div>
          </motion.div>

          {/* Navigation Tabs */}
          <div className="mb-8 flex flex-wrap gap-2 border-b border-[var(--glass-card-border)] pb-4">
            <button
              type="button"
              onClick={() => setActiveTab("pipeline")}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                activeTab === "pipeline"
                  ? "bg-[var(--cream-active)] text-black font-semibold shadow-md"
                  : "bg-white/5 text-[var(--text-muted)] hover:bg-white/10 hover:text-[var(--text-primary)]"
              }`}
            >
              1. Architecture Flow
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("tech")}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                activeTab === "tech"
                  ? "bg-[var(--cream-active)] text-black font-semibold shadow-md"
                  : "bg-white/5 text-[var(--text-muted)] hover:bg-white/10 hover:text-[var(--text-primary)]"
              }`}
            >
              2. Complete Tech Stack
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("chunks")}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                activeTab === "chunks"
                  ? "bg-[var(--cream-active)] text-black font-semibold shadow-md"
                  : "bg-white/5 text-[var(--text-muted)] hover:bg-white/10 hover:text-[var(--text-primary)]"
              }`}
            >
              3. The 29 Chunks (RAG)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("engineering")}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                activeTab === "engineering"
                  ? "bg-[var(--cream-active)] text-black font-semibold shadow-md"
                  : "bg-white/5 text-[var(--text-muted)] hover:bg-white/10 hover:text-[var(--text-primary)]"
              }`}
            >
              4. Engineering Solutions
            </button>
          </div>

          {/* TAB 1: Architecture Pipeline */}
          {activeTab === "pipeline" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {archPipeline.map((item, idx) => (
                  <div
                    key={item.step}
                    className="flex flex-col justify-between rounded-2xl border border-[var(--glass-card-border)] bg-[var(--glass-card-bg)] p-6 shadow-lg backdrop-blur-sm"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-[var(--cream-active)]">{item.step}</span>
                        <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] text-[var(--text-muted)]">
                          {item.badge}
                        </span>
                      </div>
                      <div className="mt-4 flex items-center gap-3">
                        <span className="material-symbols-outlined text-2xl text-[var(--cream-active)]">
                          {item.icon}
                        </span>
                        <h3 className="text-lg font-bold text-[var(--text-primary)]">{item.title}</h3>
                      </div>
                      <p className="mt-3 text-xs leading-relaxed text-[var(--text-muted)]">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Data Flow Diagram Card */}
              <div className="rounded-2xl border border-[var(--glass-card-border)] bg-[var(--glass-card-bg)] p-6 shadow-xl backdrop-blur-md">
                <h3 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg text-[var(--cream-active)]">sync_alt</span>
                  End-to-End Chat Request Flow
                </h3>
                <div className="mt-4 overflow-x-auto rounded-xl bg-black/40 p-4 font-mono text-xs text-neutral-300">
                  <pre className="whitespace-pre">
{`[User types "What is Rajat's experience?"]
   │
   ▼
1. Next.js Client ───(HTTP POST /api/chat)───► 2. FastAPI Backend (Fly.io)
                                                       │
                                                       ▼
                                            3. LangGraph Orchestrator
                                                 (Pre-seeds dual tools)
                                                       │
                           ┌───────────────────────────┴───────────────────────────┐
                           ▼                                                       ▼
               4a. Supabase pgvector                                    4b. Local FAISS Index
              (Cosine similarity distance)                                (Offline Fallback)
                           │                                                       │
                           └───────────────────────────┬───────────────────────────┘
                                                       │ (Top-4 ground truth chunks)
                                                       ▼
                                            5. Groq LPU Inference
                                            (Model: openai/gpt-oss-120b)
                                                       │
                                                       ▼
[200 OK Reply with citations] ◄──────────────── 6. Final JSON Response`}
                  </pre>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: Complete Tech Stack */}
          {activeTab === "tech" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {techStack.map((group) => (
                  <div
                    key={group.category}
                    className="rounded-2xl border border-[var(--glass-card-border)] bg-[var(--glass-card-bg)] p-6 shadow-xl backdrop-blur-md"
                  >
                    <h3 className="text-lg font-bold text-[var(--cream-active)]">{group.category}</h3>
                    <div className="mt-4 space-y-3">
                      {group.items.map((item) => (
                        <div key={item.name} className="border-b border-white/5 pb-2.5 last:border-0 last:pb-0">
                          <p className="text-sm font-semibold text-[var(--text-primary)]">{item.name}</p>
                          <p className="text-xs text-[var(--text-muted)]">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 3: The 29 Chunks Explorer */}
          {activeTab === "chunks" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="rounded-2xl border border-[var(--glass-card-border)] bg-[var(--glass-card-bg)] p-6 shadow-xl backdrop-blur-md">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div>
                    <h3 className="text-lg font-bold text-[var(--text-primary)]">
                      RAG Knowledge Base — 29 Indexed Chunks
                    </h3>
                    <p className="mt-1 text-xs text-[var(--text-muted)]">
                      Generated from <code className="font-mono text-[var(--cream-active)]">backend/app/data/rajat_khandelwal_profile.md</code> using 900-char paragraph-aware windowing.
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-[var(--text-muted)]">
                    Model: <span className="font-mono text-[var(--cream-active)]">all-MiniLM-L6-v2</span> (384 dims)
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  {sampleChunks.map((chunk) => (
                    <div
                      key={chunk.id}
                      className="rounded-xl border border-white/5 bg-white/5 p-4 transition hover:border-[var(--cream-active)]"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-[var(--cream-active)]">
                          Chunk {chunk.id}
                        </span>
                        <span className="text-xs font-semibold text-[var(--text-primary)]">{chunk.title}</span>
                      </div>
                      <p className="mt-2 text-xs text-[var(--text-muted)] leading-relaxed">{chunk.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 4: Engineering Solutions */}
          {activeTab === "engineering" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="rounded-2xl border border-[var(--glass-card-border)] bg-[var(--glass-card-bg)] p-6 shadow-xl backdrop-blur-md">
                  <div className="flex items-center gap-2 text-amber-400">
                    <span className="material-symbols-outlined">bolt</span>
                    <h3 className="text-base font-bold text-[var(--text-primary)]">
                      PgBouncer Pooler Prepared Statement Conflict
                    </h3>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-[var(--text-muted)]">
                    <strong>Challenge:</strong> Connecting to Supabase port 6543 (PgBouncer transaction pooler) caused psycopg 3 to error with <code className="font-mono">DuplicatePreparedStatement: prepared statement "_pg3_0" already exists</code>.
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-[var(--text-muted)]">
                    <strong>Fix:</strong> Passed <code className="font-mono text-[var(--cream-active)]">prepare_threshold=None</code> to all database connection helpers in <code className="font-mono">vector_repository.py</code> and <code className="font-mono">contact_repository.py</code>.
                  </p>
                </div>

                <div className="rounded-2xl border border-[var(--glass-card-border)] bg-[var(--glass-card-bg)] p-6 shadow-xl backdrop-blur-md">
                  <div className="flex items-center gap-2 text-blue-400">
                    <span className="material-symbols-outlined">psychology</span>
                    <h3 className="text-base font-bold text-[var(--text-primary)]">
                      Zero-Hallucination Agentic RAG
                    </h3>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-[var(--text-muted)]">
                    <strong>Challenge:</strong> LLMs can hallucinate dates, past companies, or credentials when answering general questions.
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-[var(--text-muted)]">
                    <strong>Fix:</strong> Implemented LangGraph with a pre-seeded tool node (<code className="font-mono">_seed_tools_node</code>) that forces the agent to retrieve exact chunks before generating a single word.
                  </p>
                </div>

                <div className="rounded-2xl border border-[var(--glass-card-border)] bg-[var(--glass-card-bg)] p-6 shadow-xl backdrop-blur-md">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <span className="material-symbols-outlined">cloud_done</span>
                    <h3 className="text-base font-bold text-[var(--text-primary)]">
                      Zero-Latency Static Resume Serving
                    </h3>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-[var(--text-muted)]">
                    <strong>Challenge:</strong> Serving resumes from database BLOBs or S3 requires pre-signed URLs that expire and add cold-start latency.
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-[var(--text-muted)]">
                    <strong>Fix:</strong> Placed <code className="font-mono text-[var(--cream-active)]">Rajat_Khandelwal_Resume.pdf</code> directly in <code className="font-mono">frontend/public/</code>. Vercel automatically caches and delivers it via global Edge CDN.
                  </p>
                </div>

                <div className="rounded-2xl border border-[var(--glass-card-border)] bg-[var(--glass-card-bg)] p-6 shadow-xl backdrop-blur-md">
                  <div className="flex items-center gap-2 text-purple-400">
                    <span className="material-symbols-outlined">dns</span>
                    <h3 className="text-base font-bold text-[var(--text-primary)]">
                      Automatic Vector DB Failover
                    </h3>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-[var(--text-muted)]">
                    <strong>Challenge:</strong> Supabase free-tier projects pause after 7 days of inactivity, causing DB queries to fail.
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-[var(--text-muted)]">
                    <strong>Fix:</strong> Retrieval service maintains a local FAISS index on disk (<code className="font-mono">storage/faiss</code>). If Supabase is offline, it seamlessly falls back to FAISS with zero downtime.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </main>

        <footer className="mt-12 border-t border-[var(--footer-border)] bg-[var(--footer-bg)] px-6 py-8 text-center backdrop-blur-sm">
          <p className="text-xs text-[var(--text-muted)]">{footerText}</p>
        </footer>
      </div>
    </div>
  );
}
