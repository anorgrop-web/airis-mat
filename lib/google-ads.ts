export const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || ""
export const GOOGLE_ADS_PURCHASE_LABEL = process.env.NEXT_PUBLIC_GOOGLE_ADS_PURCHASE_LABEL || ""

export const isGoogleAdsEnabled = GOOGLE_ADS_ID.length > 0

/**
 * Fires the Google Ads purchase conversion.
 * Requires NEXT_PUBLIC_GOOGLE_ADS_ID and NEXT_PUBLIC_GOOGLE_ADS_PURCHASE_LABEL.
 */
export function sendGoogleAdsConversion({ value, transaction_id }: { value: number; transaction_id: string }) {
  if (typeof window === "undefined" || !window.gtag) return
  if (!GOOGLE_ADS_ID || !GOOGLE_ADS_PURCHASE_LABEL) return

  window.gtag("event", "conversion", {
    send_to: `${GOOGLE_ADS_ID}/${GOOGLE_ADS_PURCHASE_LABEL}`,
    value,
    currency: "USD",
    transaction_id,
  })
}

declare global {
  interface Window {
    gtag?: (command: string, eventName: string, params?: Record<string, unknown>) => void
    dataLayer?: unknown[]
  }
}
