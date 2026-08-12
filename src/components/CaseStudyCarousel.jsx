import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Check, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { StatusBadge } from './ProjectCard';

const AUTOPLAY_MS = 8000;

/**
 * One case study at a time: description on the left, project image on the
 * right, sliding to the next card automatically.
 *
 * Direction is tracked so the exit animation leaves the way the entrance came
 * — without it, going "previous" still slides left and reads as going forward.
 */
export default function CaseStudyCarousel({ projects = [] }) {
  const [[index, direction], setState] = useState([0, 1]);
  const [paused, setPaused] = useState(false);

  const count = projects.length;

  const go = useCallback(
    (delta) => setState(([i]) => [(i + delta + count) % count, delta]),
    [count],
  );

  useEffect(() => {
    if (paused || count < 2) return undefined;
    const id = setTimeout(() => go(1), AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [index, paused, count, go]);

  if (!count) return null;

  const project = projects[index];

  const variants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 70 : -70, filter: 'blur(8px)' }),
    center: { opacity: 1, x: 0, filter: 'blur(0px)' },
    exit: (dir) => ({ opacity: 0, x: dir > 0 ? -70 : 70, filter: 'blur(8px)' }),
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="tile relative overflow-hidden p-5 sm:p-8">
        {/* min-height keeps the controls from jumping as slides change length */}
        <div className="relative min-h-[27rem] sm:min-h-[24rem]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={project.slug}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="grid items-center gap-8 lg:grid-cols-12 lg:gap-10"
            >
              {/* ------------------------------------------ copy (left) */}
              <div className="lg:col-span-6">
                <div className="flex flex-wrap items-center gap-3">
                  <StatusBadge project={project} />
                  <span className="font-mono text-[0.58rem] uppercase tracking-[0.2em] text-faint">
                    {project.category} · {project.year}
                  </span>
                </div>

                <h3 className="mt-4 font-display text-2xl font-extrabold text-ink sm:text-3xl">
                  {project.title}
                </h3>
                <p
                  className="mt-2 font-mono text-[0.66rem] uppercase tracking-[0.16em]"
                  style={{ color: project.accent }}
                >
                  {project.tagline}
                </p>

                <p className="mt-4 text-[0.88rem] leading-relaxed text-muted">
                  {project.description}
                </p>

                {project.signals?.length > 0 && (
                  <ul className="mt-5 space-y-2">
                    {project.signals.map((signal) => (
                      <li
                        key={signal}
                        className="flex items-start gap-2.5 text-[0.82rem] text-muted"
                      >
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                        {signal}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-7 flex flex-wrap items-center gap-4">
                  <Link to={`/work/${project.slug}`} className="btn btn-primary">
                    Read the case study
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-faint">
                    {project.role}
                  </span>
                </div>
              </div>

              {/* ---------------------------------------- image (right) */}
              <div className="relative isolate lg:col-span-6">
                <span
                  aria-hidden
                  className="absolute -left-3 -top-7 z-10 font-display text-[4.5rem] font-black leading-none opacity-[0.14] sm:text-[5.5rem]"
                  style={{ color: project.accent }}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>

                <div className="shape-arch-alt relative aspect-[16/11] overflow-hidden border border-line/10 bg-panel shadow-lift">
                  <img
                    src={project.image}
                    alt={project.title}
                    width="960"
                    height="660"
                    loading="lazy"
                    decoding="async"
                    className={`h-full w-full object-cover ${project.grade ?? ''} ${project.imagePosition ?? ''}`}
                  />
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(to top, rgb(var(--c-panel)) 0%, rgb(var(--c-panel) / var(--img-scrim)) 16%, transparent 48%)',
                    }}
                  />
                  <div
                    className="pointer-events-none absolute inset-0 mix-blend-color"
                    style={{ background: project.accent, opacity: 'var(--img-tint-alpha)' }}
                  />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 top-0 h-20 animate-scan-line opacity-40"
                    style={{
                      background: `linear-gradient(to bottom, transparent, ${project.accent}55, transparent)`,
                    }}
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* -------------------------------------------------------- controls */}
      {count > 1 && (
        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous case study"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line/12 bg-line/[0.04] text-ink transition-colors hover:border-brand-500/50 hover:text-accent"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? 'Resume autoplay' : 'Pause autoplay'}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line/12 bg-line/[0.04] text-ink transition-colors hover:border-brand-500/50 hover:text-accent"
          >
            {paused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
          </button>

          <div className="flex items-center gap-2">
            {projects.map((p, i) => (
              <button
                key={p.slug}
                type="button"
                onClick={() => setState([i, i > index ? 1 : -1])}
                aria-label={`Show ${p.title}`}
                aria-current={i === index}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === index ? 'w-8 bg-brand-500' : 'w-2 bg-line/20 hover:bg-line/40'
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next case study"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line/12 bg-line/[0.04] text-ink transition-colors hover:border-brand-500/50 hover:text-accent"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
