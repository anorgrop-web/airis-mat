/**
 * Compatibility layer — kept so older imports keep working.
 *
 * The tracking stack moved to the operation's standard (same files as the
 * checkout and the advertorials): lib/fpixel.ts, lib/fb-capi.ts,
 * lib/meta-normalize.ts, lib/ga4.ts, lib/google-ads.ts and
 * components/tracking/*. New code should call `trackHybridEvent` directly.
 */
import { trackHybridEvent } from "@/components/tracking/hybrid-tracker";
import { FB_PIXEL_ID } from "@/lib/fpixel";

export const META_PIXEL_ID = FB_PIXEL_ID;

export type MetaEventName = "PageView" | "ViewContent" | "AddToCart" | "InitiateCheckout" | "Purchase" | "Lead";

export type MetaContent = { id: string; quantity: number; item_price?: number };

export type MetaEventParams = {
  content_ids?: string[];
  content_name?: string;
  content_type?: "product";
  content_category?: string;
  contents?: MetaContent[];
  value?: number;
  currency?: string;
  num_items?: number;
  items?: Array<Record<string, unknown>>;
};

/** Browser pixel + Conversions API + GA4 with one shared eventID. */
export function trackMetaEvent(name: MetaEventName, params: MetaEventParams = {}, eventId?: string): Promise<void> {
  return trackHybridEvent(name, params, {}, eventId);
}
