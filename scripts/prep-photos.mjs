/**
 * prep-photos.mjs
 *
 * The supplied brand photography in `photos/website_images/` is 24-bit RGB with
 * a solid near-white background baked in. Dropped into the site as-is it renders
 * as a white rectangle: barely visible on the light canvas, a glaring slab in
 * dark mode, and impossible to sit on a tinted band.
 *
 * This script turns that background into real alpha WITHOUT touching the
 * subject:
 *   1. Flood-fills the near-white region inward from the image border, so white
 *      *inside* the photo (a desk, a shirt, an office wall) is never keyed out.
 *   2. Grades the one-pixel antialiased seam and un-mattes it against white, so
 *      no pale fringe is left behind.
 *   3. Trims the dead transparent padding.
 *   4. Downscales with a premultiplied box filter to a sane delivery width.
 *
 * Run:  node scripts/prep-photos.mjs [--preview]
 *
 * `--preview` also writes flattened copies over mid-grey and over the dark
 * canvas colour, which is the only way to eyeball a keyed edge without opening
 * an image editor.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { decodePng, encodePng, trim, resize } from './lib/png.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, 'photos', 'website_images');
const OUT = join(ROOT, 'public', 'photos');
const PREVIEW = join(ROOT, '.preview');

/**
 * `width` is the delivered pixel width. Each of these renders at roughly
 * 480–620 CSS px, so ~1000px covers a 2x display without paying for the full
 * 1.5k source.
 */
const JOBS = [
  /* `closeRight` carves an organic curve into the right border. Only turn it on
     for a source whose silhouette is cropped by its own frame and reads as a
     straight vertical slice — the run log reports `edge:R` when that is the
     case. slider2 closes on its own, so it does not need it. */
  { src: 'slider2.png', out: 'team-hero.png', width: 1160 },
  { src: 'planing.png', out: 'team-planning.png', width: 940 },
  { src: 'client.png', out: 'team-client.png', width: 940 },
  { src: 'services_slider.png', out: 'services-hero.png', width: 980 },

  /* `bg` keys against a flat COLOURED backdrop instead of a white matte. This
     one is composited on lavender (#E8E6F8), which the white rule would not
     touch — its darkest channel is 230, and it carries an 18-point blue cast. */
  { src: 'contact-call.png', out: 'contact-call.png', width: 1040, bg: [232, 230, 248] },

  /* `key: false` for artwork whose backdrop is a designed colour rather than a
     white matte. Keying is skipped entirely — the flood fill only ever removes
     neutral near-white, so on a tinted backdrop it would do nothing useful
     while still costing a full pass over 1.5M pixels. These are resized and
     re-encoded, nothing more. */
  { src: 'service-custom-software.png', out: 'service-custom-software.png', width: 1120, key: false },
  { src: 'service-web-applications.png', out: 'service-web-applications.png', width: 1120, key: false },
  { src: 'service-automation.png', out: 'service-automation.png', width: 1120, key: false },
  { src: 'service-ai-systems.png', out: 'service-ai-systems.png', width: 1120, key: false },
  { src: 'service-digital-platforms.png', out: 'service-digital-platforms.png', width: 1120, key: false },
];

/**
 * Right-hand silhouette, as (vertical position, x cut) pairs in 0–1 of the
 * frame. Interpolated smoothly and used as an alpha ceiling, so it can only
 * ever remove — anywhere the picture already curves inward this is a no-op.
 */
const CLOSE_RIGHT = [
  [0.00, 0.995],
  [0.10, 0.960],
  [0.20, 0.905],
  [0.30, 0.872],
  [0.42, 0.888],
  [0.55, 0.935],
  [0.70, 0.985],
  [1.00, 1.000],
];
const CLOSE_FEATHER = 22; // px of soft edge, so the new border is not a hard cut

/* The background is flat ~#FDFEFE. Anything at or above WHITE_MIN on its
   darkest channel, and neutral enough to not be part of the lavender blob
   (#EDEBFA and friends carry a visible blue cast), counts as backdrop. */
const WHITE_MIN = 243;
const MAX_CAST = 7;

/* Grading window for the antialiased seam, in "darkest channel" units. */
const SEAM_CLEAR = 251; // at or above this the seam pixel is fully transparent
const SEAM_SOLID = 236; // at or below this it is fully opaque
const SEAM_BLUR = 3;    // radius of the coverage smoothing pass

/**
 * How far in from the flood set the grade is allowed to reach.
 *
 * Deliberately generous. In the hero shot the white desk dissolves into the
 * white page over ~20px with no real edge anywhere, so a narrow band cuts it
 * off in a ragged tuft. Widening costs nothing elsewhere: anything darker than
 * SEAM_SOLID is pinned fully opaque regardless of distance, and every piece of
 * actual photo content — faces, laptop, plant, office — sits far below it.
 */
const SEAM_BAND = 12;

/* Chroma path, used when a job names a `bg` colour. Distances are the largest
   per-channel difference from that colour. */
const BG_TOL = 9;    // within this of the backdrop, the pixel IS backdrop
const BG_SOLID = 30; // at or beyond this, the pixel is fully the subject

