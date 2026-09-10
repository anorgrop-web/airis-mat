"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { META_PIXEL_ID, sendMetaServerEvent, trackMetaEvent } from "@/lib/meta";

/**
 * Companion to the inline pixel snippet in app/layout.tsx <head>.
 *
 * - First render: the snippet already fired the browser PageView with an
 *   eventID (window.__metaPageViewId). We only mirror it to the Conversions
 *   API with the same id so Meta deduplicates the pair.
 * - Later client-side navigations: full PageView (browser + server).
 *
 * TODO (EU traffic): gate the snippet behind cookie consent if the page is
 * served to EU visitors; US traffic does not require prior consent.
 */
export default function MetaPixel() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);
  const lastTracked = useRef<string | null>(null);

  useEffect(() => {
    if (!META_PIXEL_ID) return;

    // Guard against React Strict Mode double-invocation in development
    if (lastTracked.current === pathname) return;
    lastTracked.current = pathname;

    if (isFirstRender.current) {
      isFirstRender.current = false;
      const id = window.__metaPageViewId;
      if (id) sendMetaServerEvent("PageView", id);
      else trackMetaEvent("PageView"); // snippet did not run (blocked) — fall back to the full path
      return;
    }

    trackMetaEvent("PageView");
  }, [pathname]);

  return null;
}
