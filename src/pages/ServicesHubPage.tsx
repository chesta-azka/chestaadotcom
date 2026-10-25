import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Code2,
  Workflow,
  Zap,
  Check,
  Sparkles,
} from 'lucide-react';
import SEOMetadata from '../components/atoms/SEOMetadata';
import {
  SERVICES_DATA,
  PROBLEM_SELECTOR_OPTIONS,
  ServiceSlug,
  ServiceItem,
} from '../data/services';
import {
  Container,
  Button,
  Card,
  Badge,
  Tag,
  SectionHeading,
  Reveal,
  CTABlock,
  Breadcrumb,
  buildWaUrl,
} from '../components/ui/DesignSystem';

/**
 * Small live SVG/CSS micro-visual for each Bento tile on /layanan
 * Every visual is explicitly labeled "Ilustrasi" per specification.
 */
function BentoMicroVisual({ slug }: { slug: ServiceSlug }) {
  if (slug === 'ai-agent') {
    return (
      <div className="mt-5 p-4 rounded-[18px] bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)] relative overflow-hidden">
        <div className="flex items-center justify-between gap-2 pb-2.5 mb-3 border-b border-[rgba(91,60,196,0.14)] font-mono text-[11px] uppercase tracking-[0.08em] text-[#5B5675]">
          <span className="flex items-center gap-1.5 text-[#6A3FD0] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#6A3FD0] animate-pulse" />
            <span>Alur Eksekusi Agent</span>
          </span>
          <span>Ilustrasi</span>
        </div>
        <div className="grid grid-cols-3 gap-2 items-center text-center font-mono text-[11px]">
          <div className="p-2.5 rounded-[12px] bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)] text-[#17122B]">
            <span className="block text-[10px] text-[#5B5675]">INPUT</span>
            <span className="font-semibold">Chat WA</span>
          </div>
          <div className="p-2.5 rounded-[12px] bg-[#EFEAFB] border border-[#6A3FD0]/30 text-[#6A3FD0] font-semibold">
            <span className="block text-[10px] text-[#5230B0]">TOOL CALL</span>
            <span>Kalender + DB</span>
          </div>
          <div className="p-2.5 rounded-[12px] bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)] text-[#17122B]">
            <span className="block text-[10px] text-[#5B5675]">OUTPUT</span>
            <span className="font-semibold">Jadwal Terkunci</span>
          </div>
        </div>
      </div>
    );
  }

  if (slug === 'pembuatan-website') {
    return (
      <div className="mt-5 p-4 rounded-[18px] bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)]">
        <div className="flex items-center justify-between gap-2 pb-2.5 mb-3 border-b border-[rgba(91,60,196,0.14)] font-mono text-[11px] uppercase tracking-[0.08em] text-[#5B5675]">
          <span className="text-[#6A3FD0] font-semibold">Performa Halaman</span>
          <span>Ilustrasi</span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1.5 flex-1">
            <div className="h-2.5 w-3/4 rounded-full bg-[#6A3FD0]/85" />
            <div className="h-2 w-1/2 rounded-full bg-[#B9A2F2]" />
            <div className="pt-1 flex gap-1.5">
              <span className="px-2 py-0.5 rounded-full bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)] font-mono text-[10px] text-[#17122B]">
                LCP 0.9s
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#EFEAFB] font-mono text-[10px] text-[#6A3FD0] font-semibold">
                Mobile-First
              </span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-full bg-[#FFFFFF] border-2 border-[#6A3FD0] flex flex-col items-center justify-center shrink-0">
            <span className="font-mono text-[12px] font-bold text-[#17122B] leading-none">99</span>
            <span className="font-mono text-[9px] text-[#5B5675]">SPEED</span>
          </div>
        </div>
      </div>
    );
  }

  if (slug === 'software-custom') {
    return (
      <div className="mt-5 p-4 rounded-[18px] bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)]">
        <div className="flex items-center justify-between gap-2 pb-2.5 mb-3 border-b border-[rgba(91,60,196,0.14)] font-mono text-[11px] uppercase tracking-[0.08em] text-[#5B5675]">
          <span className="text-[#6A3FD0] font-semibold">Modul Operasional</span>
          <span>Ilustrasi</span>
        </div>
        <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
          <div className="p-2.5 rounded-[12px] bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)] flex items-center justify-between">
            <span className="text-[#17122B] font-medium">Hak Akses Role</span>
            <span className="w-2 h-2 rounded-full bg-[#6A3FD0]" />
          </div>
          <div className="p-2.5 rounded-[12px] bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)] flex items-center justify-between">
            <span className="text-[#17122B] font-medium">Audit Log</span>
            <span className="w-2 h-2 rounded-full bg-[#7C54E0]" />
          </div>
          <div className="col-span-2 p-2.5 rounded-[12px] bg-[#EFEAFB]/70 border border-[rgba(91,60,196,0.14)] flex items-center justify-between text-[#17122B]">
            <span>Rekap Komisi &amp; Laporan Otomatis</span>
            <span className="text-[#6A3FD0] font-semibold">Sinkron</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-5 p-4 rounded-[18px] bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)]">
      <div className="flex items-center justify-between gap-2 pb-2.5 mb-3 border-b border-[rgba(91,60,196,0.14)] font-mono text-[11px] uppercase tracking-[0.08em] text-[#5B5675]">
        <span className="text-[#6A3FD0] font-semibold">Pipa Sinkronisasi</span>
        <span>Ilustrasi</span>
      </div>
      <div className="flex items-center justify-between gap-1.5 font-mono text-[11px] text-[#17122B]">
        <span className="px-2.5 py-1.5 rounded-[10px] bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)]">
          Sheets
        </span>
        <span className="text-[#6A3FD0] font-bold">→</span>
        <span className="px-2.5 py-1.5 rounded-[10px] bg-[#EFEAFB] border border-[#6A3FD0]/30 text-[#6A3FD0] font-semibold">
          Webhook n8n
        </span>
        <span className="text-[#6A3FD0] font-bold">→</span>
        <span className="px-2.5 py-1.5 rounded-[10px] bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)]">
          Invoice &amp; WA
        </span>
      </div>
    </div>
  );
}

