"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import { ArrowIcon, CheckIcon, StarIcon } from "@/components/ui/Icons";
import { HERO, PROMO } from "@/lib/constants";

function Carousel() {
  const [index, setIndex] = useState(0);
  const total = HERO.slides.length;
  const go = (i: number) => setIndex((i + total) % total);

  return (
    <div className="w-full">
      {/* Main slide */}
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

        <span className="absolute left-4 top-4 rounded-full bg-foreground px-3 py-1.5 text-xs font-bold text-white">
          −{PROMO.percent}%
        </span>
      </div>

      {/* Thumbnails */}
      <div className="mt-3 grid grid-cols-5 gap-2">
        {HERO.slides.map((slide, i) => (
          <button
            key={slide.label}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Show image ${i + 1}`}
            aria-current={i === index}
            className={`overflow-hidden rounded-xl border-2 transition-colors ${
              i === index ? "border-primary" : "border-transparent hover:border-foreground/20"
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

export default function Hero() {
  return (
    <section id="overview" className="py-8 sm:py-12 lg:py-16">
      {/* Rating + headline sit above the carousel */}
      <Container className="text-left">
        <div className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 shadow-card">
          <div className="flex text-[#F5B942]">
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon key={i} className="h-3.5 w-3.5" />
            ))}
          </div>
          <span className="text-xs font-semibold text-foreground">{HERO.rating}</span>
        </div>

        <h1 className="mt-5 max-w-4xl text-3xl font-bold leading-[1.12] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          {HERO.headline}
        </h1>
      </Container>

      <Container className="mt-10 grid items-start gap-10 lg:mt-14 lg:grid-cols-2 lg:gap-14">
        {/* Image carousel — first on mobile, left on desktop */}
        <Carousel />

        {/* Copy */}
        <div className="lg:pt-2">
          <p className="text-base leading-relaxed text-muted sm:text-lg">{HERO.subheadline}</p>

          <ul className="mt-6 space-y-3">
            {HERO.bullets.map((b) => (
              <li key={b} className="flex items-start gap-3 text-[15px] font-medium text-foreground">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary/25 text-secondary-dark">
                  <CheckIcon className="h-3.5 w-3.5" />
                </span>
                {b}
              </li>
            ))}
          </ul>

          <div className="mt-8">
            {/* TODO: analytics — track hero CTA click */}
            <Button href="/#offer" size="lg" className="w-full tracking-wide sm:w-auto sm:min-w-[320px]">
              {PROMO.ctaLabel}
            </Button>
            <p className="mt-3 text-center text-sm text-muted sm:text-left">{HERO.trust}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
