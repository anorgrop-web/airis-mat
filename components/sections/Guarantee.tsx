import Image from "next/image";
import Container from "@/components/ui/Container";
import { GUARANTEE } from "@/lib/constants";

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
        </div>
      </Container>
    </section>
  );
}