function getServiceIcon(slug: ServiceSlug) {
  switch (slug) {
    case 'ai-agent':
      return <Bot size={20} />;
    case 'pembuatan-website':
      return <Zap size={20} />;
    case 'software-custom':
      return <Code2 size={20} />;
    case 'otomasi-workflow':
      return <Workflow size={20} />;
  }
}

export default function ServicesHubPage() {
  const [selectedProblemId, setSelectedProblemId] = useState<string | null>(null);

  const activeProblem = PROBLEM_SELECTOR_OPTIONS.find((p) => p.id === selectedProblemId) || null;
  const highlightedSlug: ServiceSlug | null = activeProblem ? activeProblem.recommendedSlug : null;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--spot-x', `${x}px`);
    e.currentTarget.style.setProperty('--spot-y', `${y}px`);
  };

  // Order for asymmetrical 12-col bento grid:
  // Row 1: ai-agent (7 cols) + pembuatan-website (5 cols)
  // Row 2: otomasi-workflow (5 cols) + software-custom (7 cols)
  const orderedSlugs: { slug: ServiceSlug; spanClass: string }[] = [
    { slug: 'ai-agent', spanClass: 'md:col-span-7' },
    { slug: 'pembuatan-website', spanClass: 'md:col-span-5' },
    { slug: 'otomasi-workflow', spanClass: 'md:col-span-5' },
    { slug: 'software-custom', spanClass: 'md:col-span-7' },
  ];

  const orderedServices = orderedSlugs
    .map((item) => {
      const service = SERVICES_DATA.find((s) => s.slug === item.slug);
      return service ? { service, spanClass: item.spanClass } : null;
    })
    .filter((x): x is { service: ServiceItem; spanClass: string } => x !== null);

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': 'https://chestaa.com/layanan#collection',
        url: 'https://chestaa.com/layanan',
        name: 'Layanan Software Custom, Landing Page & AI Agent | CHESTAADOTCOM',
        description:
          'Daftar layanan rekayasa software custom, pembuatan landing page mulai Rp1.200.000, AI agent WhatsApp & CRM, serta otomasi workflow untuk bisnis di BSD City, Tangerang Selatan, dan Jabodetabek.',
        inLanguage: 'id-ID',
        isPartOf: { '@id': 'https://chestaa.com/#website' },
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: SERVICES_DATA.map((s, idx) => ({
            '@type': 'ListItem',
            position: idx + 1,
            url: `https://chestaa.com/layanan/${s.slug}`,
            name: s.title,
            description: s.summary,
          })),
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://chestaa.com/layanan#breadcrumb',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Beranda',
            item: 'https://chestaa.com',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Layanan',
            item: 'https://chestaa.com/layanan',
          },
        ],
      },
    ],
  };

  return (
    <div className="bg-[#FFFFFF] text-[#17122B] min-h-screen">
      <SEOMetadata
        title="Layanan Software Custom, Web & AI Agent BSD | CHESTAADOTCOM"
        description="Pilih layanan untuk bisnismu di BSD & Tangsel: Landing Page (mulai Rp1.200.000), AI Agent WhatsApp/CRM, Software Custom, dan Otomasi Workflow."
        path="/layanan"
        jsonLd={collectionSchema}
      />

      {/* =====================================================
          1. COMPACT HEADER
          ===================================================== */}
      <section className="pt-28 pb-12 md:pt-36 md:pb-16 bg-gradient-to-b from-[#FFFFFF] via-[#F8F6FE] to-[#FFFFFF] border-b border-[rgba(91,60,196,0.14)]">
        <Container>
          <Breadcrumb items={[{ label: 'Layanan' }]} />

          <div className="max-w-3xl space-y-4">
            <Badge variant="tint">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6A3FD0]" />
              <span>LAYANAN &amp; CAKUPAN SISTEM · BSD &amp; JABODETABEK</span>
            </Badge>

            <h1>Apa yang bisa kami bangun untuk bisnismu</h1>

            <p className="text-[15px] md:text-[16px] text-[#5B5675] leading-[1.65]">
              Mulai dari landing page cepat untuk menangkap prospek iklan, hingga AI agent dan dashboard internal yang mengambil alih kerja berulang timmu.
            </p>
          </div>
        </Container>
      </section>

      {/* =====================================================
          2. "MANA YANG COCOK BUAT KAMU?" MINI SELECTOR + BENTO GRID
          ===================================================== */}
      <section className="py-16 md:py-24 bg-[#FFFFFF] border-b border-[rgba(91,60,196,0.14)]">
        <Container>
          {/* Mini Selector Bar */}
          <div className="mb-12 p-6 md:p-8 rounded-[24px] bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
              <div>
                <Tag>PANDUAN CEPAT</Tag>
                <h2 className="mt-1 text-[20px] md:text-[24px]">
                  Mana yang cocok buat kamu?
                </h2>
                <p className="mt-1 text-[14px] md:text-[15px] text-[#5B5675]">
                  Pilih kendala yang paling terasa di operasional bisnismu saat ini:
                </p>
              </div>
              {selectedProblemId && (
                <button
                  type="button"
                  onClick={() => setSelectedProblemId(null)}
                  className="self-start md:self-auto min-h-[40px] px-4 py-2 rounded-full bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)] font-mono text-[11px] uppercase tracking-[0.08em] text-[#5B5675] hover:text-[#17122B] cursor-pointer"
                >
                  Reset pilihan
                </button>
              )}
            </div>

            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
              role="group"
              aria-label="Filter kendala operasional bisnis"
            >
              {PROBLEM_SELECTOR_OPTIONS.map((opt) => {
                const isSelected = selectedProblemId === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() =>
                      setSelectedProblemId((prev) => (prev === opt.id ? null : opt.id))
                    }
                    aria-pressed={isSelected}
                    className={`min-h-[48px] p-4 rounded-[18px] text-left transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                      isSelected
                        ? 'bg-[#6A3FD0] text-[#FFFFFF] border border-[#6A3FD0] shadow-[0_10px_24px_-8px_rgba(106,63,208,0.35)]'
                        : 'bg-[#FFFFFF] text-[#17122B] border border-[rgba(91,60,196,0.14)] hover:border-[#6A3FD0]/50 hover:bg-[#EFEAFB]/40'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 w-full">
                      <span
                        className={`font-semibold text-[14px] md:text-[15px] leading-snug ${
                          isSelected ? 'text-[#FFFFFF]' : 'text-[#17122B]'
                        }`}
                      >
                        “{opt.questionChip}”
                      </span>
                      <Sparkles
                        size={15}
                        className={`shrink-0 mt-0.5 ${
                          isSelected ? 'text-[#EFEAFB]' : 'text-[#6A3FD0]'
                        }`}
                      />
                    </div>
                    <span
                      className={`text-[13px] leading-[1.5] ${
                        isSelected ? 'text-[#EFEAFB]' : 'text-[#5B5675]'
                      }`}
                    >
                      {opt.situationDetail}
                    </span>
                  </button>
                );
              })}
            </div>

            {activeProblem && (
              <div className="mt-5 p-4 md:p-5 rounded-[18px] bg-[#EFEAFB] border border-[#6A3FD0]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#6A3FD0] font-semibold">
                    Rekomendasi Utama untuk Bisnismu
                  </p>
                  <p className="text-[14px] md:text-[15px] text-[#17122B]">
                    {activeProblem.recommendationNote}
                  </p>
                </div>
                <Button
                  to={`/layanan/${activeProblem.recommendedSlug}`}
                  variant="primary"
                  className="shrink-0"
                >
                  <span>Buka layanan ini</span>
                  <ArrowRight size={15} />
                </Button>
              </div>
            )}
          </div>

          {/* Bento Grid of 4 Services */}
          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
              {orderedServices.map(({ service, spanClass }) => {
                const isHighlighted = highlightedSlug === service.slug;
                const isDimmed = highlightedSlug !== null && !isHighlighted;

                return (
                  <div
                    key={service.slug}
                    onMouseMove={handleMouseMove}
                    className={`${spanClass} group relative rounded-[24px] p-6 md:p-8 transition-all duration-300 flex flex-col justify-between overflow-hidden hover:-translate-y-0.5 ${
                      isHighlighted
                        ? 'bg-[#EFEAFB]/75 border-2 border-[#6A3FD0] shadow-[0_16px_40px_-12px_rgba(106,63,208,0.22)]'
                        : 'bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)] shadow-[0_8px_28px_-8px_rgba(106,63,208,0.07)] hover:border-[#6A3FD0]/40'
                    } ${isDimmed ? 'opacity-60' : 'opacity-100'}`}
                  >
                    {/* Desktop Cursor Spotlight Overlay */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none hidden md:block absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background:
                          'radial-gradient(380px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(124, 84, 224, 0.08), transparent 70%)',
                      }}
                    />

                    <div className="relative z-10">
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                        <div className="w-10 h-10 rounded-[14px] bg-[#EFEAFB] text-[#6A3FD0] flex items-center justify-center">
                          {getServiceIcon(service.slug)}
                        </div>
                        <div className="flex items-center gap-2">
                          {isHighlighted && (
                            <Badge variant="dark">Cocok untuk kendalamu</Badge>
                          )}
                          <Badge variant="tint">{service.pricingNote.label}</Badge>
                        </div>
                      </div>

                      <Tag>{service.tagline}</Tag>
                      <h3 className="mt-1.5 text-[20px] md:text-[22px] font-semibold text-[#17122B]">
                        <Link
                          to={`/layanan/${service.slug}`}
                          className="hover:text-[#6A3FD0] transition-colors"
                        >
                          {service.title}
                        </Link>
                      </h3>

                      <p className="mt-2 text-[15px] text-[#5B5675] leading-[1.65]">
                        {service.shortPromise}
                      </p>

                      {/* Live SVG/CSS Micro-Visual */}
                      <BentoMicroVisual slug={service.slug} />
                    </div>

                    <div className="relative z-10 mt-6 pt-4 border-t border-[rgba(91,60,196,0.14)] flex flex-wrap items-center justify-between gap-4">
                      <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#5B5675]">
                        Estimasi: {service.timeline}
                      </span>

                      <Link
                        to={`/layanan/${service.slug}`}
                        className="inline-flex items-center gap-1.5 min-h-[44px] px-3 -mr-3 rounded-full text-[14px] font-semibold text-[#6A3FD0] hover:bg-[#F8F6FE] transition-colors"
                      >
                        <span>Lihat detail</span>
                        <ArrowRight
                          size={15}
                          className="transition-transform group-hover:translate-x-0.5"
                        />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* =====================================================
          3. COMPARISON TABLE (HORIZONTAL SCROLL ON MOBILE)
          ===================================================== */}
      <section className="py-16 md:py-24 bg-[#F8F6FE] border-b border-[rgba(91,60,196,0.14)] cv-auto">
        <Container>
          <SectionHeading
            eyebrow="PERBANDINGAN LAYANAN"
            title="Bandingkan cakupan, waktu pengerjaan, dan biaya"
            description="Tabel ringkas agar kamu bisa memilih titik awal yang paling masuk akal untuk tim dan anggaranmu."
          />

          <div className="rounded-[24px] bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)] shadow-[0_8px_28px_-8px_rgba(106,63,208,0.06)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left border-collapse">
                <thead>
                  <tr className="border-b border-[rgba(91,60,196,0.14)] bg-[#EFEAFB]/55">
                    <th className="p-4 md:p-5 font-mono text-[11px] uppercase tracking-[0.08em] text-[#5B5675] w-[18%]">
                      Parameter
                    </th>
                    <th className="p-4 md:p-5 font-semibold text-[15px] text-[#17122B] w-[20.5%]">
                      <Link
                        to="/layanan/web-landing-page"
                        className="hover:text-[#6A3FD0] inline-flex items-center gap-1"
                      >
                        <span>Landing Page</span>
                        <ArrowUpRight size={14} className="text-[#6A3FD0]" />
                      </Link>
                    </th>
                    <th className="p-4 md:p-5 font-semibold text-[15px] text-[#17122B] w-[20.5%]">
                      <Link
                        to="/layanan/software-custom"
                        className="hover:text-[#6A3FD0] inline-flex items-center gap-1"
                      >
                        <span>Web App Custom</span>
                        <ArrowUpRight size={14} className="text-[#6A3FD0]" />
                      </Link>
                    </th>
                    <th className="p-4 md:p-5 font-semibold text-[15px] text-[#6A3FD0] bg-[#EFEAFB]/40 w-[20.5%]">
                      <Link
                        to="/layanan/ai-agent"
                        className="hover:underline inline-flex items-center gap-1"
                      >
                        <span>AI Agent WA &amp; CRM</span>
                        <ArrowUpRight size={14} />
                      </Link>
                    </th>
                    <th className="p-4 md:p-5 font-semibold text-[15px] text-[#17122B] w-[20.5%]">
                      <Link
                        to="/layanan/otomasi-workflow"
                        className="hover:text-[#6A3FD0] inline-flex items-center gap-1"
                      >
                        <span>Otomasi Workflow</span>
                        <ArrowUpRight size={14} className="text-[#6A3FD0]" />
                      </Link>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[rgba(91,60,196,0.14)] text-[14px] leading-[1.6]">
                  <tr>
                    <td className="p-4 md:p-5 font-mono text-[11px] uppercase tracking-[0.08em] text-[#5B5675] font-semibold">
                      Waktu Pengerjaan
                    </td>
                    <td className="p-4 md:p-5 text-[#17122B] font-medium">3–7 hari kerja</td>
                    <td className="p-4 md:p-5 text-[#17122B] font-medium">2–4 minggu</td>
                    <td className="p-4 md:p-5 text-[#17122B] font-medium bg-[#F8F6FE]">
                      2–4 minggu
                    </td>
                    <td className="p-4 md:p-5 text-[#17122B] font-medium">1–3 minggu</td>
                  </tr>
                  <tr>
                    <td className="p-4 md:p-5 font-mono text-[11px] uppercase tracking-[0.08em] text-[#5B5675] font-semibold">
                      Cocok Untuk
                    </td>
                    <td className="p-4 md:p-5 text-[#5B5675]">
                      Bisnis yang butuh halaman penawaran cepat untuk iklan Google/Meta Ads atau profil layanan yang meyakinkan.
                    </td>
                    <td className="p-4 md:p-5 text-[#5B5675]">
                      Tim dengan SOP khusus yang mulai kewalahan memakai spreadsheet terpisah dan butuh hak akses per jabatan.
                    </td>
                    <td className="p-4 md:p-5 text-[#17122B] bg-[#F8F6FE]">
                      Bisnis dengan puluhan chat harian yang butuh respon 24/7, cek jadwal otomatis, dan kualifikasi prospek.
                    </td>
                    <td className="p-4 md:p-5 text-[#5B5675]">
                      Tim yang sudah punya beberapa aplikasi namun stafnya masih menyalin data manual dari satu tempat ke tempat lain.
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 md:p-5 font-mono text-[11px] uppercase tracking-[0.08em] text-[#5B5675] font-semibold">
                      Mulai Dari
                    </td>
                    <td className="p-4 md:p-5">
                      <span className="inline-block px-3 py-1 rounded-full bg-[#EFEAFB] text-[#6A3FD0] font-semibold text-[13px]">
                        Mulai Rp1.200.000
                      </span>
                    </td>
                    <td className="p-4 md:p-5 text-[#17122B] font-medium">
                      Dihitung setelah audit gratis
                    </td>
                    <td className="p-4 md:p-5 text-[#17122B] font-medium bg-[#F8F6FE]">
                      Dihitung setelah audit gratis
                    </td>
                    <td className="p-4 md:p-5 text-[#17122B] font-medium">
                      Dihitung setelah audit gratis
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 md:p-5 font-mono text-[11px] uppercase tracking-[0.08em] text-[#5B5675] font-semibold">
                      Output Utama
                    </td>
                    <td className="p-4 md:p-5 text-[#5B5675]">
                      Web mobile-first, CTA WhatsApp terukur, SEO lokal &amp; Schema JSON-LD.
                    </td>
                    <td className="p-4 md:p-5 text-[#5B5675]">
                      Aplikasi web custom, database PostgreSQL, multi-role login, laporan PDF/Excel.
                    </td>
                    <td className="p-4 md:p-5 text-[#17122B] bg-[#F8F6FE]">
                      Agent WA Resmi, koneksi tool kalender/CRM, human handover, audit log.
                    </td>
                    <td className="p-4 md:p-5 text-[#5B5675]">
                      Workflow n8n/Webhook, sinkronisasi dua arah, pengingat otomatis, error alert.
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 md:p-5 font-mono text-[11px] uppercase tracking-[0.08em] text-[#5B5675] font-semibold">
                      Detail Layanan
                    </td>
                    <td className="p-4 md:p-5">
                      <Link
                        to="/layanan/web-landing-page"
                        className="inline-flex items-center gap-1 font-semibold text-[#6A3FD0] hover:underline min-h-[44px]"
                      >
                        <span>Buka spesifikasi</span>
                        <ArrowRight size={14} />
                      </Link>
                    </td>
                    <td className="p-4 md:p-5">
                      <Link
                        to="/layanan/software-custom"
                        className="inline-flex items-center gap-1 font-semibold text-[#6A3FD0] hover:underline min-h-[44px]"
                      >
                        <span>Buka spesifikasi</span>
                        <ArrowRight size={14} />
                      </Link>
                    </td>
                    <td className="p-4 md:p-5 bg-[#F8F6FE]">
                      <Link
                        to="/layanan/ai-agent"
                        className="inline-flex items-center gap-1 font-semibold text-[#6A3FD0] hover:underline min-h-[44px]"
                      >
                        <span>Buka spesifikasi</span>
                        <ArrowRight size={14} />
                      </Link>
                    </td>
                    <td className="p-4 md:p-5">
                      <Link
                        to="/layanan/otomasi-workflow"
                        className="inline-flex items-center gap-1 font-semibold text-[#6A3FD0] hover:underline min-h-[44px]"
                      >
                        <span>Buka spesifikasi</span>
                        <ArrowRight size={14} />
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Container>
      </section>

      {/* =====================================================
          4. PROCESS STRIP (4 STEPS)
          ===================================================== */}
      <section className="py-16 md:py-24 bg-[#FFFFFF] border-b border-[rgba(91,60,196,0.14)] cv-auto">
        <Container>
          <SectionHeading
            eyebrow="TAHAPAN PENGERJAAN"
            title="Empat langkah dari diskusi awal sampai sistem berjalan"
            description="Tanpa istilah teknis yang membingungkan. Kamu tahu persis apa yang dikerjakan di setiap minggu."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {[
              {
                num: '01',
                duration: '30 Menit',
                title: 'Audit alur gratis',
                desc: 'Kita bedah titik macet di bisnismu lewat WhatsApp atau Google Meet, lalu tentukan solusi yang paling hemat waktu.',
              },
              {
                num: '02',
                duration: '2–5 Hari',
                title: 'Cetak biru & harga tetap',
                desc: 'Kamu menerima rincian fitur, desain alur, jadwal rilis, dan penawaran harga yang terkunci di awal.',
              },
              {
                num: '03',
                duration: '3 Hari – 3 Minggu',
                title: 'Bangun & uji skenario',
                desc: 'Kami merakit sistem dan mengujinya menggunakan contoh percakapan serta data operasional bisnismu.',
              },
              {
                num: '04',
                duration: 'Garansi 30 Hari',
                title: 'Rilis & serah terima',
                desc: 'Sistem aktif melayani pelanggan, lengkap dengan sesi panduan untuk stafmu dan garansi pemeliharaan.',
              },
            ].map((step) => (
              <Card
                key={step.num}
                variant="soft"
                className="h-full flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-[rgba(91,60,196,0.14)] font-mono text-[11px] uppercase tracking-[0.08em]">
                    <span className="text-[#6A3FD0] font-semibold">Langkah {step.num}</span>
                    <span className="text-[#5B5675]">{step.duration}</span>
                  </div>
                  <h3>{step.title}</h3>
                  <p className="mt-2 text-[14px] md:text-[15px] text-[#5B5675] leading-[1.65]">
                    {step.desc}
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-[rgba(91,60,196,0.14)] flex items-center gap-1.5 font-mono text-[11px] text-[#6A3FD0]">
                  <Check size={13} />
                  <span>Milestone terukur</span>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* =====================================================
          5. FINAL CTA
          ===================================================== */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-[#F8F6FE] to-[#EFEAFB] cv-auto">
        <Container className="max-w-[860px]">
          <CTABlock
            title="Belum yakin layanan mana yang paling pas?"
            description="Ceritakan alur bisnismu hari ini selama 30 menit bersama Chesta & Zeeshan. Gratis, tanpa komitmen, dan langsung dapat gambaran solusinya."
            buttonLabel="Konsultasi gratis via WhatsApp"
            whatsappMessage="Halo Chesta & Zeeshan, saya baru melihat halaman /layanan dan ingin diskusi layanan mana yang paling cocok untuk bisnis saya."
          />
        </Container>
      </section>
    </div>
  );
}
