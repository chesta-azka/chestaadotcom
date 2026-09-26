"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, 
  Cpu, 
  Workflow, 
  Bot, 
  Database, 
  Zap, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  ShoppingBag,
  Layers
} from 'lucide-react';

interface ServiceItem {
  id: string;
  title: string;
  category: 'web' | 'ai';
  categoryLabel: string;
  description: string;
  timeline: string;
  price: string;
  features: string[];
  icon: React.ElementType;
  popular?: boolean;
}

const aiWebServices: ServiceItem[] = [
  {
    id: 'base-umkm',
    title: 'Paket Base UMKM & Company Profile',
    category: 'web',
    categoryLabel: 'High-Performance Web',
    description: 'Solusi kilat profesional untuk bisnis lokal dan korporasi yang membutuhkan kehadiran digital berkecepatan tinggi, domain, dan hosting kilat.',
    timeline: '⚡ Pengerjaan 3-5 Hari',
    price: 'Rp 540K',
    features: [
      'Domain .com / .id & Hosting kilat',
      'Desain Apple-Grade Responsive',
      'Optimasi SEO On-Page Dasar',
      'Integrasi WhatsApp Lead Button'
    ],
    icon: Globe,
    popular: true
  },
  {
    id: 'nextjs-enterprise',
    title: 'Enterprise High-Performance Web Architecture',
    category: 'web',
    categoryLabel: 'High-Performance Web',
    description: 'Arsitektur web tingkat lanjut dengan Server-Side Rendering untuk performa sub-detik, SEO ekstrem, dan zero latency.',
    timeline: '⚡ Pengerjaan 7-14 Hari',
    price: 'Rp 1.850K',
    features: [
      'High-Speed App Router & TypeScript',
      'Google Lighthouse 99+ Performance',
      'Secure PostgreSQL / Cloud Data Vault',
      'Full 100% Source Code Ownership'
    ],
    icon: Workflow
  },
  {
    id: 'headless-ecommerce',
    title: 'High-Performance Headless E-Commerce & AI Search',
    category: 'web',
    categoryLabel: 'High-Performance Web',
    description: 'Platform toko online modern berbasis Headless CMS dengan pencarian produk cerdas bertenaga AI untuk konversi penjualan maksimal.',
    timeline: '⚡ Pengerjaan 10-14 Hari',
    price: 'Rp 2.850K',
    features: [
      'Lightning-Fast Headless Checkout',
      'AI Semantic Product Search',
      'Midtrans & Stripe Payment Gateway',
      'Advanced Inventory Dashboard'
    ],
    icon: ShoppingBag
  },
  {
    id: 'agentic-ai-support',
    title: 'Agentic AI Customer Support 24/7',
    category: 'ai',
    categoryLabel: 'Agentic AI & Automation',
    description: 'Integrasi agen AI otonom cerdas berbasis Google Gemini 2.5 untuk melayani pelanggan, menjawab pertanyaan produk, dan menutup transaksi 24 jam.',
    timeline: '⚡ Pengerjaan 5-7 Hari',
    price: 'Rp 2.500K',
    features: [
      'Autonomous WhatsApp & Web Agents',
      'Zero Halusinasi Prompt Engineering',
      'Real-Time Human Handover Trigger',
      'Automated Sentiment & FAQ Logging'
    ],
    icon: Bot,
    popular: true
  },
  {
    id: 'ai-lead-qualifier',
    title: 'Autonomous AI Lead Qualification & CRM Sync',
    category: 'ai',
    categoryLabel: 'Agentic AI & Automation',
    description: 'Sistem agen AI otomatis yang menyaring prospek masuk, melakukan *scoring* prospek berkualitas, dan langsung menyimpannya ke CRM Anda.',
    timeline: '⚡ Pengerjaan 7-10 Hari',
    price: 'Rp 3.500K',
    features: [
      'Instant Lead Screening & Scoring',
      'Automated HubSpot / Sheets Sync',
      'Personalized Outreach Sequences',
      'Instant Sales Team Alert Notification'
    ],
    icon: Cpu
  },
  {
    id: 'custom-rag-knowledge',
    title: 'Custom RAG Knowledge Base & Enterprise LLM',
    category: 'ai',
    categoryLabel: 'Agentic AI & Automation',
    description: 'Implementasi Retrieval-Augmented Generation (RAG) untuk melatih AI menggunakan dokumen internal perusahaan (PDF, SOP, Database) secara aman.',
    timeline: '⚡ Pengerjaan 10-14 Hari',
    price: 'Rp 4.500K',
    features: [
      'Secure Vector Database Embedding',
      'Internal SOP & Manual Training',
      'Strict Data Privacy & Encryption',
      'Executive Analytics & Query Logs'
    ],
    icon: Database
  }
];

