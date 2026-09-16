import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Star, Building2, CheckCircle2 } from 'lucide-react';

const LOCAL_CLIENTS = [
  { name: 'BSD Ventures', area: 'BSD City', type: 'Tech Startup' },
  { name: 'Cisauk Indah Real Estate', area: 'Cisauk', type: 'Property' },
  { name: 'Tangerang Medical Center', area: 'Tangerang', type: 'Healthcare' },
  { name: 'Bintaro Retail Co.', area: 'Bintaro', type: 'Retail' },
  { name: 'Alam Sutera Food', area: 'Alam Sutera', type: 'F&B' },
  { name: 'Gading Serpong Edu', area: 'Gading Serpong', type: 'Education' },
  { name: 'Pamulang Logistics', area: 'Pamulang', type: 'Logistics' },
];

interface LocalTrustMarqueeProps {
  currentArea?: string;
}

export default function LocalTrustMarquee({ currentArea = 'Tangerang Selatan' }: LocalTrustMarqueeProps) {
  // Double the array for smooth infinite scroll
  const scrollItems = [...LOCAL_CLIENTS, ...LOCAL_CLIENTS];

  return (
    <div className="w-full bg-slate-950 py-10 overflow-hidden border-y border-slate-800/50">
      <div className="max-w-7xl mx-auto px-6 mb-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-display font-medium text-white flex items-center gap-2">
            <Building2 className="text-purple-400" size={20} />
            Dipercaya oleh Bisnis Top di <span className="text-purple-400 font-bold">{currentArea}</span>
          </h3>
          <p className="text-sm text-slate-400 mt-1">
            Skalabilitas enterprise dengan pendekatan hyper-local.
          </p>
        </div>
        <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
          <Star className="text-yellow-400 fill-yellow-400" size={14} />
          <Star className="text-yellow-400 fill-yellow-400" size={14} />
          <Star className="text-yellow-400 fill-yellow-400" size={14} />
          <Star className="text-yellow-400 fill-yellow-400" size={14} />
          <Star className="text-yellow-400 fill-yellow-400" size={14} />
          <span className="text-xs font-bold text-white ml-2">4.9/5 Local Rating</span>
        </div>
      </div>

      <div className="relative flex w-full">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />
        
        <motion.div 
          className="flex gap-4 shrink-0"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
        >
          {scrollItems.map((client, idx) => (
            <div 
              key={idx} 
              className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col gap-2 min-w-[280px] shrink-0 hover:bg-white/10 transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-white font-bold font-sans text-lg">{client.name}</span>
                <CheckCircle2 size={16} className="text-emerald-400" />
              </div>
              <div className="flex items-center gap-3 mt-auto pt-2 border-t border-white/5">
                <span className="flex items-center gap-1 text-xs text-slate-400 font-mono">
                  <MapPin size={12} /> {client.area}
                </span>
                <span className="w-1 h-1 rounded-full bg-slate-600" />
                <span className="text-xs text-slate-400">{client.type}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
