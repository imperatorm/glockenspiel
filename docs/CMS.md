# Content editing (Sanity CMS)

The client edits content in a **hosted Sanity Studio** (polished UI, media library,
no local dev needed). The Next site reads that content **at build time** and bakes it
into `content/*.json`, which the app imports — so the deployed Cloudflare Workers
runtime stays fetch-free and fully static.

```
Sanity Studio (hosted)  ──edit──▶  Sanity dataset
                                        │  npm run build → scripts/sanity-bake.mjs (GROQ fetch)
                                        ▼
                                 content/*.json  ──imported by──▶  lib/site.ts ──▶ pages (SSG)
```

**Safe fallback:** if Sanity env vars aren't set (or a fetch fails), the bake is a
no-op and the site builds from the committed `content/*.json`. So nothing breaks
before Sanity is connected.

## One-time setup

1. **Create a project** at [sanity.io/manage](https://www.sanity.io/manage) (free) →
   copy the **Project ID**. Create a dataset named `production` (public).
2. **Set env vars** (locally in `.env.local`, and in Webflow Cloud for deploys):
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=<projectId>
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_STUDIO_PROJECT_ID=<projectId>
   SANITY_STUDIO_DATASET=production
   ```
3. **Seed** the current content into Sanity (uploads the images + menu PDF, fills both
   documents). Create an **Editor token** at sanity.io/manage → API → Tokens, then:
   ```
   SANITY_API_TOKEN=<token> npm run sanity:seed
   ```
   (Or skip and enter content by hand in the Studio.)
4. **Publish the Studio** so the client can use it from a URL:
   ```
   npm run sanity:deploy      # → https://<project>.sanity.studio
   ```
   (Run `npm run sanity` for a local Studio at http://localhost:3333 while developing.)

## Day-to-day editing (the client)

1. Open the Studio URL (bookmark it), edit **Einstellungen** or **Startseite**, click
   **Publish**.
2. Redeploy the site so the change is baked in:
   - Best: add a **Sanity webhook** → a Webflow Cloud deploy hook (auto-rebuild on publish).
   - Or trigger a redeploy in Webflow Cloud manually.

The deploy runs `npm run build` → `sanity-bake` fetches the latest content → static rebuild.

## What's editable

- **Einstellungen** (`siteSettings`): name, SEO title/description, phone, email, Instagram,
  address, opening hours, the **Getränkekarte PDF**, and all **brand images + alt text**.
- **Startseite** (`home`): every section's copy — intro, drinks section, statement, the
  nights list, host caption, Instagram section, the “Über uns” blocks, and the event
  teaser cards. Images are chosen by key from the Einstellungen → Bilder set.

Both flow into `lib/site.ts` (`siteConfig`, `assets`, `imageAlt`, `menuFlipbook`,
`content`, `home`), so pages, metadata, JSON-LD, the reservation modal and hours pill all
update automatically.

## Files

- `sanity.config.ts`, `sanity.cli.ts`, `sanity/` — Studio config + schemas.
- `scripts/sanity-bake.mjs` — build-time fetch → `content/*.json` (with fallback).
- `scripts/sanity-seed.mjs` — one-time import of current content into Sanity.
- `content/*.json` — the baked content the site imports (also the committed fallback).

## Extending to the remaining pages

The event pages (`lib/site.ts` → `eventPages`) and legal pages (`lib/legal.ts`) are still
in code. To make them editable, add `eventPage` / `legalPage` schema types in
`sanity/schemaTypes/`, extend `scripts/sanity-bake.mjs` to write `content/events.json` /
`content/legal.json`, and read those in `lib/site.ts` — the same pattern used for `home`.
