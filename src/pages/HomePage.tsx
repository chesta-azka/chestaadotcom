import { useEffect } from 'react';
import MetaTags from '../components/atoms/MetaTags.tsx';
import HeroSection from '../components/organisms/HeroSection.tsx';
import ServicesSection from '../components/organisms/ServicesSection.tsx';
import ProjectsSection from '../components/organisms/ProjectsSection.tsx';
import WorkflowSection from '../components/organisms/WorkflowSection.tsx';
import TestimonialSection from '../components/organisms/TestimonialSection.tsx';
import PricingSection from '../components/organisms/PricingSection.tsx';
import BlogSection from '../components/organisms/BlogSection.tsx';
import CreativityMarquee from '../components/organisms/CreativityMarquee.tsx';
import ContactSection from '../components/organisms/ContactSection.tsx';
import ScrollingTechTicker from '../components/organisms/ScrollingTechTicker.tsx';

export default function HomePage() {
  return (
    <>
      <MetaTags 
        title="Jasa Pembuatan Website Premium BSD & Cisauk - Chesta Azka Sofyan" 
        description="CHESTADOTCOM by Chesta Azka Sofyan - Jasa pembuatan website corporate premium untuk UMKM. Melayani area Cisauk, BSD City, dan Gading Serpong." 
        breadcrumbs={[
          { name: 'Home', item: '/' }
        ]}
      />
      <HeroSection />
      <ScrollingTechTicker />
      <ProjectsSection />
      <WorkflowSection />
      <ServicesSection />
      <TestimonialSection />
      <PricingSection />
      <BlogSection />
      <CreativityMarquee />
      <ContactSection />
    </>
  );
}
