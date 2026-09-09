"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import { MinusIcon, PlusIcon } from "@/components/ui/Icons";
import { FAQ as FAQ_COPY } from "@/lib/constants";

/** Centered single-column accordion with +/− toggles. All items collapsed by default. */
export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section id="faq" className="py-20 lg:py-24">
      <Container>
        <h2 className="text-center text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {FAQ_COPY.headline}
        </h2>

        <ul className="mx-auto mt-12 max-w-3xl divide-y divide-foreground/10 border-y border-foreground/10">
          {FAQ_COPY.items.map((item) => {
            const open = openId === item.id;
            const panelId = `faq-panel-${item.id}`;
            const buttonId = `faq-button-${item.id}`;
            return (
              <li key={item.id}>
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenId(open ? null : item.id)}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left"
                  >
                    <span className="text-base font-semibold text-foreground sm:text-lg">{item.question}</span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${
                        open ? "bg-primary-soft text-primary-dark" : "bg-foreground/5 text-foreground"
                      }`}
                    >
                      {open ? <MinusIcon className="h-4 w-4" /> : <PlusIcon className="h-4 w-4" />}
                    </span>
                  </button>
                </h3>
                <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!open} className="pb-6 pr-14">
                  <p className="leading-relaxed text-muted">{item.answer}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
