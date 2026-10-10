'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Cpu, 
  Building2, 
  Globe, 
  Zap, 
  ChevronRight, 
  Layers, 
  Search, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Rocket, 
  MapPin 
} from 'lucide-react';
import { SEO_SERVICES } from '../../data/seo-services';

const CATEGORY_MAP = {
  'ai-enterprise': {
    label: 'Enterprise AI & Automation',
    icon: Cpu,
    color: 'bg-blue-50 text-blue-700 border-blue-100',
    accent: 'purple',
    description: 'Kecerdasan buatan, machine learning, dan agen otonom untuk efisiensi korporat.'
  },
  'erp-systems': {
    label: 'Business Operations & ERP',
    icon: Building2,
    color: 'bg-purple-50 text-purple-700 border-purple-100',
    accent: 'indigo',
    description: 'Sistem manajemen terpadu untuk keuangan, HR, logistik, dan rantai pasok.'
  },
  'web-ecommerce': {
    label: 'Digital Marketing & Web',
    icon: Globe,
    color: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    accent: 'emerald',
    description: 'Website B2B premium, e-commerce skala besar, dan optimasi konversi digital.'
  },
  'it-transformation': {
    label: 'Custom Software & IT',
    icon: Zap,
    color: 'bg-amber-50 text-amber-700 border-amber-100',
    accent: 'amber',
    description: 'Transformasi digital menyeluruh, software kustom, dan arsitektur IT modern.'
  }
};

