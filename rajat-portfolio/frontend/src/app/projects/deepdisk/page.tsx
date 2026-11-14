"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { logUiEvent } from "../../../lib/frontendLogger";
import { useTheme } from "../../../context/ThemeContext";

const navItems = [
  { href: "/", icon: "home", label: "Home" },
  { href: "/about", icon: "person", label: "About" },
  { href: "/projects", icon: "code_blocks", label: "Projects", active: true },
  { href: "/experience", icon: "history_edu", label: "Experience" },
  { href: "/resume", icon: "description", label: "Resume" },
  { href: "/contact", icon: "alternate_email", label: "Contact" },
  { href: "/#chatbot", icon: "smart_toy", label: "RajatGPT" },
];

const keyMetrics = [
  { label: "App Bundle Size", value: "5.71 MB", desc: "88% R8 code & resource minification" },
  { label: "Network Telemetry", value: "0 B (100% Offline)", desc: "android.permission.INTERNET undeclared" },
  { label: "Automated Unit Tests", value: "210+ Passing", desc: "Turbine flow testing & Room DB tests" },
  { label: "Memory Architecture", value: "16 KB Compliant", desc: "Native alignment for Android 15+ kernels" },
];

const screenshots = [
  {
    src: "/apps/deepdisk/deepdisk-1.webp",
    title: "Forensic Storage Dashboard",
    caption: "Real-time storage reconciliation contrasting raw filesystem blocks against Scoped Storage indexes.",
  },
  {
    src: "/apps/deepdisk/deepdisk-2.webp",
    title: "Granular Category Breakdown",
    caption: "Deep inspection across MediaStore collections, APK binaries, and private application caches.",
  },
  {
    src: "/apps/deepdisk/deepdisk-3.webp",
    title: "WhatsApp & Social Bloat Audit",
    caption: "Isolates hidden sent media, duplicated voice notes, and video attachments consuming gigabytes.",
  },
  {
    src: "/apps/deepdisk/deepdisk-4.webp",
    title: "Dormant Downloads & Archives",
    caption: "Identifies stale installers, duplicate ISO/ZIP files, and unused documents with age metadata.",
  },
  {
    src: "/apps/deepdisk/deepdisk-5.webp",
    title: "3-Tier Cryptographic Deduplication",
    caption: "Size filtering → 4KB header hash → streaming SHA-256 verification with zero UI jank.",
  },
  {
    src: "/apps/deepdisk/deepdisk-6.webp",
    title: "Risk-Governed Cleanup Engine",
    caption: "Strict SAFE (cache), REVIEW (duplicates), and PROTECTED tiers with Android 30-day trash intent fallback.",
  },
  {
    src: "/apps/deepdisk/deepdisk-7.webp",
    title: "Snapshot Diffing & Storage Trend",
    caption: "Tracks byte-level storage fluctuations over time using local SQLite WAL snapshots.",
  },
  {
    src: "/apps/deepdisk/deepdisk-8.webp",
    title: "Sanitized FileProvider Export",
    caption: "Generates cryptographic diagnostics and storage audit reports without leaking PII or raw filenames.",
  },
];

const techStack = [
  {
    category: "Mobile Foundation",
    items: ["Native Android", "Kotlin 2.4.10", "Jetpack Compose", "Compose Material 3", "AGP 9.4.1", "Gradle 9.6.0"],
  },
  {
    category: "Architecture & State",
    items: ["Unidirectional Data Flow (UDF)", "MVVM", "StateFlow / SharedFlow", "Sealed UiEvents", "Dagger Hilt 2.60.1"],
  },
  {
    category: "OS Subsystems & Storage",
    items: ["StorageManager", "StorageStatsManager", "MediaStore API", "Room Database 2.8.5 (WAL)", "Jetpack DataStore 1.1.7"],
  },
  {
    category: "Concurrency & Background",
    items: ["Kotlinx Coroutines 1.10.2", "Cooperative Cancellation (yield)", "AndroidX WorkManager 2.12.0", "POST_NOTIFICATIONS"],
  },
  {
    category: "Optimization & Quality",
    items: ["R8 / ProGuard Minification", "16KB Page Size Alignment", "Turbine 1.2.0 Flow Testing", "Espresso UI", "FileProvider"],
  },
];

