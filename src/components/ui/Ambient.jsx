import React from 'react';

/**
 * The page's ambient layer: an engineering grid plus three slow-drifting colour
 * halos. Fixed and non-interactive, so it costs nothing at the interaction layer.
 */
export function AmbientBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 grid-field opacity-70" />
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          backgroundImage: `
            radial-gradient(46rem 46rem at -5% -5%, var(--halo-1), transparent 75%),
            radial-gradient(38rem 38rem at 105% 30%, var(--halo-2), transparent 75%),
            radial-gradient(42rem 42rem at 45% 105%, var(--halo-3), transparent 75%)
          `,
        }}
      />
    </div>
  );
}

/** Localised glow for a single section. */
export function SectionGlow({ className = '', color = 'var(--halo-1)', size = '32rem' }) {
  return (
    <div
      aria-hidden
      className={`halo animate-float-slow ${className}`}
      style={{ width: size, height: size, background: color }}
    />
  );
}
