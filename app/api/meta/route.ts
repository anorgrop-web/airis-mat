/**
 * Legacy endpoint. The Conversions API relay now lives in /api/fb-events
 * (same contract as the checkout and the advertorials). Kept so any cached
 * client still gets a valid response.
 */
export { POST } from "@/app/api/fb-events/route";
