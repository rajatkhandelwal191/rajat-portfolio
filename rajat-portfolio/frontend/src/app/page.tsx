"use client";

import { PointerEvent, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

import ChatbotWindow from "../components/ChatbotWindow";
import ProjectCard from "../components/ProjectCard";
import { logUiEvent } from "../lib/frontendLogger";

type Theme = "light" | "dark";

const navItems = [
  { href: "#home", icon: "home", label: "Home", active: true },
  { href: "/about", icon: "person", label: "About" },
  { href: "/projects", icon: "code_blocks", label: "Projects" },
  { href: "/experience", icon: "history_edu", label: "Experience" },
  { href: "/contact", icon: "alternate_email", label: "Contact" },
  { href: "#chatbot", icon: "smart_toy", label: "RajatGPT" },
];

const cards = [
  {
    id: "about",
    href: "/about",
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
    href: "/experience",
    icon: "history_edu",
    title: "Experience",
    description: "A timeline of my professional career, roles, and key accomplishments.",
    cta: "SEE TIMELINE",
  },
  {
    id: "contact",
    href: "/contact",
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
  const [pullOffset, setPullOffset] = useState(0);
  const [isPulling, setIsPulling] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);
  const pullStartRef = useRef<number | null>(null);
  const isDark = theme === "dark";
  const pullThreshold = 26;

  const footerText = useMemo(
    () => `(c) ${new Date().getFullYear()} Rajat Khandelwal. Built with glassmorphism and motion.`,
    [],
  );
  const showHangingTrigger = hasScrolled && !isChatbotVisible;

  useEffect(() => {
    const onScroll = () => {
      setHasScrolled(window.scrollY > 80);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const chatbotEl = document.getElementById("chatbot");
    let observer: IntersectionObserver | null = null;
    if (chatbotEl) {
      observer = new IntersectionObserver(
        (entries) => {
          setIsChatbotVisible(entries.some((entry) => entry.isIntersecting));
        },
        { threshold: 0.25 },
      );
      observer.observe(chatbotEl);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  const goToChatbot = () => {
    logUiEvent("hanging_ask_rajatgpt_triggered", { page: "home" });
    const target = document.getElementById("chatbot");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      window.setTimeout(() => {
        window.location.hash = "chatbot";
      }, 220);
      return;
    }
    window.location.href = "#chatbot";
  };

  const handlePullStart = (event: PointerEvent<HTMLButtonElement>) => {
    if (!showHangingTrigger) {
      return;
    }
    event.preventDefault();
    pullStartRef.current = event.clientY;
    setIsPulling(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePullMove = (event: PointerEvent<HTMLButtonElement>) => {
    if (!showHangingTrigger) {
      return;
    }
    if (pullStartRef.current === null) {
      return;
    }
    const delta = Math.max(0, event.clientY - pullStartRef.current);
    setPullOffset(Math.min(delta, 60));
  };

  const handlePullEnd = (event: PointerEvent<HTMLButtonElement>) => {
    if (!showHangingTrigger) {
      return;
    }
    if (pullStartRef.current === null) {
      return;
    }
    event.currentTarget.releasePointerCapture(event.pointerId);
    const didTrigger = pullOffset >= pullThreshold;
    pullStartRef.current = null;
    setIsPulling(false);
    setPullOffset(0);
    if (didTrigger) {
      goToChatbot();
    }
  };

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
            onClick={() => logUiEvent("nav_clicked", { page: "home", label: item.label, href: item.href })}
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
        <div
          className={`fixed left-1/2 top-0 z-[70] -translate-x-1/2 transition-all duration-300 ${
            showHangingTrigger ? "pointer-events-auto opacity-100" : "pointer-events-none -translate-y-6 opacity-0"
          }`}
        >
          <div className="mx-auto h-10 w-px bg-[var(--section-line)]" />
          <button
            aria-label="Pull down to open RajatGPT"
            className="flex flex-col items-center rounded-b-2xl focus:outline-none"
            onPointerCancel={handlePullEnd}
            onPointerDown={handlePullStart}
            onPointerMove={handlePullMove}
            onPointerUp={handlePullEnd}
            style={{ touchAction: "none", transform: `translateY(${pullOffset}px)` }}
            type="button"
          >
            <div className="h-8 w-px bg-[var(--section-line)]" />
            <div className="portfolio-glass-card rounded-2xl border border-[var(--card-hover-border)] px-4 py-2.5">
              <div className="flex items-center gap-2">
                <motion.span
                  animate={{
                    opacity: [1, 1, 0.25, 1, 1, 0.3, 1],
                    scaleY: [1, 1, 0.2, 1, 1, 0.25, 1],
                    color: ["#ec5b13", "#fde6ca", "#ec5b13", "#fde6ca", "#ec5b13"],
                  }}
                  className="material-symbols-outlined text-base"
                  transition={{ duration: 2.4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  style={{ transformOrigin: "center" }}
                >
                  visibility
                </motion.span>
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-main)]">
                  Ask RajatGPT
                </span>
              </div>
              <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-[var(--text-muted)]">
                {isPulling ? "Release to jump" : "Pull down"}
              </p>
            </div>
          </button>
        </div>

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
            onClick={() => {
              logUiEvent("theme_toggle_clicked", { page: "home", from: theme, to: isDark ? "light" : "dark" });
              setTheme(isDark ? "light" : "dark");
            }}
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

          <section id="chatbot">
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
                onClick={() => logUiEvent("footer_link_clicked", { page: "home", label: link.label, href: link.href })}
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

