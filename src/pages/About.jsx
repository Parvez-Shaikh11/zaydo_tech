import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight, Compass, Eye, Gauge, Layers, Lock, Repeat, ShieldCheck, Telescope,
} from 'lucide-react';
import PageHero from '../components/PageHero';
import SectionHeader from '../components/ui/SectionHeader';
import Reveal, { Stagger, staggerItem } from '../components/ui/Reveal';
import CTASection from '../components/CTASection';

const beliefs = [
  {
    icon: Compass,
    title: 'Understand before building',
    body: 'The most expensive software is the software that solved the wrong problem correctly. We spend real time on the problem before writing anything.',
  },
  {
    icon: Layers,
    title: 'Design before engineering',
    body: 'Data model and interface decisions are cheap on paper and expensive in production. They get made first, deliberately.',
  },
  {
    icon: Repeat,
    title: 'Automate before scaling manually',
    body: 'If a process only works by adding people, it is not a process — it is a bottleneck with staffing applied to it.',
  },
  {
    icon: Telescope,
    title: 'Build for today, architect for tomorrow',
    body: 'We ship what is needed now, inside a structure that will not have to be torn down when the requirement grows.',
  },
];

const principles = [
  {
    n: '01',
    icon: Eye,
    title: 'Clarity',
    body: 'You should be able to explain your own system to someone else after we hand it over. If our explanation needs a diagram nobody understands, we have failed.',
  },
  {
    n: '02',
    icon: ShieldCheck,
    title: 'Reliability',
    body: 'Systems fail. Good systems fail visibly, recover automatically where they can, and escalate clearly where they cannot.',
  },
  {
    n: '03',
    icon: Gauge,
    title: 'Scalability',
    body: 'Load, data volume and team size all grow. Pooling, indexing and clean service boundaries are decided at design time, not during an incident.',
  },
  {
    n: '04',
    icon: Lock,
    title: 'Long-term thinking',
    body: 'We would rather have one client for five years than five clients for one project. That shapes what we recommend, including when we recommend nothing.',
  },
];

