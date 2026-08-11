import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Lightbulb, Compass, FileText, Database, PenTool, Cpu, Bot, Rocket, RefreshCw, Check,
} from 'lucide-react';
import SystemDiagram from './ui/SystemDiagram';
import CircuitField from './ui/CircuitField';

const AUTO_MS = 6400;

export const phases = [
  {
    icon: Lightbulb,
    accent: '#F43F5E',
    title: 'Business Challenge',
    step: 'Where it starts',
    summary:
      'Every engagement begins with a business problem stated in business language — not a feature list. Before anything is designed, we need to know what is actually costing you time, money or accuracy.',
    activities: [
      'Identify the operational bottleneck in plain terms',
      'Establish what "solved" would look like',
      'Agree what is in scope and what is deliberately not',
    ],
    deliverable: 'A written problem statement both sides agree on',
    input: 'Your operational reality',
    output: 'Defined problem',
    diagram: {
      nodes: [
        { x: 62, y: 62, label: 'SPREADSHEET' },
        { x: 256, y: 58, label: 'EMAIL' },
        { x: 70, y: 152, label: 'PHONE', below: true },
        { x: 248, y: 156, label: 'PAPER', below: true },
      ],
      links: [[0, 2]],
    },
  },
  {
    icon: Compass,
    accent: '#3B9CFF',
    title: 'Discovery',
    step: 'Understand before building',
    summary:
      'We sit with the people doing the work and map the process as it actually runs — including the workarounds nobody documents. This is where most of the real requirements surface.',
    activities: [
      'Interview the people who use the process daily',
      'Map every manual handover and re-entry point',
      'Audit existing systems, data and integrations',
    ],
    deliverable: 'Current-state process map with timed manual steps',
    input: 'Defined problem',
    output: 'Process map',
    diagram: {
      nodes: [
        { x: 160, y: 105, label: 'DISCOVERY', primary: true, below: true },
        { x: 58, y: 48, label: 'OPS' },
        { x: 262, y: 48, label: 'FIELD' },
        { x: 58, y: 162, label: 'ADMIN', below: true },
        { x: 262, y: 162, label: 'SYSTEMS', below: true },
      ],
      links: [[0, 1], [0, 2], [0, 3], [0, 4]],
    },
  },
  {
    icon: FileText,
    accent: '#1B72F5',
    title: 'Strategy',
    step: 'Decide what to build',
    summary:
      'Not every problem deserves custom software. We decide what should be built, what should be integrated, what should be automated, and what should be left alone — with reasoning you can challenge.',
    activities: [
      'Separate build, buy, integrate and ignore',
      'Sequence the work so value arrives early',
      'Set the success criteria that will be measured',
    ],
    deliverable: 'Solution strategy with a phased delivery sequence',
    input: 'Process map',
    output: 'Delivery plan',
    diagram: {
      nodes: [
        { x: 160, y: 52, label: 'PROBLEM', primary: true },
        { x: 58, y: 150, label: 'BUILD', below: true },
        { x: 160, y: 150, label: 'INTEGRATE', below: true },
        { x: 262, y: 150, label: 'BUY', below: true },
      ],
      links: [[0, 1], [0, 2], [0, 3]],
    },
  },
  {
    icon: Database,
    accent: '#0891B2',
    title: 'Architecture',
    step: 'Design the system',
    summary:
      'The data model is the decision that is hardest to reverse later, so it comes before any interface. Schema, service boundaries, integration points and failure behaviour are all settled here.',
    activities: [
      'Design the relational schema and entity relationships',
      'Define API contracts and service boundaries',
      'Plan for failure: retries, backups, degradation',
    ],
    deliverable: 'Architecture document and data model',
    input: 'Delivery plan',
    output: 'System design',
    diagram: {
      nodes: [
        { x: 130, y: 46, label: 'INTERFACE', primary: true },
        { x: 130, y: 108, label: 'API' },
        { x: 130, y: 168, label: 'DATABASE', below: true },
        { x: 258, y: 108, label: 'CACHE' },
      ],
      links: [[0, 1], [1, 2], [1, 3]],
    },
  },
  {
    icon: PenTool,
    accent: '#22D3EE',
    title: 'Design',
    step: 'Make it usable',
    summary:
      'Interface design against real workflows and real data volumes. If the person using it every day needs training to complete the core task, the design is not finished.',
    activities: [
      'Wireframe the primary task paths first',
      'Design the interface and component system',
      'Validate with the people who will actually use it',
    ],
    deliverable: 'Interface design and reusable component set',
    input: 'System design',
    output: 'Design system',
    diagram: {
      nodes: [
        { x: 160, y: 48, label: 'SYSTEM', primary: true },
        { x: 60, y: 116, label: 'TOKENS' },
        { x: 160, y: 116, label: 'PARTS' },
        { x: 260, y: 116, label: 'PATTERNS' },
        { x: 160, y: 176, label: 'SCREENS', below: true },
      ],
      links: [[0, 1], [0, 2], [0, 3], [2, 4]],
    },
  },
  {
    icon: Cpu,
    accent: '#1B72F5',
    title: 'Engineering',
    step: 'Build it properly',
    summary:
      'Iterative build in reviewable milestones. You see working software throughout rather than a single reveal at the end, which is how scope problems get caught while they are still cheap.',
    activities: [
      'Build in milestones you can review and redirect',
      'Write tests around the logic that must not break',
      'Code review and continuous integration on every change',
    ],
    deliverable: 'Working, reviewable software at each milestone',
    input: 'Design system',
    output: 'Application',
    diagram: {
      nodes: [
        { x: 48, y: 105, label: 'CODE' },
        { x: 155, y: 56, label: 'REVIEW' },
        { x: 155, y: 155, label: 'TESTS', below: true },
        { x: 268, y: 105, label: 'SHIP', primary: true },
      ],
      links: [[0, 1], [0, 2], [1, 3], [2, 3]],
    },
  },
  {
    icon: Bot,
    accent: '#3B9CFF',
    title: 'Automation & AI',
    step: 'Remove the manual work',
    summary:
      'With the system in place, we automate the repetitive paths through it — and apply AI only where it demonstrably outperforms a deterministic rule.',
    activities: [
      'Automate scheduled syncs, notifications and reports',
      'Add AI only where it beats a rule on measured accuracy',
      'Build the exception path for cases needing a human',
    ],
    deliverable: 'Automated pipelines with an exception queue',
    input: 'Application',
    output: 'Automated system',
    diagram: {
      nodes: [
        { x: 48, y: 105, label: 'EVENT' },
        { x: 152, y: 56, label: 'RULES' },
        { x: 152, y: 155, label: 'MODEL', below: true },
        { x: 266, y: 105, label: 'ACTION', primary: true },
      ],
      links: [[0, 1], [0, 2], [1, 3], [2, 3]],
    },
  },
  {
    icon: Rocket,
    accent: '#22D3EE',
    title: 'Launch',
    step: 'Go live safely',
    summary:
      'Migration, parallel running and training. New systems run alongside the old process until the outputs match, so cutover is a decision rather than a gamble.',
    activities: [
      'Migrate and reconcile existing data',
      'Run in parallel until outputs match consistently',
      'Train the team and hand over documentation',
    ],
    deliverable: 'Production deployment with a handover runbook',
    input: 'Automated system',
    output: 'Live system',
    diagram: {
      nodes: [
        { x: 55, y: 58, label: 'OLD PROCESS' },
        { x: 55, y: 155, label: 'NEW SYSTEM', below: true },
        { x: 170, y: 105, label: 'PARALLEL' },
        { x: 272, y: 105, label: 'LIVE', primary: true },
      ],
      links: [[0, 2], [1, 2], [2, 3]],
    },
  },
  {
    icon: RefreshCw,
    accent: '#10B981',
    title: 'Improve',
    step: 'Keep it healthy',
    summary:
      'Software that is used changes. We monitor runtime health, keep dependencies current, verify backups, and extend the system as the business shifts.',
    activities: [
      'Monitor performance and error telemetry',
      'Keep dependencies and security patches current',
      'Extend features as operational needs change',
    ],
    deliverable: 'Ongoing optimisation and maintenance log',
    input: 'Live system',
    output: 'Compounding value',
    diagram: {
      nodes: [
        { x: 160, y: 50, label: 'MONITOR', primary: true },
        { x: 262, y: 116, label: 'ANALYSE' },
        { x: 160, y: 172, label: 'IMPROVE', below: true },
        { x: 58, y: 116, label: 'DEPLOY' },
      ],
      links: [[0, 1], [1, 2], [2, 3], [3, 0]],
    },
  },
];

