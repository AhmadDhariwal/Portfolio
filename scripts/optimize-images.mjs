/**
 * One-off asset optimization script (dev tooling, not shipped at runtime).
 *
 * Generates appropriately sized WebP variants for the raster images that are
 * displayed far smaller than their source resolution. Run with:
 *   node scripts/optimize-images.mjs
 *
 * Source files are left untouched; new variants are written alongside them.
 */
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { statSync } from 'node:fs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const pub = join(root, 'public');

const kb = (p) => (statSync(p).size / 1024).toFixed(1);

const jobs = [
  // Profile photo: portrait card ~ up to 360px wide, allow 2x DPR.
  {
    src: 'images/profile/ahmad.png',
    variants: [
      { out: 'images/profile/ahmad-440.webp', width: 440 },
      { out: 'images/profile/ahmad-720.webp', width: 720 }
    ]
  },
  // Project screenshot: shown in cards a few hundred px wide.
  {
    src: 'images/projects/devinsightai.png',
    variants: [{ out: 'images/projects/devinsightai-800.webp', width: 800 }]
  }
];

for (const job of jobs) {
  const srcPath = join(pub, job.src);
  console.log(`\n${job.src} (${kb(srcPath)} KB source)`);
  for (const v of job.variants) {
    const outPath = join(pub, v.out);
    await sharp(srcPath)
      .resize({ width: v.width, withoutEnlargement: true })
      .webp({ quality: 78, effort: 6 })
      .toFile(outPath);
    console.log(`  -> ${v.out} (${kb(outPath)} KB, w=${v.width})`);
  }
}

console.log('\nDone.');
