import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import Reveal, { Stagger } from '../components/ui/Reveal';
import ServiceCard from '../components/ServiceCard';
import ProcessSteps from '../components/ProcessSteps';
import Texture from '../components/ui/Texture';
import PhotoStage from '../components/ui/PhotoStage';
import CTASection from '../components/CTASection';
import { servicesData } from '../data/servicesData';
import { photos } from '../data/images';
import { phases } from '../components/ProcessTimeline';

/**
 * Services is a single page, not a hub of sub-pages: the cards scroll to the
 * matching descriptive block further down (`/services#custom-software`), which
 * is also what the Home cards and the navbar mega-menu link to.
 */
export default function Services() {
  return (
    <div>
      <ServicesHero />

      <div className="section-rhythm pt-16 sm:pt-20">
        {/* ---------------------------------------------- capability cards */}
        <section className="relative isolate mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Texture pattern="iso" opacity={0.3} fade="top" className="text-brand-500" />
          <SectionHeader
            eyebrow="At a glance"
            title="Five capabilities, one system"
            highlight={[3]}
            description="Each track is engineered to connect to the others. Pick the one closest to your problem — the detail is further down this page."
            className="mb-[3.75rem]"
          />
          <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {servicesData.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                variant="tile"
                to={`/services#${service.id}`}
              />
            ))}
          </Stagger>
        </section>

        {/* --------------------------------------------- how we engineer */}
        <section className="band-tint relative isolate border-y border-line/[0.06] py-16 sm:py-20">
          <Texture pattern="waves" opacity={0.4} fade="center" className="text-brand-500" />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeader
              eyebrow="How we engineer"
              title="A process you can audit"
              highlight={[3, 4]}
              description="Every phase produces something you can read, review and push back on."
              className="mb-12"
            />
            <ProcessSteps steps={phases.slice(0, 4)} columns={4} />
          </div>
        </section>

        {/* ------------------------------------------- service breakdown */}
        <div className="relative isolate mx-auto max-w-7xl space-y-24 px-4 sm:px-6 lg:px-8">
          <Texture pattern="hex" opacity={0.22} fade="center" className="text-brand-500" />
          {servicesData.map((service, index) => (
            <ServiceBlock key={service.id} service={service} reversed={index % 2 === 1} />
          ))}
        </div>

        <CTASection
          title="Not sure which of these you need?"
          body="Most enquiries start as a description of a problem, not a service name. Tell us what is slow, manual or breaking — we will tell you which track it actually falls under."
        />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

/**
 * Split hero: copy left, one cut-out visual right.
 *
 * The visual used to cycle through the five service renders on a timer. It no
 * longer does — there is a single picture now — so `index` only tracks which
 * capability chip is being pointed at, and that drives the accent behind the
 * photograph. Rotating that highlight on a timer with nothing else changing
 * just looked like a stray flicker.
 */
function ServicesHero() {
  const [index, setIndex] = useState(0);
  const { hash } = useLocation();
  const service = servicesData[index];

  /* React Router does not scroll to a hash on its own, and the target block is
     rendered further down this same page. */
  useEffect(() => {
    if (!hash) return;
    const el = document.querySelector(hash);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [hash]);

  return (
    <section className="relative isolate overflow-hidden pb-10 pt-[5.25rem] sm:pt-24">
      <Texture pattern="mesh" opacity={0.2} fade="right" className="text-brand-500" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        {/* ------------------------------------------------ copy (left) */}
        <div className="lg:col-span-6">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-faint"
          >
            <Link to="/" className="transition-colors hover:text-accent">
              Home
            </Link>
            <span>/</span>
            <span className="text-muted">Services</span>
          </nav>

          <span className="chip mt-6 !border-accent/40 !text-accent">Capabilities</span>

          <h1 className="mt-6 font-display text-[2.1rem] font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl xl:text-[3.4rem]">
            Technology built around{' '}
            <span className="text-brand-gradient">your business.</span>
          </h1>

          <p className="mt-6 max-w-xl text-[0.95rem] leading-relaxed text-muted">
            We do not sell packages. We look at how your organisation actually runs, then
            engineer the system that removes the friction — custom software, a web
            application, an automation pipeline, a practical AI integration, or a digital
            platform.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {servicesData.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onMouseEnter={() => setIndex(i)}
                onFocus={() => setIndex(i)}
                onClick={() => {
                  document
                    .getElementById(s.id)
                    ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                aria-current={i === index}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[0.72rem] font-semibold transition-all duration-300 ${
                  i === index
                    ? 'border-brand-500/50 bg-brand-500/10 text-ink'
                    : 'border-line/10 bg-line/[0.03] text-muted hover:text-ink'
                }`}
              >
                <s.icon className="h-3.5 w-3.5" style={{ color: s.accent }} />
                {s.short}
              </button>
            ))}
          </div>
        </div>

        {/* --------------------------------------------- visual (right) */}
        {/* A cut-out with real alpha, so no frame, no scrim and no caption
            plate: the picture already carries its own silhouette, and the plate
            used to be half-hidden behind the frame's curved corner anyway.
            Hovering a capability chip re-tints the shapes moving behind it. */}
        <PhotoStage
          photo={photos.servicesHero}
          accent={service.accent}
          layout="split"
          priority
          className="lg:col-span-6 lg:-mr-4 xl:-mr-8"
        />
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

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
        <Reveal direction={reversed ? 'left' : 'right'} className="lg:col-span-5">
          <div className="relative isolate">
            <span
              aria-hidden
              className="shape-blob absolute -bottom-6 -left-6 -z-10 h-28 w-28 animate-morph opacity-[0.14]"
              style={{ backgroundColor: service.accent }}
            />
            <div
              className={`relative isolate overflow-hidden border border-line/10 bg-panel shadow-lift ${
                service.imageAspect ?? 'aspect-[4/3]'
              } ${service.imageShape ?? (reversed ? 'shape-arch' : 'shape-arch-alt')}`}
            >
              <img
                src={service.image}
                alt={service.title}
                loading="lazy"
                decoding="async"
                className={`h-full w-full object-cover ${service.grade} ${service.imagePosition ?? ''}`}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to top, rgb(var(--c-panel)) 0%, rgb(var(--c-panel) / var(--img-scrim)) 18%, transparent 52%)',
                }}
              />
              {/* Stock renders get graded and tinted toward the service accent.
                  Purpose-made artwork does not — it is already on-brand, and a
                  blend layer over it only muddies colours somebody chose. */}
              {service.grade && (
                <div
                  className="absolute inset-0 mix-blend-color"
                  style={{ background: service.accent, opacity: 'var(--img-tint-alpha)' }}
                />
              )}
            </div>
          </div>
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

          <h2 className="mt-6 font-display text-2xl font-extrabold leading-tight text-ink sm:text-[2.1rem]">
            {service.title}
          </h2>
          <p className="mt-2 text-[0.85rem] font-medium uppercase tracking-[0.1em] text-accent">
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
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* tech chips moved out of the image and into the copy — on the
              organic frame they were being clipped by the curve */}
          <div className="mt-7 flex flex-wrap gap-2">
            {service.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-lg border border-line/10 bg-line/[0.04] px-2.5 py-1 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-muted"
              >
                {tech}
              </span>
            ))}
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
