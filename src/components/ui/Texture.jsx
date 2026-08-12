import React, { useId } from 'react';

/**
 * Section background textures.
 *
 * These are inline SVG rather than CSS gradients because the interesting ones
 * — flowing contour fans, hex mesh, circuit traces — simply cannot be
 * expressed as repeating-linear-gradient. Everything strokes in `currentColor`
 * so a texture re-themes by setting a text colour on the wrapper, and every
 * pattern is `preserveAspectRatio="none"` so it stretches to its band.
 *
 * Use ONE per section. Repeating the same pattern down the page is what makes
 * a site look like it has a single wallpaper rather than distinct chapters.
 */

/* ---------------------------------------------------------------- contour */
/* A fan of long bezier curves. Where the curves crowd together they read as a
   moiré ripple — the "flowing lines" look. */
function Contour({ lines = 44 }) {
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="none" className="h-full w-full">
      <g fill="none" stroke="currentColor" strokeWidth="0.4">
        {Array.from({ length: lines }, (_, i) => {
          const t = i / (lines - 1);
          return (
            <path
              key={i}
              d={`M-20 ${-60 + t * 300} C ${60 + t * 150} ${20 + t * 120}, ${230 - t * 90} ${280 - t * 200}, 420 ${360 - t * 320}`}
            />
          );
        })}
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------- topo */
/* Concentric rings with a drifting centre — a topographic map feel. */
function Topo({ rings = 16 }) {
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="none" className="h-full w-full">
      <g fill="none" stroke="currentColor" strokeWidth="0.5">
        {Array.from({ length: rings }, (_, i) => {
          const r = 12 + i * 15;
          return (
            <ellipse
              key={i}
              cx={170 + i * 3}
              cy={150 - i * 2}
              rx={r}
              ry={r * 0.74}
              transform={`rotate(${-12 + i * 1.4} 170 150)`}
            />
          );
        })}
      </g>
    </svg>
  );
}

