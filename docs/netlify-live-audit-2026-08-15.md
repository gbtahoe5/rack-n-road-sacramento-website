# Netlify live-deployment audit — August 15, 2026

Audited site: `rack-n-road-sacramento-store-page-2026.netlify.app`

Current Netlify deploy: `6a801802b436ade48e9d0bb9`

Published: August 15, 2026 at 07:45:43 UTC

Deploy title: `Add Rooftop Tents Learn More link (deploy preview)`

## Files that differ from the August 14 repository export

- `index.html` — materially newer homepage. It includes the current rotating hero, Sacramento photo collage section, “35 Years of Knowing What Works,” “Already own a rack?”, and the rooftop-tents Learn More link.
- `bike-racks-101.html` — uses lighting animation revision `v6` and revised safety-callout styling.
- `e-bike-racks-sacramento.html` — uses lighting animation revision `v6` and revised safety-callout styling.
- `thule-racks.html` — current Netlify route links use extensionless paths.
- `yakima-racks.html` — current Netlify route links use extensionless paths.
- `rnr-sacramento-photo-collage.jpg` — not present in the August 14 repository export.
- `rack-lighting-with.gif` — newer live animation revision.
- `rack-lighting-without.gif` — newer live animation revision.
- `rack-lighting-with-static.jpg` — newer live reduced-motion/static fallback.
- `rack-lighting-without-static.jpg` — newer live reduced-motion/static fallback.

Exact live copies of all ten files are preserved in `overrides/netlify-live-2026-08-15/`.

## Files verified as already present

The cargo-box, DECKED, SmartCap, trailer-hitch, and What We Stand For pages match the repository byte for byte. The rotating hero images, store installation photographs, commercial-van image, running-board image, tonneau image, trailer-hitch image, truck-storage image, and `store-facts.js` are also already present. Some live HTML uses capital letters in image filenames while the repository uses lowercase names; those references must be normalized before a Git-based Netlify deployment from a case-sensitive build system.

## Scope note

The audit covers the current Netlify deployment record and every same-site page or asset reachable from the live site. The separate iKamper Netlify site was recovered independently into `site/ikamper-rooftop-tents-sacramento.html` and `site/rnr-ikamper-assets/`.
