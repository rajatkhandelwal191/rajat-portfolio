"use client";

import Link from "next/link";
import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { logUiEvent } from "../../../lib/frontendLogger";
import { useTheme } from "../../../context/ThemeContext";

type DetailBlock = {
  title: string;
  points: string[];
};

type DetailSection = {
  title: string;
  icon: string;
  blocks: DetailBlock[];
};

const navItems = [
  { href: "/", icon: "home", label: "Home" },
  { href: "/about", icon: "person", label: "About" },
  { href: "/projects", icon: "code_blocks", label: "Projects" },
  { href: "/experience", icon: "history_edu", label: "Experience", active: true },
  { href: "/resume", icon: "description", label: "Resume" },
  { href: "/contact", icon: "alternate_email", label: "Contact" },
  { href: "/#chatbot", icon: "smart_toy", label: "RajatGPT" },
];

const impactMetrics = [
  { label: "Latency Reduction", value: "30-50s+", desc: "Optimized multi-agent tool routing" },
  { label: "CMDB Integration", value: "3 Core Tables", desc: "Apps, Win Servers & Rel CIs" },
  { label: "Security Standard", value: "100% Secretless", desc: "Entra ID, OIDC & Managed Identities" },
  { label: "Infrastructure Automation", value: "Modular Bicep", desc: "Approval-gated GitHub Actions CI/CD" },
];

