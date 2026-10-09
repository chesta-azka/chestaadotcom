'use client';

import React from 'react';
import SEOMetadata from '../components/atoms/SEOMetadata';
import { HeroPurple } from '../components/organisms/HeroPurple';
import SolutionsServiceOverviewSection from '../components/organisms/SolutionsServiceOverviewSection';
import PortfolioShowcaseSection from '../components/organisms/PortfolioShowcaseSection';
import BehindTheScenesSection from '../components/organisms/BehindTheScenesSection';
import ProjectRhythmSection from '../components/organisms/ProjectRhythmSection';
import IndustryContextSection from '../components/organisms/IndustryContextSection';
import BlogInsightSection from '../components/organisms/BlogInsightSection';
import HomeFAQSection from '../components/organisms/HomeFAQSection';
import HomeCTASection from '../components/organisms/HomeCTASection';

export default function HomePage() {
  return (
    <div className="flex flex-col w-full bg-slate-50 text-slate-900 relative min-h-screen selection:bg-purple-900 selection:text-white">
      <SEOMetadata 
        title="Dominasi Pasar Digital. Amankan Profit Maksimal. | CHESTAADOTCOM"
        description="Sistem otonom berkecepatan tinggi yang melayani pelanggan 24/7. Pangkas biaya operasional admin dan dominasi pasar dengan arsitektur digital kelas enterprise."
      />

      {/* THE 7-SECTION HIGH-CONVERTING FUNNEL */}
      <div className="flex flex-col w-full relative">

        {/* SECTION 1: HERO SECTION (HeroPurple) */}
        <HeroPurple />

        {/* SOLUTIONS OVERVIEW SECTION */}
        <SolutionsServiceOverviewSection />

        {/* PORTFOLIO SHOWCASE SECTION */}
        <PortfolioShowcaseSection />

        {/* SECTION: DI BALIK LAYAR (Perubahan yang terasa dalam pekerjaan sehari-hari) */}
        <BehindTheScenesSection />

        {/* SECTION: RITME PROYEK (Langkah yang jelas, dari kebutuhan hingga penerapan) */}
        <ProjectRhythmSection />

        {/* SECTION: KONTEKS INDUSTRI (Memahami industrinya. Menyesuaikan solusinya.) */}
        <IndustryContextSection />

        {/* SECTION: BLOG & WAWASAN (Wawasan Arsitektur & Strategi Digital) */}
        <BlogInsightSection />

        {/* SECTION: FAQ / TANYA JAWAB (Pertanyaan yang sering diajukan) */}
        <HomeFAQSection />

        {/* SECTION: CTA (Diskusikan kebutuhan bisnis Anda bersama kami) */}
        <HomeCTASection />

      </div>
    </div>
  );
}
