"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { logUiEvent } from "../../../lib/frontendLogger";

type Theme = "light" | "dark";

const navItems = [
  { href: "/", icon: "home", label: "Home" },
  { href: "/about", icon: "person", label: "About" },
  { href: "/projects", icon: "code_blocks", label: "Projects", active: true },
  { href: "/experience", icon: "history_edu", label: "Experience" },
  { href: "/contact", icon: "alternate_email", label: "Contact" },
];

const architectureCards = [
  {
    title: "Frontend Layer",
    icon: "web",
    detail:
      "Next.js 14 with TypeScript and Tailwind CSS. Responsive design with mobile-first approach and real-time UI updates.",
  },
  {
    title: "Authentication",
    icon: "security",
    detail:
      "Google OAuth via Supabase Auth with role-based access control. Admin system with user blocking and audit trails.",
  },
  {
    title: "Database Layer",
    icon: "storage",
    detail:
      "PostgreSQL via Supabase with Row Level Security. Structured schema for complaints, users, and admin management.",
  },
  {
    title: "File Storage",
    icon: "cloud_upload",
    detail:
      "Cloudflare R2 with automatic WebP conversion, compression, and CDN delivery for evidence files.",
  },
];

const features = [
  {
    title: "Evidence Collection",
    icon: "folder_open",
    detail: "Centralized platform for users to report financial issues with supporting documentation and evidence files.",
  },
  {
    title: "Admin Moderation",
    icon: "admin_panel_settings",
    detail: "Comprehensive admin panel for content moderation, user management, and community updates.",
  },
  {
    title: "Public Transparency",
    icon: "visibility",
    detail: "Public dashboard showing aggregated statistics and approved complaints for community awareness.",
  },
  {
    title: "Content Management",
    icon: "edit_note",
    detail: "Block-level editor for managing community updates and platform content with rich text support.",
  },
  {
    title: "User Management",
    icon: "group",
    detail: "Role-based access control with user blocking system and comprehensive audit logging.",
  },
  {
    title: "Real-time Updates",
    icon: "sync",
    detail: "Live statistics updates and real-time complaint status changes using Supabase real-time subscriptions.",
  },
];

const techStack = [
  { name: "Next.js 14", category: "Frontend Framework" },
  { name: "TypeScript", category: "Language" },
  { name: "Tailwind CSS", category: "Styling" },
  { name: "Supabase", category: "Backend-as-a-Service" },
  { name: "PostgreSQL", category: "Database" },
  { name: "Google OAuth", category: "Authentication" },
  { name: "Cloudflare R2", category: "File Storage" },
  { name: "Vercel", category: "Deployment" },
];

