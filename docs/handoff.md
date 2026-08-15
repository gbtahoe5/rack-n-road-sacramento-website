## PRIORITY — LIVE SITE (Olaf)
CORRECTION (Aug 13, late): 1-800-722-5872 is Rack N Road's OWN corporate line (800-RACK-USA — it's the site-wide footer CALL number), not a third party's. Earlier notes attributing it to DECKED were wrong. The real issue stands but is smaller:
1. The Sacramento intake page (racknroad.com/store/sacramento/intake/) shows NO Sacramento store number. Add at top of the form: "Prefer to talk? Call or text (916) 563-7333" (tel:+19165637333 / sms:+19165637333), driven by the store-facts global — store pages should carry the store line per the phone standard, not only the corporate 800.
2. No site-wide phone hunt needed; the footer 800 number is legitimate.

# RACK N ROAD — SACRAMENTO STAGING PACKAGE (Netlify → WordPress handoff)
Staging: https://rack-n-road-sacramento-store-page-2026.netlify.app (noindex via _headers — staging only, do NOT carry to production)

Every file below passed **RNR-STANDARD.md** (the house spec — read it first).

## Pages in this package → production homes
| File | Canonical production URL | Notes |
|---|---|---|
| index.html | racknroad.com/store/sacramento/ | Store page. Moving-sale hero is temporary — see SWITCHOVER CHECKLIST in file head comments |
| bike-racks-101.html | racknroad.com/bike-racks-101/ | Education page (mirror of /trailer-hitches/). Swap standalone nav for site header |
| what-we-stand-for.html | racknroad.com/what-we-stand-for/ | COMPANY-LEVEL — one copy for all eight stores, never duplicated per store. Swap nav for site header |
| store-facts.js | → WP global (ACF options / shortcode partial) | Single source for hours/phone/address. Render SERVER-SIDE into visible text AND LocalBusiness schema. Oct 1 address change happens here |
| good/better/best-hitch-anim.webp | host on racknroad.com | Optimized ~290KB animations — also replace the 3.6MB versions on the live /trailer-hitches/ page |
| hero-final.jpg + rnr-*.jpg + gallery webps | media library | Page assets |

## Link conventions
- Links to EXISTING racknroad.com pages are absolute and final — no changes needed.
- Links between staged pages are relative and match production slugs — they survive the move if permalinks match the table above.
- "RETARGET" / "NOTE (Olaf)" comments in each file mark every link that flips at launch (e-bike page markers, reviews Place ID, canonical swaps).

## Pending owner verification (do not launch without)
- Hours vs GBP (flagged in store-facts.js) · 4.9/1,000+ review figures · 10,000+ builds claim · manufacturer credential matrix
- Hero artwork still says "CLOSING SOON" (baked pixels) — designer one-word fix

## Post-Oct-1
Follow the SWITCHOVER CHECKLIST embedded at the top of index.html (address, schema, map, hero, hours — exit test: zero "Arden" references).

| e-bike-racks-sacramento.html | racknroad.com/store/sacramento/e-bike-racks/ | E-bike authority page (store child). Swap nav for site header; store page "Explore E-Bike Racks" links point here |
| cargo-boxes-sacramento.html | racknroad.com/store/sacramento/cargo-boxes/ | Cargo box selection + fitment tool (store child; complements cargo-box-rentals). Prices hand-typed pending Lightspeed feed |
| smartcap-canopies-and-caps.html | racknroad.com/store/sacramento/smartcap-canopies-and-caps/ | Upgraded SmartCap page, NEW slug (301 old /smartcap-canopies/ to it). Images embedded in page; SEO-named jpgs in package for media library (swap data-URIs at production). PENDING: Greg to confirm EVO Sport $4,995 vs Adventure $4,395 ladder |
| decked-cargo-slides.html | racknroad.com/store/sacramento/decked-cargo-slides/ | DECKED brand page (slug per Greg). Was calling DECKED's 800 number — fixed to store. Images embedded + SEO-named jpgs in package. Prices verified vs decked.com (Drawer $1,699.99 / Tool Box $1,099.99 / CargoGlide $1,499.99) |
| yakima-racks.html | racknroad.com/store/sacramento/yakima-racks/ | Yakima brand page (replaces existing child content). WRONG PHONE fixed (was 916-346-6490). Images embedded + SEO-named jpgs in package. FAQ + schema added from store facts |
| thule-racks.html | racknroad.com/store/sacramento/thule-racks/ | Thule brand page, cloned from the finished Yakima format per Greg (products/images swapped). WRONG PHONE in draft (916-346-6490) never shipped — clone carries store number. Hero is an overlay build with a DESIGNER ARTWORK SLOT marker (no Thule 2026 artwork yet). Water card links to the Hullavator Pro product page. 4 SEO-named Thule jpgs in package |
| trailer-hitches.html | racknroad.com/store/sacramento/trailer-hitches/ (NEW child) | Sacramento hitch page. Founding year fixed (was 1990), phones made executable, 4 dark sections flipped white, 7 accordions -> faqstd + schema, hitch reviews ladder, 14-city ring, new attested claim "Northern California's largest hitch installer, per location", wiring section linked to /store/sacramento/trailer-hitch-wiring/, 101 guide linked. Install price ranges ($100-$800) are Greg's attested figures. Company 101 at /trailer-hitches/ unchanged |


## GALLERY PHOTO WORKFLOW (added Aug 14)
Greg asked for an easy way to add gallery photos that stay uniform. Solution shipped on staging:
- **/gallery-photo-tool** — internal, noindex, fully client-side (no backend needed on Netlify). Drop a photo, pan/zoom inside a locked 4:3 frame (rule-of-thirds grid, rotate for phone shots), download a web-ready 1600x1200 webp (jpg fallback) with an SEO filename.
- The gallery grid CSS already enforces `aspect-ratio:4/3; object-fit:cover`, so ANY image displays as a uniform tile — the tool exists so the CROP is chosen by a human, not blind center-crop, and files arrive optimized.
- PRODUCTION: replicate the workflow with the WordPress media library — keep the 4:3 CSS on the gallery, and either keep this tool or use WP's built-in crop set to 4:3. New uploads then require zero developer involvement.
