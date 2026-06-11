# SEO Audit - Das Glockenspiel Kitzbühel

## Status

Implemented in this pass:

- Added richer page metadata with localized title, description, keywords, canonical, OpenGraph and Twitter card fields.
- Set document language to `de-AT`.
- Added index/follow robots metadata.
- Added `robots.txt` and `sitemap.xml` via Next metadata routes.
- Added schema.org JSON-LD for `BarOrPub` and `Restaurant`.
- Added `BreadcrumbList` JSON-LD.
- Improved image alt text for content images.
- Added lazy loading and async decoding to below-the-fold images.
- Added autocomplete hints to reservation form fields.
- Fixed `outputFileTracingRoot` earlier so production builds work from this app folder.

## Key Findings

### 1. Metadata was too generic

Before, the page title and description did not strongly target local search intent such as "Bar Kitzbühel", "Tapas Kitzbühel", "Drinks", "Live-Musik" or "Events".

Fix: Updated metadata in `app/layout.tsx`.

### 2. No canonical or share metadata

The page had no canonical URL, OpenGraph image, Twitter card, or production metadata base.

Fix: Added canonical, `metadataBase`, OpenGraph and Twitter metadata.

### 3. Missing local business structured data

For a hospitality business, structured data is important for entity understanding and local search eligibility.

Fix: Added `BarOrPub` / `Restaurant` JSON-LD with address, phone, email, opening hours, images, cuisine, reservation availability and Instagram profile.

### 4. No sitemap or robots route

Search engines had no generated sitemap/robots entry from the Next app.

Fix: Added `app/sitemap.ts` and `app/robots.ts`.

### 5. Image alt text was incomplete

Several visible, content-bearing images had empty alt text.

Fix: Added descriptive alt text for pillar cards, feature images, concept images and the poster river.

## Follow-Up Before Launch

- Confirm the final production domain. Current fallback is `https://www.dasglockenspiel.at`.
- Replace `NEXT_PUBLIC_SITE_URL` in deployment if the final domain differs.
- Add a real 1200x630 social preview image if a designed OG image exists.
- Consider adding individual pages or indexable sections for Events, Drinks/Menu and Contact if the site grows beyond a one-page landing experience.
- If exact latitude/longitude is available, add `geo` to LocalBusiness JSON-LD.
- If the menu PDF has a stable URL, add it as an indexable menu link and possibly `hasMenu`.
