import Container from "@/components/ui/Container";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import { STEPS } from "@/lib/constants";

/** Three numbered steps — number + title + text, image below. */
export default function SetupSteps() {
  return (
    <section className="py-20 lg:py-24">
      <Container>
        <h2 className="text-center text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {STEPS.headline}
        </h2>

        <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {STEPS.items.map((step, i) => (
            <li key={step.title}>
              <div className="flex items-baseline gap-3">
                <span className="bg-brand-gradient bg-clip-text text-4xl font-extrabold text-transparent">
                  {i + 1}
                </span>
                <h3 className="text-xl font-bold text-foreground">{step.title}</h3>
              </div>
              <p className="mt-2 leading-relaxed text-muted">{step.text}</p>
              <div className="mt-5">
                <ImagePlaceholder
                  label={step.imageLabel}
                  src={step.image}
                  aspectRatio="4/3"
                  rounded="rounded-3xl"
                  sizes="(max-width: 768px) 100vw, 380px"
                />
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
