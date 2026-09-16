"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import { ArrowIcon, StarIcon } from "@/components/ui/Icons";
import { TESTIMONIALS } from "@/lib/constants";

function Card({ item }: { item: (typeof TESTIMONIALS.items)[number] }) {
  return (
    <figure className="flex h-full flex-col overflow-hidden rounded-3xl border border-foreground/5 bg-white shadow-card">
      <ImagePlaceholder label={item.imageLabel} src={item.image} aspectRatio="1/1" rounded="rounded-none" sizes="(max-width: 1024px) 100vw, 380px" />
      <div className="flex flex-1 flex-col p-6">
        <div className="flex text-[#F5B942]">
          {Array.from({ length: 5 }).map((_, i) => (
            <StarIcon key={i} className="h-4 w-4" />
          ))}
        </div>
        <blockquote className="mt-3 flex-1 leading-relaxed text-foreground/85">“{item.quote}”</blockquote>
        <figcaption className="mt-4 text-sm">
          <span className="font-bold text-foreground">{item.name}</span>
          <span className="text-muted"> · {item.location}</span>
        </figcaption>
      </div>
    </figure>
  );
}

/** Three customer stories with photo (model §3.8). Desktop grid, mobile carousel. */
export default function Testimonials() {
  const [slide, setSlide] = useState(0);
  const total = TESTIMONIALS.items.length;
  const go = (i: number) => setSlide((i + total) % total);

  return (
    <section className="bg-background py-20 lg:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl">{TESTIMONIALS.headline}</h2>
          <p className="mt-3 text-lg text-muted">{TESTIMONIALS.subheadline}</p>
        </div>

        <ul className="mt-14 hidden gap-8 lg:grid lg:grid-cols-3">
          {TESTIMONIALS.items.map((item) => (
            <li key={item.id}>
              <Card item={item} />
            </li>
          ))}
        </ul>

        <div className="relative mt-10 lg:hidden">
          <div className="overflow-hidden">
            <ul className="flex transition-transform duration-300" style={{ transform: `translateX(-${slide * 100}%)` }}>
              {TESTIMONIALS.items.map((item) => (
                <li key={item.id} className="w-full shrink-0 px-1">
                  <Card item={item} />
                </li>
              ))}
            </ul>
          </div>
          <button type="button" onClick={() => go(slide - 1)} aria-label="Previous" className="absolute left-3 top-[30%] flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-card">
            <ArrowIcon className="h-5 w-5 rotate-180" />
          </button>
          <button type="button" onClick={() => go(slide + 1)} aria-label="Next" className="absolute right-3 top-[30%] flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-card">
            <ArrowIcon className="h-5 w-5" />
          </button>
          <div className="mt-4 flex justify-center gap-2">
            {TESTIMONIALS.items.map((item, i) => (
              <button key={item.id} type="button" aria-label={`Go to testimonial ${i + 1}`} onClick={() => setSlide(i)} className={`h-2 w-2 rounded-full ${i === slide ? "bg-gray-800" : "bg-gray-300"}`} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
