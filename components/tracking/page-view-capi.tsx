"use client"

import { useEffect } from "react"
import { isPixelEnabled } from "@/lib/fpixel"

declare global {
  interface Window {
    __metaPageViewId?: string
  }
}

/**
 * Mirrors the initial browser PageView (fired by the inline snippet in
 * app/layout.tsx with eventID = window.__metaPageViewId) to the Conversions
 * API with the SAME id, so Events Manager shows one deduplicated PageView.
 */
export function PageViewCapi() {
  useEffect(() => {
    if (!isPixelEnabled) return
    const eventId = window.__metaPageViewId
    if (!eventId) return
    const key = `pv_sent_${eventId}`
    try {
      if (sessionStorage.getItem(key)) return
      sessionStorage.setItem(key, "1")
    } catch {
      /* ignore */
    }
    fetch("/api/fb-events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify({ eventName: "PageView", eventId, eventData: {}, url: window.location.href, userData: {} }),
    }).catch(() => {})
  }, [])
  return null
}
