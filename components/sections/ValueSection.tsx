import Container from "@/components/ui/Container";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import { VALUE } from "@/lib/constants";

/** Four value cards (model §3.6 Investment). Replaces the placeholder survey stats. */
export default function ValueSection() {
  return (
    <section className="py-20 lg:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl">{VALUE.headline}</h2>
          <p className="mt-3 text-lg text-muted">{VALUE.subheadline}</p>
        </div>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VALUE.items.map((item) => (
            <li key={item.title} className="rounded-3xl border border-foreground/5 bg-white p-6 shadow-card">
              <div className="h-16 w-16">
                <ImagePlaceholder label={item.iconLabel} src={item.image} aspectRatio="1/1" rounded="rounded-2xl" sizes="64px" className="!text-[7px] [&_span_span]:hidden" />
              </div>
              <h3 className="mt-5 text-lg font-bold leading-snug text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">{item.text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
