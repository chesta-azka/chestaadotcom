import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  MessageCircle,
  Check,
  ShieldCheck,
  ArrowRight,
  FileText,
  Clock,
  UserCheck,
  Sparkles,
  ChevronDown,
  HelpCircle,
  AlertCircle,
  Calendar,
  CreditCard,
  Code2,
  Lock,
  RefreshCw,
} from 'lucide-react';
import SEOMetadata from '../components/atoms/SEOMetadata';
import TrustStrip from '../components/atoms/TrustStrip';
import { PROCESS_PHASES } from '../data/process';
import { PRICING_PACKAGES } from '../data/pricing';
import {
  Container,
  Button,
  Card,
  Badge,
  SectionHeading,
  Reveal,
  Breadcrumb,
  FAQAccordion,
} from '../components/ui/DesignSystem';
import { parseLocalizedPath, toLocalizedHref } from '../lib/i18n';
import { buildWhatsAppLink, getWhatsAppCtaLabel } from '../lib/whatsapp';
import { trackWaClick } from '../lib/analytics';

/**
 * 6-Step SVG Flow Diagram Component
 * Highlights the active node (1 to 6) based on activeStep prop.
 */
function ProcessFlowIllustration({
  activeStep,
  locale,
}: {
  activeStep: number;
  locale: 'id' | 'en';
}) {
  const isEn = locale === 'en';

  const steps = [
    { num: 1, label: isEn ? 'Audit' : 'Audit' },
    { num: 2, label: isEn ? 'Proposal' : 'Proposal' },
    { num: 3, label: isEn ? 'Prototype' : 'Rancang' },
    { num: 4, label: isEn ? 'Build' : 'Bangun' },
    { num: 5, label: isEn ? 'Handover' : 'Handover' },
    { num: 6, label: isEn ? 'Care' : 'Rawat' },
  ];

  return (
    <div className="p-6 sm:p-8 rounded-[24px] bg-[#FFFFFF] border border-[rgba(91,60,196,0.18)] shadow-[0_8px_30px_rgba(23,18,43,0.06)] relative overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-[11px] uppercase tracking-wider text-[#6A3FD0] font-semibold bg-[#EFEAFB] px-3 py-1 rounded-full border border-[rgba(91,60,196,0.18)]">
          {isEn ? 'Flow Diagram' : 'Ilustrasi Flow'}
        </span>
        <span className="text-[12px] font-mono text-[#5B5675]">
          {isEn ? `Phase 0${activeStep} of 06` : `Tahap 0${activeStep} dari 06`}
        </span>
      </div>

      <svg
        viewBox="0 0 340 380"
        className="w-full h-auto max-h-[360px]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Process Flow Diagram"
      >
        {/* Connective Line */}
        <path
          d="M 60 50 L 60 330"
          stroke="#EFEAFB"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d={`M 60 50 L 60 ${50 + (activeStep - 1) * 56}`}
          stroke="#6A3FD0"
          strokeWidth="4"
          strokeLinecap="round"
          className="transition-all duration-500 ease-out"
        />

        {/* Nodes */}
        {steps.map((step, idx) => {
          const cy = 50 + idx * 56;
          const isActive = activeStep === step.num;
          const isPassed = activeStep > step.num;

          return (
            <g key={step.num} className="transition-all duration-300">
              {/* Outer Glow Circle for Active */}
              {isActive && (
                <circle
                  cx="60"
                  cy={cy}
                  r="22"
                  fill="#6A3FD0"
                  fillOpacity="0.12"
                  className="animate-pulse"
                />
              )}

              {/* Node Circle */}
              <circle
                cx="60"
                cy={cy}
                r="14"
                fill={isActive ? '#6A3FD0' : isPassed ? '#5230B0' : '#FFFFFF'}
                stroke={isActive || isPassed ? '#6A3FD0' : '#D5CCF6'}
                strokeWidth="2.5"
                className="transition-colors duration-300"
              />

              {/* Node Text / Check */}
              {isPassed ? (
                <path
                  d={`M ${60 - 4} ${cy} L ${60 - 1} ${cy + 3} L ${60 + 5} ${cy - 4}`}
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ) : (
                <text
                  x="60"
                  y={cy + 4}
                  textAnchor="middle"
                  fill={isActive ? '#FFFFFF' : '#5B5675'}
                  fontSize="11"
                  fontWeight="700"
                  fontFamily="sans-serif"
                >
                  {step.num}
                </text>
              )}

              {/* Step Label Box */}
              <rect
                x="94"
                y={cy - 16}
                width="220"
                height="32"
                rx="10"
                fill={isActive ? '#F8F6FE' : '#FFFFFF'}
                stroke={isActive ? 'rgba(91,60,196,0.3)' : '#EFEAFB'}
                strokeWidth="1.5"
                className="transition-all duration-300"
              />

              <text
                x="110"
                y={cy + 4}
                fill={isActive ? '#17122B' : '#5B5675'}
                fontSize="13"
                fontWeight={isActive ? '600' : '500'}
                fontFamily="sans-serif"
              >
                {step.num}. {step.label}
              </text>

              {/* Active Marker Dot */}
              {isActive && (
                <circle cx="298" cy={cy} r="4" fill="#6A3FD0" />
              )}
            </g>
          );
        })}
      </svg>

      <div className="mt-3 pt-3 border-t border-[rgba(91,60,196,0.12)] text-center">
        <p className="text-[12.5px] text-[#5B5675] font-medium">
          {isEn
            ? 'Scroll down to follow each phase in detail'
            : 'Gulir ke bawah untuk melihat rincian tiap tahap'}
        </p>
      </div>
    </div>
  );
}

