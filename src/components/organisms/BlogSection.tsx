import { motion } from 'motion/react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import TextRevealSmooth from '../atoms/TextRevealSmooth';

const articles = [
  { 
    title: 'Kenapa Instagram Saja Tidak Cukup untuk Bisnis Kamu di 2026', 
    cat: 'STRATEGY', 
    date: '12 MEI 2026', 
    desc: 'Algoritma Instagram berubah liar. Bisnis yang bertumpu 100% pada media sosial kehilangan kendali atas pelanggan mereka.' 
  },
  { 
    title: 'Website Lemot = Kehilangan 40% Calon Pembeli.', 
    cat: 'PERFORMANCE', 
    date: '08 MEI 2026', 
    desc: 'Google sekarang membunuh peringkat website yang load time-nya di atas 2 detik. Ini cara arsitektur kita mengatasinya.' 
  },
  { 
    title: 'Desain Murahan Membuat Bisnis Terlihat Tidak Profesional', 
    cat: 'DESIGN', 
    date: '01 MEI 2026', 
    desc: 'Kesan pertama menentukan harga. Klien bersedia membayar mahal jika profil digital Anda terlihat seperti perusahaan korporat.' 
  },
];

export default function BlogSection() {
  return (
    <section id="blog" className="py-32 md:py-48 relative overflow-hidden bg-transparent border-b border-white/5">
      <div className="mx-auto max-w-7xl px-6 relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 border-b border-white/5"
        >
          <div>
            <span className="text-[#D4FF00] font-sans font-medium text-sm uppercase tracking-widest block mb-6">
              04 — Knowledge Base
            </span>
            <div className="text-6xl md:text-[6.5rem] font-display font-medium tracking-tight text-white leading-[1.0] mb-2 flex flex-wrap">
              <TextRevealSmooth 
                text="Insight & Perspective." 
                highlightWords={["Perspective."]}
                highlightClass="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 font-serif italic pr-4"
              />
            </div>
          </div>
          <Link to="/blog" className="group relative flex items-center justify-center w-24 h-24 rounded-full bg-[#131825] border border-white/10 hover:bg-white/5 transition-colors shrink-0">
             <span className="sr-only">Read More</span>
             <ArrowUpRight className="text-white transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" size={28} />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-12">
          {articles.map((art, i) => (
            <motion.article 
              key={i} 
              className="group cursor-pointer relative"
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="flex gap-4 items-center mb-6">
                <span className="text-[10px] font-sans font-semibold text-[#0a0b10] bg-[#D4FF00] px-3 py-1.5 rounded-full uppercase tracking-widest">
                  {art.cat}
                </span>
                <span className="text-[10px] font-mono text-gray-400 tracking-widest">
                  {art.date}
                </span>
              </div>
              <h3 className="text-3xl md:text-4xl font-display font-medium text-white leading-[1.1] mb-6 group-hover:text-purple-400 transition-colors tracking-tight">
                {art.title}
              </h3>
              <p className="text-base text-gray-400 leading-relaxed font-sans line-clamp-3">
                {art.desc}
              </p>
              
              <Link to="/blog" className="mt-8 pt-4 flex items-center gap-2 text-sm font-sans font-semibold tracking-widest uppercase text-[#D4FF00] opacity-0 group-hover:opacity-100 transition-opacity">
                Baca Selengkapnya
                <ArrowRight size={16} />
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
