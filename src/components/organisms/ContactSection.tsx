import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import TextRevealSmooth from '../atoms/TextRevealSmooth';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    business: '',
    package: 'Start Rp450K - Landing Page'
  });

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.target.parentElement?.classList.add('border-[#D4FF00]');
    e.target.parentElement?.classList.remove('border-white/20');
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.target.parentElement?.classList.remove('border-[#D4FF00]');
    e.target.parentElement?.classList.add('border-white/20');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Halo chestaa.com, saya ${formData.name} dari ${formData.business}. Saya tertarik dengan paket ${formData.package}. Boleh konsultasi lebih lanjut?`;
    window.open(`https://wa.me/6282125447232?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="pricing" className="py-16 md:py-24 relative overflow-hidden bg-[#06080F]">
      <div className="absolute inset-0 bg-[#4F46E5]/10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#4F46E5]/20 via-transparent to-transparent opacity-60 mix-blend-screen" />
      <div className="mx-auto max-w-4xl px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-24"
        >
          <span className="text-[#D4FF00] font-sans font-medium text-sm uppercase tracking-widest block mb-6">
            06 — Initiate Project
          </span>
          <div className="text-6xl md:text-[6.5rem] font-display font-medium tracking-tight text-white mb-8 leading-[1.0] flex justify-center flex-wrap">
            <TextRevealSmooth 
              text="Mari Bicara Serius." 
              highlightWords={["Serius."]}
              highlightClass="italic font-serif text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 pr-4"
            />
          </div>
          <p className="font-sans text-lg text-gray-400 max-w-lg mx-auto">
            Konsultasi awal 100% gratis. Isi form singkat di bawah, dan kita akan langsung terhubung ke WhatsApp.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
          className="max-w-3xl mx-auto text-left"
        >
          <form onSubmit={handleSubmit} className="space-y-16">
            <div className="relative border-b border-white/20 transition-colors duration-300 group">
              <label className="text-[11px] font-sans font-semibold uppercase tracking-widest text-gray-400 absolute -top-6 left-0 transition-all">Nama Anda</label>
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className="w-full bg-transparent py-4 text-3xl md:text-5xl font-display font-medium text-white placeholder:text-white/20 outline-none focus:ring-0"
                placeholder="John Doe"
              />
            </div>
            
            <div className="relative border-b border-white/20 transition-colors duration-300 group">
              <label className="text-[11px] font-sans font-semibold uppercase tracking-widest text-gray-400 absolute -top-6 left-0 transition-all">Nama/Jenis Bisnis</label>
              <input 
                type="text" 
                required
                value={formData.business}
                onChange={(e) => setFormData({...formData, business: e.target.value})}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className="w-full bg-transparent py-4 text-3xl md:text-5xl font-display font-medium text-white placeholder:text-white/20 outline-none focus:ring-0"
                placeholder="Kedai Kopi Local"
              />
            </div>

            <div className="relative border-b border-white/20 transition-colors duration-300 group">
              <label className="text-[11px] font-sans font-semibold uppercase tracking-widest text-gray-400 absolute -top-6 left-0 transition-all">Paket yang Diminati</label>
              <select 
                value={formData.package}
                onChange={(e) => setFormData({...formData, package: e.target.value})}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className="w-full bg-transparent py-4 text-2xl md:text-4xl font-display font-medium text-white outline-none focus:ring-0 cursor-pointer appearance-none *:text-[#06080F]"
              >
                <option value="Start Rp450K - Landing Page" className="text-base font-sans">Start Rp450K - Landing Page</option>
                <option value="Start Rp1.5M - Company Profile" className="text-base font-sans">Start Rp1.5M - Company Profile</option>
                <option value="Custom E-Commerce" className="text-base font-sans">Custom E-Commerce</option>
                <option value="Hanya Konsultasi Dulu" className="text-base font-sans">Hanya Konsultasi Dulu</option>
              </select>
            </div>

            <button
              type="submit"
              className="group flex flex-col items-center justify-center gap-2 w-full rounded-[2rem] bg-[#D4FF00] px-8 py-8 md:py-12 transition-all hover:bg-[#c2e600] active:scale-95 shadow-[0_0_40px_rgba(212,255,0,0.2)]"
            >
              <span className="font-display text-3xl md:text-4xl font-medium text-[#06080F] flex items-center gap-4">
                Kirim ke WhatsApp
                <ArrowRight size={32} className="transition-transform group-hover:translate-x-2" />
              </span>
              <span className="text-sm font-sans font-medium text-[#06080F]/60 mt-2 tracking-widest uppercase">Respon dalam 5 Menit</span>
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
