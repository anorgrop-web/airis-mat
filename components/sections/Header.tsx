"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";
import { CartIcon, CloseIcon, MenuIcon } from "@/components/ui/Icons";
import { BRAND, HEADER_STRIP, NAV_LINKS, PROMO } from "@/lib/constants";

/**
 * Header = urgency bar (black) → trust strip (desktop row / mobile marquee) → sticky nav with cart.
 * Model: operation base page §3.1.
 */
export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { count, open: openCart } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const stripItems = [...HEADER_STRIP, ...HEADER_STRIP];

  return (
    <>
      {/* Urgency bar */}
      <div className="bg-black py-2 text-center text-[11px] font-bold uppercase tracking-[0.16em] text-white sm:text-xs">
        {PROMO.badge}
      </div>

      {/* Trust strip — row on desktop, marquee on mobile */}
      <div className="border-b border-foreground/5 bg-gray-100 text-[11px] font-semibold uppercase tracking-wide text-foreground">
        <Container className="hidden h-9 items-center justify-center gap-10 lg:flex">
          {HEADER_STRIP.map((item) => (
            <span key={item.label}>
              <span aria-hidden className="mr-1.5">
                {item.icon}
              </span>
              {item.label}
            </span>
          ))}
        </Container>
        <div className="overflow-hidden py-2 lg:hidden">
          <div className="animate-marquee flex w-max items-center">
            {[0, 1].map((copy) => (
              <ul key={copy} className="flex items-center" aria-hidden={copy === 1}>
                {stripItems.map((item, i) => (
                  <li key={`${copy}-${i}`} className="whitespace-nowrap px-5">
                    <span aria-hidden className="mr-1.5">
                      {item.icon}
                    </span>
                    {item.label}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>

      <header
        id="top"
        className={`sticky top-0 z-50 w-full bg-background/95 backdrop-blur-md transition-shadow duration-300 ${
          scrolled ? "border-b border-foreground/5 shadow-sm" : ""
        }`}
      >
        <Container className="flex h-[68px] items-center justify-between gap-6">
          <Link href="/#top" className="flex items-center" aria-label={`${BRAND.name} — home`}>
            <Logo className="h-10 sm:h-11" />
          </Link>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary-dark">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <Button href="/#offer" variant="buy">
                {PROMO.ctaShort}
              </Button>
            </div>

            <button
              type="button"
              onClick={openCart}
              aria-label={`Open cart, ${count} items`}
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground hover:bg-foreground/5"
            >
              <CartIcon />
              {count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-600 px-1 text-[11px] font-bold text-white">
                  {count}
                </span>
              )}
            </button>

            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground md:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </Container>

        {open && (
          <div id="mobile-menu" className="border-t border-foreground/5 bg-background md:hidden">
            <Container className="flex flex-col gap-1 py-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 text-base font-medium text-foreground hover:bg-primary-soft"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-2 px-3">
                <Button href="/#offer" variant="buy" className="w-full" onClick={() => setOpen(false)}>
                  {PROMO.ctaShort}
                </Button>
              </div>
            </Container>
          </div>
        )}
      </header>
    </>
  );
}
