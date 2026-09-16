import Image from "next/image";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import { StarIcon } from "@/components/ui/Icons";
import { BRAND, GUARANTEE, HERO, PROMO } from "@/lib/constants";

/**
 * The source PNG (260 × 228) has the gold seal off-center inside the black disc
 * (seal center ≈ 150,108 vs. image center 130,114). We re-center it in CSS:
 * shift the image left/down by that offset and zoom slightly so the black
 * background still fills the circular crop.
 */
const SEAL_OFFSET_X = -((150 - 130) / 228) * 100; // ≈ -8.8 %
const SEAL_OFFSET_Y = ((114 - 108) / 228) * 100; // ≈ +2.6 %
const SEAL_ZOOM = 1.12;

/** Centered guarantee block — seal on top, copy below. */
export default function Guarantee() {
  return (
    <section className="py-16 lg:py-20">
      <Container>
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <div className="relative aspect-square w-40 overflow-hidden rounded-full bg-[#0A0A0A] sm:w-48">
            <Image
              src={GUARANTEE.seal}
              alt={GUARANTEE.sealLabel}
              fill
              sizes="192px"
              className="object-cover"
              style={{
                transform: `translate(${SEAL_OFFSET_X}%, ${SEAL_OFFSET_Y}%) scale(${SEAL_ZOOM})`,
              }}
            />
          </div>
          <h2 className="mt-8 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{GUARANTEE.headline}</h2>
          <p className="mt-3 max-w-xl leading-relaxed text-muted">{GUARANTEE.text}</p>

          {/* Closing box (model §3.12): kit image, offer, stock bar, avatars, in-stock badge, CTA */}
          <div className="mt-10 w-full rounded-3xl border-2 border-dashed border-gray-300 bg-white p-6 sm:p-8">
            <div className="mx-auto w-48">
              <ImagePlaceholder label={GUARANTEE.boxImageLabel} src={GUARANTEE.boxImage} aspectRatio="1/1" rounded="rounded-2xl" sizes="192px" />
            </div>
            <h3 className="mt-6 text-xl font-extrabold uppercase tracking-wide text-foreground sm:text-2xl">{PROMO.badge}</h3>
            <div className="mx-auto mt-4 h-3 w-full max-w-md overflow-hidden rounded-full bg-gray-200">
              <div className="h-full rounded-full bg-blue-400" style={{ width: `${GUARANTEE.stockPercent}%` }} />
            </div>
            <p className="mt-2 text-sm text-muted">{GUARANTEE.stockText}</p>
            <div className="mt-5 flex items-center justify-center gap-3">
              <div className="flex -space-x-2">
                {HERO.avatars.map((src, i) => (
                  <div key={i} className="h-8 w-8 overflow-hidden rounded-full border-2 border-white shadow-card">
                    <ImagePlaceholder label={`Customer ${i + 1}`} src={src} aspectRatio="1/1" rounded="rounded-full" sizes="32px" className="!text-[6px] [&_span_span]:hidden" />
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-1 text-[#F5B942]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} className="h-4 w-4" />
                ))}
                <span className="ml-1 text-sm font-bold text-foreground">{BRAND.ratingValue}</span>
              </div>
            </div>
            <span className="mt-4 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">✅ {GUARANTEE.inStock}</span>
            <div className="mt-6">
              <Button href="/#offer" variant="buy" size="lg" className="w-full tracking-wide sm:w-auto sm:min-w-[340px]">
                {PROMO.ctaLabel}
              </Button>
            </div>
            <p className="mt-3 text-sm text-muted">{GUARANTEE.closing}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
