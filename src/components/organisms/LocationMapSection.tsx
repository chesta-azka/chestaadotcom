import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, 
  Globe, 
  Compass, 
  Landmark, 
  CornerDownRight, 
  X, 
  Coffee, 
  MessageSquare, 
  Briefcase, 
  Sparkles, 
  CheckCircle2, 
  ChevronRight 
} from 'lucide-react';
import { useState, useEffect } from 'react';
import TextRevealSmooth from '../atoms/TextRevealSmooth';

interface TrustData {
  project: string;
  clientName: string;
  role: string;
  comment: string;
  tags: string[];
}

const LOCAL_TRUST_DATA: Record<string, TrustData> = {
  cisauk: {
    project: 'Griya Cisauk Web Ecosystem',
    clientName: 'Bapak Hendrawan',
    role: 'Director of Griya Land',
    comment: 'Penyusunan peta web terstruktur & taktis dari chestaa.com menaikkan konversi unit premium kami. Karena studio fisik mereka ada di Cisauk, kami bisa leluasa bertemu langsung membahas review arsitektur code.',
    tags: ['Real Estate', 'NextJS App', 'SEO Saturation']
  },
  bsd: {
    project: 'The Breeze F&B Interactive Web',
    clientName: 'Ibu Amalia Ross',
    role: 'Owner, Ross Bakery & Cafe',
    comment: 'Kerjasama yang intuitif dan matang! Tim digital architect dari chestaa menemui kami di cafe The Breeze BSD untuk menyusun wireframe langsung secara tatap muka. Hasil website super estetik pancing engagement tinggi.',
    tags: ['F&B Branding', 'Interactive Catalog', 'PageSpeed 99+']
  },
  kebayoran: {
    project: 'Selasar Aesthetic Clinic Portal',
    clientName: 'dr. Farah Siregar',
    role: 'Founder, Selasar Aesthetic',
    comment: 'Pertemuan langsung di cafe bilangan Jakarta Selatan memudahkan perencanaan. Websitenya megah, mewah, dengan tingkat kepresisian kustomisasi kelas atas mirip agensi global.',
    tags: ['Medical & Beauty', 'High-End Branding', 'Corporate Level']
  },
  bogor: {
    project: 'Katulampa Craft Hub',
    clientName: 'Bapak Dian Pratama',
    role: 'Coordinator of Bogor Craft Syndicate',
    comment: 'Kami mendiskusikan pengerjaan di kedaikopi favorit dekat Stasiun Bogor secara kasual namun sangat professional. Performa website cepat luar biasa berskala premium.',
    tags: ['Local Goods Hub', 'Local Saturation', 'High Performance']
  }
};

