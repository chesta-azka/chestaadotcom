import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  ArrowUpRight,
  Clock,
  Sparkles,
  Copy,
  Check,
  MapPin,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { SEO } from '../components/SEO';
import {
  PageShell,
  Container,
  Section,
  Eyebrow,
  Headline,
  Subheadline,
  FAQAccordion,
} from '../components/ui/DesignSystem';
import { WhatsAppButton } from '../components/atoms/WhatsAppButton';
import TrustStrip from '../components/atoms/TrustStrip';
import { useLocale } from '../hooks/useLocale';
import {
  buildWhatsAppLink,
  buildWhatsAppMessage,
  getWhatsAppCtaLabel,
} from '../lib/whatsapp';
import { trackAuditFormCompose, trackWaClick } from '../lib/analytics';

export default function FreeAuditPage() {
  const { locale, t, localizePath } = useLocale();
  const isEn = locale === 'en';

  const [name, setName] = useState('');
  const [business, setBusiness] = useState('');
  const [need, setNeed] = useState(
    isEn ? 'AI Agent & WhatsApp Automation' : 'AI Agent & Otomasi WhatsApp'
  );
  const [story, setStory] = useState('');
  const [submittedLink, setSubmittedLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [zeeshanImgError, setZeeshanImgError] = useState(false);

  const needOptions = isEn
    ? [
        'AI Agent & WhatsApp Automation',
        'High-Conversion Website & Landing Page',
        'Custom Software & Internal Dashboard',
        'Local SEO & GEO Optimization',
        'Not sure yet — help me map it out',
      ]
    : [
        'AI Agent & Otomasi WhatsApp',
        'Website & Landing Page Konversi Tinggi',
        'Software Kustom & Dashboard Internal',
        'SEO Lokal & Optimasi GEO',
        'Belum yakin — bantu petakan dulu',
      ];

  const composedContext = useMemo(
    () => ({
      type: 'audit-composed' as const,
      name: name.trim() || undefined,
      business: business.trim() || undefined,
      need: need.trim() || undefined,
      story: story.trim() || undefined,
      pageUrl: isEn
        ? 'https://chestaa.com/en/free-audit'
        : 'https://chestaa.com/id/audit-gratis',
    }),
    [name, business, need, story, isEn]
  );

  const composedWaUrl = useMemo(
    () => buildWhatsAppLink(composedContext, locale),
    [composedContext, locale]
  );

  const composedPreviewMessage = useMemo(
    () => buildWhatsAppMessage(composedContext, locale),
    [composedContext, locale]
  );

  const handleComposeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    trackAuditFormCompose(need, Boolean(story.trim()), locale);
    trackWaClick('audit-composed', 'audit_form_submit', locale);
    setSubmittedLink(composedWaUrl);
    if (typeof window !== 'undefined') {
      window.open(composedWaUrl, '_blank', 'noopener');
    }
  };

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(composedPreviewMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Ignore clipboard failures
    }
  };

  const whatYouGet = isEn
    ? [
        {
          title: 'A map of repetitive tasks in your business',
          desc: 'We trace where your team loses hours every day on manual chat replies, data entry, or spreadsheet copy-pasting.',
        },
        {
          title: 'Honest recommendation: what is worth building or automating, and what is not',
          desc: 'If a simple tool or process tweak solves your problem without custom code, we will tell you upfront.',
        },
        {
          title: 'Cost and timeline estimate before you pay anything',
          desc: 'Clear scope, realistic timeline, and transparent investment range so you can decide calmly with zero pressure.',
        },
      ]
    : [
        {
          title: 'Peta tugas berulang di bisnismu',
          desc: 'Kita telusuri di bagian mana timmu habis waktu setiap hari karena balas chat manual, rekap data, atau pindah-pindah spreadsheet.',
        },
        {
          title: 'Rekomendasi jujur: mana yang layak dibuat atau diotomasi, mana yang tidak',
          desc: 'Kalau masalahmu sebenarnya cukup diselesaikan dengan perbaikan alur sederhana tanpa bikin sistem mahal, kami bilang apa adanya.',
        },
        {
          title: 'Perkiraan biaya dan waktu sebelum kamu membayar apa pun',
          desc: 'Ruang lingkup jelas, estimasi waktu pengerjaan realistis, dan kisaran biaya transparan supaya kamu bisa menimbang dengan tenang.',
        },
      ];

  const rightForList = isEn
    ? [
        'Clinics & healthcare practices',
        'Cafes & restaurants (F&B)',
        'Property & boarding houses (kos-kosan)',
        'Professional services & agencies',
        'Established SMEs (UMKM yang sudah berjalan)',
      ]
    : [
        'Klinik',
        'Kafe dan restoran',
        'Properti dan kos-kosan',
        'Jasa profesional',
        'UMKM yang sudah berjalan',
      ];

  const howItWorksSteps = isEn
    ? [
        {
          step: '01',
          title: 'You fill in a short summary or chat directly',
          desc: 'Use the summary composer below or click the WhatsApp button right away if you prefer to talk directly.',
        },
        {
          step: '02',
          title: 'We meet online or in person in the South Tangerang area by agreement',
          desc: 'A focused 30-minute session via Google Meet or face-to-face around BSD, Alam Sutera, Bintaro, or Gading Serpong.',
        },
        {
          step: '03',
          title: 'You receive recommendations and estimates, with no obligation to proceed',
          desc: 'You keep the workflow diagnosis, priority roadmap, and budget range whether we work together or not.',
        },
      ]
    : [
        {
          step: '01',
          title: 'Kamu mengisi ringkasan singkat atau chat langsung',
          desc: 'Isi ringkasan singkat di bawah agar obrolan lebih terarah, atau langsung klik tombol WhatsApp kalau kamu lebih suka cerita langsung.',
        },
        {
          step: '02',
          title: 'Kita bertemu online atau tatap muka di area Tangerang Selatan sesuai kesepakatan',
          desc: 'Sesi fokus 30 menit lewat Google Meet atau ketemu langsung di sekitar BSD, Alam Sutera, Bintaro, atau Gading Serpong.',
        },
        {
          step: '03',
          title: 'Kamu menerima rekomendasi dan perkiraan, tanpa kewajiban lanjut',
          desc: 'Hasil pemetaan alur, prioritas perbaikan, dan kisaran biaya jadi milikmu sepenuhnya tanpa paksaan untuk lanjut proyek.',
        },
      ];

  const prepareChecklist = isEn
    ? [
        'An overview of the repetitive work that takes the most time',
        'The apps or spreadsheets you currently use',
        'Sample conversations or data (with sensitive information redacted)',
        'The outcome you want to achieve',
      ]
    : [
        'Gambaran kerjaan berulang yang paling menyita waktu',
        'Aplikasi atau spreadsheet yang sekarang dipakai',
        'Contoh percakapan atau data (informasi sensitif disamarkan)',
        'Hasil yang kamu inginkan',
      ];

  const faqs = isEn
    ? [
        {
          q: 'Is this 30-minute audit really free with no hidden commitment?',
          a: 'Yes, 100% free. We use this 30-minute session to understand your operational bottleneck and give you an honest assessment. You are under no obligation to hire us afterward.',
        },
        {
          q: 'Who will I be speaking with during the audit session?',
          a: 'You speak directly with our co-founders and engineers, Chesta Azka or Zeeshan—not a sales representative reading from a script.',
        },
        {
          q: 'Do I have to prepare technical documents before our call?',
          a: 'No technical specs needed. Just bring a rough picture of your daily workflow, the spreadsheets or apps you currently use, and the bottleneck you want to fix.',
        },
        {
          q: 'Can we meet in person in BSD or South Tangerang?',
          a: 'Yes. We are based in BSD, South Tangerang. We can meet online via Google Meet or in person around BSD, Alam Sutera, Gading Serpong, or Bintaro by appointment.',
        },
      ]
    : [
        {
          q: 'Apakah audit 30 menit ini benar-benar gratis tanpa ikatan?',
          a: 'Ya, 100% gratis. Sesi 30 menit ini kami gunakan untuk membedah alur kerjamu secara jujur. Kamu tidak punya kewajiban apa pun untuk lanjut membayar proyek setelah sesi selesai.',
        },
        {
          q: 'Siapa yang akan berdiskusi langsung dengan saya?',
          a: 'Kamu akan langsung berdiskusi dengan co-founder sekaligus engineer kami, Chesta Azka atau Zeeshan—bukan tim sales yang hanya membaca skrip penawaran.',
        },
        {
          q: 'Apakah saya harus menyiapkan dokumen teknis sebelum diskusi?',
          a: 'Sama sekali tidak perlu. Cukup ceritakan gambaran kerjaan harian yang paling bikin capek, aplikasi atau spreadsheet yang sekarang dipakai, serta hasil yang kamu harapkan.',
        },
        {
          q: 'Apakah bisa ketemu tatap muka di area BSD atau Tangerang Selatan?',
          a: 'Bisa. Kami berbasis di BSD, Tangerang Selatan. Pertemuan bisa dilakukan online via Google Meet atau tatap muka di area BSD, Alam Sutera, Gading Serpong, maupun Bintaro sesuai kesepakatan.',
        },
      ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  return (
    <PageShell>
      <SEO
        title={t(
          'Audit Gratis 30 Menit Alur Kerja & Otomasi Bisnis | CHESTAADOTCOM',
          'Free 30-Minute Business Workflow & AI Audit | CHESTAADOTCOM'
        )}
        description={t(
          'Ceritakan kerjaan berulang yang paling bikin capek di bisnismu. Dapatkan peta alur kerja, rekomendasi jujur, dan perkiraan biaya gratis dalam 30 menit.',
          'Tell us the repetitive work tiring your team. Get a workflow map, honest recommendation, and transparent cost estimate in a free 30-minute audit.'
        )}
        path={isEn ? '/en/free-audit' : '/id/audit-gratis'}
        schemas={[faqSchema]}
        breadcrumbs={[
          { name: t('Beranda', 'Home'), url: localizePath('/') },
          {
            name: t('Audit Gratis 30 Menit', 'Free 30-Minute Audit'),
            url: localizePath('/audit-gratis'),
          },
        ]}
      />

      {/* HERO */}
      <Section className="pt-32 pb-16 md:pt-40 md:pb-24 border-b border-[var(--line)] bg-gradient-to-b from-[#F4F0FF]/80 via-[#F8F6FE] to-[#FFFFFF]">
        <Container className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFEAFB] border border-[#6A3FD0]/20 text-[12px] font-mono uppercase tracking-[0.12em] text-[#5B32B8] mb-6">
            <Clock className="w-3.5 h-3.5" />
            <span>
              {t(
                'SESI KONSULTASI & PEMETAAN · TANPA KEWAJIBAN LANJUT',
                'WORKFLOW & AUTOMATION AUDIT · NO OBLIGATION'
              )}
            </span>
          </div>

          <Headline as="h1" className="mb-6">
            {t(
              'Audit gratis 30 menit untuk alur kerja bisnismu',
              'Free 30-minute audit for your business workflow'
            )}
          </Headline>

          <Subheadline className="mb-9 max-w-2xl text-[18px] md:text-[20px] leading-[1.6] text-[var(--ink-muted)]">
            {t(
              'Ceritakan kerjaan yang paling bikin capek. Kami bilang jujur apakah bisa dikerjakan, dan berapa kira-kira biayanya.',
              "Tell us the work that tires your team the most. We'll tell you honestly whether it can be built or automated, and roughly what it will cost."
            )}
          </Subheadline>

          <div className="flex flex-wrap items-center gap-4">
            <WhatsAppButton
              context={{
                type: 'default',
                pageUrl: isEn
                  ? 'https://chestaa.com/en/free-audit'
                  : 'https://chestaa.com/id/audit-gratis',
              }}
              location="audit_hero_primary"
              variant="primary"
              size="lg"
            />
            <a
              href="#susun-ringkasan"
              className="inline-flex items-center justify-center rounded-full px-6 py-3.5 text-[15px] font-medium text-[var(--ink)] bg-white border border-[var(--line-strong)] hover:border-[var(--purple-600)] hover:text-[var(--purple-700)] transition-colors"
            >
              {t('Atau isi ringkasan 1 menit', 'Or fill a 1-minute summary')}
            </a>
          </div>
        </Container>
      </Section>

      {/* Trust Strip */}
      <TrustStrip locale={locale} />

      {/* YANG KAMU DAPAT & COCOK UNTUK */}
      <Section className="py-16 md:py-24 border-b border-[var(--line)]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7">
              <Eyebrow className="mb-3">
                {t('YANG KAMU DAPAT', 'WHAT YOU GET')}
              </Eyebrow>
              <Headline as="h2" className="text-[28px] md:text-[36px] mb-8">
                {t(
                  'Tiga hal konkret dari sesi 30 menit',
                  'Three concrete takeaways from 30 minutes'
                )}
              </Headline>

              <div className="space-y-5">
                {whatYouGet.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-[20px] bg-[#F8F6FE] border border-[var(--line)] flex items-start gap-4"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#EFEAFB] border border-[#6A3FD0]/25 text-[#5B32B8] font-mono text-sm font-semibold flex items-center justify-center shrink-0 mt-0.5">
                      0{idx + 1}
                    </div>
                    <div>
                      <h3 className="text-[18px] font-semibold text-[var(--ink)] mb-1.5 leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-[15px] text-[var(--ink-muted)] leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="p-7 md:p-8 rounded-[24px] bg-white border border-[var(--line-strong)] shadow-[0_12px_32px_-16px_rgba(23,18,43,0.06)]">
                <Eyebrow className="mb-3">
                  {t('COCOK UNTUK', 'RIGHT FOR')}
                </Eyebrow>
                <h2 className="text-[22px] font-semibold text-[var(--ink)] mb-4 leading-snug">
                  {t(
                    'Bisnis yang sudah jalan dan mulai kewalahan urusan operasional harian',
                    'Operating businesses that are outgrowing manual daily workflows'
                  )}
                </h2>
                <p className="text-[15px] text-[var(--ink-muted)] mb-6 leading-relaxed">
                  {t(
                    'Audit ini paling bermanfaat untuk pemilik usaha atau tim operasional di:',
                    'This audit is most valuable for business owners and operations teams in:'
                  )}
                </p>

                <ul className="space-y-3 mb-8">
                  {rightForList.map((sector) => (
                    <li
                      key={sector}
                      className="flex items-center gap-3 text-[15px] font-medium text-[var(--ink)] px-4 py-3 rounded-xl bg-[#F8F6FE] border border-[var(--line)]"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#6A3FD0] shrink-0" />
                      <span>{sector}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-5 border-t border-[var(--line)] flex items-start gap-3 text-[13px] text-[var(--ink-muted)]">
                  <MapPin className="w-4 h-4 text-[#6A3FD0] shrink-0 mt-0.5" />
                  <span>
                    {t(
                      'Berbasis di BSD, Tangerang Selatan. Melayani diskusi online seluruh Indonesia atau tatap muka di area Tangsel.',
                      'Based in BSD, South Tangerang. Available online across Indonesia or in person around South Tangerang.'
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* CARA KERJA AUDIT & SIAPKAN INI */}
      <Section className="py-16 md:py-24 bg-[#F8F6FE] border-b border-[var(--line)]">
        <Container>
          <div className="mb-12 max-w-2xl">
            <Eyebrow className="mb-3">
              {t('CARA KERJA AUDIT', 'HOW THE AUDIT WORKS')}
            </Eyebrow>
            <Headline as="h2" className="text-[28px] md:text-[36px]">
              {t(
                'Sederhana, langsung ke inti masalah',
                'Simple, direct, and focused on your bottleneck'
              )}
            </Headline>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
            {howItWorksSteps.map((item) => (
              <div
                key={item.step}
                className="p-7 rounded-[20px] bg-white border border-[var(--line)] flex flex-col justify-between"
              >
                <div>
                  <span className="inline-block font-mono text-[13px] font-semibold text-[#6A3FD0] px-3 py-1 rounded-full bg-[#EFEAFB] mb-4">
                    {t(`Langkah ${item.step}`, `Step ${item.step}`)}
                  </span>
                  <h3 className="text-[19px] font-semibold text-[var(--ink)] mb-2.5 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-[15px] text-[var(--ink-muted)] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* SIAPKAN INI CHECKLIST */}
          <div className="p-7 md:p-9 rounded-[24px] bg-white border border-[var(--line-strong)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5">
                <Eyebrow className="mb-2">
                  {t('SIAPKAN INI', 'PREPARE THIS')}
                </Eyebrow>
                <h3 className="text-[22px] md:text-[26px] font-semibold text-[var(--ink)] mb-3 leading-snug">
                  {t(
                    'Empat hal sederhana agar sesi 30 menit kita maksimal',
                    'Four simple things to make the most of our 30 minutes'
                  )}
                </h3>
                <p className="text-[15px] text-[var(--ink-muted)] leading-relaxed">
                  {t(
                    'Tidak perlu membuat dokumen rapi. Cukup siapkan bayangan singkat tentang empat poin ini:',
                    'No need to write a formal document. Just have a rough idea of these four points:'
                  )}
                </p>
              </div>
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {prepareChecklist.map((checkItem, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-2xl bg-[#F8F6FE] border border-[var(--line)] flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#6A3FD0] shrink-0 mt-0.5" />
                    <span className="text-[14.5px] font-medium text-[var(--ink)] leading-snug">
                      {checkItem}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* COMPOSE-ONLY FORM */}
      <Section id="susun-ringkasan" className="py-16 md:py-24 border-b border-[var(--line)]">
        <Container className="max-w-4xl">
          <div className="mb-10">
            <Eyebrow className="mb-3">
              {t('SUSUN PESAN AUDIT', 'COMPOSE YOUR AUDIT SUMMARY')}
            </Eyebrow>
            <Headline as="h2" className="text-[28px] md:text-[36px] mb-3">
              {t(
                'Isi ringkasan singkat (atau langsung chat)',
                'Fill in a short summary (or chat directly)'
              )}
            </Headline>
            <p className="text-[16px] text-[var(--ink-muted)] max-w-2xl">
              {t(
                'Formulir ini tidak menyimpan data ke server atau memasang cookie. Saat kamu klik tombol WhatsApp di bawah, ringkasanmu langsung tersusun rapi di aplikasi WhatsApp-mu.',
                'This form stores nothing on a server and sets no cookies. When you click the WhatsApp button below, your summary is neatly prefilled inside your WhatsApp app.'
              )}
            </p>
          </div>

          <form
            onSubmit={handleComposeSubmit}
            className="p-7 md:p-10 rounded-[24px] bg-[#F8F6FE] border border-[var(--line-strong)] space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="audit-name"
                  className="block text-[14px] font-medium text-[var(--ink)] mb-2"
                >
                  {t('Nama panggilanmu', 'Your name')}{' '}
                  <span className="text-[var(--ink-muted)] font-normal">
                    ({t('opsional', 'optional')})
                  </span>
                </label>
                <input
                  id="audit-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t('Contoh: Budi', 'e.g. Alex')}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-[var(--line-strong)] text-[15px] text-[var(--ink)] placeholder:text-[var(--ink-muted)]/60 focus:outline-none focus:border-[#6A3FD0]"
                />
              </div>

              <div>
                <label
                  htmlFor="audit-business"
                  className="block text-[14px] font-medium text-[var(--ink)] mb-2"
                >
                  {t('Jenis usaha / bidang', 'Business type / industry')}{' '}
                  <span className="text-[var(--ink-muted)] font-normal">
                    ({t('opsional', 'optional')})
                  </span>
                </label>
                <input
                  id="audit-business"
                  type="text"
                  value={business}
                  onChange={(e) => setBusiness(e.target.value)}
                  placeholder={t(
                    'Contoh: Klinik gigi di BSD / Kafe di Bintaro',
                    'e.g. Dental clinic in BSD / Cafe in Bintaro'
                  )}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-[var(--line-strong)] text-[15px] text-[var(--ink)] placeholder:text-[var(--ink-muted)]/60 focus:outline-none focus:border-[#6A3FD0]"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="audit-need"
                className="block text-[14px] font-medium text-[var(--ink)] mb-2"
              >
                {t('Kebutuhan utama saat ini', 'Primary focus area')}
              </label>
              <select
                id="audit-need"
                value={need}
                onChange={(e) => setNeed(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white border border-[var(--line-strong)] text-[15px] text-[var(--ink)] focus:outline-none focus:border-[#6A3FD0]"
              >
                {needOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="audit-story"
                className="block text-[14px] font-medium text-[var(--ink)] mb-2"
              >
                {t(
                  'Cerita singkat kerjaan berulang yang ingin dibereskan',
                  'Short note on the repetitive task or bottleneck you want to fix'
                )}{' '}
                <span className="text-[var(--ink-muted)] font-normal">
                  ({t('opsional', 'optional')})
                </span>
              </label>
              <textarea
                id="audit-story"
                rows={4}
                value={story}
                onChange={(e) => setStory(e.target.value)}
                placeholder={t(
                  'Contoh: Admin kami setiap hari kewalahan balas chat jadwal reservasi di WhatsApp dan harus pindahin manual ke Google Sheet...',
                  'e.g. Our admin spends hours every day replying to booking chats on WhatsApp and copying them into Google Sheets...'
                )}
                className="w-full px-4 py-3 rounded-xl bg-white border border-[var(--line-strong)] text-[15px] text-[var(--ink)] placeholder:text-[var(--ink-muted)]/60 focus:outline-none focus:border-[#6A3FD0]"
              />
            </div>

            {/* Live message preview */}
            <div className="p-4 rounded-xl bg-white border border-[var(--line)]">
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-[12px] font-mono uppercase tracking-wider text-[var(--ink-muted)]">
                  {t('Pratinjau pesan WhatsApp:', 'WhatsApp message preview:')}
                </span>
                <button
                  type="button"
                  onClick={handleCopyMessage}
                  className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#6A3FD0] hover:text-[#5B32B8]"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>{t('Tersalin', 'Copied')}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{t('Salin teks', 'Copy text')}</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-[14px] text-[var(--ink)] font-mono break-words">
                {composedPreviewMessage}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-2 text-[13px] text-[var(--ink-muted)]">
                <ShieldCheck className="w-4 h-4 text-[#6A3FD0] shrink-0" />
                <span>
                  {t(
                    'Tanpa database · Tanpa spam · Langsung ke WhatsApp kamu',
                    'No database · No spam · Opens directly in your WhatsApp'
                  )}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--purple-600)] text-white px-7 py-3.5 text-[15px] font-medium hover:bg-[var(--purple-700)] transition-colors cursor-pointer"
                >
                  <span>{getWhatsAppCtaLabel(locale)}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Inline fallback after submit AND plain progressive-enhancement anchor */}
            <div className="pt-4 border-t border-[var(--line)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[13px] text-[var(--ink-muted)]">
              <span>
                {submittedLink
                  ? t(
                      'Tab WhatsApp sudah dibuka. Jika belum terbuka otomatis, gunakan tautan langsung ini:',
                      'WhatsApp opened in a new tab. If it was blocked by your browser, use this direct link:'
                    )
                  : t(
                      'Ingin langsung membuka tautan tanpa tombol kirim?',
                      'Prefer to open the direct WhatsApp link right away?'
                    )}
              </span>
              <a
                href={composedWaUrl}
                target="_blank"
                rel="noopener"
                onClick={() =>
                  trackWaClick('audit-composed', 'audit_form_direct_link', locale)
                }
                className="inline-flex items-center gap-1.5 font-medium text-[#6A3FD0] hover:underline shrink-0"
              >
                <span>{getWhatsAppCtaLabel(locale)}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </form>
        </Container>
      </Section>

      {/* CO-FOUNDER TRUST STRIP */}
      <Section className="py-16 md:py-20 bg-[#F8F6FE] border-b border-[var(--line)]">
        <Container className="max-w-4xl">
          <div className="p-7 md:p-9 rounded-[24px] bg-white border border-[var(--line)] flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="space-y-2 max-w-xl">
              <Eyebrow>
                {t('DISKUSI LANGSUNG DENGAN ENGINEER', 'SPEAK DIRECTLY WITH ENGINEERS')}
              </Eyebrow>
              <h3 className="text-[22px] font-semibold text-[var(--ink)]">
                {t(
                  'Ditangani langsung oleh Chesta Azka & Zeeshan',
                  'Handled directly by co-founders Chesta Azka & Zeeshan'
                )}
              </h3>
              <p className="text-[15px] text-[var(--ink-muted)] leading-relaxed">
                {t(
                  'Di CHESTAADOTCOM, orang yang berdiskusi denganmu saat audit adalah orang yang sama yang merancang arsitektur dan menulis kodenya.',
                  'At CHESTAADOTCOM, the people you speak with during the audit are the exact same engineers who design the architecture and write the code.'
                )}
              </p>
              <div className="pt-2">
                <Link
                  to={localizePath('/about')}
                  className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[#6A3FD0] hover:text-[#5B32B8]"
                >
                  <span>
                    {t(
                      'Kenali profil & prinsip kerja kami',
                      'Read our story & working principles'
                    )}
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <div className="flex -space-x-3">
                <img
                  src="/favicon.svg"
                  alt="Chesta Azka"
                  width={56}
                  height={56}
                  className="w-14 h-14 rounded-full object-cover border-2 border-white bg-[#EFEAFB]"
                />
                {!zeeshanImgError ? (
                  <img
                    src="/zeeshan.png"
                    alt="Zeeshan"
                    width={56}
                    height={56}
                    onError={() => setZeeshanImgError(true)}
                    className="w-14 h-14 rounded-full object-cover border-2 border-white bg-[#EFEAFB]"
                  />
                ) : (
                  <div
                    aria-label="Zeeshan"
                    className="w-14 h-14 rounded-full border-2 border-white bg-[#EFEAFB] text-[#5B32B8] font-semibold text-lg flex items-center justify-center"
                  >
                    Z
                  </div>
                )}
              </div>
              <div className="text-[13px]">
                <div className="font-semibold text-[var(--ink)]">
                  Chesta Azka & Zeeshan
                </div>
                <div className="text-[var(--ink-muted)]">
                  Co-founders · BSD, Tangerang Selatan
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section className="py-16 md:py-24">
        <Container className="max-w-3xl">
          <div className="mb-10">
            <Eyebrow className="mb-3">{t('PERTANYAAN UMUM', 'FAQ')}</Eyebrow>
            <Headline as="h2" className="text-[28px] md:text-[36px]">
              {t(
                'Hal yang sering ditanyakan sebelum sesi audit',
                'Common questions before booking the audit'
              )}
            </Headline>
          </div>
          <FAQAccordion
            items={faqs.map((f) => ({ question: f.q, answer: f.a }))}
          />
        </Container>
      </Section>
    </PageShell>
  );
}
