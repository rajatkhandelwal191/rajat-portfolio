"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { logUiEvent } from "../../lib/frontendLogger";
import { useTheme } from "../../context/ThemeContext";

const navItems = [
  { href: "/", icon: "home", label: "Home" },
  { href: "/about", icon: "person", label: "About" },
  { href: "/projects", icon: "code_blocks", label: "Projects" },
  { href: "/experience", icon: "history_edu", label: "Experience" },
  { href: "/resume", icon: "description", label: "Resume", active: true },
  { href: "/contact", icon: "alternate_email", label: "Contact" },
  { href: "/#chatbot", icon: "smart_toy", label: "RajatGPT" },
];

export default function ResumePage() {
  const { theme, isDark, toggleTheme } = useTheme();

  const footerText = useMemo(
    () => `(c) ${new Date().getFullYear()} Rajat Khandelwal. Resume document viewer.`,
    [],
  );

  useEffect(() => {
    document.title = "Resume / CV | Rajat Khandelwal";
  }, []);

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
              href="/"
              className="flex items-center gap-2 text-sm font-semibold tracking-wider text-[var(--cream-active)]"
            >
              <span className="material-symbols-outlined text-base">terminal</span>
              RAJAT.DEV / RESUME
            </Link>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--glass-card-border)] bg-white/5 text-[var(--text-primary)] transition hover:bg-white/10"
              >
                <span className="material-symbols-outlined text-base">
                  {isDark ? "light_mode" : "dark_mode"}
                </span>
              </button>

              <a
                href="/Rajat_Khandelwal_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download="Rajat_Khandelwal_Resume.pdf"
                onClick={() => logUiEvent("resume_download_click", { source: "resume_page_header" })}
                className="inline-flex items-center gap-2 rounded-xl bg-[var(--cream-active)] px-4 py-2 text-xs font-semibold text-black transition hover:opacity-90 shadow-md"
              >
                <span className="material-symbols-outlined text-base">download</span>
                Download PDF
              </a>
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">
          {/* Header Banner */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 rounded-2xl border border-[var(--glass-card-border)] bg-[var(--glass-card-bg)] p-6 shadow-xl backdrop-blur-md"
          >
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-[var(--cream-active)]">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  Verified Curriculum Vitae
                </div>
                <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-4xl">
                  Rajat Khandelwal
                </h1>
                <p className="mt-1 text-base text-[var(--text-muted)]">
                  Lead AI Engineer — GenAI & LLM Workflows (LangGraph) — Azure Cloud & DevOps
                </p>

                <div className="mt-4 flex flex-wrap gap-2 text-xs">
                  <span className="rounded-md border border-white/5 bg-white/5 px-2.5 py-1 text-[var(--text-muted)]">
                    4.29+ Years Exp
                  </span>
                  <span className="rounded-md border border-white/5 bg-white/5 px-2.5 py-1 text-[var(--text-muted)]">
                    TCS ITIS & Innovista
                  </span>
                  <span className="rounded-md border border-white/5 bg-white/5 px-2.5 py-1 text-[var(--text-muted)]">
                    B.Tech (2021)
                  </span>
                  <span className="rounded-md border border-white/5 bg-white/5 px-2.5 py-1 text-[var(--text-muted)]">
                    Delhi, India
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="/Rajat_Khandelwal_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-[var(--glass-card-border)] bg-white/5 px-4 py-2.5 text-sm font-medium text-[var(--text-primary)] transition hover:border-[var(--cream-active)] hover:bg-white/10"
                >
                  <span className="material-symbols-outlined text-base">open_in_new</span>
                  Open in New Tab
                </a>

                <button
                  type="button"
                  onClick={() => {
                    const iframe = document.getElementById("resume-frame") as HTMLIFrameElement;
                    if (iframe && iframe.contentWindow) {
                      iframe.contentWindow.print();
                    } else {
                      window.print();
                    }
                  }}
                  className="inline-flex items-center gap-2 rounded-xl border border-[var(--glass-card-border)] bg-white/5 px-4 py-2.5 text-sm font-medium text-[var(--text-primary)] transition hover:border-[var(--cream-active)] hover:bg-white/10"
                >
                  <span className="material-symbols-outlined text-base">print</span>
                  Print
                </button>

                <a
                  href="/Rajat_Khandelwal_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  download="Rajat_Khandelwal_Resume.pdf"
                  className="inline-flex items-center gap-2 rounded-xl bg-[var(--cream-active)] px-5 py-2.5 text-sm font-semibold text-black transition hover:opacity-90 shadow-md"
                >
                  <span className="material-symbols-outlined text-base">download</span>
                  Download
                </a>
              </div>
            </div>
          </motion.div>

          {/* Embedded Document Viewer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="overflow-hidden rounded-2xl border border-[var(--glass-card-border)] bg-black/40 shadow-2xl backdrop-blur-sm"
          >
            <div className="flex items-center justify-between border-b border-[var(--glass-card-border)] bg-white/5 px-5 py-3 text-xs text-[var(--text-muted)]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base text-[var(--cream-active)]">picture_as_pdf</span>
                <span className="font-mono text-[var(--text-primary)]">Rajat_Khandelwal_Resume.pdf</span>
              </div>
              <div className="flex items-center gap-4">
                <Link href="/experience" className="hover:text-[var(--cream-active)] transition">
                  Go to Experience Timeline &rarr;
                </Link>
              </div>
            </div>

            <iframe
              id="resume-frame"
              src="/Rajat_Khandelwal_Resume.pdf#toolbar=1"
              className="h-[85vh] w-full border-0 bg-neutral-900"
              title="Rajat Khandelwal Resume"
            />
          </motion.div>
        </main>

        <footer className="mt-12 border-t border-[var(--footer-border)] bg-[var(--footer-bg)] px-6 py-8 text-center backdrop-blur-sm">
          <p className="text-xs text-[var(--text-muted)]">{footerText}</p>
        </footer>
      </div>
    </div>
  );
}
