import React, { useId } from 'react';
import { motion } from 'framer-motion';

/**
 * A small animated node graph. Each process phase supplies its own nodes and
 * links, so the shape genuinely changes as you move through the methodology
 * instead of being one decorative loop reused nine times.
 *
 * Entrance is driven by framer-motion (links draw, nodes pop in); the steady
 * state loop — packets travelling the links — is SMIL, so it costs no JS.
 */
export default function SystemDiagram({ nodes, links, accent = '#22D3EE', className = '' }) {
  const uid = useId().replace(/:/g, '');

  const pathFor = (link) => {
    const a = nodes[link[0]];
    const b = nodes[link[1]];
    return `M${a.x},${a.y} L${b.x},${b.y}`;
  };

  return (
    <svg
      viewBox="0 0 320 210"
      className={`h-full w-full ${className}`}
      role="img"
      aria-label="System relationship diagram for this phase"
    >
      <defs>
        <radialGradient id={`${uid}-halo`}>
          <stop offset="0%" stopColor={accent} stopOpacity="0.55" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </radialGradient>
        <filter id={`${uid}-blur`} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>

      {/* faint construction grid */}
      <g stroke={accent} strokeOpacity="0.07">
        {[0, 1, 2, 3, 4].map((i) => (
          <line key={`h${i}`} x1="0" y1={i * 52.5} x2="320" y2={i * 52.5} />
        ))}
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <line key={`v${i}`} x1={i * 53.3} y1="0" x2={i * 53.3} y2="210" />
        ))}
      </g>

      {/* links */}
      <g fill="none">
        {links.map((link, i) => (
          <motion.path
            key={`link-${i}`}
            d={pathFor(link)}
            stroke={accent}
            strokeOpacity="0.45"
            strokeWidth="1.4"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.15 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}
      </g>

      {/* packets */}
      <g>
        {links.map((link, i) => (
          <circle key={`packet-${i}`} r="2.6" fill={accent}>
            <animateMotion
              dur={`${2.6 + (i % 3) * 0.7}s`}
              repeatCount="indefinite"
              begin={`${0.9 + i * 0.45}s`}
              path={pathFor(link)}
            />
            <animate
              attributeName="opacity"
              values="0;1;1;0"
              dur={`${2.6 + (i % 3) * 0.7}s`}
              repeatCount="indefinite"
              begin={`${0.9 + i * 0.45}s`}
            />
          </circle>
        ))}
      </g>

      {/* nodes */}
      <g>
        {nodes.map((node, i) => (
          <motion.g
            key={node.label}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.1 + i * 0.1,
              ease: [0.34, 1.56, 0.64, 1],
            }}
            style={{ transformOrigin: `${node.x}px ${node.y}px` }}
          >
            <circle
              cx={node.x}
              cy={node.y}
              r="17"
              fill={`url(#${uid}-halo)`}
              filter={`url(#${uid}-blur)`}
            >
              <animate
                attributeName="r"
                values="14;20;14"
                dur={`${3 + (i % 3)}s`}
                repeatCount="indefinite"
                begin={`${i * 0.4}s`}
              />
            </circle>
            <circle
              cx={node.x}
              cy={node.y}
              r={node.primary ? 9 : 6.5}
              fill="rgb(var(--c-panel))"
              stroke={accent}
              strokeWidth={node.primary ? 2 : 1.3}
              strokeOpacity={node.primary ? 1 : 0.7}
            />
            {node.primary && <circle cx={node.x} cy={node.y} r="3" fill={accent} />}
            <text
              x={node.x}
              y={node.y + (node.below ? 27 : -18)}
              textAnchor="middle"
              fill="rgb(var(--c-muted))"
              fontSize="9"
              fontFamily="'JetBrains Mono', monospace"
              letterSpacing="0.06em"
            >
              {node.label}
            </text>
          </motion.g>
        ))}
      </g>
    </svg>
  );
}
