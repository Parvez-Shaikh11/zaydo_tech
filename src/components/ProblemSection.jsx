import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, AlertTriangle, Layers, Clock, ShieldAlert } from 'lucide-react';
import SectionHeader from './ui/SectionHeader';
import { Stagger, staggerItem } from './ui/Reveal';

const problemCards = [
  {
    title: 'Outdated Website',
    description: 'Your website may no longer reflect the quality of your business.',
    icon: AlertTriangle,
    accent: '#0059FD',
  },
  {
    title: 'Too Much Manual Work',
    description: 'Repetitive processes can take valuable time away from your team.',
    icon: Clock,
    accent: '#0077FD',
  },
  {
    title: 'Disconnected Tools',
    description: 'Important information may be spread across different systems and platforms.',
    icon: Layers,
    accent: '#0086FD',
  },
  {
    title: 'Slow Business Processes',
    description: 'Manual or inefficient workflows can make everyday operations harder than they need to be.',
    icon: ShieldAlert,
    accent: '#00C9FD',
  },
];

export default function ProblemSection() {
  return (
    <section className="relative isolate mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <SectionHeader
        eyebrow="Operational Bottlenecks"
        title="Is Outdated Technology Holding Your Business Back?"
        highlight={[2, 3]}
        description="Common friction points that slow down operational velocity, confuse customers, and limit growth."
        className="mb-14"
      />

      <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {problemCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div key={card.title} variants={staggerItem}>
              <div className="tile tile-hover group relative flex h-full flex-col p-6 sm:p-7">
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-2xl border transition-transform duration-500 group-hover:scale-110"
                  style={{
                    borderColor: `${card.accent}44`,
                    background: `${card.accent}14`,
                    color: card.accent,
                  }}
                >
                  <Icon className="h-5 w-5" />
                </span>

                <h3 className="mt-5 font-display text-lg font-bold text-ink">
                  {card.title}
                </h3>

                <p className="mt-2.5 text-[0.85rem] leading-relaxed text-muted">
                  {card.description}
                </p>

                <div className="mt-auto pt-5">
                  <span className="inline-flex items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-faint">
                    <span className="h-1 w-1 rounded-full bg-rose-400/80" />
                    Challenge 0{i + 1}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </Stagger>

      {/* Bottom CTA Block */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="surface mt-12 flex flex-col items-center justify-between gap-6 rounded-3xl p-8 text-center sm:flex-row sm:text-left sm:p-10"
      >
        <div className="max-w-xl">
          <h3 className="text-xl font-bold text-ink sm:text-2xl">
            Tell us what's not working.
          </h3>
          <p className="mt-2 text-[0.92rem] leading-relaxed text-muted">
            Tell us what's not working. We'll help you figure out what could be improved.
          </p>
        </div>

        <Link to="/contact" className="btn btn-primary shrink-0">
          Start a Conversation
          <ArrowRight className="h-4 w-4" />
        </Link>
      </motion.div>
    </section>
  );
}
