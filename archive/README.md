# Archive — Classic edition (pre-editorial)

Preserved source for the original dark/Three.js homepage and its templates,
replaced by the editorial design that now lives at `/`.

- `classic-home/page.tsx` — original `app/page.tsx` (animated dark hero, ambient WebGL scene)
- `components/AmbientScene.tsx` — Three.js particle field
- `components/Marquee.tsx`, `SiteFooter.tsx`, `MenuFlipbook.tsx` — classic primitives
- `components/EventPageTemplate.tsx`, `LegalPageTemplate.tsx` — classic event/legal templates

These files are excluded from the build (`tsconfig.json` → `exclude`) and are not
routed (they live outside `app/`). Internal `@/components/*` imports point at the
original locations and are kept as-is for reference; restore by moving back into
`components/` and `app/` if ever needed.
