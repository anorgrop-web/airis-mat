"use client";

import { useEffect, useRef, useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import { BUNDLES, BUNDLE_SECTION, CTA, CURRENCY, SHIPPING_NOTE, formatPrice } from "@/lib/constants";
import { trackMetaEvent } from "@/lib/meta";

/** Radio-style bundle cards; the add-to-cart button reflects the selected price. */
export default function BundleSelector() {
  const defaultId = BUNDLES.find((b) => b.badge?.startsWith("Most popular"))?.id ?? BUNDLES[0].id;
  const [selectedId, setSelectedId] = useState(defaultId);
  const selected = BUNDLES.find((b) => b.id === selectedId) ?? BUNDLES[0];
  const { add } = useCart();
  const sectionRef = useRef<HTMLElement>(null);

  // Meta "ViewContent" — fired once, when the offer actually scrolls into view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        trackMetaEvent("ViewContent", {
          content_ids: BUNDLES.map((b) => b.id),
          content_type: "product",
          content_name: "Airis Mat bundles",
          value: selected.price,
          currency: CURRENCY,
        });
        observer.disconnect();
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAdd = () => {
    // TODO: cart integration — send { bundleId: selected.id, qty: 1 } to the real cart
    add(selected);
    trackMetaEvent("AddToCart", {
      content_ids: [selected.id],
      content_name: selected.name,
      content_type: "product",
      contents: [{ id: selected.id, quantity: 1, item_price: selected.price }],
      value: selected.price,
      currency: CURRENCY,
      num_items: 1,
    });
  };

  return (
    <section id="offer" ref={sectionRef} className="bg-white py-20 lg:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{BUNDLE_SECTION.headline}</h2>
          <p className="mt-3 text-muted">{BUNDLE_SECTION.note}</p>
        </div>

        <fieldset className="mx-auto mt-12 max-w-2xl">
          <legend className="sr-only">Select a package</legend>
          <div className="space-y-4">
            {BUNDLES.map((bundle) => {
              const active = bundle.id === selectedId;
              const saving = bundle.compareAtPrice - bundle.price;
              const perUnit = bundle.units > 1 ? bundle.price / bundle.units : null;
              return (
                <label
                  key={bundle.id}
                  className={`relative flex cursor-pointer items-center gap-4 rounded-3xl border-2 bg-background p-4 transition-all sm:gap-6 sm:p-5 ${
                    active
                      ? "border-primary shadow-card ring-4 ring-primary/10"
                      : "border-foreground/10 hover:border-foreground/25"
                  }`}
                >
                  {bundle.badge && (
                    <span className="absolute -top-3 left-5 rounded-full bg-brand-gradient px-3 py-1 text-[11px] font-bold tracking-wide text-white">
                      {bundle.badge}
                    </span>
                  )}

                  <input
                    type="radio"
                    name="bundle"
                    value={bundle.id}
                    checked={active}
                    onChange={() => setSelectedId(bundle.id)}
                    className="sr-only"
                  />

                  {/* Radio indicator */}
                  <span
                    aria-hidden
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                      active ? "border-primary" : "border-foreground/30"
                    }`}
                  >
                    {active && <span className="h-2.5 w-2.5 rounded-full bg-primary" />}
                  </span>

                  {/* Thumbnail */}
                  <div className="w-16 shrink-0 sm:w-20">
                    <ImagePlaceholder label={bundle.imageLabel} src={bundle.image} aspectRatio="1/1" rounded="rounded-2xl" sizes="80px" className="!text-[7px]" />
                  </div>

                  {/* Name + saving */}
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-foreground">{bundle.name}</p>
                    <p className="truncate text-sm text-muted">{bundle.subtitle}</p>
                    <p className="mt-1 text-xs font-semibold text-secondary-dark">You save {formatPrice(saving)}</p>
                  </div>

                  {/* Price */}
                  <div className="shrink-0 text-right">
                    <p className="text-sm text-muted line-through">{formatPrice(bundle.compareAtPrice)}</p>
                    <p className="text-xl font-bold text-foreground">{formatPrice(bundle.price)}</p>
                    {perUnit && <p className="text-xs text-muted">{formatPrice(perUnit)} per mat</p>}
                  </div>
                </label>
              );
            })}
          </div>
        </fieldset>

        <div className="mx-auto mt-8 max-w-2xl">
          <Button size="lg" className="w-full tracking-wide" onClick={handleAdd}>
            {CTA.addToCart} — {formatPrice(selected.price)}
          </Button>
          <p className="mt-3 text-center text-sm text-muted">{SHIPPING_NOTE}</p>
        </div>
      </Container>
    </section>
  );
}