export default function HowItWorksPage() {
  const location = useLocation();
  const { locale, prefixMode } = parseLocalizedPath(location.pathname);
  const isEn = locale === 'en';

  const [activeStep, setActiveStep] = useState<number>(1);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  const waContext = { type: 'default' as const, url: location.pathname };
  const whatsappUrl = buildWhatsAppLink(waContext, locale);
  const waCtaLabel = getWhatsAppCtaLabel(locale);

  const homeHref = toLocalizedHref('/', locale, prefixMode);
  const auditHref = toLocalizedHref('/audit-gratis', locale, prefixMode);
  const pricingHref = toLocalizedHref('/harga', locale, prefixMode);
  const faqHref = toLocalizedHref('/faq', locale, prefixMode);

  // Scroll observer to update activeStep in the sticky illustration
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    stepRefs.current.forEach((ref, index) => {
      if (!ref) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveStep(index + 1);
            }
          });
        },
        { threshold: 0.4, rootMargin: '-10% 0px -40% 0px' }
      );

      observer.observe(ref);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  // Step details matrix
  const phaseDetails = [
    {
      num: 1,
      kami: isEn
        ? 'listen, ask questions, and map repetitive tasks.'
        : 'mendengarkan, bertanya, memetakan kerjaan berulang.',
      kamu: isEn
        ? 'share the workload and show current examples.'
        : 'menceritakan kerjaan dan menunjukkan contoh.',
      terima: isEn
        ? 'candid recommendations plus estimated cost and time.'
        : 'rekomendasi jujur serta perkiraan biaya dan waktu.',
      money: null,
    },
    {
      num: 2,
      kami: isEn
        ? 'write a proposal with scope, price, schedule, and revision limits.'
        : 'menulis proposal dengan lingkup, harga, jadwal, dan batas revisi.',
      kamu: isEn
        ? 'read, ask questions, and approve.'
        : 'membaca, bertanya, dan menyetujui.',
      terima: isEn ? 'written proposal.' : 'proposal tertulis.',
      money: isEn
        ? '50% deposit before construction starts.'
        : 'DP 50% sebelum pengerjaan.',
    },
    {
      num: 3,
      kami: isEn
        ? 'design the structure or visual flow.'
        : 'menyusun struktur atau alur.',
      kamu: isEn
        ? 'provide feedback and approval.'
        : 'memberi masukan dan persetujuan.',
      terima: isEn
        ? 'a tangible prototype to review before full build.'
        : 'bentuk yang bisa dilihat sebelum dibangun penuh.',
      money: null,
    },
    {
      num: 4,
      kami: isEn
        ? 'build, test on real phones with sample data, and update progress.'
        : 'membangun, menguji di HP dan dengan data contoh, dan mengabari progres.',
      kamu: isEn
        ? 'answer questions and give feedback within revision limits.'
        : 'menjawab pertanyaan dan memberi umpan balik dalam batas revisi.',
      terima: isEn
        ? 'regular progress updates via WhatsApp.'
        : 'kabar progres rutin lewat WhatsApp.',
      money: null,
    },
    {
      num: 5,
      kami: isEn
        ? 'final testing, release, and formal handover.'
        : 'uji akhir, rilis, dan serah terima.',
      kamu: isEn
        ? 'complete final payment before handover.'
        : 'melunasi pembayaran sebelum handover.',
      terima: isEn
        ? 'full access, docs, quick guide, domain & hosting registered in your name.'
        : 'akses, dokumen, panduan singkat, domain dan hosting atas namamu.',
      money: isEn
        ? 'final payment before handover.'
        : 'pelunasan sebelum handover.',
    },
    {
      num: 6,
      kami: isEn
        ? 'updates, backups, performance checks, and adjustments.'
        : 'pembaruan, cadangan, pengecekan, dan penyesuaian.',
      kamu: isEn
        ? 'choose a monthly care package or manage in-house.'
        : 'memilih paket rawat atau memegang sendiri.',
      terima: isEn
        ? 'a system that stays healthy after launch.'
        : 'sistem yang tetap sehat setelah rilis.',
      money: null,
    },
  ];

  // FAQ Items
  const miniFaqs = [
    {
      question: isEn ? 'How long does development take?' : 'Berapa lama pengerjaannya?',
      answer: isEn
        ? 'Depending on the package, from 2–4 working days for Starter up to 14–30 working days for Custom Software. The exact schedule is stated in your written proposal after the audit.'
        : 'Tergantung paket yang kamu pilih, mulai dari 2–4 hari kerja untuk Starter hingga 14–30 hari kerja untuk Software Custom. Jadwal pasti kami tulis di proposal setelah audit.',
    },
    {
      question: isEn
        ? 'What if the result does not match expectations?'
        : 'Kalau hasilnya nggak sesuai ekspektasi?',
      answer: isEn
        ? 'Every project includes a prototype phase where you review and approve the structure before full construction begins. Additionally, each package includes specified revision rounds to refine every detail.'
        : 'Setiap proyek melewati tahap prototipe di mana kamu menyetujui bentuknya sebelum dibangun penuh. Selain itu ada batas putaran revisi untuk merapikan detail.',
    },
    {
      question: isEn
        ? "I'm not technical—is that okay?"
        : 'Aku nggak ngerti teknis, nggak apa-apa?',
      answer: isEn
        ? 'Not a problem at all. You only need to describe your daily business workflow and pain points in everyday language. We handle all code, hosting, domain setup, and technical deployment completely.'
        : 'Nggak apa-apa sama sekali. Kamu cukup jelaskan cara kerja bisnis dan masalahnya dalam bahasa sehari-hari. Bagian teknis, domain, server, dan kodenya kami yang urus sepenuhnya.',
    },
  ];

  // JSON-LD ItemList Schema for the 6 phases
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `https://chestaa.com${location.pathname}#webpage`,
        url: `https://chestaa.com${location.pathname}`,
        name: isEn
          ? 'How We Work: Free Audit to Handover | CHESTAADOTCOM'
          : 'Cara Kerja: Audit Gratis sampai Handover | CHESTAADOTCOM',
        description: isEn
          ? 'See our workflow: 30-min free audit, written proposal, prototype, build, to handover. Know what you receive at every phase.'
          : 'Lihat alur kerja kami: audit gratis 30 menit, proposal tertulis, prototipe, pengerjaan, sampai handover. Tahu apa yang kamu terima di setiap tahap.',
        inLanguage: isEn ? 'en-US' : 'id-ID',
        isPartOf: {
          '@type': 'WebSite',
          '@id': 'https://chestaa.com/#website',
          name: 'CHESTAADOTCOM',
          url: 'https://chestaa.com',
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `https://chestaa.com${location.pathname}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: isEn ? 'Home' : 'Beranda',
            item: `https://chestaa.com/${locale}`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: isEn ? 'How We Work' : 'Cara Kerja',
            item: `https://chestaa.com${location.pathname}`,
          },
        ],
      },
      {
        '@type': 'ItemList',
        '@id': `https://chestaa.com${location.pathname}#process-list`,
        name: isEn ? 'CHESTAADOTCOM 6-Phase Engineering Process' : 'Alur Pengerjaan 6 Tahap CHESTAADOTCOM',
        itemListElement: PROCESS_PHASES.map((phase, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: isEn ? phase.titleEn : phase.titleId,
          description: isEn ? phase.descEn : phase.descId,
        })),
      },
    ],
  };

  return (
    <div className="pt-24 pb-20 bg-[#FFFFFF] text-[#17122B]">
      <SEOMetadata
        title={
          isEn
            ? 'How We Work: Free Audit to Handover | CHESTAADOTCOM'
            : 'Cara Kerja: Audit Gratis sampai Handover | CHESTAADOTCOM'
        }
        description={
          isEn
            ? 'See our workflow: 30-min free audit, written proposal, prototype, build, to handover. Know what you receive at every phase.'
            : 'Lihat alur kerja kami: audit gratis 30 menit, proposal tertulis, prototipe, pengerjaan, sampai handover. Tahu apa yang kamu terima di setiap tahap.'
        }
        path={location.pathname}
        jsonLd={jsonLd}
      />

      <Container>
        {/* 1. HERO SECTION */}
        <section className="mb-10">
          <Breadcrumb
            items={[
              { label: isEn ? 'Home' : 'Beranda', href: homeHref },
              { label: isEn ? 'How We Work' : 'Cara kerja' },
            ]}
          />

          <Reveal className="mt-6">
            <Badge className="mb-3">{isEn ? 'How We Work' : 'Cara kerja'}</Badge>
            <h1 className="font-display text-[32px] sm:text-[42px] md:text-[50px] font-semibold tracking-tight text-[#17122B] leading-[1.14] max-w-3xl">
              {isEn
                ? 'From the first chat to handover, you know exactly what happens.'
                : 'Dari chat pertama sampai handover, kamu tahu apa yang terjadi.'}
            </h1>
            <p className="mt-4 text-[16px] sm:text-[18px] text-[#5B5675] leading-[1.6] max-w-2xl">
              {isEn
                ? 'Six phases, each with clear deliverables and decision points in your hands.'
                : 'Enam tahap, masing-masing dengan hasil yang jelas dan keputusan yang ada di tanganmu.'}
            </p>

            <div className="pt-6 flex flex-wrap items-center gap-3">
              <Button href={auditHref} variant="primary" size="lg">
                <span>{isEn ? 'Start with a free audit' : 'Mulai dengan audit gratis'}</span>
                <ArrowRight size={16} />
              </Button>
              <Button href={pricingHref} variant="secondary" size="lg">
                <span>{isEn ? 'View pricing' : 'Lihat harga'}</span>
              </Button>
            </div>
          </Reveal>
        </section>
      </Container>

      {/* Trust Strip */}
      <TrustStrip locale={locale} className="my-10" />

      <Container>
        {/* 2. THE JOURNEY (2-Column Desktop | Left Stack, Right Sticky Illustration) */}
        <section className="my-16">
          <SectionHeading
            badge={isEn ? '6-Phase Journey' : 'Tahap Pengerjaan'}
            title={
              isEn
                ? 'Six transparent steps to build your system'
                : 'Enam tahap teratur dari audit sampai handover'
            }
          />

          {/* Mobile Illustration (Stacked Above Cards) */}
          <div className="block lg:hidden mt-6 mb-8">
            <ProcessFlowIllustration activeStep={activeStep} locale={locale} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-8 items-start">
            {/* Left Column: 6 Phases Stacked */}
            <div className="lg:col-span-7 space-y-8">
              {PROCESS_PHASES.map((phase, idx) => {
                const details = phaseDetails[idx];
                const isActive = activeStep === idx + 1;

                return (
                  <div
                    key={phase.number}
                    ref={(el) => {
                      stepRefs.current[idx] = el;
                    }}
                    className={`p-6 sm:p-8 rounded-[24px] transition-all duration-300 border ${
                      isActive
                        ? 'bg-[#FFFFFF] border-[rgba(91,60,196,0.3)] shadow-[0_12px_36px_rgba(23,18,43,0.08)]'
                        : 'bg-[#F8F6FE]/60 border-[rgba(91,60,196,0.12)]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <span className="font-mono text-[13px] font-bold text-[#6A3FD0] bg-[#EFEAFB] px-3 py-1 rounded-full border border-[rgba(91,60,196,0.18)]">
                        {isEn ? `Phase ${phase.number}` : `Tahap ${phase.number}`}
                      </span>
                      {details.money && (
                        <span className="font-mono text-[12px] font-semibold text-[#17122B] bg-[#F8F6FE] px-2.5 py-1 rounded-md border border-[rgba(91,60,196,0.15)] flex items-center gap-1">
                          <CreditCard size={13} className="text-[#6A3FD0]" />
                          <span>{details.money}</span>
                        </span>
                      )}
                    </div>

                    <h3 className="font-display text-[22px] sm:text-[24px] font-semibold text-[#17122B] tracking-tight">
                      {isEn ? phase.titleEn : phase.titleId}
                    </h3>

                    <p className="mt-3 text-[15px] sm:text-[16px] text-[#5B5675] leading-[1.65]">
                      {isEn ? phase.descEn : phase.descId}
                    </p>

                    {/* 3 Compact Rows: Kami / Kamu / Terima */}
                    <div className="mt-6 pt-5 border-t border-[rgba(91,60,196,0.12)] space-y-3 text-[13.5px]">
                      <div className="flex items-start gap-2.5">
                        <span className="font-bold text-[#6A3FD0] shrink-0 w-24">
                          {isEn ? 'Kami:' : 'Kami:'}
                        </span>
                        <span className="text-[#17122B] leading-snug">{details.kami}</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <span className="font-bold text-[#5B5675] shrink-0 w-24">
                          {isEn ? 'Kamu:' : 'Kamu:'}
                        </span>
                        <span className="text-[#5B5675] leading-snug">{details.kamu}</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <span className="font-bold text-[#17122B] shrink-0 w-24">
                          {isEn ? 'Terima:' : 'Terima:'}
                        </span>
                        <span className="text-[#17122B] font-medium leading-snug">
                          {details.terima}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Column: Sticky Illustration (Desktop) */}
            <div className="hidden lg:block lg:col-span-5 sticky top-28">
              <ProcessFlowIllustration activeStep={activeStep} locale={locale} />
            </div>
          </div>
        </section>

        {/* 3. KAPAN UANG BERPINDAH (Payment Timeline) */}
        <section className="my-16">
          <Reveal>
            <div className="p-8 sm:p-10 rounded-[28px] bg-gradient-to-b from-[#F8F6FE] via-[#F8F6FE] to-[#FFFFFF] border border-[rgba(91,60,196,0.18)]">
              <div className="flex items-center gap-2 mb-3">
                <CreditCard size={20} className="text-[#6A3FD0]" />
                <h2 className="font-display text-[24px] sm:text-[28px] font-semibold text-[#17122B] tracking-tight">
                  {isEn ? 'When Payment Happens' : 'Kapan uang berpindah'}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="p-5 rounded-[18px] bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)] relative">
                  <span className="font-mono text-[12px] font-bold text-[#6A3FD0] uppercase tracking-wider block mb-1">
                    {isEn ? 'Trigger 1 — Phase 02' : 'Pemicu 1 — Tahap 02'}
                  </span>
                  <h3 className="font-display text-[18px] font-semibold text-[#17122B]">
                    {isEn ? '50% Deposit (DP)' : 'DP 50%'}
                  </h3>
                  <p className="mt-2 text-[14px] text-[#5B5675] leading-[1.6]">
                    {isEn
                      ? 'Paid after you read and approve the written proposal, before construction begins.'
                      : 'Dibayar setelah kamu membaca dan menyetujui proposal tertulis, sebelum pengerjaan dimulai.'}
                  </p>
                </div>

                <div className="p-5 rounded-[18px] bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)] relative">
                  <span className="font-mono text-[12px] font-bold text-[#6A3FD0] uppercase tracking-wider block mb-1">
                    {isEn ? 'Trigger 2 — Phase 05' : 'Pemicu 2 — Tahap 05'}
                  </span>
                  <h3 className="font-display text-[18px] font-semibold text-[#17122B]">
                    {isEn ? '50% Final Payment (Pelunasan)' : 'Pelunasan 50%'}
                  </h3>
                  <p className="mt-2 text-[14px] text-[#5B5675] leading-[1.6]">
                    {isEn
                      ? 'Paid after final testing and joint verification, strictly before handover.'
                      : 'Dibayar setelah uji akhir dan verifikasi bersama, dilakukan sebelum handover.'}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[rgba(91,60,196,0.12)] text-center">
                <p className="font-display text-[15px] sm:text-[16px] font-semibold text-[#17122B]">
                  {isEn
                    ? 'No costs ever appear outside the written proposal.'
                    : 'Tidak ada biaya yang muncul di luar proposal.'}
                </p>
              </div>
            </div>
          </Reveal>
        </section>

        {/* 4. SIAPA MENGERJAKAN APA (Role Split) */}
        <section className="my-16">
          <SectionHeading
            badge={isEn ? 'Team Responsibility' : 'Pembagian Peran'}
            title={isEn ? 'Who Does What' : 'Siapa mengerjakan apa'}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <Reveal delay={0.05}>
              <Card variant="soft" className="p-7 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#EFEAFB] flex items-center justify-center font-display font-bold text-[#6A3FD0] text-[16px]">
                    CA
                  </div>
                  <div>
                    <h3 className="font-display text-[18px] font-semibold text-[#17122B]">
                      Chesta Azka
                    </h3>
                    <p className="text-[12.5px] text-[#5B5675] font-mono">
                      {isEn ? 'Technology & Systems' : 'Arsitektur, Produk & Teknologi'}
                    </p>
                  </div>
                </div>
                <p className="text-[14.5px] text-[#5B5675] leading-[1.65]">
                  {isEn
                    ? 'Handles architecture, technical design, core engineering, and mobile testing.'
                    : 'Memegang arsitektur, rancangan teknis, pembangunan, dan pengujian.'}
                </p>
              </Card>
            </Reveal>

            <Reveal delay={0.1}>
              <Card variant="soft" className="p-7 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#EFEAFB] flex items-center justify-center font-display font-bold text-[#6A3FD0] text-[16px]">
                    Z
                  </div>
                  <div>
                    <h3 className="font-display text-[18px] font-semibold text-[#17122B]">
                      Zeeshan
                    </h3>
                    <p className="text-[12.5px] text-[#5B5675] font-mono">
                      {isEn ? 'Operations & Client Success' : 'Operasional & Client Success'}
                    </p>
                  </div>
                </div>
                <p className="text-[14.5px] text-[#5B5675] leading-[1.65]">
                  {isEn
                    ? 'Handles communication, project schedules, and ensures you always know your project status.'
                    : 'Memegang komunikasi, jadwal, dan memastikan kamu selalu tahu statusnya.'}
                </p>
              </Card>
            </Reveal>
          </div>

          <div className="mt-6 p-4 rounded-[16px] bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)] text-center">
            <p className="text-[14.5px] text-[#17122B] font-medium">
              {isEn
                ? 'You have one clear point of contact, and we reply directly via WhatsApp.'
                : 'Kamu punya satu kontak yang jelas, dan kami membalas lewat WhatsApp.'}
            </p>
          </div>
        </section>

        {/* 5. REVISI, DIJELASKAN */}
        <section className="my-16">
          <Reveal>
            <div className="p-8 sm:p-10 rounded-[28px] bg-[#FFFFFF] border border-[rgba(91,60,196,0.18)] shadow-[0_8px_30px_rgba(23,18,43,0.04)]">
              <h2 className="font-display text-[24px] sm:text-[28px] font-semibold text-[#17122B] tracking-tight">
                {isEn ? 'Revisions, Explained' : 'Revisi, dijelaskan'}
              </h2>
              <p className="mt-4 text-[15px] sm:text-[16px] text-[#5B5675] leading-[1.7]">
                {isEn
                  ? 'Revisions are gathered into one single list per round so that feedback remains clear and fast. The exact number of rounds for each package is written in your proposal and on the Pricing page. Requests outside the original scope are documented separately as add-ons complete with exact prices, and built only after your explicit approval.'
                  : 'Revisi dikumpulkan dalam satu daftar per putaran supaya jelas dan cepat. Jumlah putaran tiap paket tertulis di proposal dan di halaman Harga. Permintaan di luar ruang lingkup kami tulis sebagai tambahan lengkap dengan harganya, dan baru dikerjakan setelah kamu setuju.'}
              </p>
            </div>
          </Reveal>
        </section>

        {/* 6. YANG KAMI BUTUHKAN DARIMU */}
        <section className="my-16">
          <SectionHeading
            badge={isEn ? 'Client Inputs' : 'Persyaratan'}
            title={isEn ? 'What We Need From You' : 'Yang kami butuhkan darimu'}
          />

          <div className="mt-8 space-y-3">
            {[
              isEn
                ? 'An overview of the daily work that takes up the most time.'
                : 'Gambaran kerjaan yang paling menyita waktu.',
              isEn
                ? 'Applications or spreadsheets currently in use.'
                : 'Aplikasi atau spreadsheet yang sekarang dipakai.',
              isEn
                ? 'Sample conversation logs or business data (with sensitive info masked).'
                : 'Contoh percakapan atau data, dengan informasi sensitif disamarkan.',
              isEn
                ? 'Your desired outcomes and key goals.'
                : 'Hasil yang kamu inginkan.',
              isEn
                ? 'Necessary credentials/access (granted strictly as needed and revoked upon completion).'
                : 'Akses yang diperlukan, diberikan seperlunya dan dicabut setelah proyek selesai.',
            ].map((item, idx) => (
              <Reveal key={idx} delay={0.04 * idx}>
                <div className="p-4 sm:p-5 rounded-[16px] bg-[#F8F6FE]/80 border border-[rgba(91,60,196,0.12)] flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#6A3FD0] text-[#FFFFFF] flex items-center justify-center text-[12px] font-bold shrink-0 mt-0.5">
                    ✓
                  </div>
                  <span className="text-[15px] text-[#17122B] font-medium leading-snug">
                    {item}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* 7. PERKIRAAN WAKTU PER PAKET */}
        <section className="my-16">
          <SectionHeading
            badge={isEn ? 'Timelines & Revisions' : 'Perkiraan Waktu'}
            title={isEn ? 'Estimated Time per Package' : 'Perkiraan waktu per paket'}
          />

          <div className="mt-8 overflow-x-auto rounded-[20px] border border-[rgba(91,60,196,0.18)] shadow-[0_4px_20px_rgba(23,18,43,0.04)]">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-[#F8F6FE] border-b border-[rgba(91,60,196,0.14)] text-[13px] font-mono uppercase tracking-wider text-[#17122B]">
                  <th className="p-4 sm:p-5 font-semibold">
                    {isEn ? 'Package' : 'Paket'}
                  </th>
                  <th className="p-4 sm:p-5 font-semibold">
                    {isEn ? 'Estimated Time' : 'Estimasi Waktu'}
                  </th>
                  <th className="p-4 sm:p-5 font-semibold">
                    {isEn ? 'Revision Limit' : 'Batas Revisi'}
                  </th>
                  <th className="p-4 sm:p-5 font-semibold">
                    {isEn ? 'Support Window' : 'Dukungan Perbaikan'}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(91,60,196,0.1)] text-[14px] text-[#17122B]">
                {PRICING_PACKAGES.map((pkg) => (
                  <tr key={pkg.id} className="hover:bg-[#F8F6FE]/50 transition-colors">
                    <td className="p-4 sm:p-5 font-display font-semibold text-[#6A3FD0]">
                      {isEn ? pkg.nameEn : pkg.nameId}
                    </td>
                    <td className="p-4 sm:p-5 font-mono text-[13.5px]">
                      {isEn ? pkg.timeEn : pkg.timeId}
                    </td>
                    <td className="p-4 sm:p-5 font-mono text-[13.5px]">
                      {pkg.revisions} {isEn ? 'round(s)' : 'putaran'}
                    </td>
                    <td className="p-4 sm:p-5 font-mono text-[13.5px]">
                      {isEn ? pkg.supportEn : pkg.supportId}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-3 text-[13px] text-[#5B5675] font-mono text-center">
            {isEn
              ? 'Exact timelines are stated in the written proposal after your audit.'
              : 'Estimasi pasti kami tulis di proposal setelah audit.'}
          </p>
        </section>

        {/* 8. KALAU RUANG LINGKUP BERUBAH */}
        <section className="my-16">
          <Reveal>
            <div className="p-7 sm:p-9 rounded-[24px] bg-[#F8F6FE] border border-[rgba(91,60,196,0.18)] flex items-start gap-4">
              <AlertCircle size={24} className="text-[#6A3FD0] shrink-0 mt-1" />
              <div>
                <h3 className="font-display text-[20px] font-semibold text-[#17122B]">
                  {isEn ? 'If Scope Changes' : 'Kalau ruang lingkup berubah'}
                </h3>
                <p className="mt-2 text-[15px] text-[#5B5675] leading-[1.65]">
                  {isEn
                    ? 'Scope changes are written down first, along with their exact impact on price and schedule. No additional work is performed or billed without your explicit written approval.'
                    : 'Perubahan lingkup kami tulis dulu, lengkap dengan dampaknya ke harga dan jadwal. Tidak ada pekerjaan tambahan yang dikerjakan atau ditagih tanpa persetujuanmu.'}
                </p>
              </div>
            </div>
          </Reveal>
        </section>

        {/* 9. MINI FAQ & FINAL CTA */}
        <section className="my-16">
          <SectionHeading
            badge={isEn ? 'FAQ' : 'Pertanyaan Sering Diajukan'}
            title={isEn ? 'Frequently Asked Questions' : 'Pertanyaan seputar cara kerja'}
          />

          <div className="mt-8 max-w-3xl mx-auto">
            <FAQAccordion items={miniFaqs} />

            <div className="mt-4 text-center">
              <Link
                to={faqHref}
                className="text-[14px] font-semibold text-[#6A3FD0] hover:underline"
              >
                {isEn ? 'View all FAQs →' : 'Lihat semua FAQ →'}
              </Link>
            </div>
          </div>

          {/* Final CTA Block */}
          <div className="mt-16 p-8 sm:p-12 rounded-[28px] bg-gradient-to-b from-[#F8F6FE] via-[#F8F6FE] to-[#FFFFFF] border border-[rgba(91,60,196,0.18)] text-center space-y-4">
            <h2 className="font-display text-[28px] sm:text-[36px] font-semibold text-[#17122B] tracking-tight max-w-2xl mx-auto">
              {isEn
                ? 'Ready to discuss your project?'
                : 'Siap mendiskusikan sistem atau websitemu?'}
            </h2>

            <p className="text-[16px] sm:text-[18px] text-[#5B5675] leading-[1.6] max-w-xl mx-auto">
              {isEn
                ? 'Start with a free 30-minute audit. We listen and give candid recommendations.'
                : 'Mulai dari audit gratis 30 menit. Kami mendengarkan dan memberi rekomendasi jujur.'}
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button href={auditHref} variant="primary" size="lg">
                <span>{isEn ? 'Free 30-Minute Audit' : 'Audit Gratis 30 Menit'}</span>
                <ArrowRight size={16} />
              </Button>

              <Button
                href={whatsappUrl}
                onClick={() => trackWaClick('default', 'how_we_work_cta', locale)}
                variant="secondary"
                size="lg"
              >
                <MessageCircle size={18} />
                <span>{waCtaLabel}</span>
              </Button>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}
