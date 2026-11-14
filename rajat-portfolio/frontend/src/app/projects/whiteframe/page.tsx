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
  { label: "GPU Export Latency", value: "<100 ms", desc: "dart:ui Canvas vs ~15s CPU encoding" },
  { label: "Canvas Viewport", value: "60 FPS Fluid", desc: "Matrix4 real-time scale transforms" },
  { label: "Social Presets", value: "1:1 & 4:5", desc: "Zero-crop standard Instagram formats" },
  { label: "Storage Architecture", value: "Dual-Layer", desc: "gal MediaStore + bundles.json manifest" },
];

const screenshots = [
  {
    src: "/apps/whiteframe/whiteframe-1.webp",
    title: "Multi-Ratio Canvas Studio & Real-Time Viewport",
    caption:
      "Interactive photo canvas supporting 1:1 Square (1080x1080) and 4:5 Portrait (1080x1350) Instagram aspect presets with fluid Matrix4 zoom and pan.",
  },
  {
    src: "/apps/whiteframe/whiteframe-2.webp",
    title: "Branded Watermark & Glassmorphic Attribution",
    caption:
      "Custom brand logo compositor and creator @handle pill badges rendered at native camera resolution with dynamic opacity controls.",
  },
];

const techStack = [
  {
    category: "Mobile Foundation",
    items: ["Flutter 3.x", "Dart ^3.5.0", "Kotlin JVM 17", "Android Gradle Plugin 8.x", "Skia / Impeller"],
  },
  {
    category: "GPU Graphics & Canvas",
    items: ["dart:ui Pipeline", "PictureRecorder", "instantiateImageCodec", "Matrix4 Transforms", "TextPainter", "ui.RRect Compositor"],
  },
  {
    category: "Cloud Backend & Auth",
    items: ["Supabase BaaS", "supabase_flutter 2.8", "Google Identity Services", "OAuth 2.0 (signInWithIdToken)", "StreamBuilder<AuthState>"],
  },
  {
    category: "Storage & Persistence",
    items: ["gal MediaStore Injection", "Android Scoped Storage", "Sandboxed bundles.json", "path_provider", "image_picker 1.2"],
  },
  {
    category: "Quality & Delivery",
    items: ["Feature-First Architecture", "Structured AppLogger", "runZonedGuarded Boundaries", "Google Play Production", "ProGuard / R8"],
  },
];

const architecturalHighlights = [
  {
    title: "1. Sub-Second GPU-Accelerated Rendering Engine",
    icon: "speed",
    summary:
      "Replaced CPU-bound pixel processing with Flutter's low-level GPU dart:ui Canvas pipeline, reducing export latency by >95%.",
    points: [
      "Eliminates Thread Blocking: Pure Dart image encoding (image package) froze UI threads or incurred heavy background isolate serialization when processing 12–48MP mobile photos.",
      "Direct Skia/Impeller Execution: Migrated decoding and drawing to dart:ui (instantiateImageCodec, PictureRecorder, Canvas, drawImageRect), offloading rasterization directly to the GPU.",
      "Sub-100ms Turnaround: Batches of 10+ high-resolution photos export in seconds rather than minutes with near-zero memory pressure.",
      "Native-Resolution Output: Exports pixel-perfect PNG assets preserving full dynamic range and sharpness without compression artifacts.",
    ],
  },
  {
    title: "2. Zero-Latency Real-Time Canvas Transformations",
    icon: "aspect_ratio",
    summary:
      "Decouples UI interaction from bitmap rasterization to guarantee butter-smooth 60 FPS viewport manipulation.",
    points: [
      "Matrix4 Mathematical Transforms: Applies Matrix4.diagonal3Values scaling in real time during pinch, drag, and slider adjustments.",
      "Deferred GPU Rasterization: Heavy image decoding is deferred entirely until final user export confirmation.",
      "Independent Per-Axis Scaling: Supports uniform zoom alongside independent horizontal and vertical stretching for precision fit.",
      "Standard Social Presets: Immediate 1-tap switching between 1:1 Square (1080x1080) and 4:5 Portrait (1080x1350) aspect formats.",
    ],
  },
  {
    title: "3. Branded Watermark & Glassmorphic Overlay Subsystem",
    icon: "branding_watermark",
    summary:
      "Custom in-canvas graphics compositor embedding high-fidelity attribution badges into exported assets.",
    points: [
      "Frosted Glass Badging: Renders dynamic rounded-pill badges using native ui.RRect graphics composition.",
      "Creator Typography: Uses TextPainter to cleanly render social media handles (@creator) with customizable font pairing (Inter & Playfair Display).",
      "Brand Logo Integration: Transparently blends custom brand marks and transparent PNG logos into canvas corners at exact pixel coordinates.",
      "Anti-Theft Attribution: Ensures shared social media posts retain creator identity without compromising visual aesthetics.",
    ],
  },
  {
    title: "4. Dual-Layer Storage & Bundle Re-Hydration",
    icon: "layers",
    summary:
      "Dual-destination persistence pipeline combining public gallery integration with offline-first project manifests.",
    points: [
      "Scoped MediaStore Injection: Uses gal to cleanly register exported PNGs into dedicated public albums (WhiteFrame) without broad storage permissions.",
      "Sandboxed Manifest (bundles.json): Concurrently writes isolated metadata archives tracking original source photo paths, aspect choices, and watermark parameters.",
      "1-Tap Editor Re-Hydration: Users can browse previous export batches, rename/delete bundles, or tap any archived photo to re-open the studio with all original edits intact.",
      "Android Scoped Storage Compliance: Satisfies modern Android 11–14+ storage sandboxing without requesting dangerous broad permissions.",
    ],
  },
  {
    title: "5. Supabase Cloud Auth & Google Play Compliance",
    icon: "security",
    summary:
      "Enterprise-grade authentication with strict runtime secret isolation and compliant user lifecycle management.",
    points: [
      "Native Google OAuth 2.0: Completes seamless token handshakes via google_sign_in and Supabase signInWithIdToken.",
      "Reactive Auth State Stream: Wires StreamBuilder<AuthState> directly to session refresh events for instant, frictionless route protection.",
      "Google Play Soft Deletion: Complies with Google Play account deletion mandates by flagging account metadata before clean session termination.",
      "Decoupled Runtime Secrets: Isolates Supabase URLs and API keys in .env loaded via flutter_dotenv, keeping credentials out of source control.",
    ],
  },
];

