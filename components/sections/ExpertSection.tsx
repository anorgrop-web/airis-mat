import Container from "@/components/ui/Container";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import { StarIcon } from "@/components/ui/Icons";
import { EXPERT } from "@/lib/constants";

/** Authority block (model §3.10): seal card + physician with photo, credential, first-person quote and signature. */
export default function ExpertSection() {
  return (
    <section id="expert" className="bg-background py-20 lg:py-24">
      <Container>
        {/* Seal card */}
        <div className="mx-auto max-w-3xl rounded-3xl border-2 border-gray-200 bg-white p-6 text-center sm:p-8">
          <span className="inline-block -rotate-3 rounded-lg bg-gray-900 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.14em] text-white">
            {EXPERT.seal}
          </span>
          <div className="mt-4 flex justify-center text-[#F5B942]">
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon key={i} className="h-5 w-5" />
            ))}
          </div>
          <h3 className="mt-3 text-xl font-bold text-foreground sm:text-2xl">{EXPERT.cardTitle}</h3>
          <p className="mt-2 text-muted">{EXPERT.cardText}</p>
        </div>

        {/* Physician */}
        <div className="mx-auto mt-14 grid max-w-5xl items-center gap-10 lg:grid-cols-5 lg:gap-16">
          <div className="mx-auto w-full max-w-sm lg:col-span-2">
            <ImagePlaceholder label={EXPERT.imageLabel} src={EXPERT.image} aspectRatio="4/5" rounded="rounded-3xl" sizes="(max-width: 1024px) 384px, 420px" />
          </div>
          <div className="lg:col-span-3">
            <h2 className="text-3xl font-bold leading-tight tracking-tight text-foreground lg:text-4xl">{EXPERT.headline}</h2>
            <p className="mt-2 text-lg font-semibold text-primary-dark">{EXPERT.role}</p>
            <blockquote className="mt-6 text-lg leading-relaxed text-foreground/85">“{EXPERT.quote}”</blockquote>
            <div className="mt-6">
              <svg viewBox="0 0 220 48" className="h-12 w-56 text-foreground" aria-hidden>
                <path
                  d="M6 34c14-22 26-24 24-14-2 8-10 14-4 16 8 2 20-22 26-20 4 1-2 14 4 14 8 0 16-20 22-18 4 2-4 16 2 16 8 0 14-16 22-16 6 0 0 14 6 14 8 0 20-20 26-18 4 2-6 16 0 16 6 0 14-14 22-14 6 0 2 12 8 12 6 0 12-10 18-10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
              <p className="mt-1 text-sm font-semibold text-foreground">{EXPERT.name}</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
