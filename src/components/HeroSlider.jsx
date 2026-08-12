import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { Magnetic } from './ui/Motion';
import Texture from './ui/Texture';
import PhotoStage from './ui/PhotoStage';
import { photos } from '../data/images';

const SLIDE_MS = 7000;

/**
 * The visual column no longer swaps a picture per slide — one cut-out
 * photograph stays put and the animated shapes behind it take the slide's
 * `accent`. Swapping a ~1MB render four times was the single heaviest thing on
 * the page, and the recolouring reads as one continuous scene rather than four
 * unrelated stock images.
 */
const slides = [
  {
    key: 'systems',
    eyebrow: 'Software • Automation • Digital Systems',
    label: 'Positioning',
    title: ['We turn business complexity into', 'engineered digital systems.'],
    body: 'Zaydo Tech designs and builds custom software, scalable web applications and intelligent automation that help businesses operate smarter, remove operational bottlenecks and scale without adding headcount.',
    accent: '#0059FD',
    secondary: { label: 'Explore our work', to: '/work' },
    chips: ['Architecture', 'Engineering', 'Delivery'],
  },
  {
    key: 'software',
    eyebrow: 'Capability 01 — Custom Software',
    label: 'Custom Software',
    title: ['Software built around', 'how you actually work.'],
    body: 'We study your real operational workflow, then engineer a system around it — one schema, one source of truth, and an interface your team does not need a manual to use.',
    accent: '#0077FD',
    secondary: { label: 'Custom software', to: '/services/custom-software' },
    chips: ['PostgreSQL', 'Node.js', 'React'],
  },
  {
    key: 'automation',
    eyebrow: 'Capability 03 — Workflow Automation',
    label: 'Automation',
    title: ['Stop paying people to', 'move data between tools.'],
    body: 'We map where information is re-keyed by hand, then build the pipeline that carries it — validated, logged, retried on failure, and escalated to a human only when a decision is genuinely required.',
    accent: '#0086FD',
    secondary: { label: 'See automation', to: '/services/automation' },
    chips: ['Webhooks', 'Queues', 'Schedulers'],
  },
  {
    key: 'ai',
    eyebrow: 'Capability 04 — Practical AI',
    label: 'AI Systems',
    title: ['AI where it measurably helps.', 'Nowhere else.'],
    body: 'We treat AI as one component in a system, not as the product. Retrieval is grounded in your documents, every answer cites its source, and if a database query solves it better — we will tell you that instead.',
    accent: '#00C9FD',
    secondary: { label: 'AI integration', to: '/services/ai-systems' },
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
      /* pt clears the fixed navbar (h-16 + 20px inset ≈ 5.75rem) and no more —
         anything above that reads as a gap between header and hero. */
      className="relative isolate overflow-hidden pb-8 pt-[5.25rem] sm:pt-24 lg:pb-10 lg:pt-24"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => {
        setPaused(false);
        resetPointer();
      }}
    >
      {/* hero texture: radiating mesh from the lower-left */}
      <Texture pattern="mesh" opacity={0.22} fade="right" className="text-brand-500" />

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
            className="halo hero-halo animate-float-slow"
            style={{
              width: '40rem',
              height: '40rem',
              top: '-12rem',
              right: '-8rem',
              background: slide.accent,
            }}
          />
          <div
            className="halo hero-halo animate-float-slow"
            style={{
              width: '28rem',
              height: '28rem',
              bottom: '-8rem',
              left: '-6rem',
              background: slide.accent,
              animationDelay: '-4s',
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* On xl the split goes 5/7 in the picture's favour — the headline is set
          in two authored lines and still fits at 5 columns, while the photo was
          reading small at an even split. */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
        {/* ------------------------------------------------ copy column */}
        <div className="lg:col-span-6 xl:col-span-5">
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

              <h1 className="mt-6 text-[2.1rem] font-extrabold leading-[1.04] tracking-tight text-ink sm:text-5xl xl:text-[3.25rem]">
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
        {/* The negative right margin lets the picture run into the page gutter.
            It stays well inside the viewport, so the section's overflow clip
            never touches it — the silhouette is never cut. */}
        <div className="lg:col-span-6 lg:-mr-4 xl:col-span-7 xl:-mr-10">
          <motion.div
            onMouseMove={onPointerMove}
            style={{ rotateX: tiltX, rotateY: tiltY, transformPerspective: 1400 }}
            className="relative mx-auto w-full max-w-[38rem] lg:max-w-none"
          >
            {/* The photograph is a cut-out with real alpha, so it gets no frame
                and no scrim — a clipped frame would slice through the organic
                silhouette it already carries, and it needs no decoration of its
                own either. The only motion behind it is a pair of blurred
                accent glows that recolour with the active slide. */}
            <PhotoStage
              photo={photos.heroDesk}
              accent={slide.accent}
              layout="wide"
              float="slow"
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
