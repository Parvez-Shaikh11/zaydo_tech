import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import SectionHeader from './ui/SectionHeader';
import { projects } from '../data/projects';
import { StatusBadge } from './ProjectCard';

export default function PossibleShowcase() {
  // Find website-design project or default to digital platforms concept project
  const websiteProject =
    projects.find((p) => p.slug === 'website-design') ||
    projects.find((p) => p.serviceId === 'digital-platforms') ||
    projects[0];

  if (!websiteProject) return null;

  return (
    <section className="relative isolate mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <SectionHeader
        eyebrow="Digital Experience Showcase"
        icon={Sparkles}
        title="See What's Possible"
        highlight={[2, 3]}
        description="We don't just talk about better digital experiences. We build them."
        className="mb-10"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Link
          to={`/work/${websiteProject.slug}`}
          className="tile tile-hover card-sheen group relative grid overflow-hidden rounded-[var(--radius-tile-lg)] border border-line/10 bg-panel lg:grid-cols-12"
        >
          {/* Image side */}
          <div className="relative isolate h-64 overflow-hidden lg:col-span-6 lg:h-full">
            <img
              src={websiteProject.image}
              alt={websiteProject.title}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-panel via-panel/30 to-transparent lg:bg-gradient-to-r" />

            <div className="absolute left-4 top-4 flex items-center gap-2">
              <span className="inline-flex rounded-full bg-panel/90 backdrop-blur-md">
                <StatusBadge project={websiteProject} />
              </span>
            </div>
          </div>

          {/* Copy side */}
          <div className="flex flex-col justify-center p-7 sm:p-10 lg:col-span-6">
            <div className="flex items-center gap-3 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-faint">
              <span>{websiteProject.category}</span>
              <span>•</span>
              <span>{websiteProject.year}</span>
            </div>

            <h3 className="mt-3 font-display text-2xl font-extrabold text-ink transition-colors duration-300 group-hover:text-accent sm:text-3xl">
              {websiteProject.title}
            </h3>

            <p className="mt-2 text-[0.82rem] font-semibold uppercase tracking-[0.12em] text-accent">
              {websiteProject.tagline}
            </p>

            <p className="mt-4 text-[0.9rem] leading-relaxed text-muted">
              {websiteProject.description}
            </p>

            <div className="mt-8 flex items-center gap-3">
              <span className="btn btn-primary !py-2.5 text-[0.78rem]">
                View Case Study
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>

              {websiteProject.statusTone === 'concept' && (
                <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-amber-400">
                  Concept Project
                </span>
              )}
            </div>
          </div>
        </Link>
      </motion.div>
    </section>
  );
}
