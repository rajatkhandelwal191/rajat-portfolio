const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  (process.env.NODE_ENV === "production" ? "https://rajat-khandelwal.fly.dev" : "http://localhost:8000");

type LogLevel = "info" | "warning" | "error";

type LogContext = Record<string, unknown>;

function writeConsole(level: LogLevel, event: string, context: LogContext): void {
  const payload = { event, context };
  if (level === "error") {
    console.error("[frontend]", payload);
    return;
  }
  if (level === "warning") {
    console.warn("[frontend]", payload);
    return;
  }
  console.info("[frontend]", payload);
}

function sendToBackend(level: LogLevel, event: string, context: LogContext): void {
  if (typeof window === "undefined") {
    return;
  }

  void fetch(`${API_BASE_URL}/api/chat/frontend-event`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ level, event, context }),
    keepalive: true,
  }).catch((error) => {
    console.error("[frontend] failed to send log to backend", { event, error });
  });
}

function sendToFrontendServer(level: LogLevel, event: string, context: LogContext): void {
  if (typeof window === "undefined") {
    return;
  }

  void fetch("/api/frontend-log", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ level, event, context }),
    keepalive: true,
  }).catch((error) => {
    console.error("[frontend] failed to send log to Next server", { event, error });
  });
}

export function logUiEvent(event: string, context: LogContext = {}): void {
  writeConsole("info", event, context);
  sendToFrontendServer("info", event, context);
  sendToBackend("info", event, context);
}

export function logUiWarning(event: string, context: LogContext = {}): void {
  writeConsole("warning", event, context);
  sendToFrontendServer("warning", event, context);
  sendToBackend("warning", event, context);
}

export function logUiError(event: string, context: LogContext = {}): void {
  writeConsole("error", event, context);
  sendToFrontendServer("error", event, context);
  sendToBackend("error", event, context);
}