export default function MobiKwikScamTrackerPage() {
  const [theme, setTheme] = useState<Theme>("dark");
  const isDark = theme === "dark";

  const footerText = useMemo(
    () => `(c) ${new Date().getFullYear()} Rajat Khandelwal. MobiKwik Scam Tracker details.`,
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
            onClick={() => logUiEvent("nav_clicked", { page: "project_detail_mobikwik", label: item.label, href: item.href })}
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
              <span className="material-symbols-outlined">security</span>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-[var(--text-main)]">MobiKwik Scam Tracker</h1>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">
                Community Evidence Platform
              </p>
            </div>
          </div>
          <button
            className="portfolio-glass flex size-10 items-center justify-center rounded-xl border border-[var(--glass-border)] text-[var(--primary)] transition-all hover:bg-[var(--icon-chip-bg)]"
            onClick={() => {
              logUiEvent("theme_toggle_clicked", { page: "project_detail_mobikwik", from: theme, to: isDark ? "light" : "dark" });
              setTheme(isDark ? "light" : "dark");
            }}
            type="button"
          >
            <span className="material-symbols-outlined">{isDark ? "light_mode" : "dark_mode"}</span>
          </button>
        </motion.header>

        <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-12">
          <motion.section
            animate={{ opacity: 1, y: 0 }}
            className="feature-card relative mb-10 overflow-hidden rounded-3xl"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
          >
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(135deg, #7c3aed 0%, #8b5cf6 40%, #312e81 100%)", opacity: 0.94 }}
            />
            <div className="project-noise absolute inset-0 opacity-20" />
            <div className="relative z-10 p-8 text-white md:p-10">
              <p className="mb-3 inline-flex items-center rounded-full border border-white/15 bg-black/20 px-3 py-1 text-xs uppercase tracking-[0.15em]">
                Community Evidence Platform
              </p>
              <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
                MobiKwik Lendbox XTRA P2P NBFC Scam Tracker
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/90 md:text-lg">
                A comprehensive community-driven platform designed to track and document issues related to the MobiKwik Lendbox XTRA P2P NBFC platform. Features evidence collection, admin moderation, and public transparency dashboard.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-[#7c3aed] transition-colors hover:bg-slate-100"
                  href="https://mobikwik-lendbox-scam.vercel.app/"
                  onClick={() => logUiEvent("project_link_clicked", { page: "project_detail_mobikwik", cta: "view_live" })}
                  rel="noreferrer noopener"
                  target="_blank"
                >
                  View Live
                  <span className="material-symbols-outlined text-sm">open_in_new</span>
                </a>
                <a
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 font-medium text-white transition-colors hover:bg-white/20"
                  href="https://github.com/rajatkhandelwal191"
                  onClick={() => logUiEvent("profile_link_clicked", { page: "project_detail_mobikwik", platform: "github" })}
                  rel="noreferrer noopener"
                  target="_blank"
                >
                  GitHub Profile
                  <span className="material-symbols-outlined text-sm">person</span>
                </a>
              </div>
            </div>
          </motion.section>

          <section className="mb-10">
            <div className="mb-5 flex items-center gap-3">
              <span className="material-symbols-outlined text-2xl text-[var(--cream-active)]">architecture</span>
              <h3 className="text-2xl font-semibold text-[var(--text-main)]">System Architecture</h3>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {architectureCards.map((card, index) => (
                <motion.article
                  animate={{ opacity: 1, y: 0 }}
                  className="portfolio-glass-card rounded-2xl p-5"
                  initial={{ opacity: 0, y: 16 }}
                  key={card.title}
                  transition={{ duration: 0.35, delay: index * 0.06 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-[var(--primary-soft)] p-2 text-[var(--primary)]">
                      <span className="material-symbols-outlined">{card.icon}</span>
                    </div>
                    <h4 className="font-semibold text-[var(--text-main)]">{card.title}</h4>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">{card.detail}</p>
                </motion.article>
              ))}
            </div>
          </section>

          <section className="mb-10">
            <h3 className="mb-5 text-2xl font-semibold text-[var(--text-main)]">Key Features</h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <motion.article
                  animate={{ opacity: 1, y: 0 }}
                  className="portfolio-glass-card rounded-2xl p-5"
                  initial={{ opacity: 0, y: 16 }}
                  key={feature.title}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="rounded-xl bg-[var(--primary-soft)] p-2 text-[var(--primary)]">
                      <span className="material-symbols-outlined text-lg">{feature.icon}</span>
                    </div>
                    <h4 className="font-semibold text-[var(--text-main)]">{feature.title}</h4>
                  </div>
                  <p className="text-sm leading-relaxed text-[var(--text-muted)]">{feature.detail}</p>
                </motion.article>
              ))}
            </div>
          </section>

          <section className="mb-10 grid gap-6 lg:grid-cols-2">
            <article className="portfolio-glass-card rounded-3xl p-6">
              <h3 className="text-2xl font-semibold text-[var(--text-main)] mb-4">Tech Stack</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {techStack.map((tech) => (
                  <div key={tech.name} className="flex items-center justify-between rounded-lg bg-[var(--icon-chip-bg)] p-3">
                    <span className="font-medium text-[var(--text-main)]">{tech.name}</span>
                    <span className="text-xs text-[var(--text-muted)]">{tech.category}</span>
                  </div>
                ))}
              </div>
            </article>
            
            <article className="portfolio-glass-card rounded-3xl p-6">
              <h3 className="text-2xl font-semibold text-[var(--text-main)] mb-4">Project Purpose</h3>
              <ul className="space-y-3 text-sm leading-relaxed text-[var(--text-muted)]">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[var(--primary)]" />
                  <span><strong>Evidence Collection:</strong> Centralized platform for users to report financial issues</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[var(--primary)]" />
                  <span><strong>Community Support:</strong> Public evidence viewing to help affected users</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[var(--primary)]" />
                  <span><strong>Administrative Control:</strong> Comprehensive admin panel for content moderation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[var(--primary)]" />
                  <span><strong>Transparency:</strong> Public dashboard showing aggregated statistics</span>
                </li>
              </ul>
            </article>
          </section>

          <section className="portfolio-glass-card rounded-3xl border border-[var(--card-hover-border)] p-6">
            <h3 className="text-2xl font-semibold text-[var(--text-main)] mb-4">Links & Resources</h3>
            <div className="flex flex-wrap gap-3">
              <a
                className="rounded-xl border border-[var(--card-hover-border)] bg-[var(--icon-chip-bg)] px-4 py-2 text-sm text-[var(--text-main)] transition-colors hover:text-[var(--primary)]"
                href="https://mobikwik-lendbox-scam.vercel.app/"
                onClick={() => logUiEvent("project_link_clicked", { page: "project_detail_mobikwik", cta: "live_app" })}
                rel="noreferrer noopener"
                target="_blank"
              >
                Live Application
              </a>
              <a
                className="rounded-xl border border-[var(--card-hover-border)] bg-[var(--icon-chip-bg)] px-4 py-2 text-sm text-[var(--text-main)] transition-colors hover:text-[var(--primary)]"
                href="https://www.linkedin.com/in/rajatkhandelwal27/"
                onClick={() => logUiEvent("profile_link_clicked", { page: "project_detail_mobikwik", platform: "linkedin" })}
                rel="noreferrer noopener"
                target="_blank"
              >
                LinkedIn
              </a>
              <a
                className="rounded-xl border border-[var(--card-hover-border)] bg-[var(--icon-chip-bg)] px-4 py-2 text-sm text-[var(--text-main)] transition-colors hover:text-[var(--primary)]"
                href="https://github.com/rajatkhandelwal191"
                onClick={() => logUiEvent("profile_link_clicked", { page: "project_detail_mobikwik", platform: "github" })}
                rel="noreferrer noopener"
                target="_blank"
              >
                GitHub Profile
              </a>
            </div>
          </section>
        </main>

        <footer className="mt-auto border-t border-[var(--footer-border)] bg-[var(--footer-bg)] px-6 py-10 text-center backdrop-blur-sm">
          <p className="text-xs text-[var(--text-muted)]">{footerText}</p>
        </footer>
      </div>
    </div>
  );
}