import React from 'react';
import { motion } from 'framer-motion';
import { Github, Globe, Linkedin, Mail, Twitter } from 'lucide-react';
import SectionHeader from './ui/SectionHeader';
import { Stagger, staggerItem } from './ui/Reveal';
import { Avatar } from './ui/Avatar';
import { team as defaultMembers } from '../data/team';

/**
 * Team grid. Hovering a card slides a social rail in from the right, staggered
 * per icon — the reference's team-card behaviour.
 *
 * Deliberately does NOT use the `.fill-card` colour flood that service cards
 * get: flooding a person's photograph with brand blue looks like an error.
 *
 * Renders NOTHING when there are no members. `src/data/team.js` ships empty on
 * purpose (zaydo_info.md lists a Team page under "DO NOT CREATE … until there
 * is genuine content"); it appears as soon as real people are added.
 */

/* Resolved here rather than in the data file, so the data stays serialisable. */
const SOCIAL_ICON = {
  linkedin: Linkedin,
  github: Github,
  twitter: Twitter,
  x: Twitter,
  email: Mail,
  mail: Mail,
  website: Globe,
};

const COLS = {
  2: 'lg:grid-cols-2',
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
};

export default function TeamGrid({
  members = defaultMembers,
  columns = 4,
  eyebrow = 'The team',
  title = 'The people who build it',
  highlight = [4],
  description = 'A small senior team. The people who scope your system are the people who write it.',
  /* Pages that already sit inside a padded container pass `className="px-0"`
     so the gutters are not applied twice. */
  className = 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8',
}) {
  if (!members.length) return null;

  return (
    <section className={`relative isolate ${className}`}>
      <SectionHeader
        eyebrow={eyebrow}
        title={title}
        highlight={highlight}
        description={description}
        className="mb-[3.75rem]"
      />

      <Stagger className={`grid gap-6 sm:grid-cols-2 ${COLS[columns] ?? COLS[4]}`}>
        {members.map((member) => (
          <motion.div key={member.id} variants={staggerItem}>
            <article className="tile tile-hover group relative h-full overflow-hidden text-center transition-transform duration-[400ms] ease-in-out hover:-translate-y-1.5">
              <div className="relative overflow-hidden">
                {member.photo ? (
                  <img
                    src={member.photo}
                    alt={member.name}
                    width="480"
                    height="600"
                    loading="lazy"
                    decoding="async"
                    className="aspect-[4/5] w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
                  />
                ) : (
                  <div className="flex aspect-[4/5] w-full items-center justify-center bg-line/[0.04]">
                    <Avatar name={member.name} size={110} />
                  </div>
                )}

                {/* social rail — slides in from the right on hover */}
                {member.socials?.length > 0 && (
                  <div className="absolute right-4 top-1/2 flex -translate-y-1/2 flex-col gap-2">
                    {member.socials.map((social, i) => {
                      const Icon = SOCIAL_ICON[social.name?.toLowerCase()] ?? Globe;
                      return (
                        <a
                          key={social.name}
                          href={social.href}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`${member.name} on ${social.name}`}
                          style={{ transitionDelay: `${i * 70}ms` }}
                          className="flex h-9 w-9 translate-x-4 items-center justify-center rounded-full bg-panel text-accent opacity-0 shadow-md transition-all duration-300 hover:bg-accent hover:text-white group-hover:translate-x-0 group-hover:opacity-100 group-focus-within:translate-x-0 group-focus-within:opacity-100"
                        >
                          <Icon className="h-4 w-4" />
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="px-5 py-5">
                <h3 className="font-display text-base font-bold text-ink">{member.name}</h3>
                <p className="mt-1 text-[0.78rem] text-accent">{member.role}</p>
                {member.bio && (
                  <p className="mt-3 text-[0.8rem] leading-relaxed text-muted">{member.bio}</p>
                )}
              </div>
            </article>
          </motion.div>
        ))}
      </Stagger>
    </section>
  );
}
