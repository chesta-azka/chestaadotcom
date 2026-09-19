"use client"

import { ChevronRight, Sparkles } from "lucide-react"
import { Button } from "../ui/button"

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
  eyebrow = "Layanan IT & Otomasi Bisnis",
  title = "Sistem Digital & Otomasi untuk Bisnis Modern",
  subtitle = "Kami membangun web aplikasi cepat, aman, dan mengotomatisasi alur kerja operasional Anda tanpa hambatan.",
  ctaLabel = "Mulai Konsultasi",
  ctaHref = "#contact",
  secondaryCtaLabel = "Lihat Layanan",
  secondaryCtaHref = "#services",
}: HeroProps) {
  return (
    <section
      id="hero"
      // PERBAIKAN UTAMA: Tambah pt-32 / pt-40 di sini agar tidak tertutup navbar fixed
      className="relative mx-auto w-full pt-32 md:pt-40 pb-20 px-6 text-center md:px-8 
      min-h-[calc(100vh-40px)] overflow-hidden 
      bg-[linear-gradient(to_bottom,#ffffff,#faf5ff_60%,#f3e8ff_100%)]
      text-slate-900 rounded-b-3xl"
    >
      {/* Grid BG dengan aksen ungu tipis */}
      <div
        className="absolute -z-10 inset-0 opacity-60 h-[700px] w-full 
        bg-[linear-gradient(to_right,#e2d9f3_1px,transparent_1px),linear-gradient(to_bottom,#e2d9f3_1px,transparent_1px)] 
        bg-[size:4rem_4rem] 
        [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]"
      />

      {/* Radial Glow */}
      <div
        className="absolute left-1/2 top-[calc(100%-120px)] lg:top-[calc(100%-180px)] 
        h-[400px] w-[600px] md:h-[500px] md:w-[900px] lg:h-[650px] lg:w-[1200px] 
        -translate-x-1/2 rounded-[100%] border border-purple-300/60 
        bg-[radial-gradient(closest-side,rgba(168,85,247,0.15)_0%,rgba(255,255,255,1)_80%)] 
        pointer-events-none"
      />

      {/* Eyebrow Badge */}
      {eyebrow && (
        <a href={ctaHref} className="group inline-block mb-6">
          <span
            className="text-xs md:text-sm text-purple-700 font-medium px-4 py-2 
            bg-purple-50/80 backdrop-blur-md 
            border border-purple-200/80 shadow-sm
            rounded-full w-fit tracking-wide uppercase flex items-center justify-center gap-2
            transition-all duration-300 group-hover:border-purple-400 group-hover:bg-purple-100/80"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            {eyebrow}
            <ChevronRight className="inline w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </a>
      )}

      {/* Title (Lebih simpel & direct) */}
      <h1
        className="mx-auto max-w-4xl text-balance 
        bg-gradient-to-br from-slate-900 via-slate-800 to-purple-950 
        bg-clip-text py-2 text-4xl font-bold tracking-tight 
        text-transparent sm:text-5xl md:text-6xl lg:text-7xl leading-[1.15]"
      >
        {title}
      </h1>

      {/* Subtitle */}
      <p
        className="mx-auto max-w-2xl my-6 text-balance 
        text-base sm:text-lg text-slate-600 font-normal leading-relaxed"
      >
        {subtitle}
      </p>

      {/* CTA Group */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 z-20 relative mt-8">
        {ctaLabel && (
          <Button
            asChild
            size="lg"
            className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white font-medium text-base px-8 py-6 rounded-xl shadow-lg shadow-purple-600/20 transition-all duration-300"
          >
            <a href={ctaHref}>{ctaLabel}</a>
          </Button>
        )}
        
        {secondaryCtaLabel && (
          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full sm:w-auto border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium text-base px-8 py-6 rounded-xl transition-all duration-300"
          >
            <a href={secondaryCtaHref}>{secondaryCtaLabel}</a>
          </Button>
        )}
      </div>
    </section>
  )
}
