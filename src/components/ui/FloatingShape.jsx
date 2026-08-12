import React from 'react';

/**
 * Ambient decoration — the reference theme's `.shape-mockup` idea.
 *
 * Everything here is inline SVG rather than image assets: it costs no network
 * request, inherits `currentColor` so it re-themes for free, and scales without
 * artefacts. Deliberately zero JS — no framer import — so the global
 * `prefers-reduced-motion` rule in index.css can actually stop it (framer
 * writes inline styles that the CSS kill-switch cannot reach).
 *
 * The host section MUST carry `relative isolate`, otherwise `-z-10` escapes the
 * section and the shape disappears behind the page background.
 */

/* Static maps — Tailwind's JIT scans source text, so a template literal like
   `animate-${anim}` would never be generated. Every class must appear whole. */
const ANIM = {
  'sway-x': 'animate-sway-x',
  'sway-y': 'animate-sway-y',
  float: 'animate-float',
  'float-slow': 'animate-float-slow',
  'spin-slow': 'animate-spin-slow',
  swing: 'animate-swing',
  morph: 'animate-morph',
  ripple: 'animate-ripple',
  'ripple-slow': 'animate-ripple-slow',
  none: '',
};

const SHAPES = {
  ring: (
    <svg viewBox="0 0 100 100" fill="none" className="h-full w-full">
      <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="2" />
      <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="1" strokeDasharray="4 6" />
    </svg>
  ),
  dots: (
    <svg viewBox="0 0 100 100" fill="currentColor" className="h-full w-full">
      {[...Array(5)].map((_, r) =>
        [...Array(5)].map((_, c) => (
          <circle key={`${r}-${c}`} cx={10 + c * 20} cy={10 + r * 20} r="2.5" />
        )),
      )}
    </svg>
  ),
  cross: (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" className="h-full w-full">
      <path d="M50 14v72M14 50h72" strokeLinecap="round" />
    </svg>
  ),
  blob: (
    <svg viewBox="0 0 200 200" fill="currentColor" className="h-full w-full">
      <path d="M45 -60C58 -48 66 -29 68 -9C70 11 66 32 54 47C42 62 22 71 1 70C-20 69 -42 58 -56 41C-70 24 -76 1 -71 -20C-66 -41 -50 -60 -31 -70C-12 -80 10 -72 45 -60Z" transform="translate(100 100)" />
    </svg>
  ),
  wave: (
    <svg viewBox="0 0 200 60" fill="none" stroke="currentColor" strokeWidth="2" className="h-full w-full">
      <path d="M0 30C25 5 50 5 75 30S125 55 150 30s45-25 50 0" strokeLinecap="round" />
    </svg>
  ),
  grid: (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1" className="h-full w-full">
      {[20, 40, 60, 80].map((v) => (
        <React.Fragment key={v}>
          <path d={`M${v} 0v100`} />
          <path d={`M0 ${v}h100`} />
        </React.Fragment>
      ))}
    </svg>
  ),
  arc: (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" className="h-full w-full">
      <path d="M6 94A88 88 0 0 1 94 6" strokeLinecap="round" />
      <path d="M28 94A66 66 0 0 1 94 28" strokeLinecap="round" strokeDasharray="5 8" />
    </svg>
  ),
};

export default function FloatingShape({
  shape = 'ring',
  anim = 'float-slow',
  size = 120,
  color = 'currentColor',
  opacity = 0.4,
  delay = 0,
  className = '',
  style = {},
}) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute -z-10 ${ANIM[anim] ?? ''} ${className}`}
      style={{
        width: size,
        height: size,
        color,
        opacity,
        animationDelay: `${delay}s`,
        ...style,
      }}
    >
      {SHAPES[shape] ?? SHAPES.ring}
    </span>
  );
}

/** Curated shape sets, so call sites stay one line instead of four. */
const PRESETS = {
  services: [
    { shape: 'dots', anim: 'sway-x', size: 110, className: 'left-[-2rem] top-10', opacity: 0.25 },
    { shape: 'ring', anim: 'float-slow', size: 150, className: 'right-[-3rem] top-1/3', opacity: 0.18, delay: 1.2 },
    { shape: 'cross', anim: 'swing', size: 40, className: 'right-1/4 top-4', opacity: 0.3, delay: 0.4 },
  ],
  process: [
    { shape: 'grid', anim: 'sway-x', size: 160, className: 'right-0 bottom-0', opacity: 0.14 },
    { shape: 'arc', anim: 'spin-slow', size: 180, className: 'left-[-4rem] bottom-8', opacity: 0.16 },
  ],
  about: [
    { shape: 'blob', anim: 'morph', size: 220, className: 'left-[-5rem] top-1/4', opacity: 0.08 },
    { shape: 'dots', anim: 'sway-y', size: 96, className: 'right-6 bottom-10', opacity: 0.22, delay: 0.8 },
  ],
  cta: [
    { shape: 'ring', anim: 'ripple', size: 200, className: 'left-1/4 top-0', opacity: 0.2 },
    { shape: 'wave', anim: 'sway-x', size: 200, className: 'right-4 bottom-6', opacity: 0.2, delay: 1 },
  ],
};

export function SectionShapes({ preset = 'services', color = 'rgb(var(--c-line))' }) {
  return (
    <>
      {(PRESETS[preset] ?? []).map((s, i) => (
        <FloatingShape key={i} color={color} {...s} />
      ))}
    </>
  );
}
