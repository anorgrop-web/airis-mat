"use client";

import { useEffect, useRef, useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { trackHybridEvent } from "@/components/tracking/hybrid-tracker";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import { BRAND, BUNDLES, BUNDLE_SECTION, CTA, CURRENCY, SHIPPING_NOTE, formatPrice, savePercent, type Bundle } from "@/lib/constants";
import { newEventId } from "@/lib/checkout";

/** Meta/GA4 payload for one kit — the same shape the checkout uses (content_ids = kit id). */
export function bundleEventData(bundle: Bundle) {
  return {
    content_ids: [bundle.id],
    content_name: bundle.name,
    content_type: "product",
    contents: [{ id: bundle.id, quantity: 1, item_price: bundle.price }],
    value: bundle.price,
    currency: CURRENCY,
    num_items: 1,
    items: [{ item_id: bundle.id, item_name: bundle.name, item_brand: BRAND.name, price: bundle.price, quantity: 1 }],
  };
}

/**
 * Radio-style kit cards (section #offer). "Buy 2, Get 1 Free" is pre-selected.
 * Events: ViewContent once in view (0.4), AddToCart when a kit is picked and when
 * it is added to the cart; the cart drawer sends the buyer to the checkout.
 */
export default function BundleSelector() {
  const defaultId = BUNDLES.find((b) => b.badge === "Most popular")?.id ?? BUNDLES[0].id;
  const [selectedId, setSelectedId] = useState(defaultId);
  const selected = BUNDLES.find((b) => b.id === selectedId) ?? BUNDLES[0];
  const { add } = useCart();
  const sectionRef = useRef<HTMLElement>(null);

  // ViewContent — fired once, when the offer actually scrolls into view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        trackHybridEvent(
          "ViewContent",
          {
            ...bundleEventData(selected),
            content_ids: BUNDLES.map((b) => b.id),
            content_name: "Airis Mat kits",
          },
          {},
          newEventId("vc"),
        );
        observer.disconnect();
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAdd = () => {
    add(selected);
    trackHybridEvent("AddToCart", { ...bundleEventData(selected), content_category: "lp_offer" }, {}, newEventId("atc"));
  };

  return (
    <section id="offer" ref={sectionRef} className="bg-white py-20 lg:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{BUNDLE_SECTION.headline}</h2>
          <p className="mt-3 text-muted">{BUNDLE_SECTION.note}</p>
        </div>

        <fieldset className="mx-auto mt-12 max-w-2xl">
          <legend className="sr-only">Select a kit</legend>
          <div className="space-y-4">
            {BUNDLES.map((bundle) => {
              const active = bundle.id === selectedId;
              const saving = bundle.compareAtPrice - bundle.price;
              const popular = bundle.badge === "Most popular";
              return (
                <label
                  key={bundle.id}
                  className={`relative flex cursor-pointer items-center gap-4 rounded-3xl border-2 bg-background p-4 transition-all sm:gap-6 sm:p-5 ${
                    active ? "border-emerald-600 shadow-card ring-4 ring-emerald-600/10" : "border-foreground/10 hover:border-foreground/25"
                  }`}
                >
                  {bundle.badge && (
                    <span
                      className={`absolute -top-3 left-5 rounded-full px-3 py-1 text-[11px] font-bold tracking-wide text-white ${
                        popular ? "bg-orange-500" : "bg-foreground"
                      }`}
                    >
                      {bundle.badge}
                    </span>
                  )}

                  <input type="radio" name="bundle" value={bundle.id} checked={active} onChange={() => setSelectedId(bundle.id)} className="sr-only" />

                  <span aria-hidden className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${active ? "border-emerald-600" : "border-foreground/30"}`}>
                    {active && <span className="h-2.5 w-2.5 rounded-full bg-emerald-600" />}
                  </span>

                  <div className="w-16 shrink-0 sm:w-20">
                    <ImagePlaceholder label={bundle.imageLabel} src={bundle.image} aspectRatio="1/1" rounded="rounded-2xl" sizes="80px" className="!text-[7px]" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-foreground">{bundle.name}</p>
                    <p className="text-sm text-muted">{bundle.subtitle}</p>
                    <p className="mt-1 text-xs font-semibold text-emerald-700">{bundle.contents}</p>
                    <p className="mt-0.5 text-xs font-semibold text-red-600">
                      You save {formatPrice(saving)} ({savePercent(bundle)}%)
                    </p>
                  </div>

                  <div className="shrink-0 text-right">
                    <p className="text-sm text-muted line-through">{formatPrice(bundle.compareAtPrice)}</p>
                    <p className="text-xl font-bold text-foreground">{formatPrice(bundle.price)}</p>
                    <p className="text-xs text-muted">{bundle.units} mats</p>
                  </div>
                </label>
              );
            })}
          </div>
        </fieldset>

        <div className="mx-auto mt-8 max-w-2xl">
          <Button variant="buy" size="lg" className="w-full tracking-wide" onClick={handleAdd}>
            {CTA.addToCart} — {formatPrice(selected.price)}
          </Button>
          <p className="mt-3 text-center text-sm text-muted">{SHIPPING_NOTE}</p>
        </div>
      </Container>
    </section>
  );
}
