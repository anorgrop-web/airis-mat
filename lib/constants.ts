/**
 * Airis Mat — shared constants: design tokens, reusable copy, pricing.
 * Copy is in English (base language) and will later be translated to FR / DE.
 * Keep sentences short and literal so they translate cleanly.
 *
 * Page structure mirrors a proven direct-response layout:
 * Hero (carousel) → Marquee → 8-feature grid → 3 tech blocks → 4 stats →
 * comparison → 3 steps → reviews (1 + 4) → FAQ (9) → dark purchase CTA →
 * bundle selector → guarantee → footer.
 */

import { ASSETS } from "./assets";

// ---------------------------------------------------------------------------
// Design tokens (mirrored in tailwind.config.ts)
// ---------------------------------------------------------------------------
export const COLORS = {
  primary: "#6FB7D9", // blue
  secondary: "#6FD9B0", // aqua green
  background: "#FAFCFB", // neutral background
  text: "#2C3E42",
  accent: "#A8E6C1", // detail / badge
} as const;

// ---------------------------------------------------------------------------
// Brand
// ---------------------------------------------------------------------------
export const BRAND = {
  name: "Airis Mat",
  wordmark: "AIRIS MAT",
  tagline: "Dry floors. Clear air.",
  logoLabel:
    "Airis Mat logo — circular icon with stylized lungs in blue/green gradient + AIRIS MAT wordmark",
  email: "hello@airis.eu", // TODO: replace with the real support address
  reviewCount: "4,000+", // TODO: replace with the real review count
} as const;

// Discount used across all CTAs — change in one place
export const PROMO = {
  percent: 30,
  ctaLabel: "GET 30% OFF NOW",
  badge: "UP TO 30% OFF — LIMITED TIME",
} as const;

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------
export const NAV_LINKS = [
  { label: "Overview", href: "#overview" },
  { label: "Benefits", href: "#benefits" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
] as const;

export const CTA = {
  shopNow: "Shop now",
  addToCart: "ADD TO CART",
  orderNow: `Order now & save ${PROMO.percent}%`,
} as const;

// ---------------------------------------------------------------------------
// Pricing (USD) — displayed with Intl.NumberFormat, see formatPrice()
// ---------------------------------------------------------------------------
export const CURRENCY = "USD";
export const LOCALE = "en-US";

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat(LOCALE, {
    style: "currency",
    currency: CURRENCY,
    minimumFractionDigits: 2,
  }).format(amount);
}

export type Bundle = {
  id: string;
  name: string;
  subtitle: string;
  units: number; // number of mats — used for "per mat" price
  price: number;
  compareAtPrice: number;
  badge?: string;
  imageLabel: string;
  image?: string;
};

export const BUNDLES: Bundle[] = [
  {
    id: "single",
    name: "1× Airis Mat",
    subtitle: "One mat for the bathroom or kitchen",
    units: 1,
    price: 44.9,
    compareAtPrice: 59.9,
    imageLabel: "Bundle — single Airis Mat, product shot on white",
    image: ASSETS.bundleSingle,
  },
  {
    id: "kit-duo",
    name: "Kit Duo",
    subtitle: "2× mats — kitchen + bathroom",
    units: 2,
    price: 79.9,
    compareAtPrice: 119.8,
    badge: "Most popular — extra 10% off",
    imageLabel: "Bundle — Kit Duo, two Airis Mats stacked, product shot on white",
    image: ASSETS.bundleDuo,
  },
  {
    id: "kit-bathroom-plus",
    name: "Kit Bathroom+",
    subtitle: "1× bathroom mat + Airis Mat room diffuser",
    units: 1,
    price: 69.9,
    compareAtPrice: 99.8,
    badge: "Fresh air bundle — diffuser included",
    imageLabel: "Bundle — Kit Bathroom+, mat with room diffuser, product shot on white",
    image: ASSETS.bundleBathroomPlus,
  },
];

export const SHIPPING_NOTE = "Free shipping (5–8 days) • Express 2–3 days: $9.90";

