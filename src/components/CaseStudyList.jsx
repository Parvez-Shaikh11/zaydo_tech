import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Check } from 'lucide-react';
import Reveal from './ui/Reveal';
import { StatusBadge } from './ProjectCard';

/**
 * Case studies as alternating full-width rows rather than a card grid.
 *
 * Rationale: with only a handful of real projects, a 3-up grid makes each one
 * look like a thumbnail and buries the substance (role, signals, outcome). A
 * row gives every project the width to state what it actually is, and the
 * left/right alternation keeps the eye moving down the page.
 */
export default function CaseStudyList({ projects = [] }) {
  if (!projects.length) return null;

  return (
    <div className="space-y-16 sm:space-y-20">
      {projects.map((project, i) => {
        const reversed = i % 2 === 1;
        return (
          <article
            key={project.slug}
            className={`grid items-center gap-8 lg:grid-cols-12 lg:gap-12 ${
              reversed ? 'lg:[&>*:first-child]:order-2' : ''
            }`}
          >
            {/* ------------------------------------------------- visual */}
            <Reveal direction={reversed ? 'left' : 'right'} className="lg:col-span-6">
              <Link
                to={`/work/${project.slug}`}
                className="group relative block"
                aria-label={`${project.title} case study`}
              >
                {/* index number, breaking out of the frame */}
                <span
                  aria-hidden
                  className={`absolute -top-8 z-10 font-display text-[5rem] font-black leading-none opacity-[0.12] sm:text-[6.5rem] ${
                    reversed ? '-right-2' : '-left-2'
                  }`}
                  style={{ color: project.accent }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                <div
                  className={`relative isolate aspect-[16/10] overflow-hidden border border-line/10 bg-panel shadow-lift transition-transform duration-[600ms] ease-out group-hover:-translate-y-1.5 ${
                    reversed ? 'shape-arch-alt' : 'shape-arch'
                  }`}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    width="960"
                    height="600"
                    loading="lazy"
                    decoding="async"
                    className={`h-full w-full object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-105 ${project.grade ?? ''} ${project.imagePosition ?? ''}`}
                  />
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(to top, rgb(var(--c-panel)) 0%, rgb(var(--c-panel) / var(--img-scrim)) 18%, transparent 50%)',
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
              </Link>
            </Reveal>

            {/* -------------------------------------------------- content */}
            <Reveal
              direction={reversed ? 'right' : 'left'}
              delay={0.1}
              className="lg:col-span-6"
            >
              <div className="flex flex-wrap items-center gap-3">
                <StatusBadge project={project} />
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-faint">
                  {project.category} · {project.year}
                </span>
              </div>

              <h3 className="mt-4 font-display text-2xl font-extrabold text-ink sm:text-3xl">
                {project.title}
              </h3>
              <p
                className="mt-2 font-mono text-[0.68rem] uppercase tracking-[0.16em]"
                style={{ color: project.accent }}
              >
                {project.tagline}
              </p>

              <p className="mt-5 text-[0.9rem] leading-relaxed text-muted">
                {project.description}
              </p>

              {project.signals?.length > 0 && (
                <ul className="mt-6 space-y-2.5">
                  {project.signals.map((signal) => (
                    <li key={signal} className="flex items-start gap-2.5 text-[0.84rem] text-muted">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                      {signal}
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-7 flex flex-wrap items-center gap-5">
                <Link to={`/work/${project.slug}`} className="btn btn-primary">
                  Read the case study
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-faint">
                  {project.role}
                </span>
              </div>
            </Reveal>
          </article>
        );
      })}
    </div>
  );
}
