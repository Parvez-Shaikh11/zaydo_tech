import React from 'react';
import { Mail, MapPin, MessageSquare, ShieldCheck } from 'lucide-react';
import PageHero from '../components/PageHero';
import ContactWizard from '../components/ContactWizard';
import Reveal from '../components/ui/Reveal';
import { site } from '../data/site';

const assurances = [
  {
    icon: MessageSquare,
    title: 'An engineer reads it',
    body: 'Your description goes to someone who can assess it technically, not into a lead queue.',
  },
  {
    icon: ShieldCheck,
    title: 'No sales sequence',
    body: 'One considered reply. You will not be enrolled into an automated follow-up campaign.',
  },
  {
    icon: Mail,
    title: 'A straight answer',
    body: 'If this is not worth building, or not something we are the right people to build, we will say so.',
  },
];

export default function Contact() {
  return (
    <div>
      <PageHero
        eyebrow="Start a project"
        title="Tell us what"
        highlight="you're building."
        description="Have an idea, a business challenge, or a process that could work better with the right system behind it? Describe it in your own words — the form below is structured so that your answers give us enough to respond usefully."
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Contact' }]}
      />

      <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* ------------------------------------------------------ aside */}
          <div className="lg:col-span-4">
            <Reveal className="surface sticky top-28 rounded-3xl p-7">
              <h2 className="eyebrow text-cyanic-400">What to expect</h2>

              <ul className="mt-7 space-y-6">
                {assurances.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.title} className="flex items-start gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-brand-500/25 bg-brand-500/10 text-brand-400">
                        <Icon className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="text-[0.9rem] font-bold text-ink">{item.title}</p>
                        <p className="mt-1 text-[0.8rem] leading-relaxed text-muted">
                          {item.body}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-8 space-y-3 border-t border-line/[0.08] pt-7">
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-3 text-[0.86rem] text-muted transition-colors hover:text-cyanic-400"
                >
                  <Mail className="h-4 w-4 shrink-0" />
                  {site.email}
                </a>
                <p className="flex items-start gap-3 text-[0.86rem] leading-relaxed text-faint">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                  {site.location}
                </p>
              </div>

              <p className="mt-7 rounded-2xl border border-line/[0.08] bg-line/[0.02] p-4 text-[0.78rem] leading-relaxed text-faint">
                Prefer to skip the form? Email us directly with a paragraph about the problem —
                that works just as well.
              </p>
            </Reveal>
          </div>

          {/* ------------------------------------------------------ wizard */}
          <div className="lg:col-span-8">
            <ContactWizard />
          </div>
        </div>
      </div>
    </div>
  );
}
