"use client"

import { useEffect, useRef } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { isPixelEnabled, pageview } from "@/lib/fpixel"

/**
 * Fires a Meta PageView on client-side route changes. The initial PageView
 * is sent by the base code injected in app/layout.tsx, so the first render
 * is skipped to avoid a duplicate.
 */
export function FacebookPixelRouteTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (!isPixelEnabled) return
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    pageview()
  }, [pathname, searchParams])

  return null
}
