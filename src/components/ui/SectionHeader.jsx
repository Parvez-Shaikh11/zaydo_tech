import React from 'react';
import { motion } from 'framer-motion';
import { WordReveal } from './Reveal';

/**
 * `icon` swaps the two hairlines flanking the eyebrow for a single glyph plate
 * ahead of it — the reference's label treatment. Pass a lucide component.
 */
export default function SectionHeader({
  eyebrow,
  icon: Icon,
  title,
  description,
  align = 'center',
  highlight = [],
  className = '',
}) {
  const isCenter = align === 'center';

  return (
    <div
      className={`${isCenter ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl text-left'} ${className}`}
    >
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={`mb-5 flex items-center gap-3 ${isCenter ? 'justify-center' : ''}`}
        >
          {Icon ? (
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-500/12 ring-1 ring-brand-500/25">
              <Icon className="h-3.5 w-3.5 text-accent" />
            </span>
          ) : (
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-accent" />
          )}
          <span className="eyebrow text-accent">{eyebrow}</span>
          {!Icon && <span className="h-px w-8 bg-gradient-to-l from-transparent to-accent" />}
        </motion.div>
      )}

      <h2 className="text-3xl font-extrabold leading-[1.08] text-ink sm:text-4xl lg:text-[2.9rem]">
        <WordReveal text={title} highlight={highlight} />
      </h2>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className={`mt-5 text-[15px] leading-relaxed text-muted ${isCenter ? 'mx-auto max-w-2xl' : ''}`}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
