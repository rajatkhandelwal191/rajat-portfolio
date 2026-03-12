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

const architectureCards = [
  {
    title: "UI Layer",
    icon: "web",
    detail:
      "Streamlit chat UI captures the prompt, builds GraphState, invokes LangGraph, and renders responses plus upload controls.",
  },
  {
    title: "Orchestration Layer",
    icon: "account_tree",
    detail:
      "Supervisor classifies intent and routes to RAG_FLOW, TOOL_FLOW, RFP_FLOW, or UPLOAD_FLOW using conditional graph edges.",
  },
  {
    title: "Execution Layer",
    icon: "smart_toy",
    detail:
      "Specialized agents execute retrieval Q&A, SQLite tool actions, enterprise RFP drafting, and upload-first workflows.",
  },
  {
    title: "Data + Ops Layer",
    icon: "storage",
    detail:
      "Retrieval runs on FAISS or Qdrant, tool data comes from SQLite, and standardized logger traces each request_id end to end.",
  },
];

const lifecycleSteps = [
  {
    title: "1) Receive Question",
    detail:
      "Streamlit captures user text with st.chat_input(), generates request_id, and initializes GraphState with optional uploaded_file.",
  },
  {
    title: "2) Classify Intent",
    detail:
      "Supervisor node in nodes.py calls router.py intent logic with keyword-first routing and optional LLM fallback.",
  },
  {
    title: "3) Route by Graph",
    detail:
      "graph.py sends flow to rag/tool/rfp/upload nodes through conditional edges and then exits at END.",
  },
  {
    title: "4) Execute Agent",
    detail:
      "RAG uses similarity search context, TOOL queries open incidents/requests, RFP drafts proposals with optional PDF context.",
  },
  {
    title: "5) Render + Log",
    detail:
      "Response, intent, and upload hints are returned to UI; chat history updates and logs include flow decisions and response preview.",
  },
];

const buildHighlights = [
  "LangGraph multi-route architecture with supervisor + deterministic routing paths.",
  "RAG pipeline with local FAISS indexing and cloud Qdrant retrieval abstraction.",
  "Tooling agent integrated with SQLite incidents and service request tables.",
  "RFP proposal generator using uploaded PDF parsing with bounded context extraction.",
  "Provider-aware model layer supporting Ollama, Gemini, and Groq via config.",
  "Observability-first logging chain from UI events to node and tool execution.",
];

const usageItems = [
  "Ask operations queries: `show open incidents`, `show open requests`.",
  "Ask enterprise drafting prompts: `Draft proposal for cloud migration`.",
  "Use upload flow: `I want to upload an RFP` then attach PDF and request summary/draft.",
  "Run app locally with `poetry run streamlit run app/ui/streamlit_app.py`.",
  "Initialize data with `poetry run python -m app.db.init_db` and `poetry run python -m app.db.seed_db`.",
  "Build retrieval index with `poetry run python -m app.rag.build_index` (local) or ingest Qdrant for cloud mode.",
];

