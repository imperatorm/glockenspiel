# Maloot (maloothifibar.com) — Code & Reference Review

**Date:** 2026-06-12 · **Purpose:** ground the Glockenspiel `/v2` editorial page in how the reference actually works, not just how it looks. Source files archived in `.claude/maloot*.{html,js,css}`.

---

## 1. Stack

| Layer | Maloot | Glockenspiel equivalent |
|---|---|---|
| Platform | Webflow + jQuery runtime | Next.js 15 (no jQuery) |
| Animation | GSAP core **3.12.7** + ScrollTrigger **3.12.5** + SplitText **3.13.0** (mismatched versions, Club plugin from CDN) | GSAP 3.13, hand-rolled word splitter (free) |
| Smooth scroll | **Lenis**, configured via data attributes — easing `1 - 2^(-10t)` | Lenis, **identical easing curve** |
| Media | Swiper 11 (mobile galleries), Vimeo Player SDK (set previews) | none yet |
| Custom code | Hosted on Slater, injected after DOMContentLoaded (`Global.js`, `Home.js`, `Home.css`) | Components in-repo |
| Fonts | **Inter Tight Bold** (display sans) + **Times Now Light** (serif), woff2, `font-display: swap` | Inter 900 + Fraunces — correct analog |
| Theme | sage `#a8a99e` bg, ink `#191313`, light `#f1f1f1`; localStorage **light/dark theme switcher** that live-swaps CSS variables | cream `#f1e7d7`, plum `#151216`, amber |

## 2. How the page actually works (≠ the screenshot)

The static screenshot hides most of the design. The real mechanics:

### Hero — an interactive image stage, not a static strip
- Full-viewport hero with **5 invisible vertical hover slices**; mousing across swaps the active background photo (`.hero_slice[data-id]` → `.hero_img.active`).
- "Hifi Bar / Cocktails / Vinyls" are **h1/h2 headings separated by divider bars** that sit on top.
- The MALOOT wordmark is **sliced letter images** (`.hero_logo-c .img-ab`) that rise in with stagger; the square glyph rotates in from 90°.

### The loading choreography (their signature moment)
Timeline gated on `document.fonts.ready`, with `[data-hidden] { visibility: hidden }` for FOUC control, three responsive variants via `gsap.matchMedia`, and `ScrollTrigger.refresh()` on complete:
1. Page opens **light**: headings small (0.4em) and grey, dividers at width 0.
2. Words blur-slide in (word1 from left x:-200, word3 from right x:+200, word2 rises).
3. Dividers expand 0 → 27%, type scales 0.4em → 1em (the layout "inflates").
4. Hero photo fades in and settles scale 1.4 → 1 (expo.out); section background snaps dark; text recolors light.
5. Menu links drop in; wordmark letter slices rise; pointer events unlocked.

### Section systems
- **Headings/paragraphs**: SplitText **line masks** (`[heading-line]`, `[p-line]`) on scroll enter; `[scroll-heading]` variant is scrubbed (top 85% → top 40%).
- **Buttons**: dual-label hover — default label's words blur up and out while an alternate label blurs in (SplitText words, stagger 0.05) + background scales 1.15.
- **Underline links**: two-layer underline slide (out right, in from left, 0.15s delay).
- **Menu**: GSAP `y: -100%` on scroll down / return on scroll up + `pointerEvents` toggling (same pattern as our `nav-hidden`).
- **Drinks**: hover a thumbnail in the rail → swaps the active gallery image *and* description block (CMS-driven trio of synced lists). Thumbnails enter x:120 staggered.
- **Gallery**: CSS-animation marquee + hover accordion — hovered item gets `.active`, neighbors get `.close1` (width squeeze).
- **Sets table**: the highlighted row is actually a **floating tile** (`.set_tile`) that `translateY`s to whichever row is hovered (desktop) or nearest viewport-center (mobile scroll). Each set has a **Vimeo preview** managed by IntersectionObserver + custom events; a pinned preview track scrubs to 100vh.
- **Story polaroids**: scrub parallax with **per-image `data-rotate-start/end` attributes** — each photo translates and rotates at its own rate while scrolling.
- **Intro photo**: a **looping slideshow** — repeating timeline cycles 3 images (scale 0.7→1 + fade, stagger 1.4s), play/paused by ScrollTrigger visibility.
- **Footer**: overline divider draws width 0→100% (expo.inOut) + items fade in staggered.
- **Images**: full Webflow `srcset/sizes`, webp/avif, `fetchpriority=high` on the hero.

## 3. Weaknesses (don't copy)

1. **No `prefers-reduced-motion` handling anywhere** — the intro, scrub effects and marquees run unconditionally. Our build already does this correctly.
2. **Mixed GSAP plugin versions** (3.12.7 / 3.12.5 / 3.13.0) — works by luck.
3. **Slater waterfall**: custom JS loads after DOMContentLoaded from a third-party host — animations land late on slow networks; content is held behind `data-hidden` meanwhile.
4. Unthrottled `window.scroll` listener for the menu; `gsap.killTweensOf("*")` as matchMedia cleanup.
5. Hover-only interactions (slices, drink rail, set rows) have **no keyboard/touch equivalents** on desktop.
6. jQuery + Webflow runtime overhead for what is, in practice, a GSAP site.

## 4. Gap analysis → adoption plan for `/v2`

What our `/v2` already matches: palette inversion, structure, Lenis + masked text reveals, hide-on-scroll nav, reduced-motion safety (better than theirs).

What would close the experience gap, in order of impact:

| # | Upgrade | Source pattern | Effort |
|---|---|---|---|
| 1 | **Staged hero intro**: labels small + dividers at 0 → dividers expand, type inflates → wordmark letters rise → strip photos scale-settle in | Hero timeline | M |
| 2 | **Floating highlight tile** on the "Nächte" table that glides to the hovered row (amber), instead of a static highlighted row | `.set_tile` translateY | S |
| 3 | **Polaroid scroll rotation/parallax** via per-image `data-rotate-start/end` | Story section | S |
| 4 | **Looping slideshow** for the centered intro image (cycle 3 assets, pause offscreen) | Intro section | S |
| 5 | **`document.fonts.ready` gating + data-hidden** before the intro (kills the font-swap flicker in split headings) | Home.js bootstrap | S |
| 6 | **Hero hover slices** swapping the strip photo (desktop, with focus/touch fallback) | Hero slices | M |
| 7 | Dual-label button hover (word swap + blur) | Global.js buttons | M |
| 8 | Footer divider draw-in | Footer | XS |
| 9 | Responsive images (`srcset` or `next/image`) — they ship 7 sizes per image, we ship one | Webflow media | M |

Recommended cut: **1–5 + 8** makes `/v2` feel like the reference in motion, not just in layout, while staying reduced-motion-safe. 6–7 are nice-to-haves; 9 is the standing perf item from the original audit.
