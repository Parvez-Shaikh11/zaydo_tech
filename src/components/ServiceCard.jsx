import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { staggerItem } from './ui/Reveal';

/**
 * The signature card: on hover a brand gradient wipes up from the bottom edge,
 * the icon plate inverts, every label flips to white and a decorative shape
 * slides in behind the content.
 *
 * Structure note — the `motion.div` carrying `variants` stays a bare wrapper
 * and all styling lives on the inner element. framer writes an inline
 * `transform` while it animates, which would silently win over any CSS hover
 * transform applied to the same node.
 *
 * Variants:
 *   grid    — 80px icon straddling the card's top edge (reference: .service-grid)
 *   card    — left-aligned, oversized number watermark  (reference: .service-card)
 *   feature — image band on top, icon overlapping it    (reference: .service-box)
 */

/* Inline SVG rather than an asset — no request, and it inherits currentColor. */
function ShapeWash({ variant }) {
  return (
    <span aria-hidden="true" className="fill-shape text-white">
      <span className="block">
      {variant === 'card' ? (
        <svg viewBox="0 0 200 120" fill="none" stroke="currentColor" strokeWidth="1" className="h-28 w-full">
          {[30, 60, 90].map((y) => (
            <path key={y} d={`M0 ${y}h200`} />
          ))}
          {[40, 80, 120, 160].map((x) => (
            <path key={x} d={`M${x} 0v120`} />
          ))}
        </svg>
      ) : (
        <svg viewBox="0 0 200 120" fill="currentColor" className="h-28 w-full">
          {[...Array(4)].map((_, r) =>
            [...Array(9)].map((_, c) => (
              <circle key={`${r}-${c}`} cx={12 + c * 23} cy={22 + r * 26} r="3" />
            )),
          )}
        </svg>
      )}
      </span>
    </span>
  );
}

