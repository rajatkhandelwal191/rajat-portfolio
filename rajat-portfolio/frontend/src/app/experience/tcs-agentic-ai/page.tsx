"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { logUiEvent } from "../../../lib/frontendLogger";

type Theme = "light" | "dark";

type DetailBlock = {
  title: string;
  points: string[];
};

type DetailSection = {
  title: string;
  blocks: DetailBlock[];
};

const navItems = [
  { href: "/", icon: "home", label: "Home" },
  { href: "/about", icon: "person", label: "About" },
  { href: "/projects", icon: "code_blocks", label: "Projects" },
  { href: "/experience", icon: "history_edu", label: "Experience", active: true },
  { href: "/contact", icon: "alternate_email", label: "Contact" },
  { href: "/#chatbot", icon: "smart_toy", label: "RajatGPT" },
];

const impactMetrics = [
  { label: "Manual effort reduction", value: "70-80%" },
  { label: "Automation coverage", value: "4 Major Workflows" },
  { label: "Reporting cadence", value: "Daily / Weekly / Monthly" },
  { label: "Execution reliability", value: "Idempotent + Locked" },
];

const detailSections: DetailSection[] = [
  {
    title: "Production AI Agents Delivered",
    blocks: [
      {
        title: "Heatmap Analysis AI Agent",
        points: [
          "Built end-to-end on LangGraph using reusable AI nodes and decision tools.",
          "Automated recurring issue detection, behavior patterns, and server-level trend analysis.",
          "Used schema-based prompts to enforce deterministic JSON outputs.",
        ],
      },
      {
        title: "Patching Analysis AI Agent",
        points: [
          "Validated iPatch data and computed patch compliance KPIs.",
          "Correlated patch gaps with incidents to expose operational risk clusters.",
          "Built Streamlit UI with Plotly, Matplotlib, and Seaborn visualizations.",
          "Delivered automated PDF reports via FPDF with exact-once generation controls.",
        ],
      },
      {
        title: "Incident Analysis AI Agent",
        points: [
          "Enabled contextual retrieval of historical incident resolutions for faster RCA.",
          "Implemented governed retrieval workflows for secure customer data access.",
          "Automated knowledge discovery across multiple infrastructure towers.",
        ],
      },
      {
        title: "Drive Cleanup Agent",
        points: [
          "Automated filesystem incident classification through rule-based and AI-assisted logic.",
          "Standardized ticket assignment and triage patterns across operations teams.",
        ],
      },
    ],
  },
  {
    title: "Architecture and Orchestration Engineering",
    blocks: [
      {
        title: "LangGraph Decision Orchestration",
        points: [
          "Designed directed graph workflows with branching, fallback, and decision nodes.",
          "Enforced deterministic behavior through schema-controlled tool responses.",
        ],
      },
      {
        title: "Token and Rate-Limit Resilience",
        points: [
          "Built chunking pipelines for report payloads exceeding 128K tokens.",
          "Implemented retry, timeout, and sequential processing controls to avoid overlap failures.",
        ],
      },
      {
        title: "Long-Running Workload Handling",
        points: [
          "Introduced spawned subprocess execution for tasks exceeding 240 seconds.",
          "Used multithreaded request handling to keep UI responsive under heavy load.",
        ],
      },
      {
        title: "Real-Time Progress Visibility",
        points: [
          "Created live status tracking UI for long-running report execution.",
          "Removed user confusion around perceived hung tasks.",
        ],
      },
    ],
  },
  {
    title: "Cloud, Storage, and Reporting Automation",
    blocks: [
      {
        title: "Azure Blob Locking, Leasing, and Caching",
        points: [
          "Applied blob leases and locks for safe parallel processing without race conditions.",
          "Guaranteed single-writer behavior in concurrent execution scenarios.",
          "Added cache-based SAS URL reuse for repeated tower-node-date report requests.",
          "Reduced compute overhead and improved response time for repeated report access.",
        ],
      },
      {
        title: "End-to-End Automated Reporting",
        points: [
          "Built daily, weekly, and monthly report pipelines using LangGraph, Python, FPDF, and Azure Blob Storage.",
          "Delivered leadership-ready, audit-oriented compliance and infrastructure health summaries.",
        ],
      },
    ],
  },
  {
    title: "Critical Issues Resolved",
    blocks: [
      {
        title: "Performance, Stability, and Defect Management",
        points: [
          "Fixed request timeouts beyond 240 seconds using subprocess spawn and threading patterns.",
          "Resolved AI rate-limit and token overflow failures with chunking and controlled retries.",
          "Eliminated duplicate PDF generation through idempotency and blob lease controls.",
          "Validated full UI dialog flow through positive and negative scenario testing.",
          "Stabilized RAG, Cosmos DB, and indexing workflows by correcting keys and throttling behavior.",
          "Reduced merge-conflict regressions through DRY refactors and stronger GitHub Actions pipelines.",
        ],
      },
    ],
  },
];

