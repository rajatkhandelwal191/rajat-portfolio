"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

type Theme = "light" | "dark";

type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  highlights: string[];
  tags: string[];
  badgeClass: string;
  icon: string;
  isCurrent?: boolean;
};

const navItems = [
  { href: "/projects", icon: "folder_open", label: "Projects" },
  { href: "/#about", icon: "person", label: "About" },
  { href: "/", icon: "home", label: "Home" },
  { href: "/experience", icon: "work", label: "Experience", active: true },
  { href: "/#contact", icon: "send", label: "Contact" },
];

const experienceData: ExperienceItem[] = [
  {
    company: "Harmoney",
    role: "Fullstack Engineer",
    period: "January 2023 - Present",
    highlights: [
      "Integrated Google Gemini into the platform and built the first AI agent, increasing loan book performance and customer conversion.",
      "Created a reusable analytics library across product and landing pages for data-driven decisions.",
      "Migrated the core data layer from TypeORM to Prisma, improving DX and reducing migration conflicts.",
      "Contributed to product and UX focus groups to align engineering with user outcomes.",
      "Organized internal hackathon initiatives and toolkits for cross-functional collaboration.",
    ],
    tags: ["React", "TypeScript", "Node.js", "Google Gemini", "Prisma"],
    badgeClass: "bg-red-500 text-white shadow-lg shadow-red-500/20",
    icon: "code",
    isCurrent: true,
  },
  {
    company: "Jasper",
    role: "Frontend Developer",
    period: "June 2021 - December 2022",
    highlights: [
      "Built pixel-perfect marketing experiences in Next.js + Tailwind with design-team collaboration.",
      "Improved application performance and Core Web Vitals by approximately 40%.",
      "Developed a reusable Storybook component system used across internal tools.",
    ],
    tags: ["Next.js", "Tailwind", "Storybook"],
    badgeClass: "bg-slate-700 text-white border border-white/10",
    icon: "web",
  },
  {
    company: "Freelance",
    role: "Web Developer",
    period: "2020 - 2021",
    highlights: [
      "Developed custom Shopify themes for e-commerce clients and improved conversion rates.",
      "Created responsive landing pages for local businesses using HTML, SCSS, and JavaScript.",
    ],
    tags: ["Shopify", "JavaScript", "SCSS"],
    badgeClass: "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/20",
    icon: "laptop_chromebook",
  },
];

