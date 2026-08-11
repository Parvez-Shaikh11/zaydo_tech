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
        className="halo animate-drift"
        style={{
          width: '46rem',
          height: '46rem',
          top: '-16rem',
          left: '-10rem',
          background: 'var(--halo-1)',
        }}
      />
      <div
        className="halo animate-drift"
        style={{
          width: '38rem',
          height: '38rem',
          top: '22%',
          right: '-14rem',
          background: 'var(--halo-2)',
          animationDelay: '-7s',
        }}
      />
      <div
        className="halo animate-drift"
        style={{
          width: '42rem',
          height: '42rem',
          bottom: '-18rem',
          left: '30%',
          background: 'var(--halo-3)',
          animationDelay: '-14s',
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
