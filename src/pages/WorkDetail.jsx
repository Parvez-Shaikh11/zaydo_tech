import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight, ArrowUpRight, Check, Cloud, Cpu, Database, Layers, Server, Workflow,
} from 'lucide-react';
import PageHero from '../components/PageHero';
import Reveal, { Stagger, staggerItem } from '../components/ui/Reveal';
import SectionHeader from '../components/ui/SectionHeader';
import { StatusBadge } from '../components/ProjectCard';
import CTASection from '../components/CTASection';
import { projects } from '../data/projects';
import { getService } from '../data/servicesData';

const ARCH_META = {
  frontend: { icon: Layers, label: 'Frontend' },
  backend: { icon: Server, label: 'Backend' },
  database: { icon: Database, label: 'Database' },
  cloud: { icon: Cloud, label: 'Cloud & deployment' },
  automation: { icon: Workflow, label: 'Automation' },
};

export default function WorkDetail() {
  const { slug } = useParams();
  const index = projects.findIndex((p) => p.slug === slug);

  if (index === -1) return <Navigate to="/work" replace />;

  const project = projects[index];
  const next = projects[(index + 1) % projects.length];
  const service = getService(project.serviceId);
  const archEntries = Object.entries(project.architecture);

  return (
    <div>
      <PageHero
        eyebrow={`${project.category} · ${project.year}`}
        title={project.title}
        highlight={project.tagline}
        description={project.description}
        accent={project.accent}
        breadcrumb={[
          { label: 'Home', to: '/' },
          { label: 'Work', to: '/work' },
          { label: project.title },
        ]}
      >
        <div className="flex flex-wrap items-center gap-3">
          <StatusBadge project={project} />
          <span className="chip">Role · {project.role}</span>
          {service && (
            <Link
              to={`/services/${service.id}`}
              className="chip transition-colors hover:!text-cyanic-400"
            >
              <service.icon className="h-3 w-3" />
              {service.short}
            </Link>
          )}
        </div>
      </PageHero>

      <div className="mx-auto max-w-7xl space-y-24 px-4 sm:px-6 sm:space-y-32 lg:px-8">
        {/* ------------------------------------------------- project visual */}
        <Reveal className="relative overflow-hidden rounded-[2rem] border border-line/10 bg-panel/50 p-2 shadow-lift">
          <div className="relative isolate aspect-[16/9] overflow-hidden rounded-[1.6rem] sm:aspect-[21/9]">
            <motion.img
              src={project.image}
              alt={project.title}
              initial={{ scale: 1.16 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.7, ease: [0.22, 1, 0.36, 1] }}
              className={`h-full w-full object-cover ${project.grade} ${project.imagePosition ?? ''}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-panel via-panel/15 to-transparent" />
            <div
              className="absolute inset-0 opacity-35 mix-blend-color"
              style={{ background: project.accent }}
            />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-28 animate-scan-line opacity-40"
              style={{
                background: `linear-gradient(to bottom, transparent, ${project.accent}66, transparent)`,
              }}
            />
          </div>
        </Reveal>

        {/* ---------------------------------------------- challenge / approach */}
        <section className="grid gap-6 lg:grid-cols-2">
          <Reveal className="surface rounded-3xl p-7 sm:p-9">
            <h2 className="eyebrow text-rose-400">01 — The challenge</h2>
            <p className="mt-6 text-[0.92rem] leading-relaxed text-muted">{project.challenge}</p>
          </Reveal>
          <Reveal delay={0.1} className="surface rounded-3xl p-7 sm:p-9">
            <h2 className="eyebrow text-cyanic-400">02 — The approach</h2>
            <p className="mt-6 text-[0.92rem] leading-relaxed text-muted">{project.approach}</p>
          </Reveal>
        </section>

        {/* --------------------------------------------------- architecture */}
        <section>
          <SectionHeader
            eyebrow="03 — Architecture"
            title="How the system is put together"
            highlight={[3, 4, 5]}
            description="Only the layers that are actually relevant to this build."
            align="left"
            className="mb-12"
          />

          <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {archEntries.map(([key, value], i) => {
              const meta = ARCH_META[key] ?? { icon: Cpu, label: key };
              const Icon = meta.icon;
              return (
                <motion.div
                  key={key}
                  variants={staggerItem}
                  className="surface surface-hover group relative overflow-hidden rounded-3xl p-6"
                >
                  <span className="absolute right-5 top-4 font-mono text-[0.6rem] text-faint">
                    L{String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-2xl border transition-transform duration-500 group-hover:scale-110"
                    style={{
                      borderColor: `${project.accent}44`,
                      background: `${project.accent}14`,
                      color: project.accent,
                    }}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 text-[0.72rem] font-bold uppercase tracking-[0.16em] text-faint">
                    {meta.label}
                  </h3>
                  <p className="mt-2 text-[0.88rem] leading-relaxed text-ink">{value}</p>
                </motion.div>
              );
            })}
          </Stagger>

          {/* flow strip */}
          <Reveal delay={0.1} className="surface mt-6 overflow-x-auto rounded-3xl p-6">
            <div className="flex min-w-max items-center gap-3">
              {archEntries.map(([key], i) => {
                const meta = ARCH_META[key] ?? { label: key };
                return (
                  <React.Fragment key={key}>
                    <span className="rounded-xl border border-line/[0.09] bg-line/[0.02] px-4 py-2.5 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-muted">
                      {meta.label}
                    </span>
                    {i < archEntries.length - 1 && (
                      <ArrowRight className="h-4 w-4 shrink-0 text-cyanic-400/60" />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </Reveal>
        </section>

        {/* ------------------------------------------------------- features */}
        <section>
          <SectionHeader
            eyebrow="04 — Key features"
            title="What the system actually does"
            highlight={[3, 4]}
            align="left"
            className="mb-12"
          />
          <Stagger className="grid gap-4 sm:grid-cols-2">
            {project.features.map((feature, i) => (
              <motion.div
                key={feature}
                variants={staggerItem}
                className="surface surface-hover flex items-start gap-4 rounded-2xl p-5"
              >
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl font-mono text-[0.66rem] font-bold"
                  style={{ background: `${project.accent}18`, color: project.accent }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-[0.88rem] leading-relaxed text-muted">{feature}</p>
              </motion.div>
            ))}
          </Stagger>
        </section>

        {/* -------------------------------------------------------- outcome */}
        <section className="grid gap-6 lg:grid-cols-12">
          <Reveal className="surface relative overflow-hidden rounded-3xl p-7 sm:p-10 lg:col-span-7">
            <div
              aria-hidden
              className="halo"
              style={{
                width: '22rem',
                height: '22rem',
                top: '-8rem',
                right: '-6rem',
                background: `${project.accent}2e`,
              }}
            />
            <div className="relative">
              <h2 className="eyebrow text-emerald-400">05 — Outcome</h2>
              <p className="mt-6 text-[1rem] leading-relaxed text-ink">{project.outcome}</p>
              <p className="mt-6 border-t border-line/[0.08] pt-5 text-[0.78rem] leading-relaxed text-faint">
                Where a numeric result cannot be substantiated, it is not stated. This
                write-up describes what was built and what changed operationally.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="surface rounded-3xl p-7 sm:p-9 lg:col-span-5">
            <h2 className="eyebrow text-faint">Engineering signals</h2>
            <ul className="mt-6 space-y-4">
              {project.signals.map((signal) => (
                <li key={signal} className="flex items-start gap-3 text-[0.86rem] text-muted">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  {signal}
                </li>
              ))}
            </ul>
            {service && (
              <Link
                to={`/services/${service.id}`}
                className="btn btn-ghost mt-8 w-full !py-3"
              >
                About {service.short.toLowerCase()}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            )}
          </Reveal>
        </section>

        {/* ---------------------------------------------------- next project */}
        <Reveal>
          <Link
            to={`/work/${next.slug}`}
            className="surface surface-hover card-sheen group grid overflow-hidden rounded-[1.75rem] sm:grid-cols-3"
          >
            <div className="relative h-40 overflow-hidden sm:h-full">
              <img
                src={next.image}
                alt={next.title}
                loading="lazy"
                className={`h-full w-full object-cover transition-transform duration-[1.4s] group-hover:scale-110 ${next.grade}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-panel to-transparent sm:bg-gradient-to-r" />
            </div>
            <div className="flex flex-col justify-center p-7 sm:col-span-2 sm:p-10">
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-faint">
                Next case study
              </span>
              <h2 className="mt-3 text-2xl font-extrabold text-ink transition-colors group-hover:text-cyanic-400 sm:text-3xl">
                {next.title}
              </h2>
              <p className="mt-2 text-[0.86rem] text-muted">{next.tagline}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-cyanic-400">
                Read it
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </Reveal>
      </div>

      <div className="mt-24">
        <CTASection />
      </div>
    </div>
  );
}
