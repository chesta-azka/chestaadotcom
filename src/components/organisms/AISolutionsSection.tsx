import { useState, useRef } from 'react';
import { 
  Bot, 
  Network, 
  Zap, 
  ChevronRight, 
  Workflow, 
  MessageSquare, 
  Sparkles, 
  ShieldCheck, 
  Cpu, 
  ArrowUpRight, 
  Terminal, 
  Database,
  CheckCircle2,
  Layers
} from 'lucide-react';
import QuickViewModal, { QuickViewData } from '../molecules/QuickViewModal';

interface AICapabilityItem {
  id: string;
  title: string;
  category: string;
  badge: string;
  description: string;
  icon: any;
  tagColor: string;
  metrics: { label: string; value: string };
  previewType: 'chat' | 'pipeline' | 'ocr' | 'security';
  liveDetails: {
    steps?: string[];
    chatMessages?: { role: 'user' | 'ai'; text: string; time: string }[];
    dataFields?: { field: string; val: string }[];
  };
  ctaText: string;
  ctaLink: string;
}

const AI_BENTO_CAPABILITIES: AICapabilityItem[] = [
  {
    id: "ai-sales",
    title: "Autonomous Sales & WhatsApp Closer",
    category: "CUSTOMER ACQUISITION",
    badge: "24/7 Conversion",
    description: "Bukan chatbot berbasis menu kaku. Agen AI memahami konteks psikologis prospek, menjawab tanya-jawab produk mendalam, dan memandu transaksi hingga booking jadwal di WhatsApp.",
    icon: Bot,
    tagColor: "bg-purple-50 text-purple-800 border-purple-200",
    metrics: { label: "Response Speed", value: "< 1.2 Detik" },
    previewType: 'chat',
    liveDetails: {
      chatMessages: [
        { role: 'user', text: 'Halo, saya butuh website e-commerce dengan sistem stok otomatis dan integrasi WhatsApp.', time: '09:41' },
        { role: 'ai', text: 'Halo! Tentu, kami arsitekturi e-commerce full-stack dengan sinkronisasi inventori real-time dan notifikasi order otomatis ke WhatsApp Admin. Apakah Anda membutuhkan integrasi payment gateway BCA/Midtrans?', time: '09:41' },
        { role: 'user', text: 'Iya, Midtrans dan QRIS instant.', time: '09:42' },
        { role: 'ai', text: 'Sempurna. Estimasi delivery 2-3 minggu dengan garansi performa 100%. Saya buatkan ringkasan proposal sekarang?', time: '09:42' }
      ]
    },
    ctaText: "Konsultasi Agen Sales WhatsApp",
    ctaLink: "https://wa.me/6282125447232?text=Halo%20CHESTAADOTCOM%2C%20saya%20tertarik%20membangun%20Autonomous%20Sales%20AI%20Agent."
  },
  {
    id: "ai-operations",
    title: "Strategic Agentic Operations & Research",
    category: "BUSINESS INTELLIGENCE",
    badge: "Autonomous Loop",
    description: "Eksekusi riset pasar, pemantauan pergerakan kompetitor mingguan, dan penyusunan executive summary otomatis tanpa menambah tim operasional baru.",
    icon: Network,
    tagColor: "bg-purple-50 text-purple-700 border-purple-200",
    metrics: { label: "Efisiensi Waktu", value: "+85% Terpangkas" },
    previewType: 'pipeline',
    liveDetails: {
      steps: [
        "1. Web Crawling & Google SERP Scraping kompetitor target",
        "2. NLP Sentiment Analysis & Ekstraksi Tren Pricing",
        "3. Sintesis Strategis dengan LLM reasoning",
        "4. Pengiriman PDF Executive Summary ke Telegram/Email Direksi"
      ]
    },
    ctaText: "Konsultasi Agen Operasional",
    ctaLink: "https://wa.me/6282125447232?text=Halo%20CHESTAADOTCOM%2C%20saya%20ingin%20mengotomasi%20riset%20dan%20operasional%20dengan%20AI."
  },
  {
    id: "ai-workflow",
    title: "Omnichannel Pipeline & Webhook Sync",
    category: "SYSTEM INTEGRATION",
    badge: "Zero Manual Input",
    description: "Sinkronisasi seketika antara landing page, CRM, Google Sheets, WhatsApp, dan database backend. Menghapus bottleneck input manual antar departemen.",
    icon: Workflow,
    tagColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    metrics: { label: "Throughput", value: "100K+ Req/Hari" },
    previewType: 'ocr',
    liveDetails: {
      dataFields: [
        { field: "Trigger Webhook", val: "Form Submission / WA Event" },
        { field: "Validation Layer", val: "Anti-Spam & Phone Number Verify" },
        { field: "Database Target", val: "PostgreSQL Cloud + Hubspot CRM" },
        { field: "Alert Dispatch", val: "Instant WA Notification to Sales Rep" }
      ]
    },
    ctaText: "Rancang Workflow Otomasi",
    ctaLink: "https://wa.me/6282125447232?text=Halo%20CHESTAADOTCOM%2C%20saya%20butuh%20integrasi%20workflow%20otomasi%20omnichannel."
  },
  {
    id: "ai-security",
    title: "Enterprise Guardrails & Token Shield",
    category: "DATA GOVERNANCE",
    badge: "ISO/GDPR Ready",
    description: "Lapisan proteksi privasi data ketat dengan PII Masking, pencegahan prompt-injection, serta enkripsi end-to-end untuk kepatuhan korporasi.",
    icon: ShieldCheck,
    tagColor: "bg-slate-100 text-slate-800 border-slate-200",
    metrics: { label: "Uptime SLA", value: "99.95% Guaranteed" },
    previewType: 'security',
    liveDetails: {
      steps: [
        "Enkripsi transit AES-256 & TLS 1.3",
        "PII Auto-Redaction (Nomor HP, NIK, Kartu Kredit)",
        "Rate-Limiting & DDOS Protection Terisolasi",
        "Audit Log Real-Time & Monitoring Sentry"
      ]
    },
    ctaText: "Pelajari Keamanan AI",
    ctaLink: "https://wa.me/6282125447232?text=Halo%20CHESTAADOTCOM%2C%20saya%20ingin%20mengetahui%20standar%20keamanan%20dan%20guardrails%20AI."
  }
];

