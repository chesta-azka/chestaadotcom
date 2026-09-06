import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

const TESTIMONIALS = [
  {
    id: 1,
    quote: "CHESTAADOTCOM merubah cara kami berbisnis. Website dan integrasi AI yang mereka bangun tidak hanya mempercepat operasional kami hingga 40%, tapi juga memberikan pengalaman luar biasa bagi pelanggan kami.",
    author: "Budi Santoso",
    role: "CEO, TechInnovate Indonesia",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: 2,
    quote: "Sangat profesional dan responsif. Mereka benar-benar memahami visi desain kami dan menerjemahkannya ke dalam platform digital yang elegan, cepat, dan sangat mudah digunakan.",
    author: "Sarah Wijaya",
    role: "Marketing Director, Luxe Retail",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: 3,
    quote: "Solusi otomatisasi AI yang diberikan menghemat waktu tim kami yang berharga. Kami kini bisa fokus pada inovasi strategis sementara sistem mengurus rutinitas teknis dengan akurasi tinggi.",
    author: "Dimas Pratama",
    role: "Head of Operations, LogisTech",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop"
  }
];

export default function ClientTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <section className="py-24 relative overflow-hidden bg-white/30 backdrop-blur-3xl border-y border-white/40">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-purple-50/40 rounded-[100%] blur-[120px] -z-10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-purple-600 mb-3 block">Client Success Stories</span>
          <h2 className="text-3xl md:text-5xl font-display font-medium text-slate-900 tracking-tight leading-tight max-w-2xl">
            Dipercaya oleh Bisnis <br className="hidden sm:block" /> 
            <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-cyan-600 pr-2">Terdepan.</span>
          </h2>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="flex flex-col md:flex-row items-center gap-8 md:gap-16 bg-white/60 backdrop-blur-xl border border-white/60 p-8 md:p-12 rounded-[2.5rem] shadow-xl shadow-purple-900/5"
            >
              <div className="relative flex-shrink-0">
                <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <img 
                    src={TESTIMONIALS[currentIndex].image} 
                    alt={TESTIMONIALS[currentIndex].author}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center shadow-lg border-4 border-white text-white">
                  <Quote size={20} className="fill-current" />
                </div>
              </div>
              
              <div className="flex-1 text-center md:text-left flex flex-col items-center md:items-start">
                <div className="flex gap-1 text-amber-400 mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={18} className="fill-current" />
                  ))}
                </div>
                <p className="text-lg md:text-2xl font-display text-slate-800 leading-relaxed mb-8 italic">
                  "{TESTIMONIALS[currentIndex].quote}"
                </p>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg">{TESTIMONIALS[currentIndex].author}</h4>
                  <p className="text-slate-500 font-sans text-sm">{TESTIMONIALS[currentIndex].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex justify-center md:justify-end gap-3 mt-8 md:absolute md:-bottom-24 md:right-8">
            <button 
              onClick={prev}
              className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-purple-600 hover:border-purple-300 hover:shadow-md transition-all"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={next}
              className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-purple-600 hover:border-purple-300 hover:shadow-md transition-all"
              aria-label="Next Testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