/**
 * Mark every backdrop pixel reachable from the image border.
 * Explicit stack rather than recursion — 1.5M pixels would blow the call stack.
 */
function floodBackground({ width, height }, isBackdrop) {
  const bg = new Uint8Array(width * height);
  const stack = [];

  const push = (p) => {
    if (bg[p] || !isBackdrop(p)) return;
    bg[p] = 1;
    stack.push(p);
  };

  for (let x = 0; x < width; x++) {
    push(x);
    push((height - 1) * width + x);
  }
  for (let y = 0; y < height; y++) {
    push(y * width);
    push(y * width + width - 1);
  }

  while (stack.length) {
    const p = stack.pop();
    const x = p % width;
    const y = (p - x) / width;
    if (x > 0) push(p - 1);
    if (x < width - 1) push(p + 1);
    if (y > 0) push(p - width);
    if (y < height - 1) push(p + width);
  }

  return bg;
}

/**
 * Alpha for the flood set is 0. Pixels within SEAM_BAND of it get a graded
 * alpha and are un-mattified against the backdrop; everything else stays fully
 * opaque.
 *
 * `matte` is the backdrop colour as [r,g,b], or null for the default rule:
 * "near-white and neutral". Naming a colour switches both the flood test and
 * the grade over to per-channel distance from it, which is what lets a picture
 * composited on flat lavender be keyed at all — its darkest channel never gets
 * anywhere near the white threshold.
 */
function key(img, matte) {
  const { width, height, rgba } = img;

  /* Largest per-channel difference from the matte colour. */
  const chroma = (i) =>
    Math.max(
      Math.abs(rgba[i] - matte[0]),
      Math.abs(rgba[i + 1] - matte[1]),
      Math.abs(rgba[i + 2] - matte[2]),
    );

  const isBackdrop = matte
    ? (p) => chroma(p * 4) <= BG_TOL
    : (p) => {
      const i = p * 4;
      const r = rgba[i], g = rgba[i + 1], b = rgba[i + 2];
      const min = Math.min(r, g, b);
      return min >= WHITE_MIN && Math.max(r, g, b) - min <= MAX_CAST;
    };

  const bg = floodBackground(img, isBackdrop);
  const out = Buffer.from(rgba);

  // Distance-to-background (two sweeps, city-block metric), capped just past
  // the widest neighbourhood the passes below actually look at.
  const dist = new Uint8Array(width * height).fill(SEAM_BAND + SEAM_BLUR + 1);
  for (let p = 0; p < bg.length; p++) if (bg[p]) dist[p] = 0;

  const relax = (p, q) => {
    const d = dist[q] + 1;
    if (d < dist[p]) dist[p] = d;
  };
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const p = y * width + x;
      if (x > 0) relax(p, p - 1);
      if (y > 0) relax(p, p - width);
    }
  }
  for (let y = height - 1; y >= 0; y--) {
    for (let x = width - 1; x >= 0; x--) {
      const p = y * width + x;
      if (x < width - 1) relax(p, p + 1);
      if (y < height - 1) relax(p, p + width);
    }
  }

  /* Coverage in [0,1], resolved before any colour is touched.
     Where the subject fades into the backdrop over a gradient — the white desk
     in the hero shot is the worst case — a hard threshold flips pixel by pixel
     on sensor noise and leaves a speckled edge. So: build coverage first, then
     smooth it, and only then recover colour. */
  const cov = new Float32Array(width * height);
  for (let p = 0; p < width * height; p++) {
    if (bg[p]) continue;
    if (dist[p] > SEAM_BAND) { cov[p] = 1; continue; }
    const i = p * 4;
    const t = matte
      ? (chroma(i) - BG_TOL) / (BG_SOLID - BG_TOL)
      : (SEAM_CLEAR - Math.min(rgba[i], rgba[i + 1], rgba[i + 2])) / (SEAM_CLEAR - SEAM_SOLID);
    cov[p] = Math.max(0, Math.min(1, t));
  }

  /* Separable box blur, confined to the seam neighbourhood so the interior
     keeps its hard edges. */
  const blurRadius = SEAM_BLUR;
  const tmp = new Float32Array(width * height);
  const inBand = (p) => dist[p] <= SEAM_BAND + blurRadius;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const p = y * width + x;
      if (!inBand(p)) { tmp[p] = cov[p]; continue; }
      let s = 0, n = 0;
      for (let d = -blurRadius; d <= blurRadius; d++) {
        const xx = x + d;
        if (xx < 0 || xx >= width) continue;
        s += cov[y * width + xx];
        n++;
      }
      tmp[p] = s / n;
    }
  }
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const p = y * width + x;
      if (!inBand(p)) { cov[p] = tmp[p]; continue; }
      let s = 0, n = 0;
      for (let d = -blurRadius; d <= blurRadius; d++) {
        const yy = y + d;
        if (yy < 0 || yy >= height) continue;
        s += tmp[yy * width + x];
        n++;
      }
      cov[p] = s / n;
    }
  }
  let cleared = 0;
  let graded = 0;

  for (let p = 0; p < width * height; p++) {
    const i = p * 4;
    const alpha = Math.round(cov[p] * 255);

    if (alpha <= 0) {
      out[i] = out[i + 1] = out[i + 2] = out[i + 3] = 0;
      cleared++;
      continue;
    }
    if (alpha >= 255) continue; // interior — untouched

    /* Straight colour, recovered from `c = a·F + (1-a)·B`. B is white on the
       default path, the named matte on the chroma path. */
    const af = alpha / 255;
    const un = (c, b) => Math.max(0, Math.min(255, Math.round((c - (1 - af) * b) / af)));
    out[i] = un(rgba[i], matte ? matte[0] : 255);
    out[i + 1] = un(rgba[i + 1], matte ? matte[1] : 255);
    out[i + 2] = un(rgba[i + 2], matte ? matte[2] : 255);
    out[i + 3] = alpha;
    graded++;
  }

  return { img: { width, height, rgba: out }, cleared, graded };
}

