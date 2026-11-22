# Priyam Vashishtha — Portfolio

Next.js 16 (App Router) + React 19 + TypeScript. Statically prerendered; fonts via `next/font`, images via `next/image`.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server on http://localhost:3000 |
| `npm run build` / `npm start` | Production build / serve it |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | Unit tests (Vitest) |

## Structure

```
src/
├── app/          layout (fonts, metadata, CSS imports), page, favicon
├── components/   one file per section; client components only where interactive
├── data/         all copy and content as typed constants — edit content here
├── hooks/        useOnceInView, useReducedMotion, useScrolledPast
├── lib/          pure helpers (seeded star-field, count-up easing) + tests
└── styles/       global CSS split per section (import order matters; see app/layout.tsx)
public/
├── img/          product screenshots + avatar
├── Priyam_Vashishtha_CV_A4.pdf / .docx       ← CV for A4 countries (default)
└── Priyam_Vashishtha_CV_Letter.pdf / .docx   ← CV for US and Canada
    (the "Download CV" menu offers PDF and DOC, always saved as Priyam_Vashishtha_CV.pdf / .docx;
     US and CA get Letter, everyone else A4 — see src/lib/cvFiles.ts)
legacy/           the original single-file index.html, kept for reference
```

## Country-specific wording

The hero line and footer heading name the visitor's country ("open to roles in Switzerland") for
CH, IE, GB (shown as "the UK"), NL, FR, DE, PT, ES, LU, BE, SG, ID, VN, CA and US. Every other country, and
crawlers / link-preview bots, get neutral wording ("open to new opportunities").

How it works: `src/proxy.ts` reads Vercel's `x-vercel-ip-country` header and rewrites `/` to a
prerendered page at `/r/<CODE>`; the address bar never changes. The page stays static and CDN-cached.

- **Force a country** (for a link you send a recruiter, or to test): `/?country=ie`
- **Add a country:** add it to `src/data/regions.ts` — the static page and wording follow automatically.
- **Change the wording:** `src/lib/regionCopy.ts` (covered by tests).
- The page `<meta>` description is deliberately neutral so search results and link previews never show the wrong country.
- Locally there is no country header, so use `?country=xx` or `curl -H 'x-vercel-ip-country: CH' localhost:3000`.

## Adding a product / case study / role

Edit the matching file in `src/data/` — components render straight from those arrays.
