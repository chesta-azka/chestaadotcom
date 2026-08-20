import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Minus, Info } from 'lucide-react';
import LeadCaptureForm from './LeadCaptureForm'; // We'll assume they can click "Start" and maybe it opens the quote or scrolls down

const features = [
  { category: 'Platform & Design', items: [
    { name: 'Custom UI/UX Design', standard: true, premium: true },
    { name: 'Mobile Responsive', standard: true, premium: true },
    { name: 'Premium Animations', standard: false, premium: true },
    { name: 'Multi-language Support', standard: false, premium: 'Optional' }
  ]},
  { category: 'Development & Tech', items: [
    { name: 'Modern Tech Stack (React/Next.js)', standard: true, premium: true },
    { name: 'SEO Optimization', standard: 'Basic', premium: 'Advanced' },
    { name: 'Page Speed Optimization', standard: '< 2.5s', premium: '< 1s' },
    { name: 'CMS Integration', standard: true, premium: true }
  ]},
  { category: 'AI & Automation', items: [
    { name: 'Agentic AI Chatbots', standard: false, premium: true },
    { name: 'Automated Workflows', standard: false, premium: true },
    { name: 'AI Content Generation', standard: false, premium: true },
    { name: 'Smart Analytics Dashboard', standard: false, premium: true }
  ]},
  { category: 'Support & Strategy', items: [
    { name: 'Dedicated Project Manager', standard: false, premium: true },
    { name: 'Post-launch Support', standard: '1 Month', premium: '3 Months' },
    { name: 'Digital Strategy Consultation', standard: false, premium: true }
  ]}
];

export default function ServiceComparisonTable() {
  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-medium text-slate-900 tracking-tight mb-4">
            Perbandingan Ekosistem
          </h2>
          <p className="text-slate-600 font-sans max-w-2xl mx-auto text-lg leading-relaxed">
            Pilih arsitektur yang paling sesuai dengan skala dan ambisi transformasi bisnis Anda.
          </p>
        </div>

        <div className="overflow-x-auto pb-8 hide-scrollbar">
          <div className="min-w-[768px] w-full">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 mb-8 sticky top-0 bg-white/90 backdrop-blur-md z-20 py-4 border-b border-slate-100">
              <div className="col-span-5 flex items-end pb-4">
                <span className="text-sm font-bold text-slate-400 uppercase tracking-widest font-mono">Fitur & Kapabilitas</span>
              </div>
              
              <div className="col-span-3">
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center h-full flex flex-col justify-between">
                  <div>
                    <h3 className="font-display font-semibold text-slate-900 text-xl mb-1">Standard</h3>
                    <p className="text-xs text-slate-500 font-sans mb-4">Esensial digital presence</p>
                  </div>
                  <a href="#pricing" className="mt-auto block w-full py-2.5 px-4 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-colors">
                    Pilih
                  </a>
                </div>
              </div>
              
              <div className="col-span-4 relative">
                <div className="absolute -inset-1 bg-gradient-to-b from-indigo-500 to-indigo-600 rounded-[1.25rem] opacity-20 blur-sm"></div>
                <div className="bg-indigo-600 border border-indigo-500 rounded-2xl p-6 text-center h-full flex flex-col justify-between relative shadow-xl shadow-indigo-900/10">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-indigo-600 text-[10px] font-bold uppercase tracking-widest py-1 px-3 rounded-full shadow-sm">
                    Rekomendasi
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-white text-xl mb-1">Premium AI-Driven</h3>
                    <p className="text-xs text-indigo-100 font-sans mb-4">Otomasi cerdas terintegrasi</p>
                  </div>
                  <a href="#pricing" className="mt-auto block w-full py-2.5 px-4 rounded-xl bg-white text-indigo-600 text-xs font-bold uppercase tracking-widest hover:bg-indigo-50 transition-colors shadow-sm">
                    Konsultasi
                  </a>
                </div>
              </div>
            </div>

            {/* Table Body */}
            <div className="space-y-12">
              {features.map((category, idx) => (
                <div key={idx} className="space-y-4">
                  <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-12">
                      <h4 className="text-lg font-display font-medium text-slate-900 border-b border-slate-100 pb-2">
                        {category.category}
                      </h4>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {category.items.map((item, itemIdx) => (
                      <div key={itemIdx} className="grid grid-cols-12 gap-4 py-3 hover:bg-slate-50/50 rounded-xl px-2 transition-colors group">
                        <div className="col-span-5 flex items-center gap-2">
                          <span className="text-slate-700 font-sans text-sm">{item.name}</span>
                        </div>
                        
                        <div className="col-span-3 flex items-center justify-center text-center">
                          {typeof item.standard === 'boolean' ? (
                            item.standard ? <Check size={18} className="text-slate-400" /> : <Minus size={18} className="text-slate-300" />
                          ) : (
                            <span className="text-sm font-sans text-slate-600 font-medium">{item.standard}</span>
                          )}
                        </div>
                        
                        <div className="col-span-4 flex items-center justify-center text-center">
                          {typeof item.premium === 'boolean' ? (
                            item.premium ? <Check size={18} className="text-indigo-600 font-bold" /> : <Minus size={18} className="text-slate-300" />
                          ) : (
                            <span className="text-sm font-sans text-indigo-600 font-bold">{item.premium}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
