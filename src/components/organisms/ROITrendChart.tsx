"use client";

import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'motion/react';

const generateMockData = () => {
  return [
    { name: 'M1', value: 15 },
    { name: 'M2', value: 35 },
    { name: 'M3', value: 55 },
    { name: 'M4', value: 75 },
    { name: 'M5', value: 90 },
    { name: 'M6', value: 100 },
  ];
};

export default function ROITrendChart() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    // Avoid hydration mismatch by setting data after mount
    setData(generateMockData());
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.8 }}
      className="w-full h-56 mt-8"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" strokeOpacity={0.4} />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 11, fill: '#94a3b8' }} 
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 11, fill: '#94a3b8' }} 
          />
          <Tooltip 
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200 dark:border-slate-800 p-3 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]">
                    <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400 mb-1">{label}</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      Growth: <span className="text-blue-500">{payload[0].value}%</span>
                    </p>
                  </div>
                );
              }
              return null;
            }}
            cursor={{ stroke: 'rgba(148, 163, 184, 0.2)', strokeWidth: 2, strokeDasharray: '4 4' }}
          />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="#3b82f6" 
            strokeWidth={3}
            dot={{ r: 4, fill: '#ffffff', stroke: '#3b82f6', strokeWidth: 2 }}
            activeDot={{ r: 6, fill: '#3b82f6', stroke: '#ffffff', strokeWidth: 2 }}
            animationDuration={2500}
            animationEasing="ease-in-out"
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
