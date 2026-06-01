import { useEffect } from 'react';
import MetaTags from '../components/atoms/MetaTags.tsx';
import HeroSection from '../components/organisms/HeroSection.tsx';
import ServicesSection from '../components/organisms/ServicesSection.tsx';
import ProjectsSection from '../components/organisms/ProjectsSection.tsx';
import WorkflowSection from '../components/organisms/WorkflowSection.tsx';
import TestimonialSection from '../components/organisms/TestimonialSection.tsx';
import BlogSection from '../components/organisms/BlogSection.tsx';
import CreativityMarquee from '../components/organisms/CreativityMarquee.tsx';
import ContactSection from '../components/organisms/ContactSection.tsx';
import ScrollingTechTicker from '../components/organisms/ScrollingTechTicker.tsx';

export default function HomePage() {
  return (
    <>
      <MetaTags 
        title="Digital Architectural Agency" 
        description="chestaadotcom - Website Premium untuk UMKM yang Ingin Terlihat Lebih Serius." 
        includeFaq={true}
      />
      <HeroSection />
      <ScrollingTechTicker />
      <ServicesSection />
      <ProjectsSection />
      <WorkflowSection />
      <TestimonialSection />
      <BlogSection />
      <CreativityMarquee />
      <ContactSection />
    </>
  );
}
