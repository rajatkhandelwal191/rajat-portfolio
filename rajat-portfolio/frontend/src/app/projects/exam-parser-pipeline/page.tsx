"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { logUiEvent } from "../../../lib/frontendLogger";

import Link from "next/link";
import { useTheme } from "../../../context/ThemeContext";

const navItems = [
  { href: "/", icon: "home", label: "Home" },
  { href: "/about", icon: "person", label: "About" },
  { href: "/projects", icon: "code_blocks", label: "Projects", active: true },
  { href: "/experience", icon: "history_edu", label: "Experience" },
  { href: "/contact", icon: "alternate_email", label: "Contact" },
];

const pipelineStages = [
  {
    title: "1. PDFLoaderStage",
    icon: "picture_as_pdf",
    detail: "Uses PyMuPDF (fitz) to load the raw PDF file, count pages, and analyze metadata to determine if it is text-based or scanned (image-only).",
  },
  {
    title: "2. ImageExtractorStage",
    icon: "image",
    detail: "Extracts or renders every page of the PDF into a high-quality 200 DPI PNG image. Visual context is crucial for LLMs to interpret dense 2-column layouts, mathematical symbols, and diagrams.",
  },
  {
    title: "3. OCRStage",
    icon: "document_scanner",
    detail: "Extracts raw text natively via PyMuPDF. If the page is scanned (0 characters extracted), it falls back to Tesseract OCR to build the text layer.",
  },
  {
    title: "4. QuestionSegmenterStage",
    icon: "splitscreen",
    detail: "Applies regex pattern matching to locate question numbers and split the page text into individual, manageable question chunks. Safely falls back to page-level LLM parsing if chunking fails.",
  },
  {
    title: "5. LLMParsingStage",
    icon: "psychology",
    detail: "The core AI stage. Sends the question chunk text and the high-res page image to the LLM (Gemini, DeepSeek, Qwen) to parse unstructured content into structured JSON.",
  },
  {
    title: "6. JSONValidationStage",
    icon: "fact_check",
    detail: "Validates the raw LLM output against the strict Pydantic Question schema. If errors occur, it captures the error trace and prompts the LLM to self-correct (up to 3 retries).",
  },
  {
    title: "7. DiagramCropperStage",
    icon: "crop",
    detail: "Takes normalized [ymin, xmin, ymax, xmax] coordinates from the LLM, scales them to the high-res image, and crops diagrams. Uses a Union Merge algorithm to combine overlapping crops.",
  },
  {
    title: "8. AnswerResolverStage",
    icon: "quiz",
    detail: "Determines correct answers and explanations. Integrates three routes: reading an official answer key, querying Tavily Web Search, or requesting LLM solver execution.",
  },
  {
    title: "9. ExportStage",
    icon: "file_download",
    detail: "Assembles all validated questions and sections into the final Paper schema. Exports a complete JSON file and extracts metadata (title, year) visually from the cover page if needed.",
  },
];

const techStack = [
  { category: "PDF & OCR Processing", items: ["PyMuPDF (fitz)", "Tesseract OCR", "Docling"] },
  { category: "LLMs & Integration", items: ["Google Gemini (REST)", "DeepSeek (REST)", "Alibaba Qwen (REST)", "Kimi (REST)", "Ollama (Local)"] },
  { category: "Schemas & Core", items: ["Pydantic v2", "HTTPX (REST-only)", "Python 3.11", "python-dotenv"] },
  { category: "Testing & Tooling", items: ["Pytest", "Rich Logger", "uv (Package Manager)"] },
];

const keyFeatures = [
  "Strict Pipeline/Stages Architecture isolates complex tasks and guarantees separation of concerns",
  "Deterministic preprocessing and post-processing limits AI dependencies to only one single stage",
  "Pydantic-based validation with automatic self-correcting error-trace retry loops (up to 3 times)",
  "Visual-native parsing using high-resolution 200 DPI page images to prevent skipping dense text",
  "Normalized 0-1000 bounding-box coordination scale abstracts pixel dimensions for reliable diagram cropping",
  "Union Merge crop algorithm groups multiple bounding boxes of related figures or tables cleanly",
  "Dynamic cover-page LLM visual metadata extraction fallback for ambiguous filenames",
  "Swappable LLM provider factory allows switching between Gemini, DeepSeek, Qwen, and Ollama in 2 lines of config"
];

