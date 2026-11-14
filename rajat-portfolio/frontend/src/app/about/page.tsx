"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { logUiEvent } from "../../lib/frontendLogger";
import { useTheme } from "../../context/ThemeContext";

const navItems = [
  { href: "/", icon: "home", label: "Home" },
  { href: "/about", icon: "person", label: "About", active: true },
  { href: "/projects", icon: "code_blocks", label: "Projects" },
  { href: "/experience", icon: "history_edu", label: "Experience" },
  { href: "/resume", icon: "description", label: "Resume" },
  { href: "/contact", icon: "alternate_email", label: "Contact" },
  { href: "/#chatbot", icon: "smart_toy", label: "RajatGPT" },
];

const profileStats = [
  { label: "Followers", value: "528" },
  { label: "Connections", value: "462" },
  { label: "Profile Views (7d)", value: "26" },
  { label: "Search Appearances (7d)", value: "16" },
];

const openRoles = [
  "Lead AI Engineer",
  "Full Stack Engineer",
  "Mobile App Architect / Developer (Android & iOS)",
  "Web Developer",
  "Back End Developer",
  "Generative AI Engineer",
];

const coreSkills = [
  "Generative AI",
  "LLM Workflows",
  "LangChain",
  "LangGraph",
  "LlamaIndex",
  "Autogen",
  "Azure AKS",
  "Azure Functions",
  "Azure Web Apps",
  "Docker",
  "Kubernetes",
  "MERN Stack",
  "React",
  "Node.js",
  "Python",
  "Flutter & Dart",
  "Native Android (Kotlin)",
  "Jetpack Compose",
  "Android Studio & Xcode",
  "Room DB & SQLite",
  "Machine Learning",
  "Semantic Search",
  "Vector Databases",
];

const certifications = [
  {
    title: "Claude Certified Architect Professional",
    issuer: "Anthropic",
    badgeUrl: "https://www.credly.com/badges/7dd35d2b-d461-40a6-90da-2114681ff507/public_url",
    desc: "Production enterprise Claude architecture, extended context reasoning, prompt engineering, agentic tool workflows, and safety guardrails.",
    icon: "psychology",
    tag: "Anthropic Certified",
    highlight: true,
  },
  {
    title: "Microsoft Certified: Azure AI Engineer Associate (AI-102)",
    issuer: "Microsoft",
    badgeUrl: "https://www.credly.com/users/rajat-khandelwal.b764d962",
    desc: "End-to-end design and deployment of Azure AI solutions with Azure OpenAI, Azure AI Search, Cognitive Services, and multi-modal pipelines.",
    icon: "cloud",
    tag: "Microsoft Certified",
    highlight: true,
  },
  {
    title: "Deep Agents with LangGraph",
    issuer: "LangChain",
    badgeUrl: "https://www.credly.com/users/rajat-khandelwal.b764d962",
    desc: "State machine orchestration, cyclical multi-agent graphs, checkpoint persistence, and supervisor-worker patterns.",
    icon: "account_tree",
    tag: "LangChain Certified",
    highlight: false,
  },
  {
    title: "AI Agents Fundamentals",
    issuer: "Hugging Face",
    badgeUrl: "https://www.credly.com/users/rajat-khandelwal.b764d962",
    desc: "Autonomous agent reasoning, open-source model execution, and tool integration.",
    icon: "smart_toy",
    tag: "Hugging Face",
    highlight: false,
  },
];

const experienceHighlights = [
  {
    title: "Full Stack / AI Engineer (Client: Enbridge), TCS",
    period: "2024 - Present · Enterprise Cloud & AI",
    points: [
      "Engineered end-to-end Windows Server EOL Agent platform combining React/Vite, Python/FastAPI, and Microsoft Agent Framework.",
      "Developed ServiceNow CMDB ingestion (apps, servers, relationships) via Azure Durable Functions and PostgreSQL Flexible Server.",
      "Architected Azure AI Search document RAG with user-delegation SAS security and Microsoft Foundry web grounding.",
      "Optimized agent tool routing, eliminating supervisor-specialist roundtrips and cutting latency by 30-50+ seconds.",
    ],
    gradient: "linear-gradient(135deg, #4f46e5 0%, #6366f1 50%, #7c3aed 100%)",
  },
  {
    title: "Lead AI Engineer (Client: Exelon ITIS), TCS",
    period: "Aug 2025 - Present · Noida · Hybrid",
    points: [
      "Leading agentic AI workflow architecture across heatmap, incident, patch compliance, and drive cleanup operations.",
      "Automated daily, weekly, and monthly audit-ready reporting pipelines using LangGraph, Python, FPDF, and Azure Blob Storage.",
      "Reduced manual Infra Ops effort by 70-80% through deterministic schema validation and idempotent execution.",
    ],
    gradient: "linear-gradient(135deg, #f97316 0%, #ea580c 50%, #b45309 100%)",
  },
  {
    title: "Chatbot Developer (Client: Outokumpu), TCS",
    period: "Dec 2021 - Oct 2024 · Enterprise AI Delivery",
    points: [
      "Developed multilingual enterprise chatbot with GenAI and RAG-based knowledge retrieval capabilities.",
      "Delivered microservices integration across ServiceNow, Genesys, Twilio, Redis, and Microsoft Adaptive Cards.",
      "Maintained 100% operational reliability and zero SLA breaches across 3+ years of production.",
    ],
    gradient: "linear-gradient(135deg, #0ea5e9 0%, #0284c7 55%, #1e3a8a 100%)",
  },
];

