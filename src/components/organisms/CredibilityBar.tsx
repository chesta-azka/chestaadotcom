'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Cpu, Zap, Layers, Award, Terminal } from 'lucide-react';

const CLIENT_PARTNERS = [
  { name: "Nusantara Logistics", sector: "Supply Chain & Fleet", icon: Layers },
  { name: "Medika Digital Prima", sector: "Healthcare & Clinic Booking", icon: ShieldCheck },
  { name: "Kawan Retail Corp", sector: "Omnichannel Commerce", icon: Zap },
  { name: "Samudera Distribusi", sector: "Wholesale & Inventory", icon: Cpu },
  { name: "Bintang Mandiri", sector: "Financial Services", icon: Award },
  { name: "Sinar Niaga Global", sector: "B2B Industrial Trading", icon: Terminal }
];

export default function CredibilityBar() {
  return (
    <div className="w-full bg-slate-50/50 border-y border-purple-100/60 py-8 overflow-hidden relative">
      <div className="absolute inset-0 bg-white/40 backdrop-blur-md pointer-events-none" />
      
      {/* Subtle edge fade masks */}
      <div className="absolute left-0 inset-y-0 w-24 bg-gradient-to-r from-[#fbfbfd] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 inset-y-0 w-24 bg-gradient-to-l from-[#fbfbfd] to-transparent z-10 pointer-events-none" />

      <div className="flex w-full overflow-hidden relative z-10">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 32, ease: "linear" }}
          className="flex whitespace-nowrap items-center gap-12 sm:gap-16 shrink-0"
        >
          {[...CLIENT_PARTNERS, ...CLIENT_PARTNERS, ...CLIENT_PARTNERS].map((partner, idx) => {
            const Icon = partner.icon;
            return (
              <div 
                key={idx} 
                className="group flex items-center gap-3 px-4 py-2 rounded-2xl transition-all duration-300 cursor-default"
              >
                <div className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200/80 flex items-center justify-center text-slate-400 group-hover:text-purple-600 group-hover:bg-purple-50 group-hover:border-purple-200 transition-colors duration-300">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-display font-semibold text-sm tracking-tight text-slate-500 group-hover:text-slate-900 grayscale group-hover:grayscale-0 transition-all duration-300">
                    {partner.name}
                  </span>
                  <span className="text-[10px] font-mono tracking-wider uppercase text-slate-400 group-hover:text-purple-700 transition-colors">
                    {partner.sector}
                  </span>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
