// Meta Pixel / dataset ID. Comes from the env (NEXT_PUBLIC_FB_PIXEL_ID) so
// each deployment points at its own pixel. Used by the browser pixel
// (app/layout.tsx) AND the Conversions API (lib/fb-capi.ts) - both must
// always target the same dataset.
// Fallback = the Airis Mat pixel shared by the LP and the checkout (padrão §2.2:
// hardcoded fallback so a missing env never silently disables tracking).
export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID || "1264497399081223"

export const isPixelEnabled = FB_PIXEL_ID.length > 0

declare global {
  interface Window {
    fbq: (
      action: string,
      eventOrPixelId: string,
      params?: Record<string, unknown>,
      options?: { eventID?: string },
    ) => void
    _fbq: unknown
  }
}

/**
 * The base code is injected inline in the <head> (app/layout.tsx) so
 * window.fbq exists before React hydrates - events fired from a mount effect
 * are queued by the stub and flushed once fbevents.js loads.
 */
export const pageview = () => {
  if (typeof window === "undefined") return
  if (!window.fbq) {
    if (process.env.NODE_ENV !== "production") console.warn("[fpixel] fbq not loaded - PageView dropped")
    return
  }
  window.fbq("track", "PageView")
}

// Track standard events with deduplication support (eventID shared with CAPI)
export const event = (name: string, options: Record<string, unknown> = {}, eventID?: string) => {
  if (typeof window === "undefined") return
  if (!window.fbq) {
    if (process.env.NODE_ENV !== "production") console.warn(`[fpixel] fbq not loaded - ${name} dropped`)
    return
  }
  if (eventID) {
    window.fbq("track", name, options, { eventID })
  } else {
    window.fbq("track", name, options)
  }
}
