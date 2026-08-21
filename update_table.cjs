const fs = require('fs');

const code = `import React from 'react';
import { Check, Minus } from 'lucide-react';

const features = [
  { category: 'Platform & Design', items: [
    { name: 'Custom UI/UX Design', basic: true, pro: true, enterprise: true },
    { name: 'Mobile Responsive', basic: true, pro: true, enterprise: true },
    { name: 'Premium Animations', basic: false, pro: true, enterprise: true },
    { name: 'Multi-language Support', basic: false, pro: false, enterprise: true }
  ]},
  { category: 'Development & Tech', items: [
    { name: 'Modern Tech Stack', basic: true, pro: true, enterprise: true },
    { name: 'SEO Optimization', basic: 'Basic', pro: 'Advanced', enterprise: 'Enterprise-grade' },
    { name: 'Page Speed Optimization', basic: '< 2.5s', pro: '< 1.5s', enterprise: '< 1s' },
    { name: 'CMS Integration', basic: false, pro: true, enterprise: true },
    { name: 'Custom Backend/API', basic: false, pro: false, enterprise: true }
  ]},
  { category: 'AI & Automation', items: [
    { name: 'Agentic AI Chatbots', basic: false, pro: 'Standard', enterprise: 'Advanced Custom' },
    { name: 'Automated Workflows', basic: false, pro: true, enterprise: true },
    { name: 'Smart Analytics Dashboard', basic: false, pro: false, enterprise: true }
  ]},
  { category: 'Support & Strategy', items: [
    { name: 'Dedicated Project Manager', basic: false, pro: true, enterprise: true },
    { name: 'Post-launch Support', basic: '1 Month', pro: '3 Months', enterprise: '12 Months' },
    { name: 'Digital Strategy Consultation', basic: false, pro: '1 Session', enterprise: 'Ongoing' }
  ]}
];

export default function ServiceComparisonTable() {
  return (
    <section className="py-24 md:py-32 bg-white relative">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-medium text-slate-900 tracking-tight mb-4">
            Paket Layanan & Skalabilitas
          </h2>
          <p className="text-slate-600 font-sans max-w-2xl mx-auto text-lg leading-relaxed">
            Transparansi arsitektur sistem. Temukan rancangan fondasi teknologi yang dirancang secara presisi untuk mengautomasi dan mengakselerasi proses bisnis korporasi Anda.
          </p>
        </div>

        <div className="md:hidden flex items-center justify-center gap-2 text-indigo-500 mb-4 animate-pulse">
          <span className="text-xs font-mono font-bold tracking-widest uppercase">Geser untuk membandingkan</span>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
        </div>
        <div className="overflow-x-auto pb-8 hide-scrollbar cursor-grab active:cursor-grabbing snap-x snap-mandatory">
          <div className="min-w-[900px] w-full pr-4 md:pr-0">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 mb-8 sticky top-0 bg-white/90 backdrop-blur-md z-20 py-4 border-b border-slate-100">
              <div className="col-span-3 flex items-end pb-4">
                <span className="text-sm font-bold text-slate-400 uppercase tracking-widest font-mono">Fitur & Kapabilitas</span>
              </div>
              
              <div className="col-span-3">
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center h-full flex flex-col justify-between">
                  <div>
                    <h3 className="font-display font-semibold text-slate-900 text-xl mb-1">Basic</h3>
                    <p className="text-xs text-slate-500 font-sans mb-4">Esensial digital presence</p>
                  </div>
                  <a href="#pricing" className="mt-auto block w-full py-2.5 px-4 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-colors">
                    Pilih Basic
                  </a>
                </div>
              </div>
              
              <div className="col-span-3 relative">
                <div className="absolute -inset-1 bg-gradient-to-b from-indigo-500 to-indigo-600 rounded-[1.25rem] opacity-20 blur-sm"></div>
                <div className="bg-indigo-600 border border-indigo-500 rounded-2xl p-6 text-center h-full flex flex-col justify-between relative shadow-xl shadow-indigo-900/10">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-indigo-600 text-[10px] font-bold uppercase tracking-widest py-1 px-3 rounded-full shadow-sm whitespace-nowrap">
                    Paling Populer
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-white text-xl mb-1">Professional</h3>
                    <p className="text-xs text-indigo-100 font-sans mb-4">Otomasi cerdas terintegrasi</p>
                  </div>
                  <a href="#pricing" className="mt-auto block w-full py-2.5 px-4 rounded-xl bg-white text-indigo-600 text-xs font-bold uppercase tracking-widest hover:bg-indigo-50 transition-colors shadow-sm">
                    Pilih Pro
                  </a>
                </div>
              </div>

              <div className="col-span-3">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center h-full flex flex-col justify-between">
                  <div>
                    <h3 className="font-display font-semibold text-white text-xl mb-1">Enterprise</h3>
                    <p className="text-xs text-slate-400 font-sans mb-4">Sistem korporasi skala penuh</p>
                  </div>
                  <a href="#pricing" className="mt-auto block w-full py-2.5 px-4 rounded-xl bg-slate-800 text-white border border-slate-700 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-colors">
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
                        <div className="col-span-3 flex items-center gap-2">
                          <span className="text-slate-700 font-sans text-sm">{item.name}</span>
                        </div>
                        
                        <div className="col-span-3 flex items-center justify-center text-center">
                          {typeof item.basic === 'boolean' ? (
                            item.basic ? <Check size={18} className="text-slate-400" /> : <Minus size={18} className="text-slate-300" />
                          ) : (
                            <span className="text-sm font-sans text-slate-600 font-medium">{item.basic}</span>
                          )}
                        </div>
                        
                        <div className="col-span-3 flex items-center justify-center text-center">
                          {typeof item.pro === 'boolean' ? (
                            item.pro ? <Check size={18} className="text-indigo-600 font-bold" /> : <Minus size={18} className="text-slate-300" />
                          ) : (
                            <span className="text-sm font-sans text-indigo-600 font-bold">{item.pro}</span>
                          )}
                        </div>

                        <div className="col-span-3 flex items-center justify-center text-center">
                          {typeof item.enterprise === 'boolean' ? (
                            item.enterprise ? <Check size={18} className="text-slate-900 font-bold" /> : <Minus size={18} className="text-slate-300" />
                          ) : (
                            <span className="text-sm font-sans text-slate-900 font-bold">{item.enterprise}</span>
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
`;

fs.writeFileSync('src/components/organisms/ServiceComparisonTable.tsx', code);
