# THE RNR STANDARD (v2) — the complete page standardization runbook
Invocation: give Claude a page URL or file and say **"run the RNR Standard."**
Everything below gets checked and fixed, in this order, on every new or updated page.
(v2 codifies the full operational checklist, including every failure class caught
during the Sacramento build. Binding on staging AND Olaf's production builds.)

════════════════════════════════════════════════════════════════
## PHASE 1 · AUDIT (before touching anything)
Fetch the page and profile it:
- [ ] Title tag, exactly one H1, valid head/body structure
- [ ] Typeface = Inter? Colors on-palette (#c0392b UI red, #d61f26 hero red)?
      List every hex used; flag strays
- [ ] html font-size 91.2% present?
- [ ] PHONES — every tel:/sms: link and every visible number.
      Known failure modes (all caught in the wild):
      · placeholder text (INSERT/XXX)
      · bare format missing +1 (tel:9165637333)
      · a DIFFERENT business's number (DECKED's 800-722-5872)
      · right area code, wrong number (916-346-6490)
      · correct number styled as a second pill
- [ ] FOUNDING YEAR: 1991 only (never 1989/1990) · "35+ years" (never 37)
      · NEVER "Closing Soon"
- [ ] HOURS: every visible hours string = the owner-confirmed set
      (currently MON-SAT 9AM-5PM, SUN Closed) — check even if a site-wide
      sweep ran before; sweeps don't cover pages staged later
- [ ] FAKE REVIEWS SCAN: reviewer-style names (First L.), star blocks,
      "Verified Owner" attributions — assume invented until proven; quotes
      copied from a manufacturer's site are still not OUR reviews
- [ ] All prices listed; note which need verification
- [ ] All images: hotlinked (vendor CDN = fragile), broken relative refs,
      missing alt text, generic filenames
- [ ] All anchors: dead href="#", wrong destinations (pills to /stores/),
      CTA count and classes (check BOTH attribute orders — class-first AND
      href-first; one pill dodged a fix by attribute order)
- [ ] FAQ format: accordions/details = must convert
- [ ] Non-linked cards/bubbles with link affordances (hover lift, pointer cursor)

## PHASE 2 · FACTS & PRICES (nothing ships unverified)
- [ ] Every product price verified against the live racknroad.com /p/ page,
      or the manufacturer's current site for brand pages; correct stale MSRPs
- [ ] Claims with numbers (review counts, ratings, "largest", credentials)
      must be verifiable or owner-attested; NEVER print a manufacturer
      credential/title that the manufacturer doesn't actually issue —
      verify the program name on their site first
- [ ] Hours/phone/address wrapped in data-rnr / data-rnr-html slots +
      store-facts.js include before </body> (single source of truth)

## PHASE 3 · DESIGN SYSTEM
- [ ] Inter typeface (add Google Fonts link if absent)
- [ ] Off-palette reds → #c0392b; golds only for stars + floating button
- [ ] html { font-size: 91.2% }
- [ ] White sections only — no black/grey content blocks; separation by
      spacing and hairlines; dark backgrounds flip to white
- [ ] Grid minmax floors ≤250px (clears 320px viewports)
- [ ] HERO: image-first with text overlaid (white type, gradient scrim,
      text-shadow, clamp() sizing) OR designer artwork with text baked in —
      if baked in, REMOVE all HTML overlay text (no duplicate headline) and
      keep an sr-only h1 + full alt text for SEO/accessibility
- [ ] Standard credibility band DIRECTLY BELOW the hero card (not above):
      Authorized Dealer · 4.9 Stars/1,000+ Reviews (linked) · 35+ Years ·
      Certified Installers · 10,000+ Builds — white band, hairline borders

## PHASE 4 · CONVERSION SYSTEM
- [ ] Floating Contact Us: gold pill, bottom-right, safe-area aware →
      https://racknroad.com/store/sacramento/intake/
- [ ] EXACTLY ONE pill per page — the closing conversion moment → INTAKE
      FORM (attribution), never a bare tel:
- [ ] Nav CTA slot → reciprocal "Sacramento Store" link
- [ ] Everything else = red text links (#c0392b); phone access as
      "Call or text (916) 563-7333" red links (customers who prefer to
      talk always have a path before the form)
- [ ] ZERO dead hrefs; "Get Directions" opens Google Maps, not a webpage
- [ ] Unlinked cards must NOT look like links (strip hover/cursor);
      linked cards announce with explicit red "Explore →" arrows

## PHASE 5 · CONTENT STANDARDS
- [ ] FAQ: visible two-column grid (.faqstd), bold inline Q + answer,
      category labels as full-width dividers if present, NO accordions;
      FAQPage schema REGENERATED 1:1 from the visible set; no semantic
      duplicate pairs; new FAQs built ONLY from attested store facts
- [ ] REVIEWS: never invented testimonials; linked aggregate + real Google
      listing link; EVERY rating mention on the page links out
      (inherit-color underline); keyword fallback ladder in a head marker —
      section keyword → parent category → "installation" → unfiltered;
      anchor text matches the populated level; production upgrade =
      search.google.com/local/reviews?placeid=PLACE_ID&q=KEYWORD
- [ ] Brand pages: authority framing ("Northern California's largest
      in-stock…" where attested), full-line completeness band, Trade-in/
      Trade-up/Tune-up band on rack-category pages, "no other stop needed"
      positioning
- [ ] SURROUNDING AREAS (local SEO — critical post-move): every page names the
      service ring in visible copy at least once (Serving line, SEO footer, or a
      geography-aware FAQ) — Sacramento, Citrus Heights, Roseville, Rocklin, Lincoln,
      Granite Bay, Orangevale, Fair Oaks, Folsom, El Dorado Hills, Elk Grove,
      Davis, Auburn, Placerville —
      weighted to the NEW Citrus Heights location's catchment (Roseville is
      minutes away and becomes primary); production: LocalBusiness schema
      carries matching areaServed entries
- [ ] Catalog links carry ?store=sacramento

## PHASE 6 · IMAGES
- [ ] Download all vendor-CDN images into the package (no hotlinks)
- [ ] SEO-name every file descriptively from its alt text
      (brand-product-context.jpg) — filenames are search signals
- [ ] Optimize: heroes ~200–400KB, cards ≤150KB
- [ ] EMBED images as base64 data-URIs so the page is portable standalone;
      keep the SEO-named jpgs loose in the package for the media library
      (production swaps data-URIs for the hosted files)
- [ ] Alt text on every image

## PHASE 7 · STRUCTURE & WIRING
- [ ] Breadcrumb: Rack N Road / Sacramento / [Page]
- [ ] Canonical comment in <body> declaring the production URL — CHECK THE
      REAL SLUG first (grep the store page's existing links; yakima-racks
      not yakima); staged filename = production slug
- [ ] Store page door link(s) retargeted to the staged file with RETARGET
      markers naming the production URL
- [ ] HANDOFF.md row added (production home + notes + pendings)
- [ ] noindex inherited via _headers (staging only — never to production)

## PHASE 8 · SHIP & VERIFY (the negative audit — non-negotiable)
Deploy to staging, then verify on the LIVE URL, not just the local file:
- [ ] Page returns 200; new content present
- [ ] OLD CONTENT GONE: duplicate headline scan, leftover hero blocks,
      stray CTA rows — "did the new thing arrive" AND "did the old thing
      leave" are separate checks
- [ ] COUNTS: exactly 1 h1 · exactly 1 pill · single credibility band ·
      band positioned BELOW hero
- [ ] Phones: store number only, executable format, zero foreign numbers
- [ ] Hours: correct set, slot-driven
- [ ] HTML parses clean (position-aware check; repair strays surgically,
      never by blind trimming)
- [ ] Zip + master + offline preview refreshed; deliverables re-presented

## STANDING FACTS (current values)
- Phone/text: (916) 563-7333 · tel:+19165637333 · sms:+19165637333
- Hours: MON-SAT 9AM-5PM, SUN Closed (owner-confirmed Aug 2026)
- Until Sept 30: 2021 Arden Way, Sacramento CA 95825 (Moving Sale 10–70%)
- From Oct 1, 2026: 7812 Auburn Blvd., Citrus Heights CA 95610
- Founded 1991 · 35+ years · intake: /store/sacramento/intake/
- Service ring: Sacramento, Citrus Heights, Roseville, Rocklin, Lincoln, Granite Bay, Orangevale, Fair Oaks, Folsom, El Dorado Hills, Elk Grove, Davis, Auburn, Placerville
- Maps link: google.com/maps/search/?api=1&query=Rack+N+Road+2021+Arden+Way+Sacramento+CA
