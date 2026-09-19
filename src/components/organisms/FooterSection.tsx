import { Link } from 'react-router-dom';
import { Instagram, MessageCircle, Mail, MapPin, ArrowRight, Send, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

import { motion } from 'motion/react';
import { useLocation } from 'react-router-dom';
export default function FooterSection() {
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast.error('Masukkan alamat email yang valid.');
      return;
    }
    setIsSubscribed(true);
    toast.success('Terima kasih! Berhasil berlangganan newsletter kami.');
    setEmail('');
  };

    return (
    <motion.footer 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="pt-24 pb-12 bg-transparent text-slate-600 border-t border-slate-100 relative overflow-hidden"
    >
      {/* Seamless background blending gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.008] to-transparent pointer-events-none" />
      {/* Decorative Glow */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#6b21a8]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-[1400px] px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-24">
          
          {/* Column 1: Brand & Newsletter */}
          <div className="lg:col-span-4 space-y-8 pr-4">
            <Link to="/" onClick={() => window.scrollTo(0,0)} className="inline-flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center group-hover:border-[#6b21a8]/40 transition-colors duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
                <svg className="w-6 h-6 text-[#6b21a8] group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m12 3-8 8 8 8 8-8-8-8z" />
                  <path d="m12 8-4 4 4 4 4-4-4-4z" />
                </svg>
              </div>
              <span className="font-display text-2xl font-black tracking-tight leading-none text-slate-900">
                CHESTA<span className="text-[#6b21a8]">.</span>
              </span>
            </Link>
            <p className="text-base font-sans leading-relaxed text-slate-600 max-w-sm">
              Arsitektur digital premium untuk UMKM dan Brand lokal. Transformasi digital yang fokus pada performa, estetika, dan konversi nyata.
            </p>

            {/* Newsletter Subscription Box */}
            <div className="bg-slate-50/90 rounded-2xl p-4 border border-slate-200/80 shadow-sm max-w-sm">
              <p className="text-xs font-mono font-bold text-slate-800 uppercase tracking-wider mb-2">Newsletter Eksklusif</p>
              {isSubscribed ? (
                <div className="flex items-center gap-2 text-emerald-600 text-sm font-medium py-2">
                  <CheckCircle2 size={18} /> Berhasil Berlangganan!
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@email.com" 
                    className="bg-white px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-600 flex-1 text-slate-800"
                  />
                  <button type="submit" className="bg-purple-900 hover:bg-purple-800 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center cursor-pointer shadow-xs">
                    <Send size={13} />
                  </button>
                </form>
              )}
            </div>

            <div className="flex gap-3">
              <a href="https://instagram.com/chestaadotcom" target="_blank" rel="noopener noreferrer" title="Instagram @chestaadotcom" className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-all duration-300">
                <Instagram size={18} strokeWidth={1.5} />
              </a>
              <a href="https://tiktok.com/@chesta_azka" target="_blank" rel="noopener noreferrer" title="TikTok @chesta_azka" className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-all duration-300">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.86 4.43c1.92-1.92 2.36-4.68 2.28-7.39a8.28 8.28 0 0 0 4.45 1.3v-3.45a4.86 4.86 0 0 1-1-.86z"/>
                </svg>
              </a>
              <a href="https://wa.me/6282125447232?text=Halo%20CHESTAADOTCOM%2C%20saya%20tertarik%20untuk%20konsultasi%20layanan%20website" target="_blank" rel="noopener noreferrer" title="WhatsApp +62 821-2544-7232" className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-all duration-300">
                <MessageCircle size={18} strokeWidth={1.5} />
              </a>
              <a href="mailto:chestaadotcom@gmail.com" target="_blank" rel="noopener noreferrer" title="Email" className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-all duration-300">
                <Mail size={18} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="lg:col-span-2 lg:col-start-5">
            <h4 className="text-slate-900 font-sans font-bold tracking-widest uppercase text-[11px] mb-8">Layanan Utama</h4>
            <ul className="space-y-4 text-sm font-sans text-slate-600">
              <li><Link to="/layanan/website-company-profile" onClick={() => window.scrollTo(0,0)} className="hover:text-[#6b21a8] transition-colors">Web Development</Link></li>
              <li><Link to="/layanan/jasa-seo" onClick={() => window.scrollTo(0,0)} className="hover:text-[#6b21a8] transition-colors">Optimasi SEO Expert</Link></li>
              <li><Link to="/layanan/website-toko-online" onClick={() => window.scrollTo(0,0)} className="hover:text-[#6b21a8] transition-colors">E-Commerce Setup</Link></li>
              <li><Link to="/layanan/landing-page" onClick={() => window.scrollTo(0,0)} className="hover:text-[#6b21a8] transition-colors">Landing Page Konversi</Link></li>
            </ul>
          </div>

          {/* Column 2b: Local SEO */}
          <div className="lg:col-span-2">
            <h4 className="text-slate-900 font-sans font-bold tracking-widest uppercase text-[11px] mb-8">Area &amp; Solusi</h4>
            <ul className="space-y-4 text-sm font-sans text-slate-600">
              <li><Link to="/area/bsd-city" onClick={() => window.scrollTo(0,0)} className="hover:text-[#6b21a8] transition-colors">Jasa IT BSD City</Link></li>
              <li><Link to="/area/cisauk" onClick={() => window.scrollTo(0,0)} className="hover:text-[#6b21a8] transition-colors">Solusi Web Cisauk</Link></li>
              <li><Link to="/layanan/agentic-ai-automation" onClick={() => window.scrollTo(0,0)} className="hover:text-[#6b21a8] transition-colors">Agentic AI Indonesia</Link></li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="lg:col-span-2">
            <h4 className="text-slate-900 font-sans font-bold tracking-widest uppercase text-[11px] mb-8">Eksplorasi</h4>
            <ul className="space-y-4 text-sm font-sans text-slate-600">
              <li><Link to="/portfolio" onClick={() => window.scrollTo(0,0)} className="hover:text-purple-600 transition-colors">Showcase Portfolio</Link></li>
              <li><Link to="/case-studies" onClick={() => window.scrollTo(0,0)} className="hover:text-purple-600 transition-colors">Case Studies</Link></li>
              <li><Link to="/blog" onClick={() => window.scrollTo(0,0)} className="hover:text-purple-600 transition-colors">Artikel & Insights</Link></li>
              <li><Link to="/academy" onClick={() => window.scrollTo(0,0)} className="hover:text-purple-600 transition-colors">Academy &amp; Masterclass</Link></li>
              <li><Link to="/about" onClick={() => window.scrollTo(0,0)} className="hover:text-purple-600 transition-colors">Tentang Kami</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="lg:col-span-2">
            <h4 className="text-slate-900 font-sans font-bold tracking-widest uppercase text-[11px] mb-8">Informasi</h4>
            <ul className="space-y-5 text-sm font-sans text-slate-600">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="shrink-0 text-[#6b21a8] mt-0.5" />
                <span className="leading-relaxed">Jakarta, Indonesia.<br/>Remote Worldwide.</span>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle size={18} className="shrink-0 text-[#6b21a8]" />
                <span className="leading-relaxed">+62 821-2544-7232</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="shrink-0 text-[#6b21a8]" />
                <span className="leading-relaxed">chestaadotcom@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Big Text Bottom */}
        <div className="w-full border-t border-slate-100 pt-12 mt-12 flex flex-col items-center">
            {/* Massive typography for decorative brutalism aesthetic */}
            <div className="w-full mb-12 flex justify-center overflow-hidden">
                <h2 className="text-[12vw] font-display font-black tracking-tighter text-slate-900/[0.03] leading-none select-none pointer-events-none whitespace-nowrap">
                  CHESTAADOTCOM
                </h2>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-6 text-[10px] font-sans tracking-widest uppercase">
              <div className="flex items-center gap-4">
                  <span className="text-slate-900/30">© {new Date().getFullYear()} CHESTAADOTCOM. ALL RIGHTS RESERVED.</span>
              </div>
              <div className="flex gap-8">
                 <Link to="/" className="text-slate-900/30 hover:text-slate-900 transition-colors">Privacy Policy</Link>
                 <Link to="/" className="text-slate-900/30 hover:text-slate-900 transition-colors">Terms of Service</Link>
              </div>
            </div>
        </div>

        {/* SEO Context Snippets (Visually subtle but crawlable) */}
        <div className="mt-12 pt-8 border-t border-slate-50 grid grid-cols-1 md:grid-cols-2 gap-8 opacity-[0.4] text-[9px] font-sans leading-relaxed tracking-wider">
          <div>
            <h5 className="font-bold text-slate-900 uppercase mb-2">Tentang CHESTAADOTCOM</h5>
            <p>
              CHESTAADOTCOM adalah studio rekayasa perangkat lunak dan arsitektur digital premium yang berfokus pada transformasi B2B melalui solusi IT berperforma tinggi. Kami mengkhususkan diri dalam pengembangan website berbasis Next.js, sistem Enterprise, dan integrasi Agentic AI otonom untuk meningkatkan efisiensi operasional bisnis modern di Indonesia. Berbasis di BSD City, Tangerang, kami melayani mitra korporasi dari Jakarta hingga mancanegara.
            </p>
          </div>
          <div>
            <h5 className="font-bold text-slate-900 uppercase mb-2">Solusi Arsitektur Digital</h5>
            <p>
              Layanan kami mencakup Jasa Pembuatan Website Company Profile, E-Commerce Custom, Dashboard Analytics, dan Sistem Manajemen Konten (CMS) tanpa kepala. Kami juga pakar dalam optimasi SEO Teknis, Audit Core Web Vitals, serta pengembangan Agen AI untuk otomasi layanan pelanggan, pemrosesan dokumen otomatis, dan asisten cerdas berbasis Large Language Models (LLMs) seperti Gemini dan Claude.
            </p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
