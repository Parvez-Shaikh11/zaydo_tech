import React from 'react';
import PageHero from '../components/PageHero';
import Reveal from '../components/ui/Reveal';
import { site } from '../data/site';

const CONTENT = {
  privacy: {
    eyebrow: 'Legal',
    title: 'Privacy',
    highlight: 'Policy',
    description:
      'What we collect when you use this website, why we collect it, and what we do with it. Written to be read rather than to be defensible.',
    sections: [
      {
        h: 'What this policy covers',
        p: [
          `This policy applies to ${site.name}'s website and to the project enquiries submitted through it. It does not cover systems we build for clients — those are governed by the agreement covering that engagement.`,
        ],
      },
      {
        h: 'Information you give us',
        p: [
          'When you submit a project enquiry we collect what you type into the form: your name, email address, optional phone number, company name, industry, optional website, and the description of your project and its context.',
          'We ask for this because it is what we need to give you a useful reply. Nothing in the form is collected for marketing profiling.',
        ],
      },
      {
        h: 'How we use it',
        p: [
          'To read and respond to your enquiry, to prepare for any follow-up conversation, and to keep a record of the discussion if it becomes a project.',
          'We do not sell your information, we do not share it with advertisers, and we do not add you to a marketing list without you asking to be on one.',
        ],
      },
      {
        h: 'Retention',
        p: [
          'Enquiry records are kept while the conversation is active and for a reasonable period afterwards in case you return to it. If you would like your enquiry deleted, email us and we will remove it.',
        ],
      },
      {
        h: 'Your rights',
        p: [
          `You can ask us what we hold about you, ask for it to be corrected, or ask for it to be deleted. Send that request to ${site.email} and we will action it.`,
        ],
      },
      {
        h: 'Contact',
        p: [
          `Questions about this policy can go to ${site.email}. If we update the policy, the revised version will replace this page.`,
        ],
      },
    ],
  },
  terms: {
    eyebrow: 'Legal',
    title: 'Terms &',
    highlight: 'Conditions',
    description:
      'The terms that apply to using this website. Project work is governed separately by a written agreement for that engagement.',
    sections: [
      {
        h: 'Using this website',
        p: [
          `This site is provided by ${site.name} for information about our services and work. You may read, reference and share it. You may not copy its content or design wholesale for a competing commercial site.`,
        ],
      },
      {
        h: 'Accuracy of content',
        p: [
          'We take care that everything stated on this site is accurate at the time of writing. Project statuses are labelled honestly: production systems are marked as production systems, and concept or internal builds are marked as such.',
          'Nothing on this site constitutes a fixed quotation, a delivery commitment or professional advice for your specific situation.',
        ],
      },
      {
        h: 'Enquiries',
        p: [
          'Submitting the enquiry form starts a conversation. It does not create a contract, reserve capacity, or oblige either side to proceed.',
        ],
      },
      {
        h: 'Project engagements',
        p: [
          'Any work we undertake is governed by a separate written agreement covering scope, deliverables, intellectual property, payment and support. Where that agreement and this page differ, the agreement takes precedence.',
        ],
      },
      {
        h: 'Intellectual property',
        p: [
          `The ${site.name} name, logo and the content of this site belong to us. Third-party technology names referenced on this site belong to their respective owners and are mentioned descriptively.`,
        ],
      },
      {
        h: 'Changes',
        p: [
          `We may update these terms. The current version is always the one published here. Questions can go to ${site.email}.`,
        ],
      },
    ],
  },
};

export default function Legal({ kind = 'privacy' }) {
  const doc = CONTENT[kind] ?? CONTENT.privacy;

  return (
    <div>
      <PageHero
        eyebrow={doc.eyebrow}
        title={doc.title}
        highlight={doc.highlight}
        description={doc.description}
        breadcrumb={[{ label: 'Home', to: '/' }, { label: doc.title.replace(/&$/, '').trim() }]}
      />

      <div className="mx-auto max-w-3xl px-4 pb-8 sm:px-6 lg:px-8">
        <div className="space-y-4">
          {doc.sections.map((section, i) => (
            <Reveal key={section.h} delay={i * 0.04} className="surface rounded-3xl p-7 sm:p-8">
              <h2 className="flex items-baseline gap-3 text-lg font-bold text-ink">
                <span className="font-mono text-[0.68rem] text-cyanic-400">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {section.h}
              </h2>
              <div className="mt-4 space-y-3">
                {section.p.map((paragraph) => (
                  <p key={paragraph} className="text-[0.88rem] leading-relaxed text-muted">
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-center font-mono text-[0.66rem] uppercase tracking-[0.16em] text-faint">
          Last updated on publication of this site
        </p>
      </div>
    </div>
  );
}
