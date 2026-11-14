"use client";

import { KeyboardEvent, useMemo, useState } from "react";
import { motion } from "framer-motion";

import { sendChatMessage } from "../lib/api";
import { logUiError, logUiEvent } from "../lib/frontendLogger";

type ChatbotWindowProps = {
  name: string;
  isDark: boolean;
};

type ChatMessage = {
  id: string;
  role: "user" | "assistant" | "error";
  content: string;
  links?: { label: string; href: string }[];
};

type ChatIntent = "about" | "projects" | "experience" | "contact" | "resume" | "certifications" | "deepdisk" | "vaulet" | "apps" | "generic";

const followUpByIntent: Record<ChatIntent, { text: string; links: { label: string; href: string }[] }> = {
  about: {
    text: "Do you want to know more about Rajat?",
    links: [{ label: "Go to About", href: "/about" }],
  },
  deepdisk: {
    text: "Explore DeepDisk: Storage Analyzer?",
    links: [
      { label: "📱 Google Play Store", href: "https://play.google.com/store/apps/details?id=com.cloudcubit.deepdisk&pcampaignid=web_share" },
      { label: "DeepDisk Case Study", href: "/projects/deepdisk" },
    ],
  },
  vaulet: {
    text: "Explore Vaulet: Private Digital Vault?",
    links: [
      { label: "🔒 Google Play Store", href: "https://play.google.com/store/apps/details?id=com.cloudcubit.vaulet&pcampaignid=web_share" },
      { label: "Vaulet Case Study", href: "/projects/vaulet" },
    ],
  },
  apps: {
    text: "Explore Rajat's Google Play Store apps?",
    links: [
      { label: "📱 DeepDisk: Storage Analyzer", href: "/projects/deepdisk" },
      { label: "🔒 Vaulet: Private Vault", href: "/projects/vaulet" },
      { label: "All Projects", href: "/projects" },
    ],
  },
  certifications: {
    text: "Verify Rajat's credentials on Credly?",
    links: [
      { label: "🏅 Credly Profile", href: "https://www.credly.com/users/rajat-khandelwal.b764d962" },
      { label: "Claude Certified Architect Badge", href: "https://www.credly.com/badges/7dd35d2b-d461-40a6-90da-2114681ff507/public_url" },
      { label: "View Resume", href: "/resume" },
    ],
  },
  projects: {
    text: "Do you want to go to the Projects page?",
    links: [{ label: "Open Projects", href: "/projects" }],
  },
  experience: {
    text: "Do you want to see Rajat's experience timeline?",
    links: [{ label: "Open Experience", href: "/experience" }],
  },
  contact: {
    text: "Do you want to connect with Rajat directly?",
    links: [{ label: "Open Contact", href: "/contact" }],
  },
  resume: {
    text: "Looking for Rajat's official resume?",
    links: [
      { label: "📄 Download PDF Resume", href: "/Rajat_Khandelwal_Resume.pdf" },
      { label: "View Experience", href: "/experience" },
    ],
  },
  generic: {
    text: "Want to explore a specific section?",
    links: [
      { label: "About", href: "/about" },
      { label: "Projects", href: "/projects" },
      { label: "Experience", href: "/experience" },
      { label: "Contact", href: "/contact" },
    ],
  },
};

