'use client';

import React from 'react';
import type { Variants } from 'motion/react';
import { motion } from 'motion/react';
import { HeroPurple } from '../components/organisms/HeroPurple';
import GlowingSeparator from '../components/atoms/GlowingSeparator';
import RealityWakeUpSection from '../components/organisms/RealityWakeUpSection';
import ArchitectureOfProfit from '../components/organisms/ArchitectureOfProfit';
import SuccessRoadmap from '../components/organisms/SuccessRoadmap';
import InvestmentTiers from '../components/organisms/InvestmentTiers';
import FAQSection from '../components/organisms/FAQSection';

// Ultra-lean, buttery-smooth section entrance reveal (without scroll-jacking or stacking physics)
const sectionRevealVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
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
    description: 'Autonomous Business Engine & Jasa Pembuatan Website Modern oleh CHESTAADOTCOM.',
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

      {/* THE ULTRA-LEAN 6-SECTION HIGH-CONVERTING FUNNEL */}
      <div className="flex flex-col w-full relative">

        {/* SECTION 1: HERO SECTION (HeroPurple) */}
        {/* Full 100vw edge-to-edge canvas, colossal typography, 3D mouse parallax on asset, masked blur-cascade split-text, magnetic CTA */}
        <HeroPurple />

        {/* BIOLUMINESCENT DATA STREAM SEPARATOR 1 */}
        <div className="w-full max-w-7xl mx-auto px-6">
          <GlowingSeparator />
        </div>

        {/* SECTION 2: REALITY WAKE-UP (Terminal Comparison) */}
        {/* High-contrast dark terminal contrast agitator focusing on profit leak diagnosis */}
        <motion.div
          variants={sectionRevealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <RealityWakeUpSection />
        </motion.div>

        {/* SECTION 3: ARCHITECTURE OF PROFIT (ArchitectureOfProfit - Bento Grid) */}
        {/* Sticky split-screen with continuous scroll of Asymmetrical Bento Grid, 3D hover perspective & static radial bioluminescent glow */}
        {/* Includes Bioluminescent Data Stream Separator 2 at bottom */}
        <motion.div
          variants={sectionRevealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <ArchitectureOfProfit />
        </motion.div>

        {/* SECTION 4: SUCCESS ROADMAP (SuccessRoadmap) */}
        {/* Horizontal 3-step timeline flowing into interactive touch-swipe carousel of concrete case studies */}
        <motion.div
          variants={sectionRevealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <SuccessRoadmap />
        </motion.div>

        {/* SECTION 5: INVESTMENT TIERS (InvestmentTiers) */}
        {/* Transparent pricing matrices where the middle tier (Scale Enterprise) pops out spatially with steady luxury gradient halo */}
        <motion.div
          variants={sectionRevealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <InvestmentTiers />
        </motion.div>

        {/* SECTION 6: FAQ AND EXECUTIVE CTA BANNER (FAQSection) */}
        {/* Minimalist borderless accordion ending seamlessly in massive screen-to-screen deep purple CTA block */}
        <motion.div
          variants={sectionRevealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <FAQSection />
        </motion.div>

      </div>
    </main>
  );
}