const detailSections: DetailSection[] = [
  {
    title: "1. Scope, Architecture & Full-Stack Delivery",
    icon: "architecture",
    blocks: [
      {
        title: "Full-Stack Solution Scope",
        points: [
          "Delivered end-to-end engineering of an AI-assisted Windows Server End-of-Life (EOL) management solution across frontend, backend, AI, data, and cloud infrastructure.",
          "Engineered React/Vite user interface integrated with high-performance Python 3.12/FastAPI backend APIs.",
          "Architected hybrid intelligence combining Microsoft Agent Framework, Azure AI Search document retrieval, and Microsoft Foundry web grounding.",
          "Persisted synchronized inventory, lifecycle evidence, and audit trails in Azure Database for PostgreSQL Flexible Server.",
        ],
      },
      {
        title: "Platform Capabilities & Workflows",
        points: [
          "Application-to-server and server-to-application relationship mapping directly from ServiceNow CMDB.",
          "Owner-focused inventory views displaying operating system, lifecycle status, criticality, and environment.",
          "EOL identification detecting expired assets and workloads approaching end-of-support within customizable time windows.",
          "Evidence-backed remediation planning generating grouped actions: upgrade, migrate, replace, defer via ESU, or retire.",
          "ServiceNow operational handoff routing users to approved change-management and lifecycle request forms.",
        ],
      },
      {
        title: "React/Vite Frontend Architecture",
        points: [
          "Developed responsive React 19 + TypeScript single-page application using Vite, Tailwind CSS, and Node.js toolchains.",
          "Built Agentic AI Hub, interactive estate dashboards, server-application mapping grids, and remediation-plan interfaces.",
          "Integrated Microsoft Entra ID authentication via MSAL for secure login, logout, token refresh, and protected routes.",
          "Packaged frontend using a multi-stage Docker build outputting to an optimized NGINX SPA runtime container.",
        ],
      },
    ],
  },
  {
    title: "2. Agentic AI, RAG & Web Grounding",
    icon: "psychology",
    blocks: [
      {
        title: "Microsoft Agent Framework & Latency Optimization",
        points: [
          "Orchestrated specialized agents and tools for structured CMDB queries versus unstructured lifecycle document retrieval.",
          "Identified and eliminated redundant nested supervisor-to-specialist delegation roundtrips, reducing end-to-end latency by 30–50+ seconds.",
          "Equipped the supervisor agent with direct, governed access to inventory and search tools without intermediate handoff delays.",
          "Implemented request-scoped evidence tracking (RunEvidence) constructing citations strictly from verified execution results.",
        ],
      },
      {
        title: "Azure AI Search Document RAG & Citations",
        points: [
          "Integrated Azure AI Search as the enterprise document retrieval layer using text-embedding-3-small dense vector models.",
          "Connected Azure Blob Storage data sources to AI Search indexes with automated metadata extraction and field mappings.",
          "Secured document citations using user-delegation SAS tokens with managed identities and in-memory delegation key caching.",
          "Separated structured relational queries in PostgreSQL from semantic guidance retrieval in Azure AI Search.",
        ],
      },
      {
        title: "Microsoft Foundry & OpenAI Web Grounding",
        points: [
          "Integrated Azure OpenAI endpoints with Foundry-powered web grounding for live Windows Server lifecycle dates.",
          "Restricted web search grounding exclusively to approved Microsoft authoritative domains (learn.microsoft.com).",
          "Normalized heterogeneous OS labels (e.g. 'Windows Server 2012 R2 Datacenter') into canonical version definitions.",
          "Replaced initial API key configurations with Entra ID bearer token authentication via system-assigned managed identities.",
        ],
      },
    ],
  },
  {
    title: "3. Data Engineering & Background Processing",
    icon: "database",
    blocks: [
      {
        title: "ServiceNow CMDB Ingestion & Reconciliation",
        points: [
          "Extracted CMDB records across cmdb_ci_business_app, cmdb_ci_win_server, and cmdb_rel_ci tables.",
          "Resolved complex multi-hop application-to-server paths through intermediary configuration items (CIs).",
          "Handled paginated REST extraction with deterministic SHA-256 relationship hashing for change detection.",
          "Applied transactional PostgreSQL staging, snapshot upserts, and automated reconciliation removing stale relationships.",
        ],
      },
      {
        title: "Azure Durable Functions Ingestion Pipeline",
        points: [
          "Developed serverless Python Azure Functions orchestrated via Durable Functions for resilient multi-step extraction.",
          "Decoupled long-running extraction, transformation, normalization, persistence, and search index triggers.",
          "Packaged Functions workloads into custom Linux containers deployed to Azure Container Apps.",
          "Validated scheduled timer triggers and manual HTTP invocations locally using Azurite and Azure Functions Core Tools.",
        ],
      },
      {
        title: "PostgreSQL Flexible Server Persistence",
        points: [
          "Designed normalized schema for raw CMDB snapshots, relationship bridges, lifecycle evidence, and audit logs.",
          "Validated ACID transactions, database rollback controls, and automated connection pooling via PgBouncer.",
          "Enforced private endpoint network isolation and Azure Key Vault credential integration.",
        ],
      },
    ],
  },
  {
    title: "4. Cloud Infrastructure, Security & Observability",
    icon: "cloud",
    blocks: [
      {
        title: "Secretless Identity, IAM & Entra ID",
        points: [
          "Separated identity roles: Infrastructure Service Principal (Bicep), GitHub Deployment Identity (OIDC), and Runtime Managed Identity.",
          "Implemented passwordless authentication across Azure OpenAI, AI Search, Blob Storage, and PostgreSQL.",
          "Configured frontend MSAL SSO with Entra ID app registrations, tenant audience validation, and security group enforcement.",
          "Enforced resource-scoped Azure RBAC minimizing privilege boundaries across all deployed workloads.",
        ],
      },
      {
        title: "Azure Networking & Private Endpoints",
        points: [
          "Configured VNet integration and dedicated subnets across Web Apps, Container Apps, and database services.",
          "Provisioned Private Endpoints with custom Private DNS Zones for PostgreSQL, Key Vault, and AI Search.",
          "Validated Network Security Groups (NSGs), route tables, and Network Security Perimeter (NSP) policies.",
          "Resolved cross-region dependencies and verified egress reachability through corporate firewalls.",
        ],
      },
      {
        title: "Bicep IaC & GitHub Actions CI/CD",
        points: [
          "Authored modular Bicep templates for container hosting, private networking, Key Vault, and role assignments.",
          "Implemented automated linting, ARM validation, and what-if deployment dry-runs.",
          "Created GitHub Actions workflows using federated OIDC credentials for multi-stage building and ACR image tagging.",
          "Enforced approval gates between staging validation and production infrastructure provisioning.",
        ],
      },
      {
        title: "Application Insights & Observability",
        points: [
          "Configured Application Insights with Log Analytics workspaces for comprehensive distributed tracing.",
          "Instrumented OpenTelemetry across FastAPI routes, agent tool executions, and LLM token metrics.",
          "Developed Azure Workbooks for real-time visualization of ingestion health, model latency, and error trends.",
          "Maintained audit-ready technical documentation, build books, SOPs, and runbooks for client knowledge transfer.",
        ],
      },
    ],
  },
];

