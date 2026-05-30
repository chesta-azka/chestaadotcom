import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { Quote } from 'lucide-react';
import TextRevealSmooth from '../atoms/TextRevealSmooth';

const testimonials = [
  { text: "Konversi form meningkat 40% setelah migrasi. Load time under 1s, klien tidak lagi complain website lemot.", author: "Agensi Digital Kreatif", metric: "+40% Kinerja" },
  { text: "Bukan sekadar 'bikinin website'. Ini tentang arsitektur brand. Tampilan sangat profesional, setara brand internasional.", author: "Boutique Coffee Roaster", metric: "Brand Trust" },
  { text: "Clean code, SEO rapi, langsung index Google dalam 2 hari. Secara teknis sangat solid dan memuaskan.", author: "Klinik Kecantikan Premium", metric: "Technical SEO" },
];

export default function TestimonialSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-16 md:py-20 relative overflow-hidden bg-[#0a0b10] text-white w-full border-t border-white/5">
      <div className="absolute inset-0 bg-[#4F46E5]/5" />
      <div className="mx-auto max-w-4xl px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16"
        >
          <span className="text-[#D4FF00] font-sans font-medium text-sm uppercase tracking-widest block mb-6">
            05 — Client Results
          </span>
          <div className="text-5xl md:text-6xl font-display font-medium tracking-tight text-white mb-2 flex flex-wrap">
            <TextRevealSmooth 
              text="Performance Proven." 
              highlightWords={["Proven."]}
              highlightClass="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400"
            />
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative h-[300px] flex items-center justify-center"
        >
          <Quote className="absolute top-0 text-[#161b2b] w-32 h-32 -rotate-12 transform -translate-x-12 -translate-y-8" />
          <div className="absolute inset-0 bg-[#131825] border border-white/5 rounded-[2rem] -z-10" />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#4F46E5]/10 to-[#D4FF00]/5 rounded-[2rem] -z-10 mix-blend-overlay" />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10, filter: 'blur(5px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, filter: 'blur(5px)' }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="max-w-2xl relative z-10 px-8"
            >
              <h3 className="text-2xl md:text-3xl font-display font-medium leading-relaxed mb-8 text-white">
                "{testimonials[index].text}"
              </h3>
              <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                <p className="text-sm font-sans font-medium text-gray-400">
                  {testimonials[index].author}
                </p>
                <span className="hidden md:block w-1.5 h-1.5 rounded-full bg-white/20" />
                <span className="text-xs font-sans font-semibold tracking-widest text-[#0a0b10] bg-[#D4FF00] px-3 py-1 rounded">
                  {testimonials[index].metric}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <div className="mt-8 flex justify-center gap-2">
           {testimonials.map((_, i) => (
             <button
               key={i}
               onClick={() => setIndex(i)}
               className={`w-2 h-2 rounded-full transition-all duration-300 ${index === i ? 'w-8 bg-[#D4FF00]' : 'bg-white/20 hover:bg-white/40'}`}
               aria-label={`Go to slide ${i + 1}`}
             />
           ))}
        </div>
      </div>
    </section>
  );
}
