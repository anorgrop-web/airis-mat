/**
 * Legal entity, support contact and policy facts shared by the policy pages,
 * the contact page and the footer. Keep every number here in sync with the
 * landing-page copy (lib/constants.ts) so promises match the fine print.
 */

export const COMPANY = {
  brand: "Airis Mat",
  legalName: "LASCAR NEGÓCIOS DIGITAIS LTDA",
  cnpj: "64.618.871/0001-56",
  address: "R. Capitão José Maria, 1634, Sala 202, Centro, Linhares - ES, CEP 29900-172, Brasil",
  supportEmail: "support@earendil-commerce.com",
  responseTime: "24–48 hours",
  siteUrl: "https://airis.earendil-commerce.com",
  siteHost: "airis.earendil-commerce.com",
} as const;

export const LEGAL_LAST_UPDATED = "September 2026";

export const LEGAL_LINKS = [
  { label: "Refund Policy", href: "/refund-policy" },
  { label: "Shipping Policy", href: "/shipping-policy" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
  { label: "Contact", href: "/contact" },
] as const;

export const PAYMENT_METHODS = [
  "Visa",
  "Mastercard",
  "American Express",
  "Discover",
  "Apple Pay",
  "Google Pay",
] as const;

/** Facts quoted inside the policies — mirror lib/constants.ts (SHIPPING_NOTE, GUARANTEE). */
export const POLICY = {
  refundWindowDays: 30,
  damageReportDays: 14,
  refundProcessing: "5–10 business days",
  reviewTime: "48 hours",
  processingTime: "1–3 business days",
  processingTimePeak: "5 business days",
  standardShipping: { label: "Standard", cost: "Free", time: "5–8 business days" },
  expressShipping: { label: "Express", cost: "$9.90", time: "2–3 business days" },
  destinations: ["United States", "Canada"], // TODO: confirm the exact list of countries you ship to
  trackingGraceDays: 5,
  currency: "USD",
  paymentProcessor: "Stripe", // TODO: confirm once the checkout provider is chosen
  minimumAge: 18,
  childrenAge: 16,
  orderDataRetentionYears: 5,
  analyticsRetentionMonths: 26,
} as const;
