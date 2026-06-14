// One-time seed: push the current content/*.json (and public images / menu PDF)
// into Sanity so the Studio starts pre-filled. Run once after creating the
// project. Requires a write token:
//   SANITY_API_TOKEN=... NEXT_PUBLIC_SANITY_PROJECT_ID=... node scripts/sanity-seed.mjs
//
// Best-effort / idempotent (createOrReplace). Verify the result in the Studio.

import { createClient } from "@sanity/client";
import { createReadStream, existsSync, readFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
loadEnv(root);

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01";
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error("[sanity-seed] Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_TOKEN (Editor token).");
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false });
const readJson = (file) => JSON.parse(readFileSync(join(root, "content", file), "utf8"));
const withKeys = (arr, prefix) => arr.map((item, i) => ({ _key: `${prefix}${i}`, ...item }));

async function upload(kind, localPath) {
  if (!localPath || /^https?:\/\//.test(localPath)) return undefined; // already remote
  const abs = join(root, "public", localPath.replace(/^\//, ""));
  if (!existsSync(abs)) {
    console.warn(`[sanity-seed] missing ${kind}: ${abs}`);
    return undefined;
  }
  const asset = await client.assets.upload(kind, createReadStream(abs), { filename: basename(abs) });
  return { _type: kind, asset: { _type: "reference", _ref: asset._id } };
}

const settings = readJson("settings.json");
const home = readJson("home.json");

const images = {};
for (const [key, value] of Object.entries(settings.images)) {
  images[key] = { _type: "imageWithAlt", image: await upload("image", value.image), alt: value.alt };
}

const settingsDoc = {
  _id: "siteSettings",
  _type: "siteSettings",
  siteName: settings.siteName,
  shortName: settings.shortName,
  title: settings.title,
  description: settings.description,
  phone: settings.phone,
  email: settings.email,
  instagram: settings.instagram,
  address: settings.address,
  hours: withKeys(settings.hours, "h"),
  menuPdf: await upload("file", settings.menu.pdf),
  menuPageCount: settings.menu.pageCount,
  images,
};

const homeDoc = {
  _id: "home",
  _type: "home",
  intro: home.intro,
  menu: home.menu,
  thumbs: withKeys(home.thumbs, "t"),
  statement: home.statement,
  sets: home.sets,
  nights: withKeys(home.nights, "n"),
  host: home.host,
  instagram: home.instagram,
  about: {
    eyebrow: home.about.eyebrow,
    blocks: withKeys(home.about.blocks, "b"),
    cards: withKeys(home.about.cards, "c"),
  },
  invite: home.invite,
};

await client.createOrReplace(settingsDoc);
await client.createOrReplace(homeDoc);
console.log("[sanity-seed] Seeded siteSettings + home. Open the Studio to review.");

// Minimal .env loader (Node doesn't auto-load .env files).
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
