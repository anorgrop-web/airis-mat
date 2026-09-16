import "server-only";
import { hashData } from "@/lib/fb-capi";

/** @deprecated — use lib/fb-capi.ts (normalises + hashes). Kept for older imports. */
export function hashPII(value: string): string {
  return hashData(value);
}
