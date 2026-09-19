import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, ArrowRight, Lightbulb, Zap, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CaseStudy {
  id: string;
  title: string;
  client: string;
  category: string;
  tags: string[];
  results: string;
  link: string;
  image: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'cs-1',
    title: 'Transformasi Operasional Warehouse 4.0',
    client: 'Logistik Maju Jaya',
    category: 'Edukasi Teknologi',
    tags: ['Integrated AI', 'Business Operations', 'Automation'],
    results: 'Peningkatan kecepatan proses pesanan sebesar 82% otonom.',
    link: '/case-study/logistik-maju-jaya',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2670&auto=format&fit=crop'
  },
  {
    id: 'cs-2',
    title: 'Digitalisasi Startup Solopreneur AI',
    client: 'VibeStudio AI',
    category: 'Edukasi Teknologi',
    tags: ['Solopreneur', 'Digital Business', 'AI for Gen Z'],
    results: 'Mencapai revenue $5k/mo dalam 3 bulan pertama.',
    link: '/case-study/vibestudio-ai',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2670&auto=format&fit=crop'
  },
  {
    id: 'cs-3',
    title: 'Ekosistem AI Terintegrasi Corporate',
    client: 'Global Tech Corp',
    category: 'Edukasi Teknologi',
    tags: ['Enterprise Solutions', 'Automation', 'Digital Strategy'],
    results: 'Reduksi biaya operasional IT hingga 40% per tahun.',
    link: '/case-study/global-tech-corp',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop'
  }
];

interface CaseStudyPromotionProps {
  currentTags: string[];
}

export default function CaseStudyPromotion({ currentTags }: CaseStudyPromotionProps) {
  // Find relevant case studies based on matching tags
  const relevantStudies = CASE_STUDIES.filter(cs => 
    cs.tags.some(tag => currentTags.includes(tag))
  ).slice(0, 2);

  if (relevantStudies.length === 0) return null;

  return (
    <div className="mt-20 py-12 px-6 sm:px-10 bg-slate-900 rounded-3xl overflow-hidden relative border border-slate-800">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-[10px] font-bold uppercase tracking-widest">
              <Lightbulb size={12} />
              Bridge to Reality
            </div>
            <h3 className="text-3xl font-display font-bold text-white tracking-tight">
              Dari Teori ke <span className="text-purple-400 italic">Eksekusi Nyata</span>
            </h3>
            <p className="text-slate-400 max-w-xl text-sm sm:text-base">
              Penasaran gimana strategi yang lo baca tadi diimplementasiin di dunia bisnis nyata? Cek studi kasus yang relevan di bawah ini!
            </p>
          </div>
          <Link 
            to="/portfolio" 
            className="group flex items-center gap-2 text-white font-medium hover:text-purple-400 transition-colors"
          >
            Lihat Semua Portfolio
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {relevantStudies.map((cs) => (
            <motion.div
              key={cs.id}
              whileHover={{ y: -5 }}
              className="group bg-slate-800/50 border border-slate-700/50 rounded-2xl overflow-hidden flex flex-col sm:flex-row"
            >
              <div className="sm:w-1/3 h-40 sm:h-auto relative overflow-hidden">
                <img 
                  src={cs.image} 
                  alt={cs.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/20 transition-colors" />
              </div>
              <div className="flex-1 p-6 flex flex-col justify-between space-y-4">
                <div>
                  <div className="text-purple-400 text-[10px] font-bold uppercase tracking-wider mb-2 flex items-center gap-1">
                    <Zap size={10} />
                    {cs.client}
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2 leading-tight">
                    {cs.title}
                  </h4>
                  <div className="flex items-start gap-2 text-slate-300 text-sm">
                    <CheckCircle2 size={16} className="text-emerald-400 mt-0.5 shrink-0" />
                    <span>{cs.results}</span>
                  </div>
                </div>
                <Link 
                  to={cs.link}
                  className="inline-flex items-center gap-2 text-purple-400 text-sm font-bold group-hover:gap-3 transition-all"
                >
                  Pelajari Strateginya
                  <ExternalLink size={14} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
