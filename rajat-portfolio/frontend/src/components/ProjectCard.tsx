"use client";

import { motion } from "framer-motion";

type ProjectCardProps = {
  href: string;
  icon: string;
  title: string;
  description: string;
  cta: string;
  index: number;
};

export default function ProjectCard({ href, icon, title, description, cta, index }: ProjectCardProps) {
  return (
    <motion.a
      href={href}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.12 * index }}
      whileHover={{ y: -8 }}
      className="portfolio-glass-card group relative flex h-72 flex-col justify-between overflow-hidden rounded-[1.75rem] p-8 lg:h-80 lg:p-10"
    >
      <div className="absolute -right-12 -top-12 size-48 rounded-full bg-[var(--primary-soft)] blur-3xl transition-colors duration-300 group-hover:bg-[var(--primary-soft-strong)]" />

      <div className="relative z-10">
        <div className="mb-6 inline-flex rounded-2xl bg-[var(--icon-chip-bg)] p-4 text-[var(--primary)] shadow-sm transition-transform duration-300 group-hover:scale-110">
          <span className="material-symbols-outlined text-4xl lg:text-5xl">{icon}</span>
        </div>
        <h3 className="text-3xl font-bold tracking-tight text-[var(--text-main)] transition-colors group-hover:text-[var(--primary)] lg:text-4xl">
          {title}
        </h3>
        <p className="mt-2 text-base text-[var(--text-muted)] transition-colors group-hover:text-[var(--text-main)] lg:text-lg">
          {description}
        </p>
      </div>

      <div className="mt-4 flex items-center font-bold tracking-wide text-[var(--primary)] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 translate-y-4">
        {cta}
        <span className="material-symbols-outlined ml-2 text-sm">arrow_forward</span>
      </div>
    </motion.a>
  );
}
