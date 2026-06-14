// Build-time content bake: fetch the latest content from Sanity and write it to
// content/*.json (the files the Next app imports). Runs before dev/build.
//
// Safe by design:
//   - No Sanity project id  → no-op (keeps the committed content/*.json fallback).
//   - Missing document / fetch error → keeps the fallback, never fails the build.
//
// So the site always builds, with or without Sanity configured.

import { createClient } from "@sanity/client";
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  process.env.SANITY_PROJECT_ID ||
  process.env.SANITY_STUDIO_PROJECT_ID;
const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  process.env.SANITY_DATASET ||
  process.env.SANITY_STUDIO_DATASET ||
  "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const write = (file, data) => {
  writeFileSync(join(root, "content", file), `${JSON.stringify(data, null, 2)}\n`);
  console.log(`[sanity-bake] wrote content/${file}`);
};

if (!projectId) {
  console.log("[sanity-bake] No Sanity project id set — using committed content/*.json fallback.");
  process.exit(0);
}

const imageProjection = (key) => `${key}{ "image": image.asset->url, alt }`;
const SETTINGS_QUERY = `*[_id == "siteSettings"][0]{
  siteName, shortName, title, description, phone, email, instagram,
  address{ street, postalCode, city, country },
  hours[]{ day, hours },
  "menu": { "pdf": menuPdf.asset->url, "pageCount": menuPageCount },
  "images": images{
    ${["hero", "interior", "bar", "event", "food", "terrace", "facade", "foodTwo", "drink"]
      .map(imageProjection)
      .join(",\n    ")}
  }
}`;

const HOME_QUERY = `*[_id == "home"][0]{
  intro{ text, button },
  menu{ eyebrow, heading, body, button },
  thumbs[]{ label, imageKey, icon },
  statement,
  sets{ heading, body, followerLabel },
  nights[]{ name, date, cta, link, hot, imageKey },
  host{ caption, imageKey },
  instagram{ eyebrow, heading, button },
  about{ eyebrow, blocks[]{ heading, body }, cards[]{ eyebrow, title, text, href, imageKey } },
  invite{ text }
}`;

const client = createClient({ projectId, dataset, apiVersion, useCdn: false });

try {
  const [settings, home] = await Promise.all([
    client.fetch(SETTINGS_QUERY),
    client.fetch(HOME_QUERY),
  ]);

  if (settings) write("settings.json", settings);
  else console.warn("[sanity-bake] no siteSettings document — keeping settings.json fallback.");

  if (home) write("home.json", home);
  else console.warn("[sanity-bake] no home document — keeping home.json fallback.");
} catch (error) {
  console.error(`[sanity-bake] fetch failed, keeping fallback content: ${error.message}`);
  process.exit(0);
}
