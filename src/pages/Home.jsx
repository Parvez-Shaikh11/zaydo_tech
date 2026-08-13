import React from 'react';
import HeroSlider from '../components/HeroSlider';
import ServiceCarousel from '../components/ServiceCarousel';
import WhyZaydo from '../components/WhyZaydo';
import TechStackSection from '../components/TechStackSection';
import Testimonials from '../components/Testimonials';
import TeamGrid from '../components/TeamGrid';
import ProjectRail from '../components/ProjectRail';
import Texture from '../components/ui/Texture';
import CTASection from '../components/CTASection';
import { projects } from '../data/projects';

export default function Home() {
  /* Featured first, then the rest in their authored order. The rail loops, so
     every project is reachable — nothing is cut off at three. */
  const featured = projects.find((p) => p.featured) ?? projects[0];
  const railProjects = [featured, ...projects.filter((p) => p.slug !== featured.slug)];

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
        <ProjectRail projects={railProjects} />

        {/* --------------------------------------------- technology stack */}
        <TechStackSection />

        {/* -------------------------------------------------- final CTA */}
        <CTASection />
      </div>
    </div>
  );
}
