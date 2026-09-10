import { NextRequest, NextResponse } from "next/server";
import type { MetaEventName, MetaEventParams, MetaServerEvent } from "@/lib/meta";

/**
 * Meta Conversions API relay.
 * The browser posts events here; we enrich them with IP / user-agent / cookies
 * and forward to the Graph API using the SECRET access token (server only).
 */

// Env first; the hardcoded id is the Airis Mat pixel, kept as fallback (see lib/meta.ts)
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "1264497399081223";
// The access token is a secret and has NO fallback — it must be set in the host's env vars
const ACCESS_TOKEN = process.env.META_CAPI_ACCESS_TOKEN;
const API_VERSION = process.env.META_API_VERSION ?? "v23.0";
const TEST_EVENT_CODE = process.env.META_TEST_EVENT_CODE;

const ALLOWED_EVENTS = new Set<MetaEventName>([
  "PageView",
  "ViewContent",
  "AddToCart",
  "InitiateCheckout",
  "Purchase",
  "Lead",
]);

const ALLOWED_CUSTOM_KEYS: ReadonlyArray<keyof MetaEventParams> = [
  "content_ids",
  "content_name",
  "content_type",
  "contents",
  "value",
  "currency",
  "num_items",
];

function pickCustomData(input: unknown): MetaEventParams | undefined {
  if (!input || typeof input !== "object") return undefined;
  const src = input as Record<string, unknown>;
  const out: Record<string, unknown> = {};
  for (const key of ALLOWED_CUSTOM_KEYS) if (src[key] !== undefined) out[key] = src[key];
  return Object.keys(out).length ? (out as MetaEventParams) : undefined;
}

function stripUndefined<T extends Record<string, unknown>>(obj: T): T {
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined && v !== null)) as T;
}

export async function POST(req: NextRequest) {
  if (!PIXEL_ID || !ACCESS_TOKEN) {
    console.error("[meta-capi] META_CAPI_ACCESS_TOKEN is not set — server events are being dropped");
    return NextResponse.json({ ok: false, error: "Meta CAPI not configured" }, { status: 503 });
  }

  let body: Partial<MetaServerEvent>;
  try {
    body = (await req.json()) as Partial<MetaServerEvent>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const { event_name, event_id, event_source_url } = body;
  if (!event_name || !ALLOWED_EVENTS.has(event_name) || typeof event_id !== "string" || !event_id) {
    return NextResponse.json({ ok: false, error: "Invalid event" }, { status: 400 });
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    req.ip ||
    undefined;
  const userAgent = req.headers.get("user-agent") ?? undefined;

  const user_data = stripUndefined({
    client_ip_address: ip,
    client_user_agent: userAgent,
    fbp: body.fbp ?? req.cookies.get("_fbp")?.value,
    fbc: body.fbc ?? req.cookies.get("_fbc")?.value,
    // TODO: checkout integration — add hashed customer data for better match quality
    // using hashPII() from lib/meta-server.ts: em: [hashPII(email)], ph: [hashPII(phone)], ...
  });

  const event = stripUndefined({
    event_name,
    event_time: Math.floor(Date.now() / 1000),
    event_id,
    event_source_url: typeof event_source_url === "string" ? event_source_url : undefined,
    action_source: "website",
    user_data,
    custom_data: pickCustomData(body.custom_data),
  });

  const graphBody = stripUndefined({
    data: [event],
    access_token: ACCESS_TOKEN,
    test_event_code: TEST_EVENT_CODE,
  });

  try {
    const res = await fetch(`https://graph.facebook.com/${API_VERSION}/${PIXEL_ID}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(graphBody),
      cache: "no-store",
    });
    const json = (await res.json().catch(() => ({}))) as {
      events_received?: number;
      error?: { message?: string; code?: number };
    };

    if (!res.ok) {
      console.error("[meta-capi] Graph API error:", json.error ?? json);
      return NextResponse.json({ ok: false, error: json.error?.message ?? "Graph API error" }, { status: 502 });
    }

    return NextResponse.json({ ok: true, events_received: json.events_received ?? 0 });
  } catch (err) {
    console.error("[meta-capi] request failed:", err);
    return NextResponse.json({ ok: false, error: "Upstream request failed" }, { status: 502 });
  }
}
