# Launch Audit — Das Glockenspiel (Next app)

_Date: 2026-06-13 · Audited: `https://www.dasglockenspiel.at/app` (Next app) + source._

**SEO Health Score: ~70 / 100** — strong fundamentals, but one critical launch blocker (the app isn't actually serving as the live site) and a few high-impact on-page gaps.

---

## 🔴 Critical (blocks launch / indexing)

1. **The new site is hidden at `/app`; the root domain still serves the old Webflow site.**
   - `https://www.dasglockenspiel.at/` returns the original Webflow build (title "…Live-Musik mitten in der Altstadt", 8× `<h1>`, `website-files.com` favicon, no JSON-LD). The Next app only lives under `/app`.
   - Consequence: Google indexes the old site; the new one is a hidden duplicate. **This is the #1 launch task** — the Next app must become the root (Webflow Cloud mount at `/`, or a redirect/cutover).
2. **Canonical points to a different page than the one served.** `/app` home emits `<link rel="canonical" href="https://www.dasglockenspiel.at">` — i.e. canonicalizes to the root, which currently serves the *Webflow* site. Until cutover this tells Google "the real page is the old site."
3. **Sitemap lists root-domain URLs that don't match the app.** `app/sitemap.ts` emits `…/drinks`, `…/private-events`, etc. (no `/app`). Those currently resolve to the Webflow site or 404. Correct after cutover; broken before it.

## 🟠 High

4. **Home `<h1>` has no text.** The hero H1 is a CSS-background logo (`role="img"` + `aria-label`). Google reads no textual H1 on the most important page. Add visually-hidden text (e.g. "Das Glockenspiel — Bar, Tapas & Café in Kitzbühel") inside the H1.
5. **No `sr-only` utility** exists, so other icon/logo-only elements (footer wordmark, marks) also expose no text. Add a reusable visually-hidden class.

## 🟡 Medium

6. **Unused heavy dependency:** `three` + `@types/three` are in `package.json` but imported nowhere. Remove them (smaller installs, no confusion).
7. **Single canonical/OG image** for every page. `/drinks`, event pages, and legal pages reuse the home OG image. Give key pages their own OG image + per-page `openGraph`.
8. **No breadcrumb schema** on sub-pages; **no `FAQPage`/`Event` schema** for the events pages — both are strong local-SEO + AI-citation wins.
9. **Reduced-motion disables *all* motion.** Accessible, but it means many visitors (and you, in dev) see a static site. Consider allowing subtle opacity reveals under `reduce` while keeping transforms/parallax off.

## 🟢 Good (keep)

- Solid `<title>` + meta description, correct `lang="de-AT"`, all 39 images carry `alt`, WebP imagery.
- Valid JSON-LD: `["BarOrPub","Restaurant"]` with address + full `OpeningHoursSpecification` + geo.
- OG/Twitter tags present; absolute OG image URL with correct `/app` prefix.
- Self-hosted fonts (no Google Fonts runtime call), GDPR cookie consent gating the Instagram embed, favicon added.
- `robots.ts` + `sitemap.ts` present and wired to metadata.

---

## Design / UX / Performance notes

- **Strong editorial identity** — type pairing (Fraunces/Inter), theme switch, veil intro, polaroid collage, hover preview follower. Award-worthy direction.
- **Performance:** heavy client runtime (GSAP + Locomotive Scroll). Home First-Load JS ≈ 167 kB. Acceptable, but Locomotive/Lenis + ScrollTrigger are the main cost; LCP is the hero. Removing unused `three` and lazy-loading non-critical motion would help.
- **Accessibility:** good focus-visible states (consent), native cursor restored, reduced-motion respected. Gaps: empty textual H1, no skip-link, logo-only headings.
- **Content cadence:** the editorial copy is good; events pages would benefit from structured, CMS-editable detail (dates, prices) for both UX and `Event` schema.

## Recommended order of work

1. **Cutover**: make the Next app the root site (Webflow Cloud config) — unblocks everything above.
2. On-page: visually-hidden H1 text + `sr-only` util; per-page OG; breadcrumb/Event/FAQ schema.
3. Cleanup: drop `three`; consider relaxing reduced-motion to allow fades.
4. CMS: make copy/images/PDF/event data editable (see plan).
