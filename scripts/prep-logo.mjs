/**
 * prep-logo.mjs
 *
 * The supplied brand PNGs (dark_theme.png / light_theme.png) are flat rasters with a
 * baked-in solid background and a lot of dead padding. Rendered in the UI they show up
 * as a hard black (or white) rectangle.
 *
 * This script does three things WITHOUT redrawing the logo itself:
 *   1. Converts the baked background to real alpha (black-matte / white-matte un-multiply)
 *   2. Auto-trims the transparent padding
 *   3. Also exports the "ZO" mark on its own (split at the widest internal gap)
 *
 * Sources live in `photos/` (the working folder, not shipped). Output goes to
 * `public/photos/`, which is what `src/data/images.js` points at.
 *
 * Run:  node scripts/prep-logo.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { decodePng, encodePng, crop, trim } from './lib/png.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, 'photos');
const OUT = join(ROOT, 'public', 'photos');

/* -------------------------------------------------------------- transform */

/** Turn a matte-on-black raster into straight alpha. */
function unmatteBlack(img) {
  const { width, height, rgba } = img;
  const out = Buffer.alloc(rgba.length);
  for (let i = 0; i < rgba.length; i += 4) {
    const r = rgba[i], g = rgba[i + 1], b = rgba[i + 2];
    const a = Math.max(r, g, b);
    if (a === 0) { out[i] = out[i + 1] = out[i + 2] = out[i + 3] = 0; continue; }
    const k = 255 / a;
    out[i] = Math.min(255, Math.round(r * k));
    out[i + 1] = Math.min(255, Math.round(g * k));
    out[i + 2] = Math.min(255, Math.round(b * k));
    out[i + 3] = a;
  }
  return { width, height, rgba: out };
}

/** Turn a matte-on-white raster into straight alpha. */
function unmatteWhite(img) {
  const { width, height, rgba } = img;
  const out = Buffer.alloc(rgba.length);
  for (let i = 0; i < rgba.length; i += 4) {
    const r = rgba[i], g = rgba[i + 1], b = rgba[i + 2];
    const a = 255 - Math.min(r, g, b);
    if (a === 0) { out[i] = out[i + 1] = out[i + 2] = out[i + 3] = 0; continue; }
    const un = (c) => Math.max(0, Math.min(255, Math.round((c - (255 - a)) * 255 / a)));
    out[i] = un(r); out[i + 1] = un(g); out[i + 2] = un(b);
    out[i + 3] = a;
  }
  return { width, height, rgba: out };
}

/** Kill the faint sensor/JPEG noise left behind in the matte area. */
function denoise(img, threshold = 14) {
  const { rgba } = img;
  for (let i = 3; i < rgba.length; i += 4) {
    if (rgba[i] <= threshold) { rgba[i - 3] = rgba[i - 2] = rgba[i - 1] = 0; rgba[i] = 0; }
  }
  return img;
}

/** Column occupancy, used to locate the gap between the mark and the wordmark. */
function columnInk(img) {
  const ink = new Uint32Array(img.width);
  for (let x = 0; x < img.width; x++) {
    let n = 0;
    for (let y = 0; y < img.height; y++) if (img.rgba[(y * img.width + x) * 4 + 3] > 24) n++;
    ink[x] = n;
  }
  return ink;
}

/**
 * Split off the "ZO" glyph. The lockup reads [ZO][gap][divider bar][gap][ZAYDO TECH],
 * so we cut at the FIRST meaningfully wide empty band rather than the widest one —
 * otherwise the thin divider bar rides along with the mark.
 */
function extractMark(img) {
  const ink = columnInk(img);
  const minGap = Math.max(6, Math.round(img.width * 0.008));
  let run = null;
  for (let x = Math.floor(img.width * 0.2); x < Math.floor(img.width * 0.62); x++) {
    if (ink[x] === 0) {
      if (!run) run = { start: x, end: x };
      else run.end = x;
    } else if (run) {
      if (run.end - run.start >= minGap) return trim(crop(img, 0, 0, run.start, img.height), 6);
      run = null;
    }
  }
  if (run && run.end - run.start >= minGap) return trim(crop(img, 0, 0, run.start, img.height), 6);
  return null;
}

/* -------------------------------------------------------------------- run */
/* Filter 0 (none), matching what these four assets were originally built with —
   the logos are flat vector-ish art where paeth buys almost nothing. */
function build(sourceFile, unmatte, outFull, outMark) {
  const img = denoise(unmatte(decodePng(readFileSync(join(SRC, sourceFile)))));
  const full = trim(img, 6);
  writeFileSync(join(OUT, outFull), encodePng(full, 0));
  console.log(`${outFull.padEnd(24)} ${full.width}x${full.height}`);

  const mark = extractMark(full);
  if (mark) {
    writeFileSync(join(OUT, outMark), encodePng(mark, 0));
    console.log(`${outMark.padEnd(24)} ${mark.width}x${mark.height}`);
  } else {
    console.warn(`  ! could not isolate mark from ${sourceFile}`);
  }
}

build('dark_theme.png', unmatteBlack, 'logo-dark.png', 'mark-dark.png');
build('light_theme.png', unmatteWhite, 'logo-light.png', 'mark-light.png');
