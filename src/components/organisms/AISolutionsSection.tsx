import { useState } from 'react';
import { motion } from 'motion/react';
import { Bot, Network, Zap, ChevronRight, Workflow, ExternalLink } from 'lucide-react';
import QuickViewModal, { QuickViewData } from '../molecules/QuickViewModal';

const AI_CAPABILITIES = [
  {
    id: "ai-support",
    title: "Autonomous Sales & Support",
    description: "Bukan sekadar chatbot menu statis. Agen cerdas kami memahami konteks, melakukan kualifikasi prospek, dan menutup penjualan 24/7 secara mandiri.",
    icon: Bot,
    color: "bg-indigo-50",
    iconColor: "text-indigo-600",
    benefits: [
      "Respons instan di bawah 3 detik, meminimalisir bounce rate prospek",
      "Kualifikasi prospek otomatis sebelum diteruskan ke tim sales",
      "Konektivitas dengan WhatsApp & CRM untuk sinkronisasi seketika"
    ],
    ctaText: "Mulai Konsultasi Agen Support",
    ctaLink: "https://wa.me/6282125447232?text=Halo%20saya%20ingin%20berdiskusi%20tentang%20pembuatan%20Autonomous%20Sales%20Bot."
  },
  {
    id: "ai-agentic",
    title: "Strategic Agentic Operations",
    description: "Tingkatkan kapasitas operasional tanpa penambahan headcount. Agen AI kami mengeksekusi riset pasar, pelaporan komprehensif, dan manajemen data seketika.",
    icon: Network,
    color: "bg-emerald-50",
    iconColor: "text-emerald-600",
    benefits: [
      "Eksekusi multi-langkah (Agentic) untuk riset kompetitor mingguan",
      "Ekstraksi data invoice & dokumen secara otomatis dengan OCR AI",
      "Sistem pemantauan bisnis proaktif via notifikasi instan"
    ],
    ctaText: "Mulai Konsultasi Agen Operasional",
    ctaLink: "https://wa.me/6282125447232?text=Halo%20saya%20ingin%20berdiskusi%20tentang%20implementasi%20Strategic%20Agentic%20Operations."
  },
  {
    id: "ai-workflow",
    title: "Omnichannel Workflow Automation",
    description: "Integrasi mulus antara WhatsApp, CRM, dan sistem backend Anda. Menghapus bottleneck input manual untuk mengakselerasi siklus bisnis secara eksponensial.",
    icon: Workflow,
    color: "bg-amber-50",
    iconColor: "text-amber-600",
    benefits: [
      "Penghapusan total beban entry data manual antar departemen",
      "Sistem notifikasi follow-up klien otomatis",
      "Arsitektur Webhook/API custom untuk menghubungkan ekosistem lama"
    ],
    ctaText: "Rancang Workflow Otomasi",
    ctaLink: "https://wa.me/6282125447232?text=Halo%20saya%20ingin%20berdiskusi%20tentang%20Omnichannel%20Workflow%20Automation."
  }
];

export default function AISolutionsSection() {
  const [modalData, setModalData] = useState<QuickViewData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (data: any) => {
    setModalData(data);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setModalData(null), 300); // clear after animation
  };

  return (
    <section className="py-24 md:py-32 relative overflow-hidden min-h-screen flex items-center justify-center">
      {/* Background Decorative */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      <div className="absolute -left-32 top-32 w-96 h-96 bg-indigo-50/50 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-6 relative z-10 w-full">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          <div className="w-full lg:w-5/12 text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-[1px] bg-indigo-600" />
                <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-indigo-600 uppercase pt-0.5">
                  ENTERPRISE AUTOMATION
                </span>
              </div>
              <h2 className="text-fluid-h2 font-display font-medium tracking-tight text-slate-900 mb-6 leading-[1.1]">
                Otomasi Skala Penuh. Ini <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">Agentic AI.</span>
              </h2>
              <p className="text-slate-600 font-sans leading-relaxed mb-8 text-lg font-light">
                Kami tidak sekadar memasang script AI. Sebagai mitra pertumbuhan Anda, kami mendeploy Agen AI otonom yang memangkas redundansi, mempercepat akuisisi klien, dan memungkinkan tim Anda fokus murni pada ekspansi strategis.
              </p>
              
              <ul className="space-y-4 mb-10">
                {[
                  "Infrastruktur terintegrasi API skala Enterprise",
                  "Enkripsi & kepatuhan privasi data ketat",
                  "Arsitektur elastis hingga 100K+ request/hari"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-indigo-50 flex items-center justify-center shrink-0">
                      <Zap size={10} className="text-indigo-600" />
                    </div>
                    <span className="font-sans text-gray-700 font-medium text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              
              <a
                href="https://wa.me/6282125447232?text=Halo%20CHESTADOTCOM%2C%20saya%20tertarik%20dengan%20kemitraan%20ekspansi%20bisnis%20melalui%20otomasi%20Agentic%20AI."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-slate-900 text-white font-sans font-bold text-sm tracking-wide transition-all hover:bg-indigo-600 hover:shadow-[0_10px_25px_rgba(79,70,229,0.3)] hover:-translate-y-0.5"
              >
                Eksplorasi Skenario Skalabilitas <ChevronRight size={16} />
              </a>
            </motion.div>
          </div>

          <div className="w-full lg:w-7/12">
            <div className="grid gap-6">
              {AI_CAPABILITIES.map((cap, idx) => (
                <motion.div
                  key={cap.id}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  onClick={() => openModal(cap)}
                  className="p-6 md:p-8 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all duration-300 group flex items-start gap-6 cursor-pointer"
                >
                  <div className={`w-14 h-14 rounded-2xl ${cap.color} flex items-center justify-center shrink-0 border border-white group-hover:scale-110 group-hover:shadow-md transition-all duration-500`}>
                    <cap.icon size={24} className={cap.iconColor} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-display font-semibold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors flex items-center justify-between">
                      {cap.title}
                      <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-indigo-500">
                        <ExternalLink size={16} />
                      </span>
                    </h3>
                    <p className="text-slate-600 font-sans leading-relaxed text-sm font-light">{cap.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
      
      <QuickViewModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        data={modalData} 
      />
    </section>
  );
}
