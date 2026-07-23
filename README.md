# domg.o | Creator Portfolio

A Vite + React + TypeScript + Tailwind CSS v4 starter for a content-creator
portfolio site, styled after the reference video (dark theme, bold display
type, blue/teal accent).

## Getting started

```bash
npm install
npm run dev       # local dev server
npm run build     # production build to dist/
npm run preview   # preview the production build
```

## Structure

```
src/
  components/
    Nav.tsx        nav bar + CTA
    Hero.tsx        headline + signature "receipt" stat card
    Receipt.tsx     reusable itemized-receipt component (the site's signature motif)
    About.tsx       bio / quote section
    Stats.tsx       per-platform stat cards (styled as ticket stubs)
    Work.tsx        brand collaboration case cards
    Contact.tsx     contact block
    Footer.tsx
  index.css         Tailwind import + design tokens (@theme)
  App.tsx
```

## Customizing

All copy is placeholder content for a fictional creator ("Nova"). Swap it out:

- **Colors / fonts**: edit the `@theme` block at the top of `src/index.css`.
- **Copy & stats**: each section's content lives directly in its component
  file as plain data (e.g. the `platforms` array in `Stats.tsx`, the
  `collabs` array in `Work.tsx`).
- **Photos**: replace the placeholder box in `About.tsx` with an `<img>` tag.
- **Receipt component**: `Receipt.tsx` takes `title`, `subtitle`, `items`,
  `total`, and an optional `stamp` prop — reuse it anywhere you want that
  itemized-ledger look.