/* -------------------------------------------------------------------- hex */
function Hex({ size = 26 }) {
  const id = useId();
  return (
    <svg className="h-full w-full">
      <defs>
        <pattern
          id={id}
          width={size * 1.732}
          height={size * 3}
          patternUnits="userSpaceOnUse"
          patternTransform={`scale(${1})`}
        >
          <g fill="none" stroke="currentColor" strokeWidth="0.7">
            <path
              d={`M${size * 0.866} 0 L${size * 1.732} ${size * 0.5} L${size * 1.732} ${size * 1.5} L${size * 0.866} ${size * 2} L0 ${size * 1.5} L0 ${size * 0.5} Z`}
            />
            <path d={`M${size * 0.866} ${size * 2} L${size * 0.866} ${size * 3}`} />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

/* -------------------------------------------------------------------- iso */
/* Isometric grid — three line families at 0°, 60° and 120°. */
function Iso({ size = 34 }) {
  const id = useId();
  const h = size * 0.866;
  return (
    <svg className="h-full w-full">
      <defs>
        <pattern id={id} width={size} height={h * 2} patternUnits="userSpaceOnUse">
          <g fill="none" stroke="currentColor" strokeWidth="0.6">
            <path d={`M0 ${h} L${size} ${h}`} />
            <path d={`M0 0 L${size} ${h * 2}`} />
            <path d={`M${size} 0 L0 ${h * 2}`} />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

/* ------------------------------------------------------------------ waves */
function Waves({ rows = 12 }) {
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="none" className="h-full w-full">
      <g fill="none" stroke="currentColor" strokeWidth="0.6">
        {Array.from({ length: rows }, (_, i) => {
          const y = 10 + i * 26;
          const amp = 8 + (i % 3) * 4;
          return (
            <path
              key={i}
              d={`M-10 ${y} Q 40 ${y - amp} 90 ${y} T 190 ${y} T 290 ${y} T 410 ${y}`}
            />
          );
        })}
      </g>
    </svg>
  );
}

/* ---------------------------------------------------------------- circuit */
/* Right-angle traces with junction pads — reads as a board layer. */
function Circuit({ size = 76 }) {
  const id = useId();
  return (
    <svg className="h-full w-full">
      <defs>
        <pattern id={id} width={size} height={size} patternUnits="userSpaceOnUse">
          <g fill="none" stroke="currentColor" strokeWidth="0.7">
            <path d={`M0 ${size * 0.28} H${size * 0.42} V${size * 0.7} H${size}`} />
            <path d={`M${size * 0.68} 0 V${size * 0.44} H${size}`} />
            <path d={`M${size * 0.18} ${size} V${size * 0.82} H${size * 0.6}`} />
          </g>
          <g fill="currentColor">
            <circle cx={size * 0.42} cy={size * 0.28} r="1.6" />
            <circle cx={size * 0.68} cy={size * 0.44} r="1.6" />
            <circle cx={size * 0.6} cy={size * 0.82} r="1.6" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

/* ------------------------------------------------------------------- mesh */
/* Radiating spokes from an off-canvas origin. */
function Mesh({ spokes = 30 }) {
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="none" className="h-full w-full">
      <g fill="none" stroke="currentColor" strokeWidth="0.45">
        {Array.from({ length: spokes }, (_, i) => {
          const a = (-55 + (i / (spokes - 1)) * 110) * (Math.PI / 180);
          return (
            <path
              key={i}
              d={`M-30 320 L${-30 + Math.cos(a) * 620} ${320 - Math.sin(a) * 620}`}
            />
          );
        })}
        {Array.from({ length: 7 }, (_, i) => (
          <circle key={`r${i}`} cx="-30" cy="320" r={90 + i * 62} />
        ))}
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ trace */
/* Routed board traces fanning into a central hub — the data-flow look, where
   every line leaves the hub straight, breaks once at 45°, then runs to the
   edge, with a solder pad at each bend. Unlike `circuit` this is not a
   repeating tile: it has one focal point, which is what gives it direction. */
function Trace({ perQuadrant = 7 }) {
  const cx = 200;
  const cy = 150;
  const legs = [];
  const pads = [];

  [
    [1, -1], [1, 1], [-1, -1], [-1, 1],
  ].forEach(([dx, dy], q) => {
    for (let i = 0; i < perQuadrant; i += 1) {
      const off = (i + 1) * 7 * dy;
      const run = 26 + i * 13;
      const diag = 34 + ((i + q) % 4) * 20;

      const sy = cy + off;
      const x1 = cx + dx * run;
      const x2 = x1 + dx * diag;
      const y2 = sy + dy * diag;

      legs.push(
        <path key={`${q}-${i}`} d={`M${cx} ${sy} H${x1} L${x2} ${y2} H${dx > 0 ? 430 : -30}`} />,
      );
      pads.push(<circle key={`p${q}-${i}`} cx={x1} cy={sy} r="1.5" />);
      pads.push(<circle key={`q${q}-${i}`} cx={x2} cy={y2} r="1.5" />);
    }
  });

  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="none" className="h-full w-full">
      <g fill="none" stroke="currentColor" strokeWidth="0.55">
        {legs}
        <circle cx={cx} cy={cy} r="16" strokeWidth="0.8" />
        <circle cx={cx} cy={cy} r="27" strokeDasharray="3 5" />
        <circle cx={cx} cy={cy} r="42" strokeWidth="0.4" />
      </g>
      <g fill="currentColor">
        {pads}
        <circle cx={cx} cy={cy} r="3" />
      </g>
    </svg>
  );
}

/* -------------------------------------------------------------------- dot */
function DotField({ size = 20 }) {
  const id = useId();
  return (
    <svg className="h-full w-full">
      <defs>
        <pattern id={id} width={size} height={size} patternUnits="userSpaceOnUse">
          <circle cx={size / 2} cy={size / 2} r="1.2" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

const PATTERNS = {
  contour: Contour,
  topo: Topo,
  hex: Hex,
  iso: Iso,
  waves: Waves,
  circuit: Circuit,
  trace: Trace,
  mesh: Mesh,
  dots: DotField,
};

/* Fade shapes, so a texture never ends on a hard edge. */
const FADES = {
  none: undefined,
  top: 'linear-gradient(to bottom, #000 0%, transparent 85%)',
  bottom: 'linear-gradient(to top, #000 0%, transparent 85%)',
  center: 'radial-gradient(ellipse 70% 65% at 50% 50%, #000 10%, transparent 78%)',
  left: 'linear-gradient(to right, #000 0%, transparent 70%)',
  right: 'linear-gradient(to left, #000 0%, transparent 70%)',
  vignette: 'radial-gradient(ellipse 90% 90% at 50% 50%, #000 30%, transparent 90%)',
};

/**
 * Texture({ pattern, opacity, fade, className })
 *
 * Renders absolutely-positioned and `pointer-events-none`, so it can be
 * dropped straight into any `relative isolate` section as its first child.
 * Colour comes from `currentColor` — set `text-*` on this element or a parent.
 */
export default function Texture({
  pattern = 'contour',
  opacity = 0.5,
  fade = 'center',
  className = '',
  style = {},
}) {
  const Pattern = PATTERNS[pattern] ?? Contour;
  const mask = FADES[fade];

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}
      style={{
        opacity,
        ...(mask ? { maskImage: mask, WebkitMaskImage: mask } : {}),
        ...style,
      }}
    >
      <Pattern />
    </div>
  );
}
