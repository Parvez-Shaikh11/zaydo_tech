import React from 'react';
import { motion } from 'framer-motion';

const OFFSETS = {
  up: { y: 16, x: 0 },
  down: { y: -16, x: 0 },
  left: { x: 20, y: 0 },
  right: { x: -20, y: 0 },
  none: { x: 0, y: 0 },
};

/**
 * Scroll-triggered entrance. Fires once, uses lightweight transform & opacity
 * without heavy blur repaints for 60-120fps buttery smooth performance.
 */
export default function Reveal({
  children,
  as = 'div',
  direction = 'up',
  delay = 0,
  duration = 0.35,
  className = '',
  ...rest
}) {
  const MotionTag = motion[as] ?? motion.div;
  const offset = OFFSETS[direction] ?? OFFSETS.up;

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

/** Parent that cascades its children in, used for card grids and lists. */
export function Stagger({ children, className = '', gap = 0.06, delay = 0, ...rest }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-30px' }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: gap, delayChildren: delay } },
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export const staggerItem = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
};

/**
 * Headline that animates in word by word.
 * `highlight` takes word indices, or the string "last" when the headline text
 * is built at runtime and the index is not known up front.
 */
export function WordReveal({ text, className = '', delay = 0, highlight = [] }) {
  const words = text.split(' ');
  const accented =
    highlight === 'last' ? [words.length - 1] : Array.isArray(highlight) ? highlight : [];

  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className={`inline-block ${accented.includes(i) ? 'text-brand-gradient' : ''}`}
          initial={{ opacity: 0, y: '0.3em' }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: delay + i * 0.035, ease: [0.22, 1, 0.36, 1] }}
        >
          {word}
          {i < words.length - 1 && ' '}
        </motion.span>
      ))}
    </span>
  );
}
