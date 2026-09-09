import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/legal/LegalPage";
import { COMPANY, POLICY } from "@/lib/legal";

export const metadata: Metadata = {
  title: `Terms of Service | ${COMPANY.brand}`,
  description: `The terms that govern your use of the ${COMPANY.brand} website and every purchase made through it.`,
};

const email = COMPANY.supportEmail;

export default function TermsOfServicePage() {
  return (
    <LegalPage
      title="Terms of Service"
      currentPath="/terms-of-service"
      intro="Please read these terms carefully. By using this website or placing an order, you agree to them."
    >
      <h2>1. Introduction</h2>
      <p>
        These Terms of Service (“Terms”) govern your use of the {COMPANY.brand} website at{" "}
        <a href={COMPANY.siteUrl}>{COMPANY.siteHost}</a> (the “Site”) and any purchase you make through it. If you do
        not agree with these Terms, please do not use the Site.
      </p>

      <h2>2. About Us</h2>
      <p>
        The Site and the {COMPANY.brand} brand are operated by {COMPANY.legalName}, CNPJ {COMPANY.cnpj}, registered at{" "}
        {COMPANY.address}. You can reach us at <a href={`mailto:${email}`}>{email}</a>.
      </p>

      <h2>3. Products</h2>
      <p>
        We sell diatomite stone mats and related accessories, sold individually and in kits (for example, the Kit Duo
        and the Kit Bathroom+). Diatomite is a natural mineral: small variations in color, texture, pattern and weight
        between mats are expected and do not constitute a defect. Product images are for illustration; dimensions and
        weights are approximate.
      </p>

      <h2>4. Health and Wellness Statements</h2>
      <p>
        {COMPANY.brand} is a household product, not a medical device. Statements on the Site about moisture, mold and
        indoor air describe how the product works — a mat that dries quickly leaves less damp for mold to grow on — and
        are not medical advice. They are not intended to diagnose, treat, cure or prevent any disease, including asthma,
        allergies or other respiratory conditions. If you have a health concern, consult a qualified professional.
        Customer reviews reflect individual experiences and results vary.
      </p>

      <h2>5. Ordering and Payment</h2>
      <ul>
        <li>You must be at least {POLICY.minimumAge} years old to place an order.</li>
        <li>You agree to provide accurate, current and complete information at checkout.</li>
        <li>Prices are shown in {POLICY.currency}. Payments are processed securely by {POLICY.paymentProcessor}.</li>
        <li>
          An order is accepted when we send the dispatch confirmation. We may refuse or cancel an order — for example, in
          case of suspected fraud, a pricing or stock error, or a shipping destination we cannot serve — and will refund
          any amount already paid.
        </li>
      </ul>

      <h2>6. Pricing and Promotions</h2>
      <p>
        Prices may change at any time, but changes will not affect orders already confirmed. Promotional discounts (such
        as a percentage off or “limited time” offers) apply only during the stated period and cannot be combined unless
        we say otherwise. Compare-at prices reflect our regular selling price. Taxes, where applicable, are shown at
        checkout.
      </p>

      <h2>7. Shipping and Delivery</h2>
      <p>
        Delivery destinations, times and costs are described in our <Link href="/shipping-policy">Shipping Policy</Link>,
        which forms part of these Terms. Delivery dates are estimates; we are not liable for delays caused by carriers,
        customs or events outside our control.
      </p>

      <h2>8. Refunds and Returns</h2>
      <p>
        Every order is covered by our {POLICY.refundWindowDays}-day money-back guarantee. The full conditions are in our{" "}
        <Link href="/refund-policy">Refund Policy</Link>, which forms part of these Terms.
      </p>

      <h2>9. Product Use and Care</h2>
      <p>
        Please follow the care guide supplied with your mat: place it on a flat, dry surface, rinse with water only, let
        it air-dry upright and refresh the surface with the included sanding pad when needed. Do not use soap, bleach or
        oils on the stone, do not drop it, and keep it away from open flames. We are not responsible for damage caused
        by use contrary to these instructions.
      </p>

      <h2>10. Reviews, Testimonials and Statistics</h2>
      <p>
        Reviews and testimonials on the Site are from customers and reflect their personal experience. Any percentages
        or survey results we publish are based on voluntary post-purchase surveys of {COMPANY.brand} customers and are
        provided for information only.
      </p>

      <h2>11. Intellectual Property</h2>
      <p>
        All content on the Site — including text, images, videos, logos, graphics and design — is owned by or licensed
        to {COMPANY.legalName} and protected by copyright and trademark laws. You may not copy, reproduce, distribute or
        create derivative works from any part of the Site without our prior written permission.
      </p>

      <h2>12. Limitation of Liability</h2>
      <p>
        To the fullest extent permitted by law, {COMPANY.legalName} is not liable for any indirect, incidental, special
        or consequential damages arising from your use of the Site or the products. Our total liability for any claim
        related to an order is limited to the amount you paid for that order. Nothing in these Terms limits liability
        that cannot be limited by law, including mandatory consumer rights.
      </p>

      <h2>13. Force Majeure</h2>
      <p>
        We are not responsible for failure or delay in performing our obligations caused by events beyond our reasonable
        control, including natural disasters, strikes, carrier disruptions, pandemics, government actions or failures of
        third-party services.
      </p>

      <h2>14. Governing Law and Consumer Rights</h2>
      <p>
        These Terms are governed by the laws of Brazil. If you are a consumer, you also benefit from the mandatory
        consumer-protection rules of the country or state where you live (for example, US state law), and nothing in
        these Terms takes those rights away.
      </p>

      <h2>15. Dispute Resolution</h2>
      <p>
        If you have a problem, contact us first at <a href={`mailto:${email}`}>{email}</a> — most issues are resolved
        within a few days. If we cannot reach an agreement within 30 days, either party may pursue the remedies
        available under applicable law.
      </p>

      <h2>16. Changes to These Terms</h2>
      <p>
        We may update these Terms from time to time. The current version is always available on this page with its
        “Last updated” date. Orders are governed by the Terms in force when the order was placed.
      </p>

      <h2>17. Severability</h2>
      <p>
        If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions continue in
        full force and effect.
      </p>

      <h2>18. Contact Us</h2>
      <p>
        Email: <a href={`mailto:${email}`}>{email}</a>
        <br />
        {COMPANY.legalName} · CNPJ: {COMPANY.cnpj}
        <br />
        {COMPANY.address}
      </p>
    </LegalPage>
  );
}
