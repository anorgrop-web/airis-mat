import "server-only";
import { createHash } from "node:crypto";

/**
 * SHA-256 for Meta "customer information parameters" (email, phone, name…).
 * Meta requires values to be normalized (trimmed, lower-cased) before hashing.
 * Server-only: never hash PII in the browser.
 */
export function hashPII(value: string): string {
  return createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}
