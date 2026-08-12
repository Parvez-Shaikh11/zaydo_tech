import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Stagger, staggerItem } from './ui/Reveal';
import { TiltCard } from './ui/Motion';
import { servicesData } from '../data/servicesData';

/**
 * The five capabilities as one connected ecosystem rather than five identical
 * SaaS cards: the first two are wide feature panels, the remaining three form a
 * compact row underneath.
 */
export default function BentoGrid() {
  const [lead, second, ...rest] = servicesData;

  return (
    <Stagger className="grid grid-cols-1 gap-5 lg:grid-cols-6">
      <FeatureCard service={lead} className="lg:col-span-4" tall />
      <FeatureCard service={second} className="lg:col-span-2" />
      {rest.map((service) => (
        <CompactCard key={service.id} service={service} className="lg:col-span-2" />
      ))}
    </Stagger>
  );
}

function FeatureCard({ service, className = '', tall = false }) {
  const Icon = service.icon;

  return (
    <motion.div variants={staggerItem} className={className}>
      <TiltCard max={4} className="h-full">
        <Link
          to={`/services/${service.id}`}
          className="tile tile-hover card-sheen group relative flex h-full flex-col overflow-hidden"
        >
          {/* image band */}
          <div className={`relative isolate overflow-hidden ${tall ? 'h-52 sm:h-64' : 'h-40'}`}>
            <img
              src={service.image}
              alt=""
              loading="lazy"
              className={`h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110 ${service.grade} ${service.imagePosition ?? ''}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-panel via-panel/60 to-transparent" />
            <div
              className="absolute inset-0 opacity-40 mix-blend-color"
              style={{ background: service.accent }}
            />
            <span
              className="absolute left-5 top-5 flex h-11 w-11 items-center justify-center rounded-2xl border backdrop-blur-md transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
              style={{
                borderColor: `${service.accent}55`,
                background: `${service.accent}22`,
                color: service.accent,
              }}
            >
              <Icon className="h-5 w-5" />
            </span>
            <span className="absolute right-5 top-5 font-mono text-[0.6rem] tracking-[0.22em] text-faint">
              {service.number}
            </span>
          </div>

          {/* body */}
          <div className="flex flex-1 flex-col p-6 sm:p-7">
            <h3 className="text-xl font-bold text-ink transition-colors duration-300 group-hover:text-accent sm:text-2xl">
              {service.title}
            </h3>
            <p className="mt-3 text-[0.86rem] leading-relaxed text-muted">
              {tall ? service.description : service.tagline}
            </p>

            {tall && (
              <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                {service.whatWeBuild.slice(0, 4).map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[0.78rem] text-faint">
                    <span
                      className="mt-1.5 h-1 w-1 shrink-0 rounded-full"
                      style={{ background: service.accent }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-auto flex items-center gap-2 pt-6 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-accent">
              Explore capability
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </div>
          </div>
        </Link>
      </TiltCard>
    </motion.div>
  );
}

function CompactCard({ service, className = '' }) {
  const Icon = service.icon;

  return (
    <motion.div variants={staggerItem} className={className}>
      <Link
        to={`/services/${service.id}`}
        className="tile tile-hover card-sheen group relative flex h-full flex-col overflow-hidden p-6"
      >
        {/* faint capability wash that wakes up on hover */}
        <div
          aria-hidden
          className="absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-60"
          style={{ background: service.accent }}
        />

        <div className="relative flex items-start justify-between">
          <span
            className="flex h-11 w-11 items-center justify-center rounded-2xl border transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6"
            style={{
              borderColor: `${service.accent}55`,
              background: `${service.accent}18`,
              color: service.accent,
            }}
          >
            <Icon className="h-5 w-5" />
          </span>
          <span className="font-mono text-[0.6rem] tracking-[0.22em] text-faint">
            {service.number}
          </span>
        </div>

        <h3 className="relative mt-6 text-lg font-bold text-ink transition-colors duration-300 group-hover:text-accent">
          {service.title}
        </h3>
        <p className="relative mt-2.5 text-[0.82rem] leading-relaxed text-muted">
          {service.tagline}
        </p>

        <div className="relative mt-auto flex items-center gap-2 pt-6 text-[0.66rem] font-bold uppercase tracking-[0.16em] text-faint transition-colors duration-300 group-hover:text-accent">
          Read more
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </div>
      </Link>
    </motion.div>
  );
}
