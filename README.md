# Rack N Road Sacramento Website

Private master repository for the Sacramento store page, category/subpages, and approved creative assets.

## Repository structure

- `site/` — complete August 14, 2026 Netlify deployment export, preserved exactly as received.
- `production/` — normalized, deployable site assembled from the latest verified files.
- `overrides/store-hero-2026-08-14/` — later rotating-store-hero package created after the main deployment export.
- `overrides/netlify-live-2026-08-15/` — files from the current live store deployment that differ from the August 14 export.
- `assets/latest-2026-08-15/` — newest store-page creative assets produced after the Netlify export.
- `archive/packages/` — original ZIP packages retained for provenance and recovery.
- `docs/` — design standards and handoff documentation included with the deployment.

## Current source-of-truth rule

GitHub is the master record. Netlify should publish from this repository after the deployable root is reviewed and normalized. Do not edit production files only in Netlify.

The deployable root is now `production/`. Netlify is configured through the repository-root `netlify.toml`; no build command is required.

Run `node scripts/audit-production.mjs` before publishing. The production pages keep their required visual assets in the repository, including snapshots of images that were previously loaded from Rack N Road or vendor CDNs.

## Known status

The main deployment export and later hero package overlap. They have deliberately been preserved separately instead of silently overwriting files. The newest August 15 collage and homepage concepts have not yet been integrated into HTML and are stored under `assets/latest-2026-08-15/`.

The complete current iKamper page and its five-image asset folder were recovered from the separate live iKamper Netlify deployment and added under `site/`.

The current store-page Netlify deployment was audited on August 15. Its changed homepage, four changed subpages, new Sacramento collage, and revised lighting animations/static fallbacks are preserved under `overrides/netlify-live-2026-08-15/`. See `docs/netlify-live-audit-2026-08-15.md` for the exact differences.
