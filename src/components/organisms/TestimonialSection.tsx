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
      className="py-24 md:py-32 relative overflow-hidden bg-transparent text-gray-900 w-full select-none" 
      id="testimonials"
    >
      <div className="mx-auto max-w-4xl px-6 relative z-10 w-full">
        
        <div className="mb-16">
          <h2 className="text-3xl font-display font-medium tracking-tight text-gray-900 mb-6">
            Ulasan Klien
          </h2>
        </div>

        {/* Slider Box */}
        <div className="relative min-h-[300px] flex flex-col justify-center bg-white/[0.02] border border-gray-100 rounded-3xl p-8 sm:p-12 backdrop-blur-md overflow-hidden">
          
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="flex flex-col gap-6"
            >
              <p className="text-xl sm:text-2xl text-gray-200 leading-relaxed font-light">
                "{current.comment}"
              </p>
              
              <div className="pt-4">
                <h4 className="font-bold text-lg text-gray-900">{current.name}</h4>
                <p className="text-sm text-[#4f46e5]">{current.position} - {current.companyName}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="mt-8 pt-8 border-t border-gray-200 flex items-center justify-between">
            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > activeIndex ? 1 : -1);
                    setActiveIndex(idx);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${idx === activeIndex ? 'w-8 bg-[#4f46e5]' : 'w-2 bg-white/20'}`}
                />
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={handlePrev}
                className="p-2 rounded-full border border-gray-200 hover:bg-gray-200 transition-colors"
                aria-label="Previous"
              >
                <ArrowLeft size={18} />
              </button>
              <button
                onClick={handleNext}
                className="p-2 rounded-full border border-gray-200 hover:bg-gray-200 transition-colors"
                aria-label="Next"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
