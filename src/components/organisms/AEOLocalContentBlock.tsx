import React from 'react';
import { Target, MapPin, Search } from 'lucide-react';
import { motion } from 'motion/react';
import { SEOMetadata } from '../../utils/seoHelper';

interface AEOLocalContentBlockProps {
  seoData: SEOMetadata;
  topicSlug?: string;
  categorySlug?: string;
}

export default function AEOLocalContentBlock({ seoData, topicSlug, categorySlug }: AEOLocalContentBlockProps) {
  if (!topicSlug && !categorySlug) return null; // Only show on specific topic/category routes

  const title = (topicSlug || categorySlug)?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="my-16 bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-sm relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-purple-100 to-transparent rounded-bl-full pointer-events-none opacity-50" />
      
      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-mono font-bold uppercase tracking-wider border border-purple-100">
            <MapPin size={14} /> BSD City & Cisauk
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-mono font-bold uppercase tracking-wider border border-indigo-100">
            <Target size={14} /> Local AEO Optimization
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-serif font-medium text-slate-900 text-center mb-6 leading-tight">
          Mendominasi Lanskap <span className="text-purple-700 italic">{title}</span> di Tangerang Selatan
        </h2>
        
        <div className="prose prose-slate max-w-none text-slate-600 font-sans text-center md:text-left mb-10">
          <p className="text-lg leading-relaxed mb-4">
            Sebagai pusat inovasi digital yang terus berkembang pesat, kawasan BSD City dan Cisauk memiliki dinamika pasar yang unik. Tim spesialis di CHESTAADOTCOM telah merangkum wawasan strategis ini agar bisnis lokal Anda tidak hanya tampil di mesin pencari, tetapi juga memenangkan <strong>Answer Engine Optimization (AEO)</strong> dan fitur cuplikan pilihan (Featured Snippets).
          </p>
          <p className="text-lg leading-relaxed">
            {seoData.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
            <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900 mb-3">
              <Search className="text-purple-600" size={20} /> Mengapa AEO Penting?
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Di era pencarian berbasis AI (Search Generative Experience), pengguna mengharapkan jawaban instan. Konten yang dioptimasi untuk AEO memberikan jawaban langsung, terstruktur, dan otoritatif.
            </p>
          </div>
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
            <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900 mb-3">
              <MapPin className="text-indigo-600" size={20} /> Keunggulan Hyper-Local
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Bisnis di BSD dan Cisauk yang mengintegrasikan kata kunci lokal dan skema Geo-Targeting akan menikmati lonjakan konversi yang lebih tinggi berkat relevansi geografis yang kuat.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