/**
 * Which borders the keyed subject still touches. A source whose silhouette is
 * cropped by its own frame shows up here, which is the signal to close it.
 */
function touchedEdges({ width, height, rgba }) {
  const opaque = (x, y) => rgba[(y * width + x) * 4 + 3] > 40;
  const hit = { T: false, R: false, B: false, L: false };
  for (let x = 0; x < width; x++) {
    if (opaque(x, 0)) hit.T = true;
    if (opaque(x, height - 1)) hit.B = true;
  }
  for (let y = 0; y < height; y++) {
    if (opaque(0, y)) hit.L = true;
    if (opaque(width - 1, y)) hit.R = true;
  }
  return Object.keys(hit).filter((k) => hit[k]).join('') || '-';
}

/** Smooth (cosine) interpolation through the CLOSE_RIGHT control points. */
function cutAt(t) {
  let i = 0;
  while (i < CLOSE_RIGHT.length - 2 && CLOSE_RIGHT[i + 1][0] < t) i++;
  const [t0, x0] = CLOSE_RIGHT[i];
  const [t1, x1] = CLOSE_RIGHT[i + 1];
  const k = t1 === t0 ? 0 : (t - t0) / (t1 - t0);
  const e = (1 - Math.cos(Math.min(1, Math.max(0, k)) * Math.PI)) / 2;
  return x0 + (x1 - x0) * e;
}

/** Multiply the right-hand silhouette into alpha, closing the cropped edge. */
function closeRight(img) {
  const { width, height, rgba } = img;
  for (let y = 0; y < height; y++) {
    const xc = cutAt(y / (height - 1)) * width;
    const start = Math.max(0, Math.floor(xc - CLOSE_FEATHER));
    for (let x = start; x < width; x++) {
      const k = Math.min(1, Math.max(0, (xc - x) / CLOSE_FEATHER));
      const i = (y * width + x) * 4;
      const a = Math.round(rgba[i + 3] * k);
      if (a === 0) { rgba[i] = rgba[i + 1] = rgba[i + 2] = 0; }
      rgba[i + 3] = a;
    }
  }
  return img;
}

/** Flatten over a solid colour so a keyed edge can actually be inspected. */
function flatten({ width, height, rgba }, [br, bg_, bb]) {
  const out = Buffer.alloc(width * height * 4);
  for (let i = 0; i < rgba.length; i += 4) {
    const a = rgba[i + 3] / 255;
    out[i] = Math.round(rgba[i] * a + br * (1 - a));
    out[i + 1] = Math.round(rgba[i + 1] * a + bg_ * (1 - a));
    out[i + 2] = Math.round(rgba[i + 2] * a + bb * (1 - a));
    out[i + 3] = 255;
  }
  return { width, height, rgba: out };
}

const wantPreview = process.argv.includes('--preview');
if (wantPreview) mkdirSync(PREVIEW, { recursive: true });

for (const job of JOBS) {
  const source = decodePng(readFileSync(join(SRC, job.src)));
  const total = source.width * source.height;

  const keyed = job.key === false ? null : key(source, job.bg ?? null);
  const img = keyed ? keyed.img : source;

  if (job.closeRight) closeRight(img);

  /* Trimming is only meaningful once there is alpha to trim to. */
  const trimmed = keyed ? trim(img, 4) : img;
  const final = resize(trimmed, job.width);

  const bytes = encodePng(final);
  writeFileSync(join(OUT, job.out), bytes);

  console.log(
    `${job.out.padEnd(28)} ${source.width}x${source.height} -> ${final.width}x${final.height}  ` +
    `${(bytes.length / 1024).toFixed(0)} KB  ` +
    (keyed
      ? `keyed ${((keyed.cleared / total) * 100).toFixed(1)}%  seam ${keyed.graded}px  ` +
        `edge:${touchedEdges(trimmed)}`
      : 'opaque (no key)'),
  );

  if (wantPreview) {
    writeFileSync(join(PREVIEW, `${job.out}.grey.png`), encodePng(resize(flatten(final, [128, 128, 128]), 700)));
    writeFileSync(join(PREVIEW, `${job.out}.dark.png`), encodePng(resize(flatten(final, [5, 7, 14]), 700)));
  }
}
