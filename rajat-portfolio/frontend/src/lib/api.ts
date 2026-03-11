const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  (process.env.NODE_ENV === "production" ? "https://rajat-khandelwal.fly.dev" : "http://localhost:8000");

export async function healthCheck(): Promise<{ status: string }> {
  const response = await fetch(`${API_BASE_URL}/health`, {
    method: "GET",
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Backend health check failed");
  }

  return response.json();
}

type ChatApiSuccess = {
  reply: string;
};

type ChatApiError = {
  detail?: string;
};

export async function sendChatMessage(message: string): Promise<string> {
  const response = await fetch(`${API_BASE_URL}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
    cache: "no-store",
  });

  if (!response.ok) {
    const errorPayload = (await response.json().catch(() => ({}))) as ChatApiError;
    throw new Error(errorPayload.detail || "RajatGPT request failed");
  }

  const payload = (await response.json()) as ChatApiSuccess;
  return payload.reply;
}

export type ContactSubmissionPayload = {
  name: string;
  email: string;
  company?: string;
  message: string;
};

type ContactSubmissionSuccess = {
  status: string;
  submission_id: number;
};

export async function submitContactForm(payload: ContactSubmissionPayload): Promise<ContactSubmissionSuccess> {
  const response = await fetch(`${API_BASE_URL}/api/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  if (!response.ok) {
    const errorPayload = (await response.json().catch(() => ({}))) as ChatApiError;
    throw new Error(errorPayload.detail || "Contact submission failed");
  }

  return response.json() as Promise<ContactSubmissionSuccess>;
}
