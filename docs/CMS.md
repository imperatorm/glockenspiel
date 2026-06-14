# Content editing (Keystatic CMS)

The site uses **[Keystatic](https://keystatic.com) in local mode** — a git-based CMS.
Content lives as files in `content/` (committed to the repo). There's **no external
service, database, or API key**.

## How to edit content

1. Run the site locally:
   ```bash
   npm run dev
   ```
2. Open the editor: **http://localhost:3000/keystatic**
3. Edit fields / replace images, then click **Save**. Keystatic writes the change
   to a file under `content/` (and copies any new images/PDF into `public/`).
4. Commit the changed files and push — the deploy rebuilds with the new content.
   ```bash
   git add content public && git commit -m "Update site content" && git push
   ```

> The editor only runs in local dev. The deployed site (Webflow Cloud / Cloudflare
> Workers) has no writable filesystem, so `/keystatic` there just shows a notice and
> `/api/keystatic` returns 404. Content is read at **build time** and served as static
> HTML — fast and safe on Workers.

## What's editable today

The **“Einstellungen & Inhalte”** singleton (`content/settings.json`) covers the
highest-value, cross-site content:

- Business info: name, SEO title/description, phone, email, Instagram, address
- Opening hours
- The **Getränkekarte PDF** + page count
- All **9 brand images** (hero, bar, interior, …) **and their alt text**

These flow into `lib/site.ts` (`siteConfig`, `assets`, `imageAlt`, `menuFlipbook`,
`content.hours`), so every consumer — pages, metadata, JSON-LD, the reservation
modal, the hours pill — updates automatically.

## How it's wired

```
content/settings.json   ← edited via /keystatic
        │  (imported directly, bundled at build → no runtime fs)
        ▼
lib/site.ts             ← builds siteConfig / assets / imageAlt / menuFlipbook / hours
        ▼
pages + components       ← unchanged
```

- `keystatic.config.ts` — the schema (fields shown in the editor).
- `app/keystatic/*` + `app/api/keystatic/*` — the admin UI + API (dev-only).
- Images use `withBase()` at render time so they resolve under the `/app` mount.

## Extending to page copy (next step)

Home / drinks / event / legal page copy currently lives in `lib/site.ts`
(`content`, `eventPages`) and `lib/legal.ts`, and some strings are inline in the
page JSX. To make those editable, add singletons/collections to
`keystatic.config.ts` (e.g. a `home` singleton, an `events` collection, `legal`
pages), create the matching `content/*.json` files, and read them in the same
import-the-JSON pattern used for `settings`. The settings singleton is the
reference implementation.
