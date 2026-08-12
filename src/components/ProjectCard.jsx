import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { staggerItem } from './ui/Reveal';

/* Token-driven so the tone shifts between the -600 shades in light mode and
   the -400 shades in dark; the -400s sit at ~1.9:1 on white. */
const TONE = {
  live: 'var(--tone-live)',
  concept: 'var(--tone-concept)',
  rnd: 'var(--tone-rnd)',
};

export function StatusBadge({ project, className = '' }) {
  const tone = TONE[project.statusTone] ?? TONE.concept;
  return (
    <span
      style={{
        color: `rgb(${tone})`,
        backgroundColor: `rgb(${tone} / 0.1)`,
        borderColor: `rgb(${tone} / 0.35)`,
      }}
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[0.55rem] uppercase tracking-[0.16em] ${className}`}
    >
      <span className="h-1 w-1 rounded-full bg-current" />
      {project.status}
    </span>
  );
}

/** Standard grid card. */
export default function ProjectCard({ project, index = 0 }) {
  return (
    <motion.article variants={staggerItem} layout>
      <Link
        to={`/work/${project.slug}`}
        className="tile tile-hover card-sheen group flex h-full flex-col overflow-hidden"
      >
        <div className="relative isolate h-52 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            loading={index < 2 ? 'eager' : 'lazy'}
            className={`h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110 ${project.grade} ${project.imagePosition ?? ''}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-panel via-panel/45 to-transparent" />
          <div
            className="absolute inset-0 opacity-40 mix-blend-color"
            style={{ background: project.accent }}
          />
          <div className="absolute inset-x-5 top-5 flex items-start justify-between gap-3">
            <StatusBadge project={project} />
            <span className="rounded-full border border-line/10 bg-panel/80 px-2.5 py-1 font-mono text-[0.55rem] tracking-[0.18em] text-muted backdrop-blur-md">
              {project.year}
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-faint">
            {project.category}
          </p>
          <h3 className="mt-2 text-xl font-bold text-ink transition-colors duration-300 group-hover:text-accent">
            {project.title}
          </h3>
          <p className="mt-1 text-[0.72rem] font-medium uppercase tracking-[0.1em] text-faint">
            {project.tagline}
          </p>
          <p className="mt-4 text-[0.84rem] leading-relaxed text-muted">{project.description}</p>

          <div className="mt-auto flex items-center justify-between gap-3 border-t border-line/[0.08] pt-5 text-[0.66rem] font-bold uppercase tracking-[0.16em]">
            <span className="truncate text-faint">{project.role.split(' & ')[0]}</span>
            <span className="flex shrink-0 items-center gap-1.5 text-accent">
              Case study
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

/** Wide editorial card used for the featured project. */
export function FeaturedProjectCard({ project }) {
  return (
    <motion.article variants={staggerItem}>
      <Link
        to={`/work/${project.slug}`}
        className="tile tile-hover card-sheen group grid overflow-hidden rounded-[var(--radius-tile-lg)] lg:grid-cols-2"
      >
        <div className="relative isolate h-64 overflow-hidden lg:h-full lg:min-h-[26rem]">
          <img
            src={project.image}
            alt={project.title}
            className={`h-full w-full object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-110 ${project.grade} ${project.imagePosition ?? ''}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-panel via-transparent to-transparent lg:bg-gradient-to-r" />
          <div
            className="absolute inset-0 opacity-35 mix-blend-color"
            style={{ background: project.accent }}
          />
          <span className="absolute left-6 top-6 rounded-full border border-line/10 bg-panel/85 px-3 py-1.5 font-mono text-[0.58rem] uppercase tracking-[0.2em] text-ink backdrop-blur-md">
            Featured case study
          </span>
        </div>

        <div className="flex flex-col justify-center p-7 sm:p-10">
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge project={project} />
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-faint">
              {project.category} · {project.year}
            </span>
          </div>

          <h3 className="mt-5 text-3xl font-extrabold text-ink transition-colors duration-300 group-hover:text-accent sm:text-4xl">
            {project.title}
          </h3>
          <p className="mt-2 text-[0.8rem] font-medium uppercase tracking-[0.12em] text-faint">
            {project.tagline}
          </p>
          <p className="mt-5 text-[0.9rem] leading-relaxed text-muted">{project.description}</p>

          <ul className="mt-6 space-y-2">
            {project.signals.map((signal) => (
              <li key={signal} className="flex items-start gap-2.5 text-[0.82rem] text-muted">
                <span
                  className="mt-1.5 h-1 w-1 shrink-0 rounded-full"
                  style={{ background: project.accent }}
                />
                {signal}
              </li>
            ))}
          </ul>

          <span className="mt-8 inline-flex items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-accent">
            View case study
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
