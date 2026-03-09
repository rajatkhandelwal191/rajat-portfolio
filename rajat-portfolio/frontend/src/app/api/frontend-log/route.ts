import { NextRequest, NextResponse } from "next/server";

type FrontendLogPayload = {
  level?: "info" | "warning" | "error";
  event: string;
  context?: Record<string, unknown>;
};

export async function POST(request: NextRequest) {
  let payload: FrontendLogPayload;
  try {
    payload = (await request.json()) as FrontendLogPayload;
  } catch {
    return NextResponse.json({ status: "invalid_json" }, { status: 400 });
  }

  const level = payload.level ?? "info";
  const logMessage = `[ui-event] ${payload.event} ${JSON.stringify(payload.context ?? {})}`;

  if (level === "error") {
    console.error(logMessage);
  } else if (level === "warning") {
    console.warn(logMessage);
  } else {
    console.info(logMessage);
  }

  return NextResponse.json({ status: "ok" });
}
