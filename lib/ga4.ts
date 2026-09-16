/**
 * GA4 mirror of the hybrid events (padrão técnico §2.1, item 3).
 * Meta event names are translated to the GA4 recommended events.
 * PageView is NOT mirrored — gtag('config') already sends page_view.
 */
export const GA4_ID = process.env.NEXT_PUBLIC_GA_ID || ""
export const isGA4Enabled = GA4_ID.length > 0

const META_TO_GA4: Record<string, string> = {
  Purchase: "purchase",
  ViewContent: "view_item",
  AddToCart: "add_to_cart",
  InitiateCheckout: "begin_checkout",
  AddPaymentInfo: "add_payment_info",
  Lead: "generate_lead",
}

export function sendGA4Event(metaEventName: string, params: Record<string, unknown> = {}, eventId?: string) {
  if (typeof window === "undefined" || !window.gtag || !isGA4Enabled) return
  if (metaEventName === "PageView") return
  const name = META_TO_GA4[metaEventName] || metaEventName.toLowerCase()
  const payload: Record<string, unknown> = { ...params }
  if (name === "purchase" && eventId) payload.transaction_id = eventId
  window.gtag("event", name, payload)
}
