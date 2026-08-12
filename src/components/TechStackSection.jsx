import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeader from './ui/SectionHeader';
import Texture from './ui/Texture';
import TechPlayground from './TechPlayground';
import { techStack } from '../data/site';

const ACCENTS = ['#0086FD', '#0059FD', '#0077FD', '#00C9FD', '#5AB6FF', '#6EDCFF'];

/**
 * The stack presented as a dark instrument panel: layer tabs along the top,
 * the selected layer's technologies below as large chips.
 *
 * Deliberately the only dark full-bleed band in the lower half of the page, so
 * it reads as a distinct chapter rather than another white card grid.
 */
export default function TechStackSection() {
  const [active, setActive] = useState(0);
  const accent = ACCENTS[active % ACCENTS.length];

  /* Flattened once per render; `dimmed` is what the tabs drive. */
  const capsules = techStack.flatMap((group, gi) =>
    group.items.map((name) => ({ name, dimmed: gi !== active })),
  );

  return (
    <section className="band-dark relative isolate overflow-hidden py-16 sm:py-20">
      {/* soft topographic drift — the circuit pattern read as busy wallpaper
          at this scale, so this band gets the quieter family */}
      <Texture pattern="mesh" opacity={0.16} fade="bottom" className="text-brand-400" />
      <motion.div
        key={`bloom-${active}`}
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(60rem 24rem at 50% 0%, ${accent}2e, transparent 70%)`,
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Engineering approach"
          title="Technology, chosen deliberately"
          highlight={[2]}
          description="Not a logo wall. This is the stack we build with, grouped by the job each layer does."
          className="mb-12"
        />

        {/* -------------------------------------------------- layer tabs */}
        <div
          role="tablist"
          aria-label="System layers"
          className="flex flex-wrap justify-center gap-2"
        >
          {techStack.map((group, i) => {
            const isActive = i === active;
            return (
              <button
                key={group.group}
                role="tab"
                type="button"
                aria-selected={isActive}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                className={`relative rounded-full px-5 py-2.5 text-[0.7rem] font-bold uppercase tracking-[0.14em] transition-colors duration-300 ${
                  isActive ? 'text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="stack-tab"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    className="absolute inset-0 -z-10 rounded-full"
                    style={{
                      backgroundColor: `${accent}26`,
                      boxShadow: `inset 0 0 0 1px ${accent}66`,
                    }}
                  />
                )}
                <span className="mr-2 font-mono text-[0.58rem] opacity-60">
                  L{String(i + 1).padStart(2, '0')}
                </span>
                {group.group}
              </button>
            );
          })}
        </div>

        {/* Every technology is on the field at once — the tabs dim rather than
            filter, so the band never sits mostly empty. */}
        <div className="mt-8">
          {/* No accent prop: capsule colours are fixed brand blue in
              index.css, so the layer highlight reads the same on every tab. */}
          <TechPlayground items={capsules} />
        </div>

        <p className="mt-6 text-center font-mono text-[0.6rem] uppercase tracking-[0.2em] text-slate-500">
          Drag the capsules · {capsules.length} technologies · {techStack.length} layers ·
          all used in delivered work
        </p>
      </div>
    </section>
  );
}
