import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageSquare, RefreshCw, ShieldCheck, Zap } from 'lucide-react';
import SectionHeader from './ui/SectionHeader';
import { Stagger, staggerItem } from './ui/Reveal';
import CircuitField from './ui/CircuitField';

const principles = [
  {
    n: '01',
    title: 'Business-first engineering',
    icon: ShieldCheck,
    accent: '#1B72F5',
    angle: -90,
    body: 'We do not write code for its own sake. Every table, endpoint and automation trigger exists because it removes a specific operational cost — and we can point at which one.',
    proof: 'Every feature traces back to a named cost',
  },
  {
    n: '02',
    title: 'Built to scale',
    icon: Zap,
    accent: '#0891B2',
    angle: 0,
    body: 'Systems are designed for the load they will carry in two years, not just the load they carry today. Pooling, caching and clean boundaries are decided up front, not retrofitted.',
    proof: 'Capacity decided at design time',
  },
  {
    n: '03',
    title: 'Clear communication',
    icon: MessageSquare,
    accent: '#22D3EE',
    angle: 90,
    body: 'Architecture, trade-offs and limitations explained in language you can act on. You should always know what is being built, what it will cost to change, and why.',
    proof: 'No jargon shield, ever',
  },
  {
    n: '04',
    title: 'Long-term thinking',
    icon: RefreshCw,
    accent: '#3B9CFF',
    angle: 180,
    body: 'Delivery is not the end of the relationship. Software that is genuinely used needs maintenance, and we plan for that from the first architecture conversation.',
    proof: 'Handover includes a runbook',
  },
];