export default function About() {
  return (
    <div>
      <PageHero
        eyebrow="About Zaydo Tech"
        title="A technology partner,"
        highlight="not a code vendor."
        description="Zaydo Tech exists because businesses should be able to use technology without inheriting complexity in exchange. We turn business challenges into digital systems that are useful, reliable and understandable by the people who depend on them."
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'About' }]}
      >
        <div className="flex flex-wrap gap-3">
          <Link to="/work" className="btn btn-ghost">
            See what we have built
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/contact" className="btn btn-primary">
            Start a conversation
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </PageHero>

      <div className="mx-auto max-w-7xl space-y-28 px-4 sm:px-6 sm:space-y-36 lg:px-8">
        {/* ------------------------------------------------- why we exist */}
        <section className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal direction="right" className="lg:col-span-6">
            <div className="relative overflow-hidden rounded-[1.75rem] border border-line/10 bg-panel/50 p-2 shadow-lift">
              <div className="relative isolate aspect-[4/3] overflow-hidden rounded-[1.35rem]">
                <img
                  src="/photos/hero_3d.png"
                  alt="Connected digital systems"
                  className="brand-grade h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-panel via-panel/20 to-transparent" />
                <div className="absolute inset-0 bg-brand-500 opacity-35 mix-blend-color" />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-24 animate-scan-line bg-gradient-to-b from-transparent via-cyanic-400/40 to-transparent"
                />
                <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/10 bg-black/45 px-4 py-3 backdrop-blur-md">
                  <p className="font-mono text-[0.55rem] uppercase tracking-[0.2em] text-white/55">
                    Operating principle
                  </p>
                  <p className="mt-1 text-[0.85rem] font-semibold text-white">
                    Solve the business problem. Then write the code.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal direction="left" delay={0.1} className="lg:col-span-6">
            <span className="chip !border-cyanic-400/40 !text-cyanic-400">Why we exist</span>
            <h2 className="mt-6 text-3xl font-extrabold leading-tight text-ink sm:text-[2.5rem]">
              Most businesses do not have a software problem.
              <span className="text-brand-gradient"> They have a process problem.</span>
            </h2>
            <div className="mt-6 space-y-4 text-[0.92rem] leading-relaxed text-muted">
              <p>
                Somewhere in almost every organisation there is a person keeping two systems
                in sync by hand, a spreadsheet holding information nobody else can see, and
                a report that takes a full day to assemble every month.
              </p>
              <p>
                None of that is a technology failure. It is what happens when tools are added
                one at a time to solve individual problems, and nobody is responsible for how
                they fit together.
              </p>
              <p>
                Zaydo Tech exists to take that responsibility. We look at the whole operation,
                decide what genuinely needs to be built, and engineer it properly — including
                the unglamorous parts: the data model, the failure handling, the handover
                documentation.
              </p>
            </div>

            <div className="mt-8 rounded-2xl border-l-2 border-cyanic-400 bg-line/[0.03] py-4 pl-5 pr-4">
              <p className="text-[0.95rem] font-semibold leading-relaxed text-ink">
                "Technology should solve real problems, not create more complexity."
              </p>
              <p className="mt-2 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-faint">
                Our philosophy, in one line
              </p>
            </div>
          </Reveal>
        </section>

        {/* -------------------------------------------------- how we think */}
        <section>
          <SectionHeader
            eyebrow="How we think"
            title="Four ideas that decide everything"
            highlight={[2, 3]}
            description="These are not values on a wall. Each one changes what we do when a decision gets difficult."
            className="mb-14"
          />

          <Stagger className="grid gap-4 sm:grid-cols-2">
            {beliefs.map((belief) => {
              const Icon = belief.icon;
              return (
                <motion.div
                  key={belief.title}
                  variants={staggerItem}
                  className="surface surface-hover card-sheen group rounded-3xl p-7"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyanic-400/30 bg-cyanic-400/10 text-cyanic-400 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-ink">{belief.title}</h3>
                  <p className="mt-3 text-[0.86rem] leading-relaxed text-muted">{belief.body}</p>
                </motion.div>
              );
            })}
          </Stagger>
        </section>

        {/* ------------------------------------------ engineering principles */}
        <section>
          <SectionHeader
            eyebrow="Engineering principles"
            title="The standard we hold work to"
            highlight={[4, 5]}
            className="mb-14"
          />

          <Stagger className="grid gap-4 lg:grid-cols-4 sm:grid-cols-2">
            {principles.map((principle) => {
              const Icon = principle.icon;
              return (
                <motion.div
                  key={principle.n}
                  variants={staggerItem}
                  className="surface surface-hover group relative overflow-hidden rounded-3xl p-7"
                >
                  <span className="absolute right-5 top-4 font-display text-5xl font-black text-line/[0.05] transition-colors duration-500 group-hover:text-brand-500/15">
                    {principle.n}
                  </span>
                  <span className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-brand-500/30 bg-brand-500/10 text-brand-400">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="relative mt-5 text-lg font-bold text-ink">{principle.title}</h3>
                  <p className="relative mt-3 text-[0.84rem] leading-relaxed text-muted">
                    {principle.body}
                  </p>
                </motion.div>
              );
            })}
          </Stagger>
        </section>

        {/* -------------------------------------------------------- vision */}
        <section>
          <Reveal className="surface relative overflow-hidden rounded-[2rem] p-8 sm:p-14">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 animate-gradient-pan opacity-[0.14]"
              style={{
                background: 'linear-gradient(115deg, #1B72F5 0%, #06B6D4 45%, transparent 75%)',
                backgroundSize: '220% 220%',
              }}
            />
            <div className="relative grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <span className="chip !border-cyanic-400/40 !text-cyanic-400">Vision</span>
                <h2 className="mt-6 text-3xl font-extrabold leading-tight text-ink sm:text-[2.4rem]">
                  Where we are going
                </h2>
              </div>
              <div className="space-y-4 text-[0.94rem] leading-relaxed text-muted lg:col-span-7">
                <p>
                  Our intent is to build Zaydo Tech into an internationally credible software
                  engineering and digital systems company — judged on the quality of the
                  systems we deliver rather than on the size of the claims we make.
                </p>
                <p>
                  We are deliberate about what we do not say. You will not find invented client
                  counts, unverifiable performance figures or partnership badges on this site,
                  because credibility that cannot survive a direct question is not credibility.
                </p>
                <p className="border-t border-line/[0.08] pt-4 text-[0.86rem] text-faint">
                  What we will say: we understand business problems, we engineer systems that
                  solve them, and we stay involved after launch. Everything else, we would
                  rather demonstrate than assert.
                </p>
              </div>
            </div>
          </Reveal>
        </section>
      </div>

      <div className="mt-24">
        <CTASection
          title="Want to see how we would think about your problem?"
          body="The fastest way to judge an engineering partner is to hand them a real problem and read the response. Send us yours."
        />
      </div>
    </div>
  );
}
