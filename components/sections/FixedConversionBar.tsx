"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import Button from "@/components/ui/Button";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import { StarIcon } from "@/components/ui/Icons";
import { BRAND, FIXED_BAR } from "@/lib/constants";

/**
 * Sticky bottom bar (model §5). Appears after the visitor scrolls past the hero,
 * hides while the cart drawer is open, and sends the click to the offer section.
 */
export default function FixedConversionBar() {
  const [visible, setVisible] = useState(false);
  const { isOpen } = useCart();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible || isOpen) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-foreground/10 bg-white/95 p-3 shadow-[0_-8px_30px_-12px_rgba(0,0,0,0.25)] backdrop-blur-md">
      <div className="mx-auto flex max-w-4xl items-center gap-3">
        <div className="hidden h-12 w-12 shrink-0 sm:block">
          <ImagePlaceholder label={FIXED_BAR.imageLabel} src={FIXED_BAR.image} aspectRatio="1/1" rounded="rounded-xl" sizes="48px" className="!text-[6px] [&_span_span]:hidden" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1 text-[#F5B942]">
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon key={i} className="h-3.5 w-3.5" />
            ))}
            <span className="ml-1 text-xs font-bold text-foreground">{BRAND.ratingValue}</span>
          </div>
          <p className="truncate text-xs text-muted">
            <span className="font-semibold text-foreground">{BRAND.name}</span> · {FIXED_BAR.sub}
          </p>
        </div>
        <Button href="/#offer" variant="urgent" className="shrink-0 tracking-wide">
          {FIXED_BAR.label}
        </Button>
      </div>
    </div>
  );
}
