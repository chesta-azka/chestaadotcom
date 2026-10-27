import React, { useMemo } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  MessageCircle,
  MapPin,
  Info,
  Check,
  Building2,
  FileText,
  ShieldCheck,
  BookOpen,
} from 'lucide-react';
import SEOMetadata from '../components/atoms/SEOMetadata';
import TrustStrip from '../components/atoms/TrustStrip';
import {
  REAL_PROJECTS_EXPERIENCE,
  EXPERIENCE_FOOTER_NOTE,
  EXPERIENCE_DISCLOSURE_NOTE,
} from '../data/experience';
import {
  Container,
  Button,
  Card,
  Badge,
  SectionHeading,
  Reveal,
  Breadcrumb,
} from '../components/ui/DesignSystem';
import { parseLocalizedPath, toLocalizedHref } from '../lib/i18n';
import { buildWhatsAppLink, getWhatsAppCtaLabel } from '../lib/whatsapp';
import { trackWaClick } from '../lib/analytics';
import { getIndexableAreas, getServiceAreaPath } from '../data/service-areas';

/**
 * 4-Step About Flow SVG Diagram labeled "Ilustrasi"
 */
function AboutFlowIllustration({ locale }: { locale: 'id' | 'en' }) {
  const isEn = locale === 'en';

  const steps = isEn
    ? [
        { num: '01', title: 'Audit 30 Min', desc: 'Map repetitive tasks' },
        { num: '02', title: 'Written Scope', desc: 'Price & schedule' },
        { num: '03', title: 'Prototype', desc: 'Test before build' },
        { num: '04', title: 'System Runs', desc: 'Handover & support' },
      ]
    : [
        { num: '01', title: 'Audit 30 Menit', desc: 'Petakan kerjaan berulang' },
        { num: '02', title: 'Scope Tertulis', desc: 'Harga & jadwal pasti' },
        { num: '03', title: 'Prototipe', desc: 'Uji sebelum dibangun' },
        { num: '04', title: 'Sistem Jalan', desc: 'Handover & pendampingan' },
      ];

  return (
    <div className="w-full p-6 sm:p-8 rounded-[24px] bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)] relative overflow-hidden">
      {/* Quiet top label */}
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-[rgba(91,60,196,0.12)]">
        <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#6A3FD0] font-semibold">
          {isEn ? 'HOW WE WORK WITH CLIENTS' : 'ALUR KERJA SAMA KLIEN'}
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#5B5675]">
          {isEn ? 'Illustration' : 'Ilustrasi'}
        </span>
      </div>

      {/* 4-step flow row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
        {steps.map((step, idx) => (
          <div
            key={step.num}
            className="p-4 rounded-[18px] bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)] flex flex-col justify-between relative"
          >
            <div>
              <span className="font-mono text-[12px] font-bold text-[#6A3FD0] bg-[#EFEAFB] px-2.5 py-0.5 rounded-full inline-block mb-2">
                {step.num}
              </span>
              <h4 className="font-display text-[15px] font-semibold text-[#17122B] leading-snug">
                {step.title}
              </h4>
              <p className="mt-1 text-[13px] text-[#5B5675] leading-snug">
                {step.desc}
              </p>
            </div>
            {idx < steps.length - 1 && (
              <div
                aria-hidden="true"
                className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#EFEAFB] border border-[rgba(91,60,196,0.18)] z-10 flex items-center justify-center text-[#6A3FD0]"
              >
                <ArrowRight size={12} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AboutPage() {
  const location = useLocation();
  const { locale, prefixMode } = parseLocalizedPath(location.pathname);
  const isEn = locale === 'en';

  const waContext = { type: 'default' as const, url: location.pathname };
  const whatsappUrl = buildWhatsAppLink(waContext, locale);
  const waCtaLabel = getWhatsAppCtaLabel(locale);

  const homeHref = toLocalizedHref('/', locale, prefixMode);
  const howItWorksHref = toLocalizedHref('/cara-kerja', locale, prefixMode);
  const pricingHref = toLocalizedHref('/harga', locale, prefixMode);
  const portfolioHref = toLocalizedHref('/portfolio', locale, prefixMode);
  const caseStudiesHref = toLocalizedHref('/studi-kasus', locale, prefixMode);
  const areasHubHref = locale === 'en' ? '/en/areas' : '/id/area';

  const indexableAreas = useMemo(() => getIndexableAreas(locale), [locale]);

  const pageTitle = isEn
    ? 'About CHESTAADOTCOM: Software & AI Partner in Tangsel'
    : 'Tentang CHESTAADOTCOM: Partner Software dan AI di Tangsel';

  const pageDescription = isEn
    ? 'Meet CHESTAADOTCOM: two founders, software building experience since 2021, and how we work. Software and AI partner for businesses in South Tangerang.'
    : 'Kenali CHESTAADOTCOM: dua pendiri, pengalaman membangun sistem sejak 2021, dan cara kami bekerja. Partner software dan AI untuk bisnis di Tangerang Selatan.';

  const chestaBlogHref = toLocalizedHref('/blog?author=Chesta+Azka', locale, prefixMode);
  const zeeshanBlogHref = toLocalizedHref('/blog?author=Zeeshan', locale, prefixMode);

  // Structured Data (JSON-LD @graph)
  const jsonLdGraph = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'AboutPage',
          '@id': `https://chestaa.com${location.pathname}#webpage`,
          url: `https://chestaa.com${location.pathname}`,
          name: pageTitle,
          description: pageDescription,
          inLanguage: isEn ? 'en' : 'id',
        },
        {
          '@type': 'ProfessionalService',
          '@id': 'https://chestaa.com/#org',
          name: 'CHESTAADOTCOM',
          url: 'https://chestaa.com',
          email: 'chestaadotcom@gmail.com',
          telephone: '+62-821-2544-7232',
          sameAs: ['https://instagram.com/chestaadotcom'],
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'BSD, Tangerang Selatan',
            addressRegion: 'Banten',
            addressCountry: 'ID',
          },
          founder: [
            {
              '@type': 'Person',
              '@id': 'https://chestaa.com/#founder-chesta-azka',
              name: 'Chesta Azka',
              jobTitle: 'Co-founder',
              worksFor: { '@id': 'https://chestaa.com/#org' },
              description: isEn
                ? 'Co-founder of CHESTAADOTCOM (architecture, product, technology). Writing code since 2021 with experience building real operational systems.'
                : 'Co-founder CHESTAADOTCOM (arsitektur, produk, teknologi). Menulis kode sejak 2021 dan berpengalaman membangun sistem operasional nyata.',
            },
            {
              '@type': 'Person',
              '@id': 'https://chestaa.com/#founder-zeeshan',
              name: 'Zeeshan',
              jobTitle: 'Co-founder',
              worksFor: { '@id': 'https://chestaa.com/#org' },
              description: isEn
                ? 'Co-founder of CHESTAADOTCOM (operations and client success). Leading communication, workflow planning, and client success.'
                : 'Co-founder CHESTAADOTCOM (operasional dan client success). Memimpin komunikasi, alur kerja, dan kepuasan klien.',
            },
          ],
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
              name: isEn ? 'About Us' : 'Tentang Kami',
              item: `https://chestaa.com${location.pathname}`,
            },
          ],
        },
      ],
    }),
    [location.pathname, isEn, pageTitle, pageDescription, homeHref]
  );

  const workPrinciples = isEn
    ? [
        {
          num: '01',
          title: 'Honest about what is worth building',
          desc: 'We speak candidly if a workflow does not need automation yet.',
        },
        {
          num: '02',
          title: 'Written price and scope before you pay',
          desc: 'A proposal details inclusions, exclusions, price, schedule, and revision limits.',
        },
        {
          num: '03',
          title: 'Start with a small version that gets used',
          desc: 'One workflow first, then expanded after proven valuable.',
        },
        {
          num: '04',
          title: 'What is yours stays yours',
          desc: 'Business data remains yours, and domain and hosting are registered in your name.',
        },
        {
          num: '05',
          title: 'You always know the status',
          desc: 'Regular progress updates via WhatsApp, with one clear point of contact.',
        },
      ]
    : [
        {
          num: '01',
          title: 'Jujur soal apa yang layak dibuat',
          desc: 'Kami bilang terus terang kalau sebuah alur belum perlu diotomasi.',
        },
        {
          num: '02',
          title: 'Harga dan lingkup tertulis sebelum kamu bayar',
          desc: 'Proposal memuat yang termasuk, yang tidak termasuk, harga, jadwal, dan batas revisi.',
        },
        {
          num: '03',
          title: 'Mulai dari versi kecil yang dipakai',
          desc: 'Satu alur dulu, lalu ditambah setelah terbukti berguna.',
        },
        {
          num: '04',
          title: 'Milikmu tetap milikmu',
          desc: 'Data bisnis tetap milikmu, dan domain serta hosting atas namamu.',
        },
        {
          num: '05',
          title: 'Kamu selalu tahu statusnya',
          desc: 'Kabar progres rutin lewat WhatsApp, dan satu kontak yang jelas.',
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
              { label: isEn ? 'About Us' : 'Tentang Kami' },
            ]}
          />
        </div>

        {/* 1. HERO SECTION */}
        <section className="mb-14">
          <Reveal>
            <Badge className="mb-3">{isEn ? 'About us' : 'Tentang kami'}</Badge>
            <h1 className="font-display text-[32px] sm:text-[42px] md:text-[48px] font-semibold tracking-tight text-[#17122B] leading-[1.15] max-w-3xl">
              {isEn
                ? 'We build systems your team uses every day.'
                : 'Kami membangun sistem yang dipakai tim kamu setiap hari.'}
            </h1>
            <p className="mt-4 text-[16px] sm:text-[18px] text-[#5B5675] leading-[1.6] max-w-2xl">
              {isEn
                ? 'CHESTAADOTCOM is a technology and AI partner for business owners in South Tangerang and Greater Jakarta. We help turn repetitive work into self-running websites and systems.'
                : 'CHESTAADOTCOM adalah partner teknologi dan AI untuk pemilik bisnis di Tangerang Selatan dan Jabodetabek. Kami bantu merapikan kerjaan berulang jadi website dan sistem yang berjalan sendiri.'}
            </p>

            <div className="pt-6 flex flex-wrap items-center gap-3.5">
              <Button
                href={whatsappUrl}
                onClick={() => trackWaClick('default', 'about_hero_cta', locale)}
                variant="primary"
              >
                <MessageCircle size={16} />
                <span>{waCtaLabel}</span>
              </Button>

              <Button to={howItWorksHref} variant="secondary">
                <span>{isEn ? 'See how we work' : 'Lihat cara kerja kami'}</span>
                <ArrowRight size={15} className="text-[#6A3FD0]" />
              </Button>
            </div>
          </Reveal>

          {/* Flow Illustration Visual */}
          <div className="mt-10">
            <AboutFlowIllustration locale={locale} />
          </div>
        </section>
      </Container>

      {/* 2. TRUST STRIP */}
      <TrustStrip locale={locale} className="my-10" />

      <Container>
        {/* 3. SIAPA KAMI */}
        <section className="my-16">
          <Reveal>
            <div className="p-7 sm:p-9 rounded-[24px] bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)] space-y-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] font-semibold text-[#6A3FD0]">
                {isEn ? 'WHO WE ARE' : 'SIAPA KAMI'}
              </span>
              <h2 className="font-display text-[24px] sm:text-[28px] font-semibold text-[#17122B] tracking-tight">
                {isEn
                  ? 'Two equal co-founders with clear roles'
                  : 'Dua co-founder dengan pembagian kerja yang jelas'}
              </h2>
              <p className="text-[15px] sm:text-[16px] text-[#17122B] leading-[1.7] max-w-3xl">
                {isEn
                  ? 'CHESTAADOTCOM is run by two people with clear division of work. Chesta Azka handles architecture, product, and technology. Zeeshan handles operations and client success. Both are equal, and you always know whom to contact for what.'
                  : 'CHESTAADOTCOM dijalankan dua orang dengan pembagian yang jelas. Chesta Azka memegang arsitektur, produk, dan teknologi. Zeeshan memegang operasional dan client success. Keduanya setara, dan kamu selalu tahu siapa yang dihubungi untuk apa.'}
              </p>
            </div>
          </Reveal>
        </section>

        {/* 4. PENGALAMAN DI BALIK CHESTAADOTCOM */}
        <section className="my-16">
          <SectionHeading
            eyebrow={isEn ? 'EXPERIENCE' : 'PENGALAMAN'}
            title={
              isEn
                ? 'Experience behind CHESTAADOTCOM'
                : 'Pengalaman di balik CHESTAADOTCOM'
            }
          />

          <Reveal delay={0.05}>
            <p className="text-[15px] sm:text-[16.5px] text-[#5B5675] leading-[1.7] max-w-3xl mt-2 mb-8">
              {isEn
                ? 'Chesta has been writing code since 2021. Since then he has built systems for work that actually runs in the field, from temperature and inventory recording for a beverage brand to a logistics warehouse system. We build every system using the same three benchmarks: the numbers balance, staff can use it without long training, and someone maintains it after release.'
                : 'Chesta menulis kode sejak 2021. Sejak itu ia membangun sistem untuk pekerjaan yang benar-benar berjalan di lapangan, dari pencatatan suhu dan barang di sebuah brand minuman sampai sistem gudang logistik. Kami mengerjakan setiap sistem dengan tiga patokan yang sama: angkanya cocok, staf bisa memakainya tanpa pelatihan panjang, dan ada yang merawatnya setelah rilis.'}
            </p>
          </Reveal>

          {/* 3 Experience cards from data/experience */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {REAL_PROJECTS_EXPERIENCE.map((proj, idx) => (
              <Reveal key={proj.id} delay={0.08 * idx}>
                <Card variant="soft" className="h-full flex flex-col justify-between p-6">
                  <div>
                    <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-[#5B5675] bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)] px-2.5 py-1 rounded-full inline-block mb-3 font-medium">
                      {isEn ? proj.tagEn : proj.tagId}
                    </span>
                    <h3 className="font-display text-[18px] font-semibold text-[#17122B] leading-snug">
                      {isEn ? proj.titleEn : proj.titleId}
                    </h3>
                    <p className="mt-2.5 text-[15px] text-[#5B5675] leading-[1.6]">
                      {isEn ? proj.descriptionEn : proj.descriptionId}
                    </p>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>

          {/* Disclaimers in --ink-muted */}
          <Reveal delay={0.25}>
            <div className="mt-6 pt-5 border-t border-[rgba(91,60,196,0.14)] text-[13.5px] text-[#5B5675] space-y-1.5">
              <p className="font-medium text-[#17122B]">
                {isEn ? EXPERIENCE_FOOTER_NOTE.en : EXPERIENCE_FOOTER_NOTE.id}
              </p>
              <p className="text-[12.5px] leading-relaxed">
                {isEn ? EXPERIENCE_DISCLOSURE_NOTE.en : EXPERIENCE_DISCLOSURE_NOTE.id}
              </p>
            </div>
          </Reveal>
        </section>

        {/* 5. CARA KAMI BEKERJA (5 Vertical Principles with Large Numerals) */}
        <section className="my-16">
          <SectionHeading
            eyebrow={isEn ? 'PRINCIPLES' : 'CARA KAMI BEKERJA'}
            title={
              isEn
                ? 'Five principles guiding our work'
                : 'Cara kami bekerja'
            }
          />

          <div className="mt-8 divide-y divide-[rgba(91,60,196,0.14)] border-y border-[rgba(91,60,196,0.14)]">
            {workPrinciples.map((item) => (
              <Reveal key={item.num}>
                <div className="py-6 sm:py-7 flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8">
                  <span className="font-mono text-[24px] sm:text-[28px] font-light text-[#6A3FD0]/60 shrink-0">
                    {item.num}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-[18px] sm:text-[20px] font-semibold text-[#17122B]">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-[14.5px] sm:text-[15px] text-[#5B5675] leading-[1.6]">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* 6. DUA PENDIRI (Co-founder Cards with Photo/Monogram and Author Links) */}
        <section className="my-16">
          <SectionHeading
            eyebrow={isEn ? 'FOUNDERS' : 'DUA PENDIRI'}
            title={isEn ? 'Two co-founders' : 'Dua pendiri'}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {/* Chesta Azka */}
            <Reveal delay={0.1}>
              <Card variant="soft" className="h-full flex flex-col justify-between p-7 hover:-translate-y-1 transition-transform duration-200">
                <div>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full overflow-hidden bg-[#EFEAFB] border border-[rgba(91,60,196,0.2)] flex items-center justify-center text-[#6A3FD0] font-display font-semibold text-[18px] shrink-0">
                      <img
                        src="/favicon.svg"
                        alt="Chesta Azka"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      <span aria-hidden="true">CA</span>
                    </div>
                    <div>
                      <h3 className="font-display text-[22px] font-semibold text-[#17122B]">
                        Chesta Azka
                      </h3>
                      <p className="font-mono text-[12px] uppercase tracking-[0.06em] text-[#6A3FD0] font-semibold">
                        Co-founder · {isEn ? 'Architecture, Product & Technology' : 'Arsitektur, produk, dan teknologi'}
                      </p>
                    </div>
                  </div>

                  <p className="mt-4 text-[14.5px] text-[#5B5675] leading-[1.65]">
                    {isEn
                      ? 'Writing code since 2021. Built temperature/inventory logging, internal systems, and warehouse operations for real businesses and institutions. Writes about AI agents, software, and web performance.'
                      : 'Menulis kode sejak 2021. Mengerjakan sistem pencatatan, sistem internal, dan sistem gudang untuk bisnis dan lembaga nyata. Menulis tentang AI agent, software, dan performa web.'}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[rgba(91,60,196,0.14)]">
                  <Link
                    to={chestaBlogHref}
                    className="inline-flex items-center gap-1.5 font-medium text-[14px] text-[#6A3FD0] hover:underline"
                  >
                    <span>{isEn ? 'Read articles by Chesta' : 'Baca tulisan Chesta'}</span>
                    <ArrowUpRight size={15} />
                  </Link>
                </div>
              </Card>
            </Reveal>

            {/* Zeeshan */}
            <Reveal delay={0.15}>
              <Card variant="soft" className="h-full flex flex-col justify-between p-7 hover:-translate-y-1 transition-transform duration-200">
                <div>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full overflow-hidden bg-[#EFEAFB] border border-[rgba(91,60,196,0.2)] flex items-center justify-center text-[#6A3FD0] font-display font-semibold text-[18px] shrink-0">
                      <img
                        src="/zeeshan.png"
                        alt="Zeeshan"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      <span aria-hidden="true">Z</span>
                    </div>
                    <div>
                      <h3 className="font-display text-[22px] font-semibold text-[#17122B]">
                        Zeeshan
                      </h3>
                      <p className="font-mono text-[12px] uppercase tracking-[0.06em] text-[#6A3FD0] font-semibold">
                        Co-founder · {isEn ? 'Operations & Client Success' : 'Operasional dan client success'}
                      </p>
                    </div>
                  </div>

                  <p className="mt-4 text-[14.5px] text-[#5B5675] leading-[1.65]">
                    {isEn
                      ? 'Ensuring projects run on schedule and you always know the status. Writes about pricing, process, and working with clients.'
                      : 'Memastikan proyek berjalan sesuai jadwal dan kamu selalu tahu statusnya. Menulis tentang biaya, proses, dan cara bekerja dengan klien.'}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[rgba(91,60,196,0.14)]">
                  <Link
                    to={zeeshanBlogHref}
                    className="inline-flex items-center gap-1.5 font-medium text-[14px] text-[#6A3FD0] hover:underline"
                  >
                    <span>{isEn ? 'Read articles by Zeeshan' : 'Baca tulisan Zeeshan'}</span>
                    <ArrowUpRight size={15} />
                  </Link>
                </div>
              </Card>
            </Reveal>
          </div>
        </section>

        {/* 7. YANG BISA DAN BELUM BISA KAMI TUNJUKKAN */}
        <section className="my-16">
          <Reveal>
            <div className="p-7 sm:p-8 rounded-[24px] bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)] space-y-4">
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] font-semibold text-[#6A3FD0]">
                {isEn ? 'TRANSPARENCY' : 'TRANSPARANSI'}
              </span>
              <h2 className="font-display text-[22px] sm:text-[26px] font-semibold text-[#17122B]">
                {isEn
                  ? 'What we can and cannot show yet'
                  : 'Yang bisa dan belum bisa kami tunjukkan'}
              </h2>
              <p className="text-[15px] sm:text-[16px] text-[#17122B] leading-[1.7] max-w-3xl">
                {isEn
                  ? 'Client names are not displayed without written permission, so the experience above is written without names. Named case studies are added once clients grant permission. Meanwhile, you can view our internal projects, which we built ourselves to test the workflows.'
                  : 'Nama klien tidak kami tampilkan tanpa izin tertulis, jadi pengalaman di atas ditulis tanpa nama. Studi kasus bernama kami tambahkan setelah klien mengizinkan. Sementara itu, kamu bisa melihat proyek internal kami, yang kami bangun sendiri untuk menguji alurnya.'}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  to={caseStudiesHref}
                  className="inline-flex items-center gap-1.5 font-semibold text-[14.5px] text-[#6A3FD0] hover:underline"
                >
                  <span>{isEn ? 'View case studies' : 'Lihat studi kasus'}</span>
                  <ArrowUpRight size={15} />
                </Link>
                <span className="text-[#5B5675]/40" aria-hidden="true">·</span>
                <Link
                  to={portfolioHref}
                  className="inline-flex items-center gap-1.5 font-semibold text-[14.5px] text-[#6A3FD0] hover:underline"
                >
                  <span>{isEn ? 'View internal projects' : 'Lihat proyek'}</span>
                  <ArrowUpRight size={15} />
                </Link>
              </div>
            </div>
          </Reveal>
        </section>

        {/* 8. DI MANA KAMI BEKERJA (Location & Area Links) */}
        <section className="my-16">
          <Reveal>
            <div className="p-7 sm:p-8 rounded-[24px] bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)] space-y-4">
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-[#6A3FD0]" />
                <span className="font-mono text-[11px] uppercase tracking-[0.08em] font-semibold text-[#6A3FD0]">
                  {isEn ? 'LOCATION & SERVICE COVERAGE' : 'LOKASI & AREA LAYANAN'}
                </span>
              </div>

              <h2 className="font-display text-[22px] sm:text-[26px] font-semibold text-[#17122B]">
                {isEn ? 'Where we work' : 'Di mana kami bekerja'}
              </h2>

              <p className="text-[15px] sm:text-[16px] text-[#5B5675] leading-[1.7] max-w-3xl">
                {isEn
                  ? 'We are based in BSD, South Tangerang, and serve South Tangerang and Greater Jakarta. We work online via WhatsApp and video call, and in-person meetings in South Tangerang are possible by agreement.'
                  : 'Kami berbasis di BSD, Tangerang Selatan, dan melayani Tangerang Selatan serta Jabodetabek. Kami bekerja online lewat WhatsApp dan video call, dan tatap muka di area Tangerang Selatan dimungkinkan sesuai kesepakatan.'}
              </p>

              {/* Area Links Chips */}
              <div className="pt-2 flex flex-wrap items-center gap-2 text-[13px]">
                <Link
                  to={areasHubHref}
                  className="px-3 py-1.5 rounded-full bg-[#EFEAFB] text-[#6A3FD0] font-semibold border border-[rgba(91,60,196,0.18)] hover:bg-[#6A3FD0] hover:text-[#FFFFFF] transition-colors"
                >
                  {isEn ? 'All Service Areas Hub' : 'Indeks Area Layanan'}
                </Link>
                {indexableAreas.map((area) => (
                  <Link
                    key={area.areaSlug}
                    to={getServiceAreaPath('pembuatan-website', area.areaSlug, locale)}
                    className="px-3 py-1.5 rounded-full bg-[#F8F6FE] text-[#5B5675] font-medium border border-[rgba(91,60,196,0.12)] hover:text-[#6A3FD0] hover:border-[#6A3FD0]/30 transition-colors"
                  >
                    {area.areaName}
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        {/* 9. FINAL CTA */}
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
                  onClick={() => trackWaClick('default', 'about_bottom_cta', locale)}
                  variant="primary"
                  size="lg"
                >
                  <MessageCircle size={18} />
                  <span>{waCtaLabel}</span>
                </Button>

                <Link
                  to={pricingHref}
                  className="font-medium text-[15px] text-[#6A3FD0] hover:underline py-2 px-4"
                >
                  {isEn ? 'Or view pricing' : 'Atau lihat harga'}
                </Link>
              </div>
            </div>
          </Reveal>
        </section>
      </Container>
    </div>
  );
}
