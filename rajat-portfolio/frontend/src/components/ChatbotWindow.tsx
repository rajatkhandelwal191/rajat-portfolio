"use client";

import { KeyboardEvent, useMemo, useState } from "react";
import { motion } from "framer-motion";

import { sendChatMessage } from "../lib/api";

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

type ChatIntent = "about" | "projects" | "experience" | "contact" | "generic";

const followUpByIntent: Record<ChatIntent, { text: string; links: { label: string; href: string }[] }> = {
  about: {
    text: "Do you want to know more about Rajat?",
    links: [{ label: "Go to About", href: "/about" }],
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

function detectIntent(message: string): ChatIntent {
  const text = message.toLowerCase();

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
    text.includes("job")
  ) {
    return "experience";
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
  const prompts = ["Who is Rajat?", "What is your tech stack?", "Are you available for hire?"];
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
                onClick={() => void submitMessage(prompt)}
                className="rounded-full border border-[var(--prompt-border)] bg-[var(--prompt-bg)] px-5 py-2.5 text-sm text-[var(--text-muted)] transition-all hover:border-[var(--primary)] hover:text-[var(--primary)]"
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
                <p>{message.content}</p>
                {message.links && message.links.length > 0 ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {message.links.map((link) => (
                      <a
                        className="rounded-full border border-[var(--primary)] bg-[var(--primary-soft)] px-3 py-1 text-xs font-semibold text-[var(--text-main)] transition-all hover:brightness-110"
                        href={link.href}
                        key={`${message.id}-${link.href}`}
                      >
                        {link.label}
                      </a>
                    ))}
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
