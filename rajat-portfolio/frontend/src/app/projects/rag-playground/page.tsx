"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { logUiEvent } from "../../../lib/frontendLogger";

type Theme = "light" | "dark";

const navItems = [
  { href: "/", icon: "home", label: "Home" },
  { href: "/about", icon: "person", label: "About" },
  { href: "/projects", icon: "code_blocks", label: "Projects", active: true },
  { href: "/experience", icon: "history_edu", label: "Experience" },
  { href: "/contact", icon: "alternate_email", label: "Contact" },
];

const pipelineStages = [
  {
    title: "1. Ingestion",
    icon: "upload_file",
    detail: "Upload PDF, TXT, MD, HTML files. Supports local filesystem and Supabase S3 cloud storage with automatic fallback. Uses pdfplumber for PDF extraction with PyPDF2 fallback.",
  },
  {
    title: "2. Preprocessing",
    icon: "cleaning_services",
    detail: "Configurable text cleaning: lowercase conversion, whitespace normalization, URL/email removal, OCR artifact fixes, and Unicode normalization with detailed statistics.",
  },
  {
    title: "3. Chunking",
    icon: "splitscreen",
    detail: "Three strategies: Fixed-size (1000 chars, 200 overlap), Recursive (paragraph-aware), and Semantic (sentence-boundary). All with token counting and metadata.",
  },
  {
    title: "4. Embedding",
    icon: "neurology",
    detail: "Generate vectors using Google Gemini (768-dim), OpenAI text-embedding-3-small/large (1536/3072-dim), or ada-002. Batch processing with error handling.",
  },
  {
    title: "5. Vector Indexing",
    icon: "database",
    detail: "Index to Qdrant vector database with HNSW algorithm. Auto-creates collections, handles dimension mismatches, stores full chunk content in payloads for reconstruction.",
  },
  {
    title: "6. Retrieval",
    icon: "search",
    detail: "Similarity search with query embedding, model auto-detection, and metadata filtering. Returns top-k chunks with scores and latency metrics.",
  },
  {
    title: "7. Reranking",
    icon: "sort",
    detail: "Re-ranks retrieved chunks using keyword overlap scoring. Production systems would use cross-encoder models or Cohere Rerank API.",
  },
  {
    title: "8. Generation",
    icon: "auto_awesome",
    detail: "Generate responses using OpenAI GPT-3.5/4, Google Gemini, or Groq Llama. Multiple prompt templates: default, detailed, concise, step-by-step reasoning.",
  },
  {
    title: "9. Evaluation",
    icon: "analytics",
    detail: "Track latency, token counts, estimated costs, faithfulness, relevance, context utilization, and response quality metrics for pipeline optimization.",
  },
];

const techStack = [
  { category: "Frontend", items: ["Next.js 16", "React 19", "TypeScript 5", "Tailwind 4", "shadcn/ui", "Zustand", "React Flow", "Recharts"] },
  { category: "Backend", items: ["FastAPI 0.135", "Python 3.11", "Uvicorn", "Pydantic 2"] },
  { category: "RAG Pipeline", items: ["pdfplumber", "qdrant-client", "google-generativeai", "openai", "groq", "tiktoken", "scikit-learn"] },
  { category: "Infrastructure", items: ["Supabase S3", "Qdrant Cloud", "Netlify", "Docker"] },
];

const keyFeatures = [
  "Interactive visual pipeline with React Flow DAG visualization",
  "Multi-provider embedding support (Google, OpenAI) with dimension auto-detection",
  "Dual vector store support: Local FAISS and Qdrant Cloud with automatic failover",
  "Three chunking strategies with configurable parameters and token counting",
  "Real-time logging with color-coded levels and stage filtering",
  "Multiple LLM providers: OpenAI, Google Gemini, Groq with prompt templates",
  "Comprehensive evaluation metrics: latency, tokens, cost, faithfulness, relevance",
  "Cloud-ready architecture with environment-based configuration switching",
];

const architectureHighlights = [
  {
    title: "Modular Pipeline Design",
    detail: "Each RAG stage is independently testable with clear input/output contracts. Stages can be swapped or upgraded without affecting others.",
  },
  {
    title: "Provider Abstraction",
    detail: "Unified interfaces for embeddings (Google/OpenAI) and LLMs (OpenAI/Gemini/Groq) enable easy provider switching via configuration.",
  },
  {
    title: "Storage Flexibility",
    detail: "Environment-based switching between local filesystem and Supabase S3 with automatic fallback ensures development and production compatibility.",
  },
  {
    title: "Observability First",
    detail: "Structured logging with request IDs, stage tracking, and error traces. Frontend log viewer provides real-time pipeline visibility.",
  },
];

