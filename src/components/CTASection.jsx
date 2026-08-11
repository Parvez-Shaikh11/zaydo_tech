import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';
import { Magnetic } from './ui/Motion';
import { DataLanes } from './ui/CircuitField';
import { site } from '../data/site';

export default function CTASection({
  title = 'Have a business problem worth solving?',
  body = 'Tell us what is manual, what is slow, or what needs to be custom engineered. If technology is not the right answer, we will say so — that conversation costs you nothing.',
  primary = { label: 'Start your project', to: '/contact' },
}) {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="surface relative isolate overflow-hidden rounded-[2rem] px-6 py-14 text-center sm:px-14 sm:py-20"
      >
        <DataLanes opacity={0.3} />

        {/* animated brand wash */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 animate-gradient-pan opacity-[0.16]"
          style={{
            background:
              'linear-gradient(115deg, #1B72F5 0%, #06B6D4 40%, transparent 70%)',
            backgroundSize: '220% 220%',
          }}
        />
        <div
          aria-hidden
          className="halo animate-float-slow"
          style={{
            width: '28rem',
            height: '28rem',
            top: '-10rem',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(6,182,212,0.22)',
          }}
        />

        <div className="relative">
          <span className="chip mx-auto !border-cyanic-400/40 !text-cyanic-400">
            Start a conversation
          </span>

          <h2 className="mx-auto mt-7 max-w-3xl text-3xl font-extrabold leading-[1.1] text-ink sm:text-[2.75rem]">
            {title}
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-[0.95rem] leading-relaxed text-muted">
            {body}
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
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

          <p className="mt-8 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-faint">
            No sales sequence · A real engineer reads every enquiry
          </p>
        </div>
      </motion.div>
    </section>
  );
}
