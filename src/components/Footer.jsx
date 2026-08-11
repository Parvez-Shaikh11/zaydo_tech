import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail, MapPin } from 'lucide-react';
import Logo from './ui/Logo';
import Reveal from './ui/Reveal';
import { Marquee } from './ui/Motion';
import { navLinks, site, techMarquee } from '../data/site';
import { servicesData } from '../data/servicesData';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-32 overflow-hidden border-t border-line/[0.08]">
      <div
        aria-hidden
        className="halo"
        style={{
          width: '44rem',
          height: '30rem',
          bottom: '-18rem',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'var(--halo-1)',
        }}
      />

      {/* technology band */}
      <div className="border-b border-line/[0.08] py-6">
        <Marquee speed={42}>
          {techMarquee.map((tech) => (
            <span
              key={tech}
              className="flex items-center gap-4 whitespace-nowrap font-mono text-[0.68rem] uppercase tracking-[0.22em] text-faint"
            >
              {tech}
              <span className="h-1 w-1 rounded-full bg-cyanic-400/50" />
            </span>
          ))}
        </Marquee>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* brand */}
          <Reveal className="lg:col-span-4">
            <Logo variant="full" className="h-8" />
            <p className="mt-6 max-w-sm text-[0.88rem] leading-relaxed text-muted">
              {site.tagline}
            </p>
            <p className="mt-4 max-w-sm text-[0.82rem] leading-relaxed text-faint">
              A technology partner that understands the business problem first and
              engineers the digital system that solves it.
            </p>

            <div className="mt-7 space-y-2.5">
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-2.5 text-[0.84rem] text-muted transition-colors hover:text-cyanic-400"
              >
                <Mail className="h-3.5 w-3.5" />
                {site.email}
              </a>
              <p className="flex items-center gap-2.5 text-[0.84rem] text-faint">
                <MapPin className="h-3.5 w-3.5" />
                {site.location}
              </p>
            </div>
          </Reveal>

          {/* nav columns */}
          <Reveal delay={0.08} className="lg:col-span-2">
            <h3 className="eyebrow mb-5 text-faint">Navigate</h3>
            <ul className="space-y-3">
              {[...navLinks, { name: 'Contact', path: '/contact' }].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="group inline-flex items-center gap-1.5 text-[0.86rem] text-muted transition-colors hover:text-ink"
                  >
                    {link.name}
                    <ArrowUpRight className="h-3 w-3 opacity-0 transition-all duration-300 group-hover:opacity-60" />
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.14} className="lg:col-span-3">
            <h3 className="eyebrow mb-5 text-faint">Capabilities</h3>
            <ul className="space-y-3">
              {servicesData.map((service) => (
                <li key={service.id}>
                  <Link
                    to={`/services/${service.id}`}
                    className="group inline-flex items-center gap-1.5 text-[0.86rem] text-muted transition-colors hover:text-ink"
                  >
                    {service.title}
                    <ArrowUpRight className="h-3 w-3 opacity-0 transition-all duration-300 group-hover:opacity-60" />
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.2} className="lg:col-span-3">
            <h3 className="eyebrow mb-5 text-faint">Connect</h3>
            <ul className="space-y-3">
              {site.socials.map((social) => (
                <li key={social.name}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group flex items-center justify-between rounded-xl border border-line/[0.08] px-4 py-2.5 text-[0.84rem] text-muted transition-all duration-300 hover:border-brand-500/40 hover:text-ink"
                  >
                    <span>{social.name}</span>
                    <span className="flex items-center gap-1.5 font-mono text-[0.62rem] text-faint">
                      {social.handle}
                      <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <Link to="/contact" className="btn btn-primary mt-6 w-full !py-3.5">
              Start your project
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        <div className="hairline my-10" />

        <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <p className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-faint">
            © {year} {site.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              to="/privacy"
              className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-faint transition-colors hover:text-cyanic-400"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-faint transition-colors hover:text-cyanic-400"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
