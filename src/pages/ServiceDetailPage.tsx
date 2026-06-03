import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, CheckCircle2, ChevronRight, Plus, Minus } from 'lucide-react';
import { SERVICES_DATA } from '../data/ServicesData';
import { CITIES } from '../data/AreasData';
import MetaTags from '../components/atoms/MetaTags';

function renderSlideGraphics(slug: string, pointIndex: number) {
  // Return different interactive premium CSS assets depending on index forPembuatan Website specifically, or clean falling defaults
  if (slug === 'pembuatan-website') {
    switch (pointIndex) {
      case 0: // UI/UX
        return (
          <div className="w-full h-full flex flex-col justify-between p-6 bg-[#090D15] rounded-2xl border border-white/5 font-mono select-none text-left">
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <span className="text-[9px] text-[#D4FF00]">UI/UX CANVAS SYSTEM</span>
              <span className="text-[8px] text-gray-500">SCALE: 100%</span>
            </div>
            <div className="grid grid-cols-3 gap-3 my-auto">
              <div className="aspect-square bg-white/[0.02] border border-white/10 rounded-xl flex flex-col items-center justify-center p-2 relative overflow-hidden group">
                <span className="text-[18px] text-[#D4FF40] font-bold">&lt;/&gt;</span>
                <span className="text-[8px] text-gray-400 mt-1">Grid System</span>
              </div>
              <div className="aspect-square bg-[#D4FF00]/[0.02] border border-[#D4FF00]/35 rounded-xl flex flex-col items-center justify-center p-2 relative overflow-hidden group">
                <span className="text-[18px] text-teal-400 font-bold">Aa</span>
                <span className="text-[8px] text-[#D4FF00] mt-1">Inter Display</span>
              </div>
              <div className="aspect-square bg-white/[0.02] border border-white/10 rounded-xl flex flex-col items-center justify-center p-2 relative overflow-hidden group">
                <span className="text-[18px] text-indigo-400 font-bold">&#9670;</span>
                <span className="text-[8px] text-gray-400 mt-1">No Template</span>
              </div>
            </div>
            <div className="flex justify-between text-[8px] text-gray-500">
              <span>WIREFRAME_READY</span>
              <span className="text-emerald-400">PASSING</span>
            </div>
          </div>
        );
      case 1: // Performa Tinggi
        return (
          <div className="w-full h-full flex flex-col justify-between p-6 bg-[#090D15] rounded-2xl border border-white/5 font-mono select-none text-left">
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <span className="text-[9px] text-emerald-400">CORE WEB VITALS</span>
              <span className="text-[8px] text-gray-500">LIVE MONITOR</span>
            </div>
            <div className="my-auto text-center space-y-2">
              <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-[#D4FF00]">0.8s</span>
              <p className="text-[10px] text-gray-400">OPTIMAL LOADING LATENCY</p>
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[9px] text-emerald-400 mx-auto">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                GRADE A PERFORMANCE
              </div>
            </div>
            <div className="flex justify-between text-[8px] text-gray-500">
              <span>99% LIGHTHOUSE</span>
              <span className="text-emerald-400">STABLE</span>
            </div>
          </div>
        );
      case 2: // SEO Optimized
        return (
          <div className="w-full h-full flex flex-col justify-between p-6 bg-[#090D15] rounded-2xl border border-white/5 font-mono select-none text-left">
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <span className="text-[9px] text-purple-400">GOOGLE SEARCH RANKING</span>
              <span className="text-[8px] text-gray-500">INDEX: ON</span>
            </div>
            <div className="my-auto space-y-2.5">
              <div className="p-2 border border-[#D4FF00]/10 bg-[#131825]/20 rounded-lg text-left">
                <span className="text-[#D4FF00] text-[9px] block">https://bisnis-kamu.com</span>
                <span className="text-white text-[11px] font-sans font-bold block mt-0.5">Brand Paling Terpercaya di Indonesia</span>
                <p className="text-gray-400 text-[10px] font-sans line-clamp-1 mt-0.5">Clean, cepat, premium, dan langsung terhubung ke layanan kami...</p>
              </div>
              <div className="flex gap-2 text-[9px]">
                <span className="px-2 py-0.5 bg-white/5 rounded text-gray-400 border border-white/5">#1 ON GEOGRAPHY</span>
                <span className="px-2 py-0.5 bg-[#D4FF00]/10 rounded text-[#D4FF00]">CTR +54%</span>
              </div>
            </div>
            <div className="flex justify-between text-[8px] text-gray-500">
              <span>ROBOTS.TXT: READY</span>
              <span className="text-[#D4FF00]">RANKED</span>
            </div>
          </div>
        );
      case 3: // Mobile Responsive
        return (
          <div className="w-full h-full flex flex-col justify-between p-6 bg-[#090D15] rounded-2xl border border-white/5 font-mono select-none text-left">
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <span className="text-[9px] text-[#D4FF00]">MOBILE-FIRST ADAPTIVE</span>
              <span className="text-[8px] text-gray-500">VIEWSTAGE</span>
            </div>
            <div className="my-auto flex justify-center">
              <div className="w-[125px] h-[150px] border border-white/10 rounded-2xl p-2 bg-[#06080F] relative overflow-hidden flex flex-col justify-between">
                <div className="absolute top-1 left-1/2 -translate-x-1/2 w-8 h-2 bg-white/10 rounded-full" />
                <div className="w-full h-1 bg-[#D4FF00] mt-3 rounded-full" />
                <div className="space-y-1.5 my-auto">
                  <div className="w-full h-6 bg-white/[0.02] border border-white/5 rounded flex items-center px-1">
                    <span className="text-[5px] text-gray-400 truncate">💬 TARGET CHAT WA</span>
                  </div>
                  <div className="w-full h-3 bg-white/[0.01] rounded" />
                </div>
                <div className="flex justify-between text-[5px] text-gray-650">
                  <span>SSL SECURE</span>
                  <span>100% RESPONSIVE</span>
                </div>
              </div>
            </div>
            <div className="flex justify-between text-[8px] text-gray-500">
              <span>TOUCH_TARGET: 44PX</span>
              <span className="text-emerald-400">PASSED</span>
            </div>
          </div>
        );
    }
  }

  // Fallback design graphics for other services
  return (
    <div className="w-full h-full flex flex-col justify-between p-6 bg-[#090D15] rounded-2xl border border-white/5 font-mono select-none text-left">
      <div className="flex justify-between items-center border-b border-white/5 pb-2">
        <span className="text-[9px] text-[#D4FF00]">INTERACTIVE ARCHETYPE {pointIndex + 1}</span>
        <span className="text-[8px] text-gray-500">CHESTADOTCOM</span>
      </div>
      <div className="my-auto space-y-3 p-3 bg-white/[0.01] border border-white/5 rounded-xl text-left">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4FF00] animate-pulse" />
          <span className="text-[10px] text-white font-sans font-bold uppercase tracking-wide">DIGITAL COMPONENT {pointIndex + 1}</span>
        </div>
        <p className="text-[10px] text-gray-450 leading-relaxed font-sans">
          Arsitektur premium yang dirancang secara khusus untuk mendongkrak performa konversi regional dengan standar visual 2026.
        </p>
        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
          <div className="w-[85%] h-full bg-[#D4FF00]" />
        </div>
      </div>
      <div className="flex justify-between text-[8px] text-gray-500">
        <span>SWIPE_DETECTION</span>
        <span className="text-teal-400">ACTIVE</span>
      </div>
    </div>
  );
}

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const service = SERVICES_DATA.find((s) => s.slug === slug);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  if (!service) return <Navigate to="/services" />;

  const handleWhatsAppClick = () => {
    const text = `Halo, saya tertarik dengan layanan ${service.name}. Bisa konsultasi lebih lanjut?`;
    window.open(`https://wa.me/6282125447232?text=${encodeURIComponent(text)}`, '_blank');
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % service.points.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + service.points.length) % service.points.length);
  };

  const handleDragEnd = (_event: any, info: any) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      nextSlide();
    } else if (info.offset.x > swipeThreshold) {
      prevSlide();
    }
  };

  return (
    <div className="pt-32 pb-20 px-6 max-w-5xl mx-auto bg-transparent min-h-screen text-white">
      <MetaTags 
        title={`${service.name} Profesional - CHESTADOTCOM`}
        description={service.desc}
      />

      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-20"
      >
        <div className="inline-flex items-center gap-3 mb-6">
            <span className="h-0.5 w-8 bg-[#D4FF00]"></span>
            <span className="text-sm font-sans font-medium text-gray-400 tracking-widest uppercase text-center inline-block pt-1">
                Layanan CHESTADOTCOM
            </span>
            <span className="h-0.5 w-8 bg-[#D4FF00]"></span>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium tracking-tight mb-6">
          {service.title}
        </h1>
        <p className="text-base md:text-lg font-sans text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed">
          {service.desc}
        </p>
        <button 
          onClick={handleWhatsAppClick}
          className="inline-flex items-center gap-2 bg-[#D4FF00] text-[#06080F] px-6 py-3 rounded-full font-sans font-bold text-xs uppercase tracking-wider hover:bg-[#c2e600] transition-colors shadow-[0_0_40px_rgba(212,255,0,0.15)]"
        >
          <MessageCircle size={16} /> {service.buttonText}
        </button>
      </motion.div>

      {/* Points */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
        {service.points.map((pt, i) => (
            <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#131825]/50 backdrop-blur-md border border-white/5 p-8 rounded-3xl hover:border-white/10 transition-colors text-left"
            >
                <div className="w-12 h-12 rounded-2xl bg-white/5 text-[#D4FF00] flex items-center justify-center mb-6">
                    <CheckCircle2 size={24} />
                </div>
                <h3 className="text-lg font-bold font-sans mb-3 text-white">{pt.title}</h3>
                <p className="text-sm font-sans text-gray-400 leading-relaxed">{pt.desc}</p>
            </motion.div>
        ))}
      </div>

      {/* SWIPEABLE FEATURE CAROUSEL (Framer Motion gestures + swipe indicators for high fidelity mobile experience) */}
      <div className="mb-32">
        <div className="text-center mb-10">
          <span className="text-[#D4FF00] font-mono text-[9px] uppercase tracking-[0.25em] inline-flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-full border border-white/10 mb-4 animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
            SWIPEABLE INTERACTIVE PREVIEW
          </span>
          <h2 className="text-3xl font-display font-medium tracking-tight mb-2">Eksplorasi Detil Fitur Unggulan</h2>
          <p className="text-xs text-gray-400 font-sans max-w-md mx-auto">Geser/swipe ke kiri atau kanan untuk menjelajahi komponen arsitektur premium kami pada perangkat pintar Anda.</p>
        </div>

        {/* Carousel Box */}
        <div className="max-w-4xl mx-auto bg-[#0B0F19]/60 border border-white/5 rounded-3xl p-6 md:p-8 relative overflow-hidden backdrop-blur-md">
          {/* Accent glow background */}
          <div className="absolute top-0 left-0 w-48 h-48 bg-[#D4FF00]/5 rounded-full filter blur-3xl pointer-events-none" />

          {/* Swipeable Container */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center min-h-[300px] cursor-grab active:cursor-grabbing"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
          >
            {/* Left Graphics Showcase Panel */}
            <div className="md:col-span-6 flex items-center justify-center select-none pointer-events-none h-[250px]">
              <div className="w-full max-w-[340px] h-full">
                {renderSlideGraphics(service.slug, currentSlide)}
              </div>
            </div>

            {/* Right Info Description Panel */}
            <div className="md:col-span-6 text-left flex flex-col justify-center space-y-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-3xl font-extrabold text-[#D4FF00]/20">0{currentSlide + 1}</span>
                <span className="font-mono text-[10px] text-gray-500 tracking-widest uppercase">CORE COMPONENT</span>
              </div>

              <h3 className="text-xl font-display font-bold text-white tracking-tight">
                {service.points[currentSlide].title}
              </h3>

              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-sans">
                {service.points[currentSlide].desc}
              </p>

              <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 text-[11px] text-gray-500 font-sans leading-relaxed">
                *Rancangan ini menggunakan standar Web 2026. Performa optimasi performa ultra-ringan memangkas pantulan user (bounce-rate) secara radikal demi mendorong interaksi pesat pelanggan.
              </div>

              {/* Progress pagination indicators */}
              <div className="flex items-center gap-2 pt-2">
                {service.points.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${i === currentSlide ? 'w-8 bg-[#D4FF00]' : 'w-2 bg-white/15'}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Explicit Nav Helpers hidden on touch devices for absolute simplicity */}
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-white/10 bg-[#06080F]/80 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 hover:bg-[#06080F] transition-all hidden md:flex z-40 select-none font-bold"
          >
            &larr;
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-white/10 bg-[#06080F]/80 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 hover:bg-[#06080F] transition-all hidden md:flex z-40 select-none font-bold"
          >
            &rarr;
          </button>
        </div>
      </div>

      {/* Comparison */}
      <div className="mb-32">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-medium tracking-tight mb-4">{service.comparison.title}</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6 items-stretch max-w-4xl mx-auto">
            {/* Theirs */}
            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="border border-white/5 rounded-3xl p-6 md:p-8 bg-white/5 opacity-50 grayscale"
            >
                <h3 className="text-xl font-display font-medium text-center mb-6 pb-6 border-b border-white/10">{service.comparison.theirs.title}</h3>
                <ul className="space-y-4 font-sans text-sm">
                    {service.comparison.theirs.items.map((item, i) => (
                        <li key={i} className="flex gap-3 text-gray-400 items-start">
                           <span className="text-red-500 font-bold">✕</span> {item}
                        </li>
                    ))}
                </ul>
            </motion.div>
            
            {/* Ours */}
            <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="border border-[#D4FF00]/20 rounded-3xl p-6 md:p-8 bg-gradient-to-b from-[#D4FF00]/5 to-transparent shadow-[0_8px_32px_rgba(212,255,0,0.05)] relative"
            >
                <div className="absolute top-0 right-6 -translate-y-1/2 bg-[#D4FF00] text-[#06080F] text-[10px] font-sans font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">Standar Kami</div>
                <h3 className="text-xl font-display font-medium text-center mb-6 pb-6 border-b border-white/10">{service.comparison.ours.title}</h3>
                <ul className="space-y-4 font-sans text-sm">
                    {service.comparison.ours.items.map((item, i) => (
                        <li key={i} className="flex gap-3 text-white items-start">
                           <span className="text-[#D4FF00] font-bold">✓</span> {item}
                        </li>
                    ))}
                </ul>
            </motion.div>
        </div>
      </div>

      {/* Benefits */}
      <div className="mb-32">
        <h2 className="text-3xl font-display font-medium tracking-tight mb-10 text-center">Benefit yang Anda Dapatkan</h2>
        <div className="grid md:grid-cols-3 gap-6">
            {service.benefits.map((benefit, i) => (
                <div key={i} className="p-8 bg-white/5 rounded-3xl border border-white/5">
                    <h3 className="text-xl font-bold font-sans tracking-tight mb-3 text-white flex items-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D4FF00] inline-block"/>
                        {benefit.title}
                    </h3>
                    <p className="text-sm font-sans text-gray-400 leading-relaxed">{benefit.desc}</p>
                </div>
            ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="mb-32 max-w-3xl mx-auto">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-medium tracking-tight text-white mb-4">Pertanyaan Seputar Layanan Ini</h2>
        </div>
        <div className="space-y-4">
            {service.faqs.map((faq, i) => {
                const isOpen = openFaq === i;
                return (
                    <div 
                        key={i} 
                        className={`border border-white/5 rounded-2xl bg-[#131825]/50 backdrop-blur-md overflow-hidden transition-colors ${isOpen ? 'border-[#D4FF00]/30' : 'hover:border-white/10 hover:bg-[#131825]'}`}
                    >
                        <button
                            onClick={() => setOpenFaq(isOpen ? null : i)}
                            className="w-full flex items-center justify-between p-6 text-left"
                        >
                            <h4 className={`font-bold font-sans pr-8 transition-colors ${isOpen ? 'text-[#D4FF00]' : 'text-white'}`}>
                                {faq.q}
                            </h4>
                            <div className={`shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${isOpen ? 'border-[#D4FF00]/50 bg-[#D4FF00]/10 text-[#D4FF00] rotate-180' : 'border-white/10 text-gray-400 bg-white/5'}`}>
                                {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                            </div>
                        </button>
                        <AnimatePresence>
                            {isOpen && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                >
                                    <div className="px-6 pb-6 text-sm font-sans text-gray-400 leading-relaxed border-t border-white/5 pt-4">
                                        {faq.a}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                );
            })}
        </div>
      </div>

      {/* Layanan Lainnya */}
      <div className="mb-32">
        <div className="flex items-center gap-4 mb-8">
           <div className="h-[1px] flex-grow bg-white/5"></div>
           <h3 className="text-[10px] font-sans font-bold tracking-[0.2em] text-[#D4FF00] uppercase text-center shrink-0">Explore Layanan Lainnya</h3>
           <div className="h-[1px] flex-grow bg-white/5"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICES_DATA.filter(s => s.slug !== service.slug).map((s, i) => (
                <motion.div
                  key={s.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link 
                    to={`/layanan/${s.slug}`} 
                    onClick={() => window.scrollTo(0, 0)} 
                    className="group flex flex-col justify-between p-6 bg-[#131825]/30 border border-white/5 rounded-3xl hover:bg-[#131825]/80 hover:border-white/10 transition-all duration-300 h-full relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#D4FF00]/0 to-[#D4FF00]/0 group-hover:from-[#D4FF00]/[0.03] transition-all duration-500 pointer-events-none" />
                    <div className="flex justify-between items-start mb-8 relative z-10">
                      <div className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-xl text-gray-400 group-hover:text-[#D4FF00] transition-colors border border-white/5 group-hover:border-[#D4FF00]/20">
                         <s.icon size={18} />
                      </div>
                      <div className="w-8 h-8 rounded-full border border-white/5 flex items-center justify-center group-hover:bg-[#D4FF00] group-hover:border-[#D4FF00] transition-all duration-300">
                          <ChevronRight size={14} className="text-gray-500 group-hover:text-[#06080F] transition-colors" />
                      </div>
                    </div>
                    <h4 className="text-base font-bold font-sans text-gray-200 tracking-tight relative z-10 group-hover:text-white transition-colors">{s.name}</h4>
                  </Link>
                </motion.div>
            ))}
        </div>
      </div>

      {/* Area Layanan Prioritas (SEO) */}
      <div className="mb-32">
        <div className="flex items-center gap-4 mb-8">
           <div className="h-[1px] flex-grow bg-white/5"></div>
           <h3 className="text-[10px] font-sans font-bold tracking-[0.2em] text-[#D4FF00] uppercase text-center shrink-0">Area Jangkauan Prioritas</h3>
           <div className="h-[1px] flex-grow bg-white/5"></div>
        </div>
        <p className="text-center text-xs text-gray-400 font-sans mb-8 max-w-lg mx-auto leading-relaxed">
          Kami mengoptimalkan kehadiran digital UMKM & brand lokal di berbagai kota besar Indonesia melalui pengerjaan kolaboratif remote dan on-site yang efisien.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {CITIES.map((city) => (
            <Link
              key={city}
              to={`/area/${city.toLowerCase()}`}
              className="group flex items-center justify-between p-3.5 bg-[#131825]/20 border border-white/5 rounded-xl hover:bg-[#131825]/60 hover:border-[#D4FF00]/30 transition-all font-mono text-[10px] tracking-wider text-gray-400 hover:text-white cursor-pointer text-left overflow-hidden hover:scale-[1.02] duration-300"
            >
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4FF00]/30 group-hover:bg-[#D4FF00] group-hover:animate-pulse transition-all" />
                <span className="font-bold">{city}</span>
              </div>
              <ChevronRight size={10} className="text-gray-600 group-hover:text-[#D4FF00] group-hover:translate-x-0.5 transition-all" />
            </Link>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="text-center p-8 md:p-12 bg-[#131825] border border-white/5 rounded-3xl relative overflow-hidden mb-8"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-[#D4FF00]/10 via-transparent to-transparent opacity-50 pointer-events-none" />
        <h2 className="text-3xl md:text-4xl font-display font-medium tracking-tight mb-4 text-white">
            Siap Memulai?
        </h2>
        <p className="text-gray-400 font-sans max-w-md mx-auto mb-8 leading-relaxed text-sm">Konsultasikan kebutuhan Anda bersama spesialis kami, gratis tanpa komitmen apapun.</p>
        <button 
          onClick={handleWhatsAppClick}
          className="inline-flex items-center gap-2 bg-[#D4FF00] text-[#06080F] px-6 py-3 rounded-full font-sans font-bold text-xs uppercase tracking-wider hover:bg-[#c2e600] transition-colors"
        >
          <MessageCircle size={16} /> {service.buttonText}
        </button>
      </motion.div>
    </div>
  );
}
