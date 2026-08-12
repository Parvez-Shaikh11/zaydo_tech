import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import HeroSlider from '../components/HeroSlider';
import ServiceCarousel from '../components/ServiceCarousel';
import WhyZaydo from '../components/WhyZaydo';
import TechStackSection from '../components/TechStackSection';
import Testimonials from '../components/Testimonials';
import TeamGrid from '../components/TeamGrid';
import SectionHeader from '../components/ui/SectionHeader';
import CaseStudyCarousel from '../components/CaseStudyCarousel';
import Texture from '../components/ui/Texture';
import CTASection from '../components/CTASection';
import { projects } from '../data/projects';

export default function Home() {
  const featured = projects.find((p) => p.featured) ?? projects[0];
  const others = projects.filter((p) => p.slug !== featured.slug).slice(0, 3);

  return (
    <div className="relative">
      <HeroSlider />

      {/* ------------------------------------------------ what we build */}
      {/* The capabilities panel is inset and rounded rather than a full-bleed
          band, so it needs its own breathing room above. */}
      <div id="capabilities" className="pt-4 sm:pt-8">
        <ServiceCarousel />
      </div>

      {/* ------------------------ why zaydo — tinted band, wave pattern */}
      <div className="band-tint relative isolate border-y border-line/[0.06] py-16 sm:py-20">
        <Texture pattern="waves" opacity={0.4} fade="center" className="text-brand-500" />
        <WhyZaydo />
      </div>

      <div className="section-rhythm pb-8 pt-20 sm:pt-24">
        {/* Both render null until their data files hold real content. */}
        <Testimonials />
        <TeamGrid />

        {/* ----------------------------------------------- selected work */}
        <section className="relative isolate mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* isometric grid — this section's own pattern */}
          <Texture pattern="iso" opacity={0.34} fade="top" className="text-brand-500" />
          <div className="mb-[3.75rem] flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeader
              eyebrow="Selected case studies"
              title="Systems we have built"
              highlight={[3]}
              description="Real builds, described honestly. Concept and internal projects are labelled as such."
              align="left"
            />
            <Link
              to="/work"
              className="group inline-flex shrink-0 items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-accent"
            >
              View all projects
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          <CaseStudyCarousel projects={[featured, ...others]} />
        </section>

        {/* --------------------------------------------- technology stack */}
        <TechStackSection />

        {/* -------------------------------------------------- final CTA */}
        <CTASection />
      </div>
    </div>
  );
}
