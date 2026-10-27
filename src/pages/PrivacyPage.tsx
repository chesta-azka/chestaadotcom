import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowUpRight } from 'lucide-react';
import { SEO } from '../components/SEO';
import {
  PageShell,
  Container,
  Section,
  Eyebrow,
  Headline,
} from '../components/ui/DesignSystem';
import { useLocale } from '../hooks/useLocale';
import { buildWhatsAppLink, getWhatsAppCtaLabel } from '../lib/whatsapp';
import { trackWaClick } from '../lib/analytics';

export default function PrivacyPage() {
  const { locale, t, localizePath } = useLocale();
  const isEn = locale === 'en';

  const defaultWaLink = buildWhatsAppLink(
    {
      type: 'default',
      pageUrl: isEn
        ? 'https://chestaa.com/en/privacy'
        : 'https://chestaa.com/id/privasi',
    },
    locale
  );

  const sections = isEn
    ? [
        {
          id: 'ringkasan',
          title: '1. Quick Summary',
          items: [
            'We do not sell, rent, or trade your personal data to any third party.',
            'We do not use invasive advertising trackers, retargeting pixels, or third-party tracking cookies.',
            'The workflow summary form on our Free Audit page runs entirely in your browser and opens WhatsApp directly without saving your draft to any database.',
          ],
        },
        {
          id: 'data-dikumpulkan',
          title: '2. Information You Share With Us',
          paragraphs: [
            'When you contact CHESTAADOTCOM via WhatsApp or email, we only receive the information you voluntarily send in that conversation—such as your name, your business name, your phone number or email address, and the operational problem you want to discuss.',
            'If you use the summary composer on the Free Audit (/en/free-audit) page, your text is formatted directly in your browser into a WhatsApp link (wa.me) and is never stored on our web server.',
          ],
        },
        {
          id: 'penggunaan-data',
          title: '3. How We Use Your Information',
          paragraphs: [
            'We use the information you share solely to:',
            '• Respond to your consultation or workflow audit request.',
            '• Prepare architecture recommendations, project scopes, and transparent cost estimates for your business.',
            '• Carry out project development and maintenance if we agree to work together.',
          ],
        },
        {
          id: 'analitik-tanpa-cookie',
          title: '4. Cookieless Website Analytics',
          paragraphs: [
            'To understand which articles and service pages are genuinely useful to visitors, we use lightweight, privacy-friendly, cookieless analytics (Plausible Analytics).',
            'This measurement does not set cookies on your device, does not collect personal identifiers, and does not track you across other websites. All visitor statistics are aggregated and anonymous.',
          ],
        },
        {
          id: 'penyimpanan-pihak-ketiga',
          title: '5. Data Storage & Third-Party Services',
          paragraphs: [
            'Conversations conducted via WhatsApp or email are governed by the encryption and security infrastructure of those communication providers (WhatsApp / Meta and Google Workspace).',
            'When you share sample workflows or sample business spreadsheets for an audit, we recommend redacting sensitive customer details beforehand. Internal notes from our consultation are restricted strictly to the CHESTAADOTCOM founding team.',
          ],
        },
        {
          id: 'hak-kamu-uu-pdp',
          title: '6. Your Rights Under Indonesian Data Protection Law (UU PDP)',
          paragraphs: [
            'In accordance with Law No. 27 of 2022 on Personal Data Protection (Undang-Undang Pelindungan Data Pribadi / UU PDP) of the Republic of Indonesia, you have the full right to ask what information of yours we hold, request corrections, or ask us to delete your consultation records and chat history at any time.',
            'To exercise these rights, simply message us directly via WhatsApp or email hello@chestaa.com and we will process your request promptly.',
          ],
        },
      ]
    : [
        {
          id: 'ringkasan',
          title: '1. Ringkasan Singkat',
          items: [
            'Kami tidak pernah menjual, menyewakan, atau memperdagangkan data pribadimu kepada pihak mana pun.',
            'Kami tidak memasang pelacak iklan (retargeting pixel) atau cookie pelacakan pihak ketiga di situs ini.',
            'Formulir penyusun pesan di halaman Audit Gratis bekerja sepenuhnya di browser perangkatmu dan langsung membuka aplikasi WhatsApp tanpa menyimpan draf ke database kami.',
          ],
        },
        {
          id: 'data-dikumpulkan',
          title: '2. Informasi yang Kamu Bagikan',
          paragraphs: [
            'Saat kamu menghubungi CHESTAADOTCOM melalui WhatsApp atau email, kami hanya menerima informasi yang kamu kirimkan secara sukarela di dalam percakapan tersebut—seperti nama panggilan, nama usaha, nomor telepon atau alamat email, serta gambaran kendala operasional yang ingin kamu diskusikan.',
            'Jika kamu mengisi penyusun pesan di halaman Audit Gratis (/id/audit-gratis), teks yang kamu ketik hanya dirangkai di dalam browser menjadi tautan WhatsApp (wa.me) dan tidak pernah disimpan di server website kami.',
          ],
        },
        {
          id: 'penggunaan-data',
          title: '3. Cara Kami Menggunakan Informasi Tersebut',
          paragraphs: [
            'Informasi yang kamu bagikan hanya kami gunakan untuk:',
            '• Menjawab pertanyaan konsultasi atau memfasilitasi sesi audit alur kerja 30 menit.',
            '• Menyusun rekomendasi arsitektur, ruang lingkup sistem, dan perkiraan biaya yang jujur untuk bisnismu.',
            '• Menjalankan pengerjaan serta pemeliharaan sistem apabila kita sepakat bekerja sama.',
          ],
        },
        {
          id: 'analitik-tanpa-cookie',
          title: '4. Analitik Website Tanpa Cookie',
          paragraphs: [
            'Untuk mengetahui halaman layanan dan artikel blog mana yang paling bermanfaat bagi pembaca, kami menggunakan analitik ringan yang ramah privasi dan bebas cookie (Plausible Analytics).',
            'Pengukuran ini tidak menyimpan cookie di perangkatmu, tidak mengambil identitas pribadi, dan tidak melacak aktivitasmu di situs lain. Seluruh data kunjungan bersifat agregat dan anonim.',
          ],
        },
        {
          id: 'penyimpanan-pihak-ketiga',
          title: '5. Penyimpanan Data & Layanan Pihak Ketiga',
          paragraphs: [
            'Percakapan yang berlangsung melalui WhatsApp atau email dilindungi oleh infrastruktur enkripsi dan keamanan masing-masing penyedia layanan (WhatsApp / Meta serta Google Workspace).',
            'Saat kamu membagikan contoh data atau tangkapan layar alur kerja untuk keperluan audit, kami selalu menyarankan agar informasi sensitif pelanggan disamarkan terlebih dahulu. Catatan hasil diskusi hanya dapat diakses oleh tim inti CHESTAADOTCOM.',
          ],
        },
        {
          id: 'hak-kamu-uu-pdp',
          title: '6. Hak Kamu Sesuai UU Pelindungan Data Pribadi (UU PDP)',
          paragraphs: [
            'Sesuai dengan Undang-Undang Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi (UU PDP) Republik Indonesia, kamu memiliki hak penuh untuk menanyakan data apa saja yang pernah kamu bagikan kepada kami, meminta pembaruan data, atau meminta penghapusan riwayat catatan konsultasimu kapan saja.',
            'Untuk menggunakan hak tersebut, kamu cukup menghubungi kami melalui WhatsApp resmi atau email ke hello@chestaa.com dan kami akan segera menindaklanjutinya.',
          ],
        },
      ];

  return (
    <PageShell>
      <SEO
        title={t(
          'Kebijakan Privasi & Pelindungan Data (UU PDP) | CHESTAADOTCOM',
          'Privacy Policy & Data Protection (UU PDP) | CHESTAADOTCOM'
        )}
        description={t(
          'Kebijakan privasi CHESTAADOTCOM dalam bahasa lugas sesuai UU PDP No. 27 Tahun 2022. Tanpa cookie iklan, tanpa jual data, dan transparan.',
          'Plain-language privacy policy of CHESTAADOTCOM aligned with Indonesian Data Protection Law (UU PDP No. 27/2022). Cookieless analytics and zero data selling.'
        )}
        path={isEn ? '/en/privacy' : '/id/privasi'}
        breadcrumbs={[
          { name: t('Beranda', 'Home'), url: localizePath('/') },
          {
            name: t('Kebijakan Privasi', 'Privacy Policy'),
            url: localizePath('/privasi'),
          },
        ]}
      />

      <Section className="pt-32 pb-20 md:pt-40 md:pb-28">
        <Container className="max-w-3xl">
          <div className="mb-10 pb-8 border-b border-[var(--line)]">
            <Eyebrow className="mb-3">
              {t('KEBIJAKAN PRIVASI · UU PDP', 'PRIVACY POLICY · UU PDP')}
            </Eyebrow>
            <Headline as="h1" className="text-[32px] md:text-[42px] mb-4">
              {t('Kebijakan Privasi', 'Privacy Policy')}
            </Headline>
            <p className="text-[15px] text-[var(--ink-muted)] font-mono">
              {t(
                'Terakhir diperbarui: 26 Oktober 2026 · Berlaku untuk chestaa.com',
                'Last updated: 26 October 2026 · Applies to chestaa.com'
              )}
            </p>
          </div>

          {/* prose 65ch container */}
          <div className="max-w-[65ch] space-y-10 text-[16px] leading-[1.75] text-[var(--ink)]">
            <p className="text-[17px] text-[var(--ink-muted)] leading-relaxed">
              {t(
                'Kami menulis kebijakan privasi ini dengan bahasa sehari-hari yang jelas—bukan istilah hukum yang berbelit-belit—supaya kamu tahu persis bagaimana CHESTAADOTCOM menghormati privasi dan data bisnismu.',
                'We wrote this privacy policy in plain, everyday language—not dense legal jargon—so you know regulated and transparent facts about how CHESTAADOTCOM respects your privacy and business data.'
              )}
            </p>

            {sections.map((sec) => (
              <section key={sec.id} id={sec.id} className="space-y-4">
                <h2 className="text-[21px] font-semibold text-[var(--ink)] tracking-tight">
                  {sec.title}
                </h2>
                {sec.items ? (
                  <div className="p-6 rounded-[20px] bg-[#F8F6FE] border border-[var(--line-strong)] space-y-3">
                    {sec.items.map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <ShieldCheck className="w-5 h-5 text-[#6A3FD0] shrink-0 mt-0.5" />
                        <p className="text-[15.5px] text-[var(--ink)] leading-relaxed">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  sec.paragraphs?.map((p, i) => (
                    <p
                      key={i}
                      className="text-[16px] text-[var(--ink-muted)] leading-[1.75]"
                    >
                      {p}
                    </p>
                  ))
                )}
              </section>
            ))}

            {/* Contact box */}
            <div className="p-7 rounded-[20px] bg-[#F8F6FE] border border-[var(--line)] space-y-4 mt-12">
              <h2 className="text-[18px] font-semibold text-[var(--ink)]">
                {t(
                  'Ada pertanyaan soal privasi atau keamanan data?',
                  'Have a question about privacy or data security?'
                )}
              </h2>
              <p className="text-[15px] text-[var(--ink-muted)] leading-relaxed">
                {t(
                  'Kamu bisa menghubungi co-founder kami secara langsung lewat email hello@chestaa.com atau melalui WhatsApp di bawah ini.',
                  'You can reach our co-founders directly via email at hello@chestaa.com or on WhatsApp below.'
                )}
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <a
                  href={defaultWaLink}
                  target="_blank"
                  rel="noopener"
                  onClick={() => trackWaClick('default', 'privacy_footer', locale)}
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--purple-600)] text-white px-5 py-2.5 text-[14px] font-medium hover:bg-[var(--purple-700)] transition-colors"
                >
                  <span>{getWhatsAppCtaLabel(locale)}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
                <Link
                  to={localizePath('/about')}
                  className="text-[14px] font-medium text-[#6A3FD0] hover:underline"
                >
                  {t('Tentang CHESTAADOTCOM', 'About CHESTAADOTCOM')}
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </PageShell>
  );
}
