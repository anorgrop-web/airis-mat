/**
 * Media assets hosted on Cloudflare R2 (public bucket behind anorcorp.com).
 * File names match the placeholder labels used while designing the page.
 * URLs are built with encodeURIComponent so spaces, commas, dashes and accents are safe.
 */
export const R2_BASE = "https://anorcorp.com/airis%20map";

export function asset(fileName: string): string {
  return `${R2_BASE}/${encodeURIComponent(fileName)}`;
}

export const ASSETS = {
  // Brand
  logo: asset("logomarca.jpeg_2K_202609081539.jpeg"),

  // Hero carousel (5 slides)
  hero1: asset("hero 1 - primeira sessão.jpeg"),
  hero2: asset("her 2 - primeira sessão.jpeg"),
  hero3: asset("her 3 - primeira sessão.jpeg"),
  hero4: asset("hero 4 - primeira sessão.jpeg"),
  hero5: asset("hero 5 - primeira sessão.jpeg"),

  // 8 benefit icons (also reused in the marquee)
  icon1: asset("icon 1 - Absorbs water in seconds.jpeg"),
  icon2: asset("icon 2 - Fully dry within minutes.jpeg"),
  icon3: asset("icon 3 - Naturally resists mold.jpeg"),
  icon4: asset("icon 4 - Fresher indoor air.jpeg"),
  icon5: asset("icon 5 - 100% diatomite stone.jpeg"),
  icon6: asset("icon 6 - Non-slip base.jpeg"),
  icon7: asset("icon 7- Rinse or sand to clean.jpeg"),
  icon8: asset("icon 8 - Fits kitchen & bathroom.jpeg"),

  // Technology blocks
  tech1: asset("animação cortada.mp4"), // replaced "tech 1 - animated sequence.mp4"
  tech2: asset("tech 2 - Tech 2 — split image.jpeg"),
  tech3: asset("tech 3.jpeg"),

  // Stats
  stat1: asset("stet 1.jpeg"), // file name has a typo on the bucket — keep as-is
  stat2: asset("Stat 2 — fresh bright bathroom.mp4"),
  stat3: asset("stat 3.jpeg"),
  stat4: asset("stat 4.jpeg"),

  // Comparison
  comparisonAiris: asset("Comparison — Airis stone mat, clean product.jpeg"),
  comparisonCloth: asset("Comparison — generic damp cloth.jpg"),

  // Steps
  step1: asset("Step 1 — unboxing the mat and placing it on the floor.jpeg"),
  step2: asset("Step 2 — feet stepping onto the mat, water absorbed.jpeg"),
  step3: asset("Step 3 — fresh, bright bathroom with plants and open window.jpeg"),

  // Review portraits
  reviewJennifer: asset("Jennifer, 30s.jpeg"),
  reviewMichael: asset("— Michael, 40s, kitchen background.jpeg"),
  reviewSarah: asset("— Sara k.jpeg"),
  reviewEmily: asset("Emilly T.jpeg"),
  reviewDavid: asset("David L.jpeg"),

  // Bundles
  bundleSingle: asset("single Airis stone mat, produ.png"),
  bundleDuo: asset("two Airis mats stacked, product.jpeg"),
  bundleBathroomPlus: asset("mat with room diffuser, product.jpeg"),

  // Guarantee seal
  guaranteeSeal: asset("garantia 30 dias.png"),

  // Uploaded but intentionally not used on the page (kept for future sections / ads)
  moldToLungs: asset("mofo indo para os pulmões.jpeg"),
} as const;

export type AssetKey = keyof typeof ASSETS;