const coreStack = [
  "LangChain",
  "LangGraph",
  "Deterministic JSON Schema Prompts",
  "RAG Patterns",
  "Python (async / threading / subprocess)",
  "Streamlit",
  "Plotly",
  "Seaborn",
  "Matplotlib",
  "Azure Blob Storage (Locking, Leasing, SAS)",
  "FPDF",
  "GitHub Actions",
  "Cybersecurity Controls",
];

const highlights = [
  "Led enterprise AI knowledge-sharing sessions on RAG and production engineering patterns.",
  "Improved team coding standards through reusable architecture and defensive coding practices.",
  "Mentored teammates on debugging workflows and practical AI agent adoption in operations.",
  "Delivered scalable, secure, low-defect systems end-to-end from design to production support.",
];

export default function TcsAgenticAiExperiencePage() {
  const [theme, setTheme] = useState<Theme>("dark");
  const isDark = theme === "dark";

  const footerText = useMemo(
    () => `(c) ${new Date().getFullYear()} Rajat Khandelwal. TCS experience details.`,
    [],
  );

  useEffect(() => {
    document.title = "TCS Agentic AI Experience | Rajat Portfolio";
  }, []);

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
            aria-label={item.label}
            className={`group relative flex size-12 items-center justify-center rounded-full transition-all ${
              item.active
                ? "bg-[var(--primary)] text-white shadow-[0_10px_24px_var(--primary-glow)]"
                : "text-[var(--text-muted)] hover:bg-[var(--icon-chip-bg)] hover:text-[var(--primary)]"
            }`}
            href={item.href}
            onClick={() =>
              logUiEvent("nav_clicked", { page: "experience_tcs_detail", label: item.label, href: item.href })
            }
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

      <div className="layout-container relative mx-auto min-h-screen w-full max-w-6xl px-6 py-16 md:pl-24 lg:pl-0">
        <motion.header
          animate={{ opacity: 1, y: 0 }}
          className="portfolio-glass sticky top-4 z-40 mb-12 flex items-center justify-between rounded-xl border border-[var(--glass-border)] px-6 py-5"
          initial={{ opacity: 0, y: -18 }}
          transition={{ duration: 0.35 }}
        >
          <div className="flex items-center gap-4">
            <div className="flex size-10 items-center justify-center rounded-full bg-[var(--primary)] text-white shadow-[0_0_20px_var(--primary-glow)]">
              <span className="material-symbols-outlined">history_edu</span>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-[var(--text-main)]">
                Tata Consultancy Services Ltd
              </h1>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">
                Agentic AI Workflow for Infra Operations
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              className="portfolio-glass inline-flex items-center gap-1 rounded-xl border border-[var(--glass-border)] px-3 py-2 text-sm text-[var(--text-muted)] transition-all hover:bg-[var(--icon-chip-bg)] hover:text-[var(--primary)]"
              href="/experience"
              onClick={() => logUiEvent("back_to_experience_clicked", { from: "experience_tcs_detail" })}
            >
              <span className="material-symbols-outlined text-lg">arrow_back</span>
              Back
            </Link>
            <button
              className="portfolio-glass flex size-10 items-center justify-center rounded-xl border border-[var(--glass-border)] text-[var(--primary)] transition-all hover:bg-[var(--icon-chip-bg)]"
              onClick={() => {
                logUiEvent("theme_toggle_clicked", {
                  page: "experience_tcs_detail",
                  from: theme,
                  to: isDark ? "light" : "dark",
                });
                setTheme(isDark ? "light" : "dark");
              }}
              type="button"
            >
              <span className="material-symbols-outlined">{isDark ? "light_mode" : "dark_mode"}</span>
            </button>
          </div>
        </motion.header>

        <main className="space-y-10">
          <section className="portfolio-glass-card rounded-3xl border border-white/10 p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--primary)]">
              August 2025 - Present
            </p>
            <h2 className="mt-2 font-display text-3xl text-[var(--text-main)] md:text-4xl">
              Lead AI Engineer - Agentic AI Workflow for Infra Operations (ITIS)
            </h2>
            <p className="mt-4 max-w-4xl leading-relaxed text-[var(--text-muted)]">
              Designed and implemented a complete Agentic-AI automation ecosystem for infrastructure
              operations, spanning analytics, reporting, incident intelligence, and governance workflows.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {impactMetrics.map((item, index) => (
                <motion.div
                  key={item.label}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4"
                  initial={{ opacity: 0, y: 12 }}
                  transition={{ duration: 0.3, delay: index * 0.06 }}
                >
                  <p className="text-lg font-bold text-[var(--cream-active)]">{item.value}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">{item.label}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {detailSections.map((section, sectionIndex) => (
            <motion.section
              key={section.title}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-5"
              initial={{ opacity: 0, y: 18 }}
              transition={{ duration: 0.35, delay: sectionIndex * 0.05 }}
            >
              <div className="mb-2 flex items-center gap-4">
                <h3 className="text-2xl font-semibold text-[var(--section-title)]">{section.title}</h3>
                <div className="h-px flex-grow bg-[var(--section-line)]" />
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                {section.blocks.map((block) => (
                  <article key={block.title} className="portfolio-glass-card rounded-2xl border border-white/10 p-6">
                    <h4 className="text-lg font-semibold text-[var(--text-main)]">{block.title}</h4>
                    <ul className="mt-4 space-y-3 text-[var(--text-muted)]">
                      {block.points.map((point) => (
                        <li key={point} className="flex items-start gap-3 leading-relaxed">
                          <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--cream-active)] shadow-[0_0_8px_rgba(255,228,196,0.6)]" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </motion.section>
          ))}

          <section className="grid gap-5 lg:grid-cols-2">
            <article className="portfolio-glass-card rounded-2xl border border-white/10 p-6">
              <h3 className="text-2xl font-semibold text-[var(--section-title)]">Core Tech Stack</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {coreStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-[var(--text-muted)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </article>

            <article className="portfolio-glass-card rounded-2xl border border-white/10 p-6">
              <h3 className="text-2xl font-semibold text-[var(--section-title)]">Additional Highlights</h3>
              <ul className="mt-4 space-y-3 text-[var(--text-muted)]">
                {highlights.map((point) => (
                  <li key={point} className="flex items-start gap-3 leading-relaxed">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--cream-active)] shadow-[0_0_8px_rgba(255,228,196,0.6)]" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          </section>
        </main>

        <footer className="mt-12 border-t border-[var(--footer-border)] bg-[var(--footer-bg)] px-6 py-8 text-center backdrop-blur-sm">
          <p className="text-xs text-[var(--text-muted)]">{footerText}</p>
        </footer>
      </div>
    </div>
  );
}
