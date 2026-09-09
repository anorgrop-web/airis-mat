/**
 * Meta Pixel + Conversions API — client-side helpers.
 *
 * Every event is sent twice with the SAME event_id:
 *   1. browser  → fbq('track', …, { eventID })        (Pixel)
 *   2. browser  → POST /api/meta → Graph API          (Conversions API, server-side)
 * Meta deduplicates the pair, so reporting stays accurate even when the
 * browser pixel is blocked (ad blockers, iOS, consent tools).
 */

export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "";

export type MetaEventName =
  | "PageView"
  | "ViewContent"
  | "AddToCart"
  | "InitiateCheckout"
  | "Purchase"
  | "Lead";

export type MetaContent = { id: string; quantity: number; item_price?: number };

export type MetaEventParams = {
  content_ids?: string[];
  content_name?: string;
  content_type?: "product";
  contents?: MetaContent[];
  value?: number;
  currency?: string;
  num_items?: number;
};

/** Payload accepted by app/api/meta/route.ts */
export type MetaServerEvent = {
  event_name: MetaEventName;
  event_id: string;
  event_source_url: string;
  fbp?: string;
  fbc?: string;
  custom_data?: MetaEventParams;
};

type Fbq = {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[];
  push: Fbq;
  loaded: boolean;
  version: string;
};

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

/** Injects the standard Meta Pixel bootstrap (same as the official snippet, without eval/inline HTML). */
export function loadMetaPixel(pixelId: string): void {
  if (typeof window === "undefined" || window.fbq) return;

  const fbq = function (...args: unknown[]) {
    if (fbq.callMethod) fbq.callMethod(...args);
    else fbq.queue.push(args);
  } as Fbq;
  fbq.queue = [];
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";

  window.fbq = fbq;
  if (!window._fbq) window._fbq = fbq;

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);

  window.fbq("init", pixelId);
}

function newEventId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function getCookie(name: string): string | undefined {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : undefined;
}

/** Builds _fbc from a fbclid in the URL when the cookie is not set yet (first landing from an ad). */
function fbcFromUrl(): string | undefined {
  const fbclid = new URLSearchParams(window.location.search).get("fbclid");
  return fbclid ? `fb.1.${Date.now()}.${fbclid}` : undefined;
}

/**
 * Track an event in the browser pixel AND mirror it to the Conversions API.
 * Safe to call anywhere on the client; no-op during SSR or when the pixel id is missing.
 */
export function trackMetaEvent(name: MetaEventName, params: MetaEventParams = {}): void {
  if (typeof window === "undefined" || !META_PIXEL_ID) return;

  const eventId = newEventId();

  // 1. Browser pixel
  window.fbq?.("track", name, params, { eventID: eventId });

  // 2. Server mirror (Conversions API)
  const payload: MetaServerEvent = {
    event_name: name,
    event_id: eventId,
    event_source_url: window.location.href,
    fbp: getCookie("_fbp"),
    fbc: getCookie("_fbc") ?? fbcFromUrl(),
    custom_data: params,
  };

  fetch("/api/meta", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    keepalive: true, // survives page unload (e.g. redirect to checkout)
  }).catch(() => {
    /* never block the UI on analytics */
  });
}
