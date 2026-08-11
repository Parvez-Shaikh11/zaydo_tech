import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import HeroSlider from '../components/HeroSlider';
import BentoGrid from '../components/BentoGrid';
import ProcessTimeline from '../components/ProcessTimeline';
import WhyZaydo from '../components/WhyZaydo';
import TechStackSection from '../components/TechStackSection';
import CapabilityRail from '../components/CapabilityRail';
import SectionHeader from '../components/ui/SectionHeader';
import Reveal, { Stagger } from '../components/ui/Reveal';
import { Marquee } from '../components/ui/Motion';
import ProjectCard, { FeaturedProjectCard } from '../components/ProjectCard';
import CTASection from '../components/CTASection';
import { projects } from '../data/projects';
import { techMarquee } from '../data/site';

export default function Home() {
  const featured = projects.find((p) => p.featured) ?? projects[0];
  const others = projects.filter((p) => p.slug !== featured.slug).slice(0, 3);

  return (
    <div className="relative">
      <HeroSlider />

      {/* ---------------------------------------------------- trust band */}
      <Reveal className="border-y border-line/[0.08] bg-line/[0.015] py-7" blur={false}>
        <div className="mx-auto mb-5 max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center font-mono text-[0.6rem] uppercase tracking-[0.24em] text-faint">
            Engineered with a stack we actually run in production
          </p>
        </div>
        <Marquee speed={44}>
          {techMarquee.map((tech) => (
            <span
              key={tech}
              className="flex items-center gap-4 whitespace-nowrap text-[0.95rem] font-semibold tracking-tight text-muted/70"
            >
              {tech}
              <span className="h-1 w-1 rounded-full bg-cyanic-400/60" />
            </span>
          ))}
        </Marquee>
      </Reveal>

      <div className="space-y-28 pb-8 pt-24 sm:space-y-36 sm:pt-28">
        {/* ------------------------------------------------ what we build */}
        <section id="capabilities" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Capabilities"
            title="What we build"
            highlight={[2]}
            description="Five engineering tracks that operate as one connected digital ecosystem — not five disconnected service lines."
            className="mb-14"
          />
          <BentoGrid />
        </section>

        {/* ------------------------------------------------- how we solve */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Our methodology"
            title="How we solve"
            highlight={[2]}
            description="From the manual bottleneck to a released, maintained system — nine phases, each with something you can review."
            className="mb-14"
          />
          <ProcessTimeline />
        </section>

        {/* ----------------------------------------------- selected work */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeader
              eyebrow="Selected case studies"
              title="Systems we have built"
              highlight={[3]}
              description="Real builds, described honestly. Concept and internal projects are labelled as such."
              align="left"
            />
            <Link
              to="/work"
              className="group inline-flex shrink-0 items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-cyanic-400"
            >
              View all projects
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          <Stagger className="space-y-6">
            <FeaturedProjectCard project={featured} />
            <div className="grid gap-6 md:grid-cols-3">
              {others.map((project, i) => (
                <ProjectCard key={project.slug} project={project} index={i} />
              ))}
            </div>
          </Stagger>
        </section>

        {/* -------------------------------------------------- why zaydo */}
        <WhyZaydo />

        {/* --------------------------------------------- technology stack */}
        <TechStackSection />

        {/* ------------------------------------------- capability shortcut */}
        <CapabilityRail />

        {/* -------------------------------------------------- final CTA */}
        <CTASection />
      </div>
    </div>
  );
}
