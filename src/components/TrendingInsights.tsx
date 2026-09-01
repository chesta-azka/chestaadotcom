"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Loader2, Sparkles } from 'lucide-react';

export function TrendingInsights() {
  const [trends, setTrends] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrends = async () => {
      try {
        const res = await fetch('/api/search');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setTrends(data.trends || []);
      } catch (error) {
        console.error(error);
        setTrends([
          "Website cepat dengan Next.js terbukti meningkatkan konversi penjualan.",
          "UMKM modern beralih ke direct chat WhatsApp untuk closing lebih cepat.",
          "Desain bersih dan minimalis meningkatkan rasa percaya calon pembeli."
        ]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTrends();
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto mt-12 mb-8 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white border border-purple-100 rounded-3xl p-6 sm:p-8 shadow-xs relative overflow-hidden"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-purple-50 text-purple-900 rounded-xl">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-display font-bold text-slate-900 flex items-center gap-2">
              Wawasan & Peluang Digital <Sparkles className="w-4 h-4 text-purple-600" />
            </h3>
            <p className="text-xs text-slate-500">Riset Terkini Pertumbuhan Bisnis</p>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-purple-600" />
          </div>
        ) : (
          <ul className="space-y-3">
            {trends.map((trend, i) => (
              <motion.li 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-3 text-slate-700 bg-purple-50/40 p-3.5 rounded-2xl border border-purple-100"
              >
                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-700 shrink-0" />
                <span className="text-xs sm:text-sm font-medium leading-relaxed">{trend}</span>
              </motion.li>
            ))}
          </ul>
        )}
      </motion.div>
    </div>
  );
}
