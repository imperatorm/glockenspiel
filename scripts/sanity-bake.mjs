// Build-time content bake: fetch the latest content from Sanity and write it to
// content/*.json (the files the Next app imports). Runs before dev/build.
//
// Safe by design:
//   - No Sanity project id  → no-op (keeps the committed content/*.json fallback).
//   - Missing document / fetch error → keeps the fallback, never fails the build.
//
// So the site always builds, with or without Sanity configured.

import { createClient } from "@sanity/client";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
loadEnv(root);

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

const eventQuery = (id) => `*[_id == "${id}"][0]{
  slug, eyebrow, navLabel, title, kicker, body, primaryCta, secondaryCta,
  heroImageKey, detailImageKey, atmosphereImageKey, seoTitle, seoDescription,
  facts[]{ label, value },
  sections[]{ eyebrow, title, body, items },
  final{ title, body, button }
}`;

// Reshape a Sanity event doc to the content/events.json shape the app expects:
// facts as [label, value] tuples, and each section with either body OR items.
const mapEvent = (event) =>
  event && {
    ...event,
    facts: (event.facts ?? []).map((fact) => [fact.label, fact.value]),
    sections: (event.sections ?? []).map((section) => {
      const base = { eyebrow: section.eyebrow, title: section.title };
      return section.items && section.items.length
        ? { ...base, items: section.items }
        : { ...base, body: section.body ?? [] };
    }),
  };

const client = createClient({ projectId, dataset, apiVersion, useCdn: false });

try {
  const [settings, home, privateEvent, corporateEvent] = await Promise.all([
    client.fetch(SETTINGS_QUERY),
    client.fetch(HOME_QUERY),
    client.fetch(eventQuery("privateEvents")),
    client.fetch(eventQuery("corporateEvents")),
  ]);

  if (settings) write("settings.json", settings);
  else console.warn("[sanity-bake] no siteSettings document — keeping settings.json fallback.");

  if (home) write("home.json", home);
  else console.warn("[sanity-bake] no home document — keeping home.json fallback.");

  if (privateEvent && corporateEvent) {
    write("events.json", { private: mapEvent(privateEvent), corporate: mapEvent(corporateEvent) });
  } else {
    console.warn("[sanity-bake] missing event document(s) — keeping events.json fallback.");
  }
} catch (error) {
  console.error(`[sanity-bake] fetch failed, keeping fallback content: ${error.message}`);
  process.exit(0);
}

// Minimal .env loader (Node doesn't auto-load .env files; Webflow Cloud sets real
// env vars so these files just won't exist there). Does not override set vars.
function loadEnv(dir) {
  for (const file of [".env.local", ".env"]) {
    const path = join(dir, file);
    if (!existsSync(path)) continue;
    for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
      if (/^\s*#/.test(line)) continue;
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)\s*$/);
      if (!match) continue;
      const value = match[2].replace(/^["']|["']$/g, "");
      if (process.env[match[1]] === undefined) process.env[match[1]] = value;
    }
  }
}
