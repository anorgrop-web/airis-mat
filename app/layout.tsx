import type { Metadata } from "next";
import { Inter } from "next/font/google";
import MetaPixel from "@/components/analytics/MetaPixel";
import { CartProvider } from "@/components/cart/CartProvider";
import MiniCart from "@/components/cart/MiniCart";
import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";
import { COMPANY } from "@/lib/legal";
import { META_PIXEL_ID } from "@/lib/meta";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
});

const TITLE = "Airis Mat — Natural stone mats for a dry floor and cleaner air";
const DESCRIPTION =
  "Airis Mat: natural diatomite stone mats that absorb water in seconds and dry on their own, so mold has nowhere to grow. Free shipping, 30-day money-back guarantee.";

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
    // TODO: add an OG image (1200×630) once the asset exists: images: ["/og.jpg"]
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
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
window.__metaPageViewId=(window.crypto&&crypto.randomUUID)?crypto.randomUUID():Date.now()+'-'+Math.random().toString(16).slice(2);
fbq('track', 'PageView', {}, {eventID: window.__metaPageViewId});`;

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
      </head>
      <body className="min-h-screen font-sans">
        <CartProvider>
          <Header />
          {children}
          <Footer />
          <MiniCart />
        </CartProvider>
        {/* Mirrors the initial PageView to the Conversions API and tracks client-side navigations */}
        <MetaPixel />
      </body>
    </html>
  );
}
