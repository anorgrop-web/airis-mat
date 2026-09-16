/**
 * Outbound links to the hosted checkout.
 *
 * The advertorials (and the ads) land on this page with utm_*, fbclid, adv,
 * adv_pos… in the URL. Every link to the checkout is rebuilt on the client so
 * those parameters travel with the buyer — otherwise attribution dies here.
 */
export const PRESERVED_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "utm_id",
  "fbclid",
  "gclid",
  "gbraid",
  "wbraid",
  "ttclid",
  "sck",
  "src",
  "xcod",
  "adv",
  "adv_pos",
] as const;

/**
 * @param base     Bundle.checkoutUrl (absolute)
 * @param position where on the LP the click happened ("cart", "offer"…), sent as lp_pos
 */
export function buildCheckoutUrl(base: string, position: string): string {
  const url = new URL(base);
  const current = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : new URLSearchParams();
  for (const key of PRESERVED_PARAMS) {
    const value = current.get(key);
    if (value) url.searchParams.set(key, value);
  }
  url.searchParams.set("lp_pos", position);
  return url.toString();
}

/** Stable event id shared by the browser pixel and the Conversions API. */
export function newEventId(prefix: string): string {
  const rand =
    typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  return `${prefix}_${rand}`;
}
