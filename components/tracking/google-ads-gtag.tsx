"use client"

import Script from "next/script"
import { GOOGLE_ADS_ID, isGoogleAdsEnabled } from "@/lib/google-ads"

export function GoogleAdsGtag() {
  if (!isGoogleAdsEnabled) return null

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`} strategy="afterInteractive" />
      <Script id="google-ads-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GOOGLE_ADS_ID}');
        `}
      </Script>
    </>
  )
}
