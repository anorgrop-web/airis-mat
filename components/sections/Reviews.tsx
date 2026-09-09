import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import { CheckIcon, StarIcon } from "@/components/ui/Icons";
import { CTA, REVIEWS, type Review } from "@/lib/constants";

function Stars({ rating, className = "h-4 w-4" }: { rating: number; className?: string }) {
  return (
    <div className="flex text-[#F5B942]" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon key={i} filled={i < rating} className={className} />
      ))}
    </div>
  );
}

function Author({ review, size = "md" }: { review: Review; size?: "md" | "lg" }) {
  const avatar = size === "lg" ? "h-14 w-14" : "h-10 w-10";
  return (
    <div className="flex items-center gap-3">
      <div className={`${avatar} shrink-0`}>
        <ImagePlaceholder label={review.imageLabel} src={review.image} aspectRatio="1/1" rounded="rounded-full" sizes="56px" className="!text-[7px]" />
      </div>
      <div>
        <p className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
          {review.name}
          <span className="inline-flex items-center gap-0.5 text-[11px] font-medium text-secondary-dark">
            <CheckIcon className="h-3 w-3" /> Verified
          </span>
        </p>
        <p className="text-xs text-muted">{review.location}</p>
      </div>
    </div>
  );
}

/** One large featured review on the left, 2 × 2 grid of short reviews on the right. */
export default function Reviews() {
  const { featured, items } = REVIEWS;

  return (
    <section id="reviews" className="bg-white py-20 lg:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl">
            {REVIEWS.headline}
          </h2>
          <p className="mt-3 text-lg text-muted">{REVIEWS.subheadline}</p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-5">
          {/* Featured */}
          <figure className="flex flex-col rounded-3xl bg-background p-7 shadow-card lg:col-span-2 lg:p-9">
            <Stars rating={featured.rating} className="h-5 w-5" />
            <h3 className="mt-4 text-xl font-bold leading-snug text-foreground">{featured.title}</h3>
            <blockquote className="mt-3 flex-1 leading-relaxed text-foreground/85">“{featured.quote}”</blockquote>
            <figcaption className="mt-6">
              <Author review={featured} size="lg" />
            </figcaption>
            <div className="mt-7">
              {/* TODO: analytics — track reviews CTA click */}
              <Button href="#offer" className="w-full">
                {CTA.orderNow}
              </Button>
            </div>
          </figure>

          {/* 2 × 2 grid */}
          <ul className="grid gap-6 sm:grid-cols-2 lg:col-span-3">
            {items.map((review) => (
              <li key={review.id}>
                <figure className="flex h-full flex-col rounded-3xl border border-foreground/5 bg-background p-6">
                  <Stars rating={review.rating} />
                  <h3 className="mt-3 font-bold leading-snug text-foreground">{review.title}</h3>
                  <blockquote className="mt-2 flex-1 text-sm leading-relaxed text-muted">“{review.quote}”</blockquote>
                  <figcaption className="mt-5">
                    <Author review={review} />
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
