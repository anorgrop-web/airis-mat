"use client"

import { useEffect, useRef } from "react"
import * as fpixel from "@/lib/fpixel"
import { sendGA4Event } from "@/lib/ga4"

export interface TrackingUserData {
  email?: string
  phone?: string
  firstName?: string
  lastName?: string
  city?: string
  state?: string
  zip?: string
  country?: string
  /** Stable customer id (e.g. Stripe customer) - hashed as external_id. */
  externalId?: string
}

/**
 * Sends a hybrid event: Meta Pixel (browser) + Conversions API (server),
 * sharing ONE eventId so Meta deduplicates the pair into a single conversion.
 * Same contract as the Versia Garden checkout.
 */
export async function trackHybridEvent(
  eventName: string,
  eventData: Record<string, unknown> = {},
  userData: TrackingUserData = {},
  eventId?: string,
): Promise<void> {
  const id = eventId || crypto.randomUUID()

  // 1. Browser pixel, with the eventID for deduplication
  fpixel.event(eventName, eventData, id)

  // 1b. GA4 mirror (Meta name → GA4 recommended event; PageView skipped)
  sendGA4Event(eventName, eventData, id)

  // 2. Server-side mirror (CAPI). Skipped when no pixel is configured.
  if (!fpixel.isPixelEnabled) return
  try {
    await fetch("/api/fb-events", {
      method: "POST",
      keepalive: true, // survives the navigation that follows a CTA click
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventName,
        eventId: id,
        eventData,
        url: typeof window !== "undefined" ? window.location.href : "",
        userData,
      }),
    })
  } catch (error) {
    console.error("[hybrid-tracker] Failed to send server event:", error)
  }
}

interface HybridTrackerProps {
  event: string
  data?: Record<string, unknown>
  userData?: TrackingUserData
  /** Custom event ID for browser/server deduplication (e.g. purchase_<pi>). */
  eventId?: string
}

/** Declarative wrapper: fires trackHybridEvent once on mount. */
export function HybridTracker({ event, data = {}, userData, eventId }: HybridTrackerProps) {
  const hasFired = useRef(false)

  useEffect(() => {
    if (hasFired.current) return
    hasFired.current = true
    trackHybridEvent(event, data, userData, eventId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}
