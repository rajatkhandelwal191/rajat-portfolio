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
  { label: "Cloud Dependency", value: "0 B (100% Offline)", desc: "android.permission.INTERNET omitted" },
  { label: "Hardware Security", value: "AES-256-GCM", desc: "Android KeyStore (TEE / StrongBox)" },
  { label: "Automated Tests", value: "57 Passing", desc: "Crypto integrity, widget & route tests" },
  { label: "Backup Cryptography", value: "100K PBKDF2", desc: "PBKDF2-HMAC-SHA256 .vaultbackup" },
];

const screenshots = [
  {
    src: "/apps/vaulet/vaulet-1.webp",
    title: "Zero-Cloud Payment Card & Passbook Hub",
    caption:
      "Full lifecycle management for credit/debit cards with offline Luhn verification, BIN network detection (Visa, Mastercard, RuPay, Amex), and 3D card flips.",
  },
  {
    src: "/apps/vaulet/vaulet-2.webp",
    title: "Hardware-Encrypted Document Vault",
    caption:
      "Secure offline repository for national IDs (Aadhaar, PAN, Passport, DL) with multi-image front/back flip views and on-the-fly vector PDF compilation.",
  },
  {
    src: "/apps/vaulet/vaulet-3.webp",
    title: "Travel Tickets & Purchase Bills Manager",
    caption:
      "Dual-segmented financial tracking for flights, trains, events, and purchase bills with warranty expiration countdowns and encrypted receipts.",
  },
  {
    src: "/apps/vaulet/vaulet-4.webp",
    title: "Cross-Entity Family Member Attribution",
    caption:
      "Unified family member categorization shared across cards, documents, bills, and bank accounts for seamless household document partitioning.",
  },
  {
    src: "/apps/vaulet/vaulet-5.webp",
    title: "Military-Grade Portable Vault Backup (.vaultbackup)",
    caption:
      "Single-file encrypted vault migration bundling all entities and binary attachments, secured by 100,000-iteration PBKDF2 with atomic merge restore.",
  },
];

const techStack = [
  {
    category: "Mobile Foundation",
    items: ["Flutter 3.x", "Dart 3.x", "Kotlin", "FlutterFragmentActivity", "Gradle 8.x", "Java 17 JVM"],
  },
  {
    category: "Architecture & State",
    items: ["Feature-Driven Clean MVVM", "Reactive Repositories", "ChangeNotifier", "ListenableBuilder", "Decoupled ServiceLocator"],
  },
  {
    category: "Cryptography & Hardware Security",
    items: ["Android KeyStore (TEE)", "EncryptedSharedPreferences", "AES-256-GCM", "PBKDF2-HMAC-SHA256", "Hardware Biometrics (local_auth)"],
  },
  {
    category: "Storage & Documents",
    items: ["Streaming Chunked I/O", "Non-Volatile Sandboxed Storage", "Vector PDF Generation", "UCrop Photo Picker", "file_picker"],
  },
  {
    category: "Security Controls & Quality",
    items: ["GoRouter Guard State Machine", "Progressive Rate Limiting", "Constant-Time PIN Comparison", "Auto-Wiping Clipboard (30s)", "57 Test Suites"],
  },
];