export default function WhyZaydo() {
  const [active, setActive] = useState(0);

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Why Zaydo Tech"
        title="How we think about your system"
        highlight={[4, 5]}
        description="No invented statistics, no borrowed client logos. Four principles that determine every engineering decision we make."
        className="mb-14"
      />

      <div className="grid gap-6 lg:grid-cols-12">
        {/* ------------------------------------------------ orbit visual */}
        <div className="lg:col-span-5">
          <div className="surface glow-ring relative h-full min-h-[24rem] overflow-hidden rounded-3xl">
            <CircuitField
              color={principles[active].accent}
              opacity={0.3}
              className="opacity-80"
            />
            <motion.div
              key={`glow-${active}`}
              aria-hidden
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9 }}
              className="pointer-events-none absolute inset-0"
              style={{
                background: `radial-gradient(circle at 50% 50%, ${principles[active].accent}26, transparent 62%)`,
              }}
            />
            <OrbitDiagram principles={principles} active={active} />
          </div>
        </div>

        {/* -------------------------------------------------- principles */}
        <Stagger className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
          {principles.map((principle, i) => {
            const Icon = principle.icon;
            const isActive = i === active;
            return (
              <motion.button
                key={principle.n}
                variants={staggerItem}
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                data-active={isActive}
                style={{ '--ring-color': principle.accent }}
                className="surface glow-ring edge-beam group relative overflow-hidden rounded-3xl p-6 text-left transition-transform duration-500 hover:-translate-y-1.5"
              >
                {/* number watermark */}
                <span
                  className="pointer-events-none absolute -right-2 -top-4 font-display text-[5rem] font-black leading-none transition-all duration-700"
                  style={{
                    color: principle.accent,
                    opacity: isActive ? 0.16 : 0.05,
                    transform: isActive ? 'translateY(4px)' : 'none',
                  }}
                >
                  {principle.n}
                </span>

                <span
                  className="relative flex h-12 w-12 items-center justify-center rounded-2xl border transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6"
                  style={{
                    borderColor: `${principle.accent}${isActive ? '77' : '33'}`,
                    background: `${principle.accent}${isActive ? '22' : '12'}`,
                    color: principle.accent,
                  }}
                >
                  <Icon className="h-5 w-5" />
                  {isActive && (
                    <motion.span
                      layoutId="principle-halo"
                      className="absolute inset-0 rounded-2xl"
                      style={{ boxShadow: `0 0 0 6px ${principle.accent}14` }}
                    />
                  )}
                </span>

                <h3 className="relative mt-5 text-lg font-bold text-ink">{principle.title}</h3>
                <p className="relative mt-3 text-[0.85rem] leading-relaxed text-muted">
                  {principle.body}
                </p>

                <span className="relative mt-5 flex items-center gap-2 border-t border-line/[0.08] pt-4 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-faint">
                  <motion.span
                    className="h-1 w-1 rounded-full"
                    style={{ background: principle.accent }}
                    animate={isActive ? { scale: [1, 1.9, 1] } : { scale: 1 }}
                    transition={{ duration: 1.4, repeat: isActive ? Infinity : 0 }}
                  />
                  {principle.proof}
                </span>
              </motion.button>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

const CENTER = 170;
const ORBITS = [78, 116];

function OrbitDiagram({ principles, active }) {
  const current = principles[active];

  return (
    <div className="relative flex h-full w-full items-center justify-center p-4">
      <svg viewBox="0 0 340 340" className="h-full max-h-[24rem] w-full">
        {/* orbit rings */}
        {ORBITS.map((r, i) => (
          <circle
            key={r}
            cx={CENTER}
            cy={CENTER}
            r={r}
            fill="none"
            stroke={current.accent}
            strokeOpacity={0.22}
            strokeWidth="1"
            strokeDasharray={i === 0 ? '3 7' : '1 9'}
          />
        ))}

        {/* rotating satellite ring */}
        <g
          style={{
            transformOrigin: `${CENTER}px ${CENTER}px`,
            animation: 'spin-slow 34s linear infinite',
          }}
        >
          {principles.map((p, i) => {
            const rad = (p.angle * Math.PI) / 180;
            const r = ORBITS[i % 2];
            const x = CENTER + Math.cos(rad) * r;
            const y = CENTER + Math.sin(rad) * r;
            const isActive = i === active;
            return (
              <g key={p.n}>
                <circle
                  cx={x}
                  cy={y}
                  r={isActive ? 22 : 14}
                  fill={p.accent}
                  opacity={isActive ? 0.18 : 0.08}
                  style={{ transition: 'all 0.5s cubic-bezier(0.22,1,0.36,1)' }}
                />
                <circle
                  cx={x}
                  cy={y}
                  r={isActive ? 8 : 5}
                  fill="rgb(var(--c-panel))"
                  stroke={p.accent}
                  strokeWidth={isActive ? 2.4 : 1.4}
                  strokeOpacity={isActive ? 1 : 0.55}
                  style={{ transition: 'all 0.5s cubic-bezier(0.22,1,0.36,1)' }}
                />
                {isActive && <circle cx={x} cy={y} r="2.6" fill={p.accent} />}
              </g>
            );
          })}
        </g>

        {/* connective spokes to the active satellite */}
        {principles.map((p, i) => {
          if (i !== active) return null;
          const rad = (p.angle * Math.PI) / 180;
          const r = ORBITS[i % 2];
          return (
            <line
              key={`spoke-${p.n}`}
              x1={CENTER}
              y1={CENTER}
              x2={CENTER + Math.cos(rad) * r}
              y2={CENTER + Math.sin(rad) * r}
              stroke={p.accent}
              strokeOpacity="0.3"
              strokeWidth="1"
              strokeDasharray="4 5"
              className="trace-flow"
            />
          );
        })}

        {/* core */}
        <circle cx={CENTER} cy={CENTER} r="46" fill="rgb(var(--c-panel))" fillOpacity="0.9" />
        <circle
          cx={CENTER}
          cy={CENTER}
          r="46"
          fill="none"
          stroke={current.accent}
          strokeOpacity="0.4"
          strokeWidth="1.2"
        />
        <circle cx={CENTER} cy={CENTER} r="46" fill="none" stroke={current.accent} strokeOpacity="0.25" strokeWidth="6">
          <animate attributeName="r" values="46;58;46" dur="3.4s" repeatCount="indefinite" />
          <animate attributeName="stroke-opacity" values="0.28;0;0.28" dur="3.4s" repeatCount="indefinite" />
        </circle>
      </svg>

      {/* core label */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="w-40 text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.n}
              initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -8, filter: 'blur(6px)' }}
              transition={{ duration: 0.35 }}
            >
              <p
                className="font-mono text-[0.55rem] uppercase tracking-[0.24em]"
                style={{ color: current.accent }}
              >
                Principle {current.n}
              </p>
              <p className="mt-1.5 text-[0.82rem] font-bold leading-tight text-ink">
                {current.title}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
