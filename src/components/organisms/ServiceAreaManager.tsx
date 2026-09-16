import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Target, Shield, Zap, Quote } from 'lucide-react';
import { useGeoIntentManager } from '../../hooks/useGeoIntentManager';

interface ServiceAreaManagerProps {
  baseServiceTitle: string;
  baseDescription: string;
  nicheContext?: 'Web Agency' | 'IT Solutions' | 'AI Automation' | 'SEO Consulting';
}

export default function ServiceAreaManager({ 
  baseServiceTitle, 
  baseDescription,
  nicheContext = 'IT Solutions'
}: ServiceAreaManagerProps) {
  const geoIntent = useGeoIntentManager();
  
  // Use explicit URL param/geo-intent location or fallback
  const areaName = geoIntent.isCustomized ? geoIntent.location : 'BSD & Tangerang';

  // Dynamic Testimonials
  const localTestimonials = [
    {
      author: 'Budi Santoso',
      role: 'CEO, Retail Corp',
      loc: areaName,
      text: `Sejak bekerjasama dengan CHESTAADOTCOM untuk ${nicheContext}, visibilitas bisnis kami di ${areaName} meningkat tajam.`
    },
    {
      author: 'Rina Wijaya',
      role: 'Marketing Director',
      loc: areaName,
      text: `Solusi ${nicheContext} yang ditawarkan sangat revolusioner. Sangat merekomendasikan layanan IT mereka untuk perusahaan di ${areaName}.`
    }
  ];

  return (
    <div className="w-full bg-slate-50 border-y border-slate-200 py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-mono font-bold tracking-wider uppercase mb-6">
            <MapPin size={14} /> Local Excellence in {areaName}
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-medium text-slate-900 leading-tight mb-6">
            {geoIntent.isCustomized ? `${areaName} ${nicheContext}` : baseServiceTitle}
          </h1>
          
          <p className="text-lg text-slate-600 leading-relaxed font-sans mb-8">
            {geoIntent.isCustomized 
              ? `Memberikan layanan ${nicheContext} premium dan terukur khusus untuk skala bisnis dan ekosistem industri di ${areaName}. ${baseDescription}`
              : baseDescription}
          </p>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600">
                <Target size={20} />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Hyper-Local Targeting</h4>
              <p className="text-xs text-slate-500">Mendominasi pencarian di {areaName}</p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
                <Shield size={20} />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Enterprise Security</h4>
              <p className="text-xs text-slate-500">Keamanan data tingkat korporat</p>
            </div>
          </div>
        </motion.div>

        {/* Dynamic Testimonials */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col gap-6 relative"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-200/50 rounded-full blur-[100px] pointer-events-none" />
          
          {localTestimonials.map((testi, i) => (
            <div key={i} className={`bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-slate-100 relative z-10 ${i === 1 ? 'ml-0 sm:ml-12' : 'mr-0 sm:mr-12'}`}>
              <Quote className="text-purple-200 absolute top-6 right-6 opacity-50" size={48} />
              <div className="flex items-center gap-1 mb-4">
                {[1,2,3,4,5].map(s => <span key={s} className="text-yellow-400">★</span>)}
              </div>
              <p className="text-slate-700 italic font-medium leading-relaxed mb-6">"{testi.text}"</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold font-serif">
                  {testi.author.charAt(0)}
                </div>
                <div>
                  <h5 className="font-bold text-sm text-slate-900">{testi.author}</h5>
                  <p className="text-xs text-slate-500">{testi.role} • {testi.loc}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
