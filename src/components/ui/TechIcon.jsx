import React from 'react';
import {
  siClaude,
  siDocker,
  siExpress,
  siFramer,
  siGraphql,
  siMongodb,
  siNodedotjs,
  siPostgresql,
  siPrisma,
  siReact,
  siRedis,
  siTailwindcss,
  siVercel,
  siVite,
} from 'simple-icons';
import { Cloud, Clock, GitBranch, Layers, Network, Plug, Search, Sparkles, Webhook } from 'lucide-react';

/**
 * Brand marks for the technology capsules.
 *
 * Named imports from `simple-icons` so only the ~14 marks we use are bundled —
 * importing the whole package would pull in 3,400+ icons.
 *
 * Not everything has a brand mark: AWS, OpenAI and Amazon were removed from
 * simple-icons over trademark policy, and "REST", "CI/CD", "Queues" etc. are
 * concepts rather than products. Those fall back to a lucide glyph, which is
 * honest — better a clear generic icon than a wrong or invented logo.
 */

/* `hex` is overridden where the official brand colour is near-black and would
   vanish on the dark band. */
const BRAND = {
  React: { icon: siReact },
  Vite: { icon: siVite },
  'Tailwind CSS': { icon: siTailwindcss },
  'Framer Motion': { icon: siFramer, hex: '#0086FD' },
  'Node.js': { icon: siNodedotjs },
  Express: { icon: siExpress, hex: '#E2E8F0' },
  GraphQL: { icon: siGraphql },
  PostgreSQL: { icon: siPostgresql, hex: '#6C93F0' },
  MongoDB: { icon: siMongodb },
  Redis: { icon: siRedis },
  Prisma: { icon: siPrisma, hex: '#A5B4CB' },
  Docker: { icon: siDocker },
  Vercel: { icon: siVercel, hex: '#E2E8F0' },
  'Claude API': { icon: siClaude },
};

/* Concepts and trademark-restricted products. */
const GENERIC = {
  REST: { Glyph: Plug, hex: '#5CA5FF' },
  'AWS Lambda': { Glyph: Cloud, hex: '#F59E0B' },
  'CI/CD': { Glyph: GitBranch, hex: '#5CA5FF' },
  Webhooks: { Glyph: Webhook, hex: '#0086FD' },
  'Cron workers': { Glyph: Clock, hex: '#5CA5FF' },
  Queues: { Glyph: Layers, hex: '#0086FD' },
  'API integration': { Glyph: Network, hex: '#5CA5FF' },
  'OpenAI API': { Glyph: Sparkles, hex: '#10A37F' },
  'Vector search': { Glyph: Search, hex: '#0086FD' },
  'RAG pipelines': { Glyph: Layers, hex: '#5CA5FF' },
};

export function techColor(name) {
  const brand = BRAND[name];
  if (brand) return brand.hex ?? `#${brand.icon.hex}`;
  return GENERIC[name]?.hex ?? '#0086FD';
}

export default function TechIcon({ name, className = 'h-4 w-4' }) {
  const brand = BRAND[name];

  if (brand) {
    return (
      <svg
        role="img"
        aria-hidden="true"
        viewBox="0 0 24 24"
        className={className}
        fill="currentColor"
      >
        <path d={brand.icon.path} />
      </svg>
    );
  }

  const { Glyph } = GENERIC[name] ?? { Glyph: Plug };
  return <Glyph className={className} strokeWidth={2} aria-hidden="true" />;
}
