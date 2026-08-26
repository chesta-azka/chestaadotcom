import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { SERVICE_DEFINITIONS } from '../data/ServiceDefinition';
import NotFoundPage from './NotFoundPage';
import { ArrowRight, CheckCircle2, MessageCircle } from 'lucide-react';
import FloatingQuoteTrigger from '../components/organisms/FloatingQuoteTrigger';
import SEOProvider from '../components/atoms/SEOProvider';
import SchemaMarkup from '../components/atoms/SchemaMarkup';
import { Skeleton } from '../components/atoms/Skeleton';
import FAQSchema from '../components/atoms/FAQSchema';
import Breadcrumbs from '../components/atoms/Breadcrumbs';
import ShareButton from '../components/atoms/ShareButton';
import RelatedServices from '../components/organisms/RelatedServices';
import { useState, useEffect } from 'react';

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, [slug]);
  
  const service = SERVICE_DEFINITIONS.find(s => s.slug === slug);

    if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 pt-48 pb-24 px-6 md:px-12 max-w-[1400px] mx-auto flex flex-col gap-16">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="flex-1 space-y-8">
            <Skeleton className="h-8 w-48 rounded-full" />
            <Skeleton className="h-24 w-3/4 rounded-3xl" />
            <Skeleton className="h-4 w-full rounded-full" />
            <Skeleton className="h-4 w-2/3 rounded-full" />
            <Skeleton className="h-16 w-48 rounded-full mt-8" />
          </div>
          <Skeleton className="w-full lg:w-[500px] h-[500px] rounded-[60px]" />
        </div>
        <div className="grid md:grid-cols-3 gap-6 mt-24">
          <Skeleton className="h-64 rounded-[40px]" />
          <Skeleton className="h-64 rounded-[40px]" />
          <Skeleton className="h-64 rounded-[40px]" />
        </div>
      </div>
    );
  }

  if (!service) return <NotFoundPage />;

  const pageTitle = `${service.title} Premium di BSD City & Cisauk | CHESTADOTCOM`;
  const pageDescription = `${service.description} Solusi spesialis dari CHESTADOTCOM. Melayani area BSD City dan Cisauk dengan standar tinggi.`;
  const canonicalUrl = `https://chestaa.com/layanan/${slug}`;

const faqs = [
    { question: `Apa itu layanan ${service.title}?`, answer: service.description },
    { question: `Di area mana layanan ${service.title} ini tersedia?`, answer: `Kami memfokuskan layanan ${service.title} untuk wilayah BSD City dan Cisauk dengan dukungan prioritas tinggi.` },
    { question: `Mengapa memilih ${service.title} dari CHESTADOTCOM?`, answer: `Kami membangun sistem dengan arsitektur modern yang menjamin skalabilitas, kecepatan, dan konversi tinggi, sesuai dengan spesifikasi: ${service.benefits.join(', ')}.` }
  ];

  const handleWhatsAppClick = () => {
    const text = encodeURIComponent(`Halo CHESTADOTCOM, saya ingin konsultasi mengenai layanan ${service.title}`);
    window.open(`https://wa.me/6282125447232?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pt-48 pb-24 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <SEOProvider 
        title={pageTitle}
        description={pageDescription}
        canonicalUrl={canonicalUrl}
        keywords={`${service.title}, BSD City, Cisauk, Web Development, CHESTADOTCOM`}
      />
      <SchemaMarkup />
      <FAQSchema faqs={faqs} />
      
      {/* Hero Section */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 border-b border-slate-200 pb-24">
        <div className="flex justify-between items-center mb-8">
          <Breadcrumbs items={[
            { label: 'Layanan', path: '/services' },
            { label: service.title }
          ]} />
          <ShareButton title={service.title} text={service.description} className="text-slate-500 hover:text-indigo-600 bg-white shadow-sm border border-slate-200 px-4 py-2 rounded-full transition-colors" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col lg:flex-row gap-16 lg:items-center"
        >
          <div className="flex-1">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-slate-200 bg-white shadow-sm text-slate-600 mb-8 text-[11px] font-mono tracking-[0.2em] uppercase">
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></span>
              BSD City & Cisauk Focus
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-[100px] font-display font-medium tracking-tighter leading-[0.95] mb-8">
              {service.title}
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 max-w-2xl font-light leading-relaxed mb-12">
              {service.description}
            </p>
            <button 
              onClick={handleWhatsAppClick}
              className="bg-indigo-600 text-white hover:bg-indigo-700 shadow-md px-10 py-5 rounded-full font-sans font-medium text-[13px] uppercase tracking-widest transition-all duration-300 inline-flex items-center gap-3 group"
            >
              Start Project <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
            </button>
          </div>
          
          <div className="w-full lg:w-[500px] h-[500px] rounded-[60px] bg-white border border-slate-200 shadow-sm flex items-center justify-center p-12 relative overflow-hidden backdrop-blur-3xl">
            <service.icon size={180} strokeWidth={0.5} className="text-indigo-600 relative z-10" />
          </div>
        </motion.div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-32 flex flex-col lg:flex-row gap-16 lg:items-start">
        <div className="flex-1 w-full">
        {/* Core Benefits */}
        <div className="mb-40">
          <h2 className="text-4xl md:text-6xl font-display font-medium tracking-tight mb-16">
            Technical Specs.
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {service.benefits.map((benefit, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white border border-slate-200 shadow-sm rounded-[40px] p-10 hover:bg-white/[0.06] transition-colors duration-500"
              >
                <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center mb-8 text-indigo-600">
                  <CheckCircle2 size={28} strokeWidth={1.5} />
                </div>
                <h3 className="font-display font-medium text-2xl mb-4">{benefit}</h3>
                <p className="text-slate-500 font-light leading-relaxed">Engineered for maximal efficiency and competitive advantage in the local and global landscape.</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Corporate Trust Section */}
        <div className="bg-white border border-slate-200 shadow-sm rounded-[60px] p-16 md:p-24 text-center">
          <h3 className="text-4xl md:text-6xl font-display font-medium mb-8">Uncompromising Quality.</h3>
          <p className="text-slate-500 max-w-3xl mx-auto mb-16 text-xl font-light leading-relaxed">
            Delivering enterprise-grade architecture and profound digital experiences specifically tailored for industry leaders in BSD City and Cisauk.
          </p>
          
          <Link 
            to="/projects"
            className="inline-flex items-center gap-3 border border-slate-200 text-slate-900 px-10 py-5 rounded-full font-sans font-medium text-[13px] uppercase tracking-widest hover:bg-slate-50 transition-colors"
          >
            View Portfolio <ArrowRight size={16} />
          </Link>
        </div>
        </div>
        <aside className="w-full lg:w-[360px] shrink-0 sticky top-32">
          <RelatedServices currentSlug={slug!} />
        </aside>
      </div>
      
      <FloatingQuoteTrigger />
    </div>
  );
}
