"use client";

import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'motion/react';

const generateMockData = () => {
  return [
    { name: 'B1', value: 15 },
    { name: 'B2', value: 35 },
    { name: 'B3', value: 55 },
    { name: 'B4', value: 75 },
    { name: 'B5', value: 90 },
    { name: 'B6', value: 100 },
  ];
};

export default function ROITrendChart() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    setData(generateMockData());
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      className="w-full h-48 mt-6 font-sans"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 10, fill: '#94a3b8' }} 
            dy={8}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 10, fill: '#94a3b8' }} 
          />
          <Tooltip 
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-white border border-purple-100 p-2.5 rounded-xl shadow-md">
                    <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 mb-0.5">{label}</p>
                    <p className="text-xs font-bold text-slate-900">
                      Peningkatan: <span className="text-purple-900">+{payload[0].value}%</span>
                    </p>
                  </div>
                );
              }
              return null;
            }}
            cursor={{ stroke: 'rgba(107, 33, 168, 0.1)', strokeWidth: 1.5, strokeDasharray: '4 4' }}
          />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="#6b21a8" 
            strokeWidth={2.5}
            dot={{ r: 3.5, fill: '#ffffff', stroke: '#6b21a8', strokeWidth: 2 }}
            activeDot={{ r: 5, fill: '#6b21a8', stroke: '#ffffff', strokeWidth: 2 }}
            animationDuration={1500}
            animationEasing="ease-in-out"
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
