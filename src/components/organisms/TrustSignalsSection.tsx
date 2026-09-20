import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Award, Building2, Factory, Landmark, Briefcase } from 'lucide-react';

const trustItems = [
  { name: "RetailFashion ID", category: "E-Commerce", icon: Building2 },
  { name: "GudangLokal Supply", category: "Logistics", icon: Factory },
  { name: "Seino Indomobil", category: "Fleet", icon: Building2 },
  { name: "Delta Legal Partners", category: "Corporate Law", icon: Landmark },
  { name: "Griya Cisauk Properti", category: "Real Estate", icon: Briefcase },
  { name: "Fortanara Security", category: "Cybersecurity", icon: ShieldCheck },
];

const credentials = [
  { title: "ISO 27001 Aligned", desc: "Standar enkripsi data & privasi tingkat lanjut." },
  { title: "Google Cloud Partner", desc: "Infrastruktur cloud berkecepatan tinggi & uptime 99.9%." },
  { title: "React & Next.js Certified", desc: "Arsitektur frontend termutakhir dengan skor SEO 100." },
];

export default function TrustSignalsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest block mb-2">
            Trusted Authority
          </span>
          <h3 className="text-2xl sm:text-3xl font-display font-black text-slate-900 tracking-tight">
            Dipercaya Oleh Berbagai Sektor Industri
          </h3>
        </div>

        {/* Client Logos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {trustItems.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 flex flex-col items-center text-center justify-center hover:border-slate-300 transition-all"
            >
              <div className="w-8 h-8 rounded-xl bg-white text-slate-700 flex items-center justify-center mb-2 shadow-2xs">
                <item.icon size={16} />
              </div>
              <h4 className="font-display font-bold text-slate-900 text-xs mb-0.5">{item.name}</h4>
              <span className="text-[9px] font-mono text-slate-400 uppercase">{item.category}</span>
            </div>
          ))}
        </div>

        {/* Credentials Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200/80">
          {credentials.map((cred, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 mt-0.5">
                <Award size={16} />
              </div>
              <div>
                <h4 className="font-display font-bold text-slate-900 text-sm mb-0.5">{cred.title}</h4>
                <p className="text-xs text-slate-500 font-sans leading-relaxed">{cred.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