// ---------------------------------------------------------------------------
// Section copy
// ---------------------------------------------------------------------------
export const HERO = {
  headline: "The bath mat that never stays damp — so mold never gets a start.",
  subheadline:
    "Airis Mat absorbs water in seconds and dries on its own. A dry floor, fresher air, and easier breathing at home — no washing, no musty smell.",
  bullets: [
    "Absorbs water in seconds",
    "Fully dry within minutes — nothing left for mold",
    "Natural diatomite stone, no plastics",
    "Rinse or sand to clean — no washing machine",
    "Non-slip base for a steady step",
  ],
  rating: `Excellent — based on ${BRAND.reviewCount} reviews`,
  trust: "Free shipping • 30-day returns",
  slides: [
    { label: "Hero 1 — Airis Mat on a bright bathroom floor, wet footprints fading", src: ASSETS.hero1 },
    { label: "Hero 2 — close-up of water being absorbed into the stone surface", src: ASSETS.hero2 },
    { label: "Hero 3 — mat in a modern kitchen in front of the sink", src: ASSETS.hero3 },
    { label: "Hero 4 — hand rinsing the mat under a faucet, easy care", src: ASSETS.hero4 },
    { label: "Hero 5 — family stepping off the mat, fresh airy bathroom", src: ASSETS.hero5 },
  ],
} as const;

// Marquee reuses the benefit icons
export const MARQUEE = [
  { label: "ANTI-MOLD", iconLabel: "Icon — shield with leaf", image: ASSETS.icon3 },
  { label: "INSTANT ABSORPTION", iconLabel: "Icon — water drop", image: ASSETS.icon1 },
  { label: "RESPIRATORY-FRIENDLY", iconLabel: "Icon — lungs", image: ASSETS.icon4 },
  { label: "100% NATURAL STONE", iconLabel: "Icon — stone / mineral", image: ASSETS.icon5 },
] as const;

export const KEY_BENEFITS = {
  headline: "NATURAL STONE — MAXIMUM ABSORPTION",
  subheadline: "Enjoy a dry floor and fresher air, every day",
  items: [
    { label: "Absorbs water in seconds", iconLabel: "Icon — water drop with stopwatch", image: ASSETS.icon1 },
    { label: "Fully dry within minutes", iconLabel: "Icon — sun / airflow", image: ASSETS.icon2 },
    { label: "Naturally resists mold", iconLabel: "Icon — shield with leaf", image: ASSETS.icon3 },
    { label: "Fresher indoor air", iconLabel: "Icon — lungs with soft airflow", image: ASSETS.icon4 },
    { label: "100% diatomite stone", iconLabel: "Icon — stone / mineral", image: ASSETS.icon5 },
    { label: "Non-slip base", iconLabel: "Icon — footprint with grip", image: ASSETS.icon6 },
    { label: "Rinse or sand to clean", iconLabel: "Icon — faucet with sparkle", image: ASSETS.icon7 },
    { label: "Fits kitchen & bathroom", iconLabel: "Icon — house with two rooms", image: ASSETS.icon8 },
  ],
  moreLink: "See more features",
} as const;

export const TECH_BLOCKS = [
  {
    id: "absorption",
    headline: "Dry by the time you reach for your towel.",
    text: "Diatomite is a natural stone made of fossilized algae. Its surface is covered in millions of microscopic pores. When you step on it, capillary action pulls the water straight into the stone — the surface feels dry almost immediately, and the moisture evaporates on its own within minutes.",
    imageLabel: "Tech 1 — animated sequence: wet footprint disappearing into the stone (GIF)",
    media: ASSETS.tech1,
  },
  {
    id: "mold",
    headline: "Less damp means less mold — and cleaner air.",
    text: "Mold needs moisture to grow. A cloth mat stays wet for hours, and in a cool, humid home — think a cold, humid winter with the windows closed — that is all it takes. Airis Mat never stays wet, so mold has no place to settle. Fewer spores in the room means fresher air for everyone, and especially for people with asthma or sensitive airways.",
    imageLabel: "Tech 2 — split image: damp cloth mat with dark edges vs. clean dry Airis Mat",
    media: ASSETS.tech2,
  },
  {
    id: "durability",
    headline: "Made from stone. Built to last for years.",
    text: "No fibers to wear out, no washing cycles, no replacing every season. When the surface needs a refresh, a quick pass with the included sanding pad brings it back to new. One mat replaces years of cloth mats — better for your home and for the planet.",
    imageLabel: "Tech 3 — hand lightly sanding the mat surface, close-up (GIF)",
    media: ASSETS.tech3,
  },
] as const;

