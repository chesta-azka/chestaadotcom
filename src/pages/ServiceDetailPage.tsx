import { useParams, Link } from 'react-router-dom';
import { SERVICES_DATA, ServiceDetailData } from '../data/servicesData';
import { motion } from 'motion/react';
import { 
  CheckCircle2, 
  ArrowRight, 
  MessageCircle, 
  Clock, 
  ChevronRight, 
  Sparkles,
  ShieldCheck,
  Zap,
  TrendingUp,
  HelpCircle
} from 'lucide-react';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { generateServiceSchema, injectSchemaScript } from '../utils/schemaMarkup';

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const service: ServiceDetailData | undefined = slug ? SERVICES_DATA[slug] : undefined;

  useEffect(() => {
    if (service) {
      const schema = generateServiceSchema({
        name: service.title,
        description: service.heroDescription,
        url: window.location.href,
        priceRange: service.investment.price,
        providerName: 'ChestaAzka Enterprise Tech'
      });
      injectSchemaScript(schema, 'service-jsonld');
    }
    return () => {
      const existing = document.getElementById('service-jsonld');
      if (existing) existing.remove();
    };
  }, [service]);

  if (!service) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6 bg-white">
        <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-900 mb-6 font-bold text-2xl border border-slate-200">
          404
        </div>
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 mb-3">Layanan Tidak Ditemukan</h1>
        <p className="text-slate-600 font-sans max-w-md mb-8 text-sm sm:text-base">
          Maaf, layanan yang Anda cari tidak tersedia atau tautan sudah kedaluwarsa.
        </p>
        <Link 
          to="/" 
          className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-all"
        >
          Kembali ke Beranda
        </Link>
      </div>
    );
  }

  const whatsappText = `Halo Mas Chesta, saya tertarik dengan layanan ${service.title}. Mohon informasi konsultasi lebih lanjut.`;
  const whatsappUrl = `https://wa.me/6282125447232?text=${encodeURIComponent(whatsappText)}`;

  const handleWhatsAppClick = () => {
    toast.success('Membuka WhatsApp untuk konsultasi langsung...', {
      duration: 3500,
      icon: '💬',
    });
  };

  return (
    <div className="min-h-screen pt-32 pb-24 bg-white text-slate-900 selection:bg-purple-900 selection:text-white">
      {/* Google-style subtle top gradient */}
      <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-slate-50/80 to-transparent pointer-events-none -z-10" />

      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-sans text-slate-500 mb-10">
          <Link to="/" className="hover:text-slate-900 transition-colors">Beranda</Link>
          <ChevronRight size={14} className="text-slate-400" />
          <span className="text-slate-400">Layanan</span>
          <ChevronRight size={14} className="text-slate-400" />
          <span className="text-slate-900 font-semibold">{service.title}</span>
        </nav>

        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs font-mono font-semibold uppercase tracking-wider mb-6">
            <Sparkles size={13} className="text-purple-600" />
            {service.badge}
          </div>

          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-slate-900 tracking-tight leading-[1.12] mb-6">
            {service.heroHeadline}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 font-sans leading-relaxed mb-8">
            {service.heroDescription}
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppClick}
              className="px-7 py-3.5 bg-slate-900 hover:bg-slate-800 active:scale-95 text-white rounded-xl font-sans font-bold text-xs uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <MessageCircle size={16} />
              <span>Konsultasi Proyek Langsung</span>
              <ArrowRight size={15} />
            </a>
            
            <a
              href="#pricing"
              className="px-7 py-3.5 bg-white hover:bg-slate-50 active:scale-95 text-slate-900 rounded-xl font-sans font-bold text-xs uppercase tracking-wider border border-slate-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Lihat Investasi</span>
            </a>
          </div>
        </motion.div>

        {/* Core Metrics Grid (Google style clean cards) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {service.coreMetrics.map((metric, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/90 flex flex-col justify-between">
              <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider mb-2">{metric.label}</span>
              <div className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 mb-1">{metric.value}</div>
              <span className="text-[11px] font-sans text-slate-600">{metric.desc}</span>
            </div>
          ))}
        </div>

        {/* Problem Statement Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-20 pb-16 border-b border-slate-200">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-mono font-bold text-rose-600 uppercase tracking-wider block">Realita &amp; Risiko</span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 tracking-tight leading-snug">
              {service.problemStatement.title}
            </h2>
            <p className="text-slate-600 font-sans text-sm sm:text-base leading-relaxed">
              Memilih bermitra dengan amatir atau menunda optimasi hanya akan menguras anggaran pemasaran Anda tanpa hasil nyata.
            </p>
          </div>

          <div className="lg:col-span-7 space-y-3">
            {service.problemStatement.points.map((point, idx) => (
              <div 
                key={idx}
                className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-slate-200 shadow-2xs"
              >
                <div className="w-5 h-5 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                  ✕
                </div>
                <p className="text-slate-700 font-sans text-sm sm:text-base leading-relaxed">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Solution Overview Section */}
        <div className="mb-20">
          <div className="max-w-2xl mb-10">
            <span className="text-xs font-mono font-bold text-purple-700 uppercase tracking-wider block mb-2">Pendekatan Profesional</span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 tracking-tight mb-3">
              {service.solutionOverview.title}
            </h2>
            <p className="text-slate-600 font-sans text-sm sm:text-base">
              {service.solutionOverview.description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {service.solutionOverview.benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-start gap-3.5 p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <CheckCircle2 size={18} className="text-purple-700 shrink-0 mt-0.5" />
                <span className="text-sm font-sans font-medium text-slate-800 leading-snug">
                  {benefit}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Process Steps */}
        <div className="mb-20">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider block mb-2">Workflow &amp; Eksekusi</span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 tracking-tight">
              Tahapan Pengerjaan Terstruktur
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {service.processSteps.map((s, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-md inline-block mb-4">
                    Fase {s.step}
                  </span>
                  <h3 className="text-base font-display font-bold text-slate-900 mb-2">{s.title}</h3>
                  <p className="text-xs sm:text-sm font-sans text-slate-600 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing & Investment Box (Clean Google Card) */}
        <div id="pricing" className="max-w-3xl mx-auto p-8 sm:p-10 rounded-xl bg-slate-900 text-white shadow-xl mb-20 text-center relative overflow-hidden">
          <span className="text-xs font-mono font-bold text-purple-300 uppercase tracking-widest block mb-2">Paket &amp; Investasi</span>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight mb-3">
            Mulai Proyek Anda Sekarang
          </h2>
          <p className="text-slate-300 font-sans text-sm mb-8 max-w-lg mx-auto">
            Solusi enterprise transparan tanpa biaya tersembunyi, dengan garansi kualitas penuh.
          </p>

          <div className="inline-block p-6 rounded-2xl bg-white/5 border border-white/10 mb-8 w-full max-w-md text-left">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-1">Mulai Dari</span>
            <div className="text-3xl font-display font-extrabold text-white mb-2">{service.investment.price}</div>
            <div className="text-xs font-sans text-purple-300 font-medium flex items-center gap-1.5">
              <Clock size={14} /> Estimasi pengerjaan: {service.investment.duration}
            </div>
          </div>

          <div className="space-y-2.5 max-w-md mx-auto mb-8 text-left">
            {service.investment.features.map((feat, idx) => (
              <div key={idx} className="flex items-center gap-3 text-xs sm:text-sm font-sans text-slate-200">
                <CheckCircle2 size={16} className="text-purple-400 shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWhatsAppClick}
            className="inline-flex items-center justify-center gap-3 w-full max-w-md py-4 px-8 bg-white hover:bg-slate-100 text-slate-900 rounded-xl font-sans font-bold text-xs uppercase tracking-widest transition-all cursor-pointer"
          >
            <MessageCircle size={16} className="text-purple-700" />
            <span>Hubungi via WhatsApp Sekarang</span>
            <ArrowRight size={15} />
          </a>

          <p className="text-[11px] text-slate-400 font-sans mt-4">
            🔒 {service.guarantee}
          </p>
        </div>

        {/* FAQs */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="text-center mb-10">
            <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider block mb-2">Bantuan</span>
            <h2 className="text-2xl font-display font-bold text-slate-900 tracking-tight">
              Pertanyaan yang Sering Diajukan
            </h2>
          </div>

          <div className="space-y-3">
            {service.faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="rounded-xl bg-slate-50 border border-slate-200 overflow-hidden transition-all">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-4 text-left font-display font-bold text-slate-900 text-sm sm:text-base hover:bg-slate-100/60 transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <span className={`w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-xs transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 bg-slate-900 text-white' : ''}`}>
                      ↓
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-slate-600 font-sans text-xs sm:text-sm leading-relaxed border-t border-slate-200 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
