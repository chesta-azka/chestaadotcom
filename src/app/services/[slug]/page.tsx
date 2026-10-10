import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { 
  ArrowRight, 
  MessageCircle, 
  Sparkles, 
  ChevronDown, 
  FolderGit2, 
  ArrowUpRight 
} from 'lucide-react';
import { getServiceContentBySlug, B2B_SERVICES_MAP } from '../../../data/b2bServicesData';

interface PageProps {
  params: Promise<{ slug?: string }>;
}

export async function generateStaticParams() {
  return Object.keys(B2B_SERVICES_MAP).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  const matchedContent = getServiceContentBySlug(slug);

  const title = `Konsultan ${matchedContent.title} & Efisiensi Operasional Skala Enterprise | chestaadotcom`;
  const description = `Tingkatkan ROI dan efisiensi operasional perusahaan Anda melalui ${matchedContent.title}. Solusi arsitektur digital berkinerja tinggi untuk B2B Enterprise dan UMKM Komersial bersama chestaadotcom.`;
  const keywords = matchedContent.commercialKeywords || 'jasa it enterprise, konsultan ai b2b, efisiensi operasional, roi bisnis, chestaadotcom';

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'id_ID',
      siteName: 'chestaadotcom',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  const matchedContent = getServiceContentBySlug(slug);

  // Generate valid FAQPage JSON-LD schema on server
  const validFaqs = (matchedContent.faqs || [])
    .map((item: any) => ({
      question: (item.question || item.q || '').trim(),
      answer: (item.answer || item.a || '').replace(/<[^>]*>/g, '').replace(/\*\*/g, '').trim(),
    }))
    .filter((f) => f.question.length > 0 && f.answer.length > 0);

  const faqSchemaMarkup = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': validFaqs.map((faq) => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer,
      },
    })),
  };

  const faqJsonString = JSON.stringify(faqSchemaMarkup);

  const industries = [
    { number: '01', name: 'Company Profile', href: '/industri/company-profile' },
    { number: '02', name: 'Rental Mobil', href: '/industri/rental-mobil' },
    { number: '03', name: 'Klinik & Kesehatan', href: '/industri/klinik-kesehatan' },
    { number: '04', name: 'Virtual Office', href: '/industri/virtual-office' },
    { number: '05', name: 'Tour & Travel', href: '/industri/tour-travel' },
    { number: '06', name: 'Fashion', href: '/industri/fashion' },
    { number: '07', name: 'Kontraktor', href: '/industri/kontraktor' },
    { number: '08', name: 'Konsultan', href: '/industri/konsultan' },
    { number: '09', name: 'Legalitas Usaha', href: '/industri/legalitas-usaha' },
    { number: '10', name: 'Perhiasan', href: '/industri/perhiasan' },
  ];

  return (
    <div className="bg-white text-slate-900 selection:bg-purple-100 selection:text-purple-900 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqJsonString }}
      />

      {/* SECTION 1: HERO */}
      <section id="hero" className="relative py-24 md:py-32 bg-gradient-to-b from-purple-50/50 via-white to-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="space-y-8 max-w-4xl">
            
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://wa.me/6282125447232?text=Halo%20chestaadotcom,%20saya%20ingin%20konsultasi%20gratis%20mengenai%20integrasi%20AI%20dan%20layanan%20digital."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100/80 text-purple-900 font-medium text-xs hover:bg-purple-200/80 transition-colors"
              >
                <Sparkles size={13} className="text-purple-700" />
                <span>{matchedContent.tagline}</span>
              </a>
              <span className="text-slate-300">|</span>
              <a
                href="#components"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-purple-700 transition-colors"
              >
                <span>Lihat lingkup ↓</span>
              </a>
            </div>

            <h1 className="text-5xl font-extrabold text-slate-900 leading-tight">
              Infrastruktur <span className="text-purple-600">{matchedContent.title}</span> untuk Skala Bisnis
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-slate-600 font-normal leading-relaxed max-w-3xl">
              {matchedContent.subText}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
              {matchedContent.miniFeatures.map((feat) => (
                <div key={feat.num} className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
                  <span className="text-xs font-mono font-bold text-purple-700">{feat.num}</span>
                  <div className="font-bold text-sm text-slate-950">{feat.title}</div>
                  <div className="text-xs text-slate-500 font-normal">{feat.subtitle}</div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: PROBLEM */}
      <section id="problem" className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 space-y-12">
          
          <div className="max-w-3xl space-y-3">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-slate-950 tracking-tight">
              {matchedContent.problemHeading}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {matchedContent.problemSubText}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {matchedContent.problemPoints.map((point) => (
              <div key={point.num} className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-3">
                <span className="text-xs font-mono font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-md border border-red-200">
                  {point.num}
                </span>
                <p className="text-sm sm:text-base font-medium text-slate-900 leading-relaxed">
                  {point.text}
                </p>
              </div>
            ))}
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-purple-950 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-widest text-purple-300 font-bold">
                Solusi &amp; Hasil Nyata
              </span>
              <p className="text-sm sm:text-base font-semibold text-purple-100 leading-relaxed">
                {matchedContent.resultStatement}
              </p>
            </div>
            <a
              href="https://wa.me/6282125447232?text=Halo%20chestaadotcom,%20saya%20ingin%20konsultasi%20mengenai%20solusi%20ini."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-full bg-white hover:bg-slate-100 text-purple-950 font-bold text-xs uppercase tracking-wider whitespace-nowrap shadow-md transition-all shrink-0 cursor-pointer"
            >
              Konsultasikan Masalah Anda
            </a>
          </div>

        </div>
      </section>

      {/* SECTION 3: COMPONENTS / SCOPE */}
      <section id="components" className="py-24 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 space-y-12">
          
          <div className="max-w-3xl space-y-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-slate-950 tracking-tight">
              {matchedContent.componentsHeading}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matchedContent.components.map((comp) => (
              <div key={comp.num} className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-3 hover:border-purple-300 transition-colors">
                <span className="text-xs font-mono font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-md border border-purple-100">
                  {comp.num}
                </span>
                <h3 className="text-lg font-bold text-slate-950">{comp.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{comp.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 4: PROCESS */}
      <section id="process" className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 space-y-12">
          
          <div className="max-w-3xl space-y-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-slate-950 tracking-tight">
              {matchedContent.processHeading}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              {matchedContent.processSubText}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {matchedContent.processSteps.map((step) => (
              <div key={step.num} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <span className="text-xs font-mono font-bold text-purple-700">{step.num}</span>
                <div className="font-bold text-base text-slate-950">{step.title}</div>
                <div className="text-xs text-slate-600 leading-relaxed">{step.desc}</div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 5: WORK PROOF */}
      <section id="work-proof" className="py-24 bg-slate-950 text-white border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 space-y-10">
          
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-purple-400 font-bold">
              {matchedContent.workProofHeading}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white tracking-tight">
              {matchedContent.workProofProject}
            </h2>
          </div>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            {matchedContent.workProofDesc}
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {matchedContent.workProofTags.map((tag, idx) => (
              <span key={idx} className="px-3 py-1 rounded-full bg-purple-950 text-purple-200 border border-purple-500/30 text-xs font-mono font-medium">
                {tag}
              </span>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 6: PARTNER VALUES */}
      <section id="partner-values" className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 space-y-12">
          
          <div className="max-w-3xl space-y-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-slate-950 tracking-tight">
              {matchedContent.partnerValuesHeading}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {matchedContent.partnerValues.map((val) => (
              <div key={val.num} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-xs font-mono font-bold text-purple-700">{val.num}</span>
                <div className="font-bold text-sm text-slate-950">{val.title}</div>
                <div className="text-xs text-slate-600 leading-relaxed">{val.desc}</div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 7: AI METHODOLOGY */}
      <section id="ai-methodology" className="py-24 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 space-y-12">
          
          <div className="max-w-3xl space-y-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-slate-950 tracking-tight">
              {matchedContent.aiMethodologyHeading}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {matchedContent.aiMethodologySubText}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {matchedContent.aiMethodologySteps.map((step) => (
              <div key={step.num} className="p-6 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-2xs">
                <span className="text-xs font-mono font-bold text-purple-700">{step.num}</span>
                <div className="font-bold text-sm text-slate-950">{step.title}</div>
                <div className="text-xs text-slate-600 leading-relaxed">{step.desc}</div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 8: INDUSTRY CONTEXT */}
      <section id="industri" className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 space-y-10">
          
          <div className="space-y-2 max-w-3xl">
            <span className="text-xs font-mono uppercase tracking-widest text-purple-700 font-bold">
              Cakupan Sektor Industri
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-slate-950 tracking-tight">
              Solusi Teruji untuk Berbagai Sektor Korporat &amp; UMKM Komersial
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 pt-4">
            {industries.map((ind) => (
              <div key={ind.number} className="relative group">
                <div 
                  role="tooltip"
                  className="absolute -top-10 left-1/2 -translate-x-1/2 pointer-events-none opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-200 z-30 whitespace-nowrap"
                >
                  <div className="px-2.5 py-1 rounded-md bg-purple-950 text-white text-[11px] font-mono font-medium shadow-xl border border-purple-400/40 flex items-center gap-1.5">
                    <Sparkles size={11} className="text-purple-300" />
                    <span>Audit Industry Needs</span>
                  </div>
                  <div className="w-2 h-2 bg-purple-950 rotate-45 mx-auto -mt-1 border-r border-b border-purple-400/40" />
                </div>

                <Link
                  href={ind.href}
                  className="w-full p-4 rounded-2xl bg-white border border-slate-200/90 group-hover:border-purple-600 group-hover:bg-purple-900 transition-all duration-300 shadow-2xs group-hover:shadow-xl group-hover:shadow-purple-900/20 flex flex-col justify-between min-h-[104px]"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-purple-700 group-hover:text-purple-300 transition-colors">
                      {ind.number}
                    </span>
                    <ArrowUpRight size={14} className="text-slate-400 group-hover:text-purple-200 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                  <div className="font-semibold text-xs sm:text-sm text-slate-900 group-hover:text-white leading-tight transition-colors">
                    {ind.name}
                  </div>
                  <div className="text-[10px] text-slate-400 group-hover:text-purple-300/80 transition-colors">
                    Solusi Khusus Sektor
                  </div>
                </Link>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 10: TECH STACK */}
      <section id="tech-stack" className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 space-y-10">
          
          <div className="max-w-3xl space-y-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-slate-950 tracking-tight">
              {matchedContent.techStackHeading}
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {matchedContent.techStack.map((tech) => (
              <div key={tech.name} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2 hover:border-purple-300 transition-colors">
                <div className="font-display font-bold text-base text-slate-950">{tech.name}</div>
                <div className="text-[11px] font-mono text-slate-500">{tech.role}</div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 11: FAQ */}
      <section id="faq" className="py-24 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 space-y-10">
          
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-slate-950 tracking-tight">
              {matchedContent.faqHeading}
            </h2>
          </div>

          <div className="space-y-3">
            {matchedContent.faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-2xs"
              >
                <div className="p-5 sm:p-6 space-y-2">
                  <div className="font-semibold text-sm sm:text-base text-slate-900">{faq.q}</div>
                  <div className="text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-24 bg-white text-center">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          <div className="p-8 sm:p-12 md:p-16 rounded-3xl bg-purple-950 text-white space-y-6 shadow-2xl shadow-purple-950/20">
            <div className="space-y-3 max-w-2xl mx-auto">
              <span className="text-xs font-mono uppercase tracking-widest text-purple-300 font-bold">
                Langkah Berikutnya
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold text-white tracking-tight">
                {matchedContent.ctaHeading}
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-purple-200 leading-relaxed">
                {matchedContent.ctaSubText}
              </p>
            </div>

            <div className="pt-2 flex flex-wrap justify-center items-center gap-3.5">
              <a
                href="https://wa.me/6282125447232?text=Halo%20chestaadotcom!%20Saya%20ingin%20diskusikan%20kebutuhan%20integrasi%20AI%20dan%20otomatisasi%20bisnis."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white hover:bg-slate-100 text-purple-950 rounded-full font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
              >
                <MessageCircle size={16} className="text-purple-900" />
                <span>Diskusikan Kebutuhan Anda</span>
                <ArrowRight size={14} />
              </a>

              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 px-5 py-3.5 bg-purple-900/60 hover:bg-purple-900 text-white rounded-full font-semibold text-xs sm:text-sm border border-purple-700/60 transition-colors"
              >
                <FolderGit2 size={15} />
                <span>Lihat Karya Kami</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
