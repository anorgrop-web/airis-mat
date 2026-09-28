/**
 * Airis Mat — shared constants: design tokens, reusable copy, pricing.
 * Copy is in English (base language) and will later be translated to FR / DE.
 * Keep sentences short and literal so they translate cleanly.
 *
 * Page structure follows the operation's base landing page (TitanChef model):
 * Header (urgency bar + trust strip) → Hero (carousel with video) → Marquee →
 * Problem (why fabric mats fail) → 8 benefits → 3 tech blocks (mechanism) →
 * 4 value cards → comparison → 3 steps → testimonials → reviews (stats + list) →
 * expert → FAQ → dark purchase CTA → bundle selector (#offer) → guarantee →
 * footer → fixed conversion bar.
 *
 * Offer (2026-09-16): Buy 1, Get 1 Free. Every kit ships at least 2 mats.
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
  email: "support@earendil-commerce.com", // mirrored in lib/legal.ts COMPANY.supportEmail
  reviewCount: "4,000+", // [REVISAR] replace with the real review count before traffic
  ratingValue: "4.8", // [REVISAR] real average rating
  ratingCount: "1,262", // [REVISAR] real number of written reviews
} as const;

// The offer, in one place. Percentages are computed per kit (see savePercent).
export const PROMO = {
  headline: "BUY 1, GET 1 FREE",
  badge: "BUY 1, GET 1 FREE — LIMITED TIME",
  ctaLabel: "CLAIM BUY 1, GET 1 FREE",
  ctaShort: "CHOOSE MY KIT",
  /** Retail price of ONE mat — anchors every kit ("2 × $59.90 = $119.80"). */
  unitCompareAt: 59.9,
  diffuserCompareAt: 39.9,
} as const;

/** Trust strip under the header (desktop row / mobile marquee). */
export const HEADER_STRIP = [
  { icon: "🚚", label: "FREE US SHIPPING" },
  { icon: "💰", label: "30-DAY MONEY-BACK GUARANTEE" },
  { icon: "🪨", label: "100% NATURAL DIATOMITE STONE" },
  { icon: "🎁", label: "BUY 1, GET 1 FREE" },
] as const;

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------
// Absolute hashes ("/#…") so the links also work from the policy pages
export const NAV_LINKS = [
  { label: "Overview", href: "/#overview" },
  { label: "Benefits", href: "/#benefits" },
  { label: "Reviews", href: "/#reviews" },
  { label: "FAQ", href: "/#faq" },
] as const;

