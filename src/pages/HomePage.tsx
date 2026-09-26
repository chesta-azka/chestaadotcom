'use client';

import React from 'react';
import type { Variants } from 'motion/react';
import { motion } from 'motion/react';
import SEOMetadata from '../components/atoms/SEOMetadata';
import { HeroPurple } from '../components/organisms/HeroPurple';
import SoftDivider from '../components/atoms/SoftDivider';
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

export default function HomePage() {
  return (
    <div className="flex flex-col w-full bg-slate-50 text-slate-900 relative min-h-screen selection:bg-purple-900 selection:text-white">
      <SEOMetadata 
        title="Dominasi Pasar Digital. Amankan Profit Maksimal. | CHESTAADOTCOM"
        description="Sistem otonom berkecepatan tinggi yang melayani pelanggan 24/7. Pangkas biaya operasional admin dan dominasi pasar dengan arsitektur digital kelas enterprise."
      />

      {/* THE ULTRA-LEAN 6-SECTION HIGH-CONVERTING FUNNEL */}
      <div className="flex flex-col w-full relative">

        {/* SECTION 1: HERO SECTION (HeroPurple) */}
        {/* Full 100vw edge-to-edge canvas, colossal typography, 3D mouse parallax on asset, masked blur-cascade split-text, magnetic CTA */}
        <HeroPurple />

        {/* SOFT LOW-CONTRAST HORIZONTAL RULE 1 */}
        <SoftDivider />

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

        {/* SOFT LOW-CONTRAST HORIZONTAL RULE 2 */}
        <SoftDivider />

        {/* SECTION 3: ARCHITECTURE OF PROFIT (ArchitectureOfProfit - Bento Grid) */}
        {/* Sticky split-screen with continuous scroll of Asymmetrical Bento Grid, 3D hover perspective & static radial bioluminescent glow */}
        <motion.div
          variants={sectionRevealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <ArchitectureOfProfit />
        </motion.div>

        {/* SOFT LOW-CONTRAST HORIZONTAL RULE 3 */}
        <SoftDivider />

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

        {/* SOFT LOW-CONTRAST HORIZONTAL RULE 4 */}
        <SoftDivider />

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

        {/* SOFT LOW-CONTRAST HORIZONTAL RULE 5 */}
        <SoftDivider />

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
    </div>
  );
}