const architecturalHighlights = [
  {
    title: "1. Multi-Source Storage Reconciliation Engine",
    icon: "balance",
    summary:
      "Overcomes Android Scoped Storage fragmentation by mathematically reconciling disparate OS metrics without double-counting bytes.",
    points: [
      "Integrates StorageManager for hardware volume geometry, total allocated blocks, and unallocated sector metrics.",
      "Queries StorageStatsManager across isolated app packages to determine exact application code, persistent user data, and cache sectors.",
      "Indexes MediaStore for cross-app photos, videos, audio, and documents while traversing permitted Scoped Storage trees.",
      "Applies set-theoretic reconciliation to isolate known versus unknown allocations, transparently attributing 'System & Protected' storage rather than displaying misleading 0 B values.",
    ],
  },
  {
    title: "2. Cryptographic 3-Tier Duplicate Identification",
    icon: "fingerprint",
    summary:
      "High-throughput deduplication pipeline capable of auditing 100,000+ files in seconds without UI frame drops.",
    points: [
      "Tier 1 (Size Partitioning): Groups candidate files by byte size; unique file sizes immediately bypass costly I/O operations.",
      "Tier 2 (Sparse Header Hashing): Reads only the initial 4KB block of matching-size candidates to eliminate 90%+ false positives with minimal disk read amplification.",
      "Tier 3 (Streaming SHA-256): Performs full streaming cryptographic verification on remaining candidates with in-flight digest calculation.",
      "Cooperative Coroutine Scheduling: Injects coroutine yield() checkpoints during disk I/O to guarantee butter-smooth 60/120 FPS UI scrolling on low-end chipsets.",
    ],
  },
  {
    title: "3. Three-Tier Risk-Governed Cleanup Engine",
    icon: "security",
    summary:
      "Safety-first deletion pipeline that eliminates accidental user data loss through transparent classification and OS trash fallback.",
    points: [
      "SAFE Tier: Unneeded cache artifacts, thumbnail indexes, and temporary log directories that are completely safe to purge.",
      "REVIEW Tier: Duplicate photos, dormant APK downloads, and large videos requiring explicit user checkbox verification.",
      "PROTECTED Tier: System volumes, work-profile assets, and user-starred files that are permanently locked against accidental deletion.",
      "Scoped Storage Trash Integration: Employs MediaStore createTrashRequest to move items to system trash (with 30-day recovery) whenever hard deletion is unsafe.",
    ],
  },
  {
    title: "4. Google Play Production & Android 14 WorkManager Migration",
    icon: "cloud_sync",
    summary:
      "Engineered to satisfy strict Google Play Console policies and Android 14+ background execution constraints.",
    points: [
      "Migrated long-running storage audits from legacy Foreground Services to AndroidX WorkManager 2.12.0 chained jobs, eliminating battery drain and background ANRs.",
      "Adapted to Android 13/14 POST_NOTIFICATIONS runtime permissions, providing polite inline progress notifications without unsolicited alerts.",
      "Aggressive R8 Minification: Shrunk app bundle size to 5.71 MB (an 88% reduction) with zero runtime reflection issues.",
      "16KB Page Size Compatibility: Configured native memory and JNI boundary alignments to guarantee seamless compatibility with Android 15 kernels.",
    ],
  },
  {
    title: "5. 100% Offline Privacy Guarantee & Local Data Persistence",
    icon: "vpn_key_off",
    summary:
      "Completely standalone, local-first utility with zero telemetry, zero trackers, and zero remote server dependencies.",
    points: [
      "Zero Network Declared: The android.permission.INTERNET manifest declaration is omitted entirely, guaranteeing that not a single byte of user metadata ever leaves the device.",
      "Room Database 2.8.5 with Write-Ahead Logging (WAL) persists historical storage snapshots for trend analysis and comparative scans.",
      "Jetpack DataStore Preferences securely saves custom scan rules, ignore lists, and user preferences with type-safe Coroutine flows.",
      "Sanitized FileProvider Export: Diagnostic reports sanitize absolute directory paths and user identifiers before export, maintaining forensic integrity without compromising privacy.",
    ],
  },
];

