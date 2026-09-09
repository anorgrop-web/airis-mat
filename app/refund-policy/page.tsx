import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/legal/LegalPage";
import { COMPANY, POLICY } from "@/lib/legal";

export const metadata: Metadata = {
  title: `Refund Policy | ${COMPANY.brand}`,
  description: `${COMPANY.brand} ${POLICY.refundWindowDays}-day money-back guarantee: how to request a refund, replacement or partial refund.`,
};

const email = COMPANY.supportEmail;

export default function RefundPolicyPage() {
  return (
    <LegalPage
      title="Refund Policy"
      currentPath="/refund-policy"
      intro={`We want you to be completely happy with your ${COMPANY.brand}. If you are not, this page explains how our ${POLICY.refundWindowDays}-day money-back guarantee works.`}
    >
      <h2>1. Our Guarantee</h2>
      <p>
        Every {COMPANY.brand} order is covered by a {POLICY.refundWindowDays}-day satisfaction guarantee. Try the mat in
        your own home. If it is not what you expected, send it back within {POLICY.refundWindowDays} days of delivery and
        we will refund the purchase price. No questions, no hassle.
      </p>

      <h2>2. {POLICY.refundWindowDays}-Day Money-Back Window</h2>
      <p>You have {POLICY.refundWindowDays} days from the date of delivery to request a refund. To be eligible:</p>
      <ul>
        <li>You must contact us within {POLICY.refundWindowDays} days of receiving your order.</li>
        <li>
          The mat must be returned to us. Normal use is fine — you do not need to keep it unused to qualify — but items
          that have been broken through misuse (for example, cracked after being dropped or cut) are not eligible.
        </li>
        <li>Where possible, please return the mat in its original packaging to protect the stone in transit.</li>
      </ul>
      <p>
        Return shipping is paid by you, unless the item arrived damaged, defective or incorrect (see section 3). Once we
        receive and inspect the return, we issue your refund.
      </p>

      <h2>3. Damaged, Defective or Incorrect Items</h2>
      <p>
        Diatomite stone is fragile, and despite careful packaging a mat can occasionally be damaged in transit. If your
        order arrives damaged, defective or different from what you ordered:
      </p>
      <ul>
        <li>Contact us within {POLICY.damageReportDays} days of delivery.</li>
        <li>Include photos of the item and the packaging.</li>
        <li>We will send a free replacement or issue a full refund — your choice. You will not need to return the item.</li>
      </ul>

      <h2>4. How to Request a Refund</h2>
      <p>
        Email us at <a href={`mailto:${email}`}>{email}</a> with:
      </p>
      <ul>
        <li>Your order number or the email address used at checkout.</li>
        <li>A brief description of the issue (optional for guarantee returns).</li>
        <li>Photos, if the item arrived damaged or incorrect.</li>
      </ul>
      <p>
        We review every request within {POLICY.reviewTime} and reply with a resolution and, where needed, return
        instructions.
      </p>

      <h2>5. Refund Options</h2>
      <p>Depending on the situation, we may offer:</p>
      <ul>
        <li>A full refund to the original payment method.</li>
        <li>A replacement shipment at no additional cost.</li>
        <li>A partial refund if only part of the order was affected.</li>
      </ul>

      <h2>6. Refund Processing</h2>
      <p>
        Refunds are processed within {POLICY.refundProcessing} after approval (or after we receive your return, for
        guarantee returns). The time it takes for the refund to appear on your statement depends on your bank or card
        provider.
      </p>

      <h2>7. Non-Refundable Situations</h2>
      <ul>
        <li>Requests made more than {POLICY.refundWindowDays} days after delivery.</li>
        <li>Items broken through misuse, improper care or alteration after delivery.</li>
        <li>Express shipping fees, unless the return is due to our error.</li>
        <li>Return shipping costs for guarantee returns.</li>
      </ul>

      <h2>8. Late or Missing Refunds</h2>
      <p>
        If your refund has been approved but has not appeared within 10 business days, first check with your bank or
        credit card company, as processing times vary. If it still has not arrived, contact us at{" "}
        <a href={`mailto:${email}`}>{email}</a> and we will trace it.
      </p>

      <h2>9. Exchanges</h2>
      <p>
        We do not currently offer direct exchanges. If you would like a different kit, please request a refund and place a
        new order.
      </p>

      <h2>10. Cancellations</h2>
      <p>
        You can cancel an order for a full refund at any time before it is dispatched. Once an order has shipped, the{" "}
        {POLICY.refundWindowDays}-day guarantee above applies. See our{" "}
        <Link href="/shipping-policy">Shipping Policy</Link> for processing times.
      </p>

      <h2>11. Contact Us</h2>
      <p>
        Email: <a href={`mailto:${email}`}>{email}</a> — response time: within {COMPANY.responseTime}.
      </p>
    </LegalPage>
  );
}
