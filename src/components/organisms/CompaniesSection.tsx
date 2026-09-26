import { motion } from 'motion/react';
import React from 'react';
import { Briefcase, Building, Building2, Landmark, ShieldCheck, Factory, Computer } from 'lucide-react';

const clients = [
  { name: "RetailFashion ID", icon: Building },
  { name: "GudangLokal", icon: Factory },
  { name: "Seino Indomobil", icon: Building2 },
  { name: "Delta Legal", icon: Landmark },
  { name: "Griya Cisauk", icon: Briefcase },
  { name: "PT Prime Well Wireline", icon: Factory },
  { name: "Fortanara Cybersecurity", icon: ShieldCheck },
  { name: "Y-Not Tech", icon: Computer },
];

const ClientTrack = () => (
  <div className="flex items-center gap-12 md:gap-20 shrink-0 px-6 md:px-10">
    {clients.map((client, i) => (
      <div key={`${client.name}-${i}`} className="flex items-center gap-3">
        <client.icon className="w-6 h-6 md:w-8 md:h-8 text-slate-400 opacity-60" />
        <span className="text-lg md:text-2xl font-display font-medium text-slate-400 whitespace-nowrap opacity-80">
          {client.name}
        </span>
      </div>
    ))}
  </div>
);

export default function CompaniesSection() {
  return (
    <section className="py-12 md:py-16 bg-white overflow-hidden relative border-y border-slate-100">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl font-display font-semibold tracking-tight text-slate-900 mb-2">
          Client Trust &amp; Partnerships
        </h2>
        <p className="text-sm font-sans text-slate-500 max-w-xl mx-auto">
          Driving digital transformation for industry leaders and visionary enterprises.
        </p>
      </div>
      
      <div className="relative w-full overflow-hidden flex items-center">
        {/* Gradients for smooth fading at edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        
        <motion.div
          className="flex w-max shrink-0 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 40, repeat: Infinity }}
        >
          <ClientTrack />
          <ClientTrack />
        </motion.div>
      </div>
    </section>
  );
}
