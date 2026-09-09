import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import { CheckIcon, CrossIcon } from "@/components/ui/Icons";
import { COMPARISON, PROMO } from "@/lib/constants";

function Yes() {
  return (
    <span className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-secondary/25 text-secondary-dark">
      <CheckIcon className="h-4 w-4" />
      <span className="sr-only">Yes</span>
    </span>
  );
}

function No() {
  return (
    <span className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-red-50 text-red-400">
      <CrossIcon className="h-4 w-4" />
      <span className="sr-only">No</span>
    </span>
  );
}

/** Two-column comparison with product images at the top of each column. */
export default function ComparisonTable() {
  const { airis, cloth } = COMPARISON.columns;

  return (
    <section className="bg-white py-20 lg:py-24">
      <Container>
        <h2 className="text-center text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {COMPARISON.headline}
        </h2>

        <div className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-3xl border border-foreground/5 bg-background shadow-card">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th scope="col" className="w-[44%] px-5 py-5 text-left text-sm font-semibold text-muted sm:px-6">
                  <span className="sr-only">Feature</span>
                </th>
                <th scope="col" className="bg-primary-soft px-3 py-5 text-center">
                  <div className="mx-auto w-20 sm:w-24">
                    <ImagePlaceholder label={airis.imageLabel} src={airis.image} aspectRatio="1/1" rounded="rounded-2xl" sizes="96px" className="!text-[7px]" />
                  </div>
                  <p className="mt-3 text-sm font-bold text-primary-dark sm:text-base">{airis.label}</p>
                </th>
                <th scope="col" className="px-3 py-5 text-center">
                  <div className="mx-auto w-20 sm:w-24">
                    <ImagePlaceholder label={cloth.imageLabel} src={cloth.image} aspectRatio="1/1" rounded="rounded-2xl" sizes="96px" className="!text-[7px]" />
                  </div>
                  <p className="mt-3 text-sm font-bold text-foreground sm:text-base">{cloth.label}</p>
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.rows.map((row) => (
                <tr key={row.feature} className="border-t border-foreground/5">
                  <th scope="row" className="px-5 py-4 text-left text-sm font-medium text-foreground sm:px-6 sm:text-[15px]">
                    {row.feature}
                  </th>
                  <td className="bg-primary-soft/60 px-3 py-4">{row.airis ? <Yes /> : <No />}</td>
                  <td className="px-3 py-4">{row.cloth ? <Yes /> : <No />}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-10 text-center">
          {/* TODO: analytics — track comparison CTA click */}
          <Button href="#offer" size="lg" className="w-full tracking-wide sm:w-auto sm:min-w-[320px]">
            {PROMO.ctaLabel}
          </Button>
        </div>
      </Container>
    </section>
  );
}
