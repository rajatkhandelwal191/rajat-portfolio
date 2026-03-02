"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

type Theme = "light" | "dark";
type LogoType = "scraatch" | "anass" | "harmoney";

type FeaturedProject = {
  title: string;
  category: string;
  description: string;
  tags: string[];
  gradient: string;
  accent: string;
  logo: LogoType;
  primaryCta: string;
  secondaryCta?: string;
};

const navItems = [
  { href: "/", icon: "home", label: "Home" },
  { href: "/#about", icon: "person", label: "About" },
  { href: "/projects", icon: "code_blocks", label: "Projects", active: true },
  { href: "/experience", icon: "history_edu", label: "Experience" },
  { href: "/contact", icon: "alternate_email", label: "Contact" },
];

const featuredProjects: FeaturedProject[] = [
  {
    title: "Scraatch",
    category: "Web Application",
    description:
      "Create and send custom scratch cards to your family and friends. A unique way to reveal surprises digitally with a tactile feel.",
    tags: ["React", "TypeScript", "Canvas API", "Tailwind"],
    gradient: "linear-gradient(135deg, #f59e0b 0%, #f97316 45%, #b45309 100%)",
    accent: "#f59e0b",
    logo: "scraatch",
    primaryCta: "View Live",
    secondaryCta: "Source Code",
  },
  {
    title: "AnAss",
    category: "Productivity Tool",
    description:
      "A comprehensive suite for personal organization. Includes trackers, wishlists, todo lists, calendars, and shopping lists all in one place.",
    tags: ["Vue.js", "Firebase", "PWA"],
    gradient: "linear-gradient(135deg, #7c3aed 0%, #8b5cf6 40%, #312e81 100%)",
    accent: "#a78bfa",
    logo: "anass",
    primaryCta: "View Live",
    secondaryCta: "Source Code",
  },
  {
    title: "Harmoney",
    category: "Fintech Platform",
    description:
      "Integrated Google Gemini to build an AI agent for loan processing, increasing operational efficiency and user satisfaction.",
    tags: ["Next.js", "Google Gemini", "Prisma"],
    gradient: "linear-gradient(135deg, #f43f5e 0%, #db2777 42%, #dc2626 100%)",
    accent: "#fb7185",
    logo: "harmoney",
    primaryCta: "Case Study",
  },
];

function ProjectLogo({ logo }: { logo: LogoType }) {
  if (logo === "scraatch") {
    return (
      <div className="feature-logo-shell bg-black/20">
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-xl bg-slate-900">
          <span className="font-display text-lg font-bold tracking-wide text-yellow-300 md:text-xl">SCRAAATCH</span>
        </div>
      </div>
    );
  }

  if (logo === "anass") {
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

  return (
    <div className="feature-logo-shell bg-white/90">
      <div className="flex h-full w-full items-center justify-center rounded-xl">
        <span className="font-display text-2xl font-bold text-rose-500">HM</span>
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const [theme, setTheme] = useState<Theme>("dark");
  const isDark = theme === "dark";

  const footerText = useMemo(
    () => `(c) ${new Date().getFullYear()} Rajat Khandelwal. Project page.`,
    [],
  );

  useEffect(() => {
    document.title = "Project Page | Rajat Portfolio";
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
            className={`group relative flex size-12 items-center justify-center rounded-full transition-all ${
              item.active
                ? "bg-[var(--primary)] text-white shadow-[0_10px_24px_var(--primary-glow)]"
                : "text-[var(--text-muted)] hover:bg-[var(--icon-chip-bg)] hover:text-[var(--primary)]"
            }`}
            href={item.href}
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
            onClick={() => setTheme(isDark ? "light" : "dark")}
            type="button"
          >
            <span className="material-symbols-outlined">{isDark ? "light_mode" : "dark_mode"}</span>
          </button>
        </motion.header>

        <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-12">
          <motion.section
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
            initial={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.45, delay: 0.1 }}
          >
            <div className="mb-8 flex items-center gap-4">
              <span className="material-symbols-outlined text-3xl text-[var(--cream-active)]">
                folder_special
              </span>
              <h2 className="font-display text-3xl font-bold text-[var(--section-title)]">
                Project Page
              </h2>
              <div className="ml-4 h-px flex-grow bg-[var(--section-line)]" />
            </div>

            <div className="space-y-10">
              {featuredProjects.map((project, index) => (
                <motion.article
                  key={project.title}
                  animate={{ opacity: 1, y: 0 }}
                  className="group feature-card relative overflow-hidden rounded-3xl"
                  initial={{ opacity: 0, y: 24 }}
                  transition={{ duration: 0.45, delay: 0.12 * index }}
                  whileHover={{ y: -8 }}
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
                        <a
                          className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-bold text-slate-900 shadow-lg transition-colors duration-300 hover:bg-slate-100"
                          href="#"
                          style={{ color: project.accent }}
                        >
                          {project.primaryCta}
                          <span className="material-symbols-outlined text-sm">
                            {project.primaryCta === "Case Study" ? "arrow_forward" : "open_in_new"}
                          </span>
                        </a>

                        {project.secondaryCta ? (
                          <a
                            className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-black/20 px-6 py-3 font-medium text-white backdrop-blur-sm transition-colors duration-300 hover:bg-black/30"
                            href="#"
                          >
                            {project.secondaryCta}
                            <span className="material-symbols-outlined text-sm">code</span>
                          </a>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.section>
        </main>

        <footer className="mt-auto border-t border-[var(--footer-border)] bg-[var(--footer-bg)] px-6 py-10 text-center backdrop-blur-sm">
          <p className="text-xs text-[var(--text-muted)]">{footerText}</p>
        </footer>
      </div>
    </div>
  );
}
