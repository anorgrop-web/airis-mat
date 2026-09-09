import Link from "next/link";
import { LegalEntity } from "@/components/legal/LegalPage";
import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";
import { FOOTER } from "@/lib/constants";
import { COMPANY, LEGAL_LINKS, PAYMENT_METHODS } from "@/lib/legal";

/** Footer: brand | policy links | support — then payment methods, legal entity and copyright. */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-foreground/5 bg-white">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Logo className="h-10" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">{FOOTER.description}</p>
          </div>

          {/* Policies */}
          <nav aria-label="Policies">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground">Policies</h3>
            <ul className="mt-4 space-y-3">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted transition-colors hover:text-primary-dark">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Support */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground">Support</h3>
            <a
              href={`mailto:${COMPANY.supportEmail}`}
              className="mt-4 inline-block text-sm font-semibold text-primary-dark underline-offset-4 hover:underline"
            >
              {COMPANY.supportEmail}
            </a>
            <p className="mt-2 text-sm text-muted">We usually reply within {COMPANY.responseTime}.</p>
            <Link href="/contact" className="mt-3 inline-block text-sm text-muted underline-offset-4 hover:text-primary-dark hover:underline">
              Send us a message →
            </Link>
          </div>
        </div>

        {/* Payment methods */}
        <ul aria-label="Accepted payment methods" className="mt-12 flex flex-wrap gap-2 border-t border-foreground/5 pt-8">
          {PAYMENT_METHODS.map((m) => (
            <li key={m} className="rounded-md border border-foreground/10 bg-background px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-muted">
              {m}
            </li>
          ))}
        </ul>

        {/* Legal entity */}
        <LegalEntity className="mt-8" />

        <p className="mt-6 border-t border-foreground/5 pt-6 text-center text-xs text-muted">
          © {year} {COMPANY.brand}. All rights reserved. ·{" "}
          <a href={`mailto:${COMPANY.supportEmail}`} className="underline-offset-4 hover:text-primary-dark hover:underline">
            {COMPANY.supportEmail}
          </a>
        </p>
      </Container>
    </footer>
  );
}
