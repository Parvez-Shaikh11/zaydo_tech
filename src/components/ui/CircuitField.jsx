import React, { useId } from 'react';

/**
 * Ambient circuit-board backdrop: right-angled traces that pulse, junction
 * nodes that breathe, and packets that travel the traces.
 *
 * Everything is declarative SVG + CSS/SMIL — no rAF loop, no canvas, no layout
 * thrash. It sits behind content at low opacity and is decorative only.
 */

// Fixed geometry rather than randomised, so the composition is art-directed
// and identical on every render.
const TRACES = [
  { d: 'M0,60 H120 L160,100 H340 L380,60 H560 L600,100 H800', dur: 7 },
  { d: 'M0,150 H90 L130,190 H420 L460,150 H640 L680,190 H800', dur: 9 },
  { d: 'M0,250 H200 L240,210 H430 L470,250 H700 L740,210 H800', dur: 8 },
  { d: 'M0,340 H150 L190,300 H360 L400,340 H620 L660,300 H800', dur: 11 },
  { d: 'M100,0 V80 L140,120 V400', dur: 10 },
  { d: 'M540,0 V140 L580,180 V400', dur: 12 },
];

const NODES = [
  { x: 160, y: 100 }, { x: 380, y: 60 }, { x: 600, y: 100 },
  { x: 130, y: 190 }, { x: 460, y: 150 }, { x: 680, y: 190 },
  { x: 240, y: 210 }, { x: 470, y: 250 }, { x: 740, y: 210 },
  { x: 190, y: 300 }, { x: 400, y: 340 }, { x: 660, y: 300 },
];

export default function CircuitField({
  className = '',
  color = '#22D3EE',
  secondary = '#1B72F5',
  opacity = 0.5,
  packets = true,
}) {
  const uid = useId().replace(/:/g, '');

  return (
    <svg
      aria-hidden
      viewBox="0 0 800 400"
      preserveAspectRatio="xMidYMid slice"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      style={{ opacity }}
    >
      <defs>
        <linearGradient id={`${uid}-trace`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={secondary} stopOpacity="0" />
          <stop offset="35%" stopColor={secondary} stopOpacity="0.55" />
          <stop offset="70%" stopColor={color} stopOpacity="0.55" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
        <radialGradient id={`${uid}-node`}>
          <stop offset="0%" stopColor={color} stopOpacity="0.95" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* base traces */}
      <g fill="none" stroke={`url(#${uid}-trace)`} strokeWidth="1.1">
        {TRACES.map((trace) => (
          <path key={trace.d} d={trace.d} />
        ))}
      </g>

      {/* animated overlay traces — the "current" running through the board */}
      <g fill="none" stroke={color} strokeWidth="1.4" strokeOpacity="0.6">
        {TRACES.map((trace, i) => (
          <path
            key={`flow-${trace.d}`}
            d={trace.d}
            className="trace-flow"
            style={{ animationDuration: `${trace.dur}s`, animationDelay: `${-i * 1.3}s` }}
          />
        ))}
      </g>

      {/* junction nodes */}
      <g>
        {NODES.map((node, i) => (
          <g key={`${node.x}-${node.y}`}>
            <circle cx={node.x} cy={node.y} r="9" fill={`url(#${uid}-node)`} opacity="0.5">
              <animate
                attributeName="opacity"
                values="0.15;0.6;0.15"
                dur={`${3 + (i % 4)}s`}
                repeatCount="indefinite"
                begin={`${i * 0.35}s`}
              />
            </circle>
            <circle cx={node.x} cy={node.y} r="2.2" fill={color} opacity="0.85" />
          </g>
        ))}
      </g>

      {/* packets riding the traces */}
      {packets &&
        TRACES.slice(0, 4).map((trace, i) => (
          <circle key={`packet-${trace.d}`} r="2.8" fill={color}>
            <animateMotion
              dur={`${trace.dur}s`}
              repeatCount="indefinite"
              begin={`${i * 1.7}s`}
              path={trace.d}
            />
            <animate
              attributeName="opacity"
              values="0;1;1;0"
              dur={`${trace.dur}s`}
              repeatCount="indefinite"
              begin={`${i * 1.7}s`}
            />
          </circle>
        ))}
    </svg>
  );
}

/** Narrow variant: a few horizontal data lanes, for wide/short containers. */
export function DataLanes({ className = '', color = '#22D3EE', opacity = 0.35 }) {
  const uid = useId().replace(/:/g, '');
  const lanes = [40, 90, 140, 190, 240];

  return (
    <svg
      aria-hidden
      viewBox="0 0 600 280"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      style={{ opacity }}
    >
      <defs>
        <linearGradient id={`${uid}-lane`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={color} stopOpacity="0" />
          <stop offset="50%" stopColor={color} stopOpacity="0.5" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {lanes.map((y, i) => (
        <g key={y}>
          <line x1="0" y1={y} x2="600" y2={y} stroke={`url(#${uid}-lane)`} strokeWidth="1" />
          <circle r="2.4" fill={color}>
            <animateMotion
              dur={`${6 + i * 1.4}s`}
              repeatCount="indefinite"
              begin={`${i * 0.9}s`}
              path={`M0,${y} H600`}
            />
          </circle>
        </g>
      ))}
    </svg>
  );
}
