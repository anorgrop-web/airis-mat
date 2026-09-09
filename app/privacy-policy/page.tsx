import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { COMPANY, POLICY } from "@/lib/legal";

export const metadata: Metadata = {
  title: `Privacy Policy | ${COMPANY.brand}`,
  description: `How ${COMPANY.brand} collects, uses, shares and protects your personal information, and the rights you have over it.`,
};

const email = COMPANY.supportEmail;

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      currentPath="/privacy-policy"
      intro={`This policy explains what personal information ${COMPANY.brand} collects when you visit our website or place an order, how we use it, who we share it with and the choices you have.`}
    >
      <h2>1. Introduction</h2>
      <p>
        {COMPANY.brand} (<a href={COMPANY.siteUrl}>{COMPANY.siteHost}</a>) is operated by {COMPANY.legalName} (“we”,
        “us”, “our”). We are committed to protecting your privacy and handling your personal information transparently
        and securely. By using our website you agree to the practices described in this policy.
      </p>

      <h2>2. Information We Collect</h2>
      <h3>Information you provide</h3>
      <ul>
        <li>
          <strong>Order data:</strong> full name, email address, phone number, shipping and billing address, and the
          items you purchase.
        </li>
        <li>
          <strong>Payment information:</strong> handled entirely by our payment processor (see section 4). We never see
          or store your full card number.
        </li>
        <li>
          <strong>Communications:</strong> messages you send us through the contact form or by email, including any
          photos you attach to a support request.
        </li>
      </ul>
      <h3>Information collected automatically</h3>
      <ul>
        <li>IP address, browser type and version, device type and operating system.</li>
        <li>Pages visited, time spent on the site, referring website and the actions you take (for example, adding a kit to the cart).</li>
        <li>Cookie and pixel identifiers described in section 5.</li>
      </ul>

      <h2>3. How We Use Your Information</h2>
      <ul>
        <li>To process and deliver your order and send order confirmations, tracking updates and receipts.</li>
        <li>To provide customer support and handle refunds, replacements and guarantee claims.</li>
        <li>To improve our website, products and customer experience.</li>
        <li>To measure and optimize our advertising (see section 5).</li>
        <li>To send marketing emails, only if you have opted in. You can unsubscribe at any time using the link in every email.</li>
        <li>To prevent fraud and comply with legal obligations.</li>
      </ul>

      <h2>4. Payment Processing</h2>
      <p>
        Payments are processed by {POLICY.paymentProcessor}, a PCI-DSS Level 1 certified payment provider. Your card
        details are transmitted directly to {POLICY.paymentProcessor} over an encrypted connection and are never stored
        on our servers. {POLICY.paymentProcessor}’s privacy policy is available at{" "}
        <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer">
          stripe.com/privacy
        </a>
        .
      </p>

      <h2>5. Cookies and Tracking Technologies</h2>
      <p>We use the following categories of cookies and similar technologies:</p>
      <ul>
        <li>
          <strong>Essential cookies</strong> — required for the cart, checkout and site security to work. These cannot be
          switched off.
        </li>
        <li>
          <strong>Meta (Facebook) Pixel and Conversions API</strong> — we use Meta’s advertising tools to measure the
          effectiveness of our ads and to show you relevant ads on Meta platforms. The Pixel sets the <code>_fbp</code>{" "}
          and <code>_fbc</code> cookies in your browser. In addition, our server sends the same events (such as page
          views, add-to-cart and purchases) to Meta together with your IP address, browser user agent and — where
          applicable — a hashed version of your email address, so that events can be matched and de-duplicated. Meta’s
          data policy is available at{" "}
          <a href="https://www.facebook.com/privacy/policy" target="_blank" rel="noopener noreferrer">
            facebook.com/privacy/policy
          </a>
          .
        </li>
        <li>
          <strong>Analytics</strong> — we may use Google Analytics or a similar service to understand how visitors use
          the site. Data is aggregated and does not identify you personally.
        </li>
      </ul>
      <p>
        You can control cookies through your browser settings, and you can manage the ads you see from Meta in your{" "}
        <a href="https://www.facebook.com/adpreferences" target="_blank" rel="noopener noreferrer">
          Meta ad preferences
        </a>
        . Blocking essential cookies may prevent you from completing a purchase.
      </p>

      <h2>6. Who We Share Your Information With</h2>
      <p>We share personal information only with the service providers we need to run our business:</p>
      <ul>
        <li>{POLICY.paymentProcessor} — to process payments.</li>
        <li>Shipping carriers and fulfilment partners — to deliver your order (name, address, phone number).</li>
        <li>Meta Platforms — advertising measurement, as described in section 5.</li>
        <li>Google — website analytics, if enabled.</li>
        <li>Email and customer-support tools — to send order emails and answer your messages.</li>
      </ul>
      <p>
        We do not sell your personal information. We may disclose information if required by law, to enforce our terms
        or to protect our rights, customers or the public.
      </p>

      <h2>7. Data Retention</h2>
      <ul>
        <li>
          <strong>Order and invoice data:</strong> {POLICY.orderDataRetentionYears} years, to meet accounting and tax
          obligations.
        </li>
        <li>
          <strong>Marketing data:</strong> until you unsubscribe or ask us to delete it.
        </li>
        <li>
          <strong>Analytics data:</strong> up to {POLICY.analyticsRetentionMonths} months.
        </li>
        <li>
          <strong>Support messages:</strong> for as long as needed to resolve your request and for a reasonable period
          afterwards.
        </li>
      </ul>

      <h2>8. Your Rights</h2>
      <p>Depending on where you live, you may have the right to:</p>
      <ul>
        <li>Access the personal information we hold about you.</li>
        <li>Correct inaccurate or incomplete information.</li>
        <li>Delete your personal information, subject to legal retention requirements.</li>
        <li>Restrict or object to certain processing, including marketing.</li>
        <li>Receive a copy of your data in a portable format.</li>
        <li>Opt out of the sharing of your information for targeted advertising.</li>
        <li>Withdraw consent at any time, where processing is based on consent.</li>
      </ul>
      <p>
        These rights are provided under the EU and UK GDPR, the Brazilian General Data Protection Law (LGPD) and US state
        privacy laws such as the California Consumer Privacy Act (CCPA/CPRA). To exercise any of them, email{" "}
        <a href={`mailto:${email}`}>{email}</a>. We will respond within 30 days and will never discriminate against you
        for exercising your rights.
      </p>

      <h2>9. Security</h2>
      <p>
        Our website is served over SSL/TLS encryption. Payment data is handled by {POLICY.paymentProcessor} under
        PCI-DSS standards. Access to personal information is limited to team members and providers who need it to serve
        you. No method of transmission or storage is 100% secure, but we take reasonable measures to protect your data.
      </p>

      <h2>10. International Data Transfers</h2>
      <p>
        {COMPANY.legalName} is based in Brazil, and our website, payment and advertising providers operate in the United
        States and other countries. When we transfer personal information from the EEA or the UK, we rely on Standard
        Contractual Clauses and the UK International Data Transfer Addendum, or on the adequacy and certification
        mechanisms of our providers.
      </p>

      <h2>11. Children’s Privacy</h2>
      <p>
        Our website is not directed at children under {POLICY.childrenAge}, and we do not knowingly collect personal
        information from them. If you believe a child has provided us with personal information, contact us and we will
        delete it.
      </p>

      <h2>12. Changes to This Policy</h2>
      <p>
        We may update this policy from time to time. Changes will be posted on this page with a revised “Last updated”
        date. Continued use of the website after a change means you accept the updated policy.
      </p>

      <h2>13. Contact Us</h2>
      <p>
        Email: <a href={`mailto:${email}`}>{email}</a>
        <br />
        Operator: {COMPANY.legalName} · CNPJ: {COMPANY.cnpj}
        <br />
        {COMPANY.address}
      </p>
    </LegalPage>
  );
}
