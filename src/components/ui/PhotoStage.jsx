import React from 'react';

/**
 * A cut-out photograph with a living backdrop.
 *
 * The photos in `data/images.js` are keyed to real alpha, so roughly 40% of
 * each frame is transparent. That is the whole point: shapes placed BEHIND the
 * photo read through the gaps, and once they move the picture stops being a
 * static slab and starts feeling like part of the page.
 *
 * Everything animating here is a CSS keyframe, never framer-motion. Only CSS
 * animations are reachable by the `prefers-reduced-motion` kill-switch in
 * index.css — a framer loop would keep running for a user who asked it not to.
 *
 * `accent` may change at runtime (the hero recolours it per slide); the shapes
 * tween their colour rather than snapping.
 */

/* Backdrop recipes. Each entry is one absolutely-positioned shape.
   `cls` must contain whole Tailwind class names — the JIT scans source text,
   so nothing here may be built by interpolation. */
const LAYOUTS = {
  /**
   * Hero. Deliberately almost bare.
   *
   * The hero photograph arrives with its own designed composition — a lavender
   * cloud, floating violet blobs, a drawn arc. Parking a filled circle, a
   * dashed ring and a ripple behind it produced a second, competing set of
   * shapes and the whole panel read as clutter. So the only things left are a
   * blurred halo (light, not a shape) and a small dot field tucked into the
   * far corner, both well clear of the picture's own decoration.
   */
  wide: [
    { kind: 'glow', cls: '-left-16 top-4 h-72 w-72', alpha: 0.2, delay: 0 },
    { kind: 'glow', cls: 'right-4 -bottom-10 h-56 w-56', alpha: 0.14, delay: -5 },
    { kind: 'dots', cls: 'animate-sway-x -left-6 bottom-4 h-20 w-24', alpha: 1, delay: -2 },
  ],
  /* Squarer photo — the split sections. Shapes hug the outer corners so they
     do not sit under the subject's face. */
  split: [
    { kind: 'blob', cls: 'shape-blob-alt animate-morph -left-8 -top-6 h-44 w-44', alpha: 0.16, delay: 0 },
    { kind: 'blob', cls: 'shape-blob animate-morph -bottom-8 -right-6 h-36 w-36', alpha: 0.12, delay: -3 },
    { kind: 'ring', cls: 'animate-spin-slow -right-8 top-6 h-36 w-36', alpha: 0.26, delay: 0 },
    { kind: 'ripple', cls: 'animate-ripple-slow -left-4 bottom-1/4 h-28 w-28', alpha: 1, delay: 0 },
    { kind: 'dots', cls: 'animate-sway-y right-2 -bottom-4 h-24 w-24', alpha: 1, delay: -1.5 },
  ],
};

const FLOAT = {
  none: '',
  slow: 'animate-float-slow',
  gentle: 'animate-float',
};

function Shape({ kind, cls, alpha, delay, accent }) {
  const base = `pointer-events-none absolute -z-10 ${cls}`;
  const style = { animationDelay: `${delay}s`, transition: 'background-color .6s ease, border-color .6s ease' };

  if (kind === 'blob') {
    return (
      <span aria-hidden className={base} style={{ ...style, backgroundColor: accent, opacity: alpha }} />
    );
  }
  if (kind === 'glow') {
    /* Blurred light rather than a hard-edged shape, so it breathes behind the
       picture without competing with the blobs already drawn into it. */
    return (
      <span
        aria-hidden
        className={`${base} animate-float-slow rounded-full blur-3xl`}
        style={{ ...style, backgroundColor: accent, opacity: alpha }}
      />
    );
  }
  if (kind === 'ring') {
    return (
      <span
        aria-hidden
        className={`${base} rounded-full border border-dashed`}
        style={{ ...style, borderColor: accent, opacity: alpha }}
      />
    );
  }
  if (kind === 'ripple') {
    return (
      <span
        aria-hidden
        className={`${base} rounded-full border-2`}
        style={{ ...style, borderColor: accent }}
      />
    );
  }
  /* dots — accent-tinted rather than `.texture-dots`, whose token alpha (0.035
     in light) all but disappears against photography */
  return (
    <span
      aria-hidden
      className={base}
      style={{
        ...style,
        backgroundImage: `radial-gradient(${accent}59 1.5px, transparent 1.5px)`,
        backgroundSize: '14px 14px',
      }}
    />
  );
}

export default function PhotoStage({
  photo,
  accent = '#0059FD',
  layout = 'split',
  float = 'slow',
  priority = false,
  className = '',
  children,
}) {
  const shapes = LAYOUTS[layout] ?? LAYOUTS.split;

  return (
    /* `isolate` is load-bearing: without a stacking context the -z-10 shapes
       drop behind the page background and vanish. */
    <div className={`relative isolate ${className}`}>
      {shapes.map((s, i) => (
        <Shape key={i} {...s} accent={accent} />
      ))}

      <img
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        decoding="async"
        className={`relative block h-auto w-full ${FLOAT[float] ?? ''}`}
      />

      {children}
    </div>
  );
}
