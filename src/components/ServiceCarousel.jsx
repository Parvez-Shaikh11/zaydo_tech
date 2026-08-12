import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import ServiceCard from './ServiceCard';
import Reveal from './ui/Reveal';
import Texture from './ui/Texture';
import { servicesData } from '../data/servicesData';

/**
 * The reference's services band: a dark textured panel sits behind the section
 * heading, and the card row overlaps out of its bottom edge.
 *
 * The rail steps one whole card at a time and always shows a WHOLE number of
 * cards — four on a wide screen. The previous version was a continuous marquee,
 * which meant a card was permanently sliced by each edge of the viewport and
 * the row never lined up with the container gutters.
 *
 * The loop is seamless because the list is rendered twice: advancing past the
 * last real card lands on its duplicate, and the index is then snapped back to
 * zero on a frame with transitions disabled, so nothing is visible.
 */

const STEP_MS = 3400;
const GLIDE_MS = 700;

/* Widest first — the first match wins. */
const BREAKPOINTS = [
  { min: 1180, perView: 4 },
  { min: 900, perView: 3 },
  { min: 620, perView: 2 },
  { min: 0, perView: 1 },
];

function perViewFor(width) {
  return BREAKPOINTS.find((b) => width >= b.min).perView;
}

export default function ServiceCarousel({ services = servicesData }) {
  const count = services.length;

  const [perView, setPerView] = useState(() =>
    perViewFor(typeof window === 'undefined' ? 1280 : window.innerWidth),
  );
  const [index, setIndex] = useState(0);
  const [gliding, setGliding] = useState(true);
  const [paused, setPaused] = useState(false);
  const snapTimer = useRef(null);

  useEffect(() => {
    const onResize = () => setPerView(perViewFor(window.innerWidth));
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  /* Rendered twice. `index` is allowed to reach `count`, which needs
     count + perView slides to stay filled — 2x covers every perView we use. */
  const loop = [...services, ...services];

  const next = useCallback(() => setIndex((i) => i + 1), []);

  const prev = useCallback(() => {
    if (index > 0) {
      setIndex(index - 1);
      return;
    }
    /* Nothing to move back to at zero, so teleport onto the duplicate set with
       transitions off — visually identical — and let the effect below play the
       real step one frame later. */
    setGliding(false);
    setIndex(count);
  }, [index, count]);

  /* Re-enable the transition (and step back) one frame after a teleport.
     Two rAFs: the first lands in the frame that commits `gliding: false`, the
     second is the earliest frame where the un-transitioned position is live. */
  useEffect(() => {
    if (gliding) return undefined;
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => {
        setGliding(true);
        setIndex((i) => (i === count ? count - 1 : i));
      });
    });
    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
  }, [gliding, count]);

  /* Once the step onto the duplicate has finished playing, snap the index home
     with transitions off. Visually identical, so the jump is invisible.
     Guarded on `gliding` so it never fires for the teleport `prev` performs. */
  useEffect(() => {
    if (index !== count || !gliding) return undefined;
    snapTimer.current = setTimeout(() => {
      setGliding(false);
      setIndex(0);
    }, GLIDE_MS + 40);
    return () => clearTimeout(snapTimer.current);
  }, [index, count, gliding]);

  useEffect(() => {
    if (paused || !gliding) return undefined;
    const t = setTimeout(next, STEP_MS);
    return () => clearTimeout(t);
  }, [index, paused, gliding, next]);

  const slideWidth = 100 / perView;

  return (
    <section className="relative isolate mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* A contained, rounded panel rather than a full-bleed band — it reads as
          a deliberate object on the page instead of a stripe across it, and it
          gives the card row something to overlap into. */}
      <div className="band-dark relative isolate overflow-hidden rounded-[2rem] px-8 pb-[15rem] pt-14 sm:px-10 sm:pt-16">
        {/* flowing contour fan — this band's own signature */}
        <Texture pattern="contour" opacity={0.5} fade="right" className="text-brand-400" />

        {/* sweeping arcs, drawn to the panel box so they always reach corner to
            corner whatever the panel's height turns out to be */}
        <svg
          aria-hidden
          viewBox="0 0 1200 460"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 h-full w-full"
          fill="none"
        >
          <defs>
            <linearGradient id="svc-arc" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#0059FD" stopOpacity="0" />
              <stop offset="45%" stopColor="#0086FD" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#00C9FD" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M-60 500 C 200 380 260 110 640 60 S 1080 -30 1280 50" stroke="url(#svc-arc)" strokeWidth="2" />
          <path d="M-60 560 C 230 430 300 170 690 120 S 1110 30 1280 120" stroke="url(#svc-arc)" strokeWidth="1.5" />
          <path d="M-60 440 C 170 330 220 70 590 20 S 1050 -70 1280 -10" stroke="url(#svc-arc)" strokeWidth="1" />
        </svg>

        {/* soft brand glow, echoing the reference's arcs */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-[26rem] w-[26rem] rounded-full opacity-40 blur-3xl"
          style={{ background: 'radial-gradient(circle, #0059FD 0%, transparent 68%)' }}
        />

        {/* oversized ghost word behind the heading */}
        <span
          aria-hidden
          className="pointer-events-none absolute -top-3 left-6 select-none font-display text-[5rem] font-black leading-none tracking-tight text-white/[0.045] sm:left-8 sm:text-[7.5rem]"
        >
          Services
        </span>

        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <Reveal>
            <p className="eyebrow flex items-center gap-2.5 text-accent">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-brand-500/20 ring-1 ring-brand-400/40">
                <span className="h-1.5 w-1.5 rounded-[2px] bg-brand-400" />
              </span>
              Capabilities
            </p>
            <h2 className="mt-4 font-display text-[1.75rem] font-extrabold leading-tight text-white sm:text-[2.15rem] lg:text-[2.6rem]">
              We build exclusive systems
              <br />
              for <span className="text-brand-gradient">your business</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              {[
                { label: 'Previous services', onClick: prev, Icon: ArrowLeft },
                { label: 'Next services', onClick: next, Icon: ArrowRight },
              ].map(({ label, onClick, Icon }) => (
                <button
                  key={label}
                  type="button"
                  onClick={onClick}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors duration-300 hover:border-white/60 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </button>
              ))}
            </div>
            <Link to="/services" className="btn btn-primary">
              View all services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </div>

      {/* The rail is pulled up until roughly half of each card sits on the dark
          panel — the shallow overlap the previous version had made the cards
          look like they had merely been dropped underneath it. */}
      <div
        className="relative -mt-[13.75rem]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        {/* px lines the outer cards up with the panel's own padding, once the
            slides' 12px gutter is taken off it. */}
        <div className="px-[1.125rem] sm:px-[1.75rem]">
          {/* The clip has to be THIS element, not a full-width parent —
              otherwise the off-screen slides simply spill into the page gutters
              and the rail reads as a row of sliced cards.
              pt leaves room for the icon plate hanging above the first card; pb
              clears the hovered card's lift plus its drop shadow. */}
          <div className="overflow-hidden pb-14 pt-[4.5rem]">
            <div
              className="flex w-full"
              style={{
                transform: `translateX(-${index * slideWidth}%)`,
                transition: gliding
                  ? `transform ${GLIDE_MS}ms cubic-bezier(0.22,1,0.36,1)`
                  : 'none',
              }}
            >
              {loop.map((service, i) => (
                <div
                  /* Duplicated track — the index keeps the second copy's keys
                     unique. The duplicates are deliberately NOT aria-hidden or
                     inert: past the halfway point they are the cards actually
                     on screen, so they have to stay readable and clickable. */
                  key={`${service.id}-${i}`}
                  className="shrink-0 px-3"
                  style={{ width: `${slideWidth}%` }}
                >
                  <ServiceCard
                    service={service}
                    variant="grid"
                    /* single-page: land on the descriptive block, not a sub-page */
                    to={`/services#${service.id}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
