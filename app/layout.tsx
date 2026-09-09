import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CartProvider } from "@/components/cart/CartProvider";
import MiniCart from "@/components/cart/MiniCart";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"], // latin-ext covers FR / DE accented characters
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Airis Mat — Natural stone mats for a dry floor and cleaner air",
  description:
    "Airis Mat: natural diatomite stone mats that absorb water in seconds and dry on their own, so mold has nowhere to grow. Free shipping, 30-day money-back guarantee.",
  // TODO: add openGraph / twitter images once assets exist
  // TODO: add alternates.languages for /fr and /de once translations are live
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen font-sans">
        <CartProvider>
          {children}
          <MiniCart />
        </CartProvider>
        {/* TODO: analytics — inject GA4 / Meta Pixel / Plausible script here (with EU cookie consent) */}
      </body>
    </html>
  );
}
