import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { PROMO, PURCHASE_CTA } from "@/lib/constants";

/** Dark full-width band with urgency badge and the main CTA. */
export default function PurchaseCTA() {
  return (
    <section className="bg-foreground py-20 text-white lg:py-24">
      <Container className="text-center">
        <span className="inline-block rounded-full bg-accent px-4 py-1.5 text-xs font-bold tracking-[0.14em] text-foreground">
          {PURCHASE_CTA.badge}
        </span>
        <h2 className="mx-auto mt-6 max-w-2xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
          {PURCHASE_CTA.headline}
        </h2>
        <p className="mt-4 text-sm text-white/70 sm:text-base">{PURCHASE_CTA.note}</p>
        <div className="mt-8">
          {/* TODO: analytics — track purchase CTA click */}
          <Button href="/#offer" size="lg" className="w-full tracking-wide sm:w-auto sm:min-w-[320px]">
            {PROMO.ctaLabel}
          </Button>
        </div>
      </Container>
    </section>
  );
}
