import React from 'react';
import { motion } from 'framer-motion';

const OFFSETS = {
  up: { y: 34, x: 0 },
  down: { y: -34, x: 0 },
  left: { x: 40, y: 0 },
  right: { x: -40, y: 0 },
  none: { x: 0, y: 0 },
};

/**
 * Scroll-triggered entrance. Fires once, respects a shared easing curve so the
 * whole site animates with one personality instead of ten different ones.
 */
export default function Reveal({
  children,
  as = 'div',
  direction = 'up',
  delay = 0,
  duration = 0.7,
  blur = true,
  className = '',
  ...rest
}) {
  const MotionTag = motion[as] ?? motion.div;
  const offset = OFFSETS[direction] ?? OFFSETS.up;

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, ...offset, filter: blur ? 'blur(8px)' : 'blur(0px)' }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-90px' }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

/** Parent that cascades its children in, used for card grids and lists. */
export function Stagger({ children, className = '', gap = 0.09, delay = 0, ...rest }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
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
  hidden: { opacity: 0, y: 28, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
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
          initial={{ opacity: 0, y: '0.5em', filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: delay + i * 0.055, ease: [0.22, 1, 0.36, 1] }}
        >
          {word}
          {i < words.length - 1 && ' '}
        </motion.span>
      ))}
    </span>
  );
}
