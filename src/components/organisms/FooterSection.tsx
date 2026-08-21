import { Link } from 'react-router-dom';
import { Instagram, MessageCircle, Mail, MapPin, ArrowRight } from 'lucide-react';

export default function FooterSection() {
  return (
    <footer className="pt-24 pb-12 bg-transparent text-slate-600 border-t border-slate-100 relative overflow-hidden">
      {/* Seamless background blending gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.008] to-transparent pointer-events-none" />
      {/* Decorative Glow */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#4f46e5]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-[1400px] px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-24">
          
          {/* Column 1: Brand */}
          <div className="lg:col-span-4 space-y-8 pr-8">
            <Link to="/" onClick={() => window.scrollTo(0,0)} className="inline-flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center group-hover:border-[#4f46e5]/40 transition-colors duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
                <svg className="w-6 h-6 text-[#4f46e5] group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m12 3-8 8 8 8 8-8-8-8z" />
                  <path d="m12 8-4 4 4 4 4-4-4-4z" />
                </svg>
              </div>
              <span className="font-display text-2xl font-extrabold tracking-tight leading-none text-slate-900">
                CHESTA<span className="text-[#4f46e5]">.</span>
              </span>
            </Link>
            <p className="text-base font-sans leading-relaxed text-slate-600 max-w-sm">
              Arsitektur digital premium untuk UMKM dan Brand lokal. Transformasi digital yang fokus pada performa, estetika, dan konversi nyata di tahun 2026.
            </p>
            <div className="flex gap-4">
              <a href="https://instagram.com/chestadotcom" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center hover:bg-[#4f46e5] hover:text-white hover:border-[#4f46e5] transition-all duration-300">
                <Instagram size={20} strokeWidth={1.5} />
              </a>
              <a href="https://wa.me/6282125447232" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center hover:bg-[#4f46e5] hover:text-white hover:border-[#4f46e5] transition-all duration-300">
                <MessageCircle size={20} strokeWidth={1.5} />
              </a>
              <a href="mailto:chestadotcom@gmail.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center hover:bg-[#4f46e5] hover:text-white hover:border-[#4f46e5] transition-all duration-300">
                <Mail size={20} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h4 className="text-slate-900 font-sans font-bold tracking-widest uppercase text-[11px] mb-8">Layanan Utama</h4>
            <ul className="space-y-4 text-sm font-sans text-slate-600">
              <li><Link to="/layanan/website-company-profile" onClick={() => window.scrollTo(0,0)} className="hover:text-[#4f46e5] transition-colors">Web Development</Link></li>
              <li><Link to="/layanan/jasa-seo" onClick={() => window.scrollTo(0,0)} className="hover:text-[#4f46e5] transition-colors">Optimasi SEO Expert</Link></li>
              <li><Link to="/layanan/website-toko-online" onClick={() => window.scrollTo(0,0)} className="hover:text-[#4f46e5] transition-colors">E-Commerce Setup</Link></li>
              <li><Link to="/layanan/landing-page" onClick={() => window.scrollTo(0,0)} className="hover:text-[#4f46e5] transition-colors">Landing Page Konversi</Link></li>
              <li className="pt-2">
                <Link to="/services" onClick={() => window.scrollTo(0,0)} className="text-slate-900 hover:text-[#4f46e5] transition-colors flex items-center gap-1 group w-max">
                  <span className="font-medium">Lihat Semua</span> 
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="lg:col-span-2">
            <h4 className="text-slate-900 font-sans font-bold tracking-widest uppercase text-[11px] mb-8">Eksplorasi</h4>
            <ul className="space-y-4 text-sm font-sans text-slate-600">
              <li><Link to="/projects" onClick={() => window.scrollTo(0,0)} className="hover:text-[#4f46e5] transition-colors">Showcase Portfolio</Link></li>
              <li><Link to="/blog" onClick={() => window.scrollTo(0,0)} className="hover:text-[#4f46e5] transition-colors">Artikel & Insights</Link></li>
              <li><Link to="/about" onClick={() => window.scrollTo(0,0)} className="hover:text-[#4f46e5] transition-colors">Tentang Kami</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="lg:col-span-2">
            <h4 className="text-slate-900 font-sans font-bold tracking-widest uppercase text-[11px] mb-8">Informasi</h4>
            <ul className="space-y-5 text-sm font-sans text-slate-600">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="shrink-0 text-[#4f46e5] mt-0.5" />
                <span className="leading-relaxed">Jakarta, Indonesia.<br/>Remote Worldwide.</span>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle size={18} className="shrink-0 text-[#4f46e5]" />
                <span className="leading-relaxed">+62 821-2544-7232</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Big Text Bottom */}
        <div className="w-full border-t border-slate-100 pt-12 mt-12 flex flex-col items-center">
            {/* Massive typography for decorative brutalism aesthetic */}
            <div className="w-full mb-12 flex justify-center overflow-hidden">
                <h2 className="text-[12vw] font-display font-extrabold tracking-tighter text-slate-900/[0.03] leading-none select-none pointer-events-none whitespace-nowrap">
                  CHESTADOTCOM
                </h2>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-6 text-[10px] font-sans tracking-widest uppercase">
              <div className="flex items-center gap-4">
                  <span className="text-slate-900/30">© 2026 CHESTADOTCOM. ALL RIGHTS RESERVED.</span>
              </div>
              <div className="flex gap-8">
                 <Link to="/" className="text-slate-900/30 hover:text-slate-900 transition-colors">Privacy Policy</Link>
                 <Link to="/" className="text-slate-900/30 hover:text-slate-900 transition-colors">Terms of Service</Link>
              </div>
            </div>
        </div>
      </div>
    </footer>
  );
}
