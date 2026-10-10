'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Cpu, 
  Building2, 
  Globe, 
  Zap, 
  ChevronRight, 
  Layers, 
  ArrowRight 
} from 'lucide-react';
import { SEO_SERVICES, SEOService } from '../../data/seo-services';

const CATEGORIES = [
  { id: 'all', name: 'Semua Solusi', icon: Layers },
  { id: 'ai-enterprise', name: 'AI Enterprise', icon: Cpu },
  { id: 'erp-systems', name: 'Sistem ERP', icon: Building2 },
  { id: 'web-ecommerce', name: 'Web & E-commerce', icon: Globe },
  { id: 'it-transformation', name: 'Transformasi IT', icon: Zap },
];

export default function SolutionsDirectory() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredServices = SEO_SERVICES.filter(service => {
    const matchesCategory = activeCategory === 'all' || service.category === activeCategory;
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl space-y-4">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
              Pusat Solusi Digital Chestaa
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Jelajahi ratusan arsitektur AI dan sistem enterprise yang dirancang khusus untuk memodernisasi setiap aspek bisnis Anda.
            </p>
          </div>
          
          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Cari solusi spesifik..."
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all text-sm font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all border ${
                activeCategory === cat.id 
                ? 'bg-purple-600 border-purple-600 text-white shadow-lg shadow-purple-600/20' 
                : 'bg-white border-slate-200 text-slate-600 hover:border-purple-200 hover:text-purple-600'
              }`}
            >
              <cat.icon size={16} />
              {cat.name}
            </button>
          ))}
        </div>

        {/* Grid Display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          <AnimatePresence mode="popLayout">
            {filteredServices.slice(0, 15).map((service) => (
              <motion.div
                layout
                key={service.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Link 
                  href={`/services/${service.id}`}
                  className="group block p-6 h-full bg-white border border-slate-100 rounded-[32px] hover:border-purple-200 hover:shadow-xl hover:shadow-purple-600/5 transition-all relative overflow-hidden"
                >
                  <div className="flex flex-col h-full space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="text-[10px] font-bold uppercase tracking-widest text-purple-600 px-2 py-0.5 rounded-md bg-purple-50 border border-purple-100">
                        {service.category.replace('-', ' ')}
                      </div>
                      <ChevronRight size={16} className="text-slate-300 group-hover:text-purple-500 group-hover:translate-x-1 transition-all" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-purple-700 transition-colors leading-snug">
                      {service.name}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">
                      {service.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {/* View More Overlay if truncated */}
          {filteredServices.length > 15 && (
            <div className="col-span-full mt-12 text-center">
              <p className="text-slate-400 text-sm mb-6 font-medium">Menampilkan 15 dari {filteredServices.length} solusi tersedia.</p>
              <Link 
                href="/services"
                className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold text-sm transition-all"
              >
                Lihat Semua Solusi
                <ArrowRight size={18} />
              </Link>
            </div>
          )}
          
          {filteredServices.length === 0 && (
            <div className="col-span-full py-20 text-center space-y-4">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                <Search size={24} />
              </div>
              <p className="text-slate-600 font-bold">Tidak ada solusi yang cocok dengan pencarian Anda.</p>
              <button 
                onClick={() => {setSearchQuery(''); setActiveCategory('all');}}
                className="text-purple-600 font-bold hover:underline"
              >
                Reset Filter
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
