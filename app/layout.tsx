import type { Metadata } from "next";
import { Inter } from "next/font/google";
import MetaPixel from "@/components/analytics/MetaPixel";
import { CartProvider } from "@/components/cart/CartProvider";
import MiniCart from "@/components/cart/MiniCart";
import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";
import { COMPANY } from "@/lib/legal";
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen font-sans">
        <CartProvider>
          <Header />
          {children}
          <Footer />
          <MiniCart />
        </CartProvider>
        {/* Meta Pixel + Conversions API (config in .env.local). TODO: GA4 if needed. */}
        <MetaPixel />
      </body>
    </html>
  );
}