export default function RAGPlaygroundPage() {
  const [theme, setTheme] = useState<Theme>("dark");
  const isDark = theme === "dark";

  const footerText = useMemo(
    () => `(c) ${new Date().getFullYear()} Rajat Khandelwal. RAG Playground Project.`,
    [],
  );

  return (
    <div
      className={`portfolio-shell relative min-h-screen w-full overflow-x-hidden ${
        isDark ? "dark-pattern" : "light-pattern"
      }`}
      data-theme={theme}
    >
      <aside className="nav-float fixed left-6 top-1/2 z-50 hidden -translate-y-1/2 flex-col items-center gap-6 rounded-full border border-[var(--nav-border)] px-3 py-6 lg:flex">
        {navItems.map((item) => (
          <a
            key={item.label}
            className={`group relative flex size-12 items-center justify-center rounded-full transition-all ${
              item.active
                ? "bg-[var(--primary)] text-white shadow-[0_10px_24px_var(--primary-glow)]"
                : "text-[var(--text-muted)] hover:bg-[var(--icon-chip-bg)] hover:text-[var(--primary)]"
            }`}
            href={item.href}
            onClick={() => logUiEvent("nav_clicked", { page: "project_detail_rag", label: item.label, href: item.href })}
          >
            <span
              className="material-symbols-outlined text-2xl"
              style={item.active ? { fontVariationSettings: "'FILL' 1, 'wght' 600" } : undefined}
            >
              {item.icon}
            </span>
            <span className="pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded bg-slate-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
              {item.label}
            </span>
          </a>
        ))}
      </aside>

      <div className="layout-container relative flex min-h-screen w-full flex-col lg:pl-24">
        <motion.header
          animate={{ opacity: 1, y: 0 }}
          className="portfolio-glass sticky top-0 z-40 mx-6 mt-4 flex items-center justify-between rounded-xl border-b border-[var(--glass-border)] px-6 py-6 lg:mx-0 lg:mt-0 lg:rounded-none lg:px-12"
          initial={{ opacity: 0, y: -18 }}
          transition={{ duration: 0.35 }}
        >
          <div className="flex items-center gap-4">
            <div className="flex size-10 items-center justify-center rounded-full bg-[var(--primary)] text-white shadow-[0_0_20px_var(--primary-glow)]">
              <span className="material-symbols-outlined">psychology</span>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-[var(--text-main)]">RAG Playground</h1>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">
                Interactive RAG Pipeline
              </p>
            </div>
          </div>
          <button
            className="portfolio-glass flex size-10 items-center justify-center rounded-xl border border-[var(--glass-border)] text-[var(--primary)] transition-all hover:bg-[var(--icon-chip-bg)]"
            onClick={() => {
              logUiEvent("theme_toggle_clicked", { page: "project_detail_rag", from: theme, to: isDark ? "light" : "dark" });
              setTheme(isDark ? "light" : "dark");
            }}
            type="button"
          >
            <span className="material-symbols-outlined">{isDark ? "light_mode" : "dark_mode"}</span>
          </button>
        </motion.header>

        <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-12">
          <motion.section
            animate={{ opacity: 1, y: 0 }}
            className="feature-card relative mb-10 overflow-hidden rounded-3xl"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
          >
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(135deg, #06b6d4 0%, #0891b2 45%, #0e7490 100%)", opacity: 0.94 }}
            />
            <div className="project-noise absolute inset-0 opacity-20" />
            <div className="relative z-10 p-8 text-white md:p-10">
              <p className="mb-3 inline-flex items-center rounded-full border border-white/15 bg-black/20 px-3 py-1 text-xs uppercase tracking-[0.15em]">
                Educational RAG Platform
              </p>
              <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
                RAG Playground
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/90 md:text-lg">
                Interactive web application that demonstrates and visualizes the complete Retrieval-Augmented Generation (RAG) pipeline. 
                Experiment with document ingestion, preprocessing, chunking strategies, embeddings, vector search, and AI-powered generation 
                across multiple providers.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-[#0891b2] transition-colors hover:bg-slate-100"
                  href="https://ragtutorial.netlify.app/"
                  onClick={() => logUiEvent("project_link_clicked", { page: "project_detail_rag", cta: "view_live" })}
                  rel="noreferrer noopener"
                  target="_blank"
                >
                  View Live
                  <span className="material-symbols-outlined text-sm">open_in_new</span>
                </a>
                <a
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-black/20 px-5 py-3 font-medium text-white backdrop-blur-sm transition-colors hover:bg-black/30"
                  href="https://github.com/rajatkhandelwal191"
                  onClick={() => logUiEvent("project_link_clicked", { page: "project_detail_rag", cta: "source_code" })}
                  rel="noreferrer noopener"
                  target="_blank"
                >
                  Source Code
                  <span className="material-symbols-outlined text-sm">code</span>
                </a>
              </div>
            </div>
          </motion.section>

          <section className="mb-10">
            <div className="mb-5 flex items-center gap-3">
              <span className="material-symbols-outlined text-2xl text-[var(--cream-active)]">account_tree</span>
              <h3 className="text-2xl font-semibold text-[var(--text-main)]">RAG Pipeline Stages</h3>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {pipelineStages.map((stage, index) => (
                <motion.article
                  animate={{ opacity: 1, y: 0 }}
                  className="portfolio-glass-card rounded-2xl p-5"
                  initial={{ opacity: 0, y: 16 }}
                  key={stage.title}
                  transition={{ duration: 0.35, delay: index * 0.04 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-[var(--primary-soft)] p-2 text-[var(--primary)]">
                      <span className="material-symbols-outlined">{stage.icon}</span>
                    </div>
                    <h4 className="font-semibold text-[var(--text-main)]">{stage.title}</h4>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">{stage.detail}</p>
                </motion.article>
              ))}
            </div>
          </section>

          <section className="mb-10">
            <h3 className="mb-5 text-2xl font-semibold text-[var(--text-main)]">Architecture Highlights</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {architectureHighlights.map((item, index) => (
                <motion.article
                  animate={{ opacity: 1, x: 0 }}
                  className="portfolio-glass-card rounded-2xl p-5"
                  initial={{ opacity: 0, x: -14 }}
                  key={item.title}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <h4 className="text-lg font-semibold text-[var(--text-main)]">{item.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{item.detail}</p>
                </motion.article>
              ))}
            </div>
          </section>

          <section className="mb-10">
            <h3 className="mb-5 text-2xl font-semibold text-[var(--text-main)]">Technology Stack</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {techStack.map((stack, index) => (
                <motion.article
                  animate={{ opacity: 1, y: 0 }}
                  className="portfolio-glass-card rounded-2xl p-5"
                  initial={{ opacity: 0, y: 16 }}
                  key={stack.category}
                  transition={{ duration: 0.35, delay: index * 0.05 }}
                >
                  <h4 className="mb-3 text-lg font-semibold text-[var(--text-main)]">{stack.category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {stack.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-lg bg-[var(--icon-chip-bg)] px-3 py-1 text-xs font-medium text-[var(--text-main)]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.article>
              ))}
            </div>
          </section>

          <section className="mb-10">
            <h3 className="mb-5 text-2xl font-semibold text-[var(--text-main)]">Key Features</h3>
            <motion.article
              animate={{ opacity: 1, y: 0 }}
              className="portfolio-glass-card rounded-3xl p-6"
              initial={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.35 }}
            >
              <ul className="space-y-3 text-sm leading-relaxed text-[var(--text-muted)]">
                {keyFeatures.map((feature) => (
                  <li className="flex items-start gap-3" key={feature}>
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--primary)]" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          </section>

          <section className="portfolio-glass-card rounded-3xl border border-[var(--card-hover-border)] p-6">
            <h3 className="text-2xl font-semibold text-[var(--text-main)]">External Services</h3>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <div className="rounded-xl border border-[var(--card-hover-border)] bg-[var(--icon-chip-bg)] p-4">
                <h4 className="mb-2 font-semibold text-[var(--text-main)]">Supabase S3</h4>
                <p className="text-xs text-[var(--text-muted)]">Cloud file storage with automatic fallback to local filesystem</p>
              </div>
              <div className="rounded-xl border border-[var(--card-hover-border)] bg-[var(--icon-chip-bg)] p-4">
                <h4 className="mb-2 font-semibold text-[var(--text-main)]">Qdrant Cloud</h4>
                <p className="text-xs text-[var(--text-muted)]">Vector database with HNSW indexing and payload storage</p>
              </div>
              <div className="rounded-xl border border-[var(--card-hover-border)] bg-[var(--icon-chip-bg)] p-4">
                <h4 className="mb-2 font-semibold text-[var(--text-main)]">LLM APIs</h4>
                <p className="text-xs text-[var(--text-muted)]">OpenAI, Google Gemini, Groq for embeddings and generation</p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                className="rounded-xl border border-[var(--card-hover-border)] bg-[var(--icon-chip-bg)] px-4 py-2 text-sm text-[var(--text-main)] transition-colors hover:text-[var(--primary)]"
                href="https://ragtutorial.netlify.app/"
                onClick={() => logUiEvent("project_link_clicked", { page: "project_detail_rag", cta: "app_link" })}
                rel="noreferrer noopener"
                target="_blank"
              >
                Live Application
              </a>
              <a
                className="rounded-xl border border-[var(--card-hover-border)] bg-[var(--icon-chip-bg)] px-4 py-2 text-sm text-[var(--text-main)] transition-colors hover:text-[var(--primary)]"
                href="https://www.linkedin.com/in/rajatkhandelwal27/"
                onClick={() => logUiEvent("profile_link_clicked", { page: "project_detail_rag", platform: "linkedin" })}
                rel="noreferrer noopener"
                target="_blank"
              >
                LinkedIn
              </a>
            </div>
          </section>
        </main>

        <footer className="mt-auto border-t border-[var(--footer-border)] bg-[var(--footer-bg)] px-6 py-10 text-center backdrop-blur-sm">
          <p className="text-xs text-[var(--text-muted)]">{footerText}</p>
        </footer>
      </div>
    </div>
  );
}