export default function WhiteFrameCaseStudyPage() {
  const { theme, isDark, toggleTheme } = useTheme();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const footerText = useMemo(
    () => `© ${new Date().getFullYear()} Rajat Khandelwal. WhiteFrame Studio.`,
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
            onClick={() => logUiEvent("nav_clicked", { target: item.href, source: "whiteframe_page" })}
            className={`group relative flex size-10 items-center justify-center rounded-full transition-all ${
              item.active
                ? "bg-pink-500/15 text-pink-400"
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
              onClick={() => logUiEvent("back_to_projects_clicked", { source: "whiteframe_header" })}
              className="theme-btn-secondary flex size-9 items-center justify-center rounded-xl"
            >
              <span className="material-symbols-outlined text-lg">arrow_back</span>
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold tracking-tight text-[var(--text-main)]">
                  WhiteFrame: Canvas Studio
                </span>
                <span className="rounded-full border border-pink-500/30 bg-pink-500/10 px-2 py-0.5 text-[10px] font-semibold text-pink-400">
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
              href="https://play.google.com/store/apps/details?id=com.cloudcubit.whiteframe&pcampaignid=web_share"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => logUiEvent("playstore_header_clicked", { app: "whiteframe" })}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-pink-500/20 hover:from-pink-500 hover:to-rose-500 transition"
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
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-pink-500/30 bg-pink-500/10 px-3 py-1 text-xs font-semibold text-pink-600 dark:text-pink-400">
                    <span className="size-2 rounded-full bg-pink-500 animate-pulse" />
                    Photography & Content Utility
                  </span>
                  <span className="rounded-full border border-[var(--glass-border)] bg-[var(--surface-overlay)] px-3 py-1 text-xs font-mono text-[var(--text-muted)]">
                    com.cloudcubit.whiteframe
                  </span>
                  <span className="rounded-full border border-rose-500/30 bg-rose-500/10 px-3 py-1 text-xs font-semibold text-rose-600 dark:text-rose-400">
                    GPU dart:ui Pipeline
                  </span>
                </div>

                <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[var(--text-main)] sm:text-4xl lg:text-5xl">
                  WhiteFrame — Instagram Canvas Studio
                </h1>

                <p className="mt-4 text-base italic leading-relaxed text-pink-500 dark:text-pink-400 sm:text-lg">
                  &ldquo;Create pristine, Instagram-ready white-space posts with sub-second GPU canvas rendering, aspect presets, and branded watermark attributions.&rdquo;
                </p>

                <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)] sm:text-base">
                  Built for photographers, visual artists, and digital creators frustrated by awkward social media auto-crops and compression artifacts. Offloads image rendering directly to Flutter’s low-level GPU Skia/Impeller pipeline for sub-100ms export speeds, instant aspect ratio switching (1:1 & 4:5), branded watermarks, and MediaStore export bundle re-hydration.
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a
                    href="https://play.google.com/store/apps/details?id=com.cloudcubit.whiteframe&pcampaignid=web_share"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => logUiEvent("playstore_hero_clicked", { app: "whiteframe" })}
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-pink-500/20 hover:from-pink-500 hover:to-rose-500 transition"
                  >
                    <span className="material-symbols-outlined text-base">shop</span>
                    View on Google Play Store
                  </a>

                  <Link
                    href="/#chatbot"
                    onClick={() => logUiEvent("ask_chatbot_about_whiteframe", { source: "whiteframe_hero" })}
                    className="theme-btn-secondary inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold"
                  >
                    <span className="material-symbols-outlined text-base text-indigo-400">smart_toy</span>
                    Ask RajatGPT About WhiteFrame
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
                <div className="relative rounded-3xl border border-pink-500/30 bg-slate-950 p-4 shadow-2xl shadow-pink-500/20">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/apps/whiteframe/logo.webp"
                    alt="WhiteFrame Logo"
                    className="size-36 object-contain drop-shadow-[0_0_25px_rgba(236,72,153,0.5)] sm:size-44 rounded-2xl"
                  />
                  <div className="mt-3 text-center">
                    <span className="inline-block rounded-md bg-pink-500/10 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-pink-400">
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
                <div className="mt-2 text-2xl font-black tracking-tight text-pink-500 dark:text-pink-400 sm:text-3xl">
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
                <span className="text-xs font-bold uppercase tracking-wider text-pink-500 dark:text-pink-400">
                  User Experience & Architecture In Action
                </span>
                <h2 className="mt-1 text-2xl font-extrabold text-[var(--text-main)] sm:text-3xl">
                  Production Application Showcase
                </h2>
                <p className="mt-1 text-xs text-[var(--text-muted)]">
                  Real-time canvas transforms & branded watermark attribution built with Flutter.
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
                  className="group relative cursor-pointer overflow-hidden rounded-[2.5rem] border-4 border-slate-800 bg-slate-950 p-2 shadow-2xl shadow-pink-500/10 transition-transform hover:scale-[1.02]"
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
                <div className="inline-flex items-center gap-2 rounded-full border border-pink-500/30 bg-pink-500/10 px-3 py-1 text-xs font-semibold text-pink-400">
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
                    All Studio Views
                  </span>
                  <div className="mt-3 grid grid-cols-4 gap-2">
                    {screenshots.map((s, idx) => (
                      <button
                        key={s.src}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`group relative aspect-[9/16] overflow-hidden rounded-lg border-2 transition-all ${
                          activeImageIndex === idx
                            ? "border-pink-500 shadow-lg shadow-pink-500/30 scale-105"
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
                  className="relative max-h-[90vh] max-w-md overflow-hidden rounded-3xl border border-pink-500/30 bg-slate-950 p-2 shadow-2xl"
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
              <span className="text-xs font-bold uppercase tracking-wider text-pink-500 dark:text-pink-400">
                Core GPU & System Engineering
              </span>
              <h2 className="mt-1 text-2xl font-extrabold text-[var(--text-main)] sm:text-3xl">
                Deep Architectural Breakdown
              </h2>
              <p className="mt-1 text-xs text-[var(--text-muted)]">
                The technical innovations, GPU rendering migrations, and storage workflows behind WhiteFrame.
              </p>
            </div>

            <div className="space-y-6">
              {architecturalHighlights.map((arch) => (
                <div key={arch.title} className="bento-card p-6 sm:p-8">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-pink-500/15 text-pink-600 dark:text-pink-400">
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
                        <span className="mt-0.5 size-1.5 shrink-0 rounded-full bg-pink-500 dark:bg-pink-400" />
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
              <span className="text-xs font-bold uppercase tracking-wider text-pink-500 dark:text-pink-400">
                Technology Specifications
              </span>
              <h2 className="mt-1 text-2xl font-extrabold text-[var(--text-main)] sm:text-3xl">
                GPU Graphics & Flutter Ecosystem Stack
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {techStack.map((group) => (
                <div
                  key={group.category}
                  className="rounded-2xl border border-[var(--glass-border)] bg-[var(--surface-overlay)] p-5"
                >
                  <h4 className="font-semibold text-sm text-[var(--text-main)] flex items-center gap-2">
                    <span className="size-2 rounded-full bg-pink-500" />
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
              <span className="material-symbols-outlined text-4xl text-pink-500 dark:text-pink-400">
                photo_camera
              </span>
              <h3 className="mt-2 text-2xl font-extrabold text-[var(--text-main)] sm:text-3xl">
                Try WhiteFrame live on Google Play
              </h3>
              <p className="mt-2 text-sm text-[var(--text-muted)]">
                Install WhiteFrame to create pristine social media posts or ask RajatGPT about the low-level GPU dart:ui rendering pipeline and Matrix4 viewport scaling.
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="https://play.google.com/store/apps/details?id=com.cloudcubit.whiteframe&pcampaignid=web_share"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => logUiEvent("playstore_cta_clicked", { app: "whiteframe" })}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 px-6 py-3 text-xs font-bold text-white shadow-lg shadow-pink-500/20 hover:from-pink-500 hover:to-rose-500 transition"
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
