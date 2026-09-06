import SEOProvider from '../components/atoms/SEOProvider';
import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, MessageCircle, ArrowRight, ShieldCheck, Zap, Bot, Globe } from 'lucide-react';
import LocalWeatherWidget from '../components/atoms/LocalWeatherWidget';
import MetaTags from '../components/atoms/MetaTags';
import { Link } from 'react-router-dom';
import chestaPhoto from '../assets/images/regenerated_image_1787838669318.png';

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-transparent relative overflow-hidden select-none">
      <SEOProvider 
        title="Tentang Kami | CHESTAADOTCOM"
        description="Mengenal CHESTAADOTCOM sebagai agency IT solution dan rekayasa website modern di BSD City oleh Chesta Azka Sofyan."
      />
      <LocalWeatherWidget />
      <MetaTags 
        title="Tentang - Profil Agency | CHESTAADOTCOM"
        description="Pelajari visi dan keahlian rekayasa perangkat lunak dari CHESTAADOTCOM."
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 md:pt-44 pb-24">
        
        {/* Header Title */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 border border-purple-200 mb-6">
            <Sparkles size={13} className="text-purple-600" />
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-purple-900">
              TENTANG KAMI
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-slate-900 mb-4">
            Membangun Standar Baru <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-900 via-indigo-800 to-purple-950">
              Rekayasa Digital &amp; IT Solution.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 font-sans max-w-2xl mx-auto leading-relaxed">
            Agency independen di BSD City yang berfokus pada pembuatan website berperforma tinggi, estetika sinematik, dan otomasi Agentic AI.
          </p>
        </motion.div>

        {/* Simplified Profile & Philosophy Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm mb-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
        >
          <div className="md:col-span-4 flex flex-col items-center text-center">
            <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-900 p-1 shadow-md mb-4 overflow-hidden">
              <img 
                src={chestaPhoto} 
                alt="Chesta Azka Sofyan - Lead Architect"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top rounded-[14px]"
              />
            </div>
            <h3 className="text-lg font-bold font-display text-slate-900">Chesta Azka Sofyan</h3>
            <p className="text-xs font-mono font-bold text-purple-700 uppercase tracking-wider mb-2">
              Lead Architect &amp; Founder
            </p>
            <span className="inline-flex items-center gap-1 text-xs text-slate-500">
              <Globe size={12} className="text-slate-400" />
              BSD City, Tangerang
            </span>
          </div>

          <div className="md:col-span-8 space-y-4 text-slate-700 text-sm sm:text-base font-sans leading-relaxed">
            <p>
              <strong className="text-slate-900">CHESTAADOTCOM</strong> didirikan dengan prinsip sederhana: setiap bisnis berhak mendapatkan infrastruktur digital berkecepatan tinggi dengan desain visual kelas dunia tanpa kompromi.
            </p>
            <p>
              Kami menolak penggunaan template murahan yang lambat dan rentan. Setiap baris kode dirancang secara khusus (*bespoke*) agar memberikan pengalaman terbaik bagi pengguna serta menaikkan konversi bisnis Anda secara signifikan.
            </p>
            <div className="pt-4 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
                <Zap size={13} className="text-amber-500 fill-amber-500" />
                Sub-Second Speed
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
                <ShieldCheck size={13} className="text-purple-700" />
                Enterprise Security
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
                <Bot size={13} className="text-indigo-700" />
                Agentic AI Integration
              </span>
            </div>
          </div>
        </motion.div>

        {/* Minimalist Call-To-Action Box */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl bg-purple-950 text-white p-8 sm:p-12 text-center shadow-xl flex flex-col items-center"
        >
          <h3 className="text-2xl sm:text-3xl font-display font-bold tracking-tight mb-3">
            Mari Diskusikan Proyek Anda
          </h3>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mb-8 leading-relaxed">
            Punya ide atau kebutuhan sistem web korporat? Hubungi kami langsung melalui WhatsApp untuk konsultasi awal gratis.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://wa.me/6282125447232?text=Halo%20CHESTADOTCOM,%20saya%20tertarik%20untuk%20diskusi%20proyek%20digital."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-white hover:bg-slate-100 text-purple-950 font-sans text-sm font-bold shadow-lg transition-all cursor-pointer"
            >
              <MessageCircle size={18} className="text-emerald-600 fill-emerald-600/20" />
              <span>Konsultasi via WhatsApp</span>
              <ArrowRight size={16} />
            </a>
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-purple-900 hover:bg-purple-800 text-white font-sans text-sm font-semibold border border-purple-700 transition-all cursor-pointer"
            >
              <span>Lihat Portofolio</span>
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