const architecturalHighlights = [
  {
    title: "1. Zero-Cloud Architecture & Hardware KeyStore Security",
    icon: "shield_lock",
    summary:
      "Guarantees absolute privacy by completely omitting internet permissions and anchoring encryption in Android's hardware security module.",
    points: [
      "Zero Network Permission: The android.permission.INTERNET declaration is omitted from AndroidManifest.xml, making data exfiltration impossible at the OS kernel level.",
      "Hardware-Backed Platform Keystore: Utilizes flutter_secure_storage backed by Android KeyStore (TEE / StrongBox) using AES-256-GCM and RSA key pairs.",
      "Partitioned Key-Value Indexing: Scalable sub-millisecond retrieval across partitioned keys (card_vault_*, document_vault_*, ticket_vault_*, bill_vault_*).",
      "Biometric Challenge Enforcement: Enforces native Android BiometricPrompt authentication for enrollment, app unlock, and sensitive credential reveals.",
    ],
  },
  {
    title: "2. OOM-Safe Encrypted Binary Object Storage",
    icon: "lock_open",
    summary:
      "Solves Android IPC payload limits and Keystore Out-Of-Memory crashes when storing high-resolution multi-page photo scans and PDFs.",
    points: [
      "Eliminates TransactionTooLargeException: Bypasses Android KeyStore IPC size limits by storing master keys in hardware while streaming files to sandboxed disk.",
      "AES-256-GCM Chunks: Packages binary blobs into secure envelopes formatted as [12-byte nonce][16-byte MAC tag][AES-256-GCM ciphertext].",
      "Magic-Byte Sniffing: AttachmentUtils inspects file signatures (%PDF-) to stream-render both vector PDFs and raster photos without saving cleartext to disk.",
      "Sub-500ms Cold-Boot: Overrode Android 12+ dual splash artifacts and parallelized KeyStore initialization for instantaneous time-to-first-frame render.",
    ],
  },
  {
    title: "3. Declarative Security Route Guarding & Progressive Lockout",
    icon: "alarm_on",
    summary:
      "Reactive app-lifecycle security engine preventing unauthorized access and timing side-channel attacks.",
    points: [
      "GoRouter Security State Machine: Binds GoRouter.refreshListenable to VaultLockService and WidgetsBindingObserver for instant auto-locking on backgrounding.",
      "Progressive Lockout Rate Limiting: Progressively escalates delays after failed PIN entries (3s at 3 attempts, 30s at 5, 60s at 10) to neutralize brute-force attacks.",
      "Constant-Time Byte Comparison: PIN verification uses constant-time byte iteration (_constantTimeCompare) to prevent timing side-channel attacks.",
      "Self-Clearing Clipboard: SecureClipboardService monitors credential copies and programmatically wipes the system clipboard after 30 seconds with collision guards.",
    ],
  },
  {
    title: "4. Cryptographic Portable Vault Backup Engine (.vaultbackup)",
    icon: "archive",
    summary:
      "Enables military-grade encrypted vault migration across devices with zero reliance on cloud synchronization.",
    points: [
      "PBKDF2-HMAC-SHA256 Key Derivation: Stretches a 6-digit user backup PIN through 100,000 iterations with a 16-byte cryptographically secure random salt.",
      "Authenticated Encryption Envelope: Encrypts structured entity JSON and decrypted binary attachments into a single tamper-evident AES-256-GCM archive.",
      "Atomic Merge-by-ID Engine: Allows selective or full vault restoration with ID-based conflict resolution, ensuring no duplicate entries are introduced.",
      "Air-Gapped Portability: Backup files (.vaultbackup) can be transferred safely via USB, local Wi-Fi, or SD card without exposing cleartext credentials.",
    ],
  },
  {
    title: "5. Sensory Feedback & Offline FinTech Intelligence",
    icon: "credit_card",
    summary:
      "Tactile physical wallet experience with offline financial validation algorithms.",
    points: [
      "Custom 3D Matrix Transformations: Implements realistic card flipping using Transform with Matrix4.identity()..setEntry(3, 2, 0.001)..rotateY(...).",
      "Physical Wallet Card Stack: Physics-based gesture expansion with subtle haptic feedback (HapticFeedback.selectionClick()).",
      "Offline Luhn & BIN Recognition: Validates payment card checksums and automatically identifies issuing networks (Visa, Mastercard, RuPay, Amex) with zero network calls.",
      "Vector PDF Compilation: Dynamically compiles high-resolution multi-page document images into printable, shareable vector PDFs on device.",
    ],
  },
];

