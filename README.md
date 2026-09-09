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
- **Cart / checkout / analytics** are not implemented — search for `// TODO` to find the integration points.
- Positioning: mold & respiratory health leads; anti-slip is a secondary benefit.
