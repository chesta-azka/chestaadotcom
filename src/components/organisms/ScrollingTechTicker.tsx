import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  Zap, 
  Terminal, 
  Cpu, 
  Globe, 
  TrendingUp, 
  CheckCircle2, 
  Lock, 
  Award, 
  Sparkles 
} from 'lucide-react';

const businessPillars = [
  { name: '100% Hak Milik Aset (Tanpa Sewa)', icon: <Lock size={16} className="text-purple-600" /> },
  { name: 'Sistem Otomatis Anti-Salah Input', icon: <ShieldCheck size={16} className="text-emerald-600" /> },
  { name: 'Kecepatan Muat 0.2 Detik Tanpa Lag', icon: <Zap size={16} className="text-amber-500" /> },
  { name: 'Otomasi Admin 24/7 Tanpa Jeda', icon: <Cpu size={16} className="text-purple-600" /> },
  { name: 'Bebas Biaya Langganan Bulanan', icon: <Award size={16} className="text-blue-600" /> },
  { name: 'Konversi Penjualan Instan ke WhatsApp', icon: <TrendingUp size={16} className="text-emerald-600" /> },
  { name: 'Database Cloud Terpusat & Aman', icon: <Globe size={16} className="text-purple-600" /> },
  { name: 'Efisiensi Gaji Admin hingga 70%', icon: <CheckCircle2 size={16} className="text-emerald-600" /> },
];

export default function ScrollingTechTicker() {
  return (
    <div className="w-full relative z-10 overflow-hidden whitespace-nowrap bg-slate-50 py-5 border-y border-slate-200 shadow-inner">
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />
      <motion.div
        className="inline-block"
        animate={{ x: '-50%' }}
        transition={{ repeat: Infinity, ease: 'linear', duration: 35 }}
      >
        {[...businessPillars, ...businessPillars, ...businessPillars].map((item, i) => (
          <span 
            key={i} 
            className="mx-6 md:mx-10 inline-flex items-center gap-2.5 text-slate-700 hover:text-purple-900 transition-colors font-sans text-xs md:text-sm font-bold tracking-wide uppercase"
          >
            <span className="p-1 rounded-full bg-purple-50 border border-purple-100">{item.icon}</span>
            {item.name}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
