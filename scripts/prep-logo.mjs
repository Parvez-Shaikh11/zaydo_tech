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
 * Run:  node scripts/prep-logo.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { inflateSync, deflateSync } from 'node:zlib';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PHOTOS = join(ROOT, 'public', 'photos');

/* ------------------------------------------------------------------ CRC32 */
const CRC_TABLE = (() => {
  const t = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c;
  }
  return t;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

/* ----------------------------------------------------------------- decode */
function decodePng(buf) {
  if (buf.readUInt32BE(0) !== 0x89504e47) throw new Error('not a png');

  let pos = 8;
  let width = 0, height = 0, bitDepth = 0, colorType = 0, interlace = 0;
  let palette = null, trns = null;
  const idat = [];

  while (pos < buf.length) {
    const len = buf.readUInt32BE(pos);
    const type = buf.toString('ascii', pos + 4, pos + 8);
    const data = buf.subarray(pos + 8, pos + 8 + len);

    if (type === 'IHDR') {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      bitDepth = data[8];
      colorType = data[9];
      interlace = data[12];
    } else if (type === 'PLTE') palette = Buffer.from(data);
    else if (type === 'tRNS') trns = Buffer.from(data);
    else if (type === 'IDAT') idat.push(Buffer.from(data));
    else if (type === 'IEND') break;

    pos += 12 + len;
  }

  if (bitDepth !== 8) throw new Error(`unsupported bit depth ${bitDepth}`);
  if (interlace !== 0) throw new Error('interlaced png unsupported');

  const channels = { 0: 1, 2: 3, 3: 1, 4: 2, 6: 4 }[colorType];
  if (!channels) throw new Error(`unsupported color type ${colorType}`);

  const raw = inflateSync(Buffer.concat(idat));
  const bpp = channels;
  const stride = width * bpp;
  const out = Buffer.alloc(height * stride);

  // Reverse the per-scanline PNG filters.
  for (let y = 0; y < height; y++) {
    const filter = raw[y * (stride + 1)];
    const line = raw.subarray(y * (stride + 1) + 1, (y + 1) * (stride + 1));
    const cur = out.subarray(y * stride, (y + 1) * stride);
    const prev = y > 0 ? out.subarray((y - 1) * stride, y * stride) : null;

    for (let i = 0; i < stride; i++) {
      const a = i >= bpp ? cur[i - bpp] : 0;
      const b = prev ? prev[i] : 0;
      const c = prev && i >= bpp ? prev[i - bpp] : 0;
      const x = line[i];
      let v;
      switch (filter) {
        case 0: v = x; break;
        case 1: v = x + a; break;
        case 2: v = x + b; break;
        case 3: v = x + ((a + b) >> 1); break;
        case 4: {
          const p = a + b - c;
          const pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c);
          v = x + (pa <= pb && pa <= pc ? a : pb <= pc ? b : c);
          break;
        }
        default: throw new Error(`bad filter ${filter}`);
      }
      cur[i] = v & 0xff;
    }
  }

  // Normalise everything up to straight RGBA.
  const rgba = Buffer.alloc(width * height * 4);
  for (let i = 0, px = 0; px < width * height; px++) {
    const s = px * bpp;
    let r, g, b, a = 255;
    if (colorType === 0) { r = g = b = out[s]; }
    else if (colorType === 2) { r = out[s]; g = out[s + 1]; b = out[s + 2]; }
    else if (colorType === 3) {
      const idx = out[s];
      r = palette[idx * 3]; g = palette[idx * 3 + 1]; b = palette[idx * 3 + 2];
      if (trns && idx < trns.length) a = trns[idx];
    }
    else if (colorType === 4) { r = g = b = out[s]; a = out[s + 1]; }
    else { r = out[s]; g = out[s + 1]; b = out[s + 2]; a = out[s + 3]; }
    rgba[i++] = r; rgba[i++] = g; rgba[i++] = b; rgba[i++] = a;
  }

  return { width, height, rgba };
}

/* ----------------------------------------------------------------- encode */
function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
}

function encodePng({ width, height, rgba }) {
  const stride = width * 4;
  const raw = Buffer.alloc(height * (stride + 1));
  for (let y = 0; y < height; y++) {
    raw[y * (stride + 1)] = 0; // filter: none
    rgba.copy(raw, y * (stride + 1) + 1, y * stride, (y + 1) * stride);
  }

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;   // bit depth
  ihdr[9] = 6;   // RGBA
  ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

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

function crop(img, x0, y0, x1, y1) {
  const w = x1 - x0, h = y1 - y0;
  const out = Buffer.alloc(w * h * 4);
  for (let y = 0; y < h; y++) {
    img.rgba.copy(out, y * w * 4, ((y0 + y) * img.width + x0) * 4, ((y0 + y) * img.width + x1) * 4);
  }
  return { width: w, height: h, rgba: out };
}

function trim(img, pad = 8) {
  const { width, height, rgba } = img;
  let minX = width, minY = height, maxX = -1, maxY = -1;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (rgba[(y * width + x) * 4 + 3] > 10) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  if (maxX < 0) return img;
  return crop(
    img,
    Math.max(0, minX - pad),
    Math.max(0, minY - pad),
    Math.min(width, maxX + 1 + pad),
    Math.min(height, maxY + 1 + pad),
  );
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
function build(sourceFile, unmatte, outFull, outMark) {
  const img = denoise(unmatte(decodePng(readFileSync(join(PHOTOS, sourceFile)))));
  const full = trim(img, 6);
  writeFileSync(join(PHOTOS, outFull), encodePng(full));
  console.log(`${outFull.padEnd(24)} ${full.width}x${full.height}`);

  const mark = extractMark(full);
  if (mark) {
    writeFileSync(join(PHOTOS, outMark), encodePng(mark));
    console.log(`${outMark.padEnd(24)} ${mark.width}x${mark.height}`);
  } else {
    console.warn(`  ! could not isolate mark from ${sourceFile}`);
  }
}

build('dark_theme.png', unmatteBlack, 'logo-dark.png', 'mark-dark.png');
build('light_theme.png', unmatteWhite, 'logo-light.png', 'mark-light.png');
