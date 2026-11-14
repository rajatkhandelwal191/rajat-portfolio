"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import ChatbotWindow from "../components/ChatbotWindow";
import { logUiEvent } from "../lib/frontendLogger";

import { useTheme } from "../context/ThemeContext";

const navItems = [
  { href: "/", icon: "home", label: "Home", active: true },
  { href: "/about", icon: "person", label: "About" },
  { href: "/projects", icon: "code_blocks", label: "Projects" },
  { href: "/experience", icon: "history_edu", label: "Experience" },
  { href: "/resume", icon: "description", label: "Resume" },
  { href: "/contact", icon: "alternate_email", label: "Contact" },
  { href: "#chatbot", icon: "smart_toy", label: "RajatGPT" },
];

const techPills = [
  { name: "MS Agent Framework", icon: "psychology", highlight: true },
  { name: "LangGraph", icon: "account_tree", highlight: true },
  { name: "FastAPI (Python 3.12)", icon: "api", highlight: true },
  { name: "React & TypeScript", icon: "terminal", highlight: true },
  { name: "Azure AI Search", icon: "search", highlight: true },
  { name: "Azure OpenAI & Foundry", icon: "bolt", highlight: false },
  { name: "PostgreSQL Flexible Server", icon: "database", highlight: false },
  { name: "ServiceNow CMDB", icon: "dns", highlight: false },
  { name: "Azure Durable Functions", icon: "hourglass_top", highlight: false },
  { name: "Bicep IaC & GitHub Actions", icon: "deployed_code", highlight: false },
  { name: "Entra ID & MSAL SSO", icon: "security", highlight: false },
  { name: "Docker & Container Apps", icon: "inventory_2", highlight: false },
];

const keyMetrics = [
  { label: "Experience", value: "5+", suffix: "Years", desc: "Production AI & Full-Stack" },
  { label: "Ops Automated", value: "70-80%", suffix: "Reduction", desc: "TCS ITIS Infra Operations" },
  { label: "NLP Ingestion", value: "100K+", suffix: "Records", desc: "Automated ITSM Classification" },
  { label: "Uptime & Reliability", value: "0", suffix: "SLA Breaches", desc: "3+ Years Enterprise Delivery" },
];

const heroPrefix = "Architecting Enterprise AI Systems & ";
const heroSuffix = "Agentic Workflows.";
const fullHeroTitle = `${heroPrefix}${heroSuffix}`;

