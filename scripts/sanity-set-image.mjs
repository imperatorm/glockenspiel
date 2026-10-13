// Targeted image swap: upload one local file and patch a single siteSettings
// image slot, leaving everything else in Sanity untouched.
// Usage: node scripts/sanity-set-image.mjs <imageKey> <public/path.webp> "<alt>"
import { createClient } from "@sanity/client";
import { createReadStream, existsSync, readFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
for (const file of [".env.local", ".env.development", ".env"]) {
  const path = join(root, file);
  if (!existsSync(path)) continue;
  for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*"?([^"]*)"?\s*$/);
    if (match && !process.env[match[1]]) process.env[match[1]] = match[2];
  }
}

const [key, localPath, alt] = process.argv.slice(2);
if (!key || !localPath) {
  console.error('Usage: node scripts/sanity-set-image.mjs <imageKey> <public/path> "<alt>"');
  process.exit(1);
}
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_STUDIO_DATASET || "production";
const token = process.env.SANITY_API_TOKEN;
if (!projectId || !token) {
  console.error("Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_TOKEN (Editor token).");
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion: "2024-10-01", token, useCdn: false });
const abs = join(root, localPath);
const asset = await client.assets.upload("image", createReadStream(abs), { filename: basename(abs) });
const patch = { [`images.${key}.image`]: { _type: "image", asset: { _type: "reference", _ref: asset._id } } };
if (alt) patch[`images.${key}.alt`] = alt;
await client.patch("siteSettings").set(patch).commit();
console.log(`[sanity-set-image] ${key} -> ${asset.url}`);
