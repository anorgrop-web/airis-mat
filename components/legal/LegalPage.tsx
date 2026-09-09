import Link from "next/link";
import type { ReactNode } from "react";
import Container from "@/components/ui/Container";
import { COMPANY, LEGAL_LAST_UPDATED, LEGAL_LINKS } from "@/lib/legal";

/** Small "operated by" block reused on every policy page and in the footer. */
export function LegalEntity({ className = "" }: { className?: string }) {
  return (
    <p className={`text-xs leading-relaxed text-muted ${className}`}>
      <span className="font-semibold text-foreground">{COMPANY.brand}</span> · Operated by:{" "}
      {COMPANY.legalName} · CNPJ: {COMPANY.cnpj} · {COMPANY.address}
    </p>
  );
}

type LegalPageProps = {
  eyebrow?: string;
  title: string;
  intro?: string;
  /** Path of the current page, used to hide it from the "Other policies" list. */
  currentPath: string;
  children: ReactNode;
};

/** Shared shell for policy pages: title, last-updated date, prose area, entity block, cross-links. */
export default function LegalPage({ eyebrow = "Legal", title, intro, currentPath, children }: LegalPageProps) {
  const others = LEGAL_LINKS.filter((l) => l.href !== currentPath);

  return (
    <main className="py-14 lg:py-20">
      <Container className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-dark">{eyebrow}</p>
        <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">{title}</h1>
        <p className="mt-3 text-sm text-muted">Last updated: {LEGAL_LAST_UPDATED}</p>
        {intro && <p className="mt-6 text-lg leading-relaxed text-muted">{intro}</p>}

        <div className="legal-prose mt-10">{children}</div>

        <div className="mt-14 rounded-2xl border border-foreground/5 bg-white p-6">
          <LegalEntity />
          <p className="mt-2 text-xs text-muted">
            Questions? Email{" "}
            <a href={`mailto:${COMPANY.supportEmail}`} className="font-medium text-primary-dark underline-offset-4 hover:underline">
              {COMPANY.supportEmail}
            </a>{" "}
            — we usually reply within {COMPANY.responseTime}.
          </p>
        </div>

        <nav aria-label="Other policies" className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {others.map((l) => (
            <Link key={l.href} href={l.href} className="text-muted underline-offset-4 hover:text-primary-dark hover:underline">
              {l.label}
            </Link>
          ))}
        </nav>
      </Container>
    </main>
  );
}