export default function CapstoneEnterpriseAssistantPage() {
  const [theme, setTheme] = useState<Theme>("dark");
  const isDark = theme === "dark";

  const footerText = useMemo(
    () => `(c) ${new Date().getFullYear()} Rajat Khandelwal. Capstone Project details.`,
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
            onClick={() => logUiEvent("nav_clicked", { page: "project_detail_capstone", label: item.label, href: item.href })}
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
              <span className="material-symbols-outlined">architecture</span>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-[var(--text-main)]">Capstone Project</h1>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">
                Enterprise Assistant
              </p>
            </div>
          </div>
          <button
            className="portfolio-glass flex size-10 items-center justify-center rounded-xl border border-[var(--glass-border)] text-[var(--primary)] transition-all hover:bg-[var(--icon-chip-bg)]"
            onClick={() => {
              logUiEvent("theme_toggle_clicked", { page: "project_detail_capstone", from: theme, to: isDark ? "light" : "dark" });
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
              style={{ background: "linear-gradient(135deg, #f59e0b 0%, #f97316 45%, #b45309 100%)", opacity: 0.94 }}
            />
            <div className="project-noise absolute inset-0 opacity-20" />
            <div className="relative z-10 p-8 text-white md:p-10">
              <p className="mb-3 inline-flex items-center rounded-full border border-white/15 bg-black/20 px-3 py-1 text-xs uppercase tracking-[0.15em]">
                Agentic AI Capstone
              </p>
              <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
                Enterprise Assistant
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/90 md:text-lg">
                End-to-end enterprise assistant built with Streamlit + LangGraph that combines retrieval Q&A,
                operational tool automation, and RFP proposal generation in a single routed architecture.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-[#ea580c] transition-colors hover:bg-slate-100"
                  href="https://capstoneprojectagenticairag-hgpicyqq4joiksq2bhtc3q.streamlit.app/"
                  onClick={() => logUiEvent("project_link_clicked", { page: "project_detail_capstone", cta: "view_live" })}
                  rel="noreferrer noopener"
                  target="_blank"
                >
                  View Live
                  <span className="material-symbols-outlined text-sm">open_in_new</span>
                </a>
                <a
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-black/20 px-5 py-3 font-medium text-white backdrop-blur-sm transition-colors hover:bg-black/30"
                  href="https://github.com/rajatkhandelwal191/Capstone_Project_Agentic_Ai_RAG"
                  onClick={() => logUiEvent("project_link_clicked", { page: "project_detail_capstone", cta: "source_code" })}
                  rel="noreferrer noopener"
                  target="_blank"
                >
                  Source Code
                  <span className="material-symbols-outlined text-sm">code</span>
                </a>
                <a
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 font-medium text-white transition-colors hover:bg-white/20"
                  href="https://github.com/rajatkhandelwal191"
                  onClick={() => logUiEvent("profile_link_clicked", { page: "project_detail_capstone", platform: "github" })}
                  rel="noreferrer noopener"
                  target="_blank"
                >
                  GitHub Profile
                  <span className="material-symbols-outlined text-sm">person</span>
                </a>
              </div>
            </div>
          </motion.section>

          <section className="mb-10">
            <div className="mb-5 flex items-center gap-3">
              <span className="material-symbols-outlined text-2xl text-[var(--cream-active)]">hub</span>
              <h3 className="text-2xl font-semibold text-[var(--text-main)]">Architecture At A Glance</h3>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {architectureCards.map((card, index) => (
                <motion.article
                  animate={{ opacity: 1, y: 0 }}
                  className="portfolio-glass-card rounded-2xl p-5"
                  initial={{ opacity: 0, y: 16 }}
                  key={card.title}
                  transition={{ duration: 0.35, delay: index * 0.06 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-[var(--primary-soft)] p-2 text-[var(--primary)]">
                      <span className="material-symbols-outlined">{card.icon}</span>
                    </div>
                    <h4 className="font-semibold text-[var(--text-main)]">{card.title}</h4>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">{card.detail}</p>
                </motion.article>
              ))}
            </div>
          </section>

          <section className="mb-10">
            <h3 className="mb-5 text-2xl font-semibold text-[var(--text-main)]">Request Lifecycle</h3>
            <div className="space-y-3">
              {lifecycleSteps.map((step, index) => (
                <motion.article
                  animate={{ opacity: 1, x: 0 }}
                  className="portfolio-glass-card rounded-2xl p-5"
                  initial={{ opacity: 0, x: -14 }}
                  key={step.title}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <h4 className="text-lg font-semibold text-[var(--text-main)]">{step.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{step.detail}</p>
                </motion.article>
              ))}
            </div>
          </section>

          <section className="mb-10 grid gap-6 lg:grid-cols-2">
            <article className="portfolio-glass-card rounded-3xl p-6">
              <h3 className="text-2xl font-semibold text-[var(--text-main)]">What Is Built</h3>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-[var(--text-muted)]">
                {buildHighlights.map((item) => (
                  <li className="flex items-start gap-2" key={item}>
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[var(--primary)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
            <article className="portfolio-glass-card rounded-3xl p-6">
              <h3 className="text-2xl font-semibold text-[var(--text-main)]">How To Use</h3>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-[var(--text-muted)]">
                {usageItems.map((item) => (
                  <li className="flex items-start gap-2" key={item}>
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[var(--primary)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </section>

          <section className="portfolio-glass-card rounded-3xl border border-[var(--card-hover-border)] p-6">
            <h3 className="text-2xl font-semibold text-[var(--text-main)]">Links</h3>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                className="rounded-xl border border-[var(--card-hover-border)] bg-[var(--icon-chip-bg)] px-4 py-2 text-sm text-[var(--text-main)] transition-colors hover:text-[var(--primary)]"
                href="https://github.com/rajatkhandelwal191/Capstone_Project_Agentic_Ai_RAG"
                onClick={() => logUiEvent("project_link_clicked", { page: "project_detail_capstone", cta: "repo_link" })}
                rel="noreferrer noopener"
                target="_blank"
              >
                Capstone Repository
              </a>
              <a
                className="rounded-xl border border-[var(--card-hover-border)] bg-[var(--icon-chip-bg)] px-4 py-2 text-sm text-[var(--text-main)] transition-colors hover:text-[var(--primary)]"
                href="https://capstoneprojectagenticairag-hgpicyqq4joiksq2bhtc3q.streamlit.app/"
                onClick={() => logUiEvent("project_link_clicked", { page: "project_detail_capstone", cta: "app_link" })}
                rel="noreferrer noopener"
                target="_blank"
              >
                Live Application
              </a>
              <a
                className="rounded-xl border border-[var(--card-hover-border)] bg-[var(--icon-chip-bg)] px-4 py-2 text-sm text-[var(--text-main)] transition-colors hover:text-[var(--primary)]"
                href="https://www.linkedin.com/in/rajatkhandelwal27/"
                onClick={() => logUiEvent("profile_link_clicked", { page: "project_detail_capstone", platform: "linkedin" })}
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