export default function ProcessTimeline() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef(null);

  useEffect(() => {
    if (paused) return undefined;
    timer.current = setTimeout(() => setActive((i) => (i + 1) % phases.length), AUTO_MS);
    return () => clearTimeout(timer.current);
  }, [active, paused]);

  const phase = phases[active];
  const Icon = phase.icon;
  const progress = ((active + 1) / phases.length) * 100;

  return (
    <div
      className="grid grid-cols-1 gap-6 lg:grid-cols-12"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ------------------------------------------------------- phase rail */}
      <div className="lg:col-span-4">
        <div className="surface relative overflow-hidden rounded-3xl p-2">
          <CircuitField color={phase.accent} opacity={0.26} packets={false} />

          {/* vertical progress rail */}
          <div className="absolute left-[2.15rem] top-6 bottom-6 hidden w-px bg-line/10 sm:block">
            <motion.div
              className="w-full rounded-full"
              style={{
                background: `linear-gradient(to bottom, #1B72F5, ${phase.accent})`,
              }}
              animate={{ height: `${progress}%` }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          <div className="relative max-h-[27rem] overflow-y-auto lg:max-h-none">
            {phases.map((p, i) => {
              const PIcon = p.icon;
              const isActive = i === active;
              const isDone = i < active;
              return (
                <button
                  key={p.title}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`group relative flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition-colors duration-300 ${
                    isActive ? 'bg-line/[0.06]' : 'hover:bg-line/[0.03]'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="phase-active-bg"
                      transition={{ type: 'spring', stiffness: 340, damping: 30 }}
                      className="absolute inset-0 rounded-2xl border"
                      style={{
                        borderColor: `${p.accent}44`,
                        background: `${p.accent}12`,
                      }}
                    />
                  )}

                  <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center">
                    {/* countdown ring on the active phase */}
                    {isActive && (
                      <svg viewBox="0 0 40 40" className="absolute inset-0 h-full w-full -rotate-90">
                        <circle
                          cx="20" cy="20" r="18"
                          fill="none"
                          stroke={p.accent}
                          strokeOpacity="0.18"
                          strokeWidth="2"
                        />
                        <motion.circle
                          key={`${active}-${paused}`}
                          cx="20" cy="20" r="18"
                          fill="none"
                          stroke={p.accent}
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeDasharray="113"
                          initial={{ strokeDashoffset: 113 }}
                          animate={{ strokeDashoffset: paused ? 68 : 0 }}
                          transition={{
                            duration: paused ? 0.4 : AUTO_MS / 1000,
                            ease: 'linear',
                          }}
                        />
                      </svg>
                    )}
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-xl border transition-all duration-500 ${
                        isActive
                          ? 'scale-90'
                          : isDone
                            ? 'border-brand-500/40 bg-brand-500/10 text-brand-400'
                            : 'border-line/10 bg-canvas text-faint group-hover:text-muted'
                      }`}
                      style={
                        isActive
                          ? {
                              borderColor: `${p.accent}66`,
                              background: `${p.accent}1f`,
                              color: p.accent,
                            }
                          : undefined
                      }
                    >
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.span
                          key={isDone ? 'done' : 'icon'}
                          initial={{ scale: 0.4, opacity: 0, rotate: -40 }}
                          animate={{ scale: 1, opacity: 1, rotate: 0 }}
                          exit={{ scale: 0.4, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                        >
                          {isDone ? <Check className="h-4 w-4" /> : <PIcon className="h-4 w-4" />}
                        </motion.span>
                      </AnimatePresence>
                    </span>
                  </span>

                  <span className="relative z-10 min-w-0">
                    <span className="block font-mono text-[0.55rem] uppercase tracking-[0.2em] text-faint">
                      Phase {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={`block truncate text-[0.85rem] font-bold transition-colors ${
                        isActive ? 'text-ink' : 'text-muted group-hover:text-ink'
                      }`}
                    >
                      {p.title}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------- detail panel */}
      <div className="lg:col-span-8">
        <div className="surface relative h-full overflow-hidden rounded-3xl">
          <CircuitField color={phase.accent} opacity={0.28} />
          <motion.div
            key={`wash-${active}`}
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="pointer-events-none absolute -right-28 -top-28 h-72 w-72 rounded-full blur-3xl"
            style={{ background: `${phase.accent}26` }}
          />

          <div className="relative p-6 sm:p-9">
            <AnimatePresence mode="wait">
              <motion.div
                key={phase.title}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className="chip"
                    style={{ borderColor: `${phase.accent}55`, color: phase.accent }}
                  >
                    Phase {String(active + 1).padStart(2, '0')} / {phases.length}
                  </span>
                  <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-faint">
                    {phase.step}
                  </span>
                </div>

                <div className="mt-6 flex items-start gap-4">
                  <motion.span
                    initial={{ rotate: -25, scale: 0.6 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 240, damping: 16 }}
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border"
                    style={{
                      borderColor: `${phase.accent}44`,
                      background: `${phase.accent}18`,
                      color: phase.accent,
                    }}
                  >
                    <Icon className="h-6 w-6" />
                  </motion.span>
                  <div>
                    <h3 className="text-2xl font-bold text-ink sm:text-3xl">{phase.title}</h3>
                    <p className="mt-2 max-w-xl text-[0.9rem] leading-relaxed text-muted">
                      {phase.summary}
                    </p>
                  </div>
                </div>

                {/* activities + live diagram */}
                <div className="mt-8 grid gap-5 lg:grid-cols-5">
                  <ul className="space-y-2.5 lg:col-span-3">
                    {phase.activities.map((activity, i) => (
                      <motion.li
                        key={activity}
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 + i * 0.09 }}
                        className="group flex items-start gap-2.5 rounded-2xl border border-line/[0.07] bg-line/[0.02] px-4 py-3 text-[0.8rem] leading-relaxed text-muted transition-colors duration-300 hover:border-line/[0.16]"
                      >
                        <span
                          className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-125"
                          style={{ background: `${phase.accent}26`, color: phase.accent }}
                        >
                          <Check className="h-2.5 w-2.5" />
                        </span>
                        {activity}
                      </motion.li>
                    ))}
                  </ul>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="relative overflow-hidden rounded-2xl border border-line/[0.08] bg-canvas/40 lg:col-span-2"
                  >
                    <span className="absolute left-3 top-2.5 z-10 font-mono text-[0.5rem] uppercase tracking-[0.2em] text-faint">
                      Phase model
                    </span>
                    <div className="p-2 pt-6">
                      <SystemDiagram
                        key={phase.title}
                        nodes={phase.diagram.nodes}
                        links={phase.diagram.links}
                        accent={phase.accent}
                      />
                    </div>
                  </motion.div>
                </div>

                {/* flow + deliverable */}
                <div className="mt-8 grid gap-4 border-t border-line/[0.08] pt-6 sm:grid-cols-5 sm:items-center">
                  <div className="sm:col-span-3">
                    <p className="font-mono text-[0.58rem] uppercase tracking-[0.2em] text-faint">
                      Phase deliverable
                    </p>
                    <p className="mt-1.5 flex items-center gap-2 text-[0.9rem] font-semibold text-ink">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-400">
                        <Check className="h-3 w-3" />
                      </span>
                      {phase.deliverable}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.14em] sm:col-span-2 sm:justify-end">
                    <span className="rounded-lg border border-line/10 bg-line/[0.03] px-2.5 py-1.5 text-faint">
                      {phase.input}
                    </span>
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                      style={{ color: phase.accent }}
                    >
                      →
                    </motion.span>
                    <span
                      className="rounded-lg border px-2.5 py-1.5"
                      style={{
                        borderColor: `${phase.accent}55`,
                        background: `${phase.accent}14`,
                        color: phase.accent,
                      }}
                    >
                      {phase.output}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
