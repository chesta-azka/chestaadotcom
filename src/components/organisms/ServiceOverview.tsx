'use client';

import React from 'react';
import { motion } from 'motion/react';
import { 
  Globe, 
  Cpu, 
  Zap, 
  CheckCircle2, 
  ArrowRight, 
  MessageSquare, 
  Sparkles,
  Search,
  Code2,
  Bot,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface OverviewCardProps {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  icon: React.ElementType;
  whatsappMsg: string;
  href: string;
  index: number;
}

const OverviewCard = ({ title, subtitle, description, features, icon: Icon, whatsappMsg, href, index }: OverviewCardProps) => {
  const whatsappUrl = `https://wa.me/6282125447232?text=${encodeURIComponent(whatsappMsg)}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 25, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ 
        type: "spring", 
        stiffness: 280, 
        damping: 24, 
        delay: index * 0.1 
      }}
      className="group relative flex flex-col justify-between rounded-3xl bg-white/80 backdrop-blur-2xl border border-purple-100/90 p-8 sm:p-10 shadow-xl shadow-purple-900/5 hover:border-purple-300 transition-all duration-300 overflow-hidden"
    >
      {/* Decorative Internal Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-purple-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-purple-900 text-white shadow-lg shadow-purple-950/20 group-hover:scale-110 transition-transform duration-300">
            <Icon size={28} />
          </div>
          <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-purple-600 px-3 py-1 bg-purple-50 rounded-full border border-purple-100">
            Pillar {index + 1}
          </div>
        </div>

        <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-purple-700 block mb-2">
          {subtitle}
        </span>
        
        <h3 className="text-2xl sm:text-3xl font-display font-black tracking-tight text-slate-900 mb-4 group-hover:text-purple-900 transition-colors">
          {title}
        </h3>
        
        <p className="text-slate-600 font-sans text-sm sm:text-base leading-relaxed mb-8 font-light max-w-md">
          {description}
        </p>

        <div className="space-y-3 mb-10 pt-6 border-t border-purple-100/60">
          {features.map((feature, i) => (
            <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 font-sans">
              <CheckCircle2 size={16} className="text-purple-600 shrink-0 mt-0.5" />
              <span className="leading-tight">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 pt-6 border-t border-purple-100/80 flex flex-col sm:flex-row items-center gap-4">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-purple-900 hover:bg-purple-800 text-white text-xs sm:text-sm font-bold transition-all shadow-lg shadow-purple-950/20 group-hover:scale-[1.02] cursor-pointer"
        >
          <MessageSquare size={16} />
          <span>Konsultasi Cepat</span>
        </a>
        
        <Link
          to={href}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white border border-slate-200 text-slate-700 text-xs sm:text-sm font-bold hover:bg-slate-50 hover:border-slate-300 transition-all group/btn"
        >
          <span>Pelajari Detail</span>
          <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
};

export default function ServiceOverview() {
  const overviewItems = [
    {
      title: "Mesin Pencetak Uang Otomatis & Penjualan Kilat",
      subtitle: "Commercial Architecture",
      description: "Website terbuka seketika. Kunci perhatian calon pembeli di detik pertama sebelum mereka kabur ke kompetitor, didukung sistem verifikasi order anti-salah input.",
      features: [
        "Website Terbuka Seketika (Tanpa Loading Lama)",
        "Sistem Otomatis Anti-Salah Input (Admin Bebas Pusing)",
        "Aset 100% Milik Anda (Bebas Biaya Sewa Bulanan)",
        "Tombol WhatsApp Direct-to-Sales Format Rapi"
      ],
      icon: Zap,
      whatsappMsg: "Halo Mas Chesta, saya tertarik untuk memesan Mesin Pencetak Uang Otomatis (Website Penjualan Kilat) untuk bisnis saya.",
      href: "/services/web"
    },
    {
      title: "Asisten AI Otonom 24/7 & Pemangkas Gaji Admin",
      subtitle: "Operational Profit & Cost Reduction",
      description: "Sistem asisten cerdas otonom yang bekerja tanpa henti 24/7 untuk menjawab chat pelanggan, melakukan kualifikasi prospek, dan memangkas biaya operasional admin hingga 70%.",
      features: [
        "Asisten Penjual & Support Otomatis Tanpa Tidur",
        "Penyaringan Prospek & Scoring Calon Pembeli",
        "Pemangkasan Biaya Payroll Admin hingga 70%",
        "Basis Pengetahuan Perusahaan yang Aman & Privat"
      ],
      icon: Bot,
      whatsappMsg: "Halo Mas Chesta, saya tertarik untuk mengintegrasikan Asisten AI Otonom ke dalam operasional bisnis saya.",
      href: "/services/ai"
    }
  ];

  return (
    <section className="py-16 md:py-20 relative bg-slate-50/40 overflow-hidden [background-image:linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] [background-size:4rem_4rem]" id="service-overview">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-200/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200/80 text-purple-700 text-xs font-semibold mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-purple-600 animate-pulse" />
            <span>Mesin Pencetak Uang Otomatis</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 font-display">
            Solusi Nyata untuk Pendapatan <br className="hidden sm:block" /> &amp; Efisiensi Bisnis Anda
          </h2>
          <p className="text-slate-600 mt-4 text-base sm:text-lg font-light leading-relaxed">
            Fokus pada dua pilar profit utama: mendominasi penjualan tanpa jeda dan memangkas biaya operasional admin secara drastis.
          </p>
        </motion.div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {overviewItems.map((item, idx) => (
            <OverviewCard key={idx} {...item} index={idx} />
          ))}
        </div>

        {/* Bottom Trust Signal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-wrap items-center justify-center gap-6 text-[10px] sm:text-xs font-mono font-bold text-slate-400 uppercase tracking-widest px-8 py-4 bg-white/50 backdrop-blur-sm border border-purple-100/50 rounded-2xl">
            <span className="flex items-center gap-2">
              <TrendingUp size={14} className="text-purple-500" />
              Maksimalisasi Revenue
            </span>
            <span className="w-1 h-1 bg-slate-300 rounded-full hidden sm:block" />
            <span className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-purple-500" />
              Sistem Anti-Salah Input
            </span>
            <span className="w-1 h-1 bg-slate-300 rounded-full hidden sm:block" />
            <span className="flex items-center gap-2">
              <Cpu size={14} className="text-purple-500" />
              Operasional 24/7 Tanpa Jeda
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
