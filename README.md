# Airis Mat — Landing Page

E-commerce landing page for **Airis Mat** diatomite stone mats. Next.js 14 (App Router) · TypeScript · Tailwind CSS.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build + type check
```

## Structure

```
app/
  layout.tsx            # fonts, metadata, global CSS
  page.tsx              # assembles all sections in order
  globals.css           # Tailwind + design-token CSS variables
components/
  sections/             # one file per landing-page section (Header … Footer)
  ui/
    ImagePlaceholder.tsx  # grey block with a label describing the asset to generate
    Button.tsx, Container.tsx, SectionHeading.tsx, Icons.tsx
lib/
  constants.ts          # design tokens, all copy (EN base), pricing, products
```

## Notes

- **Copy lives in `lib/constants.ts`** — translate there for FR / DE.
- **Images**: every `<ImagePlaceholder label="…" />` describes the asset to generate. Search the codebase for `ImagePlaceholder` to get the full list.
- **Offer (2026-09-16): Buy 1, Get 1 Free.** Kits, anchors and copy live in `lib/constants.ts` (`PROMO`, `BUNDLES`).
- **Checkout links** are rebuilt on the client by `lib/checkout.ts` so `utm_*`, `fbclid`, `adv`, `adv_pos` from the advertorials reach the checkout (+ `lp_pos`).
- **Tracking** follows the operation standard (same files as the checkout and the advertorials): `lib/fpixel.ts`, `lib/fb-capi.ts`, `lib/meta-normalize.ts`, `lib/ga4.ts`, `lib/google-ads.ts`, `components/tracking/*`, `app/api/fb-events/route.ts`; layout loads Pixel + noscript, GA4, Google Ads, Clarity, Utmify. Events: PageView (deduplicated browser + CAPI), ViewContent (#offer in view), AddToCart (add to cart), InitiateCheckout (cart → checkout). `lib/meta.ts` and `/api/meta` are compatibility shims.
- **New images** for the offer live on the bucket under `airis map/bogo/` (`lib/assets.ts` → `local()`), with a copy in `public/images/bogo/`.
- Env vars: see `.env.example` (`NEXT_PUBLIC_FB_PIXEL_ID`, `FB_ACCESS_TOKEN`, `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_GOOGLE_ADS_ID`, …) — same names as the checkout.
- Positioning: mold & respiratory health leads; anti-slip is a secondary benefit.
