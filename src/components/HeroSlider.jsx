import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { Magnetic } from './ui/Motion';

const SLIDE_MS = 7000;

const slides = [
  {
    key: 'systems',
    eyebrow: 'Software • Automation • Digital Systems',
    label: 'Positioning',
    title: ['We turn business complexity into', 'engineered digital systems.'],
    body: 'Zaydo Tech designs and builds custom software, scalable web applications and intelligent automation that help businesses operate smarter, remove operational bottlenecks and scale without adding headcount.',
    image: '/photos/hero_3d.png',
    grade: 'brand-grade',
    accent: '#1B72F5',
    secondary: { label: 'Explore our work', to: '/work' },
    hud: [{ k: 'Discipline', v: 'Systems engineering' }, { k: 'Approach', v: 'Business first' }],
    chips: ['Architecture', 'Engineering', 'Delivery'],
  },
  {
    key: 'software',
    eyebrow: 'Capability 01 — Custom Software',
    label: 'Custom Software',
    title: ['Software built around', 'how you actually work.'],
    body: 'We study your real operational workflow, then engineer a system around it — one schema, one source of truth, and an interface your team does not need a manual to use.',
    image: '/photos/software_3d.png',
    grade: 'brand-grade',
    accent: '#0891B2',
    secondary: { label: 'Custom software', to: '/services/custom-software' },
    hud: [{ k: 'Data model', v: 'Relational, audited' }, { k: 'Ownership', v: 'Source code yours' }],
    chips: ['PostgreSQL', 'Node.js', 'React'],
  },
  {
    key: 'automation',
    eyebrow: 'Capability 03 — Workflow Automation',
    label: 'Automation',
    title: ['Stop paying people to', 'move data between tools.'],
    body: 'We map where information is re-keyed by hand, then build the pipeline that carries it — validated, logged, retried on failure, and escalated to a human only when a decision is genuinely required.',
    image: '/photos/automation_3d.png',
    grade: 'brand-grade-warm',
    accent: '#3B9CFF',
    secondary: { label: 'See automation', to: '/services/automation' },
    hud: [{ k: 'Failure mode', v: 'Retry + escalate' }, { k: 'Cutover', v: 'Parallel-run first' }],
    chips: ['Webhooks', 'Queues', 'Schedulers'],
  },
  {
    key: 'ai',
    eyebrow: 'Capability 04 — Practical AI',
    label: 'AI Systems',
    title: ['AI where it measurably helps.', 'Nowhere else.'],
    body: 'We treat AI as one component in a system, not as the product. Retrieval is grounded in your documents, every answer cites its source, and if a database query solves it better — we will tell you that instead.',
    image: '/photos/ai_3d.png',
    grade: 'brand-grade-green',
    accent: '#22D3EE',
    secondary: { label: 'AI integration', to: '/services/ai-systems' },
    hud: [{ k: 'Grounding', v: 'Cited sources' }, { k: 'Fallback', v: 'Human review' }],
    chips: ['Retrieval', 'Evaluation', 'Guardrails'],
  },
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef(null);
  const slide = slides[index];

  const go = useCallback((next) => {
    setIndex((next + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (paused) return undefined;
    timer.current = setTimeout(() => go(index + 1), SLIDE_MS);
    return () => clearTimeout(timer.current);
  }, [index, paused, go]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') go(index + 1);
      if (e.key === 'ArrowLeft') go(index - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index, go]);

  /* pointer parallax for the visual panel */
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 120, damping: 22 });
  const sy = useSpring(py, { stiffness: 120, damping: 22 });
  const tiltX = useTransform(sy, [-0.5, 0.5], [7, -7]);
  const tiltY = useTransform(sx, [-0.5, 0.5], [-9, 9]);
  const glideX = useTransform(sx, [-0.5, 0.5], [-16, 16]);
  const glideY = useTransform(sy, [-0.5, 0.5], [-12, 12]);

  const onPointerMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const resetPointer = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <section
      className="relative isolate overflow-hidden pt-32 pb-16 sm:pt-36 lg:pb-24 lg:pt-44"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => {
        setPaused(false);
        resetPointer();
      }}
    >
      {/* slide-tinted ambience */}
      <AnimatePresence>
        <motion.div
          key={`glow-${slide.key}`}
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div
            className="halo animate-float-slow"
            style={{
              width: '40rem',
              height: '40rem',
              top: '-12rem',
              right: '-8rem',
              background: `${slide.accent}33`,
            }}
          />
          <div
            className="halo animate-float-slow"
            style={{
              width: '28rem',
              height: '28rem',
              bottom: '-8rem',
              left: '-6rem',
              background: `${slide.accent}22`,
              animationDelay: '-4s',
            }}
          />
        </motion.div>
      </AnimatePresence>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-8">
        {/* ------------------------------------------------ copy column */}
        <div className="lg:col-span-6 xl:col-span-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.key}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.25 } }}
              transition={{ duration: 0.4 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="chip"
                style={{ borderColor: `${slide.accent}55`, color: slide.accent }}
              >
                <span
                  className="relative flex h-1.5 w-1.5"
                  style={{ color: slide.accent }}
                >
                  <span
                    className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full"
                    style={{ background: slide.accent }}
                  />
                  <span
                    className="relative inline-flex h-1.5 w-1.5 rounded-full"
                    style={{ background: slide.accent }}
                  />
                </span>
                {slide.eyebrow}
              </motion.div>

              <h1 className="mt-6 text-[2.1rem] font-extrabold leading-[1.04] tracking-tight text-ink sm:text-5xl xl:text-[3.65rem]">
                {slide.title.map((line, li) => (
                  <span key={li} className="block overflow-hidden">
                    <motion.span
                      className={`block ${li === 1 ? 'text-brand-gradient' : ''}`}
                      initial={{ y: '105%' }}
                      animate={{ y: 0 }}
                      transition={{
                        duration: 0.75,
                        delay: 0.12 + li * 0.11,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      {line}
                    </motion.span>
                  </span>
                ))}
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.34 }}
                className="mt-6 max-w-xl text-[0.95rem] leading-relaxed text-muted"
              >
                {slide.body}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.44 }}
                className="mt-9 flex flex-wrap items-center gap-3"
              >
                <Magnetic>
                  <Link to="/contact" className="btn btn-primary">
                    Start your project
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Magnetic>
                <Link to={slide.secondary.to} className="btn btn-ghost group">
                  {slide.secondary.label}
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.55 }}
                className="mt-8 flex flex-wrap gap-2"
              >
                {slide.chips.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-line/10 bg-line/[0.03] px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-faint"
                  >
                    {chip}
                  </span>
                ))}
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* --------------------------------------------- slide controls */}
          <div className="mt-12 flex items-center gap-4 border-t border-line/10 pt-6">
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => go(index - 1)}
                aria-label="Previous slide"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-line/10 text-muted transition-colors hover:border-brand-500/50 hover:text-ink"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setPaused((p) => !p)}
                aria-label={paused ? 'Resume slideshow' : 'Pause slideshow'}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-line/10 text-muted transition-colors hover:border-brand-500/50 hover:text-ink"
              >
                {paused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
              </button>
              <button
                type="button"
                onClick={() => go(index + 1)}
                aria-label="Next slide"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-line/10 text-muted transition-colors hover:border-brand-500/50 hover:text-ink"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="flex flex-1 items-center gap-2">
              {slides.map((s, i) => (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Go to ${s.label}`}
                  aria-current={i === index}
                  className="group relative h-8 flex-1"
                >
                  <span className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 overflow-hidden rounded-full bg-line/10">
                    {i === index && (
                      <motion.span
                        key={`${index}-${paused}`}
                        className="block h-full rounded-full"
                        style={{ background: slide.accent }}
                        initial={{ width: '0%' }}
                        animate={{ width: paused ? '40%' : '100%' }}
                        transition={{
                          duration: paused ? 0.4 : SLIDE_MS / 1000,
                          ease: 'linear',
                        }}
                      />
                    )}
                    {i < index && (
                      <span className="block h-full w-full rounded-full bg-line/25" />
                    )}
                  </span>
                  <span className="pointer-events-none absolute -bottom-1 left-0 hidden font-mono text-[0.55rem] uppercase tracking-[0.16em] text-faint opacity-0 transition-opacity group-hover:opacity-100 xl:block">
                    {s.label}
                  </span>
                </button>
              ))}
            </div>

            <span className="font-mono text-[0.62rem] tracking-[0.16em] text-faint">
              {String(index + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* ---------------------------------------------- visual column */}
        <div className="lg:col-span-6 xl:col-span-6">
          <motion.div
            onMouseMove={onPointerMove}
            style={{ rotateX: tiltX, rotateY: tiltY, transformPerspective: 1400 }}
            className="relative mx-auto w-full max-w-[34rem]"
          >
            {/* rotating dashed orbit */}
            <div
              aria-hidden
              className="absolute -inset-8 animate-spin-slow rounded-full border border-dashed opacity-30"
              style={{ borderColor: `${slide.accent}66` }}
            />

            <div className="relative aspect-[4/3.4] overflow-hidden rounded-[1.75rem] border border-line/10 bg-panel/60 p-2 shadow-[0_40px_100px_-40px_rgba(0,0,0,0.9)] sm:aspect-[4/3.2]">
              <div className="relative isolate h-full w-full overflow-hidden rounded-[1.35rem]">
                <AnimatePresence mode="popLayout">
                  <motion.img
                    key={slide.key}
                    src={slide.image}
                    alt={slide.label}
                    loading="eager"
                    initial={{ opacity: 0, scale: 1.12, filter: 'blur(14px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, scale: 1.04, filter: 'blur(10px)' }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    className={`absolute inset-0 h-full w-full object-cover ${slide.grade}`}
                  />
                </AnimatePresence>

                {/* readability + brand wash */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-canvas via-canvas/25 to-transparent" />
                <div
                  className="pointer-events-none absolute inset-0 mix-blend-color opacity-45"
                  style={{ background: slide.accent }}
                />

                {/* scanning line */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-24 animate-scan-line opacity-40"
                  style={{
                    background: `linear-gradient(to bottom, transparent, ${slide.accent}55, transparent)`,
                  }}
                />

                {/* corner brackets */}
                {[
                  'left-4 top-4 border-l-2 border-t-2',
                  'right-4 top-4 border-r-2 border-t-2',
                  'left-4 bottom-4 border-b-2 border-l-2',
                  'right-4 bottom-4 border-b-2 border-r-2',
                ].map((cls) => (
                  <span
                    key={cls}
                    aria-hidden
                    className={`pointer-events-none absolute h-5 w-5 rounded-[3px] ${cls}`}
                    style={{ borderColor: slide.accent }}
                  />
                ))}

                {/* HUD readout */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`hud-${slide.key}`}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="absolute inset-x-4 bottom-4 grid grid-cols-2 gap-2"
                  >
                    {slide.hud.map((item) => (
                      <div
                        key={item.k}
                        className="rounded-xl border border-white/10 bg-black/45 px-3 py-2 backdrop-blur-md"
                      >
                        <p className="font-mono text-[0.55rem] uppercase tracking-[0.18em] text-white/50">
                          {item.k}
                        </p>
                        <p className="mt-0.5 text-[0.72rem] font-semibold text-white">
                          {item.v}
                        </p>
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* floating status cards */}
            <motion.div
              style={{ x: glideX, y: glideY }}
              className="absolute -left-3 top-10 hidden sm:block"
            >
              <div className="animate-float rounded-2xl border border-line/10 bg-panel/85 px-4 py-3 shadow-lift backdrop-blur-xl">
                <p className="font-mono text-[0.55rem] uppercase tracking-[0.18em] text-faint">
                  System status
                </p>
                <p className="mt-1 flex items-center gap-2 text-[0.78rem] font-bold text-ink">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Operational
                </p>
              </div>
            </motion.div>

            <motion.div
              style={{ x: glideX, y: glideY }}
              className="absolute -right-2 bottom-16 hidden sm:block"
            >
              <div
                className="animate-float rounded-2xl border border-line/10 bg-panel/85 px-4 py-3 shadow-lift backdrop-blur-xl"
                style={{ animationDelay: '-2.5s' }}
              >
                <p className="font-mono text-[0.55rem] uppercase tracking-[0.18em] text-faint">
                  Capabilities
                </p>
                <p className="mt-1 text-[0.78rem] font-bold text-ink">05 engineering tracks</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
