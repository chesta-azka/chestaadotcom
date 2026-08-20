import { useEffect } from 'react';
import MetaTags from '../components/atoms/MetaTags.tsx';
import HeroSection from '../components/organisms/HeroSection.tsx';
import ServicesSection from '../components/organisms/ServicesSection.tsx';
import AISolutionsSection from '../components/organisms/AISolutionsSection.tsx';
import ProjectsSection from '../components/organisms/ProjectsSection.tsx';
import EngagementRoadmap from '../components/organisms/EngagementRoadmap.tsx';
import TestimonialSection from '../components/organisms/TestimonialSection.tsx';
import PricingSection from '../components/organisms/PricingSection.tsx';
import BlogSection from '../components/organisms/BlogSection.tsx';
import CreativityMarquee from '../components/organisms/CreativityMarquee.tsx';
import ContactSection from '../components/organisms/ContactSection.tsx';
import ScrollingTechTicker from '../components/organisms/ScrollingTechTicker.tsx';
import FaqSection from '../components/organisms/FaqSection.tsx';
import FadeInSection from '../components/atoms/FadeInSection.tsx';
import StatsCounter from '../components/organisms/StatsCounter.tsx';

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      <MetaTags 
        title="Jasa Pembuatan Website Premium & AI Agentic - CHESTADOTCOM" 
        description="CHESTADOTCOM by Chesta Azka Sofyan - Jasa pembuatan website corporate premium dan otomasi bisnis dengan Agentic AI." 
        breadcrumbs={[
          { name: 'Home', item: '/' }
        ]}
      />
      <div 
        className="snap-start relative" 
        style={{ background: 'radial-gradient(circle at 50% 0%, rgba(99, 102, 241, 0.05), transparent 70%)' }}
      >
        <HeroSection />
      </div>
      <div className="snap-start"><ScrollingTechTicker /></div>
      <FadeInSection className="snap-start"><StatsCounter /></FadeInSection>
      <FadeInSection className="snap-start"><AISolutionsSection /></FadeInSection>
      <FadeInSection className="snap-start"><ServicesSection /></FadeInSection>
      <FadeInSection className="snap-start"><EngagementRoadmap /></FadeInSection>
      <FadeInSection className="snap-start"><TestimonialSection /></FadeInSection>
      <FadeInSection><ProjectsSection /></FadeInSection>
      <FadeInSection><PricingSection /></FadeInSection>
      <FadeInSection><FaqSection /></FadeInSection>
      <FadeInSection><ContactSection /></FadeInSection>
      <FadeInSection><BlogSection /></FadeInSection>
      <FadeInSection><CreativityMarquee /></FadeInSection>
    </div>
  );
}
