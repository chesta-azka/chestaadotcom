"use client";
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { metric: 'Load (ms)', Legacy: 3200, NextJS: 400 },
  { metric: 'TTFB (ms)', Legacy: 800, NextJS: 45 },
  { metric: 'FCP (ms)', Legacy: 1500, NextJS: 200 },
  { metric: 'SEO Score', Legacy: 45, NextJS: 100 },
];

export function ArchitecturalEfficiency() {
  return (
    <div className="w-full max-w-4xl mx-auto my-16 p-6 md:p-8 backdrop-blur-2xl bg-white/40 dark:bg-slate-900/40 border border-white/20 dark:border-white/10 rounded-[2rem] shadow-[0_8px_32px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">
          Architectural Efficiency
        </h2>
        <p className="text-slate-600 dark:text-slate-400 font-medium">
          Legacy SPA vs. Next.js App Router (B2B SaaS Dominance)
        </p>
      </div>

      <div className="h-[300px] w-full font-sans">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorNext" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorLegacy" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#94a3b8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" className="dark:stroke-slate-700/50 stroke-slate-200" />
            <XAxis 
              dataKey="metric" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 12 }} 
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(15, 23, 42, 0.8)', 
                backdropFilter: 'blur(12px)',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#fff',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)'
              }}
              itemStyle={{ fontWeight: 600 }}
            />
            <Area type="monotone" dataKey="Legacy" stroke="#94a3b8" strokeWidth={2} fillOpacity={1} fill="url(#colorLegacy)" />
            <Area type="monotone" dataKey="NextJS" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorNext)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
