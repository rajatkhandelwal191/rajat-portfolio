"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

type Theme = "light" | "dark";

const navItems = [
  { href: "/projects", icon: "code_blocks", label: "Projects" },
  { href: "/about", icon: "person", label: "About" },
  { href: "/", icon: "home", label: "Home" },
  { href: "/experience", icon: "history_edu", label: "Experience" },
  { href: "/contact", icon: "alternate_email", label: "Contact", active: true },
];

const timelineDots = [false, false, false, false, true];

export default function ContactPage() {
  const [theme, setTheme] = useState<Theme>("dark");
  const isDark = theme === "dark";

  const footerText = useMemo(
    () => `(c) ${new Date().getFullYear()} Rajat Khandelwal. Contact page.`,
    [],
  );

  useEffect(() => {
    document.title = "Contact Page | Rajat Portfolio";
  }, []);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div
      className={`portfolio-shell relative flex min-h-screen flex-col overflow-x-hidden ${
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

      <div className="fixed right-8 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex">
        {timelineDots.map((active, index) => (
          <div
            className={`rounded-full transition-all ${
              active
                ? "h-4 w-4 bg-[var(--cream-active)] shadow-[0_0_10px_rgba(255,218,185,0.5)]"
                : "h-2 w-2 bg-slate-600"
            }`}
            key={`${active}-${index}`}
          />
        ))}
      </div>

      <main className="z-10 mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center px-6 py-12">
        <motion.header
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="font-display mb-2 text-6xl tracking-tight text-[var(--text-main)] md:text-7xl">
            Rajat Khandelwal
          </h1>
          <p className="text-lg font-light tracking-wide text-[var(--text-muted)]">
            Software <span className="mx-1">|</span> Engineer
          </p>
        </motion.header>

        <motion.section
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl"
          initial={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.45, delay: 0.08 }}
        >
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-display text-3xl text-[var(--text-main)]">Get in Touch</h2>
            <button
              className="portfolio-glass flex size-10 items-center justify-center rounded-xl border border-[var(--glass-border)] text-[var(--primary)] transition-all hover:bg-[var(--icon-chip-bg)]"
              onClick={() => setTheme(isDark ? "light" : "dark")}
              type="button"
            >
              <span className="material-symbols-outlined">{isDark ? "light_mode" : "dark_mode"}</span>
            </button>
          </div>

          <form className="space-y-6" method="POST" onSubmit={onSubmit}>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[var(--text-muted)]" htmlFor="name">
                Name
              </label>
              <input
                className="block w-full rounded-lg border border-white/10 bg-[var(--input-bg)] px-4 py-3 text-[var(--text-main)] placeholder:text-[var(--text-placeholder)] focus:border-[var(--cream-active)] focus:ring-1 focus:ring-[var(--cream-active)]"
                id="name"
                name="name"
                placeholder="Jon Snow"
                required
                type="text"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-[var(--text-muted)]" htmlFor="email">
                Email
              </label>
              <input
                className="block w-full rounded-lg border border-white/10 bg-[var(--input-bg)] px-4 py-3 text-[var(--text-main)] placeholder:text-[var(--text-placeholder)] focus:border-[var(--cream-active)] focus:ring-1 focus:ring-[var(--cream-active)]"
                id="email"
                name="email"
                placeholder="jon.snow@stark.com"
                required
                type="email"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-[var(--text-muted)]" htmlFor="company">
                Company
              </label>
              <input
                className="block w-full rounded-lg border border-white/10 bg-[var(--input-bg)] px-4 py-3 text-[var(--text-main)] placeholder:text-[var(--text-placeholder)] focus:border-[var(--cream-active)] focus:ring-1 focus:ring-[var(--cream-active)]"
                id="company"
                name="company"
                placeholder="Night's Watch Inc."
                type="text"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-[var(--text-muted)]" htmlFor="message">
                Message
              </label>
              <textarea
                className="block w-full resize-none rounded-lg border border-white/10 bg-[var(--input-bg)] px-4 py-3 text-[var(--text-main)] placeholder:text-[var(--text-placeholder)] focus:border-[var(--cream-active)] focus:ring-1 focus:ring-[var(--cream-active)]"
                id="message"
                name="message"
                placeholder="Winter is coming..."
                required
                rows={4}
              />
            </div>

            <button
              className="group mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--cream-active)] px-6 py-3 font-semibold text-[var(--cream-text)] shadow-lg shadow-[var(--primary-glow)] transition-all hover:brightness-105 active:scale-[0.99]"
              type="submit"
            >
              <span className="material-symbols-outlined text-xl transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                send
              </span>
            </button>
          </form>

          <div className="mt-12 flex justify-center gap-6">
            <a className="text-[var(--text-main)] transition-colors duration-300 hover:text-[var(--cream-active)]" href="#">
              <svg aria-hidden="true" className="h-8 w-8 fill-current" viewBox="0 0 24 24">
                <path
                  clipRule="evenodd"
                  d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                  fillRule="evenodd"
                />
              </svg>
              <span className="sr-only">LinkedIn</span>
            </a>
            <a className="text-[var(--text-main)] transition-colors duration-300 hover:text-[var(--cream-active)]" href="#">
              <svg aria-hidden="true" className="h-8 w-8 fill-current" viewBox="0 0 24 24">
                <path
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  fillRule="evenodd"
                />
              </svg>
              <span className="sr-only">GitHub</span>
            </a>
          </div>
        </motion.section>
      </main>

      <div className="fixed bottom-0 z-40 h-1 w-full bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-pink-500/50" />
      <footer className="border-t border-[var(--footer-border)] bg-[var(--footer-bg)] px-6 py-6 text-center backdrop-blur-sm">
        <p className="text-xs text-[var(--text-muted)]">{footerText}</p>
      </footer>
    </div>
  );
}

