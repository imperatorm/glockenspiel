// One-off: convert the referenced JPGs to optimized WebP.
// Usage: node scripts/to-webp.mjs
import sharp from "sharp";
import { readdir, stat } from "node:fs/promises";
import path from "node:path";

const DIR = path.join(process.cwd(), "public", "images");
// Source number (in "_c_MartinMathes (2).jpg") -> web-safe slug referenced in lib/site.ts.
const USED = {
  "57": "hero",
  "05": "interior",
  "85": "bar",
  "73": "event",
  "36": "food",
  "29": "terrace",
  "01": "facade",
  "17": "food-two",
  "12": "drink",
  "41": "billard-lounge",
  "68": "dj-set",
};

const files = await readdir(DIR);
let done = 0;
for (const [num, slug] of Object.entries(USED)) {
  const src = files.find((f) => f === `20260604_dasGlockenspiel_${num}_c_MartinMathes (2).jpg`);
  if (!src) {
    console.warn(`! missing source for ${num}`);
    continue;
  }
  const from = path.join(DIR, src);
  const to = path.join(DIR, `${slug}.webp`);
  const before = (await stat(from)).size;
  await sharp(from)
    .resize({ width: 2000, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(to);
  const after = (await stat(to)).size;
  done += 1;
  console.log(
    `${src} -> ${slug}.webp  ${(before / 1024).toFixed(0)}KB → ${(after / 1024).toFixed(0)}KB`,
  );
}
console.log(`\nConverted ${done}/${Object.keys(USED).length} images.`);
