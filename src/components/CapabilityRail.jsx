import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Reveal from './ui/Reveal';
import CircuitField from './ui/CircuitField';
import { servicesData } from '../data/servicesData';

/**
 * A single rail of all five capabilities. Hovering a column pulls that
 * capability's visual in behind the whole rail and dims the siblings, so the
 * strip behaves like one instrument rather than five flat tiles.
 */
export default function CapabilityRail() {
  const [hovered, setHovered] = useState(null);
  const activeService = hovered != null ? servicesData[hovered] : null;
  const accent = activeService?.accent ?? '#1B72F5';

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Reveal>
        <div
          className="surface relative isolate overflow-hidden rounded-3xl"
          onMouseLeave={() => setHovered(null)}
        >
          {/* --------------------------------------------- backdrop layer */}
          <CircuitField
            color={accent}
            opacity={hovered == null ? 0.32 : 0.12}
            className="transition-opacity duration-700"
          />

          <AnimatePresence>
            {activeService && (
              <motion.div
                key={activeService.id}
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.04 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="pointer-events-none absolute inset-0"
              >
                <img
                  src={activeService.image}
                  alt=""
                  className={`h-full w-full object-cover ${activeService.grade} ${activeService.imagePosition ?? ''}`}
                />
                <div className="absolute inset-0 bg-panel/80" />
                <div
                  className="absolute inset-0 opacity-40 mix-blend-color"
                  style={{ background: accent }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* moving top beam */}
          <motion.span
            aria-hidden
            className="pointer-events-none absolute left-0 top-0 h-px w-1/3"
            style={{
              background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
            }}
            animate={{ x: ['-40%', '340%'] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* --------------------------------------------------- columns */}
          <div className="relative grid divide-y divide-line/[0.08] sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-5">
            {servicesData.map((service, i) => {
              const Icon = service.icon;
              const isActive = hovered === i;
              const dimmed = hovered != null && !isActive;

              return (
                <Link
                  key={service.id}
                  to={`/services/${service.id}`}
                  onMouseEnter={() => setHovered(i)}
                  onFocus={() => setHovered(i)}
                  className="group relative flex flex-col overflow-hidden p-6 transition-all duration-500"
                  style={{ opacity: dimmed ? 0.42 : 1 }}
                >
                  {/* rising accent wash */}
                  <motion.span
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 bottom-0"
                    style={{
                      background: `linear-gradient(to top, ${service.accent}22, transparent)`,
                    }}
                    animate={{ height: isActive ? '100%' : '0%' }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  />

                  <div className="relative flex items-start justify-between">
                    <motion.span
                      className="flex h-11 w-11 items-center justify-center rounded-2xl border"
                      animate={{
                        scale: isActive ? 1.12 : 1,
                        rotate: isActive ? -8 : 0,
                        borderColor: isActive ? `${service.accent}88` : `${service.accent}2e`,
                        backgroundColor: isActive ? `${service.accent}22` : `${service.accent}10`,
                      }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      style={{ color: service.accent }}
                    >
                      <Icon className="h-5 w-5" />
                    </motion.span>

                    <motion.span
                      animate={{
                        opacity: isActive ? 1 : 0,
                        x: isActive ? 0 : -6,
                        y: isActive ? 0 : 6,
                      }}
                      transition={{ duration: 0.35 }}
                      style={{ color: service.accent }}
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </motion.span>
                  </div>

                  <p className="relative mt-5 text-[0.88rem] font-bold text-ink">
                    {service.short}
                  </p>
                  <p className="relative mt-2 text-[0.74rem] leading-relaxed text-muted">
                    {service.tagline}
                  </p>

                  <span className="relative mt-auto pt-5 font-mono text-[0.55rem] uppercase tracking-[0.2em] text-faint">
                    {service.number}
                  </span>

                  {/* animated underline */}
                  <motion.span
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-[2px] origin-left"
                    style={{ background: service.accent }}
                    animate={{ scaleX: isActive ? 1 : 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