export default function AISolutionsSection() {
  const [selectedId, setSelectedId] = useState<string>("ai-sales");
  const [modalData, setModalData] = useState<QuickViewData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const activeCapability = AI_BENTO_CAPABILITIES.find(c => c.id === selectedId) || AI_BENTO_CAPABILITIES[0];

  const openModal = (cap: AICapabilityItem) => {
    setModalData({
      id: cap.id,
      title: cap.title,
      description: cap.description,
      benefits: [
        `Kecepatan & Performa: ${cap.metrics.value}`,
        `Kategori Arsitektur: ${cap.category}`,
        `Kesiapan Implementasi: Standar Enterprise 2026`
      ],
      ctaText: cap.ctaText,
      ctaLink: cap.ctaLink
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setModalData(null), 300);
  };

  return (
    <div className="relative w-full py-4 sm:py-6 text-left">
      {/* Top Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-12 pb-6 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50/90 border border-purple-200/90 text-[10px] font-mono font-bold tracking-widest text-purple-800 uppercase mb-3.5 shadow-2xs">
            <Sparkles size={12} className="text-purple-600" />
            <span>ARSITEKTUR AGENTIC AI 2026</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            Otomasi Skala Penuh. <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-purple-600 to-purple-500">
              Cerdas, Mandiri & Skalabel.
            </span>
          </h2>
        </div>

        <p className="max-w-md text-slate-600 font-sans text-sm sm:text-base leading-relaxed">
          Bukan sekadar bot tanya jawab sederhana. Kami membangun agen AI otonom yang memangkas beban kerja operasional dan melipatgandakan omset bisnis Anda.
        </p>
      </div>

      {/* Main 2-Column Bento Box Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        
        {/* Left Column: Interactive Capability Selector Pills (Bento Left) */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          <div className="flex items-center justify-between pb-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Layers size={13} className="text-purple-600" />
              Pilih Modul Solusi
            </span>
            <span className="text-[11px] font-mono text-purple-600 font-semibold">
              4 Sistem Siap Pakai
            </span>
          </div>

          {AI_BENTO_CAPABILITIES.map((cap) => {
            const isSelected = cap.id === selectedId;
            const Icon = cap.icon;

            return (
              <div
                key={cap.id}
                onClick={() => setSelectedId(cap.id)}
                className={`p-4 sm:p-5 rounded-2xl sm:rounded-3xl border transition-all duration-300 cursor-pointer select-none text-left relative overflow-hidden ${
                  isSelected
                    ? 'bg-white border-purple-500/80 shadow-[0_10px_30px_rgba(88,28,135,0.1)] ring-2 ring-purple-500/20'
                    : 'bg-white/80 hover:bg-white border-slate-200/80 hover:border-purple-200 shadow-2xs'
                }`}
              >
                {/* Active Indicator Bar */}
                {isSelected && (
                  <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-gradient-to-b from-purple-600 to-purple-600" />
                )}

                <div className="flex items-start gap-4">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border ${
                    isSelected ? 'bg-purple-600 text-white border-purple-500' : 'bg-slate-100 text-slate-700 border-slate-200/80'
                  } transition-colors`}>
                    <Icon size={20} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">
                        {cap.category}
                      </span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border font-semibold ${cap.tagColor}`}>
                        {cap.badge}
                      </span>
                    </div>

                    <h3 className={`text-base sm:text-lg font-display font-bold leading-snug truncate ${
                      isSelected ? 'text-purple-950' : 'text-slate-900'
                    }`}>
                      {cap.title}
                    </h3>

                    <p className="text-xs text-slate-500 line-clamp-2 mt-1 font-sans">
                      {cap.description}
                    </p>

                    <div className="mt-3 flex items-center justify-between pt-2.5 border-t border-slate-100/80 text-[11px] font-mono">
                      <span className="text-slate-500 font-medium">
                        {cap.metrics.label}: <strong className="text-slate-800">{cap.metrics.value}</strong>
                      </span>
                      <span className="text-purple-600 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Detail <ChevronRight size={12} />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Independent Scrollable Bento Playground & Live Preview Window */}
        <div className="lg:col-span-7">
          <div className="bg-white/85 backdrop-blur-2xl rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-[0_20px_50px_rgba(15,23,42,0.06)] ring-1 ring-slate-900/5 overflow-hidden flex flex-col">
            
            {/* Bento Top Terminal Bar */}
            <div className="bg-slate-900/95 backdrop-blur-md text-white px-5 py-3.5 flex items-center justify-between gap-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                </div>
                <span className="text-xs font-mono text-slate-300 flex items-center gap-1.5 pl-2 border-l border-slate-700">
                  <Terminal size={13} className="text-purple-400" />
                  agent://preview/{activeCapability.id}.ts
                </span>
              </div>

              <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-emerald-400 font-bold">ISOLATED SCROLL</span>
              </div>
            </div>

            {/* Independent Scrollable Area with Fixed Height, Glassmorphism, and Event Propagation Block */}
            <div 
              ref={scrollContainerRef}
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              className="p-5 sm:p-7 bg-white/70 backdrop-blur-xl overflow-y-auto overscroll-contain h-[480px] max-h-[480px] space-y-6 focus:outline-none scrollbar-thin scrollbar-thumb-purple-200/80 scrollbar-track-slate-50/50"
              tabIndex={0}
              title="Area simulasi AI terisolasi - gulir di sini tanpa menggeser halaman utama"
            >
              {/* Active Headline Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white/90 backdrop-blur-md border border-purple-100/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono font-bold text-purple-800 tracking-wider uppercase">
                    SIMULASI AKTIF
                  </span>
                  <h4 className="text-lg sm:text-xl font-display font-bold text-slate-900 mt-0.5">
                    {activeCapability.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    {activeCapability.description}
                  </p>
                </div>

                <div className="shrink-0 bg-purple-50/80 px-4 py-2 rounded-xl border border-purple-200/80 shadow-2xs text-center">
                  <span className="text-[10px] font-mono text-slate-500 block uppercase font-medium">Metrik Inti</span>
                  <span className="text-sm font-mono font-bold text-purple-800">{activeCapability.metrics.value}</span>
                </div>
              </div>

              {/* Chat Simulation Preview */}
              {activeCapability.previewType === 'chat' && activeCapability.liveDetails.chatMessages && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-500 pb-1">
                    <span className="flex items-center gap-1.5 font-medium">
                      <MessageSquare size={13} className="text-purple-600" />
                      Live WhatsApp Agent Interaction
                    </span>
                    <span>Enkripsi 256-bit</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/80 backdrop-blur-md border border-slate-200/90 shadow-xs space-y-3">
                    {activeCapability.liveDetails.chatMessages.map((msg, i) => (
                      <div 
                        key={i} 
                        className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                      >
                        <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed ${
                          msg.role === 'user' 
                            ? 'bg-purple-600 text-white rounded-br-xs shadow-xs' 
                            : 'bg-slate-50 text-slate-800 border border-slate-200/90 rounded-bl-xs shadow-2xs'
                        }`}>
                          <p>{msg.text}</p>
                          <span className={`text-[9px] block text-right mt-1 font-mono ${
                            msg.role === 'user' ? 'text-purple-200' : 'text-slate-400'
                          }`}>
                            {msg.time}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Pipeline / Steps Simulation Preview */}
              {activeCapability.previewType === 'pipeline' && activeCapability.liveDetails.steps && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-500 pb-1">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Cpu size={13} className="text-purple-600" />
                      Multi-Step Agentic Reasoning Log
                    </span>
                    <span>Real-Time Execution</span>
                  </div>

                  <div className="space-y-2.5">
                    {activeCapability.liveDetails.steps.map((step, sIdx) => (
                      <div key={sIdx} className="p-3.5 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200 flex items-start gap-3 shadow-2xs hover:border-purple-200 transition-colors">
                        <CheckCircle2 size={16} className="text-purple-600 shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm font-mono text-slate-800 font-medium">
                          {step}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Data / Webhook Fields Preview */}
              {activeCapability.previewType === 'ocr' && activeCapability.liveDetails.dataFields && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-500 pb-1">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Database size={13} className="text-emerald-600" />
                      Payload Data Mapping & Route
                    </span>
                    <span>Webhook Active</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeCapability.liveDetails.dataFields.map((field, fIdx) => (
                      <div key={fIdx} className="p-3 rounded-xl bg-white/90 backdrop-blur-md border border-slate-200 shadow-2xs">
                        <span className="text-[10px] font-mono uppercase text-slate-400 block">{field.field}</span>
                        <span className="text-xs font-mono font-bold text-slate-800">{field.val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Security Guardrails Preview */}
              {activeCapability.previewType === 'security' && activeCapability.liveDetails.steps && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-500 pb-1">
                    <span className="flex items-center gap-1.5 font-medium">
                      <ShieldCheck size={13} className="text-purple-600" />
                      Security & Privacy Guardrails
                    </span>
                    <span>Enterprise Grade</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeCapability.liveDetails.steps.map((sec, secIdx) => (
                      <div key={secIdx} className="p-3 rounded-xl bg-white/90 backdrop-blur-md border border-purple-100/90 shadow-2xs flex items-center gap-2.5">
                        <ShieldCheck size={15} className="text-purple-600 shrink-0" />
                        <span className="text-xs font-sans text-slate-700 font-medium">{sec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Extra Feature Highlights Bento Grid inside scroll */}
              <div className="pt-4 border-t border-slate-200/70 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-white/90 backdrop-blur-md border border-slate-200/80 text-left shadow-2xs">
                  <div className="flex items-center gap-1.5 text-purple-800 font-mono text-xs font-bold mb-1">
                    <Zap size={13} />
                    <span>Latensi Rendah</span>
                  </div>
                  <p className="text-[11px] text-slate-600">Streaming token ultra responsif.</p>
                </div>

                <div className="p-3 rounded-xl bg-white/90 backdrop-blur-md border border-slate-200/80 text-left shadow-2xs">
                  <div className="flex items-center gap-1.5 text-purple-700 font-mono text-xs font-bold mb-1">
                    <Database size={13} />
                    <span>Memory Store</span>
                  </div>
                  <p className="text-[11px] text-slate-600">Menyimpan profil & riwayat user.</p>
                </div>

                <div className="p-3 rounded-xl bg-white/90 backdrop-blur-md border border-slate-200/80 text-left shadow-2xs">
                  <div className="flex items-center gap-1.5 text-emerald-700 font-mono text-xs font-bold mb-1">
                    <Workflow size={13} />
                    <span>Koneksi API</span>
                  </div>
                  <p className="text-[11px] text-slate-600">Mudah dihubungkan ke backend.</p>
                </div>
              </div>

            </div>

            {/* Bento Bottom Action Footer */}
            <div className="p-4 sm:p-5 bg-white/80 backdrop-blur-xl border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs font-mono text-slate-500 text-center sm:text-left">
                Butuh kustomisasi agen AI untuk workflow spesifik bisnis Anda?
              </span>

              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <button
                  onClick={() => openModal(activeCapability)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-full bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 font-mono text-xs font-bold uppercase transition-colors cursor-pointer"
                >
                  Lihat Spesifikasi
                </button>

                <a
                  href={activeCapability.ctaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-purple-600 hover:bg-purple-800 text-white font-mono text-xs font-bold uppercase tracking-wider shadow-md shadow-purple-600/20 transition-all"
                >
                  <span>Chat Tim AI</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>

      <QuickViewModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        data={modalData} 
      />
    </div>
  );
}
