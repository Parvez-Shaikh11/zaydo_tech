import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  AlertTriangle, ArrowRight, Building2, Eye, GitBranch, HeartPulse, Hammer,
  ShoppingBag, Sparkles, Store, TrendingUp, Users, Workflow, Zap,
} from 'lucide-react';
import PageHero from '../components/PageHero';
import SectionHeader from '../components/ui/SectionHeader';
import Reveal, { Stagger, staggerItem } from '../components/ui/Reveal';
import CTASection from '../components/CTASection';
import { servicesData } from '../data/servicesData';

const challenges = [
  { icon: Workflow, title: 'Manual processes', body: 'The same information typed twice, three times, or copied between a form and a spreadsheet.' },
  { icon: GitBranch, title: 'Disconnected systems', body: 'Two tools that both hold the truth, and a person acting as the integration between them.' },
  { icon: Eye, title: 'No operational visibility', body: 'Answering "where is this right now?" requires phoning someone rather than opening a screen.' },
  { icon: AlertTriangle, title: 'Outdated software', body: 'A system nobody wants to touch, cannot extend, and is increasingly afraid to update.' },
  { icon: Zap, title: 'Repetitive work', body: 'Skilled people spending hours on tasks a scheduled job could complete without supervision.' },
  { icon: TrendingUp, title: 'Difficulty scaling', body: 'Growth requiring proportionally more headcount because the process itself does not scale.' },
];

const solutionAreas = [
  {
    n: '01',
    title: 'Business operations',
    body: 'Bring scattered operational data into one system, so status is something you look up rather than ask about.',
    outcomes: ['Single operational source of truth', 'Role-based access and audit trails', 'Scheduling and resource visibility'],
    serviceId: 'custom-software',
  },
  {
    n: '02',
    title: 'Customer experience',
    body: 'Give customers and partners a fast self-service interface instead of routing every request through your support team.',
    outcomes: ['Customer portals and account areas', 'Fast, mobile-first interfaces', 'Lower repetitive support load'],
    serviceId: 'web-applications',
  },
  {
    n: '03',
    title: 'Data & visibility',
    body: 'Connect the systems that already hold your information and make it reportable without a manual export step.',
    outcomes: ['Connected data across tools', 'Live reporting interfaces', 'Reconciliation that runs itself'],
    serviceId: 'web-applications',
  },
  {
    n: '04',
    title: 'Workflow automation',
    body: 'Remove the manual bridge between systems, with validation, retries and an exception path for real decisions.',
    outcomes: ['Automated syncs and notifications', 'Validated, idempotent pipelines', 'Exception queue for humans'],
    serviceId: 'automation',
  },
  {
    n: '05',
    title: 'AI enablement',
    body: 'Apply AI narrowly where it demonstrably outperforms a rule — grounded, evaluated and reviewable.',
    outcomes: ['Retrieval over internal knowledge', 'Document extraction at volume', 'Measured accuracy, cited sources'],
    serviceId: 'ai-systems',
  },
];

const industries = [
  { icon: Building2, name: 'Professional services', body: 'Project tracking, client portals and structured intake.' },
  { icon: ShoppingBag, name: 'Retail & commerce', body: 'Inventory sync, storefront performance, merchant tooling.' },
  { icon: HeartPulse, name: 'Healthcare operations', body: 'Intake automation and records handling on the operational side.' },
  { icon: Hammer, name: 'Construction & property', body: 'Job scheduling, asset registers, site-to-office reporting.' },
  { icon: Store, name: 'Local businesses', body: 'Digital presence and the operational software behind it.' },
  { icon: Users, name: 'Growing companies', body: 'Systems that hold up as headcount and volume increase.' },
];

const transformation = [
  'Problem', 'Understand', 'Design', 'Engineer', 'Automate', 'Launch', 'Improve',
];

