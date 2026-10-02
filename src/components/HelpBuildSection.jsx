import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Code2, Workflow, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHeader from './ui/SectionHeader';
import { Stagger, staggerItem } from './ui/Reveal';

const buildCards = [
  {
    title: 'Modern Websites',
    description: 'Redesign outdated websites into fast, modern and professional digital experiences.',
    icon: Globe,
    accent: '#0059FD',
    link: '/services#digital-platforms',
  },
  {
    title: 'Custom Software',
    description: 'Build software around your unique business processes and requirements.',
    icon: Code2,
    accent: '#0077FD',
    link: '/services#custom-software',
  },
  {
    title: 'Automation',
    description: 'Reduce repetitive manual work and connect the tools your business already uses.',
    icon: Workflow,
    accent: '#0086FD',
    link: '/services#automation',
  },
  {
    title: 'AI & Digital Solutions',
    description: 'Use modern technology and AI where it can solve a real business problem.',
    icon: Sparkles,
    accent: '#00C9FD',
    link: '/services#ai-systems',
  },
];

export default function HelpBuildSection() {
  return (
    <section className="relative isolate mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <SectionHeader
        eyebrow="Solutions Range"
        title="What Can We Help You Build?"
        highlight={[4, 5]}
        description="Engineered digital systems designed around your operational needs, growth goals, and existing tools."
        className="mb-12"
      />

      <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {buildCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div key={card.title} variants={staggerItem}>
              <Link
                to={card.link}
                className="tile tile-hover card-sheen group relative flex h-full flex-col overflow-hidden p-6 sm:p-7"
              >
                {/* ambient background wash on hover */}
                <div
                  aria-hidden
                  className="absolute -right-16 -top-16 h-36 w-36 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-60"
                  style={{ background: card.accent }}
                />

                <div className="relative flex items-center justify-between">
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-2xl border transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                    style={{
                      borderColor: `${card.accent}55`,
                      background: `${card.accent}18`,
                      color: card.accent,
                    }}
                  >
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="font-mono text-[0.62rem] tracking-[0.2em] text-faint">
                    0{i + 1}
                  </span>
                </div>

                <h3 className="relative mt-6 text-xl font-extrabold text-ink transition-colors duration-300 group-hover:text-accent">
                  {card.title}
                </h3>

                <p className="relative mt-3 text-[0.86rem] leading-relaxed text-muted">
                  {card.description}
                </p>

                <div className="relative mt-auto flex items-center gap-2 pt-6 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-accent">
                  Explore solution
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </Link>
            </motion.div>
          );
        })}
      </Stagger>
    </section>
  );
}
