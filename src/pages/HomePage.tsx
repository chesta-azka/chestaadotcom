import { useEffect } from 'react';
import MetaTags from '../components/atoms/MetaTags.tsx';
import HeroSection from '../components/organisms/HeroSection.tsx';
import FeaturesSection from '../components/organisms/FeaturesSection.tsx';
import ProjectsSection from '../components/organisms/ProjectsSection.tsx';
import StatsSection from '../components/organisms/StatsSection.tsx';
import HowItWorksSection from '../components/organisms/HowItWorksSection.tsx';
import TestimonialSection from '../components/organisms/TestimonialSection.tsx';
import BlogSection from '../components/organisms/BlogSection.tsx';
import LocationMapSection from '../components/organisms/LocationMapSection.tsx';
import ContactSection from '../components/organisms/ContactSection.tsx';
import ScrollingTechTicker from '../components/organisms/ScrollingTechTicker.tsx';

export default function HomePage() {
  return (
    <>
      <MetaTags 
        title="Digital Architectural Agency" 
        description="chestaa.com - Website Premium untuk UMKM yang Ingin Terlihat Lebih Serius." 
        includeFaq={true}
      />
      <HeroSection />
      <StatsSection />
      <ScrollingTechTicker />
      <FeaturesSection />
      <ProjectsSection />
      <HowItWorksSection />
      <TestimonialSection />
      <BlogSection />
      <LocationMapSection />
      <ContactSection />
    </>
  );
}
