import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: "Andi Susanto",
    role: "CEO, TechNova",
    text: "Website kami loading sangat cepat dan desainnya luar biasa modern. Klien jadi lebih percaya.",
  },
  {
    name: "Budi Pratama",
    role: "Founder, GreenSpace",
    text: "Layanan super premium! Sejak rebuild website, conversion rate kami naik 40%.",
  },
  {
    name: "Citra Dewi",
    role: "Marketing Director",
    text: "Prosesnya sangat transparan dan hasilnya melebihi ekspektasi. Sangat direkomendasikan!",
  }
];

export default function SocialProofCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-lg mx-auto bg-slate-1000 backdrop-blur-sm border border-slate-200 rounded-2xl p-6 mt-12 shadow-sm">
      <div className="flex items-center justify-center gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={14} className="fill-indigo-500 text-indigo-500" />
        ))}
      </div>
      
      <div className="relative h-[80px] sm:h-[60px] overflow-hidden flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex flex-col items-center text-center justify-center"
          >
            <p className="text-sm font-sans font-medium text-gray-700 italic mb-2">
              "{TESTIMONIALS[currentIndex].text}"
            </p>
            <p className="text-[10px] font-mono tracking-widest text-[#4f46e5] font-bold uppercase">
              {TESTIMONIALS[currentIndex].name} • {TESTIMONIALS[currentIndex].role}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