export default function EnbridgeEolAgentPage() {
  const { theme, isDark, toggleTheme } = useTheme();

  useEffect(() => {
    document.title = "Enbridge Windows Server EOL Agent Platform | Rajat Khandelwal";
  }, []);

  const footerText = useMemo(
    () => `(c) ${new Date().getFullYear()} Rajat Khandelwal. Enbridge EOL Agent Platform Case Study.`,
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
                ? "bg-[var(--primary)] text-white shadow-lg shadow-indigo-500/30"
                : "text-[var(--text-muted)] hover:bg-white/10 hover:text-[var(--text-main)]"
            }`}
          >
            <span className="material-symbols-outlined text-lg">{item.icon}</span>
            <span className="nav-tooltip pointer-events-none absolute left-full ml-4 whitespace-nowrap rounded-md bg-black/85 px-2.5 py-1 text-xs text-white opacity-0 backdrop-blur-sm transition-opacity">
              {item.label}
            </span>
          </Link>
        ))}
      </aside>

      {/* Main Layout Container */}
      <div className="relative z-10 flex min-h-screen flex-col lg:pl-24">
        {/* Sticky Header */}
        <header className="portfolio-glass sticky top-0 z-40 mx-4 mt-3 flex items-center justify-between rounded-2xl border px-6 py-4 lg:mx-8 lg:mt-4 lg:px-8">
          <div className="flex items-center gap-3.5">
            <Link
              href="/experience"
              className="flex size-10 items-center justify-center rounded-xl bg-[var(--icon-chip-bg)] text-[var(--text-main)] transition hover:scale-105"
            >
              <span className="material-symbols-outlined text-xl">arrow_back</span>
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold tracking-tight text-[var(--text-main)]">
                  Enterprise Client Case Study
                </span>
                <span className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-2 py-0.5 text-[10px] font-semibold text-indigo-400">
                  Enbridge
                </span>
              </div>
              <p className="text-[11px] font-medium text-[var(--text-muted)]">
                Windows Server End-of-Life Management Platform
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/experience"
              className="theme-btn-secondary hidden items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold sm:inline-flex"
            >
              <span className="material-symbols-outlined text-sm">history_edu</span>
              All Experience
            </Link>

            <button
              onClick={toggleTheme}
              aria-label="Toggle light/dark theme"
              className="theme-btn-secondary flex size-9 items-center justify-center rounded-xl"
              type="button"
            >
              <span className="material-symbols-outlined text-lg">
                {isDark ? "light_mode" : "dark_mode"}
              </span>
            </button>
          </div>
        </header>

        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <div className="mb-6 flex items-center gap-2 text-xs text-[var(--text-muted)]">
            <Link href="/" className="hover:text-[var(--text-main)] transition">Home</Link>
            <span>/</span>
            <Link href="/experience" className="hover:text-[var(--text-main)] transition">Experience</Link>
            <span>/</span>
            <span className="text-indigo-600 dark:text-indigo-400 font-medium">Enbridge EOL Agent Platform</span>
          </div>

          {/* Hero Banner */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="portfolio-glass mb-10 overflow-hidden rounded-3xl border border-[var(--glass-border)] p-8 shadow-[var(--card-shadow)]"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              <span className="size-2 rounded-full bg-indigo-500 animate-pulse" />
              TCS Enterprise Engagement · Client: Enbridge
            </div>

            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[var(--text-main)] sm:text-5xl">
              Windows Server End-of-Life (EOL) Agent Platform
            </h1>

            <p className="mt-4 max-w-3xl text-base leading-relaxed text-[var(--text-muted)] sm:text-lg">
              Architected and engineered an end-to-end AI-assisted lifecycle governance platform combining React/Vite, Python/FastAPI, Microsoft Agent Framework, Azure AI Search document RAG, and automated ServiceNow CMDB ingestion via Azure Durable Functions.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <span className="theme-chip font-semibold text-indigo-700 dark:text-indigo-300">React & TypeScript</span>
              <span className="theme-chip font-semibold text-indigo-700 dark:text-indigo-300">FastAPI (Python 3.12)</span>
              <span className="theme-chip font-semibold text-indigo-700 dark:text-indigo-300">Microsoft Agent Framework</span>
              <span className="theme-chip font-semibold text-indigo-700 dark:text-indigo-300">Azure AI Search</span>
              <span className="theme-chip font-semibold text-indigo-700 dark:text-indigo-300">Microsoft Foundry & OpenAI</span>
              <span className="theme-chip font-semibold text-indigo-700 dark:text-indigo-300">ServiceNow CMDB</span>
              <span className="theme-chip font-semibold text-indigo-700 dark:text-indigo-300">PostgreSQL Flexible Server</span>
              <span className="theme-chip font-semibold text-indigo-700 dark:text-indigo-300">Azure Durable Functions</span>
              <span className="theme-chip font-semibold text-indigo-700 dark:text-indigo-300">Bicep IaC & GitHub Actions</span>
            </div>
          </motion.section>

          {/* Key Impact Metrics */}
          <div className="mb-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {impactMetrics.map((m, idx) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                className="portfolio-glass rounded-2xl border border-[var(--glass-border)] p-5"
              >
                <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400 sm:text-3xl">
                  {m.value}
                </div>
                <div className="mt-1 text-xs font-bold text-[var(--text-main)]">{m.label}</div>
                <div className="mt-0.5 text-[11px] text-[var(--text-muted)]">{m.desc}</div>
              </motion.div>
            ))}
          </div>

          {/* Detailed Architectural Sections */}
          <div className="space-y-12">
            {detailSections.map((sec, secIdx) => (
              <motion.section
                key={sec.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * secIdx }}
                className="space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                    <span className="material-symbols-outlined text-lg">{sec.icon}</span>
                  </div>
                  <h2 className="text-xl font-bold tracking-tight text-[var(--text-main)] sm:text-2xl">
                    {sec.title}
                  </h2>
                </div>

                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {sec.blocks.map((block) => (
                    <div
                      key={block.title}
                      className="bento-card flex flex-col justify-between p-6"
                    >
                      <div>
                        <h3 className="text-base font-bold text-[var(--text-main)]">
                          {block.title}
                        </h3>
                        <ul className="mt-3.5 space-y-2 text-xs leading-relaxed text-[var(--text-muted)]">
                          {block.points.map((pt, pIdx) => (
                            <li key={pIdx} className="flex items-start gap-2">
                              <span className="mt-1 size-1.5 rounded-full bg-indigo-500 shrink-0" />
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>
            ))}
          </div>

          {/* Action CTA */}
          <div className="mt-16 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-indigo-500/30 bg-indigo-500/10 p-8">
            <div>
              <h3 className="text-lg font-bold text-[var(--text-main)]">Have questions about this architecture?</h3>
              <p className="mt-1 text-xs text-[var(--text-muted)]">
                Ask RajatGPT or get in touch directly to discuss enterprise AI agent implementations.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/#chatbot"
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-indigo-500/25 hover:bg-indigo-500 transition"
              >
                <span className="material-symbols-outlined text-sm">smart_toy</span>
                Ask RajatGPT
              </Link>
              <Link
                href="/contact"
                className="theme-btn-secondary inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold"
              >
                <span className="material-symbols-outlined text-sm">alternate_email</span>
                Contact Rajat
              </Link>
            </div>
          </div>
        </main>

        <footer className="mt-16 border-t border-[var(--footer-border)] bg-[var(--footer-bg)] px-6 py-8 text-center backdrop-blur-sm">
          <p className="text-xs text-[var(--text-muted)]">{footerText}</p>
        </footer>
      </div>
    </div>
  );
}
