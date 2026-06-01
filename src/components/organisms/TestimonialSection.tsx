import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, MessageSquare, ShieldCheck, ArrowUpRight, ArrowLeft, ArrowRight, Quote } from 'lucide-react';
import TextRevealSmooth from '../atoms/TextRevealSmooth';

interface Testimonial {
  name: string;
  position: string;
  companyName: string;
  industry: string;
  avatar: string;
  metric: string;
  metricLabel: string;
  comment: string;
  highlightText: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Mas Budi Setiawan",
    position: "Owner",
    companyName: "Kopi Selasar",
    industry: "Cafe & Roastery",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
    metric: "+300% Leads",
    metricLabel: "B2B Closing",
    comment: "Mas Chesta! Gila sih ini web barunya kenceng banget pas tak coba pake wifi kampung pun langsung kebukak smoothly. Awalnya ragu buat website karena banyak agensi bikin website asal jadi & lemot. Baru seminggu launch, ada 3 korporasi masuk lewat form website langsung nego supply biji kopi ke kafe mereka!",
    highlightText: "Ada 3 korporasi masuk lewat form website langsung nego supply biji kopi!"
  },
  {
    name: "dr. Farah Nabila",
    position: "Founder",
    companyName: "Selasar Aesthetic",
    industry: "Klinik Kecantikan Premium",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop",
    metric: "Page #1 Google",
    metricLabel: "SEO Lokal",
    comment: "Website kliniknya dapet feedback bagus banget dari para pasien. Banyak yang muji tampilan website kita yang sangat premium dan clean bgt, ga murahan kayak web klinik lain. Dan pasien baru yang booking slot via web langsung naik tajam semenjak launch! Udah masuk halaman kesatu Google buat keyword lokal klinik kecantikan.",
    highlightText: "Pasien baru booking slot via web naik tajam & masuk halaman kesatu Google!"
  },
  {
    name: "Pak Hendra Wijaya",
    position: "Director",
    companyName: "Delta Legal Partners",
    industry: "Corporate Law Firm",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=150&auto=format&fit=crop",
    metric: "99% Trust Score",
    metricLabel: "Ulasan Klien",
    comment: "Saya ingin menyampaikan apresiasi tinggi dari tim direksi atas peluncuran website baru Delta Legal. Kualitas penulisan kodenya sangat rapi dan response tim anda sangat tanggap serta solutif dalam menangani revisi konten. Kredibilitas kami di mata klien korporasi baru langsung terangkat secara instan.",
    highlightText: "Kredibilitas kami di mata klien korporasi baru langsung terangkat secara instan."
  },
  {
    name: "Kak Amanda Putri",
    position: "Founder",
    companyName: "Bloom & Co Florist",
    industry: "Artisanal Florist",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop",
    metric: "+240% Order",
    metricLabel: "WhatsApp Booking",
    comment: "Kak Chesta! Makasih banyak yaa webnya cantikkk bangeeettt. Detail layout, font, sama penempatan tombol WhatsApp-nya pas bgt di jempol pas buka di hp. Hari ini aja flow pesanan florist masuk lancar bgt dan ga ada komplain eror dari pembeli. Memang beda bgt rasanya bikin custom web.",
    highlightText: "Flow pesanan florist masuk lancar bgt tanpa ada komplain eror dari pembeli."
  }
];

