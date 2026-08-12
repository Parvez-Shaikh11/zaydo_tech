import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';
import { Magnetic } from './ui/Motion';
import Texture from './ui/Texture';
import PhotoStage from './ui/PhotoStage';
import { site } from '../data/site';
import { photos } from '../data/images';

/**
 * Closing CTA — copy on the left, an organic-framed visual on the right.
 *
 * The previous centred layout put a wide slab of empty panel around a short
 * headline; a split gives the copy a readable measure and lets the visual do
 * the work of filling the band.
 */
export default function CTASection({
  title = 'Have a business problem worth solving?',
  body = 'Tell us what is manual, what is slow, or what needs to be custom engineered. If technology is not the right answer, we will say so — that conversation costs you nothing.',
  primary = { label: 'Start your project', to: '/contact' },
  photo = photos.client,
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="tile relative isolate overflow-hidden rounded-[2rem] px-6 py-12 sm:px-12 sm:py-14"
      >
        <Texture pattern="hex" opacity={0.3} fade="left" className="text-brand-500" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 animate-gradient-pan opacity-[0.14]"
          style={{
            background: 'linear-gradient(115deg, #0059FD 0%, #00A7FD 40%, transparent 70%)',
            backgroundSize: '220% 220%',
          }}
        />

        <div className="relative grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* ------------------------------------------------ copy (left) */}
          <div className="lg:col-span-7">
            <span className="chip !border-accent/40 !text-accent">Start a conversation</span>

            <h2 className="mt-6 font-display text-3xl font-extrabold leading-[1.1] text-ink sm:text-[2.5rem]">
              {title}
            </h2>

            <p className="mt-5 max-w-xl text-[0.95rem] leading-relaxed text-muted">{body}</p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Magnetic>
                <Link to={primary.to} className="btn btn-primary !px-8 !py-4">
                  {primary.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Magnetic>
              <a href={`mailto:${site.email}`} className="btn btn-ghost !px-8 !py-4">
                <Mail className="h-4 w-4" />
                {site.email}
              </a>
            </div>

            <p className="mt-7 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-faint">
              No sales sequence · A real engineer reads every enquiry
            </p>
          </div>

          {/* --------------------------------------------- visual (right) */}
          <PhotoStage photo={photo} accent="#0059FD" layout="split" className="lg:col-span-5" />
        </div>
      </motion.div>
    </section>
  );
}
