import React from 'react';
import { useLocation } from 'react-router-dom';
import { Check } from 'lucide-react';
import SEOMetadata from '../components/atoms/SEOMetadata';
import {
  Container,
  Breadcrumb,
  Card,
  Badge,
  Tag,
  CTABlock,
} from '../components/ui/DesignSystem';
import { parseLocalizedPath, toLocalizedHref } from '../lib/i18n';

export default function WorkflowPage() {
  const location = useLocation();
  const { locale, prefixMode } = parseLocalizedPath(location.pathname);
  const isEn = locale === 'en';

  const steps = isEn
    ? [
        {
          num: '01',
          title: 'Free 30-Minute Audit (Online / In-Person in South Tangerang)',
          duration: 'Day 1',
          detail:
            'We dissect the exact workflow bottlenecks in your business. We tell you honestly which parts are worth automating with an AI agent and which should stay with your human team.',
          outputs: [
            'Current vs optimized workflow diagram',
            'Automation vs manual work recommendation',
            'Zero cost and zero obligation to proceed',
          ],
        },
        {
          num: '02',
          title: 'Fixed Scope & System Architecture',
          duration: 'Days 2–4',
          detail:
            'We draft the technical diagram, tool integration choices (WhatsApp Cloud API, PostgreSQL, n8n, Sheets), and a fixed price with no surprise mid-project charges.',
          outputs: [
            'Technical specification & tool governance doc',
            'UI mockup / agent conversation flow',
            'Release timeline and fixed price quote',
          ],
        },
        {
          num: '03',
          title: 'Build & Edge-Case Scenario Testing',
          duration: 'Weeks 1–3',
          detail:
            'You test the system in staging. We stress-test edge cases: typos, customer complaints, non-standard phone number formats, and human admin handovers.',
          outputs: [
            'High-speed website / landing page',
            'WhatsApp AI agent connected to database/calendar',
            'Human-in-the-loop scenario testing with your team',
          ],
        },
        {
          num: '04',
          title: 'Full Handover, SOP & 30-Day Bug-Fix Warranty',
          duration: 'Release week & onward',
          detail:
            'We train your admin staff via live sessions and short video guides. Full code, domain, and database access are handed over to you, backed by a 30-day bug-fix warranty.',
          outputs: [
            '100% handover of source code, domain, and admin access',
            'Operational video guide for admin staff',
            '30-day free support & bug-fix warranty',
          ],
        },
      ]
    : [
        {
          num: '01',
          title: 'Audit Gratis 30 Menit (Online / Ketemu di Tangsel)',
          duration: 'Hari ke-1',
          detail:
            'Kita bedah langsung alur kerja yang macet di bisnismu. Kami tentukan secara jujur bagian mana yang layak diotomasi dengan AI agent dan mana yang sebaiknya tetap dikerjakan timmu.',
          outputs: [
            'Diagram alur kerja saat ini vs yang dioptimalkan',
            'Rekomendasi otomatisasi vs pekerjaan manual',
            'Tanpa biaya dan tanpa kewajiban lanjut',
          ],
        },
        {
          num: '02',
          title: 'Scope & Arsitektur Sistem Pasti',
          duration: 'Hari ke-2–4',
          detail:
            'Kami menyusun diagram teknis, pilihan integrasi tool (WhatsApp Cloud API, PostgreSQL, n8n, Sheets), dan harga tetap tanpa biaya tambahan di tengah jalan.',
          outputs: [
            'Dokumen spesifikasi teknis & tata kelola tool',
            'Mockup antarmuka / alur percakapan agent',
            'Jadwal rilis dan estimasi biaya pasti',
          ],
        },
        {
          num: '03',
          title: 'Pembangunan & Uji Skenario Ekstrem',
          duration: 'Minggu ke-1–3',
          detail:
            'Kamu mencoba sistem di staging. Kami menguji berbagai skenario ekstrem: pesan salah ketik, komplain pelanggan, format nomor telepon tak baku, hingga pengalihan ke admin manusia.',
          outputs: [
            'Website / landing page berkecepatan tinggi',
            'AI agent WhatsApp terhubung ke database/kalender',
            'Uji coba skenario human-in-the-loop bersama timmu',
          ],
        },
        {
          num: '04',
          title: 'Handover Penuh, SOP & Garansi Bug-Fix 30 Hari',
          duration: 'Minggu rilis & seterusnya',
          detail:
            'Kami melatih tim adminmu lewat sesi langsung dan video dokumentasi singkat. Seluruh akses kode, domain, dan database diserahkan penuh kepadamu, disertai garansi perbaikan bug 30 hari.',
          outputs: [
            'Serah terima source code, domain, dan akses admin 100%',
            'Video panduan operasional untuk staf admin',
            'Garansi pendampingan & bug fix gratis 30 hari',
          ],
        },
      ];

  return (
    <div className="bg-[#FFFFFF] text-[#17122B] min-h-screen pt-28 pb-16 md:pb-24">
      <SEOMetadata
        title={
          isEn
            ? 'How We Work & Project Delivery Stages | CHESTAADOTCOM'
            : 'Cara Kerja & Tahapan Pengerjaan Proyek | CHESTAADOTCOM'
        }
        description={
          isEn
            ? '4 measured steps for custom software and AI agent delivery at CHESTAADOTCOM: Free 30-minute audit, Fixed scope & architecture, Build & edge-case testing, Full handover & SOP with 30-day warranty.'
            : '4 langkah terukur pengerjaan software custom dan AI agent di CHESTAADOTCOM: Audit gratis 30 menit, Scope & arsitektur, Build & test skenario ekstrem, Handover & SOP dengan garansi 30 hari.'
        }
        path={toLocalizedHref('/workflow', locale, prefixMode)}
      />

      <Container>
        <Breadcrumb items={[{ label: isEn ? 'How It Works' : 'Cara Kerja' }]} />

        <header className="max-w-2xl mb-12">
          <Tag>{isEn ? 'CHESTAADOTCOM WORKFLOW' : 'PROSES KERJA CHESTAADOTCOM'}</Tag>
          <h1 className="mt-2">
            {isEn
              ? '4 measured steps from initial audit to a cleanly running system'
              : '4 langkah terukur dari audit awal sampai sistem berjalan rapi'}
          </h1>
          <p className="mt-3 text-[15px] md:text-[16px] text-[#5B5675] leading-[1.65]">
            {isEn
              ? 'Every project is built directly by Chesta Azka & Zeeshan. You always know what is being built, why each tool was chosen, and when the system is ready for your team.'
              : 'Setiap proyek dikerjakan langsung oleh Chesta Azka & Zeeshan. Kamu selalu tahu apa yang sedang dibangun, kenapa tool tersebut dipilih, dan kapan sistem siap dipakai timmu.'}
          </p>
        </header>

        <div className="space-y-6">
          {steps.map((s) => (
            <Card key={s.num} variant="soft" padding="lg">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2>
                  <span className="font-mono text-[#6A3FD0] mr-2">{s.num}.</span>
                  {s.title}
                </h2>
                <Badge variant="outline">{s.duration}</Badge>
              </div>
              <p className="mt-3 text-[15px] text-[#5B5675] leading-[1.65]">
                {s.detail}
              </p>
              <div className="mt-6 pt-4 border-t border-[rgba(91,60,196,0.14)]">
                <Tag className="block text-[#17122B] mb-3">
                  {isEn ? 'Stage deliverables:' : 'Deliverables tahap ini:'}
                </Tag>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[14px] text-[#5B5675]">
                  {s.outputs.map((o) => (
                    <div key={o} className="flex items-start gap-2.5">
                      <Check size={16} className="text-[#6A3FD0] shrink-0 mt-0.5" />
                      <span className="leading-[1.65]">{o}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-16">
          <CTABlock
            title={
              isEn
                ? 'Start with a 30-minute workflow audit'
                : 'Mulai dari audit alur kerja 30 menit'
            }
            description={
              isEn
                ? 'No need to prepare a complex deck. Just tell us how your team currently handles orders or chats, and we will map what can be sped up.'
                : 'Tidak perlu menyiapkan presentasi rumit. Cukup ceritakan bagaimana timmu menangani pesanan atau chat saat ini, dan kami petakan mana yang bisa dipercepat.'
            }
            buttonLabel={
              isEn
                ? 'Schedule free audit via WhatsApp'
                : 'Jadwalkan audit gratis via WhatsApp'
            }
          />
        </div>
      </Container>
    </div>
  );
}
