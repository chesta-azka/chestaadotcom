"use client"

import React, { useRef } from "react"
import { ArrowRight } from "lucide-react"
import { motion } from "motion/react"
import Link from "next/link"
import MagneticButton from "../atoms/MagneticButton"

interface HeroProps {
  eyebrow?: string
  title?: string
  subtitle?: string
  ctaLabel?: string
  ctaHref?: string
  secondaryCtaLabel?: string
  secondaryCtaHref?: string
}

export function HeroPurple({
  eyebrow = "Principal Digital Architecture & AI Automation Hub",
  title = "Arsitektur AI Enterprise. Dominasi Pasar Digital.",
  subtitle = "Chestaa menghadirkan infrastruktur teknologi performa tinggi, sistem ERP kustom, dan otomasi AI otonom untuk akselerasi pertumbuhan korporat Anda.",
  ctaLabel = "Konsultasi Strategis via WhatsApp",
  ctaHref = "https://wa.me/6282125447232?text=Halo%20Mas%20Chesta,%20saya%20ingin%20berdiskusi%20mengenai%20arsitektur%20AI%20enterprise%20dan%20modernisasi%20sistem%20bisnis.",
  secondaryCtaLabel = "Jelajahi Katalog Solusi",
  secondaryCtaHref = "/services",
}: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!heroRef.current) return;
  };

  const handleMouseLeave = () => {};

  const titleWords = title.split(" ");

  return (
    <section
      ref={heroRef}
      id="hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative mx-auto w-full pt-28 md:pt-36 pb-16 md:pb-24 px-4 sm:px-6 md:px-8 text-center flex flex-col justify-center items-center bg-gradient-to-b from-white via-slate-50/50 to-white overflow-hidden"
    >
      {/* Clean Subtle Atmosphere */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true" />

      <div className="max-w-7xl mx-auto flex flex-col items-center gap-8 relative z-20 w-full">
        
        {/* Editorial Eyebrow (Zero Pill, Pure Typography) */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-xs font-mono font-semibold tracking-[0.22em] text-slate-500 uppercase"
        >
          {eyebrow}
        </motion.p>

        {/* MASKED BLUR-CASCADE SPLIT-TEXT REVEAL FOR MAIN HEADLINE */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-medium tracking-tight text-slate-950 leading-[1.06] text-balance max-w-5xl mx-auto">
          {titleWords.map((word, index) => (
            <span key={index} className="inline-block overflow-hidden mr-[0.25em] align-top py-1">
              <motion.span
                initial={{ y: 30, opacity: 0, filter: "blur(15px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                transition={{
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.08 + index * 0.06,
                }}
                className="inline-block"
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Updated Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          className="text-slate-600 text-base md:text-lg font-normal max-w-3xl leading-relaxed text-balance mx-auto"
        >
          {subtitle}
        </motion.p>

        {/* Magnetic CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 mb-10"
        >
          <MagneticButton
            href={ctaHref}
            className="px-8 py-4 bg-purple-900 hover:bg-purple-800 text-white rounded-2xl font-medium text-sm shadow-sm hover:shadow transition-all border border-purple-800 whitespace-nowrap cursor-pointer"
            strength={28}
          >
            <span>{ctaLabel}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </MagneticButton>

          <MagneticButton
            href={secondaryCtaHref}
            className="px-6 py-4 bg-white text-slate-800 border border-slate-200/90 hover:border-purple-300 rounded-2xl font-medium text-sm hover:bg-purple-50/40 transition-colors whitespace-nowrap cursor-pointer shadow-xs"
            strength={20}
          >
            {secondaryCtaLabel}
          </MagneticButton>
        </motion.div>

        {/* SECTION: 01 — CARA KAMI BERPIKIR (Fully Left-Aligned, Editorial Layout, Zero Icons, No AI Slop) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-7xl mx-auto pt-16 md:pt-24 pb-8 text-left relative"
        >
          {/* Editorial Top Border Divider */}
          <div className="w-full h-px bg-slate-200/90 mb-12 sm:mb-16" aria-hidden="true" />

          {/* Section Header: Fully Left Aligned ("fully kiri biar makin power full") */}
          <div className="max-w-4xl space-y-4 mb-14 sm:mb-16">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-semibold tracking-[0.2em] text-purple-700 uppercase">
                01 — CARA KAMI BERPIKIR
              </span>
              <span className="w-12 h-px bg-purple-200" aria-hidden="true" />
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-slate-950 tracking-tight leading-[1.12]">
              Memahami bisnis Anda adalah langkah pertama kami.
            </h2>

            <p className="text-base sm:text-lg font-sans text-slate-600 leading-relaxed font-normal pt-1 max-w-3xl">
              Setiap perusahaan memiliki proses, tantangan, dan prioritas yang berbeda. Kami mempelajari cara bisnis Anda bekerja, lalu merancang solusi yang membantu tim menyelesaikan pekerjaan dengan lebih mudah.
            </p>
          </div>

          {/* 3 Pillars (Compact Small Typography) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 border-t border-slate-200/80 pt-6 sm:pt-8">
            <div className="text-left space-y-1">
              <span className="font-mono text-[11px] font-bold text-purple-700 block">01</span>
              <p className="text-xs sm:text-sm font-medium text-slate-800 tracking-normal leading-snug">
                Berangkat dari kebutuhan
              </p>
            </div>

            <div className="text-left space-y-1">
              <span className="font-mono text-[11px] font-bold text-purple-700 block">02</span>
              <p className="text-xs sm:text-sm font-medium text-slate-800 tracking-normal leading-snug">
                Prioritas disepakati bersama
              </p>
            </div>

            <div className="text-left space-y-1">
              <span className="font-mono text-[11px] font-bold text-purple-700 block">03</span>
              <p className="text-xs sm:text-sm font-medium text-slate-800 tracking-normal leading-snug">
                Penerapan secara bertahap
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
