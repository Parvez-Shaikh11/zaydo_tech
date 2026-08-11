import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

/** Shared interior-page header so every route opens with the same rhythm. */
export default function PageHero({
  eyebrow,
  title,
  highlight,
  description,
  breadcrumb = [],
  accent = '#1B72F5',
  children,
}) {
  return (
    <section className="relative overflow-hidden pt-32 pb-14 sm:pt-40 sm:pb-20">
      <div
        aria-hidden
        className="halo animate-float-slow"
        style={{
          width: '38rem',
          height: '38rem',
          top: '-14rem',
          right: '-10rem',
          background: `${accent}2e`,
        }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {breadcrumb.length > 0 && (
          <motion.nav
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-7 flex flex-wrap items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-faint"
          >
            {breadcrumb.map((crumb, i) => (
              <React.Fragment key={crumb.label}>
                {i > 0 && <ChevronRight className="h-3 w-3 opacity-50" />}
                {crumb.to ? (
                  <Link to={crumb.to} className="transition-colors hover:text-cyanic-400">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-muted">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </motion.nav>
        )}

        {eyebrow && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="chip"
            style={{ borderColor: `${accent}55`, color: accent }}
          >
            {eyebrow}
          </motion.div>
        )}

        <h1 className="mt-6 max-w-4xl text-[2.2rem] font-extrabold leading-[1.06] tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]">
          <span className="block overflow-hidden">
            <motion.span
              className="block"
              initial={{ y: '105%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              {title}
            </motion.span>
          </span>
          {highlight && (
            <span className="block overflow-hidden">
              <motion.span
                className="block text-brand-gradient"
                initial={{ y: '105%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                {highlight}
              </motion.span>
            </span>
          )}
        </h1>

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32 }}
            className="mt-6 max-w-2xl text-[0.98rem] leading-relaxed text-muted"
          >
            {description}
          </motion.p>
        )}

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.42 }}
            className="mt-9"
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}
