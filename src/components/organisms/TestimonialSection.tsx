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
    companyName: "Local Artisan Cafe",
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
    companyName: "Premium Aesthetic Clinic",
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
    companyName: "Corporate Law Group",
    industry: "Corporate Law Firm",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=150&auto=format&fit=crop",
    metric: "99% Trust Score",
    metricLabel: "Ulasan Klien",
    comment: "Saya ingin menyampaikan apresiasi tinggi atas peluncuran website baru firma kami. Kualitas penulisan kodenya sangat rapi dan response tim sangat tanggap serta solutif dalam menangani materi. Kredibilitas kami di mata klien korporasi baru langsung terangkat secara instan.",
    highlightText: "Kredibilitas kami di mata klien korporasi baru langsung terangkat secara instan."
  },
  {
    name: "Kak Amanda Putri",
    position: "Founder",
    companyName: "Artisanal Florist",
    industry: "Floral Design",
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
      className="py-4 sm:py-8 md:py-12 relative overflow-hidden bg-transparent text-slate-900 w-full select-none" 
      id="testimonials"
    >
      <div className="mx-auto max-w-4xl px-3 sm:px-6 relative z-10 w-full">
        
        <div className="mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-2xs mb-4">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-600">
              SOCIAL PROOF & REPUTASI
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight text-slate-900 mb-3">
            Dipercaya oleh Bisnis Terkemuka.
          </h2>
          <p className="text-slate-500 text-sm sm:text-base font-sans">
            Testimoni otentik dari pemilik bisnis, founder startup, dan pimpinan korporasi.
          </p>
        </div>

        {/* Slider Box */}
        <div 
          className="relative min-h-[280px] flex flex-col justify-center bg-white/40 border border-white/60 rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 backdrop-blur-2xl shadow-xl shadow-purple-900/5 overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="flex flex-col gap-6 relative z-10"
            >
              <Quote className="w-10 sm:w-12 h-10 sm:h-12 text-purple-100 absolute -top-4 -left-4 opacity-50" />
              
              <p className="text-base sm:text-xl md:text-2xl text-slate-700 leading-relaxed font-display font-medium relative z-10 tracking-tight">
                "{current.comment}"
              </p>
              
              <div className="pt-4 sm:pt-6 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200/70">
                <div className="flex items-center gap-3.5 min-w-[200px]">
                  <img 
                    src={current.avatar} 
                    alt={current.name} 
                    className="w-11 sm:w-14 h-11 sm:h-14 rounded-full object-cover shadow-2xs ring-2 ring-white shrink-0" 
                    loading="lazy"
                  />
                  <div>
                    <h4 className="font-bold text-sm sm:text-base text-slate-900">{current.name}</h4>
                    <p className="text-xs sm:text-sm font-medium text-purple-600">{current.position} di {current.companyName}</p>
                    <span className="text-[10px] font-mono text-slate-400 block">{current.industry}</span>
                  </div>
                </div>
                
                <div className="bg-purple-50/80 border border-purple-100 rounded-xl sm:rounded-2xl p-2.5 sm:p-4 flex flex-col items-start sm:items-end">
                  <span className="text-lg sm:text-2xl font-bold font-display tracking-tight text-purple-950">{current.metric}</span>
                  <span className="text-[10px] sm:text-xs font-mono tracking-widest text-purple-800 uppercase font-semibold">{current.metricLabel}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="mt-6 pt-4 sm:pt-6 flex flex-wrap items-center justify-between gap-3 relative z-10 border-t border-slate-200/50">
            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > activeIndex ? 1 : -1);
                    setActiveIndex(idx);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${idx === activeIndex ? 'w-8 bg-purple-600' : 'w-2 bg-slate-300 hover:bg-slate-400'}`}
                />
              ))}
            </div>

            <div className="flex gap-2 sm:gap-3">
              <button
                onClick={handlePrev}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-white hover:text-purple-600 transition-colors shadow-xs bg-slate-50 text-slate-600 cursor-pointer"
                aria-label="Previous"
              >
                <ArrowLeft size={16} />
              </button>
              <button
                onClick={handleNext}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-white hover:text-purple-600 transition-colors shadow-xs bg-slate-50 text-slate-600 cursor-pointer"
                aria-label="Next"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
