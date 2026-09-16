import crypto from "crypto"
import { FB_PIXEL_ID } from "./fpixel"
import { normalizePhone, normalizeAlpha, normalizeZip, normalizeCountry, normalizeEmail } from "./meta-normalize"

// Meta Conversions API access token (server-only). FB_ACCESS_TOKEN is the
// name used in .env.example; META_API_TOKEN is accepted for parity with the
// Versia Garden checkout.
const META_API_TOKEN = process.env.FB_ACCESS_TOKEN || process.env.META_API_TOKEN || ""
const FB_TEST_EVENT_CODE = process.env.FB_TEST_EVENT_CODE || ""

export function hashData(data: string): string {
  return crypto.createHash("sha256").update(data.trim().toLowerCase()).digest("hex")
}

/** RAW (un-hashed) match keys. sendServerEvent normalises and hashes them. */
export interface CapiUserData {
  em?: string
  ph?: string
  fn?: string
  ln?: string
  ct?: string
  st?: string
  zp?: string
  country?: string
  external_id?: string
  client_ip_address?: string
  client_user_agent?: string
  fbp?: string
  fbc?: string
}

interface ServerEventOptions {
  eventName: string
  eventId: string
  eventData?: Record<string, unknown>
  userData?: CapiUserData
  url?: string
}

export async function sendServerEvent({ eventName, eventId, eventData = {}, userData = {}, url }: ServerEventOptions) {
  if (!META_API_TOKEN || !FB_PIXEL_ID) {
    console.error("[fb-capi] FB_ACCESS_TOKEN / NEXT_PUBLIC_FB_PIXEL_ID not set. Skipping server event:", eventName)
    return null
  }

  const country = normalizeCountry(userData.country) || "us"
  const countryCode = country.toUpperCase()

  // Hash PII fields - NORMALISED FIRST. Fields whose normalised form is empty
  // are OMITTED, never sent blank - Meta flags empty parameters as errors.
  const hashed: Record<string, string> = {}
  const em = normalizeEmail(userData.em)
  if (em) hashed.em = hashData(em)
  const ph = normalizePhone(userData.ph, countryCode)
  if (ph) hashed.ph = hashData(ph)
  const fn = normalizeAlpha(userData.fn)
  if (fn) hashed.fn = hashData(fn)
  const ln = normalizeAlpha(userData.ln)
  if (ln) hashed.ln = hashData(ln)
  const ct = normalizeAlpha(userData.ct)
  if (ct) hashed.ct = hashData(ct)
  // State: Meta expects the 2-letter code; a hashed full name matches no one.
  const st = normalizeAlpha(userData.st)
  if (st && st.length === 2) hashed.st = hashData(st)
  const zp = normalizeZip(userData.zp, countryCode)
  if (zp) hashed.zp = hashData(zp)
  hashed.country = hashData(country)
  if (userData.external_id) hashed.external_id = hashData(userData.external_id)

  // Do NOT hash these. fbp/fbc must look like the cookie the pixel writes
  // ("fb.1.<ts>.<value>") - anything else triggers Meta's diagnostics.
  if (userData.client_ip_address) hashed.client_ip_address = userData.client_ip_address
  if (userData.client_user_agent) hashed.client_user_agent = userData.client_user_agent
  if (userData.fbp && userData.fbp.startsWith("fb.")) hashed.fbp = userData.fbp
  if (userData.fbc && userData.fbc.startsWith("fb.")) hashed.fbc = userData.fbc

  const payload: Record<string, unknown> = {
    data: [
      {
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        event_source_url: url,
        action_source: "website",
        user_data: hashed,
        custom_data: eventData,
      },
    ],
  }
  if (FB_TEST_EVENT_CODE) payload.test_event_code = FB_TEST_EVENT_CODE

  const apiUrl = `https://graph.facebook.com/v21.0/${FB_PIXEL_ID}/events?access_token=${META_API_TOKEN}`

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    const result = await response.json()

    if (!response.ok) {
      console.error("[fb-capi] Error sending server event:", JSON.stringify(result))
    } else {
      console.log(`[fb-capi] ${eventName} sent (event_id=${eventId})`, result)
    }

    return result
  } catch (error) {
    console.error("[fb-capi] Failed to send server event:", error)
    return null
  }
}
