import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import { MARQUEE } from "@/lib/constants";

/** Infinite scrolling strip of uppercase feature labels with icons. */
export default function FeaturesMarquee() {
  // Content is repeated so the 50% translate loop is seamless
  const items = [...MARQUEE, ...MARQUEE, ...MARQUEE];

  return (
    <section aria-label="Key features" className="border-y border-foreground/5 bg-white py-5">
      <div className="overflow-hidden">
        <div className="animate-marquee flex w-max items-center">
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex items-center" aria-hidden={copy === 1}>
              {items.map((item, i) => (
                <li key={`${copy}-${i}`} className="flex items-center gap-4 px-8">
                  <div className="h-8 w-8 shrink-0">
                    <ImagePlaceholder
                      label={item.iconLabel}
                      src={item.image}
                      aspectRatio="1/1"
                      rounded="rounded-lg"
                      sizes="32px"
                      className="!text-[6px] [&_span_span]:hidden"
                    />
                  </div>
                  <span className="whitespace-nowrap text-sm font-bold tracking-[0.18em] text-foreground">
                    {item.label}
                  </span>
                  <span aria-hidden className="ml-4 h-1.5 w-1.5 rounded-full bg-brand-gradient" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
