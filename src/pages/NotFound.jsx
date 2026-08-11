import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { navLinks } from '../data/site';

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-4 py-32">
      <div
        aria-hidden
        className="halo animate-float-slow"
        style={{
          width: '34rem',
          height: '34rem',
          top: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'var(--halo-1)',
        }}
      />

      <div className="relative mx-auto max-w-xl text-center">
        <motion.p
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-brand-gradient font-display text-[7rem] font-black leading-none sm:text-[9rem]"
        >
          404
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-2 text-2xl font-extrabold text-ink sm:text-3xl"
        >
          This route does not resolve
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mx-auto mt-4 max-w-md text-[0.9rem] leading-relaxed text-muted"
        >
          The address you requested is not mapped to anything on this site. It may have
          moved, or the link may be incomplete.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <Link to="/" className="btn btn-primary">
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
          <Link to="/contact" className="btn btn-ghost">
            Contact us
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-2 border-t border-line/[0.08] pt-8"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="rounded-full border border-line/[0.09] bg-line/[0.02] px-4 py-2 text-[0.72rem] font-semibold text-muted transition-all duration-300 hover:border-brand-500/40 hover:text-ink"
            >
              {link.name}
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
