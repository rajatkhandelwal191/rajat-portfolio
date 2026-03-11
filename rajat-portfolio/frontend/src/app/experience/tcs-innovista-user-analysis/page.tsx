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
  { label: "Project period", value: "Nov 2024 - Aug 2025" },
  { label: "Ticket volume handled", value: "~100K / 3 months" },
  { label: "Upload capacity", value: "Up to 100 MB" },
  { label: "Work type", value: "AI + Infra Automation" },
];

const detailSections: DetailSection[] = [
  {
    title: "Role and Project Scope",
    blocks: [
      {
        title: "Core Assignment",
        points: [
          "Project: User Analysis Project for TCS Innovista.",
          "Role: Lead Developer.",
          "Work Type: AI automation, backend workflows, incident analytics, infrastructure automation.",
        ],
      },
    ],
  },
  {
    title: "Data Ingestion and Processing Pipeline",
    blocks: [
      {
        title: "Data Ingestion System",
        points: [
          "Built a web upload portal for ITSM ticket datasets, chatbot conversation logs, and knowledge-base data.",
          "Supported CSV and XLSX uploads up to 100 MB, including datasets near one lakh ticket records.",
          "Validated required schema columns and pushed accepted files to Azure Blob Storage.",
        ],
      },
      {
        title: "Blob-Triggered Processing Architecture",
        points: [
          "Designed ingestion-to-processing decoupling using Azure Blob Storage and Azure Functions triggers.",
          "Enabled scalable, asynchronous batch processing for large ticket volumes.",
        ],
      },
      {
        title: "Preprocessing and Structuring",
        points: [
          "Implemented ticket text cleaning, normalization, and column standardization.",
          "Added category mapping via dictionary lookup and prepared structured datasets for model inference.",
        ],
      },
    ],
  },
  {
    title: "ML and NLP Implementation",
    blocks: [
      {
        title: "Model Pipeline",
        points: [
          "Implemented NLP text analysis with HuggingFace Transformers.",
          "Integrated BART (facebook/bart-large-cnn), T5 (t5-base), and Pegasus for summarization and text transformation.",
          "Built the workflow on transformers with PyTorch or TensorFlow, plus Pandas, NumPy, NLTK, and spaCy.",
        ],
      },
      {
        title: "Analytics Features Delivered",
        points: [
          "Automated ticket categorization to identify support tower ownership.",
          "Implemented sentiment classification (positive, neutral, negative) to surface frustration trends.",
          "Added automatic summarization for long ticket descriptions to improve review speed and reporting quality.",
        ],
      },
      {
        title: "Large-Scale Classification Impact",
        points: [
          "Automated analysis of high-volume datasets (~100K tickets in 3 months).",
          "Replaced manual review cycles that typically took 2 to 3 weeks.",
        ],
      },
      {
        title: "Automation Opportunity Detection",
        points: [
          "Detected repeated issue patterns and candidate automation use cases from historical tickets.",
          "Generated insights for recurring operational bottlenecks and service-improvement planning.",
        ],
      },
    ],
  },
  {
    title: "Storage, Visualization, and Infrastructure",
    blocks: [
      {
        title: "Persistence and Reporting",
        points: [
          "Stored processed metadata and analytics outputs in Cosmos DB.",
          "Exposed actionable metrics in Power BI dashboards, including ticket distribution, sentiment trends, recurring categories, and automation opportunities.",
        ],
      },
      {
        title: "Scalable Cloud Architecture",
        points: [
          "Implemented distributed processing using Azure Blob Storage, Azure Functions, AKS, ACI, Azure App Service, and Azure Service Bus.",
          "Containerized ML workflows with Docker for scalable execution on AKS or ACI.",
        ],
      },
      {
        title: "GPU and ML Runtime Setup",
        points: [
          "Configured ML VM environments with NVIDIA GPU support, CUDA, and cuDNN for faster transformer inference.",
          "Provisioned development tooling with Python, Jupyter, Docker, and GitHub-based workflows.",
        ],
      },
    ],
  },
  {
    title: "End-to-End Workflow",
    blocks: [
      {
        title: "Operational Flow",
        points: [
          "Ticket CSV upload through web portal.",
          "Azure Blob Storage persistence and Azure Functions trigger.",
          "Preprocessing and NLP pipeline execution.",
          "Classification, sentiment, and summarization outputs.",
          "Cosmos DB storage and Power BI dashboard visualization.",
        ],
      },
    ],
  },
];

const coreStack = [
  "Python",
  "HuggingFace Transformers",
  "BART",
  "T5",
  "Pegasus",
  "PyTorch",
  "TensorFlow",
  "Pandas",
  "NumPy",
  "NLTK",
  "spaCy",
  "Azure Blob Storage",
  "Azure Functions",
  "Cosmos DB",
  "Azure Kubernetes Service",
  "Azure Container Instances",
  "Azure App Service",
  "Azure Service Bus",
  "Docker",
  "GitHub",
  "Power BI",
];

export default function TcsInnovistaUserAnalysisPage() {
  const [theme, setTheme] = useState<Theme>("dark");
  const isDark = theme === "dark";

  const footerText = useMemo(
    () => `(c) ${new Date().getFullYear()} Rajat Khandelwal. TCS Innovista experience details.`,
    [],
  );

  useEffect(() => {
    document.title = "TCS Innovista User Analysis | Rajat Portfolio";
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
              logUiEvent("nav_clicked", { page: "experience_tcs_innovista_detail", label: item.label, href: item.href })
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
              <span className="material-symbols-outlined">insights</span>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-[var(--text-main)]">
                Tata Consultancy Services Ltd
              </h1>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">
                User Analysis Project for TCS Innovista
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              className="portfolio-glass inline-flex items-center gap-1 rounded-xl border border-[var(--glass-border)] px-3 py-2 text-sm text-[var(--text-muted)] transition-all hover:bg-[var(--icon-chip-bg)] hover:text-[var(--primary)]"
              href="/experience"
              onClick={() => logUiEvent("back_to_experience_clicked", { from: "experience_tcs_innovista_detail" })}
            >
              <span className="material-symbols-outlined text-lg">arrow_back</span>
              Back
            </Link>
            <button
              className="portfolio-glass flex size-10 items-center justify-center rounded-xl border border-[var(--glass-border)] text-[var(--primary)] transition-all hover:bg-[var(--icon-chip-bg)]"
              onClick={() => {
                logUiEvent("theme_toggle_clicked", {
                  page: "experience_tcs_innovista_detail",
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
              November 2024 - August 2025
            </p>
            <h2 className="mt-2 font-display text-3xl text-[var(--text-main)] md:text-4xl">
              Lead Developer - User Analysis Project (TCS Innovista)
            </h2>
            <p className="mt-4 max-w-4xl leading-relaxed text-[var(--text-muted)]">
              Implemented an AI-powered ticket analytics platform covering ingestion, NLP processing,
              storage, and visualization for incident insights and automation planning.
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

          <section className="portfolio-glass-card rounded-2xl border border-white/10 p-6">
            <h3 className="text-2xl font-semibold text-[var(--section-title)]">Technology Stack</h3>
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
          </section>
        </main>

        <footer className="mt-12 border-t border-[var(--footer-border)] bg-[var(--footer-bg)] px-6 py-8 text-center backdrop-blur-sm">
          <p className="text-xs text-[var(--text-muted)]">{footerText}</p>
        </footer>
      </div>
    </div>
  );
}