export const STATS = {
  headline: "What our customers say after the first 30 days",
  // TODO: replace with real post-purchase survey data before launch
  items: [
    { value: "94%", text: "noticed the mat was dry again within minutes", imageLabel: "Stat 1 — dry mat close-up", media: ASSETS.stat1 },
    { value: "91%", text: "said the musty smell in their bathroom was gone within two weeks", imageLabel: "Stat 2 — fresh bright bathroom", media: ASSETS.stat2 },
    { value: "89%", text: "with asthma or allergies said they breathe more comfortably at home", imageLabel: "Stat 3 — person breathing calmly by a window", media: ASSETS.stat3 },
    { value: "96%", text: "would recommend Airis Mat to a friend", imageLabel: "Stat 4 — two friends chatting in a kitchen", media: ASSETS.stat4 },
  ],
} as const;

export const COMPARISON = {
  headline: "Airis Mat vs. cloth bath mats",
  columns: {
    airis: { label: "Airis Mat", imageLabel: "Comparison — Airis Mat, clean product shot", image: ASSETS.comparisonAiris },
    cloth: { label: "Cloth mat", imageLabel: "Comparison — generic damp cloth bath mat", image: ASSETS.comparisonCloth },
  },
  rows: [
    { feature: "Dry within minutes", airis: true, cloth: false },
    { feature: "Nothing for mold to grow on", airis: true, cloth: false },
    { feature: "No musty smell", airis: true, cloth: false },
    { feature: "No washing machine needed", airis: true, cloth: false },
    { feature: "Natural material, no synthetic fibers", airis: true, cloth: false },
    { feature: "Stays in place — non-slip base", airis: true, cloth: false },
  ],
} as const;

export const STEPS = {
  headline: "Ready in 3 simple steps",
  items: [
    {
      title: "Unbox and place it",
      text: "No assembly, no fixing — put it in front of the shower or the sink.",
      imageLabel: "Step 1 — unboxing the mat and placing it on the floor",
      image: ASSETS.step1,
    },
    {
      title: "Step out of the shower",
      text: "Water disappears into the stone in seconds. Your feet — and the floor — stay dry.",
      imageLabel: "Step 2 — feet stepping onto the mat, water absorbed",
      image: ASSETS.step2,
    },
    {
      title: "Breathe easy",
      text: "The mat dries itself within minutes. No dampness, no mold, no musty smell in the room.",
      imageLabel: "Step 3 — fresh, bright bathroom with plants and open window",
      image: ASSETS.step3,
    },
  ],
} as const;

export type Review = {
  id: string;
  name: string;
  location: string;
  rating: number;
  title: string;
  quote: string;
  imageLabel: string;
  image?: string;
};

export const REVIEWS = {
  headline: `Loved and recommended by over ${BRAND.reviewCount} customers`,
  subheadline: "Here is a selection of their reviews.",
  featured: {
    id: "r0",
    name: "Jennifer M.",
    location: "Austin, TX",
    rating: 5,
    title: "The musty smell is gone — and my son breathes easier",
    quote:
      "Our bathroom always smelled a bit musty in winter, and my son has asthma, so I was constantly washing mats. With Airis Mat the floor is dry before I've even finished brushing my teeth. Two weeks in, the smell was gone. Should have bought this three winters ago.",
    imageLabel: "Review portrait — Jennifer, 30s, warm smile, bathroom background",
    image: ASSETS.reviewJennifer,
  } as Review,
  items: [
    {
      id: "r1",
      name: "Michael R.",
      location: "Toronto, ON",
      rating: 5,
      title: "Dry before I've finished my coffee",
      quote: "I honestly didn't believe a stone could absorb this fast. It does. And nothing to wash.",
      imageLabel: "Review portrait — Michael, 40s, kitchen background",
      image: ASSETS.reviewMichael,
    },
    {
      id: "r2",
      name: "Sarah K.",
      location: "Denver, CO",
      rating: 5,
      title: "No more damp mat in a small bathroom",
      quote: "Our apartment has no window in the bathroom. The old mat never dried. This one does — every time.",
      imageLabel: "Review portrait — Sarah, 30s, natural light",
      image: ASSETS.reviewSarah,
    },
    {
      id: "r3",
      name: "Emily T.",
      location: "Portland, OR",
      rating: 5,
      title: "Finally a mat I don't have to wash",
      quote: "It looks great, it's just stone, and my allergies have been calmer this winter.",
      imageLabel: "Review portrait — Emily, 40s, living room",
      image: ASSETS.reviewEmily,
    },
    {
      id: "r4",
      name: "David L.",
      location: "Chicago, IL",
      rating: 5,
      title: "Works in the kitchen too",
      quote: "Got the Kit Duo. Splashes at the sink vanish. My wife was skeptical — now she's telling all her friends.",
      imageLabel: "Review portrait — David, 50s, calm expression",
      image: ASSETS.reviewDavid,
    },
  ] as Review[],
} as const;

