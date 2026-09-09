"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";
import { CartIcon, CloseIcon, MenuIcon } from "@/components/ui/Icons";
import { BRAND, CTA, NAV_LINKS } from "@/lib/constants";

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

  return (
    <header
      id="top"
      className={`sticky top-0 z-50 w-full bg-background/95 backdrop-blur-md transition-shadow duration-300 ${
        scrolled ? "border-b border-foreground/5 shadow-sm" : ""
      }`}
    >
      <Container className="flex h-[68px] items-center justify-between gap-6">
        {/* Logo */}
        <Link href="#top" className="flex items-center" aria-label={`${BRAND.name} — home`}>
          <Logo className="h-10 sm:h-11" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary-dark"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            {/* TODO: analytics — track header CTA click */}
            <Button href="#offer">{CTA.shopNow}</Button>
          </div>

          {/* Cart */}
          <button
            type="button"
            onClick={openCart}
            aria-label={`Open cart, ${count} items`}
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground hover:bg-foreground/5"
          >
            <CartIcon />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-gradient px-1 text-[11px] font-bold text-white">
                {count}
              </span>
            )}
          </button>

          {/* Mobile toggle */}
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

      {/* Mobile menu */}
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
              <Button href="#offer" className="w-full">
                {CTA.shopNow}
              </Button>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