function parseInlineTokens(text: string): React.ReactNode[] {
  const tokenRegex = /(\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|`([^`]+)`|(https?:\/\/[^\s<]+[^<.,:;"')\]\s]))/g;
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = tokenRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    const fullMatch = match[0];
    if (match[2] && match[3]) {
      const label = match[2];
      const href = match[3];
      const isPdf = href.toLowerCase().endsWith(".pdf");
      const isExternal = href.startsWith("http://") || href.startsWith("https://");

      nodes.push(
        <a
          key={`${match.index}-link`}
          href={href}
          target={isPdf || isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          download={isPdf ? true : undefined}
          className={
            isPdf
              ? "inline-flex items-center gap-1 rounded-md border border-[var(--primary)]/40 bg-[var(--primary-soft)] px-2 py-0.5 text-xs font-semibold text-[var(--primary)] shadow-xs transition-all hover:brightness-125"
              : "font-semibold text-[var(--primary)] underline underline-offset-4 transition-all hover:brightness-125"
          }
        >
          {isPdf ? <span className="material-symbols-outlined text-xs">download</span> : null}
          {label}
        </a>,
      );
    } else if (match[4]) {
      nodes.push(
        <strong key={`${match.index}-bold`} className="font-semibold text-[var(--text-main)]">
          {match[4]}
        </strong>,
      );
    } else if (match[5]) {
      nodes.push(
        <code
          key={`${match.index}-code`}
          className="rounded bg-black/15 px-1.5 py-0.5 font-mono text-xs text-[var(--text-main)] dark:bg-white/10"
        >
          {match[5]}
        </code>,
      );
    } else if (match[6]) {
      const url = match[6];
      nodes.push(
        <a
          key={`${match.index}-url`}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--primary)] underline underline-offset-4 hover:brightness-125"
        >
          {url}
        </a>,
      );
    }

    lastIndex = match.index + fullMatch.length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

function FormattedMessage({ content }: { content: string }) {
  const lines = content.split("\n");

  return (
    <div className="space-y-1.5 leading-relaxed">
      {lines.map((line, index) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={index} className="h-1.5" />;
        }

        if (trimmed === "---" || trimmed === "***") {
          return <hr key={index} className="my-2 border-[var(--prompt-border)]" />;
        }

        if (trimmed.startsWith("### ")) {
          return (
            <h4 key={index} className="mt-2 text-sm font-bold text-[var(--text-main)]">
              {parseInlineTokens(trimmed.slice(4))}
            </h4>
          );
        }

        if (trimmed.startsWith("## ")) {
          return (
            <h3 key={index} className="mt-2.5 text-base font-bold text-[var(--text-main)]">
              {parseInlineTokens(trimmed.slice(3))}
            </h3>
          );
        }

        if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
          return (
            <div key={index} className="flex items-start gap-2 pl-2">
              <span className="font-bold leading-tight text-[var(--primary)]">•</span>
              <div className="flex-1">{parseInlineTokens(trimmed.slice(2))}</div>
            </div>
          );
        }

        return <p key={index}>{parseInlineTokens(line)}</p>;
      })}
    </div>
  );
}

function detectIntent(message: string): ChatIntent {
  const text = message.toLowerCase();

  if (
    text.includes("vaulet") ||
    text.includes("cardvault") ||
    text.includes("card vault") ||
    text.includes("digital vault")
  ) {
    return "vaulet";
  }

  if (
    text.includes("deepdisk") ||
    text.includes("storage analyzer")
  ) {
    return "deepdisk";
  }

  if (
    text.includes("play store") ||
    text.includes("playstore") ||
    text.includes("mobile app") ||
    text.includes("android app") ||
    text.includes("flutter app") ||
    text.includes("apps")
  ) {
    return "apps";
  }

  if (
    text.includes("resume") ||
    text.includes("cv") ||
    text.includes("curriculum vitae")
  ) {
    return "resume";
  }

  if (
    text.includes("project") ||
    text.includes("portfolio work") ||
    text.includes("build") ||
    text.includes("github")
  ) {
    return "projects";
  }

  if (
    text.includes("experience") ||
    text.includes("career") ||
    text.includes("work history") ||
    text.includes("job") ||
    text.includes("tcs") ||
    text.includes("client") ||
    text.includes("enbridge") ||
    text.includes("exelon") ||
    text.includes("outokumpu") ||
    text.includes("eol")
  ) {
    return "experience";
  }

  if (
    text.includes("certif") ||
    text.includes("license") ||
    text.includes("badge") ||
    text.includes("credly") ||
    text.includes("claude certified") ||
    text.includes("azure ai") ||
    text.includes("ai-102") ||
    text.includes("credential")
  ) {
    return "certifications";
  }

  if (
    text.includes("contact") ||
    text.includes("hire") ||
    text.includes("email") ||
    text.includes("reach")
  ) {
    return "contact";
  }

  if (
    text.includes("about") ||
    text.includes("who is rajat") ||
    text.includes("who are you") ||
    text.includes("bio") ||
    text.includes("profile")
  ) {
    return "about";
  }

  return "generic";
}

export default function ChatbotWindow({ name, isDark }: ChatbotWindowProps) {
  const prompts = [
    "Who is Rajat?",
    "Tell me about your Play Store apps (DeepDisk & Vaulet)",
    "Tell me about your work & clients",
    "What are your certifications & Credly badges?",
    "Tell me about the Enbridge EOL platform",
    "What is your tech stack?",
  ];
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const placeholderText = useMemo(
    () => `${name}GPT is ready to answer your questions...`,
    [name],
  );

  const submitMessage = async (rawMessage: string) => {
    const message = rawMessage.trim();
    if (!message || isLoading) {
      return;
    }
    logUiEvent("chat_submit_clicked", { message_preview: message.slice(0, 120) });

    const userMessage: ChatMessage = {
      id: `${Date.now()}-user`,
      role: "user",
      content: message,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const reply = await sendChatMessage(message);
      logUiEvent("chat_response_received", { reply_chars: reply.length });
      const assistantMessage: ChatMessage = {
        id: `${Date.now()}-assistant`,
        role: "assistant",
        content: reply,
      };
      const followUp = followUpByIntent[detectIntent(message)];
      const followupMessage: ChatMessage = {
        id: `${Date.now()}-followup`,
        role: "assistant",
        content: followUp.text,
        links: followUp.links,
      };
      setMessages((prev) => [...prev, assistantMessage, followupMessage]);
    } catch (error) {
      const err = error instanceof Error ? error.message : "Request failed";
      logUiError("chat_response_error", { error: err, message_preview: message.slice(0, 120) });
      const errorMessage: ChatMessage = {
        id: `${Date.now()}-error`,
        role: "error",
        content: err,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") {
      return;
    }
    event.preventDefault();
    void submitMessage(inputValue);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.4 }}
      className="mx-auto w-full max-w-4xl"
    >
      <div className="mb-8 flex items-center justify-center gap-3">
        <div className="size-2 animate-pulse rounded-full bg-[var(--primary)] shadow-[0_0_16px_var(--primary-glow)]" />
        <h2 className="text-center text-2xl font-bold tracking-tight text-[var(--text-main)]">Ask {name}GPT</h2>
      </div>

      <div className="portfolio-glass-card relative mb-6 min-h-[320px] overflow-hidden rounded-[1.75rem] p-6 lg:min-h-[360px] lg:p-8">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[var(--primary-soft)] to-transparent" />

        <div className="relative z-10 flex flex-col gap-3">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--primary)]">Suggested Prompts</p>
          <div className="flex flex-wrap gap-2">
            {prompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => {
                  logUiEvent("chat_prompt_clicked", { prompt });
                  void submitMessage(prompt);
                }}
                className="rounded-full border border-[var(--prompt-border)] bg-[var(--prompt-bg)] px-5 py-2.5 text-sm font-medium text-[var(--text-main)] shadow-xs transition-all hover:scale-[1.02] hover:border-[var(--primary)] hover:bg-[var(--primary-soft)] hover:text-[var(--primary)]"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {messages.length === 0 ? (
          <div className="relative z-10 flex flex-1 items-center justify-center py-8">
            <div className="flex flex-col items-center gap-2 opacity-70">
              <span className="material-symbols-outlined animate-pulse text-4xl text-[var(--primary)]">
                smart_toy
              </span>
              <p className="text-center text-sm italic text-[var(--text-muted)]">{placeholderText}</p>
            </div>
          </div>
        ) : (
          <div className="relative z-10 mt-6 max-h-96 space-y-3 overflow-y-auto pr-1">
            {messages.map((message) => (
              <div
                className={`rounded-2xl border px-4 py-3 text-sm leading-relaxed ${
                  message.role === "user"
                    ? "ml-auto max-w-[85%] border-[var(--primary)] bg-[var(--primary-soft)] text-[var(--text-main)]"
                    : message.role === "error"
                      ? "max-w-[90%] border-red-500/40 bg-red-500/10 text-red-300"
                      : "max-w-[90%] border-[var(--prompt-border)] bg-[var(--prompt-bg)] text-[var(--text-main)]"
                }`}
                key={message.id}
              >
                <FormattedMessage content={message.content} />
                {message.links && message.links.length > 0 ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {message.links.map((link) => {
                      const isPdf = link.href.toLowerCase().endsWith(".pdf");
                      const isExternal = link.href.startsWith("http://") || link.href.startsWith("https://");
                      return (
                        <a
                          className="inline-flex items-center gap-1 rounded-full border border-[var(--primary)] bg-[var(--primary-soft)] px-3 py-1.5 text-xs font-semibold text-[var(--text-main)] shadow-xs transition-all hover:scale-[1.03] hover:brightness-110"
                          href={link.href}
                          target={isPdf || isExternal ? "_blank" : undefined}
                          rel={isExternal ? "noopener noreferrer" : undefined}
                          download={isPdf ? true : undefined}
                          onClick={() => logUiEvent("chat_followup_link_clicked", { label: link.label, href: link.href })}
                          key={`${message.id}-${link.href}`}
                        >
                          {isPdf ? <span className="material-symbols-outlined text-xs text-[var(--primary)]">download</span> : null}
                          {link.label}
                        </a>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            ))}
            {isLoading ? (
              <div className="max-w-[90%] rounded-2xl border border-[var(--prompt-border)] bg-[var(--prompt-bg)] px-4 py-3 text-sm text-[var(--text-muted)]">
                RajatGPT is thinking...
              </div>
            ) : null}
          </div>
        )}
      </div>

      <label className="group relative block">
        <div className="absolute inset-0 rounded-2xl bg-[var(--input-glow)] blur-md transition-colors duration-300 group-focus-within:bg-[var(--input-glow-strong)]" />
        <input
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          onKeyDown={onKeyDown}
          disabled={isLoading}
          className="portfolio-glass relative w-full rounded-2xl border border-[var(--input-border)] bg-[var(--input-bg)] px-6 py-5 pr-20 text-lg text-[var(--text-main)] placeholder:text-[var(--text-placeholder)] focus:outline-none focus:ring-2 focus:ring-[var(--input-focus)]"
          placeholder="Ask me anything about my work..."
          type="text"
        />
        <button
          onClick={() => void submitMessage(inputValue)}
          disabled={isLoading}
          type="button"
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
