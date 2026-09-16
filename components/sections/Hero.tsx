"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import { ArrowIcon, CheckIcon, StarIcon } from "@/components/ui/Icons";
import { HERO, PROMO } from "@/lib/constants";

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

/**
 * Hero (model §3.2): rating line → carousel (first on mobile) → H1 → subheadline → 4 bullets →
 * avatars + customers → in stock → CTA → trust line → 4 guarantee badges.
 */
export default function Hero() {
  return (
    <section id="overview" className="py-8 sm:py-12 lg:py-16">
      <Container className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
        {/* Rating — above the carousel on mobile, above the copy on desktop */}
        <div className="order-1 lg:order-2 lg:col-start-2 lg:row-start-1">
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 shadow-card">
            <div className="flex text-[#F5B942]">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon key={i} className="h-3.5 w-3.5" />
              ))}
            </div>
            <span className="text-xs font-semibold text-foreground">{HERO.rating}</span>
          </div>
        </div>

        {/* Carousel */}
        <div className="order-2 lg:order-1 lg:col-start-1 lg:row-span-2 lg:row-start-1">
          <Carousel />
        </div>

        {/* Copy */}
        <div className="order-3 lg:order-3 lg:col-start-2 lg:row-start-2">
          <h1 className="text-3xl font-bold leading-[1.12] tracking-tight text-foreground sm:text-4xl lg:text-[2.6rem]">
            {HERO.headline}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{HERO.subheadline}</p>

          <ul className="mt-6 space-y-3">
            {HERO.bullets.map((b) => (
              <li key={b} className="flex items-start gap-3 text-[15px] font-medium text-foreground">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <CheckIcon className="h-3.5 w-3.5" />
                </span>
                {b}
              </li>
            ))}
          </ul>

          {/* Social proof + stock */}
          <div className="mt-6 flex items-center gap-3">
            <div className="flex -space-x-2">
              {HERO.avatars.map((src, i) => (
                <div key={i} className="h-9 w-9 overflow-hidden rounded-full border-2 border-white shadow-card">
                  <ImagePlaceholder label={`Customer ${i + 1}`} src={src} aspectRatio="1/1" rounded="rounded-full" sizes="36px" className="!text-[6px] [&_span_span]:hidden" />
                </div>
              ))}
            </div>
            <p className="text-sm font-semibold text-foreground">{HERO.customers}</p>
          </div>
          <p className="mt-3 flex items-center gap-2 text-sm font-medium text-green-600">
            <span className="h-2.5 w-2.5 rounded-full bg-green-500" aria-hidden />
            {HERO.stock}
          </p>

          <div className="mt-7">
            <Button href="/#offer" variant="buy" size="lg" className="w-full tracking-wide sm:w-auto sm:min-w-[340px]">
              {PROMO.ctaLabel}
            </Button>
            <p className="mt-3 text-center text-sm text-muted sm:text-left">{HERO.trust}</p>
          </div>

          <ul className="mt-7 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {HERO.badges.map((b) => (
              <li key={b.label} className="rounded-xl border border-foreground/10 bg-white px-2 py-3 text-center">
                <span aria-hidden className="block text-xl">
                  {b.icon}
                </span>
                <span className="mt-1 block text-[10px] font-bold uppercase tracking-wide text-foreground">{b.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
