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
    <div className="w-full max-w-4xl mx-auto my-12 p-6 md:p-8 bg-white border border-purple-100 rounded-3xl shadow-sm font-sans">
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-display font-bold tracking-tight text-slate-900 mb-1">
          Efisiensi Arsitektur Website
        </h2>
        <p className="text-slate-500 text-xs sm:text-sm font-sans">
          Perbandingan performa platform konvensional vs. Next.js App Router berkecepatan tinggi.
        </p>
      </div>

      <div className="h-[280px] w-full font-sans">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorNext" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6b21a8" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#6b21a8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorLegacy" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#cbd5e1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#cbd5e1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="metric" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 11, fontWeight: 500 }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 11 }} 
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#ffffff', 
                borderRadius: '16px',
                border: '1px solid #e9d5ff',
                color: '#0f172a',
                boxShadow: '0 10px 25px -5px rgba(107, 33, 168, 0.08)'
              }}
              itemStyle={{ fontWeight: 600, fontSize: '12px' }}
            />
            <Area type="monotone" dataKey="Legacy" stroke="#94a3b8" strokeWidth={2} fillOpacity={1} fill="url(#colorLegacy)" name="Platform Lama" />
            <Area type="monotone" dataKey="NextJS" stroke="#6b21a8" strokeWidth={3} fillOpacity={1} fill="url(#colorNext)" name="Next.js CHESTA" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
