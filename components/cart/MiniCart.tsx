"use client";

import { useEffect } from "react";
import Button from "@/components/ui/Button";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import { CloseIcon } from "@/components/ui/Icons";
import { CART_COPY, CURRENCY, SHIPPING_NOTE, formatPrice } from "@/lib/constants";
import { trackMetaEvent } from "@/lib/meta";
import { useCart } from "./CartProvider";

/** Slide-over mini cart. Opens automatically after "Add to cart"; Checkout goes to the kit's hosted checkout. */
export default function MiniCart() {
  const { lines, count, subtotal, isOpen, close, remove } = useCart();
  const checkoutUrl = lines[0]?.bundle.checkoutUrl;

  // Fires before the browser follows the link; the CAPI call uses keepalive so it survives navigation
  const handleCheckout = () => {
    trackMetaEvent("InitiateCheckout", {
      content_ids: lines.map((l) => l.bundle.id),
      content_type: "product",
      contents: lines.map((l) => ({ id: l.bundle.id, quantity: l.qty, item_price: l.bundle.price })),
      value: subtotal,
      currency: CURRENCY,
      num_items: count,
    });
  };

  // Close on Escape, lock body scroll while open
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen, close]);

  return (
    <div
      aria-hidden={!isOpen}
      className={`fixed inset-0 z-[60] transition ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
    >
      {/* Backdrop */}
      <div
        onClick={close}
        className={`absolute inset-0 bg-foreground/40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={CART_COPY.title}
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between border-b border-foreground/10 px-6 py-5">
          <h2 className="text-lg font-bold text-foreground">
            {CART_COPY.title} <span className="text-muted">• {CART_COPY.items(count)}</span>
          </h2>
          <button
            type="button"
            onClick={close}
            aria-label="Close cart"
            className="flex h-10 w-10 items-center justify-center rounded-full text-foreground hover:bg-background"
          >
            <CloseIcon />
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-2 px-6 text-center">
            <p className="text-lg font-semibold text-foreground">{CART_COPY.emptyTitle}</p>
            <p className="text-sm text-muted">{CART_COPY.emptyText}</p>
            <Button variant="ghost" className="mt-4" onClick={close}>
              Continue shopping
            </Button>
          </div>
        ) : (
          <>
            <ul className="flex-1 space-y-5 overflow-y-auto px-6 py-6">
              {lines.map(({ bundle, qty }) => (
                <li key={bundle.id} className="flex gap-4">
                  <div className="w-20 shrink-0">
                    <ImagePlaceholder
                      label={bundle.imageLabel}
                      src={bundle.image}
                      aspectRatio="1/1"
                      rounded="rounded-xl"
                      sizes="80px"
                      className="!text-[7px]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <p className="font-semibold text-foreground">{bundle.name}</p>
                      <p className="font-semibold text-foreground">{formatPrice(bundle.price * qty)}</p>
                    </div>
                    <p className="text-sm text-muted">{bundle.subtitle}</p>
                    <div className="mt-auto flex items-center justify-end pt-2 text-sm">
                      <button
                        type="button"
                        onClick={() => remove(bundle.id)}
                        className="text-muted underline-offset-4 hover:text-foreground hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <footer className="border-t border-foreground/10 px-6 py-5">
              <div className="flex items-center justify-between text-base">
                <span className="text-muted">{CART_COPY.subtotal}</span>
                <span className="text-lg font-bold text-foreground">{formatPrice(subtotal)}</span>
              </div>
              <p className="mt-1 text-xs text-muted">{SHIPPING_NOTE}</p>
              {checkoutUrl && (
                <Button href={checkoutUrl} size="lg" className="mt-4 w-full" onClick={handleCheckout}>
                  {CART_COPY.checkout}
                </Button>
              )}
              <p className="mt-3 text-center text-xs text-muted">{CART_COPY.checkoutNote}</p>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
