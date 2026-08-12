import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { LayoutGrid } from 'lucide-react';
import PageHero from '../components/PageHero';
import ProjectCard, { FeaturedProjectCard } from '../components/ProjectCard';
import SectionHeader from '../components/ui/SectionHeader';
import { Stagger } from '../components/ui/Reveal';
import CTASection from '../components/CTASection';
import { projects } from '../data/projects';
import { servicesData } from '../data/servicesData';

export default function Work() {
  const [filter, setFilter] = useState('all');

  const filters = useMemo(
    () => [
      { id: 'all', label: 'All work', icon: LayoutGrid, accent: '#0059FD' },
      ...servicesData
        .filter((s) => projects.some((p) => p.serviceId === s.id))
        .map((s) => ({ id: s.id, label: s.short, icon: s.icon, accent: s.accent })),
    ],
    [],
  );

  const visible = filter === 'all' ? projects : projects.filter((p) => p.serviceId === filter);
  const featured = projects.find((p) => p.featured) ?? projects[0];
  const grid = filter === 'all' ? visible.filter((p) => p.slug !== featured.slug) : visible;

  return (
    <div>
      <PageHero
        eyebrow="Selected work"
        title="Systems we have"
        highlight="designed and built."
        description="Every project below is described exactly as it stands. Production systems are labelled as production systems; concept and internal builds are labelled as concept and internal builds. No borrowed logos, no invented numbers."
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Work' }]}
      >
        {/* ------------------------------------------------ filter bar */}
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => {
            const Icon = f.icon;
            const active = filter === f.id;
            const count =
              f.id === 'all'
                ? projects.length
                : projects.filter((p) => p.serviceId === f.id).length;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                className={`relative inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-[0.72rem] font-bold transition-colors duration-300 ${
                  active ? 'text-ink' : 'text-muted hover:text-ink'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="work-filter-pill"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    className="absolute inset-0 -z-10 rounded-full border"
                    style={{ borderColor: `${f.accent}66`, background: `${f.accent}18` }}
                  />
                )}
                <span
                  className="absolute inset-0 -z-20 rounded-full border border-line/[0.09] bg-line/[0.02]"
                  aria-hidden
                />
                <Icon className="h-3.5 w-3.5" style={{ color: f.accent }} />
                {f.label}
                <span className="font-mono text-[0.6rem] text-faint">
                  {String(count).padStart(2, '0')}
                </span>
              </button>
            );
          })}
        </div>
      </PageHero>

      <div className="mx-auto max-w-7xl section-rhythm px-4 sm:px-6 lg:px-8">
        {/* ------------------------------------------------- featured */}
        {filter === 'all' && (
          <Stagger>
            <FeaturedProjectCard project={featured} />
          </Stagger>
        )}

        {/* ------------------------------------------ project collection */}
        <section>
          <SectionHeader
            eyebrow={filter === 'all' ? 'Project collection' : 'Filtered collection'}
            title={
              filter === 'all'
                ? 'The rest of the portfolio'
                : `${filters.find((f) => f.id === filter)?.label} projects`
            }
            highlight="last"
            description="Each case study documents the problem, the approach, the architecture and the honest outcome."
            align="left"
            className="mb-12"
          />

          <Stagger key={filter} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {grid.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
          </Stagger>

          {grid.length === 0 && (
            <p className="surface rounded-3xl p-10 text-center text-[0.88rem] text-muted">
              No published projects in this capability yet. We would rather show nothing than
              invent something.
            </p>
          )}
        </section>

        {/* ------------------------------------------------ honesty note */}
        <section className="surface rounded-3xl p-7 sm:p-10">
          <h2 className="eyebrow text-accent">How to read this portfolio</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {[
              {
                tone: 'text-emerald-400',
                label: 'Production system',
                body: 'Built, deployed and in real operational use.',
              },
              {
                tone: 'text-amber-400',
                label: 'Concept project',
                body: 'A self-initiated build. Real engineering, no client engagement behind it.',
              },
              {
                tone: 'text-violet-400',
                label: 'Internal R&D',
                body: 'Built to validate a pattern before we offer it to anyone.',
              },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-line/[0.08] p-5">
                <p className={`flex items-center gap-2 text-[0.8rem] font-bold ${item.tone}`}>
                  <span className="h-1.5 w-1.5 rounded-full bg-current" />
                  {item.label}
                </p>
                <p className="mt-2 text-[0.8rem] leading-relaxed text-muted">{item.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-[0.82rem] leading-relaxed text-faint">
            We do not publish client names, revenue figures, user counts or performance
            statistics we cannot substantiate. Where a result is qualitative, it is written
            as a qualitative result.
          </p>
        </section>
      </div>

      <div className="mt-24">
        <CTASection
          title="Want something like this for your operation?"
          body="Describe the process that is costing you time. We will tell you what we would build, roughly what it involves, and whether it is worth building at all."
        />
      </div>
    </div>
  );
}
