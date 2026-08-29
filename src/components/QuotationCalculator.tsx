"use client";
import React, { useState, useEffect, useMemo } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Check, Loader2, Moon, Sun, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'motion/react';

const SERVICES = [
  { id: 'nextjs', name: 'Next.js Web Architecture', minPrice: 5000, maxPrice: 12000 },
  { id: 'ai', name: 'AI Automation & Agents', minPrice: 8000, maxPrice: 18000 },
  { id: 'seo', name: 'Local SEO & Optimization', minPrice: 2000, maxPrice: 6000 },
];

export function QuotationCalculator() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [selected, setSelected] = useState<Set<string>>(new Set(['nextjs']));
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Seamless Dark Mode / Light Mode toggle functionality
  useEffect(() => {
    if (document.documentElement.classList.contains('dark')) {
      setTheme('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleService = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) {
      if (next.size > 1) next.delete(id); // Require at least one selection
    } else {
      next.add(id);
    }
    setSelected(next);
  };

  const estimate = useMemo(() => {
    let min = 0;
    let max = 0;
    selected.forEach(id => {
      const service = SERVICES.find(s => s.id === id);
      if (service) {
        min += service.minPrice;
        max += service.maxPrice;
      }
    });
    return { min, max };
  }, [selected]);

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !email) return;

    setLoading(true);
    try {
      await addDoc(collection(db, 'ai_leads'), {
        companyName,
        email,
        servicesRequested: Array.from(selected),
        estimatedValueMin: estimate.min,
        estimatedValueMax: estimate.max,
        status: 'WARM',
        source: 'Premium Calculator',
        createdAt: serverTimestamp(),
      });
      setSubmitted(true);
    } catch (error) {
      console.error(error);
      toast.error('Failed to submit request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`relative min-h-[600px] w-full max-w-2xl mx-auto p-1 font-sans transition-colors duration-700 ease-in-out ${theme === 'dark' ? 'dark' : ''}`}>
      {/* Background Ambient Glow (Apple style subtle gradients) */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-slate-900/50 dark:to-blue-900/50 rounded-[2rem] -z-10 transition-colors duration-700" />
      
      {/* Glassmorphism Container */}
      <div className="relative backdrop-blur-xl bg-white/70 dark:bg-black/60 border border-white/40 dark:border-white/10 rounded-[2rem] shadow-[0_8px_32px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] p-8 sm:p-10 transition-all duration-700 overflow-hidden">
        
        {/* Header & Theme Toggle */}
        <div className="flex justify-between items-start mb-10">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white mb-2 transition-colors duration-500">
              Project Estimate
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium transition-colors duration-500">
              Select your requirements for an instant quotation.
            </p>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="p-3 rounded-full bg-slate-100/80 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 text-slate-700 dark:text-slate-200 transition-colors shadow-sm"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </motion.button>
        </div>

        {submitted ? (
          <div className="flex flex-col items-center justify-center py-20 animate-in fade-in zoom-in duration-700">
            <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30 mb-6">
              <Check size={32} strokeWidth={2.5} />
            </div>
            <h3 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white mb-3">
              Proposal Request Sent
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-center max-w-sm">
              Our architects will review your requirements for {companyName} and reach out to {email} shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-10 animate-in fade-in duration-700">
            
            {/* Service Toggles */}
            <div className="space-y-4">
              {SERVICES.map((service) => {
                const isSelected = selected.has(service.id);
                return (
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    key={service.id}
                    type="button"
                    onClick={() => toggleService(service.id)}
                    className={`w-full flex items-center justify-between p-5 rounded-2xl border transition-colors duration-300 ease-out
                      ${isSelected 
                        ? 'bg-white dark:bg-white/10 border-blue-500/30 dark:border-blue-400/30 shadow-[0_4px_16px_rgba(0,113,227,0.1)] ring-1 ring-blue-500/20' 
                        : 'bg-slate-50/50 dark:bg-white/5 border-transparent hover:bg-white dark:hover:bg-white/10 text-slate-600 dark:text-slate-400 hover:shadow-sm'
                      }`}
                  >
                    <span className={`font-medium tracking-tight text-lg transition-colors duration-300 ${isSelected ? 'text-slate-900 dark:text-white' : ''}`}>
                      {service.name}
                    </span>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${isSelected ? 'bg-blue-500 text-white shadow-sm' : 'border border-slate-300 dark:border-slate-600'}`}>
                      <Check size={14} className={`transition-opacity duration-300 ${isSelected ? 'opacity-100' : 'opacity-0'}`} strokeWidth={3} />
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Dynamic Price Display */}
            <div className="py-6 border-y border-slate-200 dark:border-white/10 transition-colors duration-500">
              <p className="text-xs font-semibold tracking-wider text-slate-400 dark:text-slate-500 uppercase mb-2">
                Estimated Investment
              </p>
              <div className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-white transition-all duration-500">
                {formatPrice(estimate.min)} <span className="text-slate-300 dark:text-slate-700 font-light mx-2">&mdash;</span> {formatPrice(estimate.max)}
              </div>
            </div>

            {/* User Info Form */}
            <div className="space-y-4">
              <div>
                <input 
                  type="text" 
                  required
                  placeholder="Company Name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-5 py-4 bg-white/50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
                />
              </div>
              <div>
                <input 
                  type="email" 
                  required
                  placeholder="Work Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-5 py-4 bg-white/50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
                />
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading || selected.size === 0 || !companyName || !email}
              className="w-full py-4 px-6 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold rounded-2xl hover:bg-slate-800 dark:hover:bg-slate-100 hover:shadow-lg hover:shadow-slate-900/20 dark:hover:shadow-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Request Detailed Proposal
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </motion.button>
          </form>
        )}
      </div>
    </div>
  );
}
