import Link from "next/link";
import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";
import { BRAND, FOOTER } from "@/lib/constants";

/** Two-column footer: brand + description | links. Centered copyright. */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-foreground/5 bg-white">
      <Container className="py-14">
        <div className="grid gap-10 sm:grid-cols-2">
          <div>
            <Logo className="h-10" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">{FOOTER.description}</p>
          </div>

          <nav aria-label="Footer" className="sm:justify-self-end">
            <ul className="space-y-3">
              {FOOTER.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted transition-colors hover:text-primary-dark">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="mt-12 border-t border-foreground/5 pt-6 text-center text-xs text-muted">
          © {year} {BRAND.name}. All rights reserved. {/* TODO: language switcher EN / FR / DE */}
        </p>
      </Container>
    </footer>
  );
}
