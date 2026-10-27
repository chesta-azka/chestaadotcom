import React, { useState, useMemo } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  Check,
  X,
  MessageCircle,
  Clock,
  RotateCcw,
  ShieldCheck,
  ArrowRight,
  ArrowUpRight,
  HelpCircle,
  Sparkles,
  Calculator,
  AlertCircle,
  FileText,
  CreditCard,
  CheckCircle2,
} from 'lucide-react';
import SEOMetadata from '../components/atoms/SEOMetadata';
import TrustStrip from '../components/atoms/TrustStrip';
import {
  PRICING_PACKAGES,
  PRICING_CARE_PACKAGES,
  PRICING_ADDONS,
  formatCurrency,
  getPricingPackage,
  PricingPackage,
} from '../data/pricing';
import {
  Container,
  Button,
  Card,
  Badge,
  SectionHeading,
  Reveal,
  FAQAccordion,
  Breadcrumb,
} from '../components/ui/DesignSystem';
import { parseLocalizedPath, toLocalizedHref } from '../lib/i18n';
import { buildWhatsAppLink, getWhatsAppCtaLabel } from '../lib/whatsapp';
import { trackWaClick } from '../lib/analytics';

/**
 * Interactive Package Finder Component (<2KB gzip, progressive)
 */
function PackageFinder({ locale }: { locale: 'id' | 'en' }) {
  const isEn = locale === 'en';
  const [q1, setQ1] = useState<string>('fast');
  const [q2, setQ2] = useState<string>('chat');

  // Determine recommended package based on radio selections
  const recommendedPackageId = useMemo(() => {
    if (q1 === 'fast') return 'starter';
    if (q1 === 'ad') return 'growth';
    if (q1 === 'custom-web') return 'custom-web';
    if (q1 === 'software') return 'software';
    if (q1 === 'automation') {
      if (q2 === 'chat') return 'ai-agent';
      return 'otomasi';
    }
    return 'starter';
  }, [q1, q2]);

  const recommendedPkg = useMemo(
    () => getPricingPackage(recommendedPackageId as PricingPackage['id']),
    [recommendedPackageId]
  );

  const formattedPrice = useMemo(
    () => formatCurrency(recommendedPkg.from, locale),
    [recommendedPkg, locale]
  );

  const reasonText = useMemo(() => {
    if (recommendedPackageId === 'starter') {
      return isEn
        ? 'Best for new businesses needing a fast, high-converting mobile landing page.'
        : 'Cocok untuk bisnis baru yang butuh 1 landing page cepat dan konversi tinggi di HP.';
    }
    if (recommendedPackageId === 'growth') {
      return isEn
        ? 'Best for businesses running ad campaigns with conversion tracking & copywriting.'
        : 'Cocok untuk bisnis yang rutin beriklan dengan tracking konversi & copywriting.';
    }
    if (recommendedPackageId === 'custom-web') {
      return isEn
        ? 'Best for multi-page websites or custom web features with admin management.'
        : 'Cocok untuk website multi-halaman atau fitur khusus dengan panel admin.';
    }
    if (recommendedPackageId === 'ai-agent') {
      return isEn
        ? 'Best for automating repetitive WhatsApp chats, bookings, and customer follow-ups.'
        : 'Cocok untuk membalas chat WhatsApp, booking, dan follow-up pelanggan secara otomatis.';
    }
    if (recommendedPackageId === 'otomasi') {
      return isEn
        ? 'Best for connecting apps, syncing spreadsheets, and automating repetitive tasks.'
        : 'Cocok untuk menyambungkan aplikasi, olah spreadsheet, dan otomasi alur kerja.';
    }
    if (recommendedPackageId === 'software') {
      return isEn
        ? 'Best for custom internal systems, operational dashboards, or web applications.'
        : 'Cocok untuk sistem internal, dashboard operasional, atau aplikasi web custom.';
    }
    return '';
  }, [recommendedPackageId, isEn]);

  const finderWaUrl = useMemo(() => {
    const pkgName = isEn ? recommendedPkg.nameEn : recommendedPkg.nameId;
    const msg = isEn
      ? `Hello CHESTAADOTCOM, I used the Package Finder on your site and got recommended the "${pkgName}" package (${formattedPrice}). I would like a free 30-minute audit.`
      : `Halo CHESTAADOTCOM, saya mencoba Pencari Paket di website dan mendapat rekomendasi paket "${pkgName}" (${formattedPrice}). Saya ingin konsultasi audit gratis 30 menit.`;
    return `https://wa.me/6282125447232?text=${encodeURIComponent(msg)}`;
  }, [recommendedPkg, formattedPrice, isEn]);

  return (
    <div id="package-finder" className="p-6 sm:p-8 rounded-[28px] bg-[#F8F6FE] border border-[rgba(91,60,196,0.18)]">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles size={18} className="text-[#6A3FD0]" />
        <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#6A3FD0] font-semibold">
          {isEn ? 'PACKAGE FINDER' : 'PENCARI PAKET'}
        </span>
      </div>

      <h3 className="font-display text-[22px] sm:text-[26px] font-semibold text-[#17122B]">
        {isEn ? 'Find the package that fits your need' : 'Cari paket yang paling cocok'}
      </h3>
      <p className="mt-1 text-[14.5px] text-[#5B5675] mb-6">
        {isEn
          ? 'Answer 1-2 quick questions to see our initial recommendation.'
          : 'Jawab 1-2 pertanyaan singkat untuk melihat rekomendasi awal.'}
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Questions Column */}
        <div className="lg:col-span-7 space-y-6">
          {/* Question 1 */}
          <div className="space-y-2.5">
            <label className="block text-[14px] font-semibold text-[#17122B]">
              {isEn ? '1. What do you need most right now?' : '1. Apa yang paling kamu butuhkan saat ini?'}
            </label>
            <div className="space-y-2">
              {[
                { id: 'fast', labelId: 'Halaman cepat untuk bisnis baru (Starter)', labelEn: 'Fast landing page for a new business (Starter)' },
                { id: 'ad', labelId: 'Halaman untuk kampanye iklan atau promo (Growth)', labelEn: 'Landing page for ad campaigns or promos (Growth)' },
                { id: 'custom-web', labelId: 'Website dengan banyak halaman atau fitur khusus (Custom Web)', labelEn: 'Multi-page website or custom features (Custom Web)' },
                { id: 'automation', labelId: 'Mengurangi kerjaan berulang di tim', labelEn: 'Reduce repetitive team workload' },
                { id: 'software', labelId: 'Sistem internal, dashboard, atau aplikasi web custom', labelEn: 'Internal system, dashboard, or custom web app' },
              ].map((opt) => (
                <label
                  key={opt.id}
                  className={`flex items-center gap-3 p-3 rounded-[14px] border cursor-pointer transition-colors ${
                    q1 === opt.id
                      ? 'bg-[#FFFFFF] border-[#6A3FD0] text-[#17122B] shadow-sm'
                      : 'bg-[#FFFFFF]/60 border-[rgba(91,60,196,0.12)] text-[#5B5675] hover:bg-[#FFFFFF]'
                  }`}
                >
                  <input
                    type="radio"
                    name="finder-q1"
                    value={opt.id}
                    checked={q1 === opt.id}
                    onChange={() => setQ1(opt.id)}
                    className="accent-[#6A3FD0] w-4 h-4"
                  />
                  <span className="text-[13.5px] font-medium leading-snug">
                    {isEn ? opt.labelEn : opt.labelId}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Question 2 (Conditional if Q1 is automation) */}
          {q1 === 'automation' && (
            <div className="space-y-2.5 pt-2 animate-[vt-fade-in_200ms_ease-out_both]">
              <label className="block text-[14px] font-semibold text-[#17122B]">
                {isEn ? '2. What type of repetitive work?' : '2. Kerja berulangnya berupa apa?'}
              </label>
              <div className="space-y-2">
                {[
                  { id: 'chat', labelId: 'Membalas chat WhatsApp, booking, dan follow-up (AI Agent)', labelEn: 'Replying to WhatsApp chats, bookings, follow-ups (AI Agent)' },
                  { id: 'data', labelId: 'Memindahkan data antar aplikasi, spreadsheet & notifikasi (Otomasi Workflow)', labelEn: 'Syncing data across apps, spreadsheets & notifications (Workflow Automation)' },
                ].map((opt) => (
                  <label
                    key={opt.id}
                    className={`flex items-center gap-3 p-3 rounded-[14px] border cursor-pointer transition-colors ${
                      q2 === opt.id
                        ? 'bg-[#FFFFFF] border-[#6A3FD0] text-[#17122B] shadow-sm'
                        : 'bg-[#FFFFFF]/60 border-[rgba(91,60,196,0.12)] text-[#5B5675] hover:bg-[#FFFFFF]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="finder-q2"
                      value={opt.id}
                      checked={q2 === opt.id}
                      onChange={() => setQ2(opt.id)}
                      className="accent-[#6A3FD0] w-4 h-4"
                    />
                    <span className="text-[13.5px] font-medium leading-snug">
                      {isEn ? opt.labelEn : opt.labelId}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Result Card Column */}
        <div className="lg:col-span-5">
          <div className="p-6 rounded-[20px] bg-[#FFFFFF] border border-[rgba(91,60,196,0.2)] shadow-[0_10px_30px_-10px_rgba(106,63,208,0.12)] space-y-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.08em] font-semibold text-[#6A3FD0] bg-[#EFEAFB] px-2.5 py-1 rounded-full border border-[rgba(91,60,196,0.14)] inline-block">
              {isEn ? 'RECOMMENDED PACKAGE' : 'REKOMENDASI PAKET'}
            </span>

            <div>
              <h4 className="font-display text-[22px] font-semibold text-[#17122B]">
                {isEn ? recommendedPkg.nameEn : recommendedPkg.nameId}
              </h4>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-[12px] font-mono text-[#5B5675] uppercase">
                  {isEn ? 'Starting' : 'Mulai'}
                </span>
                <span className="font-display text-[24px] font-semibold text-[#6A3FD0] tracking-tight">
                  {formattedPrice}
                </span>
              </div>
            </div>

            <p className="text-[13.5px] text-[#5B5675] leading-relaxed border-t border-b border-[rgba(91,60,196,0.12)] py-3">
              {reasonText}
            </p>

            <a
              href={finderWaUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWaClick('pricing', `finder_${recommendedPkg.id}`, locale)}
              className="w-full min-h-[44px] px-4 py-2.5 rounded-full bg-[#6A3FD0] hover:bg-[#5230B0] text-[#FFFFFF] font-semibold text-[14px] flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <MessageCircle size={16} />
              <span>{isEn ? `Inquire about ${recommendedPkg.nameEn}` : `Tanya paket ${recommendedPkg.nameId}`}</span>
            </a>

            <p className="text-[11.5px] text-[#5B5675] text-center italic">
              {isEn
                ? 'Initial recommendation. Final recommendation confirmed during free audit.'
                : 'Rekomendasi awal. Rekomendasi final dipastikan saat audit gratis.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PricingPage() {
  const location = useLocation();
  const { locale, prefixMode } = parseLocalizedPath(location.pathname);
  const isEn = locale === 'en';

  const waContext = { type: 'default' as const, url: location.pathname };
  const whatsappUrl = buildWhatsAppLink(waContext, locale);
  const waCtaLabel = getWhatsAppCtaLabel(locale);

  const homeHref = toLocalizedHref('/', locale, prefixMode);
  const faqHref = toLocalizedHref('/faq', locale, prefixMode);
  const howItWorksHref = toLocalizedHref('/cara-kerja', locale, prefixMode);

  // Core packages from pricing data
  const starter = getPricingPackage('starter');
  const growth = getPricingPackage('growth');
  const customWeb = getPricingPackage('custom-web');
  const otomasi = getPricingPackage('otomasi');
  const aiAgent = getPricingPackage('ai-agent');
  const software = getPricingPackage('software');

  // Formatted Prices
  const starterPrice = formatCurrency(starter.from, locale);
  const growthPrice = formatCurrency(growth.from, locale);
  const customWebPrice = formatCurrency(customWeb.from, locale);
  const otomasiPrice = formatCurrency(otomasi.from, locale);
  const aiAgentPrice = formatCurrency(aiAgent.from, locale);
  const softwarePrice = formatCurrency(software.from, locale);

  const pageTitle = isEn
    ? 'Website & AI Agent Pricing | CHESTAADOTCOM'
    : 'Harga Jasa Website dan AI Agent | CHESTAADOTCOM';

  const pageDescription = isEn
    ? 'Website pricing starts from IDR 1,200,000, plus starting rates for AI agents, automation, and custom software. Complete with add-ons, DP, and inclusions.'
    : 'Harga website mulai Rp1.200.000, plus harga mulai dari untuk AI agent, otomasi, dan software custom. Lengkap dengan harga satuan, DP, dan yang termasuk.';

  // Structured Data (JSON-LD @graph with OfferCatalog & FAQPage)
  const jsonLdGraph = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': `https://chestaa.com${location.pathname}#webpage`,
          url: `https://chestaa.com${location.pathname}`,
          name: pageTitle,
          description: pageDescription,
          inLanguage: isEn ? 'en' : 'id',
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `https://chestaa.com${location.pathname}#breadcrumb`,
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: isEn ? 'Home' : 'Beranda',
              item: `https://chestaa.com${homeHref}`,
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: isEn ? 'Pricing' : 'Harga',
              item: `https://chestaa.com${location.pathname}`,
            },
          ],
        },
        {
          '@type': 'OfferCatalog',
          '@id': `https://chestaa.com${location.pathname}#pricing-catalog`,
          name: isEn ? 'CHESTAADOTCOM Service Pricing Catalog' : 'Katalog Harga Jasa CHESTAADOTCOM',
          itemListElement: [
            {
              '@type': 'Offer',
              name: starter.nameEn,
              description: 'mulai dari',
              priceSpecification: {
                '@type': 'UnitPriceSpecification',
                minPrice: starter.from,
                priceCurrency: 'IDR',
              },
            },
            {
              '@type': 'Offer',
              name: growth.nameEn,
              description: 'mulai dari',
              priceSpecification: {
                '@type': 'UnitPriceSpecification',
                minPrice: growth.from,
                priceCurrency: 'IDR',
              },
            },
            {
              '@type': 'Offer',
              name: customWeb.nameEn,
              description: 'mulai dari',
              priceSpecification: {
                '@type': 'UnitPriceSpecification',
                minPrice: customWeb.from,
                priceCurrency: 'IDR',
              },
            },
            {
              '@type': 'Offer',
              name: otomasi.nameEn,
              description: 'mulai dari',
              priceSpecification: {
                '@type': 'UnitPriceSpecification',
                minPrice: otomasi.from,
                priceCurrency: 'IDR',
              },
            },
            {
              '@type': 'Offer',
              name: aiAgent.nameEn,
              description: 'mulai dari',
              priceSpecification: {
                '@type': 'UnitPriceSpecification',
                minPrice: aiAgent.from,
                priceCurrency: 'IDR',
              },
            },
            {
              '@type': 'Offer',
              name: software.nameEn,
              description: 'mulai dari',
              priceSpecification: {
                '@type': 'UnitPriceSpecification',
                minPrice: software.from,
                priceCurrency: 'IDR',
              },
            },
          ],
        },
        {
          '@type': 'FAQPage',
          '@id': `https://chestaa.com${location.pathname}#mini-faq`,
          mainEntity: [
            {
              '@type': 'Question',
              name: isEn ? 'What is the starting price for a website?' : 'Berapa harga mulai dari untuk website?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: isEn
                  ? `Website development starts from ${starterPrice} for a fast landing page.`
                  : `Pembuatan website mulai dari ${starterPrice} untuk 1 landing page cepat.`,
              },
            },
            {
              '@type': 'Question',
              name: isEn ? 'How does payment work?' : 'Bayarnya gimana?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: isEn
                  ? 'Payment is structured as a 50% deposit before work starts, and the remaining 50% balance before final handover.'
                  : 'Sistem pembayaran yaitu DP 50% sebelum pengerjaan dimulai, dan pelunasan 50% sebelum handover.',
              },
            },
            {
              '@type': 'Question',
              name: isEn ? 'Can we negotiate or get an upfront discount?' : 'Boleh nego harga atau dapat diskon di depan?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: isEn
                  ? 'We do not give arbitrary upfront discounts. If your budget is smaller, we fairly adjust and reduce the scope.'
                  : 'Kami tidak memberi diskon di depan secara asal. Jika budget lebih kecil, ruang lingkup kerja disesuaikan secara adil.',
              },
            },
            {
              '@type': 'Question',
              name: isEn ? 'Are there any extra costs outside the package?' : 'Ada biaya lain di luar paket?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: isEn
                  ? 'Yearly domain/hosting, ad spend, and third-party API token usage are paid directly by you to external providers.'
                  : 'Biaya tahunan domain/hosting, anggaran iklan, dan token API pihak ketiga dibayar langsung olehmu ke penyedia.',
              },
            },
          ],
        },
      ],
    }),
    [location.pathname, isEn, pageTitle, pageDescription, homeHref, starter, growth, customWeb, otomasi, aiAgent, software, starterPrice]
  );

  const miniFaqs = [
    {
      question: isEn ? 'Berapa harga mulai dari untuk website?' : 'Berapa harga mulai dari untuk website?',
      answer: isEn
        ? `Pembuatan website mulai dari ${starterPrice} untuk 1 landing page cepat.`
        : `Pembuatan website mulai dari ${starterPrice} untuk 1 landing page cepat.`,
    },
    {
      question: isEn ? 'Bayarnya gimana?' : 'Bayarnya gimana?',
      answer: isEn
        ? 'DP 50% sebelum pengerjaan dimulai, dan pelunasan 50% sebelum handover setelah pengujian akhir.'
        : 'DP 50% sebelum pengerjaan dimulai, dan pelunasan 50% sebelum handover setelah pengujian akhir.',
    },
    {
      question: isEn ? 'Boleh nego harga?' : 'Boleh nego harga?',
      answer: isEn
        ? 'Kami tidak memberikan diskon di depan secara asal. Kalau budgetmu lebih kecil, ruang lingkup kerja kita kurangi secara adil.'
        : 'Kami tidak memberikan diskon di depan secara asal. Kalau budgetmu lebih kecil, ruang lingkup kerja kita kurangi secara adil.',
    },
    {
      question: isEn ? 'Ada biaya lain di luar paket?' : 'Ada biaya lain di luar paket?',
      answer: isEn
        ? 'Biaya tahunan domain/hosting, anggaran iklan berbayar, dan pemakaian API pihak ketiga (WhatsApp API / token AI) dibayar langsung olehmu ke penyedia.'
        : 'Biaya tahunan domain/hosting, anggaran iklan berbayar, dan pemakaian API pihak ketiga (WhatsApp API / token AI) dibayar langsung olehmu ke penyedia.',
    },
  ];

  return (
    <div className="pt-28 pb-20 bg-[#FFFFFF] text-[#17122B]">
      <SEOMetadata
        title={pageTitle}
        description={pageDescription}
        path={location.pathname}
        jsonLd={jsonLdGraph}
      />

      <Container>
        {/* Breadcrumb */}
        <div className="mb-6">
          <Breadcrumb
            items={[
              { label: isEn ? 'Home' : 'Beranda', href: homeHref },
              { label: isEn ? 'Pricing' : 'Harga & Paket' },
            ]}
          />
        </div>

        {/* 1. HERO SECTION */}
        <section className="mb-12">
          <Reveal>
            <Badge className="mb-3">{isEn ? 'Transparent Pricing' : 'Transparansi Biaya'}</Badge>
            <h1 className="font-display text-[32px] sm:text-[42px] md:text-[48px] font-semibold tracking-tight text-[#17122B] leading-[1.15] max-w-3xl">
              {isEn
                ? 'Clear pricing, before you pay anything.'
                : 'Harga yang jelas, sebelum kamu bayar apa pun.'}
            </h1>
            <p className="mt-4 text-[16px] sm:text-[18px] text-[#5B5675] leading-[1.6] max-w-2xl">
              {isEn
                ? 'All numbers below are starting rates. Final figures are written in our proposal after a free 30-minute audit, complete with inclusions and exclusions.'
                : 'Semua angka di bawah adalah harga mulai dari. Angka final kami tulis di proposal setelah audit gratis 30 menit, lengkap dengan yang termasuk dan tidak termasuk.'}
            </p>

            <div className="pt-6 flex flex-wrap items-center gap-3.5">
              <Button
                href={whatsappUrl}
                onClick={() => trackWaClick('default', 'pricing_hero_cta', locale)}
                variant="primary"
              >
                <MessageCircle size={16} />
                <span>{waCtaLabel}</span>
              </Button>

              <a
                href="#package-finder"
                className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-[14px] font-medium text-[#17122B] bg-[#F8F6FE] border border-[rgba(91,60,196,0.18)] hover:bg-[#EFEAFB] transition-colors"
              >
                <span>{isEn ? 'Find suitable package' : 'Cari paket yang cocok'}</span>
                <ArrowRight size={15} className="ml-2 text-[#6A3FD0]" />
              </a>
            </div>
          </Reveal>
        </section>
      </Container>

      {/* TRUST STRIP */}
      <TrustStrip locale={locale} className="my-10" />

      {/* 2. STICKY SEGMENT NAVIGATION */}
      <div className="sticky top-16 md:top-20 z-30 bg-[#FFFFFF]/90 backdrop-blur-md border-y border-[rgba(91,60,196,0.14)] py-3 my-8">
        <Container>
          <nav
            aria-label={isEn ? 'Pricing segments navigation' : 'Navigasi segmen harga'}
            className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5 text-[13.5px] font-medium"
          >
            <a
              href="#segment-website"
              className="px-4 py-1.5 rounded-full bg-[#F8F6FE] hover:bg-[#EFEAFB] text-[#17122B] border border-[rgba(91,60,196,0.12)] whitespace-nowrap transition-colors"
            >
              Website
            </a>
            <a
              href="#segment-ai-otomasi"
              className="px-4 py-1.5 rounded-full bg-[#F8F6FE] hover:bg-[#EFEAFB] text-[#17122B] border border-[rgba(91,60,196,0.12)] whitespace-nowrap transition-colors"
            >
              AI &amp; Otomasi
            </a>
            <a
              href="#segment-software"
              className="px-4 py-1.5 rounded-full bg-[#F8F6FE] hover:bg-[#EFEAFB] text-[#17122B] border border-[rgba(91,60,196,0.12)] whitespace-nowrap transition-colors"
            >
              Software Custom
            </a>
            <a
              href="#segment-rawat"
              className="px-4 py-1.5 rounded-full bg-[#F8F6FE] hover:bg-[#EFEAFB] text-[#17122B] border border-[rgba(91,60,196,0.12)] whitespace-nowrap transition-colors"
            >
              Rawat
            </a>
            <a
              href="#segment-addons"
              className="px-4 py-1.5 rounded-full bg-[#F8F6FE] hover:bg-[#EFEAFB] text-[#17122B] border border-[rgba(91,60,196,0.12)] whitespace-nowrap transition-colors"
            >
              Harga Satuan
            </a>
          </nav>
        </Container>
      </div>

      <Container>
        {/* 3. GROUPED PACKAGE CARDS */}

        {/* A. WEBSITE SEGMENT */}
        <section id="segment-website" className="my-14 scroll-mt-28">
          <SectionHeading
            eyebrow="WEBSITE & LANDING PAGE"
            title={isEn ? 'Website development packages' : 'Paket pembuatan website & landing page'}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {/* STARTER */}
            <Reveal delay={0.05}>
              <Card variant="soft" className="h-full flex flex-col justify-between p-7">
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-[#6A3FD0] font-semibold bg-[#EFEAFB] px-2.5 py-1 rounded-full border border-[rgba(91,60,196,0.18)]">
                    STARTER
                  </span>

                  <p className="mt-2 text-[13.5px] text-[#5B5675]">
                    {isEn ? 'For new businesses needing a fast page' : starter.forId}
                  </p>

                  <div className="mt-4 pt-3 border-t border-[rgba(91,60,196,0.12)]">
                    <span className="text-[12px] font-mono text-[#5B5675] uppercase">
                      {isEn ? 'Mulai' : 'Mulai'}
                    </span>
                    <div className="font-display text-[28px] font-semibold text-[#17122B] tracking-tight">
                      {starterPrice}
                    </div>
                  </div>

                  <p className="mt-2 font-mono text-[11.5px] text-[#5B5675]">
                    {starter.timeId} · {starter.revisions} putaran revisi · Dukungan {starter.supportId}
                  </p>

                  {/* Inclusions */}
                  <div className="mt-5 space-y-2 text-[13.5px]">
                    <span className="block font-mono text-[11px] uppercase tracking-[0.08em] font-semibold text-[#17122B]">
                      {isEn ? 'Inclusions:' : 'Termasuk:'}
                    </span>
                    <ul className="space-y-1.5 text-[#17122B]">
                      {[
                        '1 landing page responsif',
                        'Tombol WhatsApp',
                        'Optimasi kecepatan dasar',
                        'SEO dasar: judul, deskripsi, struktur heading',
                        'Setup domain dan hosting atas namamu (biaya tahunan terpisah)',
                        '1 putaran revisi',
                        'Dukungan perbaikan 7 hari setelah rilis',
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check size={15} className="text-[#6A3FD0] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Exclusions */}
                  <div className="mt-4 pt-3 border-t border-[rgba(91,60,196,0.12)] space-y-1.5 text-[13px] text-[#5B5675]">
                    <span className="block font-mono text-[11px] uppercase tracking-[0.08em] font-semibold text-[#5B5675]">
                      {isEn ? 'Exclusions:' : 'Tidak termasuk:'}
                    </span>
                    <ul className="space-y-1 text-[#5B5675]">
                      {['Copywriting lengkap', 'Tracking', 'Halaman tambahan'].map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <X size={14} className="text-[#5B5675]/50 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8">
                  <a
                    href={`https://wa.me/6282125447232?text=${encodeURIComponent(
                      'Halo CHESTAADOTCOM, saya ingin tanya paket STARTER (mulai Rp1.200.000).'
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackWaClick('pricing', 'pkg_starter', locale)}
                    className="w-full min-h-[42px] px-4 py-2 rounded-full bg-[#FFFFFF] hover:bg-[#F8F6FE] text-[#6A3FD0] border border-[#6A3FD0]/30 font-semibold text-[13.5px] flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <MessageCircle size={15} />
                    <span>{isEn ? 'Inquire Starter' : 'Tanya paket ini'}</span>
                  </a>
                </div>
              </Card>
            </Reveal>

            {/* GROWTH (FEATURED) */}
            <Reveal delay={0.1}>
              <Card variant="highlighted" className="h-full flex flex-col justify-between p-7 border-t-4 border-t-[#6A3FD0]">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-[#FFFFFF] font-semibold bg-[#6A3FD0] px-2.5 py-1 rounded-full">
                      GROWTH
                    </span>
                    <span className="font-mono text-[11px] text-[#6A3FD0] font-semibold bg-[#EFEAFB] px-2.5 py-1 rounded-full border border-[rgba(91,60,196,0.18)]">
                      {isEn ? 'For advertising businesses' : 'Untuk bisnis yang beriklan'}
                    </span>
                  </div>

                  <p className="mt-2 text-[13.5px] text-[#5B5675]">
                    {growth.forId}
                  </p>

                  <div className="mt-4 pt-3 border-t border-[rgba(91,60,196,0.12)]">
                    <span className="text-[12px] font-mono text-[#5B5675] uppercase">
                      Mulai
                    </span>
                    <div className="font-display text-[28px] font-semibold text-[#17122B] tracking-tight">
                      {growthPrice}
                    </div>
                  </div>

                  <p className="mt-2 font-mono text-[11.5px] text-[#5B5675]">
                    {growth.timeId} · {growth.revisions} putaran revisi · Dukungan {growth.supportId}
                  </p>

                  {/* Inclusions */}
                  <div className="mt-5 space-y-2 text-[13.5px]">
                    <span className="block font-mono text-[11px] uppercase tracking-[0.08em] font-semibold text-[#17122B]">
                      Termasuk:
                    </span>
                    <ul className="space-y-1.5 text-[#17122B]">
                      {[
                        'Semua yang ada di Starter',
                        'Copywriting: struktur dan tulisan yang menjawab pertanyaan calon pelanggan',
                        'Tracking klik WhatsApp dan formulir',
                        'Formulir tersambung ke Google Sheets',
                        'Uji kecepatan di PageSpeed Insights',
                        '2 putaran revisi',
                        'Dukungan perbaikan 14 hari',
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check size={15} className="text-[#6A3FD0] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Exclusions */}
                  <div className="mt-4 pt-3 border-t border-[rgba(91,60,196,0.12)] space-y-1.5 text-[13px] text-[#5B5675]">
                    <span className="block font-mono text-[11px] uppercase tracking-[0.08em] font-semibold text-[#5B5675]">
                      Tidak termasuk:
                    </span>
                    <ul className="space-y-1 text-[#5B5675]">
                      {['Halaman tambahan', 'Panel admin'].map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <X size={14} className="text-[#5B5675]/50 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8">
                  <a
                    href={`https://wa.me/6282125447232?text=${encodeURIComponent(
                      'Halo CHESTAADOTCOM, saya ingin tanya paket GROWTH (mulai Rp3.500.000).'
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackWaClick('pricing', 'pkg_growth', locale)}
                    className="w-full min-h-[42px] px-4 py-2 rounded-full bg-[#6A3FD0] hover:bg-[#5230B0] text-[#FFFFFF] font-semibold text-[13.5px] flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <MessageCircle size={15} />
                    <span>{isEn ? 'Inquire Growth' : 'Tanya paket ini'}</span>
                  </a>
                </div>
              </Card>
            </Reveal>

            {/* CUSTOM WEB */}
            <Reveal delay={0.15}>
              <Card variant="soft" className="h-full flex flex-col justify-between p-7">
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-[#6A3FD0] font-semibold bg-[#EFEAFB] px-2.5 py-1 rounded-full border border-[rgba(91,60,196,0.18)]">
                    CUSTOM WEB
                  </span>

                  <p className="mt-2 text-[13.5px] text-[#5B5675]">
                    {customWeb.forId}
                  </p>

                  <div className="mt-4 pt-3 border-t border-[rgba(91,60,196,0.12)]">
                    <span className="text-[12px] font-mono text-[#5B5675] uppercase">
                      Mulai
                    </span>
                    <div className="font-display text-[28px] font-semibold text-[#17122B] tracking-tight">
                      {customWebPrice}
                    </div>
                  </div>

                  <p className="mt-2 font-mono text-[11.5px] text-[#5B5675]">
                    {customWeb.timeId} · {customWeb.revisions} putaran revisi · Dukungan {customWeb.supportId}
                  </p>

                  {/* Inclusions */}
                  <div className="mt-5 space-y-2 text-[13.5px]">
                    <span className="block font-mono text-[11px] uppercase tracking-[0.08em] font-semibold text-[#17122B]">
                      Termasuk:
                    </span>
                    <ul className="space-y-1.5 text-[#17122B]">
                      {[
                        'Sampai 6 halaman',
                        'Panel admin dasar',
                        'Integrasi formulir, WhatsApp, dan Google Sheets',
                        'SEO dasar dan data terstruktur',
                        '3 putaran revisi',
                        'Dukungan perbaikan 30 hari',
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check size={15} className="text-[#6A3FD0] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Exclusions */}
                  <div className="mt-4 pt-3 border-t border-[rgba(91,60,196,0.12)] space-y-1.5 text-[13px] text-[#5B5675]">
                    <span className="block font-mono text-[11px] uppercase tracking-[0.08em] font-semibold text-[#5B5675]">
                      Tidak termasuk:
                    </span>
                    <ul className="space-y-1 text-[#5B5675]">
                      {['Halaman di atas 6 (harga satuan)', 'Versi bahasa Inggris (harga satuan)'].map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <X size={14} className="text-[#5B5675]/50 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8">
                  <a
                    href={`https://wa.me/6282125447232?text=${encodeURIComponent(
                      'Halo CHESTAADOTCOM, saya ingin tanya paket CUSTOM WEB (mulai Rp8.500.000).'
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackWaClick('pricing', 'pkg_custom_web', locale)}
                    className="w-full min-h-[42px] px-4 py-2 rounded-full bg-[#FFFFFF] hover:bg-[#F8F6FE] text-[#6A3FD0] border border-[#6A3FD0]/30 font-semibold text-[13.5px] flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <MessageCircle size={15} />
                    <span>{isEn ? 'Inquire Custom Web' : 'Tanya paket ini'}</span>
                  </a>
                </div>
              </Card>
            </Reveal>
          </div>
        </section>

        {/* B. AI & OTOMASI SEGMENT */}
        <section id="segment-ai-otomasi" className="my-16 scroll-mt-28">
          <SectionHeading
            eyebrow="AI & OTOMASI WORKFLOW"
            title={isEn ? 'AI Agent & Automation packages' : 'Paket AI agent & otomasi workflow'}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {/* OTOMASI WORKFLOW */}
            <Reveal delay={0.05}>
              <Card variant="soft" className="h-full flex flex-col justify-between p-7">
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-[#6A3FD0] font-semibold bg-[#EFEAFB] px-2.5 py-1 rounded-full border border-[rgba(91,60,196,0.18)]">
                    OTOMASI WORKFLOW (PER ALUR)
                  </span>

                  <p className="mt-2 text-[13.5px] text-[#5B5675]">
                    {otomasi.forId}
                  </p>

                  <div className="mt-4 pt-3 border-t border-[rgba(91,60,196,0.12)]">
                    <span className="text-[12px] font-mono text-[#5B5675] uppercase">
                      Mulai
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="font-display text-[28px] font-semibold text-[#17122B] tracking-tight">
                        {otomasiPrice}
                      </span>
                      <span className="text-[13px] text-[#5B5675]">/per alur</span>
                    </div>
                  </div>

                  <p className="mt-2 font-mono text-[11.5px] text-[#5B5675]">
                    {otomasi.timeId} · {otomasi.revisions} putaran revisi · Dukungan {otomasi.supportId}
                  </p>

                  {/* Inclusions */}
                  <div className="mt-5 space-y-2 text-[13.5px]">
                    <span className="block font-mono text-[11px] uppercase tracking-[0.08em] font-semibold text-[#17122B]">
                      Termasuk:
                    </span>
                    <ul className="space-y-1.5 text-[#17122B]">
                      {[
                        'Pemetaan alur kerja',
                        'Otomasi antar 2-3 aplikasi',
                        'Penanganan error dan notifikasi kegagalan',
                        'Log eksekusi',
                        'Dokumentasi alur',
                        'Uji dengan data contoh',
                        '2 putaran revisi',
                        'Dukungan perbaikan 14 hari',
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check size={15} className="text-[#6A3FD0] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Exclusions */}
                  <div className="mt-4 pt-3 border-t border-[rgba(91,60,196,0.12)] space-y-1.5 text-[13px] text-[#5B5675]">
                    <span className="block font-mono text-[11px] uppercase tracking-[0.08em] font-semibold text-[#5B5675]">
                      Tidak termasuk:
                    </span>
                    <ul className="space-y-1 text-[#5B5675]">
                      {['Langganan aplikasi pihak ketiga (dibayar langsung olehmu)'].map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <X size={14} className="text-[#5B5675]/50 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8">
                  <a
                    href={`https://wa.me/6282125447232?text=${encodeURIComponent(
                      'Halo CHESTAADOTCOM, saya ingin tanya paket OTOMASI WORKFLOW (mulai Rp3.500.000 per alur).'
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackWaClick('pricing', 'pkg_otomasi', locale)}
                    className="w-full min-h-[42px] px-4 py-2 rounded-full bg-[#FFFFFF] hover:bg-[#F8F6FE] text-[#6A3FD0] border border-[#6A3FD0]/30 font-semibold text-[13.5px] flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <MessageCircle size={15} />
                    <span>{isEn ? 'Inquire Workflow Automation' : 'Tanya paket ini'}</span>
                  </a>
                </div>
              </Card>
            </Reveal>

            {/* AI AGENT WHATSAPP */}
            <Reveal delay={0.1}>
              <Card variant="soft" className="h-full flex flex-col justify-between p-7">
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-[#6A3FD0] font-semibold bg-[#EFEAFB] px-2.5 py-1 rounded-full border border-[rgba(91,60,196,0.18)]">
                    AI AGENT WHATSAPP (PER ALUR)
                  </span>

                  <p className="mt-2 text-[13.5px] text-[#5B5675]">
                    {aiAgent.forId}
                  </p>

                  <div className="mt-4 pt-3 border-t border-[rgba(91,60,196,0.12)]">
                    <span className="text-[12px] font-mono text-[#5B5675] uppercase">
                      Mulai
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="font-display text-[28px] font-semibold text-[#17122B] tracking-tight">
                        {aiAgentPrice}
                      </span>
                      <span className="text-[13px] text-[#5B5675]">/per alur</span>
                    </div>
                  </div>

                  <p className="mt-2 font-mono text-[11.5px] text-[#5B5675]">
                    {aiAgent.timeId} · {aiAgent.revisions} putaran penyesuaian · Pendampingan {aiAgent.supportId}
                  </p>

                  {/* Inclusions */}
                  <div className="mt-5 space-y-2 text-[13.5px]">
                    <span className="block font-mono text-[11px] uppercase tracking-[0.08em] font-semibold text-[#17122B]">
                      Termasuk:
                    </span>
                    <ul className="space-y-1.5 text-[#17122B]">
                      {[
                        'Audit gratis',
                        'Aturan tindakan tertulis bersama kamu',
                        '1 alur percakapan',
                        'Hingga 2 tool terhubung, misalnya kalender dan CRM',
                        'Serah ke staf dengan ringkasan percakapan',
                        'Log semua tindakan',
                        'Pengujian dengan percakapan nyata',
                        '2 putaran penyesuaian',
                        'Pendampingan 30 hari',
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check size={15} className="text-[#6A3FD0] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Exclusions */}
                  <div className="mt-4 pt-3 border-t border-[rgba(91,60,196,0.12)] space-y-1.5 text-[13px] text-[#5B5675]">
                    <span className="block font-mono text-[11px] uppercase tracking-[0.08em] font-semibold text-[#5B5675]">
                      Tidak termasuk:
                    </span>
                    <ul className="space-y-1 text-[#5B5675]">
                      {['Biaya WhatsApp Business Platform dan pemakaian model AI (dibayar langsung olehmu sesuai penyedia)'].map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <X size={14} className="text-[#5B5675]/50 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8">
                  <a
                    href={`https://wa.me/6282125447232?text=${encodeURIComponent(
                      'Halo CHESTAADOTCOM, saya ingin tanya paket AI AGENT WHATSAPP (mulai Rp7.500.000 per alur).'
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackWaClick('pricing', 'pkg_ai_agent', locale)}
                    className="w-full min-h-[42px] px-4 py-2 rounded-full bg-[#6A3FD0] hover:bg-[#5230B0] text-[#FFFFFF] font-semibold text-[13.5px] flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <MessageCircle size={15} />
                    <span>{isEn ? 'Inquire AI Agent' : 'Tanya paket ini'}</span>
                  </a>
                </div>
              </Card>
            </Reveal>
          </div>
        </section>

        {/* C. SOFTWARE CUSTOM SEGMENT */}
        <section id="segment-software" className="my-16 scroll-mt-28">
          <SectionHeading
            eyebrow="SOFTWARE CUSTOM & DASHBOARD"
            title={isEn ? 'Custom software & dashboard packages' : 'Paket software custom & dashboard internal'}
          />

          <div className="mt-8">
            <Reveal delay={0.05}>
              <Card variant="soft" className="p-7 max-w-2xl">
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-[#6A3FD0] font-semibold bg-[#EFEAFB] px-2.5 py-1 rounded-full border border-[rgba(91,60,196,0.18)]">
                    SOFTWARE CUSTOM
                  </span>

                  <p className="mt-2 text-[13.5px] text-[#5B5675]">
                    {software.forId}
                  </p>

                  <div className="mt-4 pt-3 border-t border-[rgba(91,60,196,0.12)]">
                    <span className="text-[12px] font-mono text-[#5B5675] uppercase">
                      Mulai
                    </span>
                    <div className="font-display text-[28px] font-semibold text-[#17122B] tracking-tight">
                      {softwarePrice}
                    </div>
                  </div>

                  <p className="mt-2 font-mono text-[11.5px] text-[#5B5675]">
                    {software.timeId} · {software.revisions} putaran revisi · Dukungan {software.supportId}
                  </p>

                  {/* Inclusions */}
                  <div className="mt-5 space-y-2 text-[13.5px]">
                    <span className="block font-mono text-[11px] uppercase tracking-[0.08em] font-semibold text-[#17122B]">
                      Termasuk:
                    </span>
                    <ul className="space-y-1.5 text-[#17122B]">
                      {[
                        'Audit dan kebutuhan yang ditulis jelas',
                        'Rancangan layar yang kamu setujui',
                        'Versi pertama yang bisa dipakai',
                        'Login dan hak akses per peran',
                        'Dashboard dan laporan',
                        'Dokumentasi dan pelatihan singkat',
                        '3 putaran revisi',
                        'Dukungan perbaikan 30 hari',
                        'Kepemilikan kode disepakati tertulis',
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check size={15} className="text-[#6A3FD0] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Exclusions */}
                  <div className="mt-4 pt-3 border-t border-[rgba(91,60,196,0.12)] space-y-1.5 text-[13px] text-[#5B5675]">
                    <span className="block font-mono text-[11px] uppercase tracking-[0.08em] font-semibold text-[#5B5675]">
                      Tidak termasuk:
                    </span>
                    <ul className="space-y-1 text-[#5B5675]">
                      {['Fitur di luar cakupan versi pertama (dihitung terpisah)'].map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <X size={14} className="text-[#5B5675]/50 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8">
                  <a
                    href={`https://wa.me/6282125447232?text=${encodeURIComponent(
                      'Halo CHESTAADOTCOM, saya ingin tanya paket SOFTWARE CUSTOM (mulai Rp15.000.000).'
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackWaClick('pricing', 'pkg_software', locale)}
                    className="w-full min-h-[42px] px-4 py-2 rounded-full bg-[#FFFFFF] hover:bg-[#F8F6FE] text-[#6A3FD0] border border-[#6A3FD0]/30 font-semibold text-[13.5px] flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <MessageCircle size={15} />
                    <span>{isEn ? 'Inquire Custom Software' : 'Tanya paket ini'}</span>
                  </a>
                </div>
              </Card>
            </Reveal>
          </div>
        </section>

        {/* D. RAWAT SEGMENT */}
        <section id="segment-rawat" className="my-16 scroll-mt-28">
          <SectionHeading
            eyebrow="PAKET RAWAT BULANAN"
            title={isEn ? 'Monthly care & maintenance plans' : 'Paket rawat bulanan setelah rilis'}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {PRICING_CARE_PACKAGES.map((care, idx) => (
              <Reveal key={care.id} delay={0.08 * idx}>
                <Card variant="soft" className="p-7 h-full flex flex-col justify-between">
                  <div>
                    <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-[#6A3FD0] font-semibold bg-[#EFEAFB] px-2.5 py-1 rounded-full border border-[rgba(91,60,196,0.18)] inline-block mb-3">
                      {isEn ? care.nameEn : care.nameId}
                    </span>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="font-display text-[26px] font-semibold text-[#17122B] tracking-tight">
                        {formatCurrency(care.perMonth, locale)}
                      </span>
                      <span className="text-[13px] text-[#5B5675]">/bulan</span>
                    </div>
                    <p className="mt-3 text-[14px] text-[#5B5675] leading-[1.6]">
                      {care.id === 'basic'
                        ? 'Pembaruan, cadangan, pengecekan kecepatan bulanan, perbaikan bug kecil.'
                        : 'Semua di Basic, ditambah pemantauan log otomasi atau agent, penyesuaian aturan, dan laporan bulanan singkat.'}
                    </p>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </section>

        {/* 4. COMPARISON TABLE (Mobile Sticky Metric Labels Column) */}
        <section className="my-16">
          <SectionHeading
            eyebrow="PERBANDINGAN PAKET"
            title={isEn ? 'Package metrics overview' : 'Tabel perbandingan ringkas'}
          />

          <Reveal delay={0.1}>
            <div className="mt-8 rounded-[24px] bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)] overflow-hidden shadow-sm">
              <div className="overflow-x-auto relative">
                <table className="w-full text-left border-collapse min-w-[720px]">
                  <caption className="sr-only">Perbandingan paket CHESTAADOTCOM</caption>
                  <thead>
                    <tr className="bg-[#F8F6FE] border-b border-[rgba(91,60,196,0.14)] text-[12px] font-mono uppercase text-[#5B5675]">
                      <th scope="col" className="p-4 pl-6 sticky left-0 bg-[#F8F6FE] z-10 border-r border-[rgba(91,60,196,0.14)] font-semibold min-w-[140px]">
                        Metrik
                      </th>
                      <th scope="col" className="p-4 font-semibold text-[#17122B]">Starter</th>
                      <th scope="col" className="p-4 font-semibold text-[#6A3FD0]">Growth</th>
                      <th scope="col" className="p-4 font-semibold text-[#17122B]">Custom Web</th>
                      <th scope="col" className="p-4 font-semibold text-[#17122B]">Otomasi</th>
                      <th scope="col" className="p-4 font-semibold text-[#17122B]">AI Agent</th>
                      <th scope="col" className="p-4 pr-6 font-semibold text-[#17122B]">Software</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[rgba(91,60,196,0.12)] text-[13.5px]">
                    <tr>
                      <th scope="row" className="p-4 pl-6 font-semibold text-[#17122B] sticky left-0 bg-[#FFFFFF] z-10 border-r border-[rgba(91,60,196,0.14)]">
                        Harga mulai dari
                      </th>
                      <td className="p-4 font-mono font-semibold">{starterPrice}</td>
                      <td className="p-4 font-mono font-semibold text-[#6A3FD0]">{growthPrice}</td>
                      <td className="p-4 font-mono font-semibold">{customWebPrice}</td>
                      <td className="p-4 font-mono font-semibold">{otomasiPrice}</td>
                      <td className="p-4 font-mono font-semibold">{aiAgentPrice}</td>
                      <td className="p-4 pr-6 font-mono font-semibold">{softwarePrice}</td>
                    </tr>
                    <tr>
                      <th scope="row" className="p-4 pl-6 font-semibold text-[#17122B] sticky left-0 bg-[#FFFFFF] z-10 border-r border-[rgba(91,60,196,0.14)]">
                        Waktu
                      </th>
                      <td className="p-4">{starter.timeId}</td>
                      <td className="p-4 text-[#6A3FD0]">{growth.timeId}</td>
                      <td className="p-4">{customWeb.timeId}</td>
                      <td className="p-4">{otomasi.timeId}</td>
                      <td className="p-4">{aiAgent.timeId}</td>
                      <td className="p-4 pr-6">{software.timeId}</td>
                    </tr>
                    <tr>
                      <th scope="row" className="p-4 pl-6 font-semibold text-[#17122B] sticky left-0 bg-[#FFFFFF] z-10 border-r border-[rgba(91,60,196,0.14)]">
                        Putaran revisi
                      </th>
                      <td className="p-4">{starter.revisions} kali</td>
                      <td className="p-4 text-[#6A3FD0]">{growth.revisions} kali</td>
                      <td className="p-4">{customWeb.revisions} kali</td>
                      <td className="p-4">{otomasi.revisions} kali</td>
                      <td className="p-4">{aiAgent.revisions} kali</td>
                      <td className="p-4 pr-6">{software.revisions} kali</td>
                    </tr>
                    <tr>
                      <th scope="row" className="p-4 pl-6 font-semibold text-[#17122B] sticky left-0 bg-[#FFFFFF] z-10 border-r border-[rgba(91,60,196,0.14)]">
                        Dukungan setelah rilis
                      </th>
                      <td className="p-4">{starter.supportId}</td>
                      <td className="p-4 text-[#6A3FD0]">{growth.supportId}</td>
                      <td className="p-4">{customWeb.supportId}</td>
                      <td className="p-4">{otomasi.supportId}</td>
                      <td className="p-4">{aiAgent.supportId}</td>
                      <td className="p-4 pr-6">{software.supportId}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </Reveal>
        </section>

        {/* 5. HARGA SATUAN (ADDONS) */}
        <section id="segment-addons" className="my-16 scroll-mt-28">
          <SectionHeading
            eyebrow="HARGA SATUAN"
            title={isEn ? 'Add-on pricing list' : 'Harga satuan layanan'}
          />

          <Reveal delay={0.1}>
            <div className="mt-8 rounded-[24px] bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)] overflow-hidden">
              <div className="divide-y divide-[rgba(91,60,196,0.12)]">
                {PRICING_ADDONS.map((addon) => {
                  const formattedAddonPrice = formatCurrency(addon.price, locale);
                  const prefix = isEn ? addon.prefixEn : addon.prefixId;
                  const unit = isEn ? addon.unitEn : addon.unitId;

                  return (
                    <div
                      key={addon.id}
                      className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-[#F8F6FE] transition-colors"
                    >
                      <span className="text-[14.5px] font-medium text-[#17122B]">
                        {isEn ? addon.nameEn : addon.nameId}
                      </span>
                      <div className="font-mono text-[13.5px] font-semibold text-[#6A3FD0] whitespace-nowrap">
                        {prefix && (
                          <span className="text-[12px] text-[#5B5675] font-normal mr-1">
                            {prefix}
                          </span>
                        )}
                        <span>{formattedAddonPrice}</span>
                        {unit && (
                          <span className="text-[12px] text-[#5B5675] font-normal ml-1">
                            /{unit}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <p className="mt-3 text-[13px] text-[#5B5675] italic">
              {isEn
                ? 'Add-on pricing applies if you require additions outside the core package. Everything is stated in the proposal before work begins.'
                : 'Harga satuan dipakai kalau kamu butuh tambahan di luar paket. Semuanya tertulis di proposal sebelum dikerjakan.'}
            </p>
          </Reveal>
        </section>

        {/* 6. CARA MEMBAYAR */}
        <section className="my-16">
          <SectionHeading
            eyebrow="TAHAP PEMBAYARAN"
            title={isEn ? 'Payment steps' : 'Cara membayar'}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <Card variant="soft" className="p-6">
              <span className="font-mono text-[14px] font-bold text-[#6A3FD0] bg-[#EFEAFB] px-3 py-1 rounded-full inline-block mb-3">
                01
              </span>
              <h4 className="font-display text-[17px] font-semibold text-[#17122B]">
                DP 50% sebelum pengerjaan dimulai
              </h4>
              <p className="mt-2 text-[13.5px] text-[#5B5675] leading-[1.6]">
                Pembayaran DP mengunci jadwal pengerjaan dan dimulainya riset alur kerja.
              </p>
            </Card>

            <Card variant="soft" className="p-6">
              <span className="font-mono text-[14px] font-bold text-[#6A3FD0] bg-[#EFEAFB] px-3 py-1 rounded-full inline-block mb-3">
                02
              </span>
              <h4 className="font-display text-[17px] font-semibold text-[#17122B]">
                Pengerjaan dan kabar progres rutin
              </h4>
              <p className="mt-2 text-[13.5px] text-[#5B5675] leading-[1.6]">
                Sistem dibangun dan diuji, dengan update berkala yang dikirim lewat WhatsApp.
              </p>
            </Card>

            <Card variant="soft" className="p-6">
              <span className="font-mono text-[14px] font-bold text-[#6A3FD0] bg-[#EFEAFB] px-3 py-1 rounded-full inline-block mb-3">
                03
              </span>
              <h4 className="font-display text-[17px] font-semibold text-[#17122B]">
                Pelunasan sebelum handover
              </h4>
              <p className="mt-2 text-[13.5px] text-[#5B5675] leading-[1.6]">
                Setelah uji akhir disetujui, pelunasan dilakukan dan seluruh akses diserahterimakan.
              </p>
            </Card>
          </div>

          <p className="mt-4 text-[13.5px] text-[#5B5675] text-center font-medium">
            Detail ruang lingkup, jadwal, dan batas revisi tertulis di proposal.
          </p>
        </section>

        {/* 7. BIAYA DI LUAR PAKET */}
        <section className="my-16">
          <SectionHeading
            eyebrow="BIAYA LUAR PAKET"
            title={isEn ? 'Costs outside the package' : 'Biaya di luar paket'}
          />

          <Reveal delay={0.1}>
            <div className="mt-8 p-6 sm:p-7 rounded-[24px] bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)] space-y-3 text-[14px] text-[#5B5675]">
              <p className="text-[#17122B] font-semibold">
                Biaya berikut tidak termasuk dalam paket jasa pengerjaan dan dibayar langsung olehmu ke penyedia layanan:
              </p>
              <ul className="space-y-2 pl-1">
                <li className="flex items-start gap-2.5">
                  <Check size={16} className="text-[#6A3FD0] shrink-0 mt-0.5" />
                  <span>Domain dan hosting tahunan</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check size={16} className="text-[#6A3FD0] shrink-0 mt-0.5" />
                  <span>Revisi di atas batas paket</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check size={16} className="text-[#6A3FD0] shrink-0 mt-0.5" />
                  <span>Fitur tambahan di luar proposal</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check size={16} className="text-[#6A3FD0] shrink-0 mt-0.5" />
                  <span>Iklan berbayar, dibayar langsung olehmu</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check size={16} className="text-[#6A3FD0] shrink-0 mt-0.5" />
                  <span>Biaya layanan pihak ketiga seperti WhatsApp Business Platform dan pemakaian model AI, dibayar langsung olehmu</span>
                </li>
              </ul>
            </div>
          </Reveal>
        </section>

        {/* 8. KENAPA KAMI TIDAK MEMBERI DISKON DI DEPAN */}
        <section className="my-16">
          <Reveal>
            <div className="p-7 sm:p-9 rounded-[24px] bg-[#FFFFFF] border border-[rgba(91,60,196,0.18)] space-y-3 shadow-sm">
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] font-semibold text-[#6A3FD0]">
                PRINSIP HARGA
              </span>
              <h2 className="font-display text-[22px] sm:text-[26px] font-semibold text-[#17122B]">
                Kenapa kami tidak memberi diskon di depan
              </h2>
              <p className="text-[15px] sm:text-[16px] text-[#17122B] leading-[1.7] max-w-3xl">
                Harga yang bisa ditawar dari awal biasanya berarti ada bagian yang dikurangi diam-diam. Kami memilih terbuka: kalau budgetmu lebih kecil, kita kurangi ruang lingkupnya dan mulai dari bagian yang paling berguna. Hasilnya tetap dikerjakan dengan benar.
              </p>
            </div>
          </Reveal>
        </section>

        {/* 9. PACKAGE FINDER WIDGET */}
        <section className="my-16">
          <PackageFinder locale={locale} />
        </section>

        {/* 10. MINI FAQ */}
        <section className="my-16">
          <SectionHeading
            eyebrow="FAQ HARGA"
            title={isEn ? 'Frequently asked pricing questions' : 'Pertanyaan ringkas seputar harga'}
          />

          <Reveal delay={0.1}>
            <div className="max-w-3xl mx-auto mt-8">
              <FAQAccordion items={miniFaqs} />

              <div className="mt-6 text-center">
                <Link
                  to={faqHref}
                  className="inline-flex items-center gap-1.5 font-semibold text-[14.5px] text-[#6A3FD0] hover:underline"
                >
                  <span>{isEn ? 'View all questions' : 'Lihat semua pertanyaan'}</span>
                  <ArrowUpRight size={15} />
                </Link>
              </div>
            </div>
          </Reveal>
        </section>

        {/* 11. FINAL CTA */}
        <section className="my-16">
          <Reveal>
            <div className="p-8 sm:p-12 rounded-[28px] bg-gradient-to-b from-[#F8F6FE] via-[#F8F6FE] to-[#FFFFFF] border border-[rgba(91,60,196,0.18)] text-center space-y-4">
              <h2 className="font-display text-[28px] sm:text-[36px] font-semibold text-[#17122B] tracking-tight max-w-2xl mx-auto">
                {isEn
                  ? 'Tell us about the work that tires your team the most.'
                  : 'Ceritakan kerjaan yang paling bikin capek.'}
              </h2>

              <p className="text-[16px] sm:text-[18px] text-[#5B5675] leading-[1.6] max-w-xl mx-auto">
                {isEn
                  ? 'We speak candidly whether it can be built, and roughly what it will cost.'
                  : 'Kami bilang jujur apakah bisa dikerjakan, dan berapa kira-kira biayanya.'}
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  href={whatsappUrl}
                  onClick={() => trackWaClick('default', 'pricing_bottom_cta', locale)}
                  variant="primary"
                  size="lg"
                >
                  <MessageCircle size={18} />
                  <span>{waCtaLabel}</span>
                </Button>

                <Link
                  to={howItWorksHref}
                  className="font-medium text-[15px] text-[#6A3FD0] hover:underline py-2 px-4"
                >
                  {isEn ? 'Or see how we work' : 'Atau lihat cara kerja'}
                </Link>
              </div>
            </div>
          </Reveal>
        </section>
      </Container>
    </div>
  );
}
