"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { bundleEventData } from "@/components/sections/BundleSelector";
import { trackHybridEvent } from "@/components/tracking/hybrid-tracker";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import { ArrowIcon, CheckIcon, ShieldIcon, StarIcon, StoneIcon, TruckIcon, UsersIcon } from "@/components/ui/Icons";
import PaymentIcons from "@/components/ui/PaymentIcons";
import { newEventId } from "@/lib/checkout";
import { BUNDLES, CTA, HERO, PROMO, formatPrice, savePercent } from "@/lib/constants";

/** Mixed image/video carousel; thumbnails show the first four slides (model §3.2). */
function Carousel() {
  const [index, setIndex] = useState(0);
  const total = HERO.slides.length;
  const go = (i: number) => setIndex((i + total) % total);

  return (
    <div className="w-full">
      <div className="relative">
        <ImagePlaceholder
          label={HERO.slides[index].label}
          src={HERO.slides[index].src}
          aspectRatio="1/1"
          rounded="rounded-3xl"
          sizes="(max-width: 1024px) 100vw, 600px"
          priority={index === 0}
        />

        <button
          type="button"
          onClick={() => go(index - 1)}
          aria-label="Previous image"
          className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-foreground shadow-card hover:bg-white"
        >
          <ArrowIcon className="h-5 w-5 rotate-180" />
        </button>
        <button
          type="button"
          onClick={() => go(index + 1)}
          aria-label="Next image"
          className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-foreground shadow-card hover:bg-white"
        >
          <ArrowIcon className="h-5 w-5" />
        </button>

        <span className="absolute left-4 top-4 rounded-full bg-red-600 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-wide text-white shadow-card">
          {PROMO.headline}
        </span>
        <span className="absolute bottom-4 right-4 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-semibold text-white">
          {index + 1} / {total}
        </span>
      </div>

      <div className="mt-3 grid grid-cols-4 gap-2">
        {HERO.slides.slice(0, 4).map((slide, i) => (
          <button
            key={slide.label}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Show image ${i + 1}`}
            aria-current={i === index}
            className={`overflow-hidden rounded-xl border-2 transition-colors ${
              i === index ? "border-emerald-600" : "border-transparent hover:border-foreground/20"
            }`}
          >
            <ImagePlaceholder
              label={slide.label}
              src={slide.src}
              aspectRatio="1/1"
              rounded="rounded-[10px]"
              sizes="120px"
              className="!text-[9px] [&_span_span]:hidden"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

const TRUST_ICONS = { users: UsersIcon, truck: TruckIcon, shield: ShieldIcon, stone: StoneIcon } as const;

/** Adds business days (Mon–Fri) to a date. */
function addBusinessDays(from: Date, days: number): Date {
  const d = new Date(from);
  let left = days;
  while (left > 0) {
    d.setDate(d.getDate() + 1);
    const day = d.getDay();
    if (day !== 0 && day !== 6) left -= 1;
  }
  return d;
}

/**
 * "Free delivery Tue, Oct 7 – Mon, Oct 13" (Amazon-style window). Computed after
 * mount so the server-rendered HTML never disagrees with the visitor's clock.
 */
function DeliveryEstimate() {
  const [range, setRange] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", { weekday: "short", month: "short", day: "numeric" });
    const now = new Date();
    const from = addBusinessDays(now, HERO.delivery.minBusinessDays);
    const to = addBusinessDays(now, HERO.delivery.maxBusinessDays);
    setRange(`${fmt.format(from)} – ${fmt.format(to)}`);
  }, []);

  return (
    <p className="flex items-center justify-center gap-2 text-sm text-foreground">
      <TruckIcon className="h-4 w-4 shrink-0 text-emerald-700" />
      <span>
        <span className="font-semibold">{HERO.delivery.prefix}</span>
        {range ? (
          <>
            {" "}
            <span className="font-semibold">{range}</span>
          </>
        ) : (
          " to the US"
        )}
      </span>
    </p>
  );
}

function Stars({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <span className="flex text-[#F5B942]">
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon key={i} className={className} />
      ))}
    </span>
  );
}

/**
 * Hero = product buy box (US e-commerce pattern, see HERO in lib/constants.ts):
 * gallery → stars → product name → price / strikethrough / Save % → size →
 * bundle picker → Add to cart → delivery window → payment icons → trust list → benefits.
 * Add to cart opens the cart drawer (same flow and events as the #offer section).
 */
export default function Hero() {
  const defaultId = BUNDLES.find((b) => b.badge === "Most popular")?.id ?? BUNDLES[0].id;
  const [selectedId, setSelectedId] = useState(defaultId);
  const selected = BUNDLES.find((b) => b.id === selectedId) ?? BUNDLES[0];
  const { add } = useCart();

  const handleAdd = () => {
    add(selected);
    trackHybridEvent("AddToCart", { ...bundleEventData(selected), content_category: "lp_hero" }, {}, newEventId("atc"));
  };

  return (
    <section id="overview" className="pb-12 pt-4 sm:py-12 lg:py-16">
      <Container className="grid items-start gap-6 lg:grid-cols-2 lg:gap-14">
        {/* Gallery — first on mobile, left column (sticky) on desktop */}
        <div className="lg:sticky lg:top-28">
          <Carousel />
        </div>

        {/* Buy box */}
        <div>
          <a href="#reviews" className="inline-flex items-center gap-2 text-sm text-foreground hover:underline">
            <Stars />
            <span className="font-semibold">{HERO.ratingValue}</span>
            <span className="text-muted">({HERO.ratingLabel})</span>
          </a>

          <h1 className="mt-2 text-[1.75rem] font-bold leading-tight tracking-tight text-foreground sm:text-4xl">{HERO.headline}</h1>
          <p className="mt-1.5 text-[15px] font-semibold leading-snug text-foreground/80">{HERO.subheadline}</p>

          {/* Price — follows the selected bundle */}
          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="text-3xl font-extrabold tracking-tight text-foreground">{formatPrice(selected.price)}</span>
            <span className="text-lg text-muted line-through">{formatPrice(selected.compareAtPrice)}</span>
            <span className="rounded-full bg-red-600 px-2.5 py-1 text-xs font-extrabold uppercase tracking-wide text-white">
              Save {savePercent(selected)}%
            </span>
          </div>
          <p className="mt-1 text-sm font-semibold text-emerald-700">
            {selected.contents}
          </p>

          <div className="my-5 h-px bg-foreground/10" />

          {/* Size — one size today, listed the way US stores do */}
          <div>
            <p className="text-sm text-foreground">
              <span className="font-bold">Size:</span> {HERO.size.name}
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="rounded-full border-2 border-foreground bg-white px-4 py-2 text-sm font-semibold text-foreground">
                {HERO.size.name} ({HERO.size.inches})
              </span>
            </div>
            <p className="mt-2 text-xs text-muted">{HERO.size.detail}</p>
          </div>

          {/* Bundle picker (quantity breaks) */}
          <fieldset className="mt-5">
            <legend className="text-sm text-foreground">
              <span className="font-bold">{HERO.bundleLabel}:</span> {selected.name}
            </legend>
            <div className="mt-3 space-y-2.5">
              {BUNDLES.map((bundle) => {
                const active = bundle.id === selectedId;
                const popular = bundle.badge === "Most popular";
                return (
                  <label
                    key={bundle.id}
                    className={`relative flex cursor-pointer items-center gap-3 rounded-2xl border-2 bg-white p-3 transition-all ${
                      active ? "border-emerald-600 ring-4 ring-emerald-600/10" : "border-foreground/10 hover:border-foreground/25"
                    }`}
                  >
                    {popular && (
                      <span className="absolute -top-2.5 right-3 rounded-full bg-orange-500 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                        {bundle.badge}
                      </span>
                    )}
                    <input
                      type="radio"
                      name="hero-bundle"
                      value={bundle.id}
                      checked={active}
                      onChange={() => setSelectedId(bundle.id)}
                      className="sr-only"
                    />
                    <span
                      aria-hidden
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                        active ? "border-emerald-600" : "border-foreground/30"
                      }`}
                    >
                      {active && <span className="h-2.5 w-2.5 rounded-full bg-emerald-600" />}
                    </span>
                    <div className="w-12 shrink-0">
                      <ImagePlaceholder
                        label={bundle.imageLabel}
                        src={bundle.image}
                        aspectRatio="1/1"
                        rounded="rounded-lg"
                        sizes="48px"
                        className="!text-[6px] [&_span_span]:hidden"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold leading-tight text-foreground">{bundle.name}</p>
                      <p className="mt-0.5 text-xs font-semibold text-emerald-700">{bundle.contents}</p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-base font-bold leading-tight text-foreground">{formatPrice(bundle.price)}</p>
                      <p className="text-xs text-muted line-through">{formatPrice(bundle.compareAtPrice)}</p>
                    </div>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <p className="mt-4 flex items-center gap-2 text-sm font-medium text-green-700">
            <span className="h-2.5 w-2.5 rounded-full bg-green-500" aria-hidden />
            {HERO.stock}
          </p>

          <Button variant="buy" size="lg" className="mt-3 w-full tracking-wide" onClick={handleAdd}>
            {CTA.addToCart} — {formatPrice(selected.price)}
          </Button>

          <div className="mt-3 space-y-3">
            <DeliveryEstimate />
            <PaymentIcons />
          </div>

          {/* Trust list (Modrnizd-style icon lines) */}
          <ul className="mt-6 space-y-2.5">
            {HERO.trustList.map((t) => {
              const Icon = TRUST_ICONS[t.icon];
              return (
                <li key={t.label} className="flex items-center gap-3 text-sm text-foreground">
                  <Icon className="h-5 w-5 shrink-0 text-foreground/70" />
                  {t.label}
                </li>
              );
            })}
          </ul>

          {/* Benefits */}
          <div className="mt-6 rounded-2xl bg-white p-4 shadow-card">
            <p className="text-sm font-bold text-foreground">{HERO.bulletsTitle}</p>
            <ul className="mt-3 space-y-2">
              {HERO.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-sm text-foreground">
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                    <CheckIcon className="h-3 w-3" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