export default function TestimonialSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [isHovered, setIsHovered] = useState(false);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.96
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring" as const, stiffness: 180, damping: 20 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 }
      }
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -100 : 100,
      opacity: 0,
      scale: 0.96,
      transition: {
        x: { type: "spring" as const, stiffness: 180, damping: 20 },
        opacity: { duration: 0.3 }
      }
    })
  };

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Autoplay function
  useEffect(() => {
    if (!isHovered) {
      autoplayRef.current = setInterval(() => {
        handleNext();
      }, 7000);
    }
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [isHovered, activeIndex]);

  const current = testimonials[activeIndex];

  return (
    <section 
      className="py-24 md:py-32 relative overflow-hidden bg-transparent text-white w-full select-none" 
      id="testimonials"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Seamless background blending gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent pointer-events-none" />
      {/* Background glowing light spots */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-[#D4FF00]/3 rounded-full filter blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-indigo-500/2 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-5xl px-6 relative z-10 w-full">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[1px] bg-[#D4FF00]" />
            <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-[#D4FF00] uppercase pt-0.5">
              TESTIMONIAL & ULASAN KLIEN
            </span>
          </div>
          
          <div className="text-3xl sm:text-5xl font-display font-medium tracking-tight leading-tight mb-6">
            <TextRevealSmooth 
              text="Ulasan Klien yang Membuktikan Kinerja Nyata." 
              highlightWords={["Membuktikan", "Kinerja", "Nyata."]}
              highlightClass="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-[#D4FF00] to-emerald-300 pl-1"
            />
          </div>
          
          <p className="text-gray-400 font-sans text-xs sm:text-sm max-w-xl leading-relaxed">
            Kutipan ulasan & pesan asli yang dikirimkan oleh mitra UMKM dan brand lokal kami sesaat setelah website fungsional mereka resmi diluncurkan secara publik.
          </p>
        </div>

        {/* Premium Core Slider Box */}
        <div className="relative min-h-[460px] sm:min-h-[380px] lg:min-h-[340px] flex flex-col justify-center bg-gradient-to-b from-[#131825]/40 to-transparent border border-white/5 rounded-3xl p-6 sm:p-10 md:p-12 shadow-[0_24px_80px_rgba(0,0,0,0.6)] backdrop-blur-md overflow-hidden">
          
          {/* Subtle top horizontal highlighting line inside the card */}
          <div className="absolute top-0 inset-x-12 h-[1px] bg-gradient-to-r from-transparent via-[#D4FF00]/40 to-transparent" />
          
          {/* Large aesthetic quotes decoration */}
          <div className="absolute top-8 right-10 text-[120px] font-serif text-white/[0.02] pointer-events-none leading-none select-none">
            <Quote size={80} strokeWidth={1} className="text-white/[0.015]" />
          </div>

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start lg:items-center justify-between h-full"
            >
              
              {/* Left Column: Testimonial core message & quote context */}
              <div className="flex-1 space-y-6">
                
                {/* Five-Star trust score indicator */}
                <div className="flex items-center gap-1 text-[#D4FF00]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} fill="currentColor" className="stroke-none" />
                  ))}
                  <span className="text-[10px] font-mono text-gray-400 ml-2 uppercase tracking-widest bg-white/5 border border-white/10 px-2.5 py-0.5 rounded">
                    5.0 RATED
                  </span>
                </div>

                {/* Main Client Comment */}
                <p className="text-sm sm:text-lg md:text-xl font-sans text-gray-200 leading-relaxed font-normal tracking-tight">
                  "{current.comment}"
                </p>

                {/* User author bio block */}
                <div className="flex items-center gap-4 pt-2">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#D4FF00]/30 shrink-0 bg-[#0A0D16]">
                    <img 
                      src={current.avatar} 
                      alt={current.name} 
                      className="w-full h-full object-cover transition-all duration-300"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-white text-base">
                      {current.name}
                    </h4>
                    <p className="text-xs font-sans text-gray-400">
                      {current.position} &bull; <span className="text-[#D4FF00] font-sans font-medium">{current.companyName}</span> ({current.industry})
                    </p>
                  </div>
                </div>

              </div>

              {/* Right Column: Performance Badge metrics box */}
              <div className="w-full lg:w-auto shrink-0 flex flex-col justify-center items-stretch lg:items-end gap-3 lg:border-l lg:border-white/5 lg:pl-10">
                <div className="bg-[#131825]/80 border border-[#D4FF00]/20 px-6 py-5 rounded-2xl flex flex-col sm:flex-row lg:flex-col items-start gap-3 shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#D4FF00]/10 text-[#D4FF00]">
                      <ShieldCheck size={12} strokeWidth={2.5} />
                    </span>
                    <span className="text-[10px] text-emerald-400 font-mono font-bold tracking-widest uppercase">Verified Peak</span>
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-3xl font-mono font-black text-[#D4FF00] tracking-tight">{current.metric}</span>
                    <span className="text-[10px] text-gray-400 uppercase font-mono tracking-wider">{current.metricLabel}</span>
                  </div>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>

          {/* Slider bottom controls: Dot Indicators & Prev/Next Arrows */}
          <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between gap-6 relative z-10">
            
            {/* Playback dots */}
            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > activeIndex ? 1 : -1);
                    setActiveIndex(idx);
                  }}
                  className={`h-2.5 rounded-full transition-all duration-500 hover:bg-[#D4FF00]/60 ${idx === activeIndex ? 'w-8 bg-[#D4FF00]' : 'w-2.5 bg-white/15'}`}
                  aria-label={`Slide to testimonial ${idx + 1}`}
                />
              ))}
            </div>

            {/* Nav Arrows */}
            <div className="flex gap-3">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full border border-white/10 bg-white/5 text-gray-300 hover:text-white hover:border-[#D4FF00]/40 hover:bg-white/[0.08] transition-all flex items-center justify-center select-none active:scale-95"
                aria-label="Previous testimonial"
              >
                <ArrowLeft size={16} />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full border border-white/10 bg-white/5 text-gray-300 hover:text-white hover:border-[#D4FF00]/40 hover:bg-white/[0.08] transition-all flex items-center justify-center select-none active:scale-95"
                aria-label="Next testimonial"
              >
                <ArrowRight size={16} />
              </button>
            </div>

          </div>

        </div>

        {/* Dynamic call to action with a mini review badge */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 max-w-5xl border border-white/5 rounded-3xl p-6 sm:p-8 bg-white/[0.01] backdrop-blur-sm relative overflow-hidden">
          <div className="absolute top-0 right-12 w-24 h-24 bg-[#D4FF00]/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#131825] border border-white/10 flex items-center justify-center text-[#D4FF00] shrink-0">
              <MessageSquare size={16} />
            </div>
            <div>
              <h5 className="font-display font-medium text-white text-sm sm:text-base tracking-tight">Ingin performa bisnis melesat seperti mereka?</h5>
              <p className="text-gray-400 text-xs sm:text-sm font-sans mt-0.5">Konsultasi gratis lewat obrolan santai WhatsApp sekarang.</p>
            </div>
          </div>

          <a
            href="https://wa.me/6282125447232?text=Halo%2520CHESTADOTCOM%252C%2520saya%2520melihat%2520feedback%2520klien%2520Anda%2520dan%2520tertarik%2520dengan%2520layanan%2520pembuatan%2520website%2520premium."
            target="_blank"
            rel="noopener noreferrer"
            className="group whitespace-nowrap inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#D4FF00] text-[#06080F] font-mono font-bold text-xs tracking-wider uppercase shadow-[0_10px_25px_rgba(212,255,0,0.25)] hover:shadow-[0_15px_35px_rgba(212,255,0,0.4)] hover:bg-[#e1ff2a] transition-all duration-300"
          >
            <span>HUBUNGI VIA WA</span>
            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

      </div>
    </section>
  );
}
