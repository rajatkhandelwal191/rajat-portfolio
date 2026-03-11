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
  { label: "Project period", value: "Dec 2021 - Oct 2024" },
  { label: "Role", value: "Core Chatbot Developer" },
  { label: "Work type", value: "AI + Backend + Infra" },
  { label: "Reliability", value: "Zero SLA Breaches" },
];

const detailSections: DetailSection[] = [
  {
    title: "Project Overview",
    blocks: [
      {
        title: "OTK - Chatbot Implementation (Outokumpu)",
        points: [
          "Role: Developer / Core Chatbot Developer.",
          "Delivered a multilingual enterprise chatbot platform with automation-first design.",
          "Implemented ML model workflows in Python (Jupyter) and integrated them into chatbot architecture.",
          "Introduced GenAI capabilities for richer responses and action-oriented flows.",
        ],
      },
    ],
  },
  {
    title: "GenAI and RAG Engineering",
    blocks: [
      {
        title: "RAG and Prompt Workflows",
        points: [
          "Implemented RAG-based chatbot architecture with vector embeddings and LangChain retrieval chains.",
          "Integrated OpenAI APIs for response generation and action automation.",
          "Built prompt automation and guided suggestion workflows for high-quality answers.",
        ],
      },
      {
        title: "Yellow.ai Development",
        points: [
          "Served as core developer on Yellow.ai chatbot framework.",
          "Built conversational flows, dialog logic, and enterprise automation paths.",
        ],
      },
    ],
  },
  {
    title: "Platform Integrations and Backend",
    blocks: [
      {
        title: "Enterprise Integrations",
        points: [
          "Integrated ServiceNow, Genesys Chat, Twilio, Redis, and Microsoft Adaptive Cards.",
          "Handled authentication keys, service reliability issues, and third-party dependency behavior.",
        ],
      },
      {
        title: "Company Communicator Notification Bot",
        points: [
          "Built a POC User + Agent notification bot for OTK client needs.",
          "Integrated notification bot with ServiceNow and existing chatbot ecosystem.",
          "Completed and delivered the POC within a one-month deadline.",
        ],
      },
      {
        title: "Backend and Microservices",
        points: [
          "Developed chatbot backend services in Node.js for dialogs and response routing.",
          "Built Python ML services exposed through Flask APIs and connected with Node.js flows.",
          "Implemented microservice-based APIs for chatbot and ML model interaction layers.",
        ],
      },
    ],
  },
  {
    title: "Cloud, DevOps, and Architecture",
    blocks: [
      {
        title: "Azure Deployment and CI/CD",
        points: [
          "Owned Azure infrastructure setup, environment configuration, and production deployments.",
          "Implemented Azure DevOps CI/CD pipelines with automated build, test, and deployment stages.",
        ],
      },
      {
        title: "Architecture and Security Routing",
        points: [
          "Created architecture diagrams for the Company Communicator app.",
          "Designed single-tenant traffic flow and collaborated with internal security teams for routing controls.",
          "Defined integration architecture across chatbot, notification bot, ServiceNow, and Azure infrastructure.",
        ],
      },
    ],
  },
  {
    title: "Testing, Stability, and Defect Management",
    blocks: [
      {
        title: "Reliability Engineering",
        points: [
          "Executed unit, integration, end-to-end, and performance testing for chatbot workflows.",
          "Validated keys, credentials, and integration fallbacks before production release.",
          "Maintained zero SLA breaches and defect-controlled production deployments.",
        ],
      },
      {
        title: "Defect Lifecycle Handling",
        points: [
          "Resolved dialog failures, API integration bugs, expired keys, and Redis connectivity issues.",
          "Handled service dependency and third-party issues with risk-prioritized fixes.",
          "Followed full defect lifecycle: identification, prioritization, remediation, and production validation.",
        ],
      },
    ],
  },
  {
    title: "Additional Contributions",
    blocks: [
      {
        title: "Team and Capability Growth",
        points: [
          "Conducted knowledge transfer sessions on Azure handling for team members.",
          "Supported solution architecture through system design diagram preparation.",
          "Suggested chatbot optimization improvements for response quality and performance.",
          "Expanded practical capabilities across Python, microservices, Azure, MongoDB, GenAI, and infrastructure as code.",
        ],
      },
    ],
  },
];

const coreStack = [
  "Python",
  "Node.js",
  "JavaScript",
  "OpenAI APIs",
  "LangChain",
  "Vector Embeddings",
  "Yellow.ai",
  "Flask",
  "Microservices",
  "Redis",
  "PostgreSQL",
  "MongoDB",
  "ServiceNow",
  "Genesys",
  "Twilio",
  "Microsoft Adaptive Cards",
  "Microsoft Azure",
  "Azure DevOps",
  "CI/CD Pipelines",
  "Containerization",
];

export default function TcsOtkChatbotPage() {
  const [theme, setTheme] = useState<Theme>("dark");
  const isDark = theme === "dark";

  const footerText = useMemo(
    () => `(c) ${new Date().getFullYear()} Rajat Khandelwal. OTK chatbot experience details.`,
    [],
  );

  useEffect(() => {
    document.title = "TCS OTK Chatbot Experience | Rajat Portfolio";
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
              logUiEvent("nav_clicked", { page: "experience_tcs_otk_detail", label: item.label, href: item.href })
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
              <span className="material-symbols-outlined">support_agent</span>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-[var(--text-main)]">
                Tata Consultancy Services Ltd
              </h1>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">
                OTK - Chatbot Implementation (Outokumpu)
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              className="portfolio-glass inline-flex items-center gap-1 rounded-xl border border-[var(--glass-border)] px-3 py-2 text-sm text-[var(--text-muted)] transition-all hover:bg-[var(--icon-chip-bg)] hover:text-[var(--primary)]"
              href="/experience"
              onClick={() => logUiEvent("back_to_experience_clicked", { from: "experience_tcs_otk_detail" })}
            >
              <span className="material-symbols-outlined text-lg">arrow_back</span>
              Back
            </Link>
            <button
              className="portfolio-glass flex size-10 items-center justify-center rounded-xl border border-[var(--glass-border)] text-[var(--primary)] transition-all hover:bg-[var(--icon-chip-bg)]"
              onClick={() => {
                logUiEvent("theme_toggle_clicked", {
                  page: "experience_tcs_otk_detail",
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
              December 2021 - October 2024
            </p>
            <h2 className="mt-2 font-display text-3xl text-[var(--text-main)] md:text-4xl">
              Developer / Core Chatbot Developer
            </h2>
            <p className="mt-4 max-w-4xl leading-relaxed text-[var(--text-muted)]">
              Built and scaled enterprise chatbot capabilities across multilingual AI conversations,
              RAG-based retrieval, platform integrations, and production-grade cloud delivery for OTK.
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
