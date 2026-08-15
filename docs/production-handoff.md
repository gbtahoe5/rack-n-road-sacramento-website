# Production handoff

## Deployable root

`production/` is the sole normalized Netlify publish directory. It contains the current verified store homepage, ten current store subpages, the recovered iKamper page, and only the local assets required by those pages.

Netlify configuration lives in the repository-root `netlify.toml` and sets `production/` as the publish directory. No build command is required.

## Canonical source decisions

- The homepage comes from the live August 15 Netlify deployment and supersedes `index_5.html` and the August 14 homepage exports.
- Bike Racks and E-Bike Racks use the live `v6` lighting animation revisions.
- Thule and Yakima use the current live Netlify versions.
- Cargo Boxes, DECKED, SmartCap, Trailer Hitches, and What We Stand For matched the repository export and are copied from `site/`.
- iKamper comes from its separate current Netlify deployment with all five original local images.

## Normalizations applied

- The homepage iKamper CTA now stays inside this deployment.
- Store-photo filename capitalization is normalized for Netlify's case-sensitive filesystem.
- The broken DECKED hero path now points to the included DECKED hero image.
- The broken cargo-rental link now points to the live Rack N Road rental page.
- Images previously loaded from Rack N Road and Yakima URLs are preserved locally under `production/assets/vendor/` and page references now use those repository copies.
- The missing e-bike social image was recovered from the page's embedded hero image.
- Clean extensionless routes are explicitly rewritten in `netlify.toml`.
- Netlify-hosted staging remains `noindex` until the content is moved to the production Rack N Road domain.

## Verification

Run `node scripts/audit-production.mjs` from the repository root. It checks local page and asset references, clean Netlify routes, JSON-LD syntax, image file integrity, and whether any page still depends on an externally hosted image.

`scripts/localize-production-assets.mjs` records the recovery procedure used to copy externally hosted images into the production tree. It is not a build step.

## Archived material

`site/`, `overrides/`, `assets/`, and `archive/` remain preservation areas. Netlify must publish only `production/`.
