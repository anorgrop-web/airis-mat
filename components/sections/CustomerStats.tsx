import Container from "@/components/ui/Container";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import { STATS } from "@/lib/constants";

/** Four stat cards — image on top, big percentage, one-line result. */
export default function CustomerStats() {
  return (
    <section className="py-20 lg:py-24">
      <Container>
        <h2 className="mx-auto max-w-2xl text-center text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl">
          {STATS.headline}
        </h2>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.items.map((stat) => (
            <li
              key={stat.value + stat.text}
              className="overflow-hidden rounded-3xl border border-foreground/5 bg-white shadow-card"
            >
              <ImagePlaceholder
                label={stat.imageLabel}
                src={stat.media}
                aspectRatio="4/3"
                rounded="rounded-none"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
              />
              <div className="p-6">
                <p className="bg-brand-gradient bg-clip-text text-5xl font-extrabold tracking-tight text-transparent">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-foreground sm:text-base">{stat.text}</p>
              </div>
            </li>
          ))}
        </ul>

        {/* TODO: replace placeholder percentages with real survey data + add methodology note */}
        <p className="mt-6 text-center text-xs text-muted">
          Based on a post-purchase survey of Airis Mat customers, 30 days after delivery.
        </p>
      </Container>
    </section>
  );
}
