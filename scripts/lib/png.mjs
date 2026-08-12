/**
 * Minimal dependency-free PNG codec.
 *
 * The project ships no image tooling (no sharp, no ImageMagick), but two build
 * scripts need to read and rewrite PNGs. This is the shared decoder/encoder
 * plus the geometry helpers both of them use.
 *
 * Everything here works in straight (non-premultiplied) 8-bit RGBA.
 */
import { inflateSync, deflateSync } from 'node:zlib';

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
export function decodePng(buf) {
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

/**
 * Encode straight RGBA.
 *
 * `filter` picks the per-scanline PNG filter. 0 (none) is what the logo
 * pipeline used; 4 (paeth) compresses photographic data far better — roughly
 * 35–45% smaller here — at the cost of a slower encode.
 */
export function encodePng({ width, height, rgba }, filter = 4) {
  const stride = width * 4;
  const raw = Buffer.alloc(height * (stride + 1));

  for (let y = 0; y < height; y++) {
    const rowStart = y * (stride + 1);
    raw[rowStart] = filter;
    const cur = rgba.subarray(y * stride, (y + 1) * stride);
    const prev = y > 0 ? rgba.subarray((y - 1) * stride, y * stride) : null;

    if (filter === 0) {
      cur.copy(raw, rowStart + 1);
      continue;
    }

    for (let i = 0; i < stride; i++) {
      const a = i >= 4 ? cur[i - 4] : 0;
      const b = prev ? prev[i] : 0;
      const c = prev && i >= 4 ? prev[i - 4] : 0;
      const p = a + b - c;
      const pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c);
      const pred = pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
      raw[rowStart + 1 + i] = (cur[i] - pred) & 0xff;
    }
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

/* -------------------------------------------------------------- geometry */
export function crop(img, x0, y0, x1, y1) {
  const w = x1 - x0, h = y1 - y0;
  const out = Buffer.alloc(w * h * 4);
  for (let y = 0; y < h; y++) {
    img.rgba.copy(out, y * w * 4, ((y0 + y) * img.width + x0) * 4, ((y0 + y) * img.width + x1) * 4);
  }
  return { width: w, height: h, rgba: out };
}

/** Shrink to the opaque bounding box, keeping `pad` transparent pixels around it. */
export function trim(img, pad = 8, alphaFloor = 10) {
  const { width, height, rgba } = img;
  let minX = width, minY = height, maxX = -1, maxY = -1;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (rgba[(y * width + x) * 4 + 3] > alphaFloor) {
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

/**
 * Box-filter downscale.
 *
 * Averaging happens in PREMULTIPLIED space. Averaging straight RGBA would pull
 * the colour of fully transparent pixels into the edge and leave a halo — the
 * classic white fringe around a keyed-out subject.
 */
export function resize(img, targetW) {
  const { width, height, rgba } = img;
  if (targetW >= width) return img;

  const targetH = Math.max(1, Math.round((height * targetW) / width));
  const out = Buffer.alloc(targetW * targetH * 4);
  const sx = width / targetW;
  const sy = height / targetH;

  for (let y = 0; y < targetH; y++) {
    const y0 = Math.floor(y * sy);
    const y1 = Math.max(y0 + 1, Math.min(height, Math.ceil((y + 1) * sy)));

    for (let x = 0; x < targetW; x++) {
      const x0 = Math.floor(x * sx);
      const x1 = Math.max(x0 + 1, Math.min(width, Math.ceil((x + 1) * sx)));

      let r = 0, g = 0, b = 0, a = 0, n = 0;
      for (let yy = y0; yy < y1; yy++) {
        for (let xx = x0; xx < x1; xx++) {
          const i = (yy * width + xx) * 4;
          const av = rgba[i + 3] / 255;
          r += rgba[i] * av;
          g += rgba[i + 1] * av;
          b += rgba[i + 2] * av;
          a += rgba[i + 3];
          n++;
        }
      }

      const o = (y * targetW + x) * 4;
      const alpha = a / n;
      out[o + 3] = Math.round(alpha);
      if (alpha < 0.5) { out[o] = out[o + 1] = out[o + 2] = 0; continue; }
      const k = 255 / alpha / n;
      out[o] = Math.min(255, Math.round(r * k));
      out[o + 1] = Math.min(255, Math.round(g * k));
      out[o + 2] = Math.min(255, Math.round(b * k));
    }
  }

  return { width: targetW, height: targetH, rgba: out };
}