export const CTA = {
  shopNow: "Shop now",
  addToCart: "ADD TO CART",
  orderNow: "Claim Buy 1, Get 1 Free",
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

// Hosted checkout — one page per kit
export const CHECKOUT_BASE = "https://checkout.earendil-commerce.com";

export type Bundle = {
  id: string;
  name: string;
  subtitle: string;
  /** Mats that ship in the box (paid + free). */
  units: number;
  /** How many of `units` are free. */
  freeUnits: number;
  price: number;
  /** Anchor = retail price of every item in the box. */
  compareAtPrice: number;
  badge?: string;
  /** Short line shown under the name ("2 mats — 1 paid + 1 FREE"). */
  contents: string;
  imageLabel: string;
  image?: string;
  /** Hosted checkout page for this kit (UTMs are appended at click time, see lib/checkout.ts). */
  checkoutUrl: string;
};

/** "Save 62%" — rounded, computed from the anchor so copy never drifts from the numbers. */
export function savePercent(b: Pick<Bundle, "price" | "compareAtPrice">): number {
  return Math.round((1 - b.price / b.compareAtPrice) * 100);
}

export const BUNDLES: Bundle[] = [
  {
    id: "single",
    name: "Buy 1, Get 1 Free",
    subtitle: "One for the shower, one for the sink",
    units: 2,
    freeUnits: 1,
    price: 44.9,
    compareAtPrice: 119.8, // 2 × $59.90
    badge: "Best for one bathroom",
    contents: "2 mats in the box — 1 paid + 1 FREE",
    imageLabel: "Bundle — two Airis Mats stacked, product shot on white",
    image: ASSETS.bundleDuo,
    checkoutUrl: `${CHECKOUT_BASE}/`,
  },
  {
    id: "kit-duo",
    name: "Buy 2, Get 1 Free",
    subtitle: "Every bathroom and the kitchen covered",
    units: 3,
    freeUnits: 1,
    price: 79.9,
    compareAtPrice: 179.7, // 3 × $59.90
    badge: "Most popular",
    contents: "3 mats in the box — 2 paid + 1 FREE",
    imageLabel: "Bundle — three Airis Mats stacked, product shot on white",
    image: ASSETS.bundleTrio,
    checkoutUrl: `${CHECKOUT_BASE}/kit-duo`,
  },
  {
    id: "kit-bathroom-plus",
    name: "Bathroom+ — Buy 1, Get 1 Free + Diffuser",
    subtitle: "2 mats + Airis stone room diffuser",
    units: 2,
    freeUnits: 1,
    price: 69.9,
    compareAtPrice: 159.7, // 2 × $59.90 + $39.90 diffuser
    badge: "Fresh air bundle",
    contents: "2 mats + diffuser in the box — 1 mat FREE",
    imageLabel: "Bundle — two Airis Mats with room diffuser, product shot on white",
    image: ASSETS.bundleBathroomPlus,
    checkoutUrl: `${CHECKOUT_BASE}/kit-bathroom`,
  },
];

export const SHIPPING_NOTE = "Free shipping (5–8 days) • Express 2–3 days: $9.90";

// ---------------------------------------------------------------------------
// Section copy
// ---------------------------------------------------------------------------
/**
 * Hero = e-commerce buy box (US product-page pattern, benchmarked on BeyondBaths
 * and Modrnizd, 2026-09-28): gallery → stars → product name → price + strikethrough
 * + "Save %" → size → bundle picker → Add to cart → delivery window → payment
 * icons → trust list → short benefit list.
 */
export const HERO = {
  /** Product name (H1) — short, like a store listing. */
  headline: "Airis Stone Bath Mat",
  /** One-line promise under the name (Modrnizd: "Instant absorption. Quick drying. Always fresh."). */
  subheadline: "Dries in minutes. No mold, no musty smell, no washing machine.",
  bulletsTitle: `Why ${BRAND.reviewCount} homes made the switch`,
  bullets: [
    "Dries by itself within minutes",
    "Nothing left for mold or musty smell to grow on",
    "Rinse or sand to clean — never wash",
    "Non-slip natural stone base",
  ],
  ratingValue: BRAND.ratingValue,
  ratingLabel: `${BRAND.ratingCount} reviews`,
  customers: `Trusted by ${BRAND.reviewCount} homes`,
  stock: "In stock — ships within 1–3 business days",
  /**
   * The only size we sell (60 × 39 cm, ~9 mm — FAQ "size" and the checkout).
   * Shown in inches first, the way US stores list it ("Small (16" x 24")").
   */
  size: {
    name: "Standard",
    inches: '15.4" × 23.6"',
    detail: '39 × 60 cm · 0.35" thick · fits most bathrooms and kitchen sinks',
  },
  bundleLabel: "Bundle",
  /**
   * Delivery window = processing (1–3 business days) + standard shipping
   * (5–8 business days), from POLICY in lib/legal.ts.
   */
  delivery: { prefix: "Free delivery", minBusinessDays: 6, maxBusinessDays: 11 },
  trustList: [
    { icon: "users", label: `Trusted by ${BRAND.reviewCount} homes` },
    { icon: "truck", label: "Free US shipping on every kit" },
    { icon: "shield", label: "30-day money-back guarantee" },
    { icon: "stone", label: "100% natural diatomite stone" },
  ] as { icon: "users" | "truck" | "shield" | "stone"; label: string }[],
  /** Mixed image/video carousel (padrão técnico §4.1 — the hero always carries video). */
  slides: [
    { label: "Video — wet footprint disappearing into the stone", src: ASSETS.tech1 },
    { label: "Hero 1 — Airis Mat on a bright bathroom floor, wet footprints fading", src: ASSETS.hero1 },
    { label: "Video — fresh, bright bathroom", src: ASSETS.stat2 },
    { label: "Hero 2 — close-up of water being absorbed into the stone surface", src: ASSETS.hero2 },
    { label: "Hero 3 — mat in a modern kitchen in front of the sink", src: ASSETS.hero3 },
    { label: "Hero 4 — hand rinsing the mat under a faucet, easy care", src: ASSETS.hero4 },
    { label: "Hero 5 — family stepping off the mat, fresh airy bathroom", src: ASSETS.hero5 },
    { label: "Split — damp cloth mat vs. dry Airis Mat", src: ASSETS.tech2 },
  ],
  avatars: [ASSETS.reviewJennifer, ASSETS.reviewSarah, ASSETS.reviewEmily, ASSETS.reviewDavid],
} as const;

// ---------------------------------------------------------------------------
// Problem — why every fabric mat ends up the same way (model: Comparison section)
// ---------------------------------------------------------------------------
export const PROBLEM = {
  marquee: ["30-Day Money-Back Guarantee", "Buy 1, Get 1 Free", "Free US Shipping", "100% Natural Stone"],
  headline: "Every fabric bath mat ends up the same way.",
  subheadline:
    "It is not a cleaning problem. It is a material problem: fabric holds water in the one room where water never stops coming.",
  items: [
    {
      id: "cotton",
      title: "Cotton & microfiber",
      text: "Soaks up water at every shower and lies flat on cold tile. The underside never gets air — so it never fully dries, and that is where the smell starts.",
      imageLabel: "Damp cotton bath mat on a bathroom floor",
      image: ASSETS.comparisonCloth,
    },
    {
      id: "foam",
      title: "Memory foam",
      text: "A sponge with a cover. The foam core stays wet for a day or more, and the musty smell settles into it within weeks — washing does not reach the core.",
      imageLabel: "Wet memory foam bath mat being squeezed",
      image: ASSETS.problemFoam,
    },
    {
      id: "rubber",
      title: "Rubber-backed mats",
      text: "The backing traps water between the mat and the floor. That dark line along the grout where the mat sits? That is where it lives.",
      imageLabel: "Rubber-backed mat lifted, water trapped underneath",
      image: ASSETS.problemRubber,
    },
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
    // TODO(compliance): the advertorials claim antifungal / antibacterial / air-drying — add here ONLY with the supplier report in hand
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

// Four value cards (model: Investment section). Replaces the placeholder survey stats.
export const VALUE = {
  headline: "One stone mat replaces years of fabric mats.",
  subheadline: "No washing cycles, no replacing every season, nothing left damp on the floor.",
  items: [
    { title: "No washing machine, ever", text: "Rinse it under the tap and stand it upright. That is the whole care routine.", image: ASSETS.icon7, iconLabel: "Icon — faucet with sparkle" },
    { title: "Dry in minutes, every day", text: "Millions of microscopic pores pull the water in; it evaporates on its own.", image: ASSETS.icon2, iconLabel: "Icon — sun / airflow" },
    { title: "Nothing for mold to grow on", text: "No fibers, no padding, no wet underside — no damp surface for mold to settle.", image: ASSETS.icon3, iconLabel: "Icon — shield with leaf" },
    { title: "Sanding pad included", text: "A 30-second pass brings the surface back to new. One mat, years of mornings.", image: ASSETS.icon6, iconLabel: "Icon — footprint with grip" },
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
    { feature: "Free second mat included", airis: true, cloth: false },
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

/** Judge.me-style summary card above the reviews. [REVISAR] every number before traffic. */
export const REVIEW_STATS = {
  rating: BRAND.ratingValue,
  count: `${BRAND.ratingCount} reviews`,
  bars: [
    { stars: 5, percent: 81 },
    { stars: 4, percent: 14 },
    { stars: 3, percent: 4 },
    { stars: 2, percent: 1 },
    { stars: 1, percent: 0 },
  ],
  recommend: "96% of reviewers would recommend Airis Mat to a friend",
  metrics: [
    { label: "Dry floor", percent: 97 },
    { label: "No musty smell", percent: 94 },
    { label: "Easy care", percent: 98 },
  ],
} as const;

/** Three customer stories with photo (model: Testimonials section). [REVISAR] real customers + photos. */
export const TESTIMONIALS = {
  headline: "Real bathrooms. Real mornings.",
  subheadline: "What changed after they swapped the fabric mat for stone.",
  items: [
    {
      id: "t1",
      name: "Jennifer M.",
      location: "Austin, TX",
      quote: "My son has asthma, so I was washing mats constantly. Two weeks in, the musty smell was gone. The floor is dry before I finish brushing my teeth.",
      imageLabel: "Jennifer kneeling next to the Airis Mat in her bathroom while her son brushes his teeth",
      image: ASSETS.testimonialJennifer,
    },
    {
      id: "t2",
      name: "Sarah K.",
      location: "Denver, CO",
      quote: "Our apartment bathroom has no window. The old mat never dried — ever. This one is dry every single time, and the second mat went straight to the kitchen sink.",
      imageLabel: "Sarah standing on the Airis Mat in her windowless apartment bathroom",
      image: ASSETS.testimonialSarah,
    },
    {
      id: "t3",
      name: "David L.",
      location: "Chicago, IL",
      quote: "Got the Buy 2, Get 1 Free. Splashes at the sink vanish. My wife was skeptical — now she is telling all her friends.",
      imageLabel: "David at the kitchen sink with the Airis Mat on the floor, his wife beside him",
      image: ASSETS.testimonialDavid,
    },
  ],
} as const;

/** Authority block (model: Expert section) — same physician as the advertorials (message match). */
export const EXPERT = {
  seal: "DEVELOPED WITH AN INFECTIOUS DISEASE PHYSICIAN",
  cardTitle: "Designed for the bathroom that never dries",
  cardText: "The apartment bathroom with no window, a fan that barely works and a family that showers back to back — that was the brief.",
  headline: "Meet the doctor behind Airis Mat",
  role: "Dr. Oliver Stunk — Infectious Disease Physician",
  // [REVISAR] Dr. Stunk approves this quote before traffic
  quote:
    "The single wettest object in most homes is the bath mat, and it sits on the floor of the smallest closed room in the house. Taking the moisture out of it is the one change that costs almost nothing and removes an entire surface from the equation. That is what we built Airis Mat to do.",
  name: "Dr. Oliver Stunk",
  imageLabel: "Portrait — Dr. Oliver Stunk, infectious disease physician",
  image: ASSETS.expertStunk,
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
        "Two Airis Mats (one paid, one free), one Airis Mat room diffuser (a compact stone diffuser for essential oils — no electricity needed) and a sanding pad for care.",
    },
    {
      id: "bogo",
      question: "How does Buy 1, Get 1 Free work?",
      answer:
        "Pick a kit, pay for the mats listed as paid and we ship the free one in the same box — no code, nothing to add at checkout. Buy 1, Get 1 Free ships 2 mats; Buy 2, Get 1 Free ships 3. The offer runs while launch stock lasts.",
    },
  ],
} as const;

export const PURCHASE_CTA = {
  headline: "Ready for a drier, fresher home — this week?",
  badge: PROMO.badge,
  note: "Demand is high during the cold, humid months — stock is updated daily.",
} as const;

export const BUNDLE_SECTION = {
  headline: "Choose your kit — the free mat is already in the box",
  note: "Every kit ships free. Nothing to add at checkout.",
} as const;

export const GUARANTEE = {
  headline: "30-day satisfaction guarantee",
  text: "Try Airis Mat in your own home. If you're not happy, send it back within 30 days and get a full refund. No questions, no hassle.",
  sealLabel: "Guarantee seal — circular badge '30-day satisfaction guarantee' in brand gradient",
  seal: ASSETS.guaranteeSeal,
  // Closing box (model: Guarantee section — urgency + stock + CTA)
  boxImageLabel: "Two Airis Mats — the Buy 1, Get 1 Free kit",
  boxImage: ASSETS.bundleDuo,
  stockText: "Launch stock is limited — the free mat ends when it runs out.",
  stockPercent: 74,
  inStock: "In stock and ready to ship",
  closing: "Try it for 30 days with a full money-back guarantee.",
} as const;

// Policy links, support email and legal entity live in lib/legal.ts
export const FOOTER = {
  description:
    "Natural diatomite stone mats that keep floors dry and homes fresher — designed for modern homes.",
  seals: [
    { icon: "🪨", label: "NATURAL STONE" },
    { icon: "🎁", label: "BUY 1, GET 1 FREE" },
    { icon: "💰", label: "30-DAY GUARANTEE" },
    { icon: "🚚", label: "FREE US SHIPPING" },
  ],
} as const;

/** Sticky bottom bar (model: FixedConversionBar). */
export const FIXED_BAR = {
  imageLabel: "Airis Mat kit thumbnail",
  image: ASSETS.bundleDuo,
  label: "BUY 1, GET 1 FREE",
  sub: "Free US shipping • 30-day guarantee",
} as const;

export const CART_COPY = {
  title: "Cart",
  items: (n: number) => `${n} ${n === 1 ? "item" : "items"}`,
  emptyTitle: "Your cart is empty",
  emptyText: "Choose a kit to get started",
  checkout: "Proceed to checkout",
  checkoutNote: "You’ll be taken to our secure checkout to complete your order.",
  subtotal: "Subtotal",
} as const;
