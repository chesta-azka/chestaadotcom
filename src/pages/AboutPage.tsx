import React from 'react';
import { useLocation } from 'react-router-dom';
import { Check, Sparkles } from 'lucide-react';
import SEOMetadata from '../components/atoms/SEOMetadata';
import {
  Container,
  Breadcrumb,
  Card,
  Tag,
  CTABlock,
} from '../components/ui/DesignSystem';
import { parseLocalizedPath, toLocalizedHref } from '../lib/i18n';

export default function AboutPage() {
  const location = useLocation();
  const { locale, prefixMode } = parseLocalizedPath(location.pathname);
  const isEn = locale === 'en';

  const principles = isEn
    ? [
        'Talk directly with the builders: You consult directly with Chesta and Zeeshan from day one until the system is live.',
        'Transparent pricing: Websites and landing pages start at IDR 1,200,000. AI agent and custom systems are priced clearly after a 30-minute workflow audit.',
        'Your data stays yours: You choose where your data is stored (on-premise or private cloud), and full source code and admin access are handed over.',
        'No fake claims: No fabricated awards or invented metrics. We show working workflow demos and real production code.',
        'Flexible operating coverage: In-person discussions in BSD City, Alam Sutera, Bintaro, Gading Serpong, and Greater Jakarta, or online anytime.',
      ]
    : [
        'Bicara langsung dengan pembuatnya: Kamu berkonsultasi langsung dengan Chesta dan Zeeshan dari hari pertama sampai sistem berjalan.',
        'Transparansi harga: Website dan landing page mulai Rp1.200.000. Sistem AI agent dan custom dihitung jelas setelah audit alur kerja 30 menit.',
        'Data milikmu sepenuhnya: Penyimpanan data dapat kamu tentukan sendiri (on-premise atau private cloud), source code dan akses admin diserahkan lengkap.',
        'Bebas klaim fiktif: Tidak ada penghargaan buatan atau metrik karangan. Kami menunjukkan demo alur dan kode nyata.',
        'Area operasional fleksibel: Diskusi tatap muka di BSD City, Alam Sutera, Bintaro, Gading Serpong, dan Jabodetabek, atau daring kapan saja.',
      ];

  return (
    <div className="bg-[#FFFFFF] text-[#17122B] min-h-screen pt-28 pb-16 md:pb-24">
      <SEOMetadata
        title={
          isEn
            ? 'About CHESTAADOTCOM — Custom Software & AI Agent Partner in BSD & South Tangerang'
            : 'Tentang CHESTAADOTCOM — Partner Software & AI Agent di BSD & Tangsel'
        }
        description={
          isEn
            ? 'Meet Chesta Azka (Architecture, Product & Tech) and Zeeshan (Operations & Client Success), co-founders of CHESTAADOTCOM building custom software and AI agents for businesses in BSD City, South Tangerang, and Greater Jakarta.'
            : 'Kenali Chesta Azka (Architecture, Product & Tech) dan Zeeshan (Operations & Client Success), co-founder CHESTAADOTCOM yang membangun software custom dan AI agent untuk bisnis di BSD City, Tangerang Selatan, dan Jabodetabek.'
        }
        path={toLocalizedHref('/about', locale, prefixMode)}
      />

      <Container>
        <Breadcrumb items={[{ label: isEn ? 'About Us' : 'Tentang Kami' }]} />

        <header className="max-w-3xl mb-12">
          <Tag>{isEn ? 'ABOUT CHESTAADOTCOM' : 'TENTANG CHESTAADOTCOM'}</Tag>
          <h1 className="mt-2">
            {isEn
              ? 'We build systems that run on their own, so your team can focus on what matters'
              : 'Kami membangun sistem yang jalan sendiri, supaya tim kamu fokus ke hal penting'}
          </h1>
          <p className="mt-4 text-[15px] md:text-[16px] text-[#5B5675] leading-[1.65]">
            {isEn
              ? 'CHESTAADOTCOM was co-founded by Chesta Azka and Zeeshan in BSD City, South Tangerang. We help clinics, F&B brands, property teams, professional services, and SMBs across Greater Jakarta solve real operational bottlenecks: piling WhatsApp chats, missed follow-ups, and repetitive data copying across apps.'
              : 'CHESTAADOTCOM didirikan bersama oleh Chesta Azka dan Zeeshan di BSD City, Tangerang Selatan. Kami membantu klinik, F&B, properti, jasa profesional, dan UKM di Jabodetabek menyelesaikan kendala operasional nyata: chat WhatsApp yang menumpuk, follow-up terlewat, dan salin data berulang antar-aplikasi.'}
          </p>
        </header>

        {/* Co-Founders Section (Equal) */}
        <section aria-label="Co-Founders" className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 items-stretch">
          <Card variant="soft" padding="lg" className="h-full">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-[16px] overflow-hidden bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)] shrink-0">
                <img
                  src="/chesta.png"
                  alt="Chesta Azka — Co-Founder CHESTAADOTCOM"
                  width={56}
                  height={56}
                  loading="lazy"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div>
                <h2>Chesta Azka</h2>
                <Tag className="block mt-0.5">Co-Founder · Architecture, Product, Tech</Tag>
              </div>
            </div>
            <p className="mt-4 text-[15px] text-[#5B5675] leading-[1.65]">
              {isEn
                ? 'Responsible for system architecture, tech stack selection (React, Node.js, Python, PostgreSQL), WhatsApp Cloud API integration, AI safety guardrails, and Core Web Vitals performance across every shipped website.'
                : 'Bertanggung jawab atas arsitektur sistem, pemilihan tech stack (React, Node.js, Python, PostgreSQL), integrasi WhatsApp Cloud API, guardrails keamanan AI, serta performa Core Web Vitals pada setiap website yang dirilis.'}
            </p>
          </Card>

          <Card variant="soft" padding="lg" className="h-full">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-[16px] bg-[#EFEAFB] border border-[rgba(91,60,196,0.14)] flex items-center justify-center font-mono font-semibold text-[18px] text-[#6A3FD0] shrink-0">
                Z
              </div>
              <div>
                <h2>Zeeshan</h2>
                <Tag className="block mt-0.5">Co-Founder · Operations, Client Success</Tag>
              </div>
            </div>
            <p className="mt-4 text-[15px] text-[#5B5675] leading-[1.65]">
              {isEn
                ? 'Responsible for mapping client business workflows, drafting response SOPs, human handover scenarios, release schedules, and hands-on support during and after launch.'
                : 'Bertanggung jawab atas pemetaan alur kerja bisnis klien, penyusunan SOP respon, skenario pengalihan ke staf manusia (human handover), jadwal rilis, serta pendampingan langsung selama dan setelah sistem aktif.'}
            </p>
          </Card>
        </section>

        {/* Operating Principles */}
        <Card variant="soft" padding="lg" className="mb-16">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={16} className="text-[#6A3FD0]" />
            <Tag>{isEn ? 'HOW WE WORK' : 'CARA KAMI BEKERJA'}</Tag>
          </div>
          <h2>
            {isEn
              ? 'No middlemen, no fake numbers, no vendor lock-in'
              : 'Tanpa perantara, tanpa angka palsu, tanpa ketergantungan sepihak'}
          </h2>

          <div className="mt-6 space-y-3 text-[15px] text-[#5B5675]">
            {principles.map((principle, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <Check size={16} className="text-[#6A3FD0] shrink-0 mt-1" />
                <span className="leading-[1.65]">{principle}</span>
              </div>
            ))}
          </div>
        </Card>

        <CTABlock
          title={
            isEn
              ? 'Want a casual chat about your business needs?'
              : 'Mau ngobrol santai tentang kebutuhan bisnismu?'
          }
          description={
            isEn
              ? 'Send us a WhatsApp message or invite us to meet for a 30-minute workflow audit at no cost and with zero obligation.'
              : 'Kirimkan pesan via WhatsApp atau ajak kami bertemu untuk audit alur kerja selama 30 menit tanpa biaya dan tanpa komitmen.'
          }
        />
      </Container>
    </div>
  );
}
