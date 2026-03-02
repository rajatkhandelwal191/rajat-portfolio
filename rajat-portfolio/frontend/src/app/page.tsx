"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";

import ChatbotWindow from "../components/ChatbotWindow";
import ProjectCard from "../components/ProjectCard";

type Theme = "light" | "dark";

const navItems = [
  { href: "#home", icon: "home", label: "Home", active: true },
  { href: "#about", icon: "person", label: "About" },
  { href: "/projects", icon: "code_blocks", label: "Projects" },
  { href: "#experience", icon: "history_edu", label: "Experience" },
  { href: "#contact", icon: "alternate_email", label: "Contact" },
];

const cards = [
  {
    id: "about",
    href: "#about",
    icon: "person",
    title: "About",
    description: "Discover my journey, philosophy, and what drives my passion for code.",
    cta: "READ MORE",
  },
  {
    id: "projects",
    href: "/projects",
    icon: "code_blocks",
    title: "Projects",
    description: "Explore my open source contributions, commercial work, and experiments.",
    cta: "VIEW WORK",
  },
  {
    id: "experience",
    href: "#experience",
    icon: "history_edu",
    title: "Experience",
    description: "A timeline of my professional career, roles, and key accomplishments.",
    cta: "SEE TIMELINE",
  },
  {
    id: "contact",
    href: "#contact",
    icon: "alternate_email",
    title: "Contact",
    description: "Let's connect. Available for freelance projects and full-time opportunities.",
    cta: "GET IN TOUCH",
  },
];

const footerLinks = [
  { href: "#", icon: "code", label: "GitHub" },
  { href: "#", icon: "work", label: "LinkedIn" },
  { href: "#", icon: "mail", label: "Email" },
];

export default function Home() {
  const [theme, setTheme] = useState<Theme>("dark");
  const isDark = theme === "dark";

  const footerText = useMemo(
    () => `(c) ${new Date().getFullYear()} Rajat Khandelwal. Built with glassmorphism and motion.`,
    [],
  );

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
                Software Engineer
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

        <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 py-12">
          <motion.section
            animate={{ opacity: 1, y: 0 }}
            className="mb-16 mt-8 max-w-4xl"
            id="home"
            initial={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.45, delay: 0.1 }}
          >
            <h2 className="mb-6 text-5xl font-bold leading-tight tracking-tight text-[var(--text-main)] lg:text-7xl">
              Building high-performance{" "}
              <span
                className={
                  isDark
                    ? "text-[var(--primary)] drop-shadow-[0_0_10px_var(--primary-glow)]"
                    : "text-[var(--primary)]"
                }
              >
                digital solutions
              </span>
              .
            </h2>
            <p className="max-w-2xl text-lg leading-relaxed text-[var(--text-muted)]">
              I specialize in scalable backend architectures and fluid frontend experiences. Exploring
              the intersection of AI and modern web development.
            </p>
          </motion.section>

          <section className="mb-24 grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
            {cards.map((card, index) => (
              <div id={card.id} key={card.title}>
                <ProjectCard
                  cta={card.cta}
                  description={card.description}
                  href={card.href}
                  icon={card.icon}
                  index={index}
                  title={card.title}
                />
              </div>
            ))}
          </section>

          <section id="contact">
            <ChatbotWindow isDark={isDark} name="Rajat" />
          </section>
        </main>

        <footer className="mt-auto border-t border-[var(--footer-border)] bg-[var(--footer-bg)] px-6 py-10 text-center backdrop-blur-sm">
          <div className="mb-6 flex justify-center gap-8">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                className="group relative text-[var(--text-muted)] transition-all hover:scale-110 hover:text-[var(--primary)]"
                href={link.href}
                title={link.label}
              >
                <span className="material-symbols-outlined text-2xl">{link.icon}</span>
                <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-slate-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                  {link.label}
                </span>
              </a>
            ))}
          </div>
          <p className="text-xs text-[var(--text-muted)]">{footerText}</p>
        </footer>
      </div>
    </div>
  );
}

