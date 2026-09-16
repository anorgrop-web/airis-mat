// Normalisers for Meta match keys - applied BEFORE hashing (lib/fb-capi.ts).
//
// Meta matches on the hash of a strictly normalised value. Hashing the raw
// value is worse than sending nothing: the event still counts as "phone
// provided" in the dataset's coverage stats, but the hash matches no one.
//
// Pure module, no imports.

const DIAL_PLAN: Record<string, { dial: string; strip0: boolean }> = {
  US: { dial: "1", strip0: false },
  CA: { dial: "1", strip0: false },
  GB: { dial: "44", strip0: true },
  IE: { dial: "353", strip0: true },
  FR: { dial: "33", strip0: true },
  DE: { dial: "49", strip0: true },
  IT: { dial: "39", strip0: false },
  ES: { dial: "34", strip0: false },
  PT: { dial: "351", strip0: false },
  BR: { dial: "55", strip0: false },
}

/**
 * Phone -> E.164 digits, no "+": "(555) 123-4567" + US -> "15551234567".
 * A number is considered ALREADY international only when it starts with the
 * country's dial code AND is long enough that a national number could not
 * look like that by accident.
 */
export function normalizePhone(raw: unknown, country?: unknown): string | null {
  let digits = String(raw ?? "").replace(/\D/g, "")
  if (!digits) return null
  if (digits.startsWith("00")) digits = digits.slice(2)
  const plan = DIAL_PLAN[String(country ?? "").trim().toUpperCase()]
  if (plan && !(digits.startsWith(plan.dial) && digits.length >= plan.dial.length + 9)) {
    if (plan.strip0) digits = digits.replace(/^0+/, "")
    digits = plan.dial + digits
  }
  return digits.length >= 8 ? digits : null
}

/** Lowercase a-z only: "San Jose" -> "sanjose", "Jose" -> "jose". */
export function normalizeAlpha(raw: unknown): string | null {
  const value = String(raw ?? "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z]/g, "")
  return value || null
}

/** Postcode per Meta's rules: US = first 5 digits; elsewhere lowercase, no spaces. */
export function normalizeZip(raw: unknown, country?: unknown): string | null {
  const compact = String(raw ?? "").replace(/\s+/g, "")
  if (!compact) return null
  const cc = String(country ?? "").trim().toUpperCase()
  if (cc === "US") {
    const match = compact.match(/\d{5}/)
    return match ? match[0] : null
  }
  return compact.toLowerCase()
}

/** ISO-3166-1 alpha-2, lowercase - anything else matches no one, so: null. */
export function normalizeCountry(raw: unknown): string | null {
  const value = String(raw ?? "").trim().toLowerCase()
  return /^[a-z]{2}$/.test(value) ? value : null
}

/** Email: trimmed + lowercase (Meta's only requirement). */
export function normalizeEmail(raw: unknown): string | null {
  const value = String(raw ?? "").trim().toLowerCase()
  return value.includes("@") ? value : null
}