export default function LocationMapSection() {
  const [selectedKey, setSelectedKey] = useState<string>('cisauk');
  const [isGuidelineOpen, setIsGuidelineOpen] = useState<boolean>(false);

  const serviceAreas = [
    {
      key: 'cisauk',
      name: 'Cisauk (Studio Utama)',
      desc: 'Pusat operasional dan koordinasi utama digital architect kami. Tempat kami merancang blueprint code penuh estetika modern.',
      status: 'HQ / Studio Fisik',
      icon: MapPin,
      coords: 'COORDS: -6.3268875, 106.639352',
      query: '-6.3268875,106.639352',
      addressName: 'Kec. Cisauk, Kab. Tangerang, Banten',
      badge: 'CISAUK MAIN DIRECTORY'
    },
    {
      key: 'bsd',
      name: 'BSD City & Gading Serpong',
      desc: 'Tidak ada studio fisik, tapi digital architect kami siap sedia bertemu langsung untuk konsultasi digital di cafe estetik sekitar The Breeze atau dekat Stasiun Rawa Buntu.',
      status: 'Meeting Cafe/Station',
      icon: Compass,
      coords: 'COORDS: -6.3015, 106.6534',
      query: 'The Breeze BSD City, Tangerang',
      addressName: 'The Breeze BSD / Cafe & Meeting Point',
      badge: 'BSD MEETING REGION'
    },
    {
      key: 'kebayoran',
      name: 'Kebayoran & Jakarta Selatan',
      desc: 'Layanan pertemuan offline fleksibel. Tim kami siap menemui Anda di cafe estetik Jakarta Selatan atau meeting point strategis dekat Stasiun MRT Blok M.',
      status: 'Meeting Cafe/Station',
      icon: Landmark,
      coords: 'COORDS: -6.2442, 106.7932',
      query: 'Blok M Plaza / Stasiun MRT Blok M BCA, Jakarta',
      addressName: 'Sekitar MRT Blok M / Cafe Kebayoran Baru',
      badge: 'JAKARTA MEETING STATION'
    },
    {
      key: 'bogor',
      name: 'Bogor & Sekitarnya',
      desc: 'Menjangkau area Bogor dengan janji temu santai. Kita bisa berdiskusi mengenai performa website bisnis Anda di kedai kopi favorit atau dekat Stasiun Bogor.',
      status: 'Meeting Cafe/Station',
      icon: Globe,
      coords: 'COORDS: -6.5971, 106.7995',
      query: 'Stasiun Bogor, Jawa Barat',
      addressName: 'Stasiun Bogor / Kedai Kopi Sekitar Bogor',
      badge: 'BOGOR COFFEE & MEET POINT'
    }
  ];

  const activeArea = serviceAreas.find(area => area.key === selectedKey) || serviceAreas[0];
  const trustData = LOCAL_TRUST_DATA[selectedKey] || LOCAL_TRUST_DATA.cisauk;

  const trustContainerVariants: any = {
    hidden: { 
      opacity: 0, 
      y: 20, 
      filter: 'blur(8px)' 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { 
        duration: 0.45, 
        ease: 'easeOut',
        staggerChildren: 0.1,
        delayChildren: 0.05
      }
    },
    exit: { 
      opacity: 0, 
      y: -15, 
      filter: 'blur(8px)',
      transition: { 
        duration: 0.25, 
        ease: 'easeIn' 
      }
    }
  };

  const trustItemVariants: any = {
    hidden: { opacity: 0, y: 12, filter: 'blur(4px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { duration: 0.4, ease: 'easeOut' }
    }
  };

  // Dispatch custom event to notify dynamic metadata manager on selection
  const selectArea = (key: string) => {
    setSelectedKey(key);
    window.dispatchEvent(
      new CustomEvent('chestaa-active-location', {
        detail: { locationKey: key }
      })
    );
  };

  // Dispatch initial selection on mount
  useEffect(() => {
    selectArea('cisauk');
  }, []);

  return (
    <section id="lokasi" className="py-16 md:py-24 relative overflow-hidden bg-transparent border-b border-white/5">
      {/* Background radial atmosphere */}
      <div className="absolute inset-0 bg-[#D4FF00]/5 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-[#D4FF00]/5 via-transparent to-transparent opacity-40 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 relative z-10 w-full">
        {/* Header Grid */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-12 border-b border-white/5"
        >
          <div className="lg:col-span-8">
            <span className="text-[#D4FF00] font-sans font-medium text-sm uppercase tracking-widest block mb-6">
              05 — Wilayah Layanan & Lokasi
            </span>
            <div className="text-4xl md:text-[5.5rem] font-display font-medium tracking-tight text-white leading-[1.05] flex flex-wrap">
              <TextRevealSmooth 
                text="Arsitektur Lokal & Ekspansi Digital." 
                highlightWords={["Lokal", "Ekspansi"]}
                highlightClass="text-transparent bg-clip-text bg-gradient-to-r from-[#D4FF00] to-green-400 font-serif italic pr-2"
              />
            </div>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <p className="font-sans text-base text-gray-400 max-w-md lg:ml-auto leading-relaxed">
              Berkantor pusat di <strong>Cisauk</strong>, kami melayani konsultasi offline di wilayah regional prioritas dengan response time terbaik.
            </p>
          </div>
        </motion.div>

        {/* Contents Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Service Areas list */}
          <div className="lg:col-span-5 space-y-6">
            <div className="border border-white/5 bg-[#131825]/20 rounded-2xl p-6">
              <span className="text-[10px] uppercase tracking-widest text-[#D4FF00] font-mono font-semibold block mb-2">SEO LOCAL SATURATION</span>
              <p className="text-xs text-gray-400 font-sans leading-relaxed">
                Klik lokasi di bawah untuk memvisualisasikan jangkauan regional kami. Struktur SEO lokal kami didesain khusus agar bisnis Anda terindeks sempurna di wilayah terkait.
              </p>
            </div>

            {/* Service Area Cards Selection */}
            <div className="space-y-4">
              {serviceAreas.map((area, i) => {
                const IconComp = area.icon;
                const isSelected = selectedKey === area.key;
                return (
                  <motion.div
                    key={area.name}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    onClick={() => selectArea(area.key)}
                    className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer select-none relative overflow-hidden group ${
                      isSelected 
                        ? 'bg-[#131825]/90 border-[#D4FF00]/40 shadow-[0_4px_24px_rgba(212,255,0,0.06)]' 
                        : 'bg-[#131825]/10 border-white/5 hover:border-white/10 hover:bg-[#131825]/30'
                    }`}
                    id={`region-btn-${area.key}`}
                  >
                    {/* Tiny visual dynamic marker */}
                    {isSelected && (
                      <div className="absolute top-0 left-0 w-1 h-full bg-[#D4FF00]" />
                    )}

                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg transition-colors ${
                          isSelected ? 'bg-[#D4FF00]/10 text-[#D4FF00]' : 'bg-white/5 text-gray-400 group-hover:text-white'
                        }`}>
                          <IconComp size={18} />
                        </div>
                        <h4 className="text-base font-display font-semibold text-white tracking-tight">{area.name}</h4>
                      </div>
                      <span className={`text-[9px] uppercase font-mono tracking-widest px-2.5 py-1 rounded-full border transition-colors ${
                        isSelected 
                          ? 'border-[#D4FF00]/40 text-[#D4FF00] bg-[#D4FF00]/5' 
                          : 'border-white/10 text-gray-500'
                      }`}>
                        {area.status}
                      </span>
                    </div>
                    <p className="text-xs font-sans text-gray-400 leading-relaxed pr-2 mb-2">{area.desc}</p>
                    <div className="flex items-center justify-between mt-2.5">
                      <div className="flex items-center gap-1.5 text-[9px] text-[#D4FF00]/70 font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                        <CornerDownRight size={10} />
                        <span>Metatag Lokal Aktif</span>
                      </div>
                      
                      {/* View Meeting Guidelines link button */}
                      {isSelected && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsGuidelineOpen(true);
                          }}
                          className="text-[10px] font-mono text-[#D4FF00] hover:underline flex items-center gap-1 relative z-30"
                        >
                          <Sparkles size={10} />
                          <span>Persiapan Offline Meeting</span>
                        </button>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Interactive Map Component + Floating Tabs + Local Testimonials */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Quick-action Region Switched Menu Header inside the Map view container for ultra sleek ergonomics */}
            <div className="p-1 px-1.5 rounded-2xl border border-white/5 bg-[#131825]/30 flex flex-wrap gap-2 items-center justify-between">
              <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest pl-3 flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4FF00] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4FF00]"></span>
                </span>
                Quick-Switch Region:
              </span>
              <div className="flex flex-wrap gap-1">
                {serviceAreas.map((area) => (
                  <button
                    key={area.key}
                    onClick={() => selectArea(area.key)}
                    className={`px-3 py-1.5 rounded-xl font-mono text-[10px] font-bold tracking-wider transition-all duration-200 cursor-pointer uppercase ${
                      selectedKey === area.key
                        ? 'bg-[#D4FF00] text-[#06080F]'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {area.key}
                  </button>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative rounded-[2.5rem] overflow-hidden border border-white/10 bg-[#131825]/40 shadow-[0_24px_64px_rgba(0,0,0,0.6)] p-3"
            >
              {/* Outer frame design */}
              <div className="absolute top-6 left-6 z-20 pointer-events-none flex flex-col gap-1.5 bg-[#0D111A]/95 p-4 rounded-xl border border-white/10 backdrop-blur-md shadow-2xl">
                <span className="text-[10px] font-mono tracking-widest text-[#D4FF00] font-bold uppercase block">
                  {activeArea.badge}
                </span>
                <span className="text-xs font-sans text-white font-medium block">
                  {activeArea.addressName}
                </span>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-[9px] font-sans text-green-400 tracking-wider">Aktif & Terbuka untuk Konsultasi</span>
                </div>
              </div>

              {/* Styled iframe with high-contrast architectural dark visual effect - Blur-Fade animation wrapped */}
              <div className="w-full aspect-[4/3] rounded-[2rem] overflow-hidden bg-[#0D111A] relative group">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedKey}
                    initial={{ opacity: 0, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, filter: 'blur(10px)' }}
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                    className="w-full h-full"
                  >
                    <iframe
                      title="Service Area Map Location"
                      className="w-full h-full border-0 filter invert-[92%] hue-rotate-180 brightness-95 contrast-[105%] saturate-[60%] transition-opacity duration-300"
                      src={`https://maps.google.com/maps?q=${activeArea.query}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                      loading="lazy"
                      allowFullScreen
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Detail Footer */}
              <div className="p-6 flex flex-wrap items-center justify-between gap-4">
                <div className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">
                  {activeArea.coords}
                </div>
                <div className="text-xs font-sans text-gray-400 flex items-center gap-3">
                  <span>Konsultasi offline: <span className="text-[#D4FF00] font-semibold">By Appointment Only</span></span>
                  <button 
                    onClick={() => setIsGuidelineOpen(true)}
                    className="px-2.5 py-1 rounded-md text-[10px] bg-white/5 border border-white/10 hover:border-[#D4FF00]/30 hover:bg-[#D4FF00]/10 text-[#D4FF00] font-mono transition-all cursor-pointer"
                  >
                    Panduan Meeting
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Testimonial & Case Study Trust Block for selected Region with blur-fade transition */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`trust-${selectedKey}`}
                variants={trustContainerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="rounded-3xl border border-white/10 bg-[#131825]/50 p-6 relative overflow-hidden backdrop-blur-sm shadow-[0_12px_32px_rgba(0,0,0,0.15)] group"
              >
                {/* Visual accent */}
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none text-white">
                  <Coffee size={120} />
                </div>

                <motion.div 
                  variants={trustItemVariants} 
                  className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 border-b border-white/5 pb-4"
                >
                  <div>
                    <span className="text-[10px] font-mono text-[#D4FF00] tracking-widest uppercase block mb-1">PROYEK TERKINI & TRUST WILAYAH {activeArea.key}</span>
                    <h5 className="text-lg font-display font-bold text-white flex items-center gap-2">
                      <Briefcase size={16} className="text-[#D4FF00]" />
                      {trustData.project}
                    </h5>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {trustData.tags.map((t) => (
                      <span key={t} className="px-2.5 py-0.5 rounded-full text-[9px] font-mono text-gray-400 bg-white/5 border border-white/5">
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>

                <div className="relative">
                  <motion.span variants={trustItemVariants} className="text-4xl text-[#D4FF00]/20 font-serif absolute -top-5 -left-2 select-none">“</motion.span>
                  <motion.p 
                    variants={trustItemVariants} 
                    className="text-xs font-sans text-gray-300 leading-relaxed italic relative z-10 pl-4 mb-4"
                  >
                    {trustData.comment}
                  </motion.p>
                  
                  <motion.div 
                    variants={trustItemVariants} 
                    className="flex items-center gap-3 pl-4"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#D4FF00]/20 to-green-500/10 border border-white/10 flex items-center justify-center font-mono text-xs text-[#D4FF00] font-bold">
                      {trustData.clientName[0]}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white">{trustData.clientName}</div>
                      <div className="text-[10px] text-gray-500 font-mono block">{trustData.role}</div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* View Meeting Guidelines Modal Portal / Component */}
      <AnimatePresence>
        {isGuidelineOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-6"
            onClick={() => setIsGuidelineOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="w-full max-w-2xl bg-[#0C0F19] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-[0_32px_80px_rgba(212,255,0,0.05)] relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Abstract decorative accent */}
              <div className="absolute top-0 right-0 w-44 h-44 bg-[#D4FF00]/5 rounded-full filter blur-[40px] pointer-events-none" />

              {/* Close Button */}
              <button 
                onClick={() => setIsGuidelineOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full border border-white/5 hover:border-white/20 bg-white/5 hover:bg-white/10 text-white hover:text-[#D4FF00] transition-all cursor-pointer z-50"
              >
                <X size={16} />
              </button>

              <div className="p-8 sm:p-10 relative z-10">
                <span className="text-[#D4FF00] font-mono text-[10px] tracking-widest uppercase font-bold block mb-2">
                  CHESTAA ARCHITECT GUIDELINE
                </span>
                
                <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight mb-4 flex items-center gap-2.5">
                  <Coffee size={24} className="text-[#D4FF00]" />
                  Panduan & Persiapan Offline Meeting
                </h3>
                
                <p className="text-xs text-gray-400 font-sans leading-relaxed mb-6">
                  Untuk menjaga agar pertemuan tatap muka kita berjalan secara maksimal, efektif, dan penuh solusi taktis bagi bisnis Anda, berikut checklist yang bisa dipersiapkan sebelum bertemu:
                </p>

                <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                  
                  {/* Item 1 */}
                  <div className="flex gap-4 p-4 rounded-2xl border border-white/5 bg-white/5">
                    <div className="w-8 h-8 rounded-lg bg-[#D4FF00]/10 border border-[#D4FF00]/20 flex items-center justify-center flex-shrink-0 text-[#D4FF00] text-xs font-mono font-bold">
                      01
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white mb-1">Visi Utama Bisnis & Goal Website</h4>
                      <p className="text-xs text-gray-400 leading-relaxed font-sans">
                        Pikirkan matang-matang apa tujuan utama web Anda. Apakah untuk memajang profil brand (company profile), e-commerce penjualan, portfolio visual estetik, atau sekadar landing page generator iklan.
                      </p>
                    </div>
                  </div>

                  {/* Item 2 */}
                  <div className="flex gap-4 p-4 rounded-2xl border border-white/5 bg-white/5">
                    <div className="w-8 h-8 rounded-lg bg-[#D4FF00]/10 border border-[#D4FF00]/20 flex items-center justify-center flex-shrink-0 text-[#D4FF00] text-xs font-mono font-bold">
                      02
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white mb-1">Referensi Desain / Kompetitor</h4>
                      <p className="text-xs text-gray-400 leading-relaxed font-sans">
                        Siapkan 2-3 contoh website yang Anda rasa sangat cocok dengan selera visual Anda. Ini bisa berupa link langsung atau potongan gambar agar tim designer kami langsung paham standar estetika Anda.
                      </p>
                    </div>
                  </div>

                  {/* Item 3 */}
                  <div className="flex gap-4 p-4 rounded-2xl border border-white/5 bg-white/5">
                    <div className="w-8 h-8 rounded-lg bg-[#D4FF00]/10 border border-[#D4FF00]/20 flex items-center justify-center flex-shrink-0 text-[#D4FF00] text-xs font-mono font-bold">
                      03
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white mb-1">Aset Dasar Brand & Logo</h4>
                      <p className="text-xs text-gray-400 leading-relaxed font-sans">
                        Jika sudah ada logo, skema warna brand, atau foto produk utama beresolusi tinggi, mohon diunggah di drive sehingga siap dieksekusi tanpa tertunda.
                      </p>
                    </div>
                  </div>

                  {/* Item 4 */}
                  <div className="flex gap-4 p-4 rounded-2xl border border-white/5 bg-white/5">
                    <div className="w-8 h-8 rounded-lg bg-[#D4FF00]/10 border border-[#D4FF00]/20 flex items-center justify-center flex-shrink-0 text-[#D4FF00] text-xs font-mono font-bold">
                      04
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white mb-1">Rencana Garis Besar Konten & Struktur Menu</h4>
                      <p className="text-xs text-gray-400 leading-relaxed font-sans">
                        Siapkan draf mentah tentang struktur navigasi utama yang mutlak ada (misal: Beranda, Tentang Kami, Galeri, Kontak, Blog Bisnis).
                      </p>
                    </div>
                  </div>

                </div>

                <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/5 pt-6">
                  <div className="text-[10px] font-mono text-gray-500 uppercase">
                    LOKASI AKTIF: <span className="text-white">{activeArea.name}</span>
                  </div>
                  <button 
                    onClick={() => setIsGuidelineOpen(false)}
                    className="px-5 py-2.5 rounded-xl bg-[#D4FF00] text-[#06080F] text-xs font-bold font-sans transition-all hover:opacity-95 cursor-pointer shadow-[0_4px_16px_rgba(212,255,0,0.15)]"
                  >
                    Saya Siap Mengatur Jadwal Offline
                  </button>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
