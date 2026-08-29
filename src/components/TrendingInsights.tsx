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
          "AI-driven automation is accelerating B2B workflows.",
          "Next.js App Router is dominating enterprise frontends.",
          "Serverless edge computing reduces global latency."
        ]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTrends();
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto mt-16 mb-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="backdrop-blur-xl bg-white/40 dark:bg-slate-900/40 border border-slate-200/50 dark:border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-32 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-[80px] -z-10" />
        
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-xl">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              Live Industry Insights <Sparkles className="w-4 h-4 text-amber-500" />
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Powered by Google Search Grounding</p>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
          </div>
        ) : (
          <ul className="space-y-4">
            {trends.map((trend, i) => (
              <motion.li 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-3 text-slate-700 dark:text-slate-300 bg-white/50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-700/50"
              >
                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                <span className="text-sm md:text-base font-medium leading-relaxed">{trend}</span>
              </motion.li>
            ))}
          </ul>
        )}
      </motion.div>
    </div>
  );
}
