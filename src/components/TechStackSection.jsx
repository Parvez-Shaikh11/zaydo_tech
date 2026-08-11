import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeader from './ui/SectionHeader';
import Reveal, { Stagger, staggerItem } from './ui/Reveal';
import CircuitField from './ui/CircuitField';
import { techStack } from '../data/site';

const ACCENTS = ['#3B9CFF', '#1B72F5', '#0891B2', '#22D3EE', '#3B9CFF', '#67E8F9'];

export default function TechStackSection() {
  const [active, setActive] = useState(0);
  const accent = ACCENTS[active];

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Engineering approach"
        title="Technology, chosen deliberately"
        highlight={[2]}
        description="Not a logo wall. This is the stack we build with, presented as the layers of a real system — hover a layer to see what sits in it."
        className="mb-14"
      />

      <div className="grid gap-6 lg:grid-cols-12">
        {/* ------------------------------------------------ stack diagram */}
        <div className="lg:col-span-5">
          <div className="surface relative h-full overflow-hidden rounded-3xl p-5">
            <CircuitField color={accent} opacity={0.24} packets={false} />
            <motion.div
              key={`wash-${active}`}
              aria-hidden
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="pointer-events-none absolute inset-0"
              style={{
                background: `radial-gradient(circle at 50% ${18 + active * 14}%, ${accent}26, transparent 60%)`,
              }}
            />

            <div className="relative">
              <div className="mb-4 flex items-center justify-between">
                <span className="eyebrow text-faint">System layers</span>
                <span
                  className="font-mono text-[0.58rem] uppercase tracking-[0.18em]"
                  style={{ color: accent }}
                >
                  {techStack[active].group}
                </span>
              </div>
              <StackDiagram active={active} onHover={setActive} />
            </div>
          </div>
        </div>

        {/* ------------------------------------------------- layer detail */}
        <Stagger className="space-y-3 lg:col-span-7">
          {techStack.map((group, i) => {
            const isActive = i === active;
            const groupAccent = ACCENTS[i];
            return (
              <motion.div
                key={group.group}
                variants={staggerItem}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                tabIndex={0}
                data-active={isActive}
                style={{ '--ring-color': groupAccent }}
                className="surface glow-ring edge-beam group relative cursor-default overflow-hidden rounded-2xl p-5 transition-all duration-500 hover:translate-x-1"
              >
                <div className="flex items-center gap-4">
                  {/* layer index bar */}
                  <div className="flex shrink-0 flex-col items-center gap-1.5">
                    <span
                      className="font-mono text-[0.6rem] font-bold transition-colors duration-300"
                      style={{ color: isActive ? groupAccent : 'rgb(var(--c-faint))' }}
                    >
                      L{String(i + 1).padStart(2, '0')}
                    </span>
                    <motion.span
                      className="w-0.5 rounded-full"
                      style={{ background: groupAccent }}
                      animate={{ height: isActive ? 26 : 12, opacity: isActive ? 1 : 0.3 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3
                      className="text-[0.78rem] font-bold uppercase tracking-[0.16em] transition-colors duration-300"
                      style={{ color: isActive ? groupAccent : 'rgb(var(--c-muted))' }}
                    >
                      {group.group}
                    </h3>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {group.items.map((item, j) => (
                        <motion.span
                          key={item}
                          animate={{
                            y: isActive ? -2 : 0,
                            borderColor: isActive
                              ? `${groupAccent}66`
                              : 'rgb(var(--c-line) / 0.09)',
                          }}
                          transition={{ duration: 0.35, delay: isActive ? j * 0.04 : 0 }}
                          className="rounded-lg border bg-line/[0.03] px-2.5 py-1.5 text-[0.74rem] text-ink"
                        >
                          {item}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}

          <Reveal
            delay={0.1}
            className="rounded-2xl border border-line/[0.08] bg-line/[0.02] px-5 py-4 text-[0.78rem] leading-relaxed text-faint"
          >
            We only list technology we have shipped with. If your project needs something
            outside this stack, we will tell you rather than learn it on your budget.
          </Reveal>
        </Stagger>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

const LAYER_H = 44;
const GAP = 12;
const TOP = 16;

function StackDiagram({ active, onHover }) {
  const total = techStack.length;
  const height = TOP * 2 + total * LAYER_H + (total - 1) * GAP;

  return (
    <svg viewBox={`0 0 300 ${height}`} className="h-auto w-full" role="presentation">
      <defs>
        <linearGradient id="stack-spine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3B9CFF" stopOpacity="0.1" />
          <stop offset="50%" stopColor="#22D3EE" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#1B72F5" stopOpacity="0.1" />
        </linearGradient>
      </defs>

      {/* spine the packets travel down */}
      <line
        x1="26"
        y1={TOP}
        x2="26"
        y2={height - TOP}
        stroke="url(#stack-spine)"
        strokeWidth="1.5"
      />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx="26" r="3" fill="#22D3EE">
          <animateMotion
            dur="6s"
            begin={`${i * 2}s`}
            repeatCount="indefinite"
            path={`M0,${TOP} V${height - TOP}`}
          />
          <animate
            attributeName="opacity"
            values="0;1;1;0"
            dur="6s"
            begin={`${i * 2}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}

      {techStack.map((group, i) => {
        const y = TOP + i * (LAYER_H + GAP);
        const isActive = i === active;
        const accent = ACCENTS[i];
        return (
          <g
            key={group.group}
            onMouseEnter={() => onHover(i)}
            style={{ cursor: 'pointer' }}
          >
            {/* connector from spine into the layer */}
            <line
              x1="26"
              y1={y + LAYER_H / 2}
              x2="44"
              y2={y + LAYER_H / 2}
              stroke={accent}
              strokeOpacity={isActive ? 0.9 : 0.3}
              strokeWidth="1.2"
              style={{ transition: 'stroke-opacity 0.4s ease' }}
            />

            <motion.rect
              x={44}
              y={y}
              rx="11"
              height={LAYER_H}
              animate={{
                width: isActive ? 244 : 224,
                opacity: isActive ? 1 : 0.72,
              }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              fill={isActive ? `${accent}1f` : 'rgb(var(--c-line) / 0.035)'}
              stroke={isActive ? accent : 'rgb(var(--c-line) / 0.12)'}
              strokeWidth={isActive ? 1.6 : 1}
            />

            <text
              x={60}
              y={y + LAYER_H / 2 + 1}
              dominantBaseline="middle"
              fontSize="10.5"
              fontFamily="'JetBrains Mono', monospace"
              letterSpacing="0.14em"
              fill={isActive ? accent : 'rgb(var(--c-muted))'}
              style={{ transition: 'fill 0.4s ease', textTransform: 'uppercase' }}
            >
              {group.group.toUpperCase()}
            </text>

            <text
              x={isActive ? 274 : 254}
              y={y + LAYER_H / 2 + 1}
              textAnchor="end"
              dominantBaseline="middle"
              fontSize="9"
              fontFamily="'JetBrains Mono', monospace"
              fill="rgb(var(--c-faint))"
            >
              {String(group.items.length).padStart(2, '0')}
            </text>

            {/* Plain rect rather than a shared layoutId — framer's layout
                animations are unreliable on SVG primitives. */}
            <motion.rect
              x={44}
              y={y}
              width="3"
              height={LAYER_H}
              rx="1.5"
              fill={accent}
              animate={{ opacity: isActive ? 1 : 0 }}
              transition={{ duration: 0.35 }}
            />
          </g>
        );
      })}
    </svg>
  );
}
