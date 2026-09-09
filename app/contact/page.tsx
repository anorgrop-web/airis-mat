import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/contact/ContactForm";
import { LegalEntity } from "@/components/legal/LegalPage";
import Container from "@/components/ui/Container";
import { COMPANY, LEGAL_LAST_UPDATED, PAYMENT_METHODS } from "@/lib/legal";

export const metadata: Metadata = {
  title: `Contact Us | ${COMPANY.brand}`,
  description: `Get in touch with the ${COMPANY.brand} team. We usually reply within ${COMPANY.responseTime}.`,
};

export default function ContactPage() {
  return (
    <main className="py-14 lg:py-20">
      <Container className="max-w-5xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-dark">Support</p>
        <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">Contact Us</h1>
        <p className="mt-3 text-sm text-muted">Last updated: {LEGAL_LAST_UPDATED}</p>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          Have a question? We’re here to help. Whether you need help with your order, have a question about caring for
          your mat, or just want to say hello — we’d love to hear from you.
        </p>

        <div className="mt-12 grid gap-10 lg:grid-cols-5 lg:gap-14">
          {/* Form */}
          <div className="rounded-3xl border border-foreground/5 bg-white p-6 shadow-card sm:p-8 lg:col-span-3">
            <ContactForm />
          </div>

          {/* Details */}
          <aside className="space-y-8 lg:col-span-2">
            <div>
              <h2 className="text-lg font-bold text-foreground">Email support</h2>
              <a
                href={`mailto:${COMPANY.supportEmail}`}
                className="mt-2 inline-block text-base font-semibold text-primary-dark underline-offset-4 hover:underline"
              >
                {COMPANY.supportEmail}
              </a>
              <p className="mt-2 text-sm text-muted">We usually reply within {COMPANY.responseTime}.</p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-foreground">Writing about an order?</h2>
              <p className="mt-2 text-sm text-muted">To help us answer faster, please include:</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted">
                <li>Your order number or the email used at checkout</li>
                <li>A brief description of the issue</li>
                <li>Photos, if something arrived damaged or incorrect</li>
              </ul>
              <p className="mt-3 text-sm text-muted">
                See our <Link href="/refund-policy" className="font-medium text-primary-dark underline-offset-4 hover:underline">Refund Policy</Link>{" "}
                and{" "}
                <Link href="/shipping-policy" className="font-medium text-primary-dark underline-offset-4 hover:underline">Shipping Policy</Link>{" "}
                for the most common answers.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-foreground">Business details</h2>
              <LegalEntity className="mt-2" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-foreground">Payment methods accepted</h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {PAYMENT_METHODS.map((m) => (
                  <li key={m} className="rounded-full border border-foreground/10 bg-white px-3 py-1 text-xs font-medium text-foreground">
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </Container>
    </main>
  );
}
