import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, LayoutGrid, Plus } from 'lucide-react';
import SectionHeader from './ui/SectionHeader';
import Reveal from './ui/Reveal';
import Texture from './ui/Texture';
import useSteppedRail from './ui/useSteppedRail';
import { StatusBadge } from './ProjectCard';

/**
 * The projects rail: a centred heading over a row of image-led cards that
 * keeps stepping on its own.
 *
 * This replaces the one-case-study-at-a-time panel that used to sit here. That
 * layout gave a single project half the page and reduced the rest of the work
 * to a row of dots; three cards abreast show the range, which is what a
 * "selected work" section is for.
 *
 * The image is the top two thirds of the card on purpose — it is the first
 * thing the eye lands on, and it is the part that carries the project.
 */

/* Widest first — the first match wins. Module scope: `useSteppedRail` keys its
   resize effect on this array's identity. */
const BREAKPOINTS = [
  { min: 1100, perView: 3 },
  { min: 720, perView: 2 },
  { min: 0, perView: 1 },
];

export default function ProjectRail({ projects = [] }) {
  const count = projects.length;
  const rail = useSteppedRail({ count, breakpoints: BREAKPOINTS, stepMs: 4200 });

  if (!count) return null;

  /* Rendered twice so the index may run one past the end and still find a
     filled row. The duplicates are deliberately NOT aria-hidden or inert: past
     the halfway point they are the cards actually on screen. */
  const loop = [...projects, ...projects];

  return (
    <section className="relative isolate mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* isometric grid — this section's own pattern, kept from the layout it
          replaces so the page rhythm does not change */}
      <Texture pattern="iso" opacity={0.34} fade="top" className="text-brand-500" />

      {/* oversized ghost word behind the heading, echoing the services band */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-2 select-none text-center font-display text-[3.5rem] font-black leading-none tracking-tight text-ink/[0.04] sm:text-[5.5rem] lg:text-[6.5rem]"
      >
        Projects
      </span>

      <SectionHeader
        eyebrow="Projects"
        icon={LayoutGrid}
        title="Our recent latest projects"
        highlight={[3]}
        description="Real builds, described honestly. Concept and internal projects are labelled as such."
        className="relative mb-14"
      />

      <div className="relative" {...rail.pauseHandlers}>
        {/* The clip has to be THIS element, not a full-width parent — otherwise
            the off-screen slides spill into the page gutters and the rail reads
            as a row of sliced cards. pb clears the hovered card's lift and its
            drop shadow. */}
        <div className="-mx-3 overflow-hidden pb-12 pt-2">
          <div className="flex w-full" style={rail.trackStyle}>
            {loop.map((project, i) => (
              <div
                key={`${project.slug}-${i}`}
                className="shrink-0 px-3"
                style={{ width: `${rail.slideWidth}%` }}
              >
                <RailCard project={project} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------- controls */}
      <Reveal className="mt-2 flex flex-wrap items-center justify-center gap-5">
        <div className="flex items-center gap-3">
          {[
            { label: 'Previous projects', onClick: rail.prev, Icon: ArrowLeft },
            { label: 'Next projects', onClick: rail.next, Icon: ArrowRight },
          ].map(({ label, onClick, Icon }) => (
            <button
              key={label}
              type="button"
              onClick={onClick}
              aria-label={label}
              className="flex h-11 w-11 items-center justify-center rounded-full text-white shadow-[0_12px_26px_-14px_rgb(0_89_253/0.9)] transition-transform duration-300 hover:scale-110"
              style={{ background: 'linear-gradient(135deg,#0059FD 0%,#0086FD 100%)' }}
            >
              <Icon className="h-4 w-4" />
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {projects.map((p, i) => (
            <button
              key={p.slug}
              type="button"
              onClick={() => rail.goTo(i)}
              aria-label={`Show ${p.title}`}
              aria-current={i === rail.active}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === rail.active ? 'w-8 bg-brand-500' : 'w-2 bg-line/20 hover:bg-line/40'
              }`}
            />
          ))}
        </div>

        <Link
          to="/work"
          className="group inline-flex items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-accent"
        >
          View all projects
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </Reveal>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

/**
 * Image band on top, copy underneath.
 *
 * No `.fill-card` colour flood here, and no framer variants on the root. The
 * flood would hide the screenshot, which is the card's whole point, and a
 * framer-written inline `transform` would silently beat the CSS hover lift on
 * the same node. `.tile` already carries the transform transition.
 */
function RailCard({ project }) {
  return (
    <Link
      to={`/work/${project.slug}`}
      className="tile tile-hover group flex h-full flex-col overflow-hidden outline-none hover:-translate-y-2 focus-visible:-translate-y-2"
    >
      {/* --------------------------------------------------------- image */}
      {/* 3:2 rather than 4:3 — it is the branded artwork's own ratio, so the
          scene is shown as it was composed instead of being cropped at the
          sides, and the band still reads as the dominant half of the card. */}
      <div className="relative isolate aspect-[3/2] overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          decoding="async"
          className={`h-full w-full object-cover transition-transform duration-[1.3s] ease-out group-hover:scale-[1.09] ${
            project.grade ?? ''
          } ${project.imagePosition ?? ''}`}
        />

        {/* Stock imagery gets graded and tinted toward the project accent.
            Purpose-made artwork does not — it is already on-brand, and a blend
            layer over it only muddies colours somebody chose. `grade` is what
            says which kind of image this is. */}
        {project.grade && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 mix-blend-color"
            style={{ background: project.accent, opacity: 'var(--img-tint-alpha)' }}
          />
        )}

        {/* Hover veil — rises from the bottom so the badges at the top stay
            readable throughout. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
          style={{
            background: `linear-gradient(to top, ${project.accent}e6 0%, ${project.accent}40 45%, transparent 80%)`,
          }}
        />

        {/* The reference's plus plate, scaled up from the centre. */}
        <span
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 scale-50 items-center justify-center rounded-full text-white opacity-0 shadow-[0_16px_34px_-12px_rgb(0_0_0/0.6)] transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100"
          style={{ background: 'linear-gradient(135deg,#0059FD 0%,#0086FD 100%)' }}
        >
          <Plus className="h-6 w-6" strokeWidth={2.5} />
        </span>

        <div className="absolute inset-x-4 top-4 flex items-start justify-between gap-3">
          {/* Wrapped, not given a class: the badge paints its own translucent
              tint through an inline `style`, which no utility can override.
              The plate underneath is what makes it legible over a photo. */}
          <span className="inline-flex rounded-full bg-panel/85 backdrop-blur-md">
            <StatusBadge project={project} />
          </span>
          <span className="rounded-full border border-line/10 bg-panel/85 px-2.5 py-1 font-mono text-[0.55rem] tracking-[0.18em] text-muted backdrop-blur-md">
            {project.year}
          </span>
        </div>
      </div>

      {/* ---------------------------------------------------------- copy */}
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-faint">
          {project.category}
        </p>
        <h3 className="mt-2.5 font-display text-[1.3rem] font-extrabold leading-snug text-ink transition-colors duration-300 group-hover:text-accent">
          {project.title}
        </h3>
        <p className="mt-1.5 text-[0.7rem] font-medium uppercase tracking-[0.12em] text-faint">
          {project.tagline}
        </p>
        <p className="mt-4 line-clamp-3 text-[0.86rem] leading-relaxed text-muted">
          {project.description}
        </p>

        <span className="mt-auto inline-flex items-center gap-2 pt-6 text-[0.66rem] font-bold uppercase tracking-[0.16em] text-accent">
          Read the case study
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