export default function Solutions() {
  return (
    <div>
      <PageHero
        eyebrow="Solutions"
        title="Technology should remove"
        highlight="complexity, not add it."
        description="Services describe what we build. Solutions describe what we solve. If you recognise your business in the problems below, there is a good chance we have engineered against them before."
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Solutions' }]}
      >
        <Link to="/contact" className="btn btn-primary">
          Describe your problem
          <ArrowRight className="h-4 w-4" />
        </Link>
      </PageHero>

      <div className="mx-auto max-w-7xl section-rhythm px-4 sm:px-6 lg:px-8">
        {/* --------------------------------------------- business challenges */}
        <section>
          <SectionHeader
            eyebrow="Business challenges"
            title="What usually brings people here"
            highlight={[4, 5]}
            description="Almost every enquiry we receive is a version of one of these six."
            className="mb-[3.75rem]"
          />

          <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {challenges.map((challenge) => {
              const Icon = challenge.icon;
              return (
                <motion.div
                  key={challenge.title}
                  variants={staggerItem}
                  className="tile tile-hover group relative overflow-hidden p-6"
                >
                  <div
                    aria-hidden
                    className="absolute -right-14 -top-14 h-36 w-36 rounded-full bg-rose-500/10 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
                  />
                  <span className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-rose-400/25 bg-rose-400/10 text-rose-400 transition-transform duration-500 group-hover:scale-110">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="relative mt-5 text-base font-bold text-ink">{challenge.title}</h3>
                  <p className="relative mt-2.5 text-[0.84rem] leading-relaxed text-muted">
                    {challenge.body}
                  </p>
                </motion.div>
              );
            })}
          </Stagger>
        </section>

        {/* -------------------------------------------------- solution areas */}
        <section>
          <SectionHeader
            eyebrow="Solution areas"
            title="Five places we create leverage"
            highlight={[2, 3, 4]}
            description="Each area maps to a capability, so the route from problem to engineering is always visible."
            className="mb-[3.75rem]"
          />

          <Stagger className="space-y-4">
            {solutionAreas.map((area) => {
              const service = servicesData.find((s) => s.id === area.serviceId);
              return (
                <motion.div key={area.n} variants={staggerItem}>
                  <div className="tile tile-hover group grid gap-6 p-7 sm:p-9 lg:grid-cols-12 lg:items-center">
                    <div className="lg:col-span-5">
                      <div className="flex items-center gap-4">
                        <span
                          className="font-display text-4xl font-black transition-colors duration-500"
                          style={{ color: `${service?.accent ?? '#0059FD'}33` }}
                        >
                          {area.n}
                        </span>
                        <h3 className="text-xl font-bold text-ink sm:text-2xl">{area.title}</h3>
                      </div>
                      <p className="mt-4 text-[0.88rem] leading-relaxed text-muted">{area.body}</p>
                    </div>

                    <div className="lg:col-span-4">
                      <ul className="space-y-2">
                        {area.outcomes.map((outcome) => (
                          <li
                            key={outcome}
                            className="flex items-start gap-2 text-[0.82rem] text-muted"
                          >
                            <Sparkles
                              className="mt-0.5 h-3.5 w-3.5 shrink-0"
                              style={{ color: service?.accent }}
                            />
                            {outcome}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="lg:col-span-3 lg:text-right">
                      {service && (
                        <Link
                          to={`/services/${service.id}`}
                          className="inline-flex items-center gap-2 rounded-full border border-line/[0.1] bg-line/[0.02] px-4 py-2.5 text-[0.7rem] font-bold uppercase tracking-[0.12em] text-muted transition-all duration-300 hover:border-brand-500/40 hover:text-ink"
                        >
                          <service.icon
                            className="h-3.5 w-3.5"
                            style={{ color: service.accent }}
                          />
                          {service.short}
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </Stagger>
        </section>

        {/* ------------------------------------------- industry applications */}
        <section>
          <SectionHeader
            eyebrow="Industry applications"
            title="Where these patterns apply"
            highlight={[3, 4]}
            description="Listed as applications of our capability, not as claimed specialisations. We do not pretend to industry expertise we have not earned."
            className="mb-[3.75rem]"
          />

          <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry) => {
              const Icon = industry.icon;
              return (
                <motion.div
                  key={industry.name}
                  variants={staggerItem}
                  className="tile tile-hover group flex items-start gap-4 p-6"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-brand-500/25 bg-brand-500/10 text-brand-400 transition-transform duration-500 group-hover:scale-110">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-[0.95rem] font-bold text-ink">{industry.name}</h3>
                    <p className="mt-1.5 text-[0.82rem] leading-relaxed text-muted">
                      {industry.body}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </Stagger>
        </section>

        {/* ------------------------------------------------ transformation */}
        <section>
          <SectionHeader
            eyebrow="Transformation flow"
            title="Problem in, system out"
            highlight={[2, 3]}
            description="The same route every engagement follows, regardless of which capability it lands in."
            className="mb-[3.75rem]"
          />

          <Reveal className="surface overflow-x-auto rounded-3xl p-8">
            <div className="flex min-w-max items-center justify-between gap-3">
              {transformation.map((stage, i) => (
                <React.Fragment key={stage}>
                  <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.09 }}
                    className="flex flex-col items-center gap-3"
                  >
                    <span
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl border font-mono text-[0.7rem] font-bold ${
                        i === 0
                          ? 'border-rose-400/35 bg-rose-400/10 text-rose-400'
                          : i === transformation.length - 1
                            ? 'border-emerald-400/35 bg-emerald-400/10 text-emerald-400'
                            : 'border-brand-500/30 bg-brand-500/10 text-brand-400'
                      }`}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[0.78rem] font-bold text-ink">{stage}</span>
                  </motion.div>
                  {i < transformation.length - 1 && (
                    <motion.span
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.09 + 0.1, duration: 0.4 }}
                      className="h-px w-8 origin-left bg-gradient-to-r from-brand-500/60 to-accent/60 sm:w-14"
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </Reveal>
        </section>
      </div>

      <div className="mt-24">
        <CTASection
          title="Recognise your business in any of this?"
          body="Tell us which of these problems is costing you the most right now. We will tell you what we would build against it — and whether it is worth building."
        />
      </div>
    </div>
  );
}
