import type { Metadata } from "next";
import { Suspense } from "react";
import { Inter } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "@next/third-parties/google";
import MetaPixel from "@/components/analytics/MetaPixel";
import { CartProvider } from "@/components/cart/CartProvider";
import MiniCart from "@/components/cart/MiniCart";
import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";
import { GoogleAdsGtag } from "@/components/tracking/google-ads-gtag";
import { ASSETS } from "@/lib/assets";
import { FB_PIXEL_ID as META_PIXEL_ID } from "@/lib/fpixel";
import { GA4_ID } from "@/lib/ga4";
import { COMPANY } from "@/lib/legal";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
});

const TITLE = "Airis Mat — Buy 1, Get 1 Free | The stone bath mat that never stays damp";
const DESCRIPTION =
  "Airis Mat: natural diatomite stone mats that absorb water in seconds and dry on their own, so mold has nowhere to grow. Buy 1, Get 1 Free — free US shipping, 30-day money-back guarantee.";

export const metadata: Metadata = {
  metadataBase: new URL(COMPANY.siteUrl),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: COMPANY.siteUrl,
    siteName: COMPANY.brand,
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_US",
    images: [{ url: ASSETS.hero1, width: 1200, height: 1200, alt: "Airis Mat on a bathroom floor" }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [ASSETS.hero1] },
  robots: { index: true, follow: true },
};

/**
 * Official Meta Pixel base code, inlined so it runs during HTML parsing —
 * before hydration and before any React effect that calls fbq().
 * The initial PageView carries an eventID (window.__metaPageViewId) that
 * components/analytics/MetaPixel.tsx mirrors to the Conversions API.
 */
const META_PIXEL_SNIPPET = `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
window.__metaPageViewId='pv_'+((window.crypto&&crypto.randomUUID)?crypto.randomUUID():Date.now()+'-'+Math.random().toString(16).slice(2));
fbq('track', 'PageView', {}, {eventID: window.__metaPageViewId});`;

// Microsoft Clarity project id (clarity.microsoft.com > Airis Mat > Settings > Setup).
const CLARITY_PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_ID || "ygctu8r7wc";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {META_PIXEL_ID && (
          <>
            <script id="meta-pixel" dangerouslySetInnerHTML={{ __html: META_PIXEL_SNIPPET }} />
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
          </>
        )}
        {/* Microsoft Clarity — session recordings + heatmaps (project "Airis Mat") */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");
          `}
        </Script>
      </head>
      <body className="min-h-screen font-sans">
        <CartProvider>
          <Header />
          {children}
          <Footer />
          <MiniCart />
        </CartProvider>
        {/* ---- Tracking (operation standard: Pixel + CAPI + GA4 + Google Ads + Clarity + Utmify) ---- */}
        {/* Utmify — keeps UTMs across the funnel (prevent-xcod-sck / prevent-subids as in Versia) */}
        <Script
          id="utmify"
          src="https://cdn.utmify.com.br/scripts/utms/latest.js"
          strategy="afterInteractive"
          data-utmify-prevent-xcod-sck=""
          data-utmify-prevent-subids=""
        />
        {/* GA4 — gtag('config') sends page_view; hybrid events mirror the Meta names (lib/ga4.ts) */}
        {GA4_ID && <GoogleAnalytics gaId={GA4_ID} />}
        {/* Google Ads tag — rendered only when NEXT_PUBLIC_GOOGLE_ADS_ID is set */}
        <Suspense fallback={null}>
          <GoogleAdsGtag />
        </Suspense>
        {/* Mirrors the initial PageView to the Conversions API and tracks client-side navigations */}
        <MetaPixel />
        <Analytics />
      </body>
    </html>
  );
}