export default function ServiceCard({ service, variant = 'grid', className = '', to }) {
  const { id, icon: Icon, title, short, tagline, number, image, grade, accent } = service;

  const fillVars = {
    '--fill-from': service.fillFrom ?? '#0047CC',
    '--fill-to': service.fillTo ?? '#003A9E',
  };

  const href = to ?? `/services/${id}`;

  /* ------------------------------------------------------------- tile ---- */
  /* Icon plate top-left with an offset dot, number watermark top-right, and
     the fill spreading from the bottom-right corner. */
  if (variant === 'tile') {
    /* Only custom properties go inline — see the `.fc-*` rules in index.css. */
    const tileVars = { ...fillVars, '--svc-accent': accent, '--svc-tint': `${accent}1f` };

    return (
      <motion.div variants={staggerItem} className={className}>
        <Link
          to={href}
          style={tileVars}
          className="tile fill-corner group relative flex h-full flex-col p-6 outline-none transition-transform duration-[400ms] ease-in-out hover:-translate-y-1.5"
        >
          <span
            aria-hidden="true"
            className="fc-num absolute right-5 top-3 font-display text-[3.5rem] font-black leading-none"
          >
            {number}
          </span>

          {/* plate + the offset dot that bites a notch out of it */}
          <span className="relative inline-flex w-fit">
            <span className="fc-plate flex h-14 w-14 items-center justify-center rounded-full">
              <Icon className="h-6 w-6" strokeWidth={1.6} />
            </span>
            <span
              aria-hidden
              className="fc-dot absolute -right-0.5 -top-0.5 h-3.5 w-3.5 rounded-full"
            />
          </span>

          <h3 className="fc-title mt-5 font-display text-base font-bold">{short}</h3>
          <p className="fc-body mt-2.5 text-[0.82rem] leading-relaxed">{tagline}</p>

          <span className="fc-btn mt-5 inline-flex w-fit items-center gap-2 rounded-md px-4 py-2.5 text-[0.6rem] font-bold uppercase tracking-[0.14em]">
            Read more
            <ArrowUpRight className="h-3 w-3 transition-transform duration-[400ms] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </Link>
      </motion.div>
    );
  }

  /* Idle: a flat brand-gradient disc with a pale ring. Hovered: it inverts to
     a white disc with the brand colour inside.
     No permanent glow or blur behind it — that read as a stuck hover state.

     The gradient runs fillFrom -> fillTo, NOT accent -> fillTo. `accent` goes as
     light as #00C9FD, which puts the white glyph at ~1.9:1 on the AI card. The
     fill pair is the AA-safe one, and using it here also makes all five plates
     identical — which is what the reference does. */
  const iconPlate = (
    <span
      className="relative flex h-20 w-20 items-center justify-center rounded-full text-white ring-4 ring-panel transition-colors duration-300 ease-out group-hover:text-[var(--fill-from)]"
      style={{
        backgroundImage: `linear-gradient(140deg, ${fillVars['--fill-from']} 0%, ${fillVars['--fill-to']} 100%)`,
      }}
    >
      <span
        aria-hidden
        className="absolute inset-0 rounded-full bg-white opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"
      />
      <Icon className="relative h-8 w-8" strokeWidth={1.65} />
    </span>
  );

  return (
    /* h-full on the wrapper too, not just on the Link. Without it the wrapper
       shrinks to its content, the Link's `h-full` resolves against that, and a
       card with a three-line tagline ends up taller than the rest of the row —
       which is exactly what the carousel was showing. */
    <motion.div variants={staggerItem} className={`h-full ${className}`}>
      <Link
        to={href}
        style={fillVars}
        className={`tile fill-card group relative flex h-full flex-col outline-none transition-[transform,box-shadow] duration-[400ms] ease-out hover:-translate-y-2.5 hover:shadow-[0_26px_44px_-18px_var(--fill-from)] ${
          variant === 'grid' ? 'min-h-[19.5rem]' : ''
        }`}
      >
        {/* idle surface grain, so the card is not blank white before hover */}
        <span
          aria-hidden
          className="texture-hatch pointer-events-none absolute inset-0 -z-10 rounded-[inherit] opacity-70 transition-opacity duration-[400ms] group-hover:opacity-0"
        />
        <ShapeWash variant={variant} />

        {variant === 'feature' && (
          <div className="overflow-hidden rounded-t-[var(--radius-tile)]">
            <img
              src={image}
              alt=""
              width="640"
              height="360"
              loading="lazy"
              decoding="async"
              className={`h-44 w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105 ${grade ?? ''}`}
            />
          </div>
        )}

        {/* grid: the plate straddles the top edge, so the card carries pt-14 */}
        {variant === 'grid' && (
          <span className="absolute -top-10 left-1/2 -translate-x-1/2">{iconPlate}</span>
        )}

        <div
          className={
            variant === 'feature'
              ? 'relative flex flex-1 flex-col px-6 pb-8'
              : variant === 'card'
                ? 'relative flex flex-1 flex-col p-9'
                : 'relative flex flex-1 flex-col items-center px-7 pb-12 pt-[4.5rem] text-center'
          }
        >
          {variant === 'feature' && <span className="-mt-10 mb-5 block">{iconPlate}</span>}

          {variant === 'card' && (
            <>
              <span className="mb-6 block">{iconPlate}</span>
              <span
                aria-hidden="true"
                className="watermark absolute right-6 top-2 font-display text-[6.25rem] font-black leading-none"
              >
                {number}
              </span>
            </>
          )}

          <h3 className="font-display text-[1.22rem] font-bold text-ink transition-colors duration-300 ease-out group-hover:text-white">
            {variant === 'grid' ? short : title}
          </h3>
          <p className="mt-3.5 text-[0.9rem] leading-relaxed text-muted transition-colors duration-300 ease-out group-hover:text-white/85">
            {tagline}
          </p>

          {/* Filled brand on idle, inverted to white-on-fill once the card
              floods. Uses --fill-from rather than `accent` for the same
              contrast reason as the icon plate. */}
          <span
            className={`mt-auto inline-flex items-center gap-2 rounded-lg bg-[var(--fill-from)] px-5 py-3.5 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-white transition-colors duration-300 ease-out group-hover:bg-white group-hover:text-[var(--fill-from)] ${
              variant === 'grid' ? 'mx-auto' : ''
            }`}
          >
            Read more
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
