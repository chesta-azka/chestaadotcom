import { useEffect } from 'react';
import MetaTags from '../components/atoms/MetaTags.tsx';
import HeroSection from '../components/organisms/HeroSection.tsx';
import ServicesSection from '../components/organisms/ServicesSection.tsx';
import AISolutionsSection from '../components/organisms/AISolutionsSection.tsx';
import ProjectsSection from '../components/organisms/ProjectsSection.tsx';
import WorkflowSection from '../components/organisms/WorkflowSection.tsx';
import WorkflowAutomation from '../components/organisms/WorkflowAutomation.tsx';
import TestimonialSection from '../components/organisms/TestimonialSection.tsx';
import PricingSection from '../components/organisms/PricingSection.tsx';
import BlogSection from '../components/organisms/BlogSection.tsx';
import CreativityMarquee from '../components/organisms/CreativityMarquee.tsx';
import ContactSection from '../components/organisms/ContactSection.tsx';
import ScrollingTechTicker from '../components/organisms/ScrollingTechTicker.tsx';
import FaqSection from '../components/organisms/FaqSection.tsx';
import FadeInSection from '../components/atoms/FadeInSection.tsx';
import StatsCounter from '../components/organisms/StatsCounter.tsx';
import SectionGlassCard from '../components/atoms/SectionGlassCard.tsx';
import SectionSeparator from '../components/atoms/SectionSeparator.tsx';

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
      
      <SectionSeparator />
      <SectionGlassCard index={0} metaLabel="AI CAPABILITIES" className="snap-start" serviceType="ai">
        <AISolutionsSection />
      </SectionGlassCard>

      <SectionSeparator />
      <SectionGlassCard index={1} metaLabel="OUR SERVICES" className="snap-start" serviceType="software">
        <ServicesSection />
      </SectionGlassCard>

      <SectionSeparator />
      <SectionGlassCard index={2} metaLabel="ENTERPRISE WORKFLOW" className="snap-start">
        <WorkflowSection />
      </SectionGlassCard>
      
      <SectionSeparator />
      
      <SectionGlassCard index={2} metaLabel="AI ROADMAP SIMULATOR" className="snap-start">
        <WorkflowAutomation />
      </SectionGlassCard>

      <SectionSeparator />
      <SectionGlassCard index={3} metaLabel="CLIENT SUCCESS" className="snap-start">
        <TestimonialSection />
      </SectionGlassCard>

      <SectionSeparator />
      <SectionGlassCard index={4} metaLabel="PROJECT GALLERY">
        <ProjectsSection />
      </SectionGlassCard>

      <SectionSeparator />
      <SectionGlassCard index={5} metaLabel="INVESTMENT">
        <PricingSection />
      </SectionGlassCard>

      <SectionSeparator />
      <SectionGlassCard index={6} metaLabel="FAQ">
        <FaqSection />
      </SectionGlassCard>

      <SectionSeparator />
      <SectionGlassCard index={7} metaLabel="GET IN TOUCH">
        <ContactSection />
      </SectionGlassCard>

      <SectionSeparator />
      <SectionGlassCard index={8} metaLabel="INSIGHTS">
        <BlogSection />
      </SectionGlassCard>

      <SectionSeparator />
      <FadeInSection><CreativityMarquee /></FadeInSection>
    </div>
  );
}
