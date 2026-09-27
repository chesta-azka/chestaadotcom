'use client';

import React from 'react';
import type { Variants } from 'motion/react';
import { motion } from 'motion/react';
import { HeroPurple } from '../components/organisms/HeroPurple';
import SoftDivider from '../components/atoms/SoftDivider';
import RealityWakeUpSection from '../components/organisms/RealityWakeUpSection';
import ArchitectureOfProfit from '../components/organisms/ArchitectureOfProfit';
import SuccessRoadmap from '../components/organisms/SuccessRoadmap';
import InvestmentTiers from '../components/organisms/InvestmentTiers';
import FAQSection from '../components/organisms/FAQSection';
import BlogInsightSection from '../components/organisms/BlogInsightSection';

// 1. Scale-In-Fade: Spatial depth elevation with optical blur resolve (cards and bento grids)
const scaleInFadeVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.94,
    y: 35,
    filter: 'blur(8px)',
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

// 2. Rotate-In-Up: Subtle 3D perspective tilt that tilts up into plane (for terminals and accordions)
const rotateInUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 45,
    rotateX: 6,
    scale: 0.96,
    filter: 'blur(6px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

// 3. Stagger-Slide-In: Dynamic vertical slide with organic inersia for timelines & roadmaps
const slideInVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.97,
    filter: 'blur(6px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function Page() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'CHESTAADOTCOM',
    image: 'https://chestaa.com/logo.png',
    description: 'Autonomous Business Engine & Jasa Pembuatan Website Modern oleh CHESTAADOTCOM di BSD City & Tangerang.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'BSD City',
      addressRegion: 'Banten',
      addressCountry: 'ID'
    },
    areaServed: ['BSD City', 'Cisauk', 'Tangerang', 'Jakarta', 'Indonesia'],
    url: 'https://chestaa.com',
    priceRange: '$$'
  };

  return (
    <main className="flex flex-col w-full bg-slate-50 text-slate-900 relative min-h-screen selection:bg-purple-900 selection:text-white">
      {/* Inject JSON-LD for Local SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* THE 7-SECTION HIGH-CONVERTING FUNNEL */}
      <div className="flex flex-col w-full relative">

        {/* SECTION 1: HERO SECTION (HeroPurple) */}
        <HeroPurple />

        {/* SOFT LOW-CONTRAST HORIZONTAL RULE 1 */}
        <SoftDivider />

        {/* SECTION 2: REALITY WAKE-UP (Terminal Comparison) - Rotate-In-Up Motion */}
        <div style={{ perspective: 1200 }} className="w-full">
          <motion.div
            variants={rotateInUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <RealityWakeUpSection />
          </motion.div>
        </div>

        {/* SOFT LOW-CONTRAST HORIZONTAL RULE 2 */}
        <SoftDivider />

        {/* SECTION 3: ARCHITECTURE OF PROFIT (Bento Grid) - Scale-In-Fade Motion */}
        <motion.div
          variants={scaleInFadeVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <ArchitectureOfProfit />
        </motion.div>

        {/* SOFT LOW-CONTRAST HORIZONTAL RULE 3 */}
        <SoftDivider />

        {/* SECTION 4: SUCCESS ROADMAP (Timeline & Case Studies) - Slide-In-Stagger Motion */}
        <motion.div
          variants={slideInVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <SuccessRoadmap />
        </motion.div>

        {/* SOFT LOW-CONTRAST HORIZONTAL RULE 4 */}
        <SoftDivider />

        {/* SECTION 5: INVESTMENT TIERS (Pricing Matrices) - Scale-In-Fade Motion */}
        <motion.div
          variants={scaleInFadeVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <InvestmentTiers />
        </motion.div>

        {/* SOFT LOW-CONTRAST HORIZONTAL RULE 5 */}
        <SoftDivider />

        {/* SECTION 6: BLOG INSIGHT SECTION (Dual-Axis Showcase & Stream) - Scale-In-Fade Motion */}
        <motion.div
          variants={scaleInFadeVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <BlogInsightSection />
        </motion.div>

        {/* SOFT LOW-CONTRAST HORIZONTAL RULE 6 */}
        <SoftDivider />

        {/* SECTION 7: FAQ AND EXECUTIVE CTA BANNER - Rotate-In-Up Motion */}
        <div style={{ perspective: 1200 }} className="w-full">
          <motion.div
            variants={rotateInUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <FAQSection />
          </motion.div>
        </div>

      </div>
    </main>
  );
}
