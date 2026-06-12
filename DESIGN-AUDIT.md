# Das Glockenspiel — Design & Experience Audit

**Date:** 2026-06-12 · **Scope:** all routes (`/`, `/private-events`, `/corporate-events`, `/cookies`, `/datenschutz`, `/privacy-policy`)

---

## Executive summary

The site has a strong foundation: a confident dark/amber palette, Fraunces display type, a WebGL particle ambience, Lenis smooth scroll and a handful of GSAP touches. What separates it from an Awwwards-level experience is **choreography** — the moments between sections, the first impression, the navigation between pages, and the consistency of motion across every route. Today the motion system is front-loaded (hero only), fires incorrectly below the fold, and disappears entirely on legal pages.

| Dimension | Score | Notes |
|---|---|---|
| Art direction & identity | 8/10 | Distinct palette, type, texture. Cohesive. |
| Motion & choreography | 4/10 | Hero is animated; everything after coasts. |
| First impression / loading | 3/10 | No entrance moment; content pops in. |
| Page-to-page experience | 2/10 | Hard cuts between routes; legal pages have no motion system at all. |
| Micro-interactions | 5/10 | Magnetic buttons + underlines exist; no cursor, no hover language for media. |
| Technical execution | 6/10 | Solid stack, but several bugs (below). |

---

## Findings

### A. Motion system bugs (must fix)

1. **All `.reveal` elements fire at once on load.** `ScrollOrchestrator` animates every `.reveal` with a single ScrollTrigger on `.page-shell` at `top 75%` — which is true at scroll position 0. Below-the-fold reveals (event page hero copy, action rows) animate while off-screen, so visitors never see them. Reveals must be **per-element**.
2. **`html { scroll-behavior: smooth }` fights Lenis.** Programmatic scrolls get double-eased. Lenis owns scrolling; the CSS rule should go.
3. **`.page-shell { overflow: hidden }` silently breaks `position: sticky`** for descendants (the legal TOC and the stacked event detail cards). `overflow-x: clip` gives the same horizontal containment without creating a clipping scroll box.
4. **Legal pages mount no `ScrollOrchestrator`**: no smooth scroll, the nav never gets its scrolled state (`body.is-scrolled` is never set), and zero reveals. The experience visibly "switches off" on those routes.

### B. Missing experience layers (the Awwwards gap)

5. **No entrance.** The strongest sites open with a brief, branded preloader that hands off into the hero animation. Currently the hero letters animate over a page that has already popped in.
6. **No page transitions.** Clicking "Private Event anfragen" is a hard browser cut. A veil wipe that covers → navigates → lifts makes the site feel like one continuous space.
7. **Headings don't participate.** Only `.section-head` (used once) animates. Every section h2 should arrive as masked line/word reveals — this is the single highest-impact upgrade for perceived quality.
8. **The statement section ("welcome home.") is static** — the boldest typographic moment on the page does nothing.
9. **Marquee is metronomic.** Constant 26s loop regardless of scroll. Velocity-reactive speed (and skew on the poster river) makes scroll feel physical.
10. **Images appear without ceremony.** Media should enter with a clip-path mask + inner scale settle; the current `image-lift` fade reads as a loading artifact rather than a reveal.
11. **No custom cursor.** A dot/ring cursor with hover growth and contextual labels ("Blättern" on the flipbook) is table stakes for this category. Must be pointer-fine only and disabled over form fields.
12. **No scroll progress / spatial feedback.** A 2px progress bar quietly tells visitors where they are in the story.
13. **Nav never gets out of the way.** Hide-on-scroll-down / return-on-scroll-up keeps the canvas clean during reading and the CTA available the moment intent reverses.
14. **Footer wordmark is inert.** The outlined "Glockenspiel" is a perfect scrub-reveal target (rise + fill on hover).

### C. Consistency

15. **Legal pages use a different, hand-rolled footer** instead of `SiteFooter` — different links, no wordmark, no grid. One footer everywhere.
16. **Event detail-card sticky stack** depends on finding A3 being fixed; today the stacking effect doesn't actually engage.

### D. Performance & accessibility (recommendations)

17. Fonts load via CSS `@import` (render-blocking, late discovery). Quick win: `preconnect` hints; proper fix: `next/font`.
18. Images are remote Webflow CDN assets via bare `<img>` — no `srcset`, no priority hint for the hero. Consider `next/image` with `remotePatterns` later.
19. `prefers-reduced-motion` is respected by the orchestrator (good) — the new layers (preloader, cursor, transitions) must honor it too: instant veil dismissal, no cursor takeover, no scroll hijacking.
20. The English `/privacy-policy` alias renders German content under `lang="de-AT"` — fine for SEO (noindex), but worth a note.

---

## Implementation plan (what ships in this pass)

| Priority | Item | Findings |
|---|---|---|
| P0 | Per-element reveal system; remove CSS smooth-scroll; `overflow-x: clip`; orchestrator + `SiteFooter` on legal pages | 1–4, 15, 16 |
| P0 | Branded preloader veil → hero handoff; route-transition wipes | 5, 6 |
| P1 | Masked word reveals for all section headings (`data-split`); statement scrub; image mask reveals (`data-mask`) | 7, 8, 10 |
| P1 | Custom cursor with contextual labels; scroll progress bar; smart-hiding nav | 11, 12, 13 |
| P2 | Velocity-reactive marquee + poster-river skew; footer wordmark scrub | 9, 14 |
| P2 | Font/CDN preconnects | 17 |

Deferred (recommended next): `next/font` migration, `next/image` adoption, self-hosted hero asset with priority loading.
