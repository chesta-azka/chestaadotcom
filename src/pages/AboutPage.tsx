import { motion } from 'motion/react';
import { Shield, Sparkles, Code, Cpu, Compass, Heart, ArrowUpRight, MessageCircle } from 'lucide-react';
import MetaTags from '../components/atoms/MetaTags';
import TextRevealSmooth from '../components/atoms/TextRevealSmooth';

export default function AboutPage() {
  const handleContactClick = () => {
    const text = 'Halo chestaadotcom, saya membaca profil studio Anda di halaman Tentang Kami. Tertarik konsultasi website!';
    window.open(`https://wa.me/6282125447232?text=${encodeURIComponent(text)}`, '_blank');
  };

  const coreBeliefs = [
    {
      icon: Shield,
      title: "Kredibilitas Tanpa Kompromi",
      desc: "UMKM di Indonesia sering kali dipandang sebelah mata karena website yang asal jadi atau lambat. Kami mendesain visual yang setara dengan brand internasional agar kepercayaan konsumen Anda meroket sejak detik pertama."
    },
    {
      icon: Code,
      title: "Clean Code & Kecepatan",
      desc: "Kami tidak menggunakan pembuat template drag-and-drop murahan yang membebani browser. Setiap baris kode ditulis bersih dengan framework modern demi memastikan kecepatan loading kurang dari 1 detik."
    },
    {
      icon: Compass,
      title: "Mobile-First Architecture",
      desc: "Lebih dari 90% audiens lokal Anda mengakses website dari smartphone. Layout kami dirancang responsive secara dinamis agar navigasi, form, dan tombol WhatsApp bisa dijangkau dengan jempol dengan sangat nyaman."
    }
  ];

  const tools = ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite Engine", "SEO Semantics", "WhatsApp API"];

  return (
    <div className="pt-24 pb-32 min-h-screen relative bg-transparent text-gray-900 overflow-hidden">
      <MetaTags 
        title="Tentang Studio Kami — Arsitektur Digital Premium" 
        description="Mengenal CHESTADOTCOM (2026) - Studio perancangan digital yang berdedikasi menaikkan kelas UMKM Indonesia melalui website minimalis premium berstandar dunia."
        path="/about"
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'Tentang Kami', item: '/about' },
        ]}
      />

      {/* Hero Header */}
      <section className="relative pt-20 pb-16 border-b border-gray-100 mb-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-indigo-500/5 via-transparent to-transparent -z-10" />

        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 text-center md:text-left"
          >
            <span className="text-[#4f46e5] font-mono text-[10px] uppercase tracking-[0.2em] inline-flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4f46e5] animate-pulse" />
              CHESTADOTCOM STUDIO 2026
            </span>
            
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-medium tracking-tight leading-[1.05] text-gray-900">
              <TextRevealSmooth 
                text="Menaikkan Kelas Kredibilitas UMKM Indonesia." 
                highlightWords={["Menaikkan", "Kelas"]}
                highlightClass="text-transparent bg-clip-text bg-gradient-to-r from-[#4f46e5] to-green-400 font-serif italic"
              />
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-gray-600 font-sans max-w-3xl leading-relaxed mt-4">
              Kami percaya bahwa bisnis lokal Indonesia layak tampil profesional setara korporasi global. Dari situlah studio personal ini lahir: menawarkan layanan digital berkualitas tinggi tanpa harga yang melambung tinggi.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Core Section */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: ID Card & Narrative */}
          <div className="md:col-span-5 space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-[#0B0F19] border border-gray-200 rounded-2xl p-6 shadow-2xl relative overflow-hidden group"
            >
              {/* Inner Decorative Grid */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20 pointer-events-none" />
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#4f46e5]/5 rounded-full filter blur-2xl pointer-events-none group-hover:bg-[#4f46e5]/10 transition-colors" />

              <div className="relative z-10 space-y-6">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl overflow-hidden border border-[#4f46e5]/10 bg-slate-900 relative">
                       <div className="absolute inset-0 bg-gradient-to-tr from-[#4f46e5]/20 to-transparent mix-blend-overlay pointer-events-none" />
                      <img 
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop" 
                        alt="Chesta Architect" 
                        className="w-full h-full object-cover grayscale brightness-110 contrast-125"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <h3 className="font-display font-black text-gray-900 text-sm tracking-widest">FOUNDER_IDENT</h3>
                      <span className="font-mono text-[8px] text-[#4f46e5] uppercase tracking-[0.25em] font-bold">Member Level 01</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="font-mono text-[8px] text-gray-600 uppercase tracking-widest leading-none mb-1">ARCH_CODE</span>
                    <span className="font-mono text-[10px] text-gray-900 font-bold leading-none">CD-2026.XX</span>
                  </div>
                </div>

                <div className="space-y-3 border-t border-b border-gray-100 py-4 text-xs font-mono">
                  <div className="flex justify-between items-center group/row">
                    <span className="text-gray-500 group-hover/row:text-gray-600 transition-colors uppercase text-[9px] tracking-widest">Penugasan_</span>
                    <span className="text-gray-900 text-right">Tangerang / Remote</span>
                  </div>
                  <div className="flex justify-between items-center group/row">
                    <span className="text-gray-500 group-hover/row:text-gray-600 transition-colors uppercase text-[9px] tracking-widest">Entry_Rates_</span>
                    <span className="text-[#4f46e5] font-bold">Start Rp540K</span>
                  </div>
                  <div className="flex justify-between items-center group/row">
                    <span className="text-gray-500 group-hover/row:text-gray-600 transition-colors uppercase text-[9px] tracking-widest">Protocol_</span>
                    <span className="text-gray-900 text-right font-semibold">"Zero-Lag Aesthetics"</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <span className="text-[9px] font-mono text-gray-500 block uppercase tracking-widest">Tech_Stack_Approved:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {tools.map((t) => (
                      <span key={t} className="text-[8px] font-mono border border-gray-200 bg-gray-100 px-2 py-0.5 rounded text-gray-600 group-hover:border-[#4f46e5]/20 group-hover:text-gray-900 transition-all">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="space-y-4">
              <h3 className="text-lg font-display font-medium text-gray-900 flex items-center gap-2">
                <Sparkles size={16} className="text-[#4f46e5]" />
                Filosofi Studio
              </h3>
              <p className="text-xs text-gray-600 font-sans leading-relaxed">
                Di CHESTADOTCOM, kami membenci desain web membosankan yang lambat dibuka. Setiap aset visual diseimbangkan dengan sempurna agar ramah mesin pencari (SEO) sekaligus menakjubkan bagi mata audiens potensial Anda.
              </p>
            </div>
          </div>

          {/* Right Column: Key Pillars & Client Focus */}
          <div className="md:col-span-7 space-y-12">
            
            <div className="space-y-6">
              <span className="text-[#4f46e5] font-mono text-[9px] tracking-widest block uppercase font-bold">
                [ 3 PILAR UTAMA KAMI ]
              </span>
              
              <div className="space-y-4">
                {coreBeliefs.map((belief, idx) => {
                  const Icon = belief.icon;
                  return (
                    <motion.div
                      key={belief.title}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1, duration: 0.5 }}
                      className="p-5 rounded-xl border border-gray-100 bg-[#0C101B]/40 hover:border-gray-200 transition-colors flex gap-4 text-left"
                    >
                      <div className="p-3 bg-gray-100 rounded-lg h-fit text-[#4f46e5] shrink-0">
                        <Icon size={18} />
                      </div>
                      <div className="space-y-1.5">
                        <h4 className="font-display font-bold text-gray-900 text-sm sm:text-base">{belief.title}</h4>
                        <p className="text-[11px] sm:text-xs text-gray-600 leading-relaxed font-sans">{belief.desc}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Seamless Visual Showcase Invitation */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-[#121A2D] to-[#0A0D14] border border-[#4f46e5]/10 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden text-left">
              <div className="absolute inset-0 bg-[#4f46e5]/1 pointer-events-none" />
              <div className="space-y-2 max-w-md">
                <h4 className="text-xl font-display font-medium text-gray-900 tracking-tight">Siap membuat bisnis Anda terlihat handal?</h4>
                <p className="text-xs text-gray-600 font-sans leading-relaxed">Kami menyederhanakan rute digital Anda secara transparan. Konsultasi awal 100% gratis.</p>
              </div>
              <button
                onClick={handleContactClick}
                className="flex items-center gap-2 rounded-xl bg-[#4f46e5] text-black px-5 py-3 font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#c2e600] active:scale-95 transition-all text-center self-stretch sm:self-auto justify-center cursor-pointer shadow-lg shadow-[#4f46e5]/10"
              >
                <span>Mulai Chat</span>
                <MessageCircle size={15} />
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
