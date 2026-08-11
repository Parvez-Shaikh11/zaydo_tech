import React, { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Minus, Plus, Users } from 'lucide-react';
import PageHero from '../components/PageHero';
import Reveal, { Stagger, staggerItem } from '../components/ui/Reveal';
import SectionHeader from '../components/ui/SectionHeader';
import ProjectCard from '../components/ProjectCard';
import CTASection from '../components/CTASection';
import { servicesData } from '../data/servicesData';
import { projectsByService } from '../data/projects';

export default function ServiceDetail() {
  const { serviceId } = useParams();
  const index = servicesData.findIndex((s) => s.id === serviceId);

  if (index === -1) return <Navigate to="/services" replace />;

  const service = servicesData[index];
  const next = servicesData[(index + 1) % servicesData.length];
  const previous = servicesData[(index - 1 + servicesData.length) % servicesData.length];
  const related = projectsByService(service.id);
  const Icon = service.icon;

  return (
    <div>
      <PageHero
        eyebrow={`Capability ${service.number}`}
        title={service.title}
        highlight={service.tagline}
        description={service.description}
        accent={service.accent}
        breadcrumb={[
          { label: 'Home', to: '/' },
          { label: 'Services', to: '/services' },
          { label: service.short },
        ]}
      >
        <div className="flex flex-wrap items-center gap-3">
          <Link to="/contact" className="btn btn-primary">
            Start a {service.short.toLowerCase()} project
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/work" className="btn btn-ghost">
            See related work
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </PageHero>

      <div className="mx-auto max-w-7xl space-y-24 px-4 pb-8 sm:px-6 sm:space-y-32 lg:px-8">
        {/* ------------------------------------------------- hero visual */}
        <Reveal className="relative overflow-hidden rounded-[2rem] border border-line/10 bg-panel/50 p-2 shadow-lift">
          <div className="relative isolate aspect-[16/9] overflow-hidden rounded-[1.6rem] sm:aspect-[21/8]">
            <motion.img
              src={service.image}
              alt={service.title}
              initial={{ scale: 1.15 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
              className={`h-full w-full object-cover ${service.grade} ${service.imagePosition ?? ''}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-panel via-panel/20 to-transparent" />
            <div
              className="absolute inset-0 opacity-40 mix-blend-color"
              style={{ background: service.accent }}
            />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-28 animate-scan-line opacity-40"
              style={{
                background: `linear-gradient(to bottom, transparent, ${service.accent}66, transparent)`,
              }}
            />

            <div className="absolute inset-x-5 bottom-5 flex flex-wrap items-center gap-2">
              <span
                className="flex h-11 w-11 items-center justify-center rounded-2xl border backdrop-blur-md"
                style={{
                  borderColor: `${service.accent}66`,
                  background: `${service.accent}26`,
                  color: '#fff',
                }}
              >
                <Icon className="h-5 w-5" />
              </span>
              {service.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg border border-white/12 bg-black/45 px-3 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-white/80 backdrop-blur-md"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        {/* --------------------------------------- problems / what we build */}
        <section className="grid gap-6 lg:grid-cols-2">
          <Reveal className="surface rounded-3xl p-7 sm:p-9">
            <h2 className="eyebrow text-rose-400">The problems this solves</h2>
            <ul className="mt-6 space-y-4">
              {service.problemsSolved.map((problem, i) => (
                <motion.li
                  key={problem}
                  initial={{ opacity: 0, x: -14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-start gap-3 border-b border-line/[0.06] pb-4 text-[0.88rem] leading-relaxed text-muted last:border-0 last:pb-0"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-400/12 font-mono text-[0.6rem] text-rose-400">
                    {i + 1}
                  </span>
                  {problem}
                </motion.li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1} className="surface rounded-3xl p-7 sm:p-9">
            <h2 className="eyebrow text-emerald-400">What we build for it</h2>
            <ul className="mt-6 space-y-4">
              {service.whatWeBuild.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: 14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-start gap-3 border-b border-line/[0.06] pb-4 text-[0.88rem] leading-relaxed text-muted last:border-0 last:pb-0"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </Reveal>
        </section>

        {/* -------------------------------------------------- deliverables */}
        <section>
          <SectionHeader
            eyebrow="What you receive"
            title="Deliverables, not promises"
            highlight={[2]}
            description="Everything below is handed over as an artefact you own — not a slide that describes one."
            className="mb-12"
          />

          <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {service.deliverables.map((item, i) => (
              <motion.div
                key={item.label}
                variants={staggerItem}
                className="surface surface-hover group relative overflow-hidden rounded-3xl p-6"
              >
                <span
                  className="absolute right-5 top-4 font-display text-4xl font-black opacity-[0.07] transition-opacity duration-500 group-hover:opacity-20"
                  style={{ color: service.accent }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-xl border"
                  style={{
                    borderColor: `${service.accent}44`,
                    background: `${service.accent}14`,
                    color: service.accent,
                  }}
                >
                  <Check className="h-4 w-4" />
                </span>
                <h3 className="mt-5 text-[0.95rem] font-bold text-ink">{item.label}</h3>
                <p className="mt-2 text-[0.79rem] leading-relaxed text-faint">{item.note}</p>
              </motion.div>
            ))}
          </Stagger>
        </section>

        {/* ------------------------------------------------ who / workflow */}
        <section className="grid gap-6 lg:grid-cols-12">
          <Reveal className="surface rounded-3xl p-7 sm:p-9 lg:col-span-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-brand-500/30 bg-brand-500/10 text-brand-400">
              <Users className="h-5 w-5" />
            </span>
            <h2 className="mt-5 text-xl font-bold text-ink">Who this is for</h2>
            <p className="mt-3 text-[0.88rem] leading-relaxed text-muted">{service.whoFor}</p>
            <div className="mt-6 rounded-2xl border border-line/[0.08] bg-line/[0.02] p-4">
              <p className="eyebrow mb-2 text-faint">Engagement shape</p>
              <p className="text-[0.82rem] leading-relaxed text-muted">{service.engagement}</p>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="surface rounded-3xl p-7 sm:p-9 lg:col-span-8">
            <h2 className="eyebrow text-cyanic-400">Typical workflow</h2>
            <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {service.workflow.map((step, i) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="group relative rounded-2xl border border-line/[0.08] bg-line/[0.02] p-4 transition-colors duration-300 hover:border-brand-500/30"
                >
                  <span className="font-mono text-[0.58rem] uppercase tracking-[0.2em] text-faint">
                    Step {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="mt-1.5 text-[0.86rem] font-semibold text-ink">{step}</p>
                  {i < service.workflow.length - 1 && (
                    <ArrowRight className="absolute -right-2 top-1/2 hidden h-3.5 w-3.5 -translate-y-1/2 text-line/20 lg:block" />
                  )}
                </motion.div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ---------------------------------------------------- related work */}
        {related.length > 0 && (
          <section>
            <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <SectionHeader
                eyebrow="Proof"
                title={`${service.short} work`}
                highlight="last"
                description="Projects delivered under this capability. Statuses are stated exactly as they are."
                align="left"
              />
              <Link
                to="/work"
                className="group inline-flex shrink-0 items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-cyanic-400"
              >
                All projects
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>

            <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((project, i) => (
                <ProjectCard key={project.slug} project={project} index={i} />
              ))}
            </Stagger>
          </section>
        )}

        {/* ------------------------------------------------------------ FAQ */}
        <section>
          <SectionHeader
            eyebrow="Common questions"
            title="Answered directly"
            highlight={[1]}
            description="The questions that come up in almost every first conversation about this capability."
            className="mb-12"
          />
          <div className="mx-auto max-w-3xl space-y-3">
            {service.faqs.map((faq, i) => (
              <FaqItem key={faq.q} faq={faq} index={i} accent={service.accent} />
            ))}
          </div>
        </section>

        {/* ------------------------------------------------ service pager */}
        <section className="grid gap-4 sm:grid-cols-2">
          <Link
            to={`/services/${previous.id}`}
            className="surface surface-hover group rounded-3xl p-6"
          >
            <span className="flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-faint">
              <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
              Previous capability
            </span>
            <p className="mt-3 text-lg font-bold text-ink transition-colors group-hover:text-cyanic-400">
              {previous.title}
            </p>
          </Link>
          <Link
            to={`/services/${next.id}`}
            className="surface surface-hover group rounded-3xl p-6 text-right"
          >
            <span className="flex items-center justify-end gap-2 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-faint">
              Next capability
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
            <p className="mt-3 text-lg font-bold text-ink transition-colors group-hover:text-cyanic-400">
              {next.title}
            </p>
          </Link>
        </section>
      </div>

      <div className="mt-24">
        <CTASection
          title={`Planning a ${service.short.toLowerCase()} project?`}
          body="Describe the problem in your own words. We will come back with how we would approach it, what it would involve, and whether we are the right people for it."
        />
      </div>
    </div>
  );
}

function FaqItem({ faq, index, accent }) {
  const [open, setOpen] = useState(index === 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      className="surface overflow-hidden rounded-2xl"
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="text-[0.92rem] font-semibold text-ink">{faq.q}</span>
        <span
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-colors"
          style={{
            borderColor: open ? `${accent}66` : 'rgb(var(--c-line) / 0.12)',
            background: open ? `${accent}18` : 'transparent',
            color: open ? accent : 'rgb(var(--c-faint))',
          }}
        >
          {open ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="px-6 pb-6 text-[0.86rem] leading-relaxed text-muted">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
