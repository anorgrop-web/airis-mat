import Link from "next/link";
import Container from "@/components/ui/Container";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import { ArrowIcon } from "@/components/ui/Icons";
import { KEY_BENEFITS } from "@/lib/constants";

/** 4 × 2 icon grid — plain, no cards. */
export default function KeyBenefits() {
  return (
    <section id="benefits" className="py-20 lg:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-[0.06em] text-foreground sm:text-3xl">
            {KEY_BENEFITS.headline}
          </h2>
          <p className="mt-3 text-lg text-muted">{KEY_BENEFITS.subheadline}</p>
        </div>

        <ul className="mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-4">
          {KEY_BENEFITS.items.map((item) => (
            <li key={item.label} className="flex flex-col items-center text-center">
              <div className="h-24 w-24">
                <ImagePlaceholder
                  label={item.iconLabel}
                  src={item.image}
                  aspectRatio="1/1"
                  rounded="rounded-full"
                  sizes="96px"
                  className="!text-[8px]"
                />
              </div>
              <p className="mt-4 text-sm font-semibold leading-snug text-foreground sm:text-base">
                {item.label}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-12 text-center">
          <Link
            href="/#technology"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary-dark underline-offset-4 hover:underline"
          >
            {KEY_BENEFITS.moreLink}
            <ArrowIcon className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
