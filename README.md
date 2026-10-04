# domg.o — Creator Portfolio

A Vite, React and TypeScript portfolio for Dom Go. The site uses a paper-and-biro visual system, report-card references, campaign case studies and platform audience proof.

## Run locally

```bash
npm install
npm run dev
npm run build
npm run check
```

## Approved portfolio design

The active design is in `src/components/portfolio/`, styled by `src/portfolio.css`. It includes the photo-led hero, Open to Work creator profile, all 12 partner names, five campaign selections, and editorial press links. Earlier components and `src/index.css` are retained but no longer rendered, preserving the previous local work.

Partner-asset sources are documented in `public/portfolio-assets/SOURCES.md`. Audience and campaign figures are carried over from the portfolio and still need client confirmation of reporting dates and totals. The displayed figures are a reviewed portfolio snapshot, not a live feed.

The production build is deterministic and never calls social APIs. `npm run stats:update` is an optional editorial helper that writes an ignored snapshot for manual review; it does not update the published figures automatically.

## Quality checks

`npm run check` runs linting, behaviour and accessibility-focused component tests with coverage, the production build, and desktop/mobile Playwright journeys. GitHub Pages deployment runs the same command before publishing.

## Visitor reporting

The site supports optional aggregate Google Analytics 4 reporting. Analytics is disabled until a visitor explicitly allows it, and the choice can be changed from the footer. Add the web-stream measurement ID as `VITE_GA_MEASUREMENT_ID` in the deployment environment (or copy `.env.example` to `.env.local` for local testing), then rebuild and deploy.

Google fonts are bundled with the application, so typography does not disclose a visitor IP address to a font CDN.

In Google Analytics, create an acquisition or engagement report, then use **Share this report → Schedule email** to send Dom a weekly or monthly PDF/CSV. This reports aggregate traffic such as visits, referral source, approximate region, device and popular pages — not the identity of individual visitors.
