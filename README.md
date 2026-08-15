# Rack N Road Sacramento Website

Private master repository for the Sacramento store page, category/subpages, and approved creative assets.

## Repository structure

- `site/` — complete August 14, 2026 Netlify deployment export, preserved exactly as received.
- `overrides/store-hero-2026-08-14/` — later rotating-store-hero package created after the main deployment export.
- `assets/latest-2026-08-15/` — newest store-page creative assets produced after the Netlify export.
- `archive/packages/` — original ZIP packages retained for provenance and recovery.
- `docs/` — design standards and handoff documentation included with the deployment.

## Current source-of-truth rule

GitHub is the master record. Netlify should publish from this repository after the deployable root is reviewed and normalized. Do not edit production files only in Netlify.

## Known status

The main deployment export and later hero package overlap. They have deliberately been preserved separately instead of silently overwriting files. The newest August 15 collage and homepage concepts have not yet been integrated into HTML and are stored under `assets/latest-2026-08-15/`.

The legacy `rnr-ikamper.html` page is not present in the August 14 deployment export and must be added separately before this inventory can be called complete.
