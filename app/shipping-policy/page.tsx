import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/legal/LegalPage";
import { COMPANY, POLICY } from "@/lib/legal";

export const metadata: Metadata = {
  title: `Shipping Policy | ${COMPANY.brand}`,
  description: `Where ${COMPANY.brand} ships, delivery times, costs, tracking and what to do if your order is late.`,
};

const email = COMPANY.supportEmail;
const { standardShipping: std, expressShipping: exp } = POLICY;

export default function ShippingPolicyPage() {
  return (
    <LegalPage
      title="Shipping Policy"
      currentPath="/shipping-policy"
      intro="Everything about how your order gets to you: destinations, delivery times, costs and tracking."
    >
      <h2>1. Shipping Destinations</h2>
      <p>
        {COMPANY.brand} currently ships to: {POLICY.destinations.join(" and ")}. If your country is not listed, contact
        us at <a href={`mailto:${email}`}>{email}</a> and we will let you know if we can deliver to you.
      </p>

      <h2>2. Shipping Options and Delivery Times</h2>
      <div className="not-prose mt-4 overflow-x-auto rounded-2xl border border-foreground/5 bg-white">
        <table className="w-full min-w-[420px] text-left text-sm">
          <thead>
            <tr className="border-b border-foreground/5 text-muted">
              <th className="px-5 py-3 font-semibold">Option</th>
              <th className="px-5 py-3 font-semibold">Cost</th>
              <th className="px-5 py-3 font-semibold">Estimated delivery</th>
            </tr>
          </thead>
          <tbody className="text-foreground">
            <tr className="border-b border-foreground/5">
              <td className="px-5 py-3 font-medium">{std.label}</td>
              <td className="px-5 py-3">{std.cost}</td>
              <td className="px-5 py-3">{std.time}</td>
            </tr>
            <tr>
              <td className="px-5 py-3 font-medium">{exp.label}</td>
              <td className="px-5 py-3">{exp.cost}</td>
              <td className="px-5 py-3">{exp.time}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Delivery estimates count from the day your order is dispatched, not the day it is placed, and refer to business
        days (Monday to Friday, excluding public holidays). Standard shipping is free on every order and every kit.
      </p>

      <h2>3. Order Processing</h2>
      <p>
        Orders are processed and dispatched within {POLICY.processingTime}. During promotions or periods of high demand,
        processing may take up to {POLICY.processingTimePeak}. We will email you if we expect a longer delay.
      </p>

      <h2>4. Tracking Your Order</h2>
      <p>
        As soon as your order ships, you will receive an email with a tracking link. If you have not received tracking
        information within {POLICY.trackingGraceDays} business days of placing your order, check your spam folder and
        then contact us at <a href={`mailto:${email}`}>{email}</a>.
      </p>

      <h2>5. Packaging</h2>
      <p>
        Diatomite stone is strong under foot but can crack if dropped. Every mat is shipped in a rigid box with foam
        padding and corner protection, together with the included sanding pad and care guide. Please unpack with care and
        keep the packaging until you are sure the mat arrived intact.
      </p>

      <h2>6. Duties and Taxes</h2>
      <ul>
        <li>
          <strong>United States:</strong> no additional customs charges. Applicable sales tax, if any, is shown at
          checkout.
        </li>
        <li>
          <strong>Canada:</strong> orders may be subject to import duties, taxes or brokerage fees charged by the carrier
          on delivery. These are the responsibility of the recipient and are not included in the price.
        </li>
      </ul>

      <h2>7. Shipping Address</h2>
      <p>
        Please check your shipping address carefully at checkout. If you notice a mistake, contact us as soon as possible
        — we can update the address before dispatch, but not after the parcel has left our warehouse. Orders returned to
        us because of an incomplete or incorrect address can be re-shipped for an additional shipping fee, or refunded
        minus the original shipping cost.
      </p>

      <h2>8. Delayed or Lost Orders</h2>
      <p>
        If your order has not arrived within the estimated delivery window plus {POLICY.trackingGraceDays} business days,
        contact us at <a href={`mailto:${email}`}>{email}</a>. We will open an investigation with the carrier within{" "}
        {POLICY.reviewTime}. If a parcel is confirmed lost, we will send a replacement or issue a full refund — your
        choice.
      </p>

      <h2>9. Damaged in Transit</h2>
      <p>
        If your mat arrives damaged, take photos of the item and the packaging and contact us within{" "}
        {POLICY.damageReportDays} days of delivery. We will replace it free of charge or refund you in full. See our{" "}
        <Link href="/refund-policy">Refund Policy</Link> for details.
      </p>

      <h2>10. Contact Us</h2>
      <p>
        Email: <a href={`mailto:${email}`}>{email}</a> — response time: within {COMPANY.responseTime}.
      </p>
    </LegalPage>
  );
}