export default function AboutPage() {
  const { theme, isDark, toggleTheme } = useTheme();

  const footerText = useMemo(
    () => `(c) ${new Date().getFullYear()} Rajat Khandelwal. About page.`,
    [],
  );

  useEffect(() => {
    document.title = "About | Rajat Portfolio";
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
          <Link
            key={item.label}
            className={`group relative flex size-12 items-center justify-center rounded-full transition-all ${
              item.active
                ? "bg-[var(--primary)] text-white shadow-[0_10px_24px_var(--primary-glow)]"
                : "text-[var(--text-muted)] hover:bg-[var(--icon-chip-bg)] hover:text-[var(--primary)]"
            }`}
            href={item.href}
            onClick={() => logUiEvent("nav_clicked", { page: "about", label: item.label, href: item.href })}
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
              <h1 className="text-xl font-bold tracking-tight text-[var(--text-main)]">Rajat Khandelwal</h1>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">
                About
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
          <div className="mb-8 flex justify-center">
            <div className="relative flex flex-col items-center">
              <div className="h-8 w-px bg-[var(--section-line)]" />
              <motion.div
                animate={{ rotate: [-4, 4, -4] }}
                className="portfolio-glass-card max-w-3xl rounded-2xl border border-[var(--card-hover-border)] px-5 py-4 text-center"
                transition={{ duration: 3.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--primary)]">Note</p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-main)]">
                  Extracted dynamically from MCP Apify API: This API provides a pre-configured MCP
                  client for LinkedIn profile scraping, allowing you to access LinkedIn data
                  programmatically.
                </p>
              </motion.div>
            </div>
          </div>

          <motion.section
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="font-display text-5xl tracking-tight text-[var(--text-main)] md:text-6xl">
              Rajat Khandelwal
            </h2>
            <p className="mt-3 text-[var(--text-muted)]">
              He/Him · AI Engineer | MERN Stack Developer | Azure Cloud & DevOps | Generative AI &
              LLM Workflows | Python & Machine Learning
            </p>
            <p className="mt-2 text-sm uppercase tracking-wider text-[var(--primary)]">
              Delhi, India · Tata Consultancy Services · Govt. Engineering College Bikaner
            </p>
          </motion.section>

          <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {profileStats.map((stat, index) => (
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                className="portfolio-glass-card rounded-2xl p-5 text-center"
                initial={{ opacity: 0, y: 18 }}
                key={stat.label}
                transition={{ duration: 0.35, delay: index * 0.08 }}
              >
                <p className="text-2xl font-bold text-[var(--text-main)]">{stat.value}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </section>

          <section className="mb-10 rounded-3xl border border-[var(--glass-border)] p-8 shadow-[var(--card-shadow)]" style={{ background: "linear-gradient(135deg, rgba(249,115,22,0.14) 0%, rgba(234,88,12,0.06) 45%, rgba(124,58,237,0.1) 100%)" }}>
            <h3 className="text-2xl font-semibold text-[var(--text-main)]">Professional Summary</h3>
            <p className="mt-4 leading-relaxed text-[var(--text-muted)]">
              I am a Lead AI Engineer passionate about building scalable, intelligent systems that
              bridge research and production. My expertise lies in architecting and optimizing LLM
              workflows using LangChain, LangGraph, LlamaIndex, and Autogen, and deploying
              conversational/agentic AI systems powered by Generative AI.
            </p>
            <p className="mt-3 leading-relaxed text-[var(--text-muted)]">
              I deliver end-to-end enterprise solutions from preprocessing and model workflows to API
              deployment, Azure cloud pipelines, and production monitoring. Alongside AI, I bring
              strong full-stack MERN and cloud-native DevOps execution to ensure solutions are both
              technically robust and business-aligned.
            </p>
          </section>

          <section className="mb-10 grid gap-6 lg:grid-cols-2">
            <div className="portfolio-glass-card rounded-3xl p-6">
              <h3 className="text-2xl font-semibold text-[var(--text-main)]">Open To Work</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {openRoles.map((role) => (
                  <span
                    className="theme-chip rounded-full px-3 py-1 text-xs font-medium"
                    key={role}
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>
            <div className="portfolio-glass-card rounded-3xl p-6">
              <h3 className="text-2xl font-semibold text-[var(--text-main)]">Contact Info</h3>
              <div className="mt-4 space-y-2 text-[var(--text-muted)]">
                <p>Email: rajatkhandelwal191@gmail.com</p>
                <p>Location: Delhi, India</p>
                <a
                  className="block transition-colors hover:text-[var(--primary)]"
                  href="https://github.com/rajatkhandelwal191"
                  onClick={() => logUiEvent("profile_link_clicked", { page: "about", platform: "github" })}
                  rel="noreferrer noopener"
                  target="_blank"
                >
                  GitHub: github.com/rajatkhandelwal191
                </a>
                <a
                  className="block transition-colors hover:text-[var(--primary)]"
                  href="https://www.linkedin.com/in/rajatkhandelwal27/"
                  onClick={() => logUiEvent("profile_link_clicked", { page: "about", platform: "linkedin" })}
                  rel="noreferrer noopener"
                  target="_blank"
                >
                  LinkedIn: linkedin.com/in/rajatkhandelwal27
                </a>
              </div>
            </div>
          </section>

          <section className="mb-10">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-semibold text-[var(--text-main)]">Certifications & Verified Credentials</h3>
                <p className="text-xs text-[var(--text-muted)]">Verified badges issued on Credly and professional certifications</p>
              </div>
              <a
                href="https://www.credly.com/users/rajat-khandelwal.b764d962"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => logUiEvent("credly_profile_clicked", { page: "about" })}
                className="inline-flex items-center gap-1.5 rounded-xl border border-indigo-500/30 bg-indigo-500/10 px-3 py-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500/20 transition"
              >
                <span>View Full Credly Profile</span>
                <span className="material-symbols-outlined text-xs">open_in_new</span>
              </a>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {certifications.map((cert) => (
                <div
                  key={cert.title}
                  className="portfolio-glass-card flex flex-col justify-between rounded-2xl p-5 border border-[var(--glass-border)]"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-500">
                        {cert.tag}
                      </span>
                      <span className="material-symbols-outlined text-lg text-[var(--text-muted)]">
                        {cert.icon}
                      </span>
                    </div>
                    <h4 className="mt-2 text-base font-bold text-[var(--text-main)]">
                      {cert.title}
                    </h4>
                    <p className="mt-1 text-xs text-[var(--text-muted)] leading-relaxed">
                      {cert.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[var(--glass-border)] flex items-center justify-between">
                    <span className="text-[11px] font-medium text-[var(--text-muted)]">
                      Issuer: {cert.issuer}
                    </span>
                    <a
                      href={cert.badgeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      Verify Badge <span className="material-symbols-outlined text-xs">open_in_new</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-10">
            <h3 className="mb-4 text-2xl font-semibold text-[var(--text-main)]">Core Skills</h3>
            <div className="flex flex-wrap gap-2">
              {coreSkills.map((skill) => (
                <span
                  className="theme-chip rounded-full px-3 py-1 text-xs font-medium"
                  key={skill}
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          <section className="space-y-8">
            <h3 className="text-2xl font-semibold text-[var(--text-main)]">Experience Highlights</h3>
            {experienceHighlights.map((item, index) => (
              <motion.article
                animate={{ opacity: 1, y: 0 }}
                className="feature-card relative overflow-hidden rounded-3xl"
                initial={{ opacity: 0, y: 20 }}
                key={item.title}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <div className="absolute inset-0 opacity-95" style={{ background: item.gradient }} />
                <div className="project-noise absolute inset-0 opacity-20" />
                <div className="relative z-10 p-8 text-white">
                  <h4 className="font-display text-3xl">{item.title}</h4>
                  <p className="mt-2 text-sm uppercase tracking-[0.12em] text-white/85">{item.period}</p>
                  <ul className="mt-5 space-y-2 text-white/90">
                    {item.points.map((point) => (
                      <li className="flex items-start gap-2" key={point}>
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/90" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            ))}
          </section>
        </main>

        <footer className="mt-auto border-t border-[var(--footer-border)] bg-[var(--footer-bg)] px-6 py-10 text-center backdrop-blur-sm">
          <p className="text-xs text-[var(--text-muted)]">{footerText}</p>
        </footer>
      </div>
    </div>
  );
}
