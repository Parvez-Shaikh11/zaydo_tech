import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import SectionHeader from './ui/SectionHeader';
import { Avatar, StarRating } from './ui/Avatar';
import Texture from './ui/Texture';
import { testimonials as defaultItems } from '../data/testimonials';

/**
 * Testimonials on a dark band: three cards per view, each with the avatar
 * overlapping the card's top-left corner and a quote badge tucked under it.
 *
 * Renders NOTHING when there are no items. `src/data/testimonials.js` ships
 * empty on purpose, so this section cannot go live with invented social proof;
 * it appears the moment real quotes are added.
 */
export default function Testimonials({
  items = defaultItems,
  perView = 3,
  eyebrow = 'Client feedback',
  title = 'What clients say about us',
  highlight = [3],
  description = 'Unedited words from the people whose systems we built.',
}) {
  const [page, setPage] = useState(0);

  if (!items.length) return null;

  const pages = Math.max(1, Math.ceil(items.length / perView));
  const safePage = Math.min(page, pages - 1);
  const visible = items.slice(safePage * perView, safePage * perView + perView);

  const go = (delta) => setPage((p) => (p + delta + pages) % pages);

  return (
    <section className="band-dark relative isolate overflow-hidden py-16 sm:py-20">
      {/* topographic rings — this band's own signature */}
      <Texture pattern="topo" opacity={0.4} fade="vignette" className="text-brand-300" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(48rem 22rem at 50% 0%, rgb(27 114 245 / 0.22), transparent 70%)',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          highlight={highlight}
          description={description}
          className="mb-14"
        />

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={safePage}
              initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -14, filter: 'blur(6px)' }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-6 pt-8 sm:grid-cols-2 lg:grid-cols-3"
            >
              {visible.map((t) => (
                <article
                  key={t.id}
                  className="tile relative px-6 pb-7 pt-12 transition-transform duration-[400ms] ease-in-out hover:-translate-y-1.5"
                >
                  {/* avatar overlaps the top-left corner */}
                  <span className="absolute -top-8 left-6">
                    <Avatar src={t.avatar} name={t.author} size={72} />
                    <span
                      aria-hidden
                      className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-brand-gradient text-white shadow-md"
                    >
                      <Quote className="h-3.5 w-3.5" fill="currentColor" />
                    </span>
                  </span>

                  <span className="absolute right-6 top-6">
                    <StarRating value={t.rating ?? 5} />
                  </span>

                  <p className="text-[0.88rem] leading-relaxed text-muted">“{t.quote}”</p>

                  <footer className="mt-6 border-t border-line/[0.08] pt-4">
                    <p className="font-display text-base font-bold text-ink">{t.author}</p>
                    <p className="mt-0.5 text-[0.76rem] text-muted">
                      {t.role}
                      {t.company ? ` · ${t.company}` : ''}
                    </p>
                  </footer>
                </article>
              ))}
            </motion.div>
          </AnimatePresence>

          {pages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous testimonials"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="font-mono text-[0.6rem] tracking-[0.2em] text-slate-400">
                {String(safePage + 1).padStart(2, '0')} / {String(pages).padStart(2, '0')}
              </span>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next testimonials"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
