"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { META_PIXEL_ID, loadMetaPixel, trackMetaEvent } from "@/lib/meta";

/**
 * Loads the Meta Pixel once and fires PageView (browser + Conversions API)
 * on first load and on every client-side navigation.
 *
 * TODO (EU traffic): gate `loadMetaPixel` behind cookie consent if the page is
 * served to EU visitors; US traffic does not require prior consent.
 */
export default function MetaPixel() {
  const pathname = usePathname();
  const lastTracked = useRef<string | null>(null);

  useEffect(() => {
    if (!META_PIXEL_ID) return;
    loadMetaPixel(META_PIXEL_ID);

    // Guard against React Strict Mode double-invocation in development
    if (lastTracked.current === pathname) return;
    lastTracked.current = pathname;

    trackMetaEvent("PageView");
  }, [pathname]);

  if (!META_PIXEL_ID) return null;

  return (
    <noscript>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        height="1"
        width="1"
        style={{ display: "none" }}
        alt=""
        src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
      />
    </noscript>
  );
}
