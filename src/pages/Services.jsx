import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import PageHero from '../components/PageHero';
import SectionHeader from '../components/ui/SectionHeader';
import Reveal, { Stagger, staggerItem } from '../components/ui/Reveal';
import CTASection from '../components/CTASection';
import { servicesData } from '../data/servicesData';
import { techStack } from '../data/site';
import { phases } from '../components/ProcessTimeline';

export default function Services() {
  return (
    <div>
      <PageHero
        eyebrow="Capabilities"
        title="Technology built around"
        highlight="your business."
        description="We do not sell packages. We look at how your organisation actually runs, then engineer the system that removes the friction — whether that means custom software, a web application, an automation pipeline, a practical AI integration, or a digital platform."
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Services' }]}
      >
        <div className="flex flex-wrap gap-2">
          {servicesData.map((service) => (
            <a
              key={service.id}
              href={`#${service.id}`}
              className="group inline-flex items-center gap-2 rounded-full border border-line/10 bg-line/[0.03] px-4 py-2 text-[0.72rem] font-semibold text-muted transition-all duration-300 hover:border-brand-500/40 hover:text-ink"
            >
              <service.icon className="h-3.5 w-3.5" style={{ color: service.accent }} />
              {service.short}
            </a>
          ))}
        </div>
      </PageHero>

      <div className="space-y-28 sm:space-y-36">
        {/* ------------------------------------------- service breakdown */}
        <div className="mx-auto max-w-7xl space-y-24 px-4 sm:px-6 lg:px-8">
          {servicesData.map((service, index) => (
            <ServiceBlock key={service.id} service={service} reversed={index % 2 === 1} />
          ))}
        </div>

        {/* --------------------------------------------- how we engineer */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="How we engineer"
            title="A process you can audit"
            highlight={[3, 4]}
            description="Nine phases from problem statement to ongoing maintenance. Every phase produces something you can read, review and push back on."
            className="mb-14"
          />

          <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {phases.map((phase, i) => (
              <motion.div
                key={phase.title}
                variants={staggerItem}
                className="surface surface-hover group relative overflow-hidden rounded-3xl p-6"
              >
                <span className="absolute right-5 top-4 font-display text-4xl font-black text-line/[0.06] transition-colors duration-500 group-hover:text-brand-500/15">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyanic-400/30 bg-cyanic-400/10 text-cyanic-400">
                  <phase.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-base font-bold text-ink">{phase.title}</h3>
                <p className="mt-1 font-mono text-[0.58rem] uppercase tracking-[0.18em] text-faint">
                  {phase.step}
                </p>
                <p className="mt-3 text-[0.82rem] leading-relaxed text-muted">{phase.summary}</p>
                <p className="mt-4 flex items-start gap-2 border-t border-line/[0.08] pt-4 text-[0.75rem] text-faint">
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                  {phase.deliverable}
                </p>
              </motion.div>
            ))}
          </Stagger>
        </section>

        {/* ------------------------------------------ technology approach */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Technology approach"
            title="Tools grouped by the job they do"
            highlight={[4, 5, 6]}
            description="Technology is an engineering decision, not a badge collection. We list only what we use in delivered work."
            className="mb-14"
          />

          <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {techStack.map((group) => (
              <motion.div
                key={group.group}
                variants={staggerItem}
                className="surface surface-hover rounded-3xl p-6"
              >
                <h3 className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-cyanic-400">
                  {group.group}
                </h3>
                <ul className="mt-4 space-y-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-[0.84rem] text-muted"
                    >
                      <span className="h-1 w-1 rounded-full bg-brand-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </Stagger>
        </section>

        <CTASection
          title="Not sure which of these you need?"
          body="Most enquiries start as a description of a problem, not a service name. Tell us what is slow, manual or breaking — we will tell you which track it actually falls under."
        />
      </div>
    </div>
  );
}

function ServiceBlock({ service, reversed }) {
  const Icon = service.icon;

  return (
    <section id={service.id} className="scroll-mt-32">
      <div
        className={`grid items-center gap-10 lg:grid-cols-12 lg:gap-14 ${
          reversed ? 'lg:[&>*:first-child]:order-2' : ''
        }`}
      >
        {/* visual */}
        <Reveal
          direction={reversed ? 'left' : 'right'}
          className="lg:col-span-5"
        >
          <Link
            to={`/services/${service.id}`}
            className="group relative block overflow-hidden rounded-[1.75rem] border border-line/10 bg-panel/60 p-2 shadow-lift"
          >
            <div className="relative isolate aspect-[4/3] overflow-hidden rounded-[1.35rem]">
              <img
                src={service.image}
                alt={service.title}
                loading="lazy"
                className={`h-full w-full object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-110 ${service.grade} ${service.imagePosition ?? ''}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-panel via-panel/25 to-transparent" />
              <div
                className="absolute inset-0 opacity-40 mix-blend-color"
                style={{ background: service.accent }}
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-20 animate-scan-line opacity-40"
                style={{
                  background: `linear-gradient(to bottom, transparent, ${service.accent}66, transparent)`,
                }}
              />
              <div className="absolute inset-x-4 bottom-4 flex flex-wrap gap-2">
                {service.techStack.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="rounded-lg border border-white/12 bg-black/40 px-2.5 py-1 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-white/75 backdrop-blur-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        </Reveal>

        {/* copy */}
        <Reveal direction={reversed ? 'right' : 'left'} delay={0.1} className="lg:col-span-7">
          <div className="flex items-center gap-3">
            <span
              className="flex h-12 w-12 items-center justify-center rounded-2xl border"
              style={{
                borderColor: `${service.accent}55`,
                background: `${service.accent}18`,
                color: service.accent,
              }}
            >
              <Icon className="h-5 w-5" />
            </span>
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-faint">
              {service.number} — {service.short}
            </span>
          </div>

          <h2 className="mt-6 text-2xl font-extrabold leading-tight text-ink sm:text-[2.1rem]">
            {service.title}
          </h2>
          <p className="mt-2 text-[0.85rem] font-medium uppercase tracking-[0.1em] text-cyanic-400">
            {service.tagline}
          </p>
          <p className="mt-5 max-w-2xl text-[0.92rem] leading-relaxed text-muted">
            {service.description}
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="eyebrow mb-3 text-faint">Problems it solves</h3>
              <ul className="space-y-2">
                {service.problemsSolved.map((problem) => (
                  <li key={problem} className="flex items-start gap-2 text-[0.82rem] text-muted">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-rose-400/70" />
                    {problem}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="eyebrow mb-3 text-faint">What we build</h3>
              <ul className="space-y-2">
                {service.whatWeBuild.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[0.82rem] text-muted">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link to={`/services/${service.id}`} className="btn btn-primary !py-3">
              Full capability detail
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link to="/contact" className="btn btn-ghost !py-3">
              Discuss a project
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
