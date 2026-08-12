import React from 'react';
import { motion } from 'framer-motion';
import { Stagger, staggerItem } from './ui/Reveal';

/**
 * Numbered process steps: the number sits in a filled circle straddling the
 * top edge of each card, and a curved dashed line links them across the row.
 *
 * The connector draws itself once on scroll (`pathLength` 0 -> 1) rather than
 * looping, matching this site's "entrances animate once" rule. It is hidden
 * below `lg`, where the cards stack and a horizontal line would point at
 * nothing.
 */

/* Static map — Tailwind's JIT cannot see `lg:grid-cols-${n}`. */
const COLS = {
  2: 'lg:grid-cols-2',
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
  5: 'lg:grid-cols-5',
};

export default function ProcessSteps({
  steps = [],
  columns = 4,
  connector = true,
  accent = '#0059FD',
  className = '',
}) {
  return (
    <div className={`relative isolate ${className}`}>
      {connector && (
        <svg
          aria-hidden="true"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-x-0 top-[3.25rem] -z-10 hidden h-24 w-full lg:block"
        >
          <motion.path
            d="M150 40 C 320 110, 430 -20, 600 45 S 880 110, 1050 40"
            fill="none"
            stroke={accent}
            strokeOpacity="0.4"
            strokeWidth="2"
            strokeDasharray="7 9"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, margin: '-90px' }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>
      )}

      {/* pt-7 leaves room for the number circle straddling each card's top */}
      <Stagger className={`grid gap-x-6 gap-y-16 pt-7 sm:grid-cols-2 ${COLS[columns] ?? COLS[4]}`}>
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <motion.div key={step.title} variants={staggerItem}>
              <article className="tile group relative h-full px-5 pb-6 pt-11 text-center transition-transform duration-[400ms] ease-in-out hover:-translate-y-2">
                {/* number circle, centred on the top edge */}
                <span
                  className="absolute -top-7 left-1/2 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full font-display text-base font-black text-white shadow-lg ring-[6px] ring-canvas transition-transform duration-[400ms] group-hover:scale-110"
                  style={{ backgroundColor: accent }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                {Icon && (
                  <span
                    className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6"
                    style={{ backgroundColor: `${accent}14`, color: accent }}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                )}

                <h3 className="mt-4 font-display text-[0.95rem] font-bold text-ink">
                  {step.title}
                </h3>
                {step.step && (
                  <p className="mt-1 font-mono text-[0.54rem] uppercase tracking-[0.18em] text-faint">
                    {step.step}
                  </p>
                )}
                <p className="mt-2.5 text-[0.8rem] leading-snug text-muted">{step.summary}</p>
              </article>
            </motion.div>
          );
        })}
      </Stagger>
    </div>
  );
}
