"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import { ArrowIcon } from "@/components/ui/Icons";
import { PROBLEM } from "@/lib/constants";

/**
 * Problem section (model §3.3): black marquee + h2 + three "why it fails" cards.
 * Desktop: grid of 3. Mobile: manual carousel with arrows and dots.
 */
export default function ProblemSection() {
  const [slide, setSlide] = useState(0);
  const total = PROBLEM.items.length;
  const go = (i: number) => setSlide((i + total) % total);
  const marquee = [...PROBLEM.marquee, ...PROBLEM.marquee, ...PROBLEM.marquee];

  return (
    <section id="problem" className="bg-white">
      {/* Black marquee */}
      <div className="overflow-hidden bg-black py-3 text-white">
        <div className="animate-marquee flex w-max items-center">
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex items-center" aria-hidden={copy === 1}>
              {marquee.map((t, i) => (
                <li key={`${copy}-${i}`} className="flex items-center whitespace-nowrap px-6 text-xs font-bold uppercase tracking-[0.18em]">
                  {t}
                  <span aria-hidden className="ml-6 h-1.5 w-1.5 rounded-full bg-white/60" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      <Container className="py-20 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">{PROBLEM.headline}</h2>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{PROBLEM.subheadline}</p>
          <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-gray-300" aria-hidden />
        </div>

        {/* Desktop grid */}
        <ul className="mt-14 hidden gap-8 md:grid md:grid-cols-3">
          {PROBLEM.items.map((item) => (
            <li key={item.id} className="overflow-hidden rounded-3xl border border-foreground/5 bg-background shadow-card">
              <ImagePlaceholder label={item.imageLabel} src={item.image} aspectRatio="4/3" rounded="rounded-none" sizes="(max-width: 1024px) 50vw, 380px" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{item.text}</p>
              </div>
            </li>
          ))}
        </ul>

        {/* Mobile carousel */}
        <div className="relative mt-10 md:hidden">
          <div className="overflow-hidden rounded-3xl">
            <ul className="flex transition-transform duration-300" style={{ transform: `translateX(-${slide * 100}%)` }}>
              {PROBLEM.items.map((item) => (
                <li key={item.id} className="w-full shrink-0 overflow-hidden rounded-3xl border border-foreground/5 bg-background shadow-card">
                  <ImagePlaceholder label={item.imageLabel} src={item.image} aspectRatio="4/3" rounded="rounded-none" sizes="100vw" />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
                    <p className="mt-3 leading-relaxed text-muted">{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <button type="button" onClick={() => go(slide - 1)} aria-label="Previous" className="absolute left-2 top-[28%] flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-card">
            <ArrowIcon className="h-5 w-5 rotate-180" />
          </button>
          <button type="button" onClick={() => go(slide + 1)} aria-label="Next" className="absolute right-2 top-[28%] flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-card">
            <ArrowIcon className="h-5 w-5" />
          </button>
          <div className="mt-4 flex justify-center gap-2">
            {PROBLEM.items.map((item, i) => (
              <button key={item.id} type="button" aria-label={`Go to ${item.title}`} onClick={() => setSlide(i)} className={`h-2 w-2 rounded-full ${i === slide ? "bg-gray-800" : "bg-gray-300"}`} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