export default function ExperiencePage() {
  const [theme, setTheme] = useState<Theme>("dark");
  const isDark = theme === "dark";

  const footerText = useMemo(
    () => `(c) ${new Date().getFullYear()} Rajat Khandelwal. Experience page.`,
    [],
  );

  useEffect(() => {
    document.title = "Experience Page | Rajat Portfolio";
  }, []);

  return (
    <div
      className={`portfolio-shell relative min-h-screen w-full overflow-x-hidden ${
        isDark ? "dark-pattern" : "light-pattern"
      }`}
      data-theme={theme}
    >
      <aside className="nav-float fixed left-4 top-1/2 z-50 hidden -translate-y-1/2 md:block">
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-[var(--nav-border)] p-2">
          {navItems.map((item) => (
            <a
              key={item.label}
              aria-label={item.label}
              className={`group relative rounded-xl p-3 transition-all ${
                item.active
                  ? "bg-[var(--cream-active)] text-[var(--cream-text)] shadow-lg shadow-[var(--primary-glow)]"
                  : "text-[var(--text-muted)] hover:bg-white/10 hover:text-[var(--text-main)]"
              }`}
              href={item.href}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className="pointer-events-none absolute left-full ml-2 whitespace-nowrap rounded border border-white/10 bg-slate-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                {item.label}
              </span>
            </a>
          ))}
        </div>
      </aside>

      <div className="fixed bottom-12 right-8 top-12 z-40 hidden w-2 flex-col items-center justify-between xl:flex">
        <div className="flex flex-col items-center gap-2">
          <div className="h-1 w-1 rounded-full bg-[var(--rail-dot)]" />
          <div className="h-1 w-1 rounded-full bg-[var(--rail-dot)]" />
          <div className="h-1 w-1 rounded-full bg-[var(--rail-dot)]" />
          <div className="h-1 w-1 rounded-full bg-[var(--rail-dot)]" />
          <div className="mt-2 h-3 w-3 rounded-full bg-[var(--cream-active)] shadow-[0_0_10px_rgba(255,228,196,0.8)]" />
        </div>
      </div>

      <div className="layout-container relative mx-auto min-h-screen w-full max-w-5xl px-6 py-16 md:pl-24 lg:pl-0">
        <motion.header
          animate={{ opacity: 1, y: 0 }}
          className="portfolio-glass sticky top-4 z-40 mb-16 flex items-center justify-between rounded-xl border border-[var(--glass-border)] px-6 py-5"
          initial={{ opacity: 0, y: -18 }}
          transition={{ duration: 0.35 }}
        >
          <div className="flex items-center gap-4">
            <div className="flex size-10 items-center justify-center rounded-full bg-[var(--primary)] text-white shadow-[0_0_20px_var(--primary-glow)]">
              <span className="material-symbols-outlined">work</span>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-[var(--text-main)]">Rajat Khandelwal</h1>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">
                Experience Page
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

        <main>
          <section className="mb-20 text-center">
            <h2 className="font-display mb-2 text-5xl text-[var(--text-main)] md:text-6xl">Rajat Khandelwal</h2>
            <p className="text-lg tracking-wide text-[var(--text-muted)]">
              Software <span className="mx-1 opacity-70">|</span> Engineer
            </p>
          </section>

          <section className="relative">
            <div className="absolute bottom-0 left-4 top-4 w-0.5 bg-gradient-to-b from-[var(--cream-active)] via-slate-700/40 to-transparent md:left-8" />

            <div className="space-y-12">
              {experienceData.map((item, index) => (
                <motion.article
                  key={item.company}
                  animate={{ opacity: 1, y: 0 }}
                  className="group relative pl-12 md:pl-20"
                  initial={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                >
                  <div
                    className={`absolute left-2 top-2 z-10 h-4 w-4 rounded-full border-4 md:left-6 md:h-5 md:w-5 ${
                      item.isCurrent
                        ? "bg-[var(--cream-active)] shadow-[0_0_15px_rgba(255,228,196,0.6)]"
                        : "bg-slate-600 group-hover:bg-[var(--cream-active)]"
                    }`}
                    style={{ borderColor: "var(--page-bg)" }}
                  />
                  {item.isCurrent ? (
                    <div className="absolute left-2 top-2 h-4 w-4 animate-ping rounded-full bg-[var(--cream-active)] opacity-75 md:left-6 md:h-5 md:w-5" />
                  ) : null}

                  <div className="portfolio-glass-card relative overflow-hidden rounded-2xl border border-white/10 p-8 transition-all duration-300 hover:bg-white/5">
                    <div className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-[var(--primary-soft)] blur-3xl" />

                    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div>
                        <div className="mb-3 inline-flex items-center gap-2">
                          <span className={`rounded-full px-4 py-1.5 text-sm font-bold ${item.badgeClass}`}>
                            {item.company}
                          </span>
                        </div>
                        <h3 className="mb-1 text-2xl font-bold text-[var(--text-main)]">{item.role}</h3>
                        <p className="text-sm font-medium uppercase tracking-wider text-[var(--text-muted)]">
                          {item.period}
                        </p>
                      </div>
                      <div className="hidden md:block">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                          <span className="material-symbols-outlined text-[var(--text-muted)]">{item.icon}</span>
                        </div>
                      </div>
                    </div>

                    <ul className="space-y-4 text-[var(--text-muted)]">
                      {item.highlights.map((highlight) => (
                        <li className="flex items-start gap-3 leading-relaxed" key={highlight}>
                          <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--cream-active)] shadow-[0_0_8px_rgba(255,228,196,0.6)]" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8 flex flex-wrap gap-2 border-t border-white/5 pt-6">
                      {item.tags.map((tag) => (
                        <span
                          className="rounded-full border border-white/5 bg-white/5 px-3 py-1 text-xs text-[var(--text-muted)] transition-colors hover:border-[var(--cream-active)]"
                          key={tag}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </section>

          <div className="mt-20 text-center">
            <a
              className="inline-flex items-center gap-2 text-sm font-medium text-[var(--text-muted)] transition-colors hover:text-[var(--cream-active)]"
              href="#"
            >
              <span className="material-symbols-outlined text-lg">download</span>
              Download Resume
            </a>
          </div>
        </main>

        <footer className="mt-12 border-t border-[var(--footer-border)] bg-[var(--footer-bg)] px-6 py-8 text-center backdrop-blur-sm">
          <p className="text-xs text-[var(--text-muted)]">{footerText}</p>
        </footer>
      </div>
    </div>
  );
}
