import Container from "@/components/ui/Container";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import { TECH_BLOCKS } from "@/lib/constants";

/** Three image/text blocks, alternating image left → right → left. */
export default function TechnologyBlocks() {
  return (
    <section id="technology" className="bg-white py-20 lg:py-24">
      <Container className="space-y-20 lg:space-y-28">
        {TECH_BLOCKS.map((block, i) => {
          const imageRight = i % 2 === 1;
          return (
            <div key={block.id} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <div className={imageRight ? "lg:order-2" : ""}>
                <ImagePlaceholder label={block.imageLabel} src={block.media} aspectRatio="4/3" rounded="rounded-3xl" />
              </div>
              <div className={imageRight ? "lg:order-1" : ""}>
                <h2 className="text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                  {block.headline}
                </h2>
                <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">{block.text}</p>
              </div>
            </div>
          );
        })}
      </Container>
    </section>
  );
}