export default function ServiceHubPage() {
  const categories = Object.keys(CATEGORY_MAP) as (keyof typeof CATEGORY_MAP)[];

  return (
    <div className="min-h-screen bg-[#fbfbfd] text-slate-900 pt-32 pb-24">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 space-y-24">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-8 max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)] text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em]">
            <Sparkles size={12} className="text-purple-500" />
            <span>Katalog Solusi Digital Chestaa</span>
          </div>
          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-slate-950 leading-[1.1] selection:bg-purple-100">
            Arsitektur Bisnis <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Era Masa Depan</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto font-medium">
            Chestaa menghadirkan ekosistem teknologi terintegrasi. Dari otomasi alur kerja hingga sistem ERP nasional yang presisi.
          </p>
        </motion.div>

        {/* Categories Hub (The Silos) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((catKey, idx) => {
            const cat = CATEGORY_MAP[catKey];
            const Icon = cat.icon;
            return (
              <motion.div 
                key={catKey}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative p-10 rounded-[40px] bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.04)] hover:-translate-y-2 transition-all duration-500 overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-500">
                  <Icon size={120} />
                </div>
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 border transition-transform duration-500 group-hover:scale-110 ${cat.color}`}>
                  <Icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-950 mb-4 tracking-tight">{cat.label}</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-8 font-medium">
                  {cat.description}
                </p>
                <Link 
                  href={catKey === 'ai-enterprise' ? '/services/ai-integration' : `#${catKey}`}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-900 group-hover:text-purple-600 transition-colors"
                >
                  Eksplorasi Solusi
                  <div className="w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-all">
                    <ArrowRight size={12} />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Detailed Services Marketplace */}
        <div className="space-y-32">
          {categories.map((catKey) => {
            const cat = CATEGORY_MAP[catKey];
            const services = SEO_SERVICES.filter(s => s.category === catKey);
            
            return (
              <section key={catKey} id={catKey} className="scroll-mt-32 space-y-12">
                {/* Section Header */}
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 pb-12">
                    <div className="space-y-4">
                      <h2 className="text-4xl font-extrabold text-slate-950 tracking-tight">
                        {cat.label}
                      </h2>
                      <p className="text-slate-500 max-w-xl font-medium leading-relaxed">
                        Kami menyediakan arsitektur digital end-to-end yang mengintegrasikan {cat.label.toLowerCase()} ke dalam operasional inti perusahaan Anda.
                      </p>
                    </div>
                    <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-slate-50 border border-slate-100 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                      <Layers size={14} />
                      {services.length} Total Modules
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {services.map((service) => (
                    <motion.div
                      key={service.id}
                      whileHover={{ scale: 1.01, y: -2 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="group relative border border-slate-200 hover:border-purple-300 hover:shadow-2xl hover:shadow-purple-900/10 transition-all bg-white rounded-2xl overflow-hidden"
                    >
                      <Link 
                        href={`/services/${service.id}`}
                        className="flex flex-col h-full p-8 relative z-10"
                      >
                        <div className="relative z-10 space-y-6">
                          <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300 shadow-inner">
                            <Sparkles size={24} />
                          </div>
                          
                          <div className="space-y-3">
                            <h4 className="text-xl font-bold text-slate-900 group-hover:text-purple-700 transition-colors duration-300 leading-tight tracking-tight">
                              {service.name}
                            </h4>
                            <p className="text-sm text-slate-500 line-clamp-3 leading-relaxed font-medium group-hover:text-slate-600">
                              {service.description}
                            </p>
                          </div>
                        </div>

                        <div className="relative z-10 mt-auto pt-8 flex items-center justify-between border-t border-slate-100">
                          <div className="flex flex-col">
                            <span className="text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-slate-400 group-hover:text-purple-600 transition-colors">
                              CHESTAA CORE
                            </span>
                            <span className="text-[10px] font-bold text-slate-400 group-hover:text-slate-600">
                              Enterprise v4.5
                            </span>
                          </div>
                          <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300 transform group-hover:rotate-[-45deg]">
                            <ArrowRight size={16} />
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        {/* Regional Strategic Expansion */}
        <section className="py-24 bg-slate-950 rounded-[64px] px-8 sm:px-20 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-indigo-900/20" />
          <div className="absolute -top-1/4 -right-1/4 w-full h-full opacity-10 pointer-events-none">
            <Globe className="w-full h-full scale-150 animate-[spin_60s_linear_infinite]" />
          </div>
          
          <div className="relative z-10 space-y-16">
            <div className="max-w-3xl space-y-6">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-purple-400 text-[10px] font-bold uppercase tracking-[0.2em]">
                <MapPin size={12} />
                <span>Regional Hubs</span>
              </div>
              <h2 className="text-4xl sm:text-6xl font-bold tracking-tight">Ekspansi Lokal <br /> <span className="text-purple-400 italic">Strategis</span></h2>
              <p className="text-slate-400 text-lg leading-relaxed max-w-2xl font-medium">
                Kami memahami dinamika bisnis di pusat-pusat ekonomi utama Indonesia. Chestaa siap menghadirkan sesi konsultasi tatap muka langsung di wilayah prioritas perusahaan Anda.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {[
                { name: 'BSD City', slug: 'bsd-city' },
                { name: 'SCBD Jakarta', slug: 'scbd' },
                { name: 'Gading Serpong', slug: 'gading-serpong' },
                { name: 'Kelapa Gading', slug: 'kelapa-gading' },
                { name: 'Surabaya Hub', slug: 'surabaya' },
                { name: 'Bandung Tech', slug: 'bandung' }
              ].map((hub) => (
                <Link 
                  key={hub.slug}
                  href={`/area/${hub.slug}`}
                  className="p-8 rounded-[32px] bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-500/30 transition-all text-center space-y-4 group backdrop-blur-sm"
                >
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center mx-auto text-purple-400 group-hover:scale-110 transition-transform duration-500">
                    <Layers size={24} />
                  </div>
                  <span className="block text-sm font-bold tracking-tight">{hub.name}</span>
                </Link>
              ))}
            </div>

            <div className="pt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-10">
              <div className="space-y-2">
                <p className="text-slate-400 text-sm font-medium italic">
                  *Audit infrastruktur IT on-site tersedia untuk wilayah prioritas tersebut.
                </p>
                <div className="flex items-center gap-4 text-[10px] font-bold text-slate-500 tracking-widest uppercase">
                  <span>SLA 24 Jam</span>
                  <span className="w-1 h-1 rounded-full bg-slate-700" />
                  <span>On-Site Support</span>
                  <span className="w-1 h-1 rounded-full bg-slate-700" />
                  <span>Enterprise Grade</span>
                </div>
              </div>
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://wa.me/6282125447232" 
                className="px-10 py-5 bg-purple-600 hover:bg-purple-700 text-white rounded-[24px] font-extrabold text-sm transition-all shadow-[0_10px_40px_rgba(126,34,206,0.3)]"
              >
                Jadwalkan Kunjungan Lokasi
              </motion.a>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
