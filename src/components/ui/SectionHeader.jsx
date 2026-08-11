import React from 'react';
import { motion } from 'framer-motion';
import { WordReveal } from './Reveal';

export default function SectionHeader({
  eyebrow,
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
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-cyanic-400" />
          <span className="eyebrow text-cyanic-400">{eyebrow}</span>
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-cyanic-400" />
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
