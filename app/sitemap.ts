import type { MetadataRoute } from "next";
import { COMPANY, LEGAL_LINKS } from "@/lib/legal";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: COMPANY.siteUrl, lastModified, changeFrequency: "weekly", priority: 1 },
    ...LEGAL_LINKS.map((l) => ({
      url: `${COMPANY.siteUrl}${l.href}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.3,
    })),
  ];
}
