'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Check, ArrowRight } from 'lucide-react';

const TIERS = [
  {
    name: 'Starter',
    price: 'Mulai dari Rp 8jt',
    description: 'Ideal untuk profil profesional atau UMKM yang membutuhkan kehadiran digital berstandar tinggi.',
    features: [
      'Custom Next.js Website',
      'Mobile Responsive Design',
      'SEO Fundamental Setup',
      'Contact Form Integration',
      '1 Bulan Maintenance',
      'Source Code Handover'
    ],
    cta: 'Mulai Proyek',
    highlight: false,
  },
  {
    name: 'Growth',
    price: 'Mulai dari Rp 18jt',
    description: 'Paket terpopuler untuk bisnis lokal yang agresif melakukan ekspansi digital dan optimasi konversi.',
    features: [
      'Advanced Performance (SSR)',
      'E-Commerce & Payment Ready',
      'Topical Authority SEO',
      'Basic AI Chatbot Integration',
      '3 Bulan Maintenance',
      'Cloud Infrastructure Setup',
      'Priority Support'
    ],
    cta: 'Skalakan Bisnis',
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom / Hubungi Kami',
    description: 'Solusi infrastruktur IT lengkap untuk korporasi dengan kebutuhan otomatisasi dan integrasi sistem rumit.',
    features: [
      'Full Stack Web Applications',
      'Agentic AI Workflow Automation',
      'Custom CRM / Dashboard',
      'Bank-Grade Security Audit',
      'Dedicated Support Team',
      'Multi-Region Deployment',
      'SLA Guaranteed'
    ],
    cta: 'Konsultasi Enterprise',
    highlight: false,
  },
];

export default function InvestmentTiers() {
  return (
    <section className="w-full py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[11px] font-mono font-bold uppercase tracking-widest text-purple-600"
          >
            Pricing & Strategy
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-3xl md:text-5xl font-display font-black text-slate-900 tracking-tight"
          >
            Investasi Teknologi Strategis
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-slate-500 max-w-2xl mx-auto text-lg"
          >
            Pilih paket yang sesuai dengan skala bisnis Anda. Seluruh source code menjadi milik Anda sepenuhnya.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TIERS.map((tier, idx) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`relative flex flex-col p-10 bg-white border-2 rounded-2xl transition-all duration-500 group ${
                tier.highlight 
                  ? 'border-violet-600 shadow-2xl shadow-violet-100 scale-105 z-10' 
                  : 'border-slate-100 hover:border-violet-200 shadow-sm'
              }`}
            >
              {tier.highlight && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-violet-600 text-white text-[10px] font-bold px-4 py-1.5 uppercase tracking-widest rounded-full shadow-lg">
                  Terpopuler untuk Bisnis Lokal
                </div>
              )}

              <div className="mb-8">
                <h3 className={`text-xl font-black tracking-tight uppercase ${tier.highlight ? 'text-violet-600' : 'text-slate-900'}`}>
                  {tier.name}
                </h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-black text-slate-900 tracking-tighter">{tier.price}</span>
                </div>
                <p className="mt-6 text-slate-500 text-sm leading-relaxed font-medium">
                  {tier.description}
                </p>
              </div>

              <div className="flex-1 space-y-5 mb-10 pt-8 border-t border-slate-50">
                {tier.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-4">
                    <div className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center transition-colors ${tier.highlight ? 'bg-violet-600 text-white' : 'bg-slate-100 text-slate-400 group-hover:text-violet-600 group-hover:bg-violet-50'}`}>
                      <Check size={12} strokeWidth={4} />
                    </div>
                    <span className="text-slate-600 text-sm font-semibold">{feature}</span>
                  </div>
                ))}
              </div>

              <motion.a
                href="https://wa.me/6282125447232"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-5 rounded-xl font-bold text-sm uppercase tracking-wider text-center flex items-center justify-center gap-3 transition-all cursor-pointer shadow-sm ${
                  tier.highlight
                    ? 'bg-violet-600 text-white hover:bg-violet-700 shadow-violet-200'
                    : 'bg-slate-900 text-white hover:bg-slate-800'
                }`}
              >
                {tier.cta}
                <ArrowRight size={18} />
              </motion.a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
