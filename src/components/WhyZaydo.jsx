import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, RefreshCw, ShieldCheck, Zap } from 'lucide-react';
import SectionHeader from './ui/SectionHeader';
import PhotoStage from './ui/PhotoStage';
import { Stagger } from './ui/Reveal';
import { photos } from '../data/images';

/**
 * Local variant rather than the shared `staggerItem`: these rows sit beside a
 * tall image, so they read best sliding in from the outer edge — a plain
 * fade-up reads as the block appearing all at once.
 */
const principleRow = {
  hidden: { opacity: 0, x: 46, scale: 0.97, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    x: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] },
  },
};

const principles = [
  {
    n: '01',
    title: 'Business-first engineering',
    icon: ShieldCheck,
    accent: '#0059FD',
    body: 'We do not write code for its own sake. Every table, endpoint and automation trigger exists because it removes a specific operational cost — and we can point at which one.',
    proof: 'Every feature traces back to a named cost',
  },
  {
    n: '02',
    title: 'Built to scale',
    icon: Zap,
    accent: '#0077FD',
    body: 'Systems are designed for the load they will carry in two years, not just the load they carry today. Pooling, caching and clean boundaries are decided up front, not retrofitted.',
    proof: 'Capacity decided at design time',
  },
  {
    n: '03',
    title: 'Clear communication',
    icon: MessageSquare,
    accent: '#00C9FD',
    body: 'Architecture, trade-offs and limitations explained in language you can act on. You should always know what is being built, what it will cost to change, and why.',
    proof: 'No jargon shield, ever',
  },
  {
    n: '04',
    title: 'Long-term thinking',
    icon: RefreshCw,
    accent: '#0086FD',
    body: 'Delivery is not the end of the relationship. Software that is genuinely used needs maintenance, and we plan for that from the first architecture conversation.',
    proof: 'Handover includes a runbook',
  },
];

/**
 * Split layout: an organic image block on the left, the four principles
 * stacked one per row on the right.
 *
 * Hovering a row re-tints the image's glow, so the two halves stay connected
 * rather than being two unrelated columns.
 */
export default function WhyZaydo() {
  const [active, setActive] = useState(0);
  const accent = principles[active].accent;

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Why Zaydo Tech"
        title="How we think about your system"
        highlight={[4, 5]}
        description="No invented statistics, no borrowed client logos. Four principles that determine every engineering decision we make."
        className="mb-10"
      />

      <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-8">
        {/* ------------------------------------------------- image column */}
        {/* Hovering a principle on the right re-tints the shapes moving behind
            the photo, so the two halves read as one thing. */}
        <PhotoStage
          photo={photos.planning}
          accent={accent}
          layout="split"
          className="lg:col-span-6"
        />

        {/* --------------------------------------------- principle rows */}
        {/* `amount: 0.15` plus a wide stagger means the rows genuinely arrive
            one at a time as the section scrolls in, rather than the whole stack
            appearing the moment the top edge clears. */}
        <Stagger
          className="grid gap-3 lg:col-span-6"
          gap={0.16}
          viewport={{ once: true, amount: 0.15 }}
        >
          {principles.map((principle, i) => {
            const Icon = principle.icon;
            const isActive = i === active;
            return (
              <motion.div key={principle.n} variants={principleRow}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  data-active={isActive}
                  className="tile group relative flex w-full items-start gap-4 overflow-hidden p-4 text-left transition-transform duration-[400ms] ease-in-out hover:-translate-y-1 sm:p-5"
                  style={{
                    boxShadow: isActive
                      ? `inset 3px 0 0 0 ${principle.accent}, var(--shadow-tile)`
                      : 'var(--shadow-tile)',
                  }}
                >
                  <span
                    aria-hidden
                    className="texture-hatch pointer-events-none absolute inset-0 opacity-60"
                  />

                  <span
                    className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-all duration-500 group-hover:scale-110"
                    style={{
                      borderColor: `${principle.accent}${isActive ? '77' : '33'}`,
                      background: `${principle.accent}${isActive ? '22' : '12'}`,
                      color: principle.accent,
                    }}
                  >
                    <Icon className="h-[1.1rem] w-[1.1rem]" strokeWidth={1.75} />
                    {isActive && (
                      <motion.span
                        layoutId="principle-halo"
                        className="absolute inset-0 rounded-xl"
                        style={{ boxShadow: `0 0 0 5px ${principle.accent}14` }}
                      />
                    )}
                  </span>

                  <span className="relative min-w-0 flex-1">
                    <span className="flex items-baseline gap-3">
                      <span
                        className="font-mono text-[0.6rem] font-bold tracking-[0.2em]"
                        style={{ color: principle.accent }}
                      >
                        {principle.n}
                      </span>
                      <h3 className="font-display text-[0.95rem] font-bold text-ink">
                        {principle.title}
                      </h3>
                    </span>
                    <p className="mt-1.5 text-[0.8rem] leading-snug text-muted">
                      {principle.body}
                    </p>
                    <span className="mt-2.5 flex items-center gap-2 font-mono text-[0.54rem] uppercase tracking-[0.16em] text-faint">
                      <span
                        className="h-1 w-1 rounded-full"
                        style={{ background: principle.accent }}
                      />
                      {principle.proof}
                    </span>
                  </span>
                </button>
              </motion.div>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
