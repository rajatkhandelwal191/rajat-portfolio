"use client";

import { KeyboardEvent, MouseEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { logUiEvent } from "../../lib/frontendLogger";
import { useTheme } from "../../context/ThemeContext";

type LogoType = "enterprise" | "anass" | "parser" | "deepdisk" | "vaulet";

type ProjectSection = "websites" | "apps";

type FeaturedProject = {
  title: string;
  category: string;
  section: ProjectSection;
  description: string;
  tags: string[];
  gradient: string;
  accent: string;
  logo: LogoType;
  primaryCta: string;
  primaryHref?: string;
  secondaryCta?: string;
  secondaryHref?: string;
  detailHref?: string;
  architectureSummary?: string[];
};

const navItems = [
  { href: "/", icon: "home", label: "Home" },
  { href: "/about", icon: "person", label: "About" },
  { href: "/projects", icon: "code_blocks", label: "Projects", active: true },
  { href: "/experience", icon: "history_edu", label: "Experience" },
  { href: "/resume", icon: "description", label: "Resume" },
  { href: "/contact", icon: "alternate_email", label: "Contact" },
  { href: "/#chatbot", icon: "smart_toy", label: "RajatGPT" },
];

const featuredProjects: FeaturedProject[] = [
  // --- WEBSITES SECTION ---
  {
    title: "AI Portfolio & Agentic RAG Platform",
    category: "Full-Stack System Architecture (This Site)",
    section: "websites",
    description:
      "The complete architectural design, backend integration, and agentic AI pipeline powering this portfolio. Built with Next.js 15, FastAPI, LangGraph multi-tool state machine, Groq 120B inference, and dual vector stores (Supabase pgvector + local FAISS fallback).",
    tags: ["Next.js 15", "FastAPI", "LangGraph", "Groq 120B", "Supabase pgvector", "FAISS", "SentenceTransformers", "TypeScript", "Vercel", "Fly.io"],
    gradient: "linear-gradient(135deg, #8b5cf6 0%, #6366f1 45%, #3b82f6 100%)",
    accent: "#8b5cf6",
    logo: "enterprise",
    primaryCta: "Explore Architecture",
    primaryHref: "/projects/portfolio-architecture",
    detailHref: "/projects/portfolio-architecture",
    architectureSummary: [
      "Decoupled Monorepo: Next.js 15 (App Router, Edge CDN) + FastAPI (Dockerized ASGI on Fly.io Singapore).",
      "Agentic RAG Engine: LangGraph StateGraph with pre-seeded tool calls querying Supabase pgvector with local FAISS failover.",
      "Ultra-Fast Inference: Groq LPU running openai/gpt-oss-120b with strict grounding and zero-hallucination rules.",
      "Knowledge Ingestion: 29 semantic chunks embedded with sentence-transformers/all-MiniLM-L6-v2 (384 dimensions).",
      "PgBouncer Pooler Fix: prepare_threshold=None guarantees robust transaction pooling on Supabase port 6543.",
    ],
  },
  {
    title: "RAG Playground",
    category: "Interactive RAG Pipeline",
    section: "websites",
    description:
      "Interactive web application demonstrating the complete Retrieval-Augmented Generation pipeline with visual stage-by-stage exploration. Experiment with document processing, embeddings, vector search, and AI generation.",
    tags: ["Next.js 16", "FastAPI", "Qdrant", "OpenAI", "Gemini", "React Flow", "Zustand", "Python 3.11"],
    gradient: "linear-gradient(135deg, #06b6d4 0%, #0891b2 45%, #0e7490 100%)",
    accent: "#06b6d4",
    logo: "enterprise",
    primaryCta: "View Live",
    primaryHref: "https://ragtutorial.netlify.app/",
    detailHref: "/projects/rag-playground",
    architectureSummary: [
      "9-stage RAG pipeline: Ingestion → Preprocessing → Chunking → Embedding → Indexing → Retrieval → Reranking → Generation → Evaluation.",
      "Multi-provider support: Google Gemini, OpenAI embeddings (768/1536/3072-dim) and GPT/Gemini/Groq LLMs.",
      "Dual storage: Supabase S3 cloud with local fallback, Qdrant vector DB with HNSW indexing.",
      "Real-time visual pipeline with React Flow, comprehensive logging, and evaluation metrics.",
    ],
  },
  {
    title: "Exam Parser Pipeline",
    category: "Production-Grade PDF Parsing",
    section: "websites",
    description:
      "Production-grade ingestion pipeline that parses competitive exam PDFs into structured, validated JSON data. Employs a robust multi-stage flow with automated visual/text segmenting, self-correcting Pydantic validation, and bounding-box diagram extraction.",
    tags: ["Python 3.11", "PyMuPDF", "Pydantic v2", "Gemini", "DeepSeek", "Tesseract OCR", "uv"],
    gradient: "linear-gradient(135deg, #10b981 0%, #059669 45%, #064e3b 100%)",
    accent: "#10b981",
    logo: "parser",
    primaryCta: "Source Code",
    primaryHref: "https://github.com/rajatkhandelwal191/pdf_extractor/blob/main/exam-parser/architecture.md",
    detailHref: "/projects/exam-parser-pipeline",
    architectureSummary: [
      "9-stage sequential pipeline architecture isolates AI logic to a single parser stage.",
      "Self-correction loop catches Pydantic validation errors and requests LLM retries with traceback.",
      "Union merge coordinate cropping extracts visual math, chemistry, and diagram sub-regions.",
      "Factory provider layer decouples system code from LLM vendors (Gemini, Qwen, DeepSeek, local).",
    ],
  },
  {
    title: "Capstone Project - Enterprise Assistant",
    category: "Agentic AI Platform",
    section: "websites",
    description:
      "Enterprise assistant that routes user intent across RAG, tool automation, and RFP drafting in one LangGraph-based workflow.",
    tags: ["LangGraph", "Streamlit", "RAG", "FAISS/Qdrant", "SQLite", "LangChain"],
    gradient: "linear-gradient(135deg, #f59e0b 0%, #f97316 45%, #b45309 100%)",
    accent: "#f59e0b",
    logo: "enterprise",
    primaryCta: "View Live",
    primaryHref: "https://capstoneprojectagenticairag-hgpicyqq4joiksq2bhtc3q.streamlit.app/",
    secondaryCta: "Source Code",
    secondaryHref: "https://github.com/rajatkhandelwal191/Capstone_Project_Agentic_Ai_RAG",
    detailHref: "/projects/capstone-enterprise-assistant",
    architectureSummary: [
      "Supervisor node routes requests to RAG, Tool, RFP, or Upload flows.",
      "Dual retrieval stack supports FAISS (local) and Qdrant (cloud).",
      "Tool layer reads open incidents and service requests from SQLite.",
      "Unified logging with request_id traceability across UI and graph nodes.",
    ],
  },
  {
    title: "MobiKwik Lendbox XTRA P2P NBFC Scam Tracker",
    category: "Community Evidence Platform",
    section: "websites",
    description:
      "Community-driven evidence collection platform for tracking financial issues. Features complaint submission with evidence upload, admin moderation, and public transparency dashboard.",
    tags: ["Next.js 14", "TypeScript", "Supabase", "PostgreSQL", "Cloudflare R2", "Google OAuth"],
    gradient: "linear-gradient(135deg, #7c3aed 0%, #8b5cf6 40%, #312e81 100%)",
    accent: "#a78bfa",
    logo: "anass",
    primaryCta: "View Live",
    primaryHref: "https://mobikwik-lendbox-xtra-issue.vercel.app/",
    detailHref: "/projects/mobikwik-scam-tracker",
    architectureSummary: [
      "Next.js 14 frontend with Supabase PostgreSQL backend and Row Level Security.",
      "Google OAuth authentication with role-based admin access control.",
      "Cloudflare R2 storage with automatic WebP conversion and compression.",
      "Block-level CMS for content management and community updates.",
    ],
  },

  // --- APPS SECTION ---
  {
    title: "DeepDisk: Storage Analyzer",
    category: "Native Android & System Diagnostics (Google Play Live)",
    section: "apps",
    description:
      "Forensic-grade on-device storage intelligence and transparent cleanup for Android. Built with native Kotlin 2.4, Jetpack Compose, and Room DB (WAL) under a 100% offline, zero-network architecture. Resolves Scoped Storage fragmentation without double-counting bytes.",
    tags: [
      "Native Android",
      "Kotlin 2.4",
      "Jetpack Compose",
      "Material 3",
      "Room DB (WAL)",
      "WorkManager",
      "Dagger Hilt",
      "100% Offline",
      "Google Play Live",
      "5.71 MB AAB",
    ],
    gradient: "linear-gradient(135deg, #0284c7 0%, #0369a1 45%, #075985 100%)",
    accent: "#38bdf8",
    logo: "deepdisk",
    primaryCta: "Google Play Store",
    primaryHref: "https://play.google.com/store/apps/details?id=com.cloudcubit.deepdisk&pcampaignid=web_share",
    secondaryCta: "Case Study",
    secondaryHref: "/projects/deepdisk",
    detailHref: "/projects/deepdisk",
    architectureSummary: [
      "100% Local-First & Zero Telemetry: Completely offline; android.permission.INTERNET is not even declared.",
      "Multi-Source Reconciliation: Mathematical set reconciliation across StorageManager, StorageStatsManager, and MediaStore.",
      "Cryptographic 3-Tier Duplicate Hashing: File-size bucket → 4KB header hash → streaming SHA-256 with cooperative yield().",
      "Risk-Governed Cleanup: SAFE (cache/temp), REVIEW (duplicates/large files), and PROTECTED tiers with MediaStore trash intents.",
      "Google Play Production: 5.71 MB AAB (88% R8 code shrinking, 16KB memory page size compliant, 210+ passing unit tests).",
    ],
  },
  {
    title: "Vaulet: Private Digital Vault",
    category: "Zero-Cloud FinTech & Cryptographic Vault (Google Play Live)",
    section: "apps",
    description:
      "Hardware-encrypted personal digital vault for payment cards, government IDs, passbooks, and bills. True zero-cloud architecture with zero network permissions. Employs AES-256-GCM, PBKDF2-HMAC-SHA256, biometric authentication, and sandboxed encrypted binary storage.",
    tags: [
      "Flutter 3.x",
      "Dart",
      "Kotlin",
      "AES-256-GCM",
      "Hardware KeyStore",
      "Biometrics",
      "MVVM",
      "100% Offline",
      "Google Play Live",
      "Zero Cloud",
    ],
    gradient: "linear-gradient(135deg, #059669 0%, #047857 45%, #064e3b 100%)",
    accent: "#34d399",
    logo: "vaulet",
    primaryCta: "Google Play Store",
    primaryHref: "https://play.google.com/store/apps/details?id=com.cloudcubit.vaulet&pcampaignid=web_share",
    secondaryCta: "Case Study",
    secondaryHref: "/projects/vaulet",
    detailHref: "/projects/vaulet",
    architectureSummary: [
      "Zero-Cloud & Zero Network: android.permission.INTERNET omitted entirely; verifiable zero telemetry at OS sandbox level.",
      "Hardware KeyStore & Enclave: AES-256-GCM master keys generated via Random.secure() and kept in Android KeyStore (TEE/StrongBox).",
      "Encrypted Object Storage: Custom binary streaming with 96-bit nonces preventing TransactionTooLargeException and Keystore OOMs.",
      "Portable Vault Backup (.vaultbackup): PBKDF2-HMAC-SHA256 (100,000 iterations) from user PIN + 16-byte cryptographically secure salt.",
      "Sensory & Privacy UI: Custom 3D perspective matrix transforms for card flipping, haptic feedback, Luhn check, and 30s auto-wiping clipboard.",
    ],
  },
];

function ProjectLogo({ logo }: { logo: LogoType }) {
  if (logo === "vaulet") {
    return (
      <div className="feature-logo-shell bg-slate-900/60 p-2 border border-emerald-500/30">
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-xl bg-slate-950">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/apps/vaulet/logo.webp"
            alt="Vaulet Logo"
            className="h-20 w-20 object-contain drop-shadow-[0_0_15px_rgba(16,185,129,0.4)] md:h-24 md:w-24 rounded-2xl"
          />
        </div>
      </div>
    );
  }
  if (logo === "deepdisk") {
    return (
      <div className="feature-logo-shell bg-slate-900/60 p-2 border border-sky-500/30">
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-xl bg-slate-950">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/apps/deepdisk/logo.webp"
            alt="DeepDisk Logo"
            className="h-20 w-20 object-contain drop-shadow-[0_0_15px_rgba(56,189,248,0.4)] md:h-24 md:w-24 rounded-2xl"
          />
        </div>
      </div>
    );
  }

  if (logo === "enterprise") {
    return (
      <div className="feature-logo-shell bg-black/20">
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-xl bg-slate-900">
          <div className="flex flex-col items-center">
            <span className="material-symbols-outlined text-4xl text-yellow-300">hub</span>
            <span className="font-display text-sm font-bold tracking-[0.2em] text-yellow-200">ENTERPRISE</span>
          </div>
        </div>
      </div>
    );
  }

  if (logo === "parser") {
    return (
      <div className="feature-logo-shell bg-black/20">
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-xl bg-slate-900">
          <div className="flex flex-col items-center">
            <span className="material-symbols-outlined text-4xl text-emerald-400">description</span>
            <span className="font-display text-xs font-bold tracking-[0.2em] text-emerald-200">EXAM PARSER</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="feature-logo-shell bg-white/10">
      <div className="flex h-full w-full items-center justify-center rounded-xl">
        <svg
          className="h-20 w-20 text-white drop-shadow-lg md:h-24 md:w-24"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </svg>
      </div>
    </div>
  );
}

function ProjectCard({
  project,
  index,
  handleCardClick,
  handleCardKeyDown,
  isExternalLink,
}: {
  project: FeaturedProject;
  index: number;
  handleCardClick: (event: MouseEvent<HTMLElement>, project: FeaturedProject) => void;
  handleCardKeyDown: (event: KeyboardEvent<HTMLElement>, project: FeaturedProject) => void;
  isExternalLink: (href: string) => boolean;
}) {
  return (
    <motion.article
      animate={{ opacity: 1, y: 0 }}
      className={`group feature-card relative overflow-hidden rounded-3xl ${
        project.detailHref
          ? "cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black/20"
          : ""
      }`}
      initial={{ opacity: 0, y: 24 }}
      onClick={(event) => handleCardClick(event, project)}
      onKeyDown={(event) => handleCardKeyDown(event, project)}
      role={project.detailHref ? "button" : undefined}
      tabIndex={project.detailHref ? 0 : undefined}
      transition={{ duration: 0.45, delay: 0.08 * index }}
      whileHover={{ y: -6 }}
    >
      <div
        className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: project.gradient, opacity: 0.92 }}
      />
      <div className="project-noise absolute inset-0 opacity-20" />

      <div className="relative z-10 flex flex-col items-center gap-8 p-8 md:flex-row md:gap-12 md:p-12">
        <ProjectLogo logo={project.logo} />

        <div className="flex-grow text-center text-white md:text-left">
          <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <h3 className="font-display text-3xl font-bold tracking-wide md:text-4xl">
              {project.title}
            </h3>
            <span className="inline-block self-center rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs font-medium backdrop-blur-md md:self-auto">
              {project.category}
            </span>
          </div>

          <p className="mb-6 max-w-2xl text-lg font-light leading-relaxed text-white/90">
            {project.description}
          </p>

          {project.architectureSummary ? (
            <div className="mb-6 rounded-2xl border border-white/15 bg-black/20 p-4 backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/80">
                Architecture Snapshot
              </p>
              <ul className="mt-3 space-y-2 text-sm text-white/90">
                {project.architectureSummary.map((item) => (
                  <li className="flex items-start gap-2" key={item}>
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/80 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="mb-8 flex flex-wrap justify-center gap-2 md:justify-start">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-lg bg-white/10 px-3 py-1 text-sm font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-4 md:justify-start">
            {project.primaryHref ? (
              <a
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-bold text-slate-900 shadow-lg transition-colors duration-300 hover:bg-slate-100"
                href={project.primaryHref}
                onClick={() =>
                  logUiEvent("project_link_clicked", {
                    page: "projects",
                    project: project.title,
                    href: project.primaryHref,
                    cta: project.primaryCta,
                  })
                }
                rel={isExternalLink(project.primaryHref) ? "noreferrer noopener" : undefined}
                style={{ color: project.accent }}
                target={isExternalLink(project.primaryHref) ? "_blank" : undefined}
              >
                {project.primaryCta}
                <span className="material-symbols-outlined text-sm">
                  {project.primaryCta === "Case Study" ? "arrow_forward" : "open_in_new"}
                </span>
              </a>
            ) : null}

            {project.secondaryCta && project.secondaryHref ? (
              <a
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-black/20 px-6 py-3 font-medium text-white backdrop-blur-sm transition-colors duration-300 hover:bg-black/30"
                href={project.secondaryHref}
                onClick={() =>
                  logUiEvent("project_link_clicked", {
                    page: "projects",
                    project: project.title,
                    href: project.secondaryHref,
                    cta: project.secondaryCta,
                  })
                }
                rel={isExternalLink(project.secondaryHref) ? "noreferrer noopener" : undefined}
                target={isExternalLink(project.secondaryHref) ? "_blank" : undefined}
              >
                {project.secondaryCta}
                <span className="material-symbols-outlined text-sm">code</span>
              </a>
            ) : null}

            {project.detailHref ? (
              <a
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3 font-medium text-white backdrop-blur-sm transition-colors duration-300 hover:bg-white/20"
                href={project.detailHref}
                onClick={() =>
                  logUiEvent("project_detail_opened", {
                    page: "projects",
                    source: "button",
                    project: project.title,
                    href: project.detailHref,
                  })
                }
              >
                Project Details
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function ProjectsPage() {
  const { theme, isDark, toggleTheme } = useTheme();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"all" | "websites" | "apps">("all");

  const footerText = useMemo(
    () => `(c) ${new Date().getFullYear()} Rajat Khandelwal. Project page.`,
    [],
  );

  useEffect(() => {
    document.title = "Project Page | Rajat Portfolio";
  }, []);

  const websitesProjects = useMemo(
    () => featuredProjects.filter((p) => p.section === "websites"),
    [],
  );

  const appsProjects = useMemo(
    () => featuredProjects.filter((p) => p.section === "apps"),
    [],
  );

  const isExternalLink = (href: string) => href.startsWith("http://") || href.startsWith("https://");

  const handleCardClick = (event: MouseEvent<HTMLElement>, project: FeaturedProject) => {
    if (!project.detailHref) {
      return;
    }
    const target = event.target as HTMLElement;
    if (target.closest("a")) {
      return;
    }
    logUiEvent("project_detail_opened", {
      page: "projects",
      source: "card",
      project: project.title,
      href: project.detailHref,
    });
    router.push(project.detailHref);
  };

  const handleCardKeyDown = (event: KeyboardEvent<HTMLElement>, project: FeaturedProject) => {
    if (!project.detailHref) {
      return;
    }
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }
    event.preventDefault();
    logUiEvent("project_detail_opened", {
      page: "projects",
      source: "keyboard",
      project: project.title,
      href: project.detailHref,
    });
    router.push(project.detailHref);
  };

  return (
    <div
      className={`portfolio-shell relative min-h-screen w-full overflow-x-hidden ${
        isDark ? "dark-pattern" : "light-pattern"
      }`}
      data-theme={theme}
    >
      <aside className="nav-float fixed left-6 top-1/2 z-50 hidden -translate-y-1/2 flex-col items-center gap-6 rounded-full border border-[var(--nav-border)] px-3 py-6 lg:flex">
        {navItems.map((item) => (
          <Link
            key={item.label}
            className={`group relative flex size-12 items-center justify-center rounded-full transition-all ${
              item.active
                ? "bg-[var(--primary)] text-white shadow-[0_10px_24px_var(--primary-glow)]"
                : "text-[var(--text-muted)] hover:bg-[var(--icon-chip-bg)] hover:text-[var(--primary)]"
            }`}
            href={item.href}
            onClick={() => logUiEvent("nav_clicked", { page: "projects", label: item.label, href: item.href })}
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
          </Link>
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
              <span className="material-symbols-outlined">terminal</span>
            </div>
            <div>
              <h1
                className={`text-xl font-bold tracking-tight ${
                  isDark
                    ? "text-[var(--title-glow)] drop-shadow-[0_0_12px_var(--primary-glow)]"
                    : "text-[var(--text-main)]"
                }`}
              >
                Rajat Khandelwal
              </h1>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">
                Project Page
              </p>
            </div>
          </div>

          <button
            className="portfolio-glass flex size-10 items-center justify-center rounded-xl border border-[var(--glass-border)] text-[var(--primary)] transition-all hover:bg-[var(--icon-chip-bg)]"
            onClick={toggleTheme}
            type="button"
          >
            <span className="material-symbols-outlined">{isDark ? "light_mode" : "dark_mode"}</span>
          </button>
        </motion.header>

        <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-12">
          {/* Main Title Section */}
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
          >
            <div className="mb-4 flex items-center gap-4">
              <span className="material-symbols-outlined text-3xl text-[var(--cream-active)]">
                folder_special
              </span>
              <h2 className="font-display text-3xl font-bold text-[var(--section-title)]">
                Project Portfolio
              </h2>
              <div className="ml-4 h-px flex-grow bg-[var(--section-line)]" />
            </div>
            <p className="text-sm text-[var(--text-muted)] max-w-2xl">
              Explore production applications and systems built across enterprise AI, full-stack web platforms, and native Android operating systems.
            </p>
          </motion.div>

          {/* Section Filter Tabs */}
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 flex flex-wrap items-center justify-between gap-4"
            initial={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div className="inline-flex rounded-2xl border border-[var(--glass-border)] bg-[var(--surface-overlay)] p-1.5 backdrop-blur-md shadow-xs">
              <button
                onClick={() => {
                  setActiveTab("all");
                  logUiEvent("projects_tab_changed", { tab: "all" });
                }}
                className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold transition-all ${
                  activeTab === "all"
                    ? "bg-[var(--primary)] text-white shadow-md shadow-[var(--primary-glow)]"
                    : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
                }`}
                type="button"
              >
                <span className="material-symbols-outlined text-base">dashboard</span>
                All Projects
                <span
                  className={`ml-1 rounded-full px-2 py-0.5 text-[10px] ${
                    activeTab === "all" ? "bg-white/20 text-white" : "bg-black/10 dark:bg-white/10"
                  }`}
                >
                  {featuredProjects.length}
                </span>
              </button>

              <button
                onClick={() => {
                  setActiveTab("websites");
                  logUiEvent("projects_tab_changed", { tab: "websites" });
                }}
                className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold transition-all ${
                  activeTab === "websites"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/25"
                    : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
                }`}
                type="button"
              >
                <span className="material-symbols-outlined text-base">language</span>
                Websites
                <span
                  className={`ml-1 rounded-full px-2 py-0.5 text-[10px] ${
                    activeTab === "websites" ? "bg-white/20 text-white" : "bg-black/10 dark:bg-white/10"
                  }`}
                >
                  {websitesProjects.length}
                </span>
              </button>

              <button
                onClick={() => {
                  setActiveTab("apps");
                  logUiEvent("projects_tab_changed", { tab: "apps" });
                }}
                className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold transition-all ${
                  activeTab === "apps"
                    ? "bg-sky-600 text-white shadow-md shadow-sky-500/25"
                    : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
                }`}
                type="button"
              >
                <span className="material-symbols-outlined text-base">phone_android</span>
                Apps
                <span
                  className={`ml-1 rounded-full px-2 py-0.5 text-[10px] ${
                    activeTab === "apps" ? "bg-white/20 text-white" : "bg-black/10 dark:bg-white/10"
                  }`}
                >
                  {appsProjects.length}
                </span>
              </button>
            </div>

            <span className="text-xs font-medium text-[var(--text-muted)]">
              Showing {activeTab === "all" ? featuredProjects.length : activeTab === "websites" ? websitesProjects.length : appsProjects.length} production projects
            </span>
          </motion.div>

          {/* --- SECTION 1: WEBSITES --- */}
          {(activeTab === "all" || activeTab === "websites") && (
            <motion.section
              animate={{ opacity: 1, y: 0 }}
              className="mb-16"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[var(--glass-border)] pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-11 items-center justify-center rounded-2xl bg-indigo-500/15 text-indigo-500 dark:text-indigo-400">
                    <span className="material-symbols-outlined text-2xl">language</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h3 className="text-2xl font-bold tracking-tight text-[var(--text-main)]">
                        Websites & Web Platforms
                      </h3>
                      <span className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">
                        Full-Stack & Cloud
                      </span>
                    </div>
                    <p className="text-xs text-[var(--text-muted)] mt-0.5">
                      Full-stack web applications, interactive AI pipelines, RAG playgrounds, and cloud systems.
                    </p>
                  </div>
                </div>
                <span className="font-mono text-xs font-semibold text-[var(--text-muted)]">
                  {websitesProjects.length} Websites
                </span>
              </div>

              <div className="space-y-10">
                {websitesProjects.map((project, index) => (
                  <ProjectCard
                    key={project.title}
                    project={project}
                    index={index}
                    handleCardClick={handleCardClick}
                    handleCardKeyDown={handleCardKeyDown}
                    isExternalLink={isExternalLink}
                  />
                ))}
              </div>
            </motion.section>
          )}

          {/* --- SECTION 2: APPS --- */}
          {(activeTab === "all" || activeTab === "apps") && (
            <motion.section
              animate={{ opacity: 1, y: 0 }}
              className="mb-16"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[var(--glass-border)] pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-11 items-center justify-center rounded-2xl bg-sky-500/15 text-sky-500 dark:text-sky-400">
                    <span className="material-symbols-outlined text-2xl">phone_android</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h3 className="text-2xl font-bold tracking-tight text-[var(--text-main)]">
                        Apps
                      </h3>
                      <span className="rounded-full border border-sky-500/30 bg-sky-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-sky-600 dark:text-sky-400">
                        Google Play Live
                      </span>
                    </div>
                    <p className="text-xs text-[var(--text-muted)] mt-0.5">
                      Native mobile utilities, forensic system diagnostics, and Google Play Store production applications.
                    </p>
                  </div>
                </div>
                <span className="font-mono text-xs font-semibold text-[var(--text-muted)]">
                  {appsProjects.length} {appsProjects.length === 1 ? "App" : "Apps"}
                </span>
              </div>

              <div className="space-y-10">
                {appsProjects.map((project, index) => (
                  <ProjectCard
                    key={project.title}
                    project={project}
                    index={index}
                    handleCardClick={handleCardClick}
                    handleCardKeyDown={handleCardKeyDown}
                    isExternalLink={isExternalLink}
                  />
                ))}
              </div>
            </motion.section>
          )}
        </main>

        <footer className="mt-auto border-t border-[var(--footer-border)] bg-[var(--footer-bg)] px-6 py-10 text-center backdrop-blur-sm">
          <p className="text-xs text-[var(--text-muted)]">{footerText}</p>
        </footer>
      </div>
    </div>
  );
}