export default function DeepDiskCaseStudyPage() {
  const { theme, isDark, toggleTheme } = useTheme();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const footerText = useMemo(
    () => `© ${new Date().getFullYear()} Rajat Khandelwal. DeepDisk: Storage Analyzer.`,
    [],
  );

  return (
    <div
      className={`portfolio-shell relative min-h-screen w-full overflow-x-hidden ${
        isDark ? "dark-pattern" : "light-pattern"
      }`}
      data-theme={theme}
    >
      {/* Floating Left Navigation */}
      <aside className="nav-float fixed left-6 top-1/2 z-50 hidden -translate-y-1/2 flex-col items-center gap-6 rounded-full border border-[var(--nav-border)] px-3 py-6 lg:flex">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => logUiEvent("nav_clicked", { target: item.href, source: "deepdisk_page" })}
            className={`group relative flex size-10 items-center justify-center rounded-full transition-all ${
              item.active
                ? "bg-sky-500/15 text-sky-400"
                : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
            }`}
          >
            <span className="material-symbols-outlined text-xl">{item.icon}</span>
            <span className="absolute left-14 hidden whitespace-nowrap rounded-md bg-[var(--surface-overlay)] px-2 py-1 text-xs font-semibold text-[var(--text-main)] shadow-lg group-hover:block">
              {item.label}
            </span>
          </Link>
        ))}
      </aside>

      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Top Header */}
        <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link
              href="/projects"
              onClick={() => logUiEvent("back_to_projects_clicked", { source: "deepdisk_header" })}
              className="theme-btn-secondary flex size-9 items-center justify-center rounded-xl"
            >
              <span className="material-symbols-outlined text-lg">arrow_back</span>
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold tracking-tight text-[var(--text-main)]">
                  DeepDisk: Storage Analyzer
                </span>
                <span className="rounded-full border border-sky-500/30 bg-sky-500/10 px-2 py-0.5 text-[10px] font-semibold text-sky-400">
                  Google Play Live
                </span>
              </div>
              <p className="text-[11px] font-medium text-[var(--text-muted)]">
                Lead Mobile Architect & Solo Android Engineer
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://play.google.com/store/apps/details?id=com.cloudcubit.deepdisk&pcampaignid=web_share"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => logUiEvent("playstore_header_clicked", { app: "deepdisk" })}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-600 to-cyan-600 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-sky-500/20 hover:from-sky-500 hover:to-cyan-500 transition"
            >
              <span className="material-symbols-outlined text-sm">shop</span>
              Google Play Store
            </a>

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

        {/* Main Content */}
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
          {/* Hero Banner */}
          <section className="bento-card mb-12 p-8 sm:p-10">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-3xl">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-600 dark:text-sky-400">
                    <span className="size-2 rounded-full bg-sky-500 animate-pulse" />
                    Production Android Utility
                  </span>
                  <span className="rounded-full border border-[var(--glass-border)] bg-[var(--surface-overlay)] px-3 py-1 text-xs font-mono text-[var(--text-muted)]">
                    com.cloudcubit.deepdisk
                  </span>
                  <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    100% Offline & Private
                  </span>
                </div>

                <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[var(--text-main)] sm:text-4xl lg:text-5xl">
                  DeepDisk — Storage Intelligence for Android
                </h1>

                <p className="mt-4 text-base italic leading-relaxed text-sky-500 dark:text-sky-400 sm:text-lg">
                  &ldquo;Find where your storage actually went.&rdquo;
                </p>

                <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)] sm:text-base">
                  Forensic-grade on-device storage intelligence, multi-source reconciliation, and transparent cleanup for Android. Designed, engineered, and shipped solo from initial architecture to Google Play production deployment. Solves deceptive &ldquo;one-tap cleaner&rdquo; gimmicks by providing mathematically honest accounting across Scoped Storage, MediaStore, and private application sectors.
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a
                    href="https://play.google.com/store/apps/details?id=com.cloudcubit.deepdisk&pcampaignid=web_share"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => logUiEvent("playstore_hero_clicked", { app: "deepdisk" })}
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-600 to-cyan-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-sky-500/20 hover:from-sky-500 hover:to-cyan-500 transition"
                  >
                    <span className="material-symbols-outlined text-base">shop</span>
                    View on Google Play Store
                  </a>

                  <Link
                    href="/#chatbot"
                    onClick={() => logUiEvent("ask_chatbot_about_deepdisk", { source: "deepdisk_hero" })}
                    className="theme-btn-secondary inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold"
                  >
                    <span className="material-symbols-outlined text-base text-indigo-400">smart_toy</span>
                    Ask RajatGPT About DeepDisk
                  </Link>

                  <Link
                    href="/projects"
                    className="theme-btn-secondary inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold"
                  >
                    <span className="material-symbols-outlined text-base">apps</span>
                    All Projects
                  </Link>
                </div>
              </div>

              {/* App Icon Visual */}
              <div className="flex shrink-0 items-center justify-center">
                <div className="relative rounded-3xl border border-sky-500/30 bg-slate-950 p-4 shadow-2xl shadow-sky-500/20">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/apps/deepdisk/logo.webp"
                    alt="DeepDisk Logo"
                    className="size-36 object-contain drop-shadow-[0_0_25px_rgba(56,189,248,0.5)] sm:size-44 rounded-2xl"
                  />
                  <div className="mt-3 text-center">
                    <span className="inline-block rounded-md bg-sky-500/10 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-sky-400">
                      v1.0 Production
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Key Metrics Strip */}
          <section className="mb-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {keyMetrics.map((metric) => (
              <div key={metric.label} className="bento-card p-5">
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                  {metric.label}
                </span>
                <div className="mt-2 text-2xl font-black tracking-tight text-sky-500 dark:text-sky-400 sm:text-3xl">
                  {metric.value}
                </div>
                <p className="mt-1 text-xs text-[var(--text-muted)]">{metric.desc}</p>
              </div>
            ))}
          </section>

          {/* Interactive Screenshot Gallery & Carousel */}
          <section className="bento-card mb-16 p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[var(--glass-border)] pb-5">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-sky-500 dark:text-sky-400">
                  User Experience & Architecture In Action
                </span>
                <h2 className="mt-1 text-2xl font-extrabold text-[var(--text-main)] sm:text-3xl">
                  Production Application Showcase
                </h2>
                <p className="mt-1 text-xs text-[var(--text-muted)]">
                  8 forensic diagnostics workflows built with Jetpack Compose & Material 3.
                </p>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setActiveImageIndex((prev) => (prev === 0 ? screenshots.length - 1 : prev - 1))
                  }
                  className="theme-btn-secondary flex size-9 items-center justify-center rounded-xl"
                  aria-label="Previous screenshot"
                >
                  <span className="material-symbols-outlined text-base">chevron_left</span>
                </button>
                <span className="font-mono text-xs font-semibold text-[var(--text-muted)] px-2">
                  {activeImageIndex + 1} / {screenshots.length}
                </span>
                <button
                  onClick={() =>
                    setActiveImageIndex((prev) => (prev === screenshots.length - 1 ? 0 : prev + 1))
                  }
                  className="theme-btn-secondary flex size-9 items-center justify-center rounded-xl"
                  aria-label="Next screenshot"
                >
                  <span className="material-symbols-outlined text-base">chevron_right</span>
                </button>
              </div>
            </div>

            {/* Active Feature Spotlight */}
            <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
              {/* Phone Frame Mockup */}
              <div className="lg:col-span-5 flex justify-center">
                <div
                  onClick={() => setModalOpen(true)}
                  className="group relative cursor-pointer overflow-hidden rounded-[2.5rem] border-4 border-slate-800 bg-slate-950 p-2 shadow-2xl shadow-sky-500/10 transition-transform hover:scale-[1.02]"
                >
                  <div className="relative aspect-[9/19.5] w-[260px] sm:w-[290px] overflow-hidden rounded-[2rem] bg-black">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={screenshots[activeImageIndex].src}
                      alt={screenshots[activeImageIndex].title}
                      className="h-full w-full object-cover transition-opacity duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                      <span className="inline-flex items-center gap-1 rounded-full bg-black/80 px-3 py-1 text-xs font-semibold text-white">
                        <span className="material-symbols-outlined text-xs">zoom_in</span>
                        Click to enlarge
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature Explanation & Caption */}
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-400">
                  <span className="material-symbols-outlined text-sm">visibility</span>
                  Screen {activeImageIndex + 1} of {screenshots.length}
                </div>

                <h3 className="text-2xl font-bold text-[var(--text-main)] sm:text-3xl">
                  {screenshots[activeImageIndex].title}
                </h3>

                <p className="text-sm sm:text-base leading-relaxed text-[var(--text-muted)]">
                  {screenshots[activeImageIndex].caption}
                </p>

                {/* Thumbnails Rail */}
                <div className="pt-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                    All Application Views
                  </span>
                  <div className="mt-3 grid grid-cols-4 sm:grid-cols-8 gap-2">
                    {screenshots.map((s, idx) => (
                      <button
                        key={s.src}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`group relative aspect-[9/16] overflow-hidden rounded-lg border-2 transition-all ${
                          activeImageIndex === idx
                            ? "border-sky-500 shadow-lg shadow-sky-500/30 scale-105"
                            : "border-transparent opacity-60 hover:opacity-100"
                        }`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={s.src}
                          alt={s.title}
                          className="h-full w-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Full Screen Image Modal */}
          <AnimatePresence>
            {modalOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setModalOpen(false)}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
              >
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="relative max-h-[90vh] max-w-md overflow-hidden rounded-3xl border border-sky-500/30 bg-slate-950 p-2 shadow-2xl"
                >
                  <button
                    onClick={() => setModalOpen(false)}
                    className="absolute right-4 top-4 z-10 flex size-9 items-center justify-center rounded-full bg-black/70 text-white hover:bg-black"
                  >
                    <span className="material-symbols-outlined text-lg">close</span>
                  </button>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={screenshots[activeImageIndex].src}
                    alt={screenshots[activeImageIndex].title}
                    className="max-h-[82vh] w-auto rounded-2xl object-contain mx-auto"
                  />
                  <div className="p-3 text-center">
                    <p className="font-semibold text-white text-sm">
                      {screenshots[activeImageIndex].title}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      {screenshots[activeImageIndex].caption}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Technical Architecture Breakdown */}
          <section className="mb-16">
            <div className="mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-500 dark:text-sky-400">
                Core Engineering Blueprint
              </span>
              <h2 className="mt-1 text-2xl font-extrabold text-[var(--text-main)] sm:text-3xl">
                Deep Architectural Breakdown
              </h2>
              <p className="mt-1 text-xs text-[var(--text-muted)]">
                The technical innovations, OS subsystem interactions, and optimization decisions behind DeepDisk.
              </p>
            </div>

            <div className="space-y-6">
              {architecturalHighlights.map((arch) => (
                <div key={arch.title} className="bento-card p-6 sm:p-8">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-sky-500/15 text-sky-600 dark:text-sky-400">
                      <span className="material-symbols-outlined">{arch.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[var(--text-main)] sm:text-xl">
                        {arch.title}
                      </h3>
                      <p className="text-xs text-[var(--text-muted)]">{arch.summary}</p>
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {arch.points.map((pt, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2.5 rounded-xl border border-[var(--glass-border)] bg-[var(--surface-overlay)] p-3.5 text-xs text-[var(--text-muted)]"
                      >
                        <span className="mt-0.5 size-1.5 shrink-0 rounded-full bg-sky-500 dark:bg-sky-400" />
                        <span className="leading-relaxed">{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Complete Technology Matrix */}
          <section className="bento-card mb-16 p-6 sm:p-8">
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-500 dark:text-sky-400">
                Technology Specifications
              </span>
              <h2 className="mt-1 text-2xl font-extrabold text-[var(--text-main)] sm:text-3xl">
                Android Ecosystem Stack
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {techStack.map((group) => (
                <div
                  key={group.category}
                  className="rounded-2xl border border-[var(--glass-border)] bg-[var(--surface-overlay)] p-5"
                >
                  <h4 className="font-semibold text-sm text-[var(--text-main)] flex items-center gap-2">
                    <span className="size-2 rounded-full bg-sky-500" />
                    {group.category}
                  </h4>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="theme-chip rounded-md px-2.5 py-1 text-xs font-medium"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Call to Action Footer */}
          <section className="bento-card p-8 sm:p-10 text-center">
            <div className="mx-auto max-w-2xl">
              <span className="material-symbols-outlined text-4xl text-sky-500 dark:text-sky-400">
                rocket_launch
              </span>
              <h3 className="mt-2 text-2xl font-extrabold text-[var(--text-main)] sm:text-3xl">
                Ready to explore DeepDisk live?
              </h3>
              <p className="mt-2 text-sm text-[var(--text-muted)]">
                Install DeepDisk directly from the Google Play Store or discuss the architecture, Scoped Storage nuances, and coroutine optimizations with RajatGPT.
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="https://play.google.com/store/apps/details?id=com.cloudcubit.deepdisk&pcampaignid=web_share"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => logUiEvent("playstore_cta_clicked", { app: "deepdisk" })}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-600 to-cyan-600 px-6 py-3 text-xs font-bold text-white shadow-lg shadow-sky-500/20 hover:from-sky-500 hover:to-cyan-500 transition"
                >
                  <span className="material-symbols-outlined text-base">shop</span>
                  Download on Google Play
                </a>

                <Link
                  href="/projects"
                  className="theme-btn-secondary inline-flex items-center gap-2 rounded-xl px-5 py-3 text-xs font-semibold"
                >
                  <span className="material-symbols-outlined text-base">arrow_back</span>
                  Explore Other Projects
                </Link>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="mt-auto border-t border-[var(--glass-border)] py-6 text-center text-xs text-[var(--text-muted)]">
          {footerText}
        </footer>
      </div>
    </div>
  );
}
