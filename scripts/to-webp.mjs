// One-off: convert the referenced JPGs to optimized WebP.
// Usage: node scripts/to-webp.mjs
import sharp from "sharp";
import { readdir, stat } from "node:fs/promises";
import path from "node:path";

const DIR = path.join(process.cwd(), "public", "images");
// Numbers referenced in lib/site.ts (all "_c_MartinMathes (2).jpg").
const USED = ["57", "05", "85", "73", "36", "29", "01", "17", "12"];

const files = await readdir(DIR);
let done = 0;
for (const num of USED) {
  const src = files.find((f) => f === `20260604_dasGlockenspiel_${num}_c_MartinMathes (2).jpg`);
  if (!src) {
    console.warn(`! missing source for ${num}`);
    continue;
  }
  const from = path.join(DIR, src);
  const to = from.replace(/\.jpg$/i, ".webp");
  const before = (await stat(from)).size;
  await sharp(from)
    .resize({ width: 2000, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(to);
  const after = (await stat(to)).size;
  done += 1;
  console.log(
    `${src} -> ${(before / 1024).toFixed(0)}KB → ${(after / 1024).toFixed(0)}KB webp`,
  );
}
console.log(`\nConverted ${done}/${USED.length} images.`);