export default function Home() {
  const { theme, isDark, toggleTheme } = useTheme();
  const [typedLength, setTypedLength] = useState(0);

  useEffect(() => {
    let current = 0;
    const startTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (current < fullHeroTitle.length) {
          current++;
          setTypedLength(current);
        } else {
          clearInterval(interval);
        }
      }, 38);
      return () => clearInterval(interval);
    }, 250);

    return () => clearTimeout(startTimeout);
  }, []);

  const typedPrefix = fullHeroTitle.slice(0, Math.min(typedLength, heroPrefix.length));
  const typedSuffix =
    typedLength > heroPrefix.length
      ? fullHeroTitle.slice(heroPrefix.length, typedLength)
      : "";

  useEffect(() => {
    document.title = "Rajat Khandelwal | Lead AI Engineer & Full-Stack Architect";
  }, []);

  const footerText = useMemo(
    () => `(c) ${new Date().getFullYear()} Rajat Khandelwal. Engineered with Next.js 15, FastAPI & LangGraph.`,
    [],
  );

  return (
    <div
      className={`portfolio-shell relative min-h-screen w-full overflow-x-hidden ${
        isDark ? "dark-pattern" : "light-pattern"
      }`}
      data-theme={theme}
    >
      {/* Floating Left Dock Navigation */}
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
            <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/25">
              <span className="material-symbols-outlined text-xl">terminal</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold tracking-tight text-[var(--text-main)]">
                  Rajat Khandelwal
                </span>
                <span className="hidden rounded-full border border-indigo-500/30 bg-indigo-500/10 px-2 py-0.5 text-[10px] font-semibold text-indigo-400 sm:inline-block">
                  Lead AI Engineer
                </span>
              </div>
              <p className="text-[11px] font-medium text-[var(--text-muted)]">
                Agentic Workflows · LangGraph · Azure Cloud
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/resume"
              onClick={() => logUiEvent("header_resume_clicked", { page: "home" })}
              className="theme-btn-secondary hidden items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold sm:inline-flex"
            >
              <span className="material-symbols-outlined text-sm">description</span>
              Resume
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

        {/* Hero Section */}
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
          <section id="home" className="mb-16 pt-4 sm:pt-8">
            {/* Live Availability & Certifications Pills */}
            <div className="flex flex-wrap items-center gap-3">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="inline-flex items-center gap-2.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400"
              >
                <span className="size-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
                <span>Available for Lead AI & Full-Stack Opportunities</span>
              </motion.div>

              <motion.a
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                href="https://www.credly.com/badges/7dd35d2b-d461-40a6-90da-2114681ff507/public_url"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => logUiEvent("credly_badge_clicked", { source: "hero_pill" })}
                className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-xs font-semibold text-purple-700 dark:text-purple-300 transition hover:scale-105 hover:bg-purple-500/20"
              >
                <span className="material-symbols-outlined text-sm text-purple-600 dark:text-purple-400">verified</span>
                <span>Claude Certified Architect Professional · Azure AI Engineer (AI-102)</span>
                <span className="material-symbols-outlined text-xs">open_in_new</span>
              </motion.a>
            </div>

            {/* Main Headline with Typewriter Effect */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="mt-6 max-w-4xl text-4xl font-extrabold leading-[1.15] tracking-tight text-[var(--text-main)] sm:text-6xl lg:text-7xl min-h-[2.4em] sm:min-h-[2.3em]"
            >
              {typedPrefix}
              {typedSuffix ? (
                <span className="text-gradient-primary">
                  {typedSuffix}
                </span>
              ) : null}
              <span
                className="ml-1.5 inline-block h-[0.82em] w-[3px] align-baseline bg-indigo-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(99,102,241,0.6)]"
                aria-hidden="true"
              />
            </motion.h1>

            {/* Sub-Headline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--text-muted)] sm:text-lg"
            >
              Lead AI Engineer with <strong>5+ years of experience</strong> designing multi-agent LangGraph workflows, Microsoft Agent Framework architectures, high-throughput RAG retrieval pipelines, and scalable enterprise cloud backends.
            </motion.p>

            {/* Hero Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="mt-8 flex flex-wrap items-center gap-3.5"
            >
              <Link
                href="/projects/portfolio-architecture"
                onClick={() => logUiEvent("hero_architecture_clicked", { page: "home" })}
                className="group inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:scale-[1.02] hover:shadow-indigo-500/40"
              >
                <span className="material-symbols-outlined text-lg">account_tree</span>
                Explore Site Architecture
                <span className="material-symbols-outlined text-sm transition-transform duration-300 group-hover:translate-x-1">
                  arrow_forward
                </span>
              </Link>

              <Link
                href="/resume"
                onClick={() => logUiEvent("hero_resume_clicked", { page: "home" })}
                className="theme-btn-secondary inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold"
              >
                <span className="material-symbols-outlined text-lg">description</span>
                View Resume / CV
              </Link>

              <a
                href="#chatbot"
                onClick={() => {
                  const el = document.getElementById("chatbot");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="theme-btn-secondary inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold"
              >
                <span className="material-symbols-outlined text-lg text-indigo-600 dark:text-indigo-400">smart_toy</span>
                Ask RajatGPT
              </a>
            </motion.div>

            {/* Metrics Counter Strip */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="mt-12 grid grid-cols-2 gap-4 rounded-2xl border border-[var(--glass-border)] bg-[var(--card-bg)] p-6 shadow-[var(--card-shadow)] sm:grid-cols-4"
            >
              {keyMetrics.map((m) => (
                <div key={m.label} className="border-l-2 border-indigo-500/50 pl-3">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-black tracking-tight text-[var(--text-main)] sm:text-3xl">
                      {m.value}
                    </span>
                    <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">{m.suffix}</span>
                  </div>
                  <p className="mt-0.5 text-xs font-medium text-[var(--text-muted)]">{m.desc}</p>
                </div>
              ))}
            </motion.div>

            {/* Tech Stack Marquee Pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="mt-8 flex flex-wrap items-center gap-2"
            >
              <span className="mr-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                Core Stack:
              </span>
              {techPills.map((pill) => (
                <span
                  key={pill.name}
                  className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1 text-xs font-medium transition hover:scale-105 ${
                    pill.highlight
                      ? "border-indigo-500/40 bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 font-semibold"
                      : "theme-chip"
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">{pill.icon}</span>
                  {pill.name}
                </span>
              ))}
            </motion.div>
          </section>

          {/* Bento Grid Showcase */}
          <section className="mb-20">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-[var(--text-main)] sm:text-2xl">
                  Featured Work & Navigation
                </h2>
                <p className="text-xs text-[var(--text-muted)]">
                  Explore architecture deep-dives, career highlights, and verified credentials.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {/* Card 1: Large Featured System Architecture (Spans 2 cols) */}
              <div className="bento-card group col-span-1 p-7 md:col-span-2">
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-700 dark:text-indigo-400">
                        <span className="size-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400 animate-ping" />
                        Full-Stack Deep Dive
                      </span>
                      <span className="font-mono text-xs text-[var(--text-muted)]">Monorepo / 2026</span>
                    </div>

                    <h3 className="mt-4 text-2xl font-bold text-[var(--text-main)]">
                      AI Portfolio & Agentic RAG Platform
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                      The complete architectural blueprint powering this site. Built with Next.js 15, FastAPI, a multi-tool LangGraph state graph, Groq 120B inference, and dual vector stores with zero-downtime failover.
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2 text-xs">
                      <span className="theme-chip rounded-md px-2.5 py-1 font-mono text-xs">
                        LangGraph Agentic RAG
                      </span>
                      <span className="theme-chip rounded-md px-2.5 py-1 font-mono text-xs">
                        Groq 120B LPU (&lt;1s)
                      </span>
                      <span className="theme-chip rounded-md px-2.5 py-1 font-mono text-xs">
                        Supabase pgvector (384-dim)
                      </span>
                      <span className="theme-chip rounded-md px-2.5 py-1 font-mono text-xs">
                        Local FAISS Fallback
                      </span>
                    </div>
                  </div>

                  <div className="mt-8 flex items-center justify-between border-t border-[var(--glass-border)] pt-5">
                    <span className="text-xs font-medium text-[var(--text-muted)]">
                      Includes 66-chunk RAG explorer & dataflow diagram
                    </span>
                    <Link
                      href="/projects/portfolio-architecture"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 dark:text-indigo-400 transition group-hover:translate-x-1"
                    >
                      Explore Architecture
                      <span className="material-symbols-outlined text-base">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Card 2: Experience Spotlight (1 col) */}
              <div className="bento-card group col-span-1 p-7">
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <div className="flex size-10 items-center justify-center rounded-xl bg-orange-500/15 text-orange-600 dark:text-orange-400">
                      <span className="material-symbols-outlined">history_edu</span>
                    </div>
                    <h3 className="mt-4 text-xl font-bold text-[var(--text-main)]">Enterprise Solutions</h3>
                    <p className="mt-2 text-xs leading-relaxed text-[var(--text-muted)]">
                      Lead AI Engineer & Full-Stack Developer at TCS delivering mission-critical platforms for enterprise clients:
                    </p>

                    <div className="mt-4 space-y-2.5 text-xs text-[var(--text-muted)]">
                      <div className="flex items-start gap-2">
                        <span className="mt-1 size-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 shrink-0" />
                        <div>
                          <strong className="text-[var(--text-main)]">Enbridge:</strong> EOL Agent Platform (React, FastAPI, MS Agent Framework, AI Search)
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="mt-1 size-1.5 rounded-full bg-blue-500 dark:bg-blue-400 shrink-0" />
                        <div>
                          <strong className="text-[var(--text-main)]">Exelon:</strong> ITIS Agentic AI Workflows & Audit-Ready Reporting
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="mt-1 size-1.5 rounded-full bg-amber-500 dark:bg-amber-400 shrink-0" />
                        <div>
                          <strong className="text-[var(--text-main)]">Outokumpu:</strong> OTK Multilingual Enterprise Chatbot & RAG
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-[var(--glass-border)] pt-4">
                    <Link
                      href="/experience"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 transition group-hover:translate-x-1"
                    >
                      See Career & Client Timeline
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Card 3: Projects Spotlight (1 col) */}
              <div className="bento-card group col-span-1 p-7">
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <div className="flex size-10 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-600 dark:text-cyan-400">
                      <span className="material-symbols-outlined">code_blocks</span>
                    </div>
                    <h3 className="mt-4 text-xl font-bold text-[var(--text-main)]">Featured Projects</h3>
                    <p className="mt-2 text-xs leading-relaxed text-[var(--text-muted)]">
                      Google Play Store apps (DeepDisk, Vaulet & WhiteFrame), Interactive RAG Playground, and Exam Parser Pipeline.
                    </p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      <Link
                        href="/projects/deepdisk"
                        className="inline-flex items-center gap-1 rounded-md border border-sky-500/30 bg-sky-500/10 px-2 py-0.5 text-[11px] font-semibold text-sky-600 dark:text-sky-400 hover:bg-sky-500/20 transition"
                      >
                        <span className="material-symbols-outlined text-[13px]">phone_android</span>
                        DeepDisk (Play Store)
                      </Link>
                      <Link
                        href="/projects/vaulet"
                        className="inline-flex items-center gap-1 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 transition"
                      >
                        <span className="material-symbols-outlined text-[13px]">lock</span>
                        Vaulet (Play Store)
                      </Link>
                      <Link
                        href="/projects/whiteframe"
                        className="inline-flex items-center gap-1 rounded-md border border-pink-500/30 bg-pink-500/10 px-2 py-0.5 text-[11px] font-semibold text-pink-600 dark:text-pink-400 hover:bg-pink-500/20 transition"
                      >
                        <span className="material-symbols-outlined text-[13px]">photo_camera</span>
                        WhiteFrame (Play Store)
                      </Link>
                      <span className="theme-chip rounded-md px-2 py-0.5 text-[11px]">
                        RAG Playground
                      </span>
                      <span className="theme-chip rounded-md px-2 py-0.5 text-[11px]">
                        Exam Parser
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-[var(--glass-border)] pt-4">
                    <Link
                      href="/projects"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-600 dark:text-cyan-400 transition group-hover:translate-x-1"
                    >
                      View All Projects
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Card 4: Resume & Credentials (1 col) */}
              <div className="bento-card group col-span-1 p-7">
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <div className="flex size-10 items-center justify-center rounded-xl bg-purple-500/15 text-purple-600 dark:text-purple-400">
                      <span className="material-symbols-outlined">verified</span>
                    </div>
                    <h3 className="mt-4 text-xl font-bold text-[var(--text-main)]">Certifications & Credentials</h3>
                    <p className="mt-2 text-xs leading-relaxed text-[var(--text-muted)]">
                      Verified industry credentials in Enterprise AI Architecture and Azure Cloud engineering:
                    </p>

                    <div className="mt-4 space-y-2">
                      <a
                        href="https://www.credly.com/badges/7dd35d2b-d461-40a6-90da-2114681ff507/public_url"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between rounded-xl border border-purple-500/30 bg-purple-500/10 p-2.5 text-xs transition hover:border-purple-500 hover:bg-purple-500/20"
                      >
                        <div className="flex items-center gap-2">
                          <span className="size-2 rounded-full bg-purple-500 dark:bg-purple-400" />
                          <span className="font-semibold text-purple-700 dark:text-purple-300">Claude Certified Architect</span>
                        </div>
                        <span className="material-symbols-outlined text-xs text-purple-500">open_in_new</span>
                      </a>

                      <a
                        href="https://www.credly.com/users/rajat-khandelwal.b764d962"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between rounded-xl border border-blue-500/30 bg-blue-500/10 p-2.5 text-xs transition hover:border-blue-500 hover:bg-blue-500/20"
                      >
                        <div className="flex items-center gap-2">
                          <span className="size-2 rounded-full bg-blue-500 dark:bg-blue-400" />
                          <span className="font-semibold text-blue-700 dark:text-blue-300">Azure AI Engineer (AI-102)</span>
                        </div>
                        <span className="material-symbols-outlined text-xs text-blue-500">open_in_new</span>
                      </a>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-[var(--glass-border)] pt-4">
                    <Link
                      href="/resume"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-purple-600 dark:text-purple-400 transition group-hover:translate-x-1"
                    >
                      Resume Viewer
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </Link>
                    <a
                      href="https://www.credly.com/users/rajat-khandelwal.b764d962"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-medium text-[var(--text-muted)] underline hover:text-[var(--text-main)]"
                    >
                      Credly Profile ↗
                    </a>
                  </div>
                </div>
              </div>

              {/* Card 5: About & Philosophy (1 col) */}
              <div className="bento-card group col-span-1 p-7">
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <div className="flex size-10 items-center justify-center rounded-xl bg-rose-500/15 text-rose-600 dark:text-rose-400">
                      <span className="material-symbols-outlined">person</span>
                    </div>
                    <h3 className="mt-4 text-xl font-bold text-[var(--text-main)]">About Me</h3>
                    <p className="mt-2 text-xs leading-relaxed text-[var(--text-muted)]">
                      My journey, technical philosophy, and passion for engineering autonomous agent ecosystems.
                    </p>

                    <div className="mt-4 flex items-center gap-3 text-xs text-[var(--text-muted)]">
                      <a
                        href="https://github.com/rajatkhandelwal191"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[var(--text-main)]"
                      >
                        GitHub
                      </a>
                      <span>·</span>
                      <a
                        href="https://www.linkedin.com/in/rajatkhandelwal27/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[var(--text-main)]"
                      >
                        LinkedIn
                      </a>
                      <span>·</span>
                      <Link href="/contact" className="hover:text-[var(--text-main)]">
                        Contact
                      </Link>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-[var(--glass-border)] pt-4">
                    <Link
                      href="/about"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 dark:text-rose-400 transition group-hover:translate-x-1"
                    >
                      Read Bio & Values
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* RajatGPT AI Terminal Section */}
          <section id="chatbot" className="mb-16">
            <div className="rounded-2xl border border-[var(--glass-border)] bg-[var(--card-bg)] p-6 shadow-2xl backdrop-blur-md sm:p-8">
              <div className="mb-6 flex flex-col justify-between gap-4 border-b border-[var(--glass-border)] pb-6 sm:flex-row sm:items-center">
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="flex size-8 items-center justify-center rounded-lg bg-indigo-500/15 text-indigo-600 dark:text-indigo-400">
                      <span className="material-symbols-outlined text-lg">smart_toy</span>
                    </span>
                    <h2 className="text-xl font-bold text-[var(--text-main)]">RajatGPT Assistant</h2>
                  </div>
                  <p className="mt-1 text-xs text-[var(--text-muted)]">
                    Ask anything about Rajat's technical background, projects, architecture, or credentials.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                    <span className="size-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
                    Online · Groq 120B & pgvector
                  </span>
                </div>
              </div>

              {/* Chatbot Window Component */}
              <ChatbotWindow isDark={isDark} name="Rajat" />
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="mt-auto border-t border-[var(--footer-border)] bg-[var(--footer-bg)] px-6 py-10 text-center backdrop-blur-sm">
          <div className="mb-4 flex justify-center gap-6 text-sm text-[var(--text-muted)]">
            <a
              href="https://github.com/rajatkhandelwal191"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-400 transition"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/rajatkhandelwal27/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-400 transition"
            >
              LinkedIn
            </a>
            <Link href="/resume" className="hover:text-indigo-400 transition">
              Resume
            </Link>
            <Link href="/projects/portfolio-architecture" className="hover:text-indigo-400 transition">
              Architecture
            </Link>
            <Link href="/contact" className="hover:text-indigo-400 transition">
              Contact
            </Link>
          </div>
          <p className="text-xs text-[var(--text-muted)]">{footerText}</p>
        </footer>
      </div>
    </div>
  );
}
