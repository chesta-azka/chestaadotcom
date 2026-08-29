import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Sparkles, ExternalLink } from 'lucide-react';
import TextRevealSmooth from '../atoms/TextRevealSmooth';

interface Insight {
  title: string;
  description: string;
  link: string;
  date: string;
}

const InsightSkeleton = () => (
  <div className="relative flex flex-col h-full bg-slate-50 p-6 md:p-8 rounded-3xl border border-slate-100 animate-pulse min-h-[220px] text-left">
    <div className="flex gap-4 items-center mb-4">
      <div className="h-5 w-16 bg-[#6b21a8]/10 rounded-full" />
      <div className="h-3 w-20 bg-slate-200 rounded" />
    </div>
    <div className="space-y-2 mb-4">
      <div className="h-5 w-5/6 bg-slate-200 rounded" />
      <div className="h-5 w-2/3 bg-slate-200 rounded" />
    </div>
    <div className="space-y-2 mb-8">
      <div className="h-3 w-full bg-slate-100 rounded" />
      <div className="h-3 w-3/4 bg-slate-100 rounded" />
    </div>
  </div>
);

export default function InsightsSection() {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const res = await fetch('/api/ai/insights');
        if (!res.ok) throw new Error('Failed to fetch insights');
        const data = await res.json();
        if (data.insights && Array.isArray(data.insights)) {
          setInsights(data.insights.slice(0, 3));
        } else {
          throw new Error('Invalid format');
        }
      } catch (err: any) {
        console.error(err);
        setError('Gagal memuat tren terbaru saat ini.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchInsights();
  }, []);

  return (
    <section id="insights" className="py-16 md:py-24 relative overflow-hidden bg-white border-b border-slate-100">
      <div className="mx-auto max-w-7xl px-6 relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b border-slate-100"
        >
          <div>
            <span className="flex items-center gap-2 text-[#6b21a8] font-mono font-semibold text-xs uppercase tracking-widest mb-3">
              <Sparkles size={14} /> AI-Powered Market Intel
            </span>
            <div className="text-fluid-h2 font-serif font-medium tracking-tight text-slate-900 leading-[1.05] mb-2 flex flex-wrap">
              <TextRevealSmooth 
                text="Tren Teknologi & UMKM." 
                highlightWords={["UMKM."]}
                highlightClass="text-transparent bg-clip-text bg-gradient-to-r from-[#6b21a8] to-purple-600 font-serif italic pr-2"
              />
            </div>
            <p className="text-slate-600 font-sans text-sm md:text-base max-w-lg mt-2">
              Analisis industri *real-time* yang diringkas oleh Gemini AI dari pencarian terbaru web, khusus untuk memandu eksekusi digital UMKM di Indonesia.
            </p>
          </div>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, idx) => (
              <InsightSkeleton key={idx} />
            ))}
          </div>
        ) : error ? (
          <div className="p-8 text-center bg-slate-50 border border-slate-100 rounded-2xl text-slate-500 font-sans">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {insights.map((insight, i) => (
              <motion.a 
                href={insight.link || '#'} 
                target={insight.link ? "_blank" : "_self"}
                rel="noreferrer"
                key={i} 
                className="group cursor-pointer relative flex flex-col h-full bg-white p-6 md:p-8 rounded-3xl border border-slate-200/80 hover:border-[#6b21a8]/40 hover:shadow-xl transition-all duration-300 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="flex gap-3 items-center mb-4">
                  <span className="text-[10px] font-mono font-bold text-[#6b21a8] bg-purple-50 px-3 py-1 rounded-full uppercase tracking-wider">
                    Tren Terbaru
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {insight.date || 'Update Hari Ini'}
                  </span>
                </div>
                <h3 className="text-lg font-display font-medium text-slate-900 leading-snug mb-3 group-hover:text-[#6b21a8] transition-colors tracking-tight text-left">
                  {insight.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-sans mb-6 text-left">
                  {insight.description}
                </p>
                
                <div className="mt-auto pt-4 flex items-center justify-between text-xs font-mono font-semibold tracking-wider text-[#6b21a8] border-t border-slate-100">
                  <span>Sumber Berita</span>
                  <ExternalLink size={14} className="transition-transform group-hover:scale-110" />
                </div>
              </motion.a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
