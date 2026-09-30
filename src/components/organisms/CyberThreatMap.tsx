'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert, Activity, Globe } from 'lucide-react';

interface ThreatPulse {
  id: number;
  x: number;
  y: number;
  city: string;
  intensity: 'critical' | 'elevated' | 'normal';
}

export default function CyberThreatMap() {
  const [pulses, setPulses] = useState<ThreatPulse[]>([]);
  const [threatLevel, setThreatLevel] = useState<'NORMAL' | 'ELEVATED' | 'CRITICAL'>('ELEVATED');
  const [attacksBlocked, setAttacksBlocked] = useState(84302);

  const targetCities = [
    { name: 'Jakarta', x: 745, y: 340 },
    { name: 'Singapore', x: 720, y: 330 },
    { name: 'Tokyo', x: 860, y: 220 },
    { name: 'Frankfurt', x: 490, y: 170 },
    { name: 'New York', x: 260, y: 200 },
    { name: 'Sydney', x: 910, y: 410 },
    { name: 'London', x: 440, y: 160 }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      const randomCity = targetCities[Math.floor(Math.random() * targetCities.length)];
      const intensities: Array<'critical' | 'elevated' | 'normal'> = ['critical', 'elevated', 'normal'];
      const intensity = intensities[Math.floor(Math.random() * intensities.length)];

      const newPulse: ThreatPulse = {
        id: Date.now(),
        x: randomCity.x,
        y: randomCity.y,
        city: randomCity.name,
        intensity
      };

      setPulses(prev => [...prev.slice(-6), newPulse]);
      setAttacksBlocked(prev => prev + Math.floor(Math.random() * 3) + 1);

      if (Math.random() > 0.7) {
        setThreatLevel('CRITICAL');
        setTimeout(() => setThreatLevel('ELEVATED'), 3000);
      }
    }, 2200);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full rounded-3xl bg-[#09090e] border border-white/10 p-6 sm:p-10 overflow-hidden shadow-2xl space-y-6">
      {/* HEADER & THREAT LEVEL BADGE */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 z-10 relative">
        <div className="flex items-center gap-3">
          <Globe className="text-indigo-400 animate-pulse" size={24} />
          <div>
            <h3 className="font-mono font-bold text-white text-base">Global Edge Cyber Defense Network</h3>
            <span className="text-xs font-mono text-slate-400">Real-time DDoS & Botnet Attack Interception</span>
          </div>
        </div>

        <div className={`px-4 py-2 rounded-xl border flex items-center gap-2.5 font-mono text-xs font-bold tracking-widest uppercase transition-colors ${
          threatLevel === 'CRITICAL' 
            ? 'bg-rose-950/80 border-rose-500 text-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.4)] animate-pulse'
            : 'bg-amber-950/80 border-amber-500/80 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
        }`}>
          <ShieldAlert size={14} />
          <span>Threat Level: {threatLevel}</span>
        </div>
      </div>

      {/* SVG WORLD MAP & THREAT PULSES */}
      <div className="relative w-full h-[320px] sm:h-[420px] rounded-2xl bg-black/60 border border-white/5 overflow-hidden flex items-center justify-center">
        {/* Abstract minimalist SVG world map grid lines */}
        <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" viewBox="0 0 1000 500" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="mapGrid" x1="0" y1="0" x2="0" y2="100%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0.02" />
            </linearGradient>
          </defs>
          <rect width="1000" height="500" fill="url(#mapGrid)" />
          
          {/* Latitude & Longitude grid lines */}
          <line x1="0" y1="125" x2="1000" y2="125" stroke="#ffffff" strokeWidth="0.5" strokeDasharray="4 8" opacity="0.2" />
          <line x1="0" y1="250" x2="1000" y2="250" stroke="#ffffff" strokeWidth="0.5" strokeDasharray="4 8" opacity="0.2" />
          <line x1="0" y1="375" x2="1000" y2="375" stroke="#ffffff" strokeWidth="0.5" strokeDasharray="4 8" opacity="0.2" />
          <line x1="250" y1="0" x2="250" y2="500" stroke="#ffffff" strokeWidth="0.5" strokeDasharray="4 8" opacity="0.2" />
          <line x1="500" y1="0" x2="500" y2="500" stroke="#ffffff" strokeWidth="0.5" strokeDasharray="4 8" opacity="0.2" />
          <line x1="750" y1="0" x2="750" y2="500" stroke="#ffffff" strokeWidth="0.5" strokeDasharray="4 8" opacity="0.2" />

          {/* Minimalist Continent Outlines (Simplified paths for 60fps performance) */}
          <path d="M150,120 Q220,100 280,140 Q310,220 240,280 Q180,310 130,220 Z" fill="#1e1e2f" stroke="#4f46e5" strokeWidth="1" opacity="0.6" />
          <path d="M420,100 Q520,90 560,160 Q530,280 440,260 Q390,200 420,100 Z" fill="#1e1e2f" stroke="#4f46e5" strokeWidth="1" opacity="0.6" />
          <path d="M680,110 Q850,90 920,180 Q880,320 720,300 Q650,220 680,110 Z" fill="#1e1e2f" stroke="#4f46e5" strokeWidth="1" opacity="0.6" />
          <path d="M740,330 Q830,320 860,400 Q800,450 720,400 Z" fill="#1e1e2f" stroke="#4f46e5" strokeWidth="1" opacity="0.6" />
        </svg>

        {/* Active Threat Pulses Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          {targetCities.map((city, idx) => (
            <div
              key={idx}
              className="absolute flex flex-col items-center"
              style={{ left: `${(city.x / 1000) * 100}%`, top: `${(city.y / 500) * 100}%` }}
            >
              <div className="w-2 h-2 rounded-full bg-indigo-400 shadow-[0_0_8px_#6366f1]" />
              <span className="text-[9px] font-mono text-slate-400 mt-1">{city.name}</span>
            </div>
          ))}

          <AnimatePresence>
            {pulses.map((pulse) => (
              <motion.div
                key={pulse.id}
                initial={{ scale: 0.2, opacity: 1 }}
                animate={{ scale: 3.5, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.8, ease: 'easeOut' }}
                className={`absolute rounded-full pointer-events-none ${
                  pulse.intensity === 'critical' ? 'bg-rose-500 shadow-[0_0_20px_#f43f5e]' : 'bg-amber-400 shadow-[0_0_15px_#f59e0b]'
                }`}
                style={{
                  left: `${(pulse.x / 1000) * 100}%`,
                  top: `${(pulse.y / 500) * 100}%`,
                  width: '24px',
                  height: '24px',
                  marginLeft: '-12px',
                  marginTop: '-12px'
                }}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Footer telemetry ticker inside map */}
        <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row items-center justify-between gap-2 p-3 rounded-xl bg-black/80 border border-white/10 backdrop-blur-md text-[11px] font-mono text-slate-300 z-10">
          <div className="flex items-center gap-2">
            <Activity size={14} className="text-emerald-400 animate-pulse" />
            <span>Total Serangan Dicegat: <strong className="text-white font-bold">{attacksBlocked.toLocaleString()}</strong></span>
          </div>
          <span className="text-indigo-400">Shield Status: Active (Zero Downtime SLA)</span>
        </div>
      </div>
    </div>
  );
}
