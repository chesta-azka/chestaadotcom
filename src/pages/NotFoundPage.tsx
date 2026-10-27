import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Compass } from 'lucide-react';
import { SEO } from '../components/SEO';
import {
  PageShell,
  Container,
  Section,
  Eyebrow,
  Headline,
  Subheadline,
} from '../components/ui/DesignSystem';
import { WhatsAppButton } from '../components/atoms/WhatsAppButton';
import { useLocale } from '../hooks/useLocale';

export default function NotFoundPage() {
  const { locale, t, localizePath } = useLocale();
  const isEn = locale === 'en';

  const destinations = isEn
    ? [
        {
          title: 'Home',
          desc: 'Overview of our web, AI agent, and automation services',
          href: '/en',
        },
        {
          title: 'Services',
          desc: 'AI agents, high-speed websites, custom software, and workflow automation',
          href: '/en/services/ai-agents',
        },
        {
          title: 'Case Studies',
          desc: 'Real-world architectures, workflows, and measurable outcomes',
          href: '/en/case-studies',
        },
        {
          title: 'Blog',
          desc: 'Notes on AI agents, websites, and automation in South Tangerang',
          href: '/en/blog',
        },
        {
          title: 'Free 30-Minute Audit',
          desc: 'Map out your repetitive tasks and get an honest cost estimate',
          href: '/en/free-audit',
        },
      ]
    : [
        {
          title: 'Beranda',
          desc: 'Ringkasan layanan website, AI agent, dan otomasi sistem',
          href: '/id',
        },
        {
          title: 'Layanan',
          desc: 'AI agent, website performa tinggi, software custom, dan otomasi workflow',
          href: '/id/jasa/ai-agent',
        },
        {
          title: 'Studi Kasus',
          desc: 'Contoh nyata alur kerja sistem dan hasil terukur',
          href: '/id/studi-kasus',
        },
        {
          title: 'Blog',
          desc: 'Catatan tentang AI agent, website, dan otomasi di Tangerang Selatan',
          href: '/id/blog',
        },
        {
          title: 'Audit Gratis 30 Menit',
          desc: 'Petakan tugas berulang di bisnismu dan dapatkan perkiraan jujur',
          href: '/id/audit-gratis',
        },
      ];

  return (
    <PageShell>
      <SEO
        title={t(
          '404 Halaman Tidak Ditemukan — Navigasi Utama | CHESTAADOTCOM',
          '404 Page Not Found — Main Directory & Audit | CHESTAADOTCOM'
        )}
        description={t(
          'Halaman yang kamu cari tidak ditemukan atau sudah dipindahkan. Kembali ke beranda, layanan, studi kasus, blog, atau jadwalkan audit gratis.',
          'The page you are looking for could not be found or has moved. Return to our home page, services, case studies, blog, or book a free 30-minute audit.'
        )}
        path={localizePath('/404')}
        noindex={true}
      />

      <Section className="pt-32 pb-20 md:pt-40 md:pb-28">
        <Container className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFEAFB] border border-[#6A3FD0]/20 text-[12px] font-mono uppercase tracking-[0.12em] text-[#5B32B8] mb-6">
            <Compass className="w-3.5 h-3.5" />
            <span>
              {t('404 · HALAMAN TIDAK DITEMUKAN', '404 · PAGE NOT FOUND')}
            </span>
          </div>

          <Headline as="h1" className="text-[32px] md:text-[44px] mb-4">
            {t(
              'Halaman yang kamu cari tidak ada di sini',
              "The page you're looking for isn't here"
            )}
          </Headline>

          <Subheadline className="text-[17px] text-[var(--ink-muted)] mb-10 max-w-2xl">
            {t(
              'Tautan yang kamu buka mungkin salah ketik atau halamannya sudah dipindahkan. Kamu bisa langsung menuju salah satu halaman utama di bawah ini:',
              'The link you followed may be mistyped or the page may have moved. You can jump directly to one of our main pages below:'
            )}
          </Subheadline>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {destinations.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="p-5 rounded-[18px] bg-[#F8F6FE] border border-[var(--line)] hover:border-[#6A3FD0] transition-colors flex items-start justify-between gap-4 group"
              >
                <div>
                  <h2 className="text-[16.5px] font-semibold text-[var(--ink)] group-hover:text-[#6A3FD0] mb-1">
                    {item.title}
                  </h2>
                  <p className="text-[13.5px] text-[var(--ink-muted)] leading-snug">
                    {item.desc}
                  </p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[var(--ink-muted)] group-hover:text-[#6A3FD0] shrink-0 mt-1" />
              </Link>
            ))}
          </div>

          <div className="p-6 md:p-7 rounded-[20px] bg-white border border-[var(--line-strong)] flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div>
              <h3 className="text-[16px] font-semibold text-[var(--ink)] mb-1">
                {t(
                  'Ingin langsung berdiskusi dengan tim kami?',
                  'Want to talk directly with our engineering team?'
                )}
              </h3>
              <p className="text-[14px] text-[var(--ink-muted)]">
                {t(
                  'Ceritakan kebutuhanmu langsung lewat WhatsApp.',
                  'Tell us what you are looking for directly on WhatsApp.'
                )}
              </p>
            </div>
            <WhatsAppButton
              context={{ type: 'default' }}
              location="404_page_cta"
              variant="secondary"
              size="md"
              className="shrink-0"
            />
          </div>
        </Container>
      </Section>
    </PageShell>
  );
}