export default function VauletCaseStudyPage() {
  const { theme, isDark, toggleTheme } = useTheme();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const footerText = useMemo(
    () => `© ${new Date().getFullYear()} Rajat Khandelwal. Vaulet: CardVault by CloudCubit.`,
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
            onClick={() => logUiEvent("nav_clicked", { target: item.href, source: "vaulet_page" })}
            className={`group relative flex size-10 items-center justify-center rounded-full transition-all ${
              item.active
                ? "bg-emerald-500/15 text-emerald-400"
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

      <div className="layout-container relative flex min-h-screen w-full flex-col lg:pl-24">
        {/* Top Header */}
        <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link
              href="/projects"
              onClick={() => logUiEvent("back_to_projects_clicked", { source: "vaulet_header" })}
              className="theme-btn-secondary flex size-9 items-center justify-center rounded-xl"
            >
              <span className="material-symbols-outlined text-lg">arrow_back</span>
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold tracking-tight text-[var(--text-main)]">
                  Vaulet: Private Digital Vault
                </span>
                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
                  Google Play Live
                </span>
              </div>
              <p className="text-[11px] font-medium text-[var(--text-muted)]">
                Solo Creator & Lead Mobile Architect
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://play.google.com/store/apps/details?id=com.cloudcubit.vaulet&pcampaignid=web_share"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => logUiEvent("playstore_header_clicked", { app: "vaulet" })}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-emerald-500/20 hover:from-emerald-500 hover:to-teal-500 transition"
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
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                    FinTech & Privacy Utility
                  </span>
                  <span className="rounded-full border border-[var(--glass-border)] bg-[var(--surface-overlay)] px-3 py-1 text-xs font-mono text-[var(--text-muted)]">
                    com.cloudcubit.vaulet
                  </span>
                  <span className="rounded-full border border-teal-500/30 bg-teal-500/10 px-3 py-1 text-xs font-semibold text-teal-600 dark:text-teal-400">
                    True Zero-Cloud Architecture
                  </span>
                </div>

                <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[var(--text-main)] sm:text-4xl lg:text-5xl">
                  Vaulet — Private Digital Vault
                </h1>

                <p className="mt-4 text-base italic leading-relaxed text-emerald-500 dark:text-emerald-400 sm:text-lg">
                  &ldquo;A private digital vault by CloudCubit — zero cloud architecture, hardware-encrypted locally, everything stays on your phone.&rdquo;
                </p>

                <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)] sm:text-base">
                  Engineered for privacy-conscious individuals and professionals who demand absolute sovereignty over payment cards, national IDs, bank passbooks, travel tickets, and warranty receipts. Eliminates third-party cloud servers, telemetry, and external database vulnerabilities by enforcing 100% on-device hardware-backed cryptography.
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a
                    href="https://play.google.com/store/apps/details?id=com.cloudcubit.vaulet&pcampaignid=web_share"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => logUiEvent("playstore_hero_clicked", { app: "vaulet" })}
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-emerald-500/20 hover:from-emerald-500 hover:to-teal-500 transition"
                  >
                    <span className="material-symbols-outlined text-base">shop</span>
                    View on Google Play Store
                  </a>

                  <Link
                    href="/#chatbot"
                    onClick={() => logUiEvent("ask_chatbot_about_vaulet", { source: "vaulet_hero" })}
                    className="theme-btn-secondary inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold"
                  >
                    <span className="material-symbols-outlined text-base text-indigo-400">smart_toy</span>
                    Ask RajatGPT About Vaulet
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
                <div className="relative rounded-3xl border border-emerald-500/30 bg-slate-950 p-4 shadow-2xl shadow-emerald-500/20">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/apps/vaulet/logo.webp"
                    alt="Vaulet Logo"
                    className="size-36 object-contain drop-shadow-[0_0_25px_rgba(16,185,129,0.5)] sm:size-44 rounded-2xl"
                  />
                  <div className="mt-3 text-center">
                    <span className="inline-block rounded-md bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-emerald-400">
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
                <div className="mt-2 text-2xl font-black tracking-tight text-emerald-500 dark:text-emerald-400 sm:text-3xl">
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
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-500 dark:text-emerald-400">
                  User Experience & Architecture In Action
                </span>
                <h2 className="mt-1 text-2xl font-extrabold text-[var(--text-main)] sm:text-3xl">
                  Production Application Showcase
                </h2>
                <p className="mt-1 text-xs text-[var(--text-muted)]">
                  5 zero-cloud security and digital vault workflows built with Flutter & Material 3.
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
                  className="group relative cursor-pointer overflow-hidden rounded-[2.5rem] border-4 border-slate-800 bg-slate-950 p-2 shadow-2xl shadow-emerald-500/10 transition-transform hover:scale-[1.02]"
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
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
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
                    All Vault Views
                  </span>
                  <div className="mt-3 grid grid-cols-5 gap-2">
                    {screenshots.map((s, idx) => (
                      <button
                        key={s.src}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`group relative aspect-[9/16] overflow-hidden rounded-lg border-2 transition-all ${
                          activeImageIndex === idx
                            ? "border-emerald-500 shadow-lg shadow-emerald-500/30 scale-105"
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
                  className="relative max-h-[90vh] max-w-md overflow-hidden rounded-3xl border border-emerald-500/30 bg-slate-950 p-2 shadow-2xl"
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
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-500 dark:text-emerald-400">
                Core Cryptographic Blueprint
              </span>
              <h2 className="mt-1 text-2xl font-extrabold text-[var(--text-main)] sm:text-3xl">
                Deep Architectural Breakdown
              </h2>
              <p className="mt-1 text-xs text-[var(--text-muted)]">
                The technical innovations, cryptographic invariants, and zero-cloud architecture powering Vaulet.
              </p>
            </div>

            <div className="space-y-6">
              {architecturalHighlights.map((arch) => (
                <div key={arch.title} className="bento-card p-6 sm:p-8">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
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
                        <span className="mt-0.5 size-1.5 shrink-0 rounded-full bg-emerald-500 dark:bg-emerald-400" />
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
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-500 dark:text-emerald-400">
                Technology Specifications
              </span>
              <h2 className="mt-1 text-2xl font-extrabold text-[var(--text-main)] sm:text-3xl">
                Cryptographic & Flutter Ecosystem Stack
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {techStack.map((group) => (
                <div
                  key={group.category}
                  className="rounded-2xl border border-[var(--glass-border)] bg-[var(--surface-overlay)] p-5"
                >
                  <h4 className="font-semibold text-sm text-[var(--text-main)] flex items-center gap-2">
                    <span className="size-2 rounded-full bg-emerald-500" />
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
              <span className="material-symbols-outlined text-4xl text-emerald-500 dark:text-emerald-400">
                lock
              </span>
              <h3 className="mt-2 text-2xl font-extrabold text-[var(--text-main)] sm:text-3xl">
                Experience Vaulet live on Android
              </h3>
              <p className="mt-2 text-sm text-[var(--text-muted)]">
                Download Vaulet directly from the Google Play Store or discuss cryptographic vaults, offline PBKDF2 backups, and Flutter architecture with RajatGPT.
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="https://play.google.com/store/apps/details?id=com.cloudcubit.vaulet&pcampaignid=web_share"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => logUiEvent("playstore_cta_clicked", { app: "vaulet" })}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-3 text-xs font-bold text-white shadow-lg shadow-emerald-500/20 hover:from-emerald-500 hover:to-teal-500 transition"
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