export const FAQ = {
  headline: "Questions? We have the answers",
  items: [
    {
      id: "how",
      question: "How does the absorption work?",
      answer:
        "Diatomite stone is full of microscopic pores. When water touches the surface, capillary action pulls it into the stone in seconds. The moisture then evaporates naturally, so the mat is dry again within minutes.",
    },
    {
      id: "mold",
      question: "Does it really help against mold?",
      answer:
        "Yes. Mold needs a surface that stays damp. Cloth mats stay wet for hours; Airis Mat dries within minutes, so there is nothing for mold to settle on. Keeping the floor dry is one of the simplest ways to keep a bathroom mold-free.",
    },
    {
      id: "asthma",
      question: "Is it good for people with asthma or allergies?",
      answer:
        "Many of our customers with asthma or allergies tell us the air in their bathroom feels fresher once the damp mat is gone. Fewer damp surfaces means fewer mold spores in the room. Airis Mat is not a medical device, but it removes one common source of indoor mold.",
    },
    {
      id: "clean",
      question: "How do I clean it?",
      answer:
        "Rinse it under running water and let it air-dry upright. If the surface gets stained or feels less absorbent over time, lightly sand it with the included pad. No washing machine, no detergents.",
    },
    {
      id: "size",
      question: "What size is the mat?",
      answer:
        "Each mat measures 60 × 39 cm and is about 9 mm thick — the right size for most bathrooms and kitchen sink areas. Larger sizes are coming soon.",
    },
    {
      id: "slip",
      question: "Does it slip on tile?",
      answer:
        "No. Every Airis Mat has a non-slip base that keeps it in place on tile, wood, and vinyl. The dry stone surface also gives a much steadier step than a wet cloth mat.",
    },
    {
      id: "durability",
      question: "How long does it last?",
      answer:
        "With normal use and a quick sanding every few months, an Airis Mat lasts for years. Stone doesn't wear out the way fabric does.",
    },
    {
      id: "diffuser",
      question: "What is included in the Kit Bathroom+?",
      answer:
        "One Airis Mat for the bathroom, one Airis Mat room diffuser (a compact stone diffuser for essential oils — no electricity needed) and a sanding pad for care.",
    },
  ],
} as const;

export const PURCHASE_CTA = {
  headline: "Ready for a drier, fresher home — this week?",
  badge: PROMO.badge,
  note: "Demand is high during the cold, humid months — stock is updated daily.",
} as const;

export const BUNDLE_SECTION = {
  headline: "Choose your package",
  note: "The bigger the kit, the bigger the savings. Free shipping on every package.",
} as const;

export const GUARANTEE = {
  headline: "30-day satisfaction guarantee",
  text: "Try Airis Mat in your own home. If you're not happy, send it back within 30 days and get a full refund. No questions, no hassle.",
  sealLabel: "Guarantee seal — circular badge '30-day satisfaction guarantee' in brand gradient",
  seal: ASSETS.guaranteeSeal,
} as const;

export const FOOTER = {
  description:
    "Natural diatomite stone mats that keep floors dry and homes fresher — designed for modern homes.",
  links: [
    { label: "Contact", href: `mailto:${BRAND.email}` },
    { label: "Privacy Policy", href: "#" }, // TODO: legal pages
    { label: "Refund Policy", href: "#" },
    { label: "Shipping Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Imprint", href: "#" }, // Required for the German market (Impressum)
  ],
} as const;

export const CART_COPY = {
  title: "Cart",
  items: (n: number) => `${n} ${n === 1 ? "item" : "items"}`,
  emptyTitle: "Your cart is empty",
  emptyText: "Add items to get started",
  checkout: "Checkout",
  subtotal: "Subtotal",
} as const;
