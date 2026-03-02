"use client";

import { motion } from "framer-motion";

type ChatbotWindowProps = {
  name: string;
  isDark: boolean;
};

export default function ChatbotWindow({ name, isDark }: ChatbotWindowProps) {
  const prompts = ["Who is Rajat?", "What is your tech stack?", "Are you available for hire?"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.4 }}
      className="mx-auto w-full max-w-3xl"
    >
      <div className="mb-8 flex items-center justify-center gap-3">
        <div className="size-2 animate-pulse rounded-full bg-[var(--primary)] shadow-[0_0_16px_var(--primary-glow)]" />
        <h2 className="text-center text-2xl font-bold tracking-tight text-[var(--text-main)]">Ask {name}GPT</h2>
      </div>

      <div className="portfolio-glass-card relative mb-6 min-h-[240px] overflow-hidden rounded-[1.75rem] p-6 lg:p-8">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[var(--primary-soft)] to-transparent" />

        <div className="relative z-10 flex flex-col gap-3">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--primary)]">Suggested Prompts</p>
          <div className="flex flex-wrap gap-2">
            {prompts.map((prompt) => (
              <button
                key={prompt}
                className="rounded-full border border-[var(--prompt-border)] bg-[var(--prompt-bg)] px-5 py-2.5 text-sm text-[var(--text-muted)] transition-all hover:border-[var(--primary)] hover:text-[var(--primary)]"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        <div className="relative z-10 flex flex-1 items-center justify-center py-8">
          <div className="flex flex-col items-center gap-2 opacity-70">
            <span className="material-symbols-outlined animate-pulse text-4xl text-[var(--primary)]">smart_toy</span>
            <p className="text-center text-sm italic text-[var(--text-muted)]">{name}GPT is ready to answer your questions...</p>
          </div>
        </div>
      </div>

      <label className="group relative block">
        <div className="absolute inset-0 rounded-2xl bg-[var(--input-glow)] blur-md transition-colors duration-300 group-focus-within:bg-[var(--input-glow-strong)]" />
        <input
          className="portfolio-glass relative w-full rounded-2xl border border-[var(--input-border)] bg-[var(--input-bg)] px-6 py-5 pr-20 text-lg text-[var(--text-main)] placeholder:text-[var(--text-placeholder)] focus:outline-none focus:ring-2 focus:ring-[var(--input-focus)]"
          placeholder="Ask me anything about my work..."
          type="text"
        />
        <button
          className={`absolute right-3 top-1/2 z-10 flex size-12 -translate-y-1/2 items-center justify-center rounded-xl bg-[var(--primary)] text-white shadow-lg transition-all hover:scale-105 ${
            isDark ? "shadow-[0_0_18px_var(--primary-glow)]" : "shadow-[0_8px_20px_var(--primary-glow)]"
          }`}
        >
          <span className="material-symbols-outlined">send</span>
        </button>
      </label>
    </motion.div>
  );
}