const architectureHighlights = [
  {
    title: "LLM Factory Pattern",
    detail: "Enforces an abstract contract (BaseLLM) defining `.generate` and `.generate_with_image`. The pipeline manager remains provider-agnostic, allowing seamless provider switching via environment variables.",
  },
  {
    title: "Resilient Validation Loop",
    detail: "If an LLM's response fails Pydantic schema validation, the system feeds the broken output and Python stack trace error back to the model, enabling quick self-correction of commas or formatting issues.",
  },
  {
    title: "Visual context for equations and tables",
    detail: "By supplying high-resolution PNGs along with OCR chunks, the LLM maintains visual awareness of subscripts, mathematical notation, chemical diagrams, and multi-column document structure.",
  },
  {
    title: "Deterministic Regex Chunking",
    detail: "Before LLM calls, the segmenter splits pages into individual question chunks. This mitigates LLM omissions on long, dense competitive exam papers by limiting the task size per invocation.",
  },
];

export default function ExamParserPipelinePage() {
  const { theme, isDark, toggleTheme } = useTheme();

  const footerText = useMemo(
    () => `(c) ${new Date().getFullYear()} Rajat Khandelwal. Exam Parser Pipeline Project.`,
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
          <Link
            key={item.label}
            className={`group relative flex size-12 items-center justify-center rounded-full transition-all ${
              item.active
                ? "bg-[var(--primary)] text-white shadow-[0_10px_24px_var(--primary-glow)]"
                : "text-[var(--text-muted)] hover:bg-[var(--icon-chip-bg)] hover:text-[var(--primary)]"
            }`}
            href={item.href}
            onClick={() => logUiEvent("nav_clicked", { page: "project_detail_exam_parser", label: item.label, href: item.href })}
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
          </Link>
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
              <span className="material-symbols-outlined">description</span>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-[var(--text-main)]">Exam Parser Pipeline</h1>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">
                Production PDF Ingestion
              </p>
            </div>
          </div>
          <button
            className="portfolio-glass flex size-10 items-center justify-center rounded-xl border border-[var(--glass-border)] text-[var(--primary)] transition-all hover:bg-[var(--icon-chip-bg)]"
            onClick={toggleTheme}
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
              style={{ background: "linear-gradient(135deg, #10b981 0%, #059669 45%, #064e3b 100%)", opacity: 0.94 }}
            />
            <div className="project-noise absolute inset-0 opacity-20" />
            <div className="relative z-10 p-8 text-white md:p-10">
              <p className="mb-3 inline-flex items-center rounded-full border border-white/15 bg-black/20 px-3 py-1 text-xs uppercase tracking-[0.15em]">
                Production-Grade Parser
              </p>
              <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
                Exam Parser Pipeline
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/90 md:text-lg">
                Convert dense competitive exam PDFs into perfectly structured JSON data. 
                Powered by a modular sequential processing architecture, featuring visual-aware LLM segmentation, 
                self-correcting Pydantic validations, and automatic diagram extraction.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-[#059669] transition-colors hover:bg-slate-100"
                  href="https://github.com/rajatkhandelwal191/pdf_extractor/blob/main/exam-parser/architecture.md"
                  onClick={() => logUiEvent("project_link_clicked", { page: "project_detail_exam_parser", cta: "source_code" })}
                  rel="noreferrer noopener"
                  target="_blank"
                >
                  Source Code
                  <span className="material-symbols-outlined text-sm">code</span>
                </a>
              </div>
            </div>
          </motion.section>

          <section className="mb-10">
            <div className="mb-5 flex items-center gap-3">
              <span className="material-symbols-outlined text-2xl text-[var(--cream-active)]">account_tree</span>
              <h3 className="text-2xl font-semibold text-[var(--text-main)]">9-Stage Pipeline Architecture</h3>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {pipelineStages.map((stage, index) => (
                <motion.article
                  animate={{ opacity: 1, y: 0 }}
                  className="portfolio-glass-card rounded-2xl p-5"
                  initial={{ opacity: 0, y: 16 }}
                  key={stage.title}
                  transition={{ duration: 0.35, delay: index * 0.04 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-[var(--primary-soft)] p-2 text-[var(--primary)]">
                      <span className="material-symbols-outlined">{stage.icon}</span>
                    </div>
                    <h4 className="font-semibold text-[var(--text-main)]">{stage.title}</h4>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">{stage.detail}</p>
                </motion.article>
              ))}
            </div>
          </section>

          <section className="mb-10">
            <h3 className="mb-5 text-2xl font-semibold text-[var(--text-main)]">Architecture Highlights</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {architectureHighlights.map((item, index) => (
                <motion.article
                  animate={{ opacity: 1, x: 0 }}
                  className="portfolio-glass-card rounded-2xl p-5"
                  initial={{ opacity: 0, x: -14 }}
                  key={item.title}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <h4 className="text-lg font-semibold text-[var(--text-main)]">{item.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{item.detail}</p>
                </motion.article>
              ))}
            </div>
          </section>

          <section className="mb-10">
            <h3 className="mb-5 text-2xl font-semibold text-[var(--text-main)]">Technology Stack</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {techStack.map((stack, index) => (
                <motion.article
                  animate={{ opacity: 1, y: 0 }}
                  className="portfolio-glass-card rounded-2xl p-5"
                  initial={{ opacity: 0, y: 16 }}
                  key={stack.category}
                  transition={{ duration: 0.35, delay: index * 0.05 }}
                >
                  <h4 className="mb-3 text-lg font-semibold text-[var(--text-main)]">{stack.category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {stack.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-lg bg-[var(--icon-chip-bg)] px-3 py-1 text-xs font-medium text-[var(--text-main)]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.article>
              ))}
            </div>
          </section>

          <section className="mb-10">
            <h3 className="mb-5 text-2xl font-semibold text-[var(--text-main)]">Key Features</h3>
            <motion.article
              animate={{ opacity: 1, y: 0 }}
              className="portfolio-glass-card rounded-3xl p-6"
              initial={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.35 }}
            >
              <ul className="space-y-3 text-sm leading-relaxed text-[var(--text-muted)]">
                {keyFeatures.map((feature) => (
                  <li className="flex items-start gap-3" key={feature}>
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--primary)]" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          </section>

          <section className="portfolio-glass-card rounded-3xl border border-[var(--card-hover-border)] p-6">
            <h3 className="text-2xl font-semibold text-[var(--text-main)]">Links & Reference</h3>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                className="rounded-xl border border-[var(--card-hover-border)] bg-[var(--icon-chip-bg)] px-4 py-2 text-sm text-[var(--text-main)] transition-colors hover:text-[var(--primary)]"
                href="https://github.com/rajatkhandelwal191/pdf_extractor/blob/main/exam-parser/architecture.md"
                onClick={() => logUiEvent("project_link_clicked", { page: "project_detail_exam_parser", cta: "repo_link" })}
                rel="noreferrer noopener"
                target="_blank"
              >
                GitHub Repository
              </a>
              <a
                className="rounded-xl border border-[var(--card-hover-border)] bg-[var(--icon-chip-bg)] px-4 py-2 text-sm text-[var(--text-main)] transition-colors hover:text-[var(--primary)]"
                href="https://www.linkedin.com/in/rajatkhandelwal27/"
                onClick={() => logUiEvent("profile_link_clicked", { page: "project_detail_exam_parser", platform: "linkedin" })}
                rel="noreferrer noopener"
                target="_blank"
              >
                LinkedIn
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