const categories = [
  { id: 'all', label: 'Semua Solusi' },
  { id: 'web', label: 'High-Performance Web' },
  { id: 'ai', label: 'Agentic AI & Automation' },
];

export default function ServiceCatalog() {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredServices = activeCategory === 'all' 
    ? aiWebServices 
    : aiWebServices.filter(s => s.category === activeCategory);

  return (
    <section className="py-16 md:py-20 bg-slate-50/40 relative overflow-hidden [background-image:linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] [background-size:4rem_4rem]" id="service-catalog">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-purple-200/25 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200/80 text-purple-700 text-xs font-semibold mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-purple-600 animate-pulse" />
            <span>Spesialisasi Arsitektur Web &amp; Agentic AI</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900 font-display">
            Katalog Solusi High-Performance Web &amp; AI
          </h2>
          <p className="text-slate-600 mt-3 text-base">
            Solusi rekayasa tingkat lanjut yang dirancang khusus untuk mendominasi konversi penjualan dan mengotomatisasi operasional bisnis Anda 24/7.
          </p>
        </motion.div>

        {/* Filter Category Tabs with layoutId */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative px-6 py-3 rounded-full text-xs font-bold tracking-wide transition-all cursor-pointer ${
                  isActive 
                    ? 'text-white' 
                    : 'text-slate-600 hover:text-slate-900 bg-white/80 hover:bg-white border border-purple-100/80 shadow-xs'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-purple-900 rounded-full shadow-md shadow-purple-950/20 -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Services Grid with AnimatePresence popLayout */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
        >
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, index) => {
              const Icon = service.icon;
              const whatsappMsg = encodeURIComponent(`Halo Mas Chesta, saya tertarik untuk memesan layanan "${service.title}" dengan investasi ${service.price}. Mohon informasi lebih lanjut.`);
              const whatsappUrl = `https://wa.me/6282125447232?text=${whatsappMsg}`;

              return (
                <motion.div
                  key={service.id}
                  layout
                  initial={{ opacity: 0, y: 25, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 280, 
                    damping: 24, 
                    delay: index * 0.05 
                  }}
                  className="rounded-3xl bg-white/80 backdrop-blur-2xl border border-purple-100/90 p-8 shadow-xl shadow-purple-900/5 hover:border-purple-300 hover:shadow-2xl hover:shadow-purple-900/10 transition-all duration-300 flex flex-col justify-between relative group overflow-hidden"
                >
                  {/* Popular Badge */}
                  {service.popular && (
                    <div className="absolute top-6 right-6 bg-purple-50 border border-purple-200/80 text-purple-700 text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-2xs">
                      Paling Diminati
                    </div>
                  )}

                  <div>
                    {/* Icon & Timeline */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-purple-900 text-white flex items-center justify-center shadow-md shadow-purple-950/20 group-hover:scale-105 transition-transform">
                        <Icon size={22} />
                      </div>
                      <span className="text-[11px] font-mono font-semibold text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-100/80">
                        {service.timeline}
                      </span>
                    </div>

                    <span className="text-[11px] font-mono font-medium uppercase tracking-widest text-purple-600 block mb-1">
                      {service.categoryLabel}
                    </span>

                    <h3 className="text-xl font-medium font-display text-slate-900 tracking-tight mb-2 group-hover:text-purple-900 transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-slate-600 font-sans text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                      {service.description}
                    </p>

                    {/* Deliverables Checklist */}
                    <div className="space-y-2 mb-8 pt-4 border-t border-purple-100/60">
                      {service.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-700 font-sans">
                          <CheckCircle2 size={14} className="text-purple-600 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pricing & WhatsApp Handover CTA */}
                  <div className="pt-6 border-t border-purple-100/80 flex items-center justify-between gap-4 mt-auto">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">Mulai Investasi</span>
                      <span className="text-lg font-medium font-display text-slate-950">{service.price}</span>
                    </div>

                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-800 to-indigo-900 hover:from-purple-700 hover:to-indigo-800 text-white text-xs font-medium transition-all shadow-md shadow-purple-950/20 group-hover:scale-105 cursor-pointer"
                    >
                      <span>Pesan Layanan</span>
                      <ArrowRight size={14} />
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
