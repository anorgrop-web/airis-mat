"use client";

import { Suspense } from "react";
import { FacebookPixelRouteTracker } from "@/components/tracking/facebook-pixel";
import { PageViewCapi } from "@/components/tracking/page-view-capi";

/**
 * Companion to the inline pixel snippet in app/layout.tsx <head>.
 * - Mirrors the initial PageView (window.__metaPageViewId) to the Conversions API.
 * - Fires PageView on client-side navigations.
 */
export default function MetaPixel() {
  return (
    <>
      <Suspense fallback={null}>
        <FacebookPixelRouteTracker />
      </Suspense>
      <PageViewCapi />
    </>
  );
}
