import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  MessageCircle,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Bot,
  Code2,
  Workflow,
  ShieldCheck,
  UserCheck,
  FileCheck,
  Lock,
  Zap,
} from 'lucide-react';
import HeroAgentGraph from '../components/organisms/HeroAgentGraph';
import AgentSimulationSection from '../components/organisms/AgentSimulationSection';
import TrustStrip from '../components/atoms/TrustStrip';
import { PRICING_PACKAGES, formatCurrency } from '../data/pricing';
import { PROCESS_PHASES } from '../data/process';
import { SITE_IMAGES, getImageMeta } from '../config/images';
import { getPublishedBlogPosts } from '../data/blog-posts';
import { getServicePath } from '../data/services';
import { getPublishedProjects } from '../data/projects';
import { parseLocalizedPath, toLocalizedHref } from '../lib/i18n';
import { ENGLISH_HOME_FAQS } from '../lib/i18n-content';
import { useMotionMode } from '../lib/motion';
import {
  Container,
  Button,
  Card,
  Badge,
  Tag,
  SectionHeading,
  WordRevealHeading,
  Reveal,
  FAQAccordion,
  CTABlock,
  ImageWithFallback,
  buildWaUrl,
} from '../components/ui/DesignSystem';
import { buildWhatsAppLink, getWhatsAppCtaLabel } from '../lib/whatsapp';
import { trackServiceCardClick, trackWaClick } from '../lib/analytics';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HomePage() {
  const location = useLocation();
  const { locale, prefixMode } = parseLocalizedPath(location.pathname);
  const isEn = locale === 'en';
  const motionMode = useMotionMode();

  const [activeProcessStep, setActiveProcessStep] = useState(0);
  const [heroSubRevealed, setHeroSubRevealed] = useState(false);
  const [marqueeOffscreen, setMarqueeOffscreen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  const heroSectionRef = useRef<HTMLElement | null>(null);
  const heroBlobRef = useRef<HTMLDivElement | null>(null);
  const heroChipRef = useRef<HTMLDivElement | null>(null);
  const heroGraphWrapRef = useRef<HTMLDivElement | null>(null);
  const marqueeSectionRef = useRef<HTMLElement | null>(null);

  const processSectionRef = useRef<HTMLElement | null>(null);
  const processLineFillRef = useRef<HTMLDivElement | null>(null);
  const servicesDropdownRef = useRef<HTMLDivElement | null>(null);

  // Trigger Hero subtitle fade-up + light blur-to-sharp after first paint (<700ms)
  useEffect(() => {
    const raf = requestAnimationFrame(() => setHeroSubRevealed(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  // Pause marquee when offscreen
  useEffect(() => {
    const el = marqueeSectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        setMarqueeOffscreen(!entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Hero layered depth parallax (max 6-10% of scroll distance, desktop full mode only)
  useEffect(() => {
    if (motionMode !== 'full' || !heroSectionRef.current) return;

    const mm = gsap.matchMedia();
    mm.add('(min-width: 1024px) and (hover: hover) and (pointer: fine)', () => {
      if (heroBlobRef.current) {
        gsap.to(heroBlobRef.current, {
          y: 32,
          ease: 'none',
          scrollTrigger: {
            trigger: heroSectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
      if (heroChipRef.current) {
        gsap.to(heroChipRef.current, {
          y: -14,
          ease: 'none',
          scrollTrigger: {
            trigger: heroSectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
      if (heroGraphWrapRef.current) {
        gsap.to(heroGraphWrapRef.current, {
          y: 26,
          ease: 'none',
          scrollTrigger: {
            trigger: heroSectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    });

    return () => mm.revert();
  }, [motionMode]);

  // Close Services dropdown on outside click or Escape
  useEffect(() => {
    if (!servicesDropdownOpen) return;
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        servicesDropdownRef.current &&
        !servicesDropdownRef.current.contains(e.target as Node)
      ) {
        setServicesDropdownOpen(false);
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setServicesDropdownOpen(false);
    };
    document.addEventListener('mousedown', handleOutsideClick);
    window.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      window.removeEventListener('keydown', handleEsc);
    };
  }, [servicesDropdownOpen]);

  const primaryWaUrl = buildWhatsAppLink(
    { type: 'default', url: location.pathname },
    locale
  );
  const waCtaLabel = getWhatsAppCtaLabel(locale);

  const latestPosts = getPublishedBlogPosts(locale).slice(0, 3);

  const industries = isEn
    ? [
        'Aesthetic clinics',
        'Healthcare & dental clinics',
        'Restaurants & cafes',
        'Architecture & interior studios',
        'Property developers',
        'Professional services & consultants',
        'Established SMBs',
        'Greater Jakarta startups',
      ]
    : [
        'Klinik kecantikan',
        'Klinik kesehatan & gigi',
        'Restoran & kafe',
        'Studio arsitektur & interior',
        'Pengembang properti',
        'Jasa profesional & konsultan',
        'UMKM yang sudah jalan',
        'Small startups Jabodetabek',
      ];

  // Item 8: Process line (#cara-kerja) scrubs with scroll and steps light up in turn

  // Item 8: Process line (#cara-kerja) scrubs with scroll and steps light up in turn
  useEffect(() => {
    const section = processSectionRef.current;
    if (!section || motionMode === 'reduced') return;

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top 70%',
      end: 'bottom 45%',
      scrub: 0.5,
      onUpdate: (self) => {
        const p = self.progress;
        if (processLineFillRef.current) {
          processLineFillRef.current.style.transform = `scaleX(${Math.max(0.05, p).toFixed(3)})`;
        }
        const idx = Math.min(3, Math.floor(p * 4));
        setActiveProcessStep((prev) => (prev !== idx ? idx : prev));
      },
    });

    return () => st.kill();
  }, [motionMode]);

  const idFaqs = [
    {
      question: 'Apa bedanya chatbot dan AI agent?',
      answer:
        'Chatbot biasa hanya menjawab dari daftar teks FAQ. AI agent memahami percakapan bebas, memakai tool seperti kalender, spreadsheet, dan database, lalu mengeksekusi tugas sampai selesai (misalnya mengunci jadwal atau membuat tagihan) serta melapor ke tim kamu.',
    },
    {
      question: 'Berapa biaya bikin AI agent?',
      answer:
        'Biaya AI agent bergantung pada jumlah tool yang disambungkan dan kompleksitas aturan bisnis. Angka pastinya dihitung setelah audit gratis 30 menit. Untuk landing page dan website, harga mulai dari Rp1.200.000.',
    },
    {
      question: 'Kalau agent salah jawab bagaimana?',
      answer:
        'Agent dibatasi oleh guardrails ketat dan aturan human handover. Pertanyaan sensitif atau komplain langsung diteruskan ke stafmu beserta konteks lengkap. Seluruh tindakan tercatat di log audit.',
    },
    {
      question: 'Berapa lama pengerjaannya?',
      answer:
        'Landing page membutuhkan 3–7 hari kerja. AI agent, otomasi workflow, dan aplikasi web custom membutuhkan 2–4 minggu sesuai cakupan integrasi.',
    },
    {
      question: 'Apakah data pelanggan saya aman?',
      answer:
        'Aman. Lokasi penyimpanan data bebas kamu pilih sesuai infrastruktur internal bisnismu—baik di database milikmu sendiri (on-premise/private cloud) maupun cloud terenkripsi.',
    },
    {
      question: 'Apakah bisa untuk bisnis kecil yang belum punya sistem apa pun?',
      answer:
        'Bisa. Banyak klien memulai dari satu alur sederhana—seperti membalas WhatsApp dan mencatat reservasi ke Google Sheets—lalu bertahap menambah dashboard saat operasional berkembang.',
    },
    {
      question: 'Area mana yang dilayani?',
      answer:
        'Kami berbasis di sekitar BSD, Tangerang Selatan, dan melayani bisnis di Tangerang Selatan, BSD City, Pamulang, Jurang Mangu, Lebak Bulus, Alam Sutera, Bintaro, Gading Serpong, Serpong, Ciputat, serta seluruh Indonesia secara remote.',
    },
  ];

  const faqs = isEn ? ENGLISH_HOME_FAQS : idFaqs;
  const featuredInternalProjects = getPublishedProjects(locale).slice(0, 3);

  const scrollToPinnedSection = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const el = document.getElementById('alur-agent');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#FFFFFF] text-[#17122B] w-full">
      {/* =====================================================
          2. HERO SECTION (LCP ELEMENT IS H1 TEXT, LAYERED DEPTH PARALLAX)
          ===================================================== */}
      <section
        ref={heroSectionRef}
        className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-gradient-to-b from-[#FFFFFF] via-[#F8F6FE] to-[#FFFFFF]"
      >
        <div
          ref={heroBlobRef}
          aria-hidden="true"
          className="ambient-blob-1 pointer-events-none absolute -top-24 left-1/4 w-[420px] h-[420px] rounded-full bg-radial from-[#B9A2F2]/20 via-[#EFEAFB]/15 to-transparent blur-3xl -z-10"
        />

        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div ref={heroChipRef} className="inline-block">
                <Badge variant="tint">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6A3FD0]" />
                  <span>
                    {isEn
                      ? 'Software & AI agent · BSD, South Tangerang'
                      : 'Software & AI agent · BSD, Tangerang Selatan'}
                  </span>
                </Badge>
              </div>

              <WordRevealHeading
                as="h1"
                priority
                text={
                  isEn
                    ? 'Custom software and AI agents that take over repetitive work in your business.'
                    : 'Software custom dan AI agent yang mengambil alih kerja berulang di bisnismu.'
                }
              />

              <p
                data-revealed={heroSubRevealed ? 'true' : 'false'}
                className="subtitle-reveal text-[15px] md:text-[16px] text-[#5B5675] leading-[1.65] max-w-xl"
              >
                {isEn
                  ? 'WhatsApp chats answered manually, data copied between spreadsheets, follow-ups missed. We build the system so it runs on its own, letting your team focus on work that truly requires a human.'
                  : 'Chat WhatsApp dibalas manual, data disalin antar-sheet, follow-up terlewat. Kami bangun sistemnya supaya jalan sendiri, dan tim kamu fokus ke pekerjaan yang memang butuh manusia.'}
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Button
                  href={primaryWaUrl}
                  onClick={() => trackWaClick('default', 'home_hero', locale)}
                  variant="primary"
                >
                  <MessageCircle size={16} />
                  <span>{waCtaLabel}</span>
                  <ArrowUpRight size={15} />
                </Button>

                <Button
                  href="#alur-agent"
                  onClick={scrollToPinnedSection}
                  variant="secondary"
                >
                  <span>
                    {isEn
                      ? 'See how the agent works'
                      : 'Lihat cara kerja agent'}
                  </span>
                  <ArrowRight size={15} className="text-[#6A3FD0]" />
                </Button>
              </div>

              <p className="font-mono text-[11px] md:text-[12px] text-[#5B5675]">
                {isEn
                  ? 'Websites from IDR 1,200,000 · AI agents and custom systems scoped after a free audit.'
                  : 'Web mulai Rp1.200.000 · AI agent dan sistem custom dihitung setelah audit gratis.'}
              </p>
            </div>

            <div ref={heroGraphWrapRef} className="lg:col-span-5 flex justify-center">
              <HeroAgentGraph />
            </div>
          </div>
        </Container>
      </section>

      {/* Trust Strip */}
      <TrustStrip locale={locale} />

      {/* =====================================================
          3. INDUSTRY STRIP (VELOCITY-REACTIVE CSS MARQUEE, PAUSES OFFSCREEN/HOVER)
          ===================================================== */}
      <section
        ref={marqueeSectionRef}
        aria-label={isEn ? 'Target Business Industries' : 'Target Industri Bisnis'}
        className="py-6 bg-[#F8F6FE] border-y border-[rgba(91,60,196,0.14)] overflow-hidden"
      >
        <Container className="mb-3 text-center">
          <Tag>
            {isEn
              ? 'Built for business operations like these'
              : 'Dibuat untuk operasional bisnis seperti ini'}
          </Tag>
        </Container>

        <div className="relative w-full overflow-hidden">
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-r from-[#F8F6FE] to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-l from-[#F8F6FE] to-transparent z-10" />

          <div
            data-paused={marqueeOffscreen ? 'true' : 'false'}
            className="animate-marquee flex items-center gap-3"
          >
            {[...industries, ...industries].map((ind, idx) => (
              <span
                key={`${ind}-${idx}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)] text-[13px] font-medium text-[#17122B] whitespace-nowrap"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#6A3FD0]" />
                <span>{ind}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          4. PROBLEM SECTION (NUMBERED EDITORIAL GRID)
          ===================================================== */}
      <section className="py-16 md:py-24 bg-[#FFFFFF] border-b border-[rgba(91,60,196,0.14)]">
        <Container>
          <SectionHeading
            eyebrow={isEn ? 'OPERATIONAL BOTTLENECKS' : 'KENDALA OPERASIONAL'}
            title={
              isEn
                ? 'Three things quietly draining your team’s work hours'
                : 'Tiga hal yang diam-diam menghabiskan jam kerja timmu'
            }
            description={
              isEn
                ? 'Not because your staff isn’t responsive, but because the tools they use don’t talk to each other yet.'
                : 'Bukan karena timmu kurang sigap, melainkan karena tool yang dipakai belum saling bicara.'
            }
          />

          <Reveal staggerSelector=".problem-card-item">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
              {(isEn
                ? [
                    {
                      num: '01',
                      tag: 'CLOGGED INBOX',
                      title: 'The same questions answered over and over.',
                      desc: 'Opening hours, price lists, and open slots are asked dozens of times a day—consuming a full admin’s shift.',
                      resolution: 'Solution: 24/7 WhatsApp AI Agent',
                    },
                    {
                      num: '02',
                      tag: 'HUMAN ERROR',
                      title: 'Data moves via copy-paste.',
                      desc: 'Orders from chat are copied manually into spreadsheets and re-typed into invoices. Prone to typos and missed entries.',
                      resolution: 'Solution: Cross-Tool Workflow Automation',
                    },
                    {
                      num: '03',
                      tag: 'COLD LEADS',
                      title: 'Follow-ups stop halfway.',
                      desc: 'Prospects ask for prices and get buried under new chats because there is no automated follow-up reminder.',
                      resolution: 'Solution: Scheduled AI Follow-Up',
                    },
                  ]
                : [
                    {
                      num: '01',
                      tag: 'INBOX MACET',
                      title: 'Pertanyaan sama dijawab berulang.',
                      desc: 'Jam buka, daftar harga, dan slot kosong ditanyakan puluhan kali sehari—menyita waktu satu admin penuh.',
                      resolution: 'Solusi: AI Agent WhatsApp 24/7',
                    },
                    {
                      num: '02',
                      tag: 'HUMAN ERROR',
                      title: 'Data pindah lewat copy-paste.',
                      desc: 'Pesanan dari chat disalin manual ke sheet lalu diketik ulang ke invoice. Rawan salah ketik dan terlewat.',
                      resolution: 'Solusi: Integrasi Otomasi Antar-Tool',
                    },
                    {
                      num: '03',
                      tag: 'PROSPEK HANGUS',
                      title: 'Follow-up berhenti di tengah jalan.',
                      desc: 'Calon pelanggan tanya harga lalu tenggelam di tumpukan chat baru karena tidak ada pengingat otomatis.',
                      resolution: 'Solusi: Scheduled AI Follow-Up',
                    },
                  ]
              ).map((item) => (
                <Card
                  key={item.num}
                  variant="soft"
                  className="problem-card-item h-full flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between pb-4 mb-4 border-b border-[rgba(91,60,196,0.14)] font-mono text-[11px] uppercase tracking-[0.08em]">
                      <span className="text-[#6A3FD0] font-semibold">{item.num}</span>
                      <span className="text-[#5B5675]">{item.tag}</span>
                    </div>
                    <h3>{item.title}</h3>
                    <p className="mt-2 text-[15px] text-[#5B5675] leading-[1.65]">
                      {item.desc}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-[rgba(91,60,196,0.14)] font-mono text-[11px] uppercase tracking-[0.08em] text-[#6A3FD0] font-semibold">
                    {item.resolution}
                  </div>
                </Card>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* =====================================================
          5. SIMULASI KINERJA AGENT (AGENT EXECUTION SIMULATION)
          ===================================================== */}
      <AgentSimulationSection />


      {/* =====================================================
          6. CHATBOT VS AGENT (SPLIT COMPARISON)
          ===================================================== */}
      <section className="py-16 md:py-24 bg-[#FFFFFF] border-b border-[rgba(91,60,196,0.14)] cv-auto">
        <Container>
          <SectionHeading
            align="center"
            eyebrow={isEn ? 'CORE DIFFERENCE' : 'PERBEDAAN MENDASAR'}
            title={
              isEn
                ? 'Chatbots reply. Agents finish the job.'
                : 'Chatbot menjawab. Agent menyelesaikan.'
            }
            description={
              isEn
                ? 'Legacy chatbots stop at text replies. AI agents use real tools to complete operational tasks.'
                : 'Chatbot lama berhenti di balasan teks. AI agent memakai tool nyata untuk menuntaskan tugas operasional.'
            }
          />

          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto items-stretch">
              <Card variant="soft" className="h-full flex flex-col justify-between">
                <div>
                  <Tag className="text-[#5B5675]">
                    {isEn ? 'Conventional Chatbot' : 'Chatbot Konvensional'}
                  </Tag>
                  <h3 className="mt-2">
                    {isEn ? 'Only Repeats FAQ Text' : 'Hanya Mengulang Teks FAQ'}
                  </h3>
                  <ul className="mt-6 space-y-3 text-[15px] text-[#5B5675]">
                    <li className="flex items-start gap-3">
                      <span className="font-mono text-[#5B5675] font-semibold shrink-0">—</span>
                      <span>
                        {isEn
                          ? 'Replies rigidly based on pre-written keywords.'
                          : 'Menjawab kaku sesuai kata kunci yang sudah ditulis.'}
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="font-mono text-[#5B5675] font-semibold shrink-0">—</span>
                      <span>
                        {isEn
                          ? 'Cannot check calendars or update database rows.'
                          : 'Tidak bisa mengecek kalender atau mengubah data database.'}
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="font-mono text-[#5B5675] font-semibold shrink-0">—</span>
                      <span>
                        {isEn
                          ? 'Your team still has to summarize and re-enter data manually.'
                          : 'Tim kamu tetap harus merangkum dan menginput ulang.'}
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="mt-6 pt-4 border-t border-[rgba(91,60,196,0.14)] font-mono text-[11px] uppercase tracking-[0.08em] text-[#5B5675]">
                  {isEn
                    ? 'Result: Admin staff stays busy with manual recaps'
                    : 'Hasil: Staf admin tetap sibuk rekap manual'}
                </div>
              </Card>

              <Card variant="highlighted" className="h-full flex flex-col justify-between">
                <div>
                  <Tag>
                    {isEn ? 'CHESTAADOTCOM AI Agent' : 'AI Agent CHESTAADOTCOM'}
                  </Tag>
                  <h3 className="mt-2">
                    {isEn
                      ? 'Executes Tasks to Completion'
                      : 'Mengeksekusi Tugas Sampai Tuntas'}
                  </h3>
                  <ul className="mt-6 space-y-3 text-[15px] text-[#17122B]">
                    <li className="flex items-start gap-3">
                      <Check size={16} className="text-[#6A3FD0] shrink-0 mt-1" />
                      <span>
                        {isEn
                          ? 'Understands customer intent in natural everyday language.'
                          : 'Memahami maksud pesan pelanggan dengan bahasa sehari-hari.'}
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check size={16} className="text-[#6A3FD0] shrink-0 mt-1" />
                      <span>
                        {isEn
                          ? 'Connects directly to your calendar, database, invoices, and CRM.'
                          : 'Terhubung langsung ke kalender, database, invoice, dan CRM.'}
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check size={16} className="text-[#6A3FD0] shrink-0 mt-1" />
                      <span>
                        {isEn
                          ? 'Completes the action and sends a clean summary to your team.'
                          : 'Menyelesaikan aksi lalu mengirim ringkasan ke tim kamu.'}
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="mt-6 pt-4 border-t border-[rgba(91,60,196,0.14)] font-mono text-[11px] uppercase tracking-[0.08em] text-[#6A3FD0] font-semibold">
                  {isEn
                    ? 'Result: Prospects served instantly, data logged cleanly'
                    : 'Hasil: Prospek terlayani instan, data langsung rapi'}
                </div>
              </Card>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* =====================================================
          7. WHAT WE BUILD (BENTO GRID - 4 ASYMMETRICAL TILES)
          ===================================================== */}
      <section
        id="layanan"
        className="py-16 md:py-24 bg-[#F8F6FE] border-b border-[rgba(91,60,196,0.14)] cv-auto"
      >
        <Container>
          <SectionHeading
            eyebrow={isEn ? 'OUR CAPABILITIES' : 'KAPABILITAS KAMI'}
            title={
              isEn
                ? 'What we build for your business'
                : 'Yang kami bangun untuk bisnismu'
            }
            description={
              isEn
                ? 'Four systems that streamline how you acquire customers and run daily operations.'
                : 'Empat sistem yang merapikan cara kamu menerima pelanggan dan menjalankan operasional harian.'
            }
            action={
              <div ref={servicesDropdownRef} className="relative inline-block text-left">
                <button
                  type="button"
                  onClick={() => setServicesDropdownOpen((prev) => !prev)}
                  aria-expanded={servicesDropdownOpen}
                  aria-haspopup="menu"
                  className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-full text-[14px] font-semibold bg-[#FFFFFF] text-[#17122B] border border-[rgba(91,60,196,0.18)] hover:border-[#7C54E0] hover:bg-[#F8F6FE] transition-colors cursor-pointer"
                >
                  <span>{isEn ? 'Services' : 'Layanan'}</span>
                  <ChevronDown
                    size={15}
                    className={`text-[#6A3FD0] transition-transform duration-200 ${
                      servicesDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {servicesDropdownOpen && (
                  <div
                    role="menu"
                    aria-label={isEn ? 'Select service' : 'Pilih layanan'}
                    className="absolute right-0 mt-2 w-72 rounded-[20px] bg-[#FFFFFF] border border-[rgba(91,60,196,0.16)] shadow-[0_18px_40px_-10px_rgba(23,18,43,0.14)] p-2 z-30"
                  >
                    {[
                      {
                        label:
                          isEn
                            ? 'Website & Landing Page'
                            : 'Pembuatan Website & Landing Page',
                        href: getServicePath('pembuatan-website', locale),
                      },
                      {
                        label: 'AI Agent',
                        href: getServicePath('ai-agent', locale),
                      },
                      {
                        label:
                          isEn ? 'Custom Software' : 'Software Custom',
                        href: getServicePath('software-custom', locale),
                      },
                      {
                        label:
                          isEn
                            ? 'Workflow Automation'
                            : 'Otomasi Workflow',
                        href: getServicePath('otomasi-workflow', locale),
                      },
                    ].map((srv) => (
                      <Link
                        key={srv.href}
                        to={srv.href}
                        role="menuitem"
                        onClick={() => setServicesDropdownOpen(false)}
                        className="flex items-center justify-between px-3.5 py-2.5 rounded-[12px] text-[14px] font-medium text-[#17122B] hover:bg-[#F8F6FE] hover:text-[#6A3FD0] transition-colors"
                      >
                        <span>{srv.label}</span>
                        <ArrowRight size={14} className="text-[#6A3FD0] shrink-0" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            }
          />

          <Reveal staggerSelector=".bento-tile-item">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
              {/* Tile 1 (Span 7) */}
              <Card
                variant="white"
                className="bento-tile-item md:col-span-7 h-full flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div className="w-10 h-10 rounded-[14px] bg-[#EFEAFB] text-[#6A3FD0] flex items-center justify-center">
                      <Bot size={20} />
                    </div>
                    <Badge variant="tint">WhatsApp &amp; CRM</Badge>
                  </div>
                  <h3>
                    <Link
                      to={getServicePath('ai-agent', locale)}
                      onClick={() => trackServiceCardClick('ai-agent', locale)}
                      className="hover:text-[#6A3FD0] transition-colors"
                    >
                      {isEn
                        ? 'AI agents for WhatsApp & CRM'
                        : 'AI agent untuk WhatsApp & CRM'}
                    </Link>
                  </h3>
                  <p className="mt-2 text-[15px] text-[#5B5675] leading-[1.65]">
                    {isEn
                      ? 'Answers inquiries, checks open schedule slots, and records bookings automatically. When a human decision is needed, the agent hands over the chat to your staff with a complete summary.'
                      : 'Menjawab pertanyaan, mengecek jadwal kosong, dan mencatat booking otomatis. Saat butuh keputusan manusia, agent mengalihkan chat ke stafmu dengan ringkasan utuh.'}
                  </p>

                  <div className="mt-6 p-4 rounded-[16px] bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)] flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] text-[#17122B]">
                    <span>
                      {isEn
                        ? 'WhatsApp → Check Slot → Lock Schedule → CRM Log'
                        : 'WhatsApp → Cek Slot → Kunci Jadwal → Log CRM'}
                    </span>
                    <span className="text-[#6A3FD0] font-semibold">
                      {isEn ? '24/7 Active' : '24/7 Aktif'}
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[rgba(91,60,196,0.14)] flex items-center justify-between gap-4">
                  <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#5B5675]">
                    {isEn
                      ? 'Scoped after free audit'
                      : 'Dihitung setelah audit gratis'}
                  </span>
                  <Link
                    to={getServicePath('ai-agent', locale)}
                    onClick={() => trackServiceCardClick('ai-agent', locale)}
                    className="link-underline inline-flex items-center gap-1.5 min-h-[44px] text-[14px] font-semibold text-[#6A3FD0] whitespace-nowrap"
                  >
                    <span>{isEn ? 'AI agent development' : 'Jasa AI agent'}</span>
                    <ArrowRight size={14} className="icon-slide-hover" />
                  </Link>
                </div>
              </Card>

              {/* Tile 2 (Span 5) */}
              <Card
                variant="white"
                className="bento-tile-item md:col-span-5 h-full flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-[14px] bg-[#EFEAFB] text-[#6A3FD0] flex items-center justify-center mb-4">
                    <Code2 size={20} />
                  </div>
                  <h3>
                    <Link
                      to={getServicePath('software-custom', locale)}
                      onClick={() => trackServiceCardClick('software-custom', locale)}
                      className="hover:text-[#6A3FD0] transition-colors"
                    >
                      {isEn
                        ? 'Custom web apps & dashboards'
                        : 'Aplikasi web & dashboard custom'}
                    </Link>
                  </h3>
                  <p className="mt-2 text-[15px] text-[#5B5675] leading-[1.65]">
                    {isEn
                      ? 'Operational portals, commission recaps, and inventory systems engineered around your team’s SOP.'
                      : 'Portal operasional, rekap komisi, dan inventaris yang dirancang mengikuti SOP timmu.'}
                  </p>

                  <div className="mt-6 space-y-2">
                    <div className="h-2 w-full bg-[#F8F6FE] rounded-full overflow-hidden">
                      <div className="h-full bg-[#6A3FD0] w-3/4 rounded-full" />
                    </div>
                    <div className="h-2 w-full bg-[#F8F6FE] rounded-full overflow-hidden">
                      <div className="h-full bg-[#B9A2F2] w-1/2 rounded-full" />
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[rgba(91,60,196,0.14)] flex items-center justify-between gap-4">
                  <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#5B5675]">
                    {isEn ? 'Scoped to requirements' : 'Sesuai scope'}
                  </span>
                  <Link
                    to={getServicePath('software-custom', locale)}
                    onClick={() => trackServiceCardClick('software-custom', locale)}
                    className="link-underline inline-flex items-center gap-1 min-h-[44px] text-[14px] font-semibold text-[#6A3FD0] whitespace-nowrap"
                  >
                    <span>
                      {isEn ? 'Custom software development' : 'Jasa software custom'}
                    </span>
                    <ArrowRight size={14} className="icon-slide-hover" />
                  </Link>
                </div>
              </Card>

              {/* Tile 3 (Span 5) */}
              <Card
                variant="white"
                className="bento-tile-item md:col-span-5 h-full flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-[14px] bg-[#EFEAFB] text-[#6A3FD0] flex items-center justify-center mb-4">
                    <Workflow size={20} />
                  </div>
                  <h3>
                    <Link
                      to={getServicePath('otomasi-workflow', locale)}
                      onClick={() => trackServiceCardClick('otomasi-workflow', locale)}
                      className="hover:text-[#6A3FD0] transition-colors"
                    >
                      {isEn ? 'Workflow automation' : 'Otomasi workflow'}
                    </Link>
                  </h3>
                  <p className="mt-2 text-[15px] text-[#5B5675] leading-[1.65]">
                    {isEn
                      ? 'Connects Google Sheets, calendars, invoice generation, and team notifications without manual copying.'
                      : 'Menyambungkan Google Sheets, kalender, pembuatan invoice, dan notifikasi tim tanpa salin manual.'}
                  </p>

                  <div className="mt-6 flex items-center justify-between font-mono text-[11px] text-[#17122B] bg-[#F8F6FE] p-3 rounded-[14px] border border-[rgba(91,60,196,0.14)]">
                    <span>Sheets</span>
                    <span className="text-[#6A3FD0]">→</span>
                    <span>Invoice</span>
                    <span className="text-[#6A3FD0]">→</span>
                    <span>{isEn ? 'Team Alert' : 'Notif Tim'}</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[rgba(91,60,196,0.14)] flex items-center justify-between gap-4">
                  <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#5B5675]">
                    n8n &amp; Webhook
                  </span>
                  <Link
                    to={getServicePath('otomasi-workflow', locale)}
                    onClick={() => trackServiceCardClick('otomasi-workflow', locale)}
                    className="link-underline inline-flex items-center gap-1 min-h-[44px] text-[14px] font-semibold text-[#6A3FD0] whitespace-nowrap"
                  >
                    <span>
                      {isEn
                        ? 'Workflow automation service'
                        : 'Jasa otomasi workflow'}
                    </span>
                    <ArrowRight size={14} className="icon-slide-hover" />
                  </Link>
                </div>
              </Card>

              {/* Tile 4 (Span 7) */}
              <Card
                variant="white"
                className="bento-tile-item md:col-span-7 h-full flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div className="w-10 h-10 rounded-[14px] bg-[#EFEAFB] text-[#6A3FD0] flex items-center justify-center">
                      <Zap size={20} />
                    </div>
                    <Badge variant="tint">
                      {isEn ? 'From IDR 1,200,000' : 'Mulai Rp1.200.000'}
                    </Badge>
                  </div>

                  <h3>
                    <Link
                      to={getServicePath('pembuatan-website', locale)}
                      onClick={() => trackServiceCardClick('pembuatan-website', locale)}
                      className="hover:text-[#6A3FD0] transition-colors"
                    >
                      {isEn
                        ? 'Website & landing page development'
                        : 'Pembuatan website & landing page'}
                    </Link>
                  </h3>
                  <p className="mt-2 text-[15px] text-[#5B5675] leading-[1.65]">
                    {isEn
                      ? 'Loads fast on mobile networks, presents a clear offer structure, and is ready for Google or Meta Ads.'
                      : 'Cepat dibuka di jaringan seluler, struktur penawaran jelas, dan siap dipasangi iklan Google atau Meta Ads.'}
                  </p>

                  <div className="mt-6 flex flex-wrap items-center gap-2 font-mono text-[11px] text-[#17122B]">
                    <span className="px-3 py-1.5 rounded-full bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)]">
                      {isEn ? 'LCP < 1.2 sec' : 'LCP < 1.2 detik'}
                    </span>
                    <span className="px-3 py-1.5 rounded-full bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)]">
                      Mobile-first
                    </span>
                    <span className="px-3 py-1.5 rounded-full bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)]">
                      SEO &amp; Schema JSON-LD
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[rgba(91,60,196,0.14)] flex items-center justify-between gap-4">
                  <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#5B5675]">
                    {isEn ? 'Delivered in 3–7 business days' : 'Selesai 3–7 hari kerja'}
                  </span>
                  <Link
                    to={getServicePath('pembuatan-website', locale)}
                    onClick={() => trackServiceCardClick('pembuatan-website', locale)}
                    className="link-underline inline-flex items-center gap-1.5 min-h-[44px] text-[14px] font-semibold text-[#6A3FD0] whitespace-nowrap"
                  >
                    <span>
                      {isEn ? 'Website development service' : 'Jasa pembuatan website'}
                    </span>
                    <ArrowRight size={14} className="icon-slide-hover" />
                  </Link>
                </div>
              </Card>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* =====================================================
          8. GUARDRAILS & KEAMANAN (ASYMMETRICAL SPECIFICATION LEDGER)
          ===================================================== */}
      <section className="py-16 md:py-24 bg-[#FFFFFF] border-b border-[rgba(91,60,196,0.14)] cv-auto">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Heading & Summary Box */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <Tag>{isEn ? 'GUARDRAILS & SAFETY' : 'GUARDRAILS & KEAMANAN'}</Tag>
                <WordRevealHeading
                  as="h2"
                  text={
                    isEn
                      ? 'AI that takes action must have clear boundaries.'
                      : 'AI yang bertindak harus punya batas.'
                  }
                  className="mt-2"
                />
                <p className="mt-3 text-[15px] md:text-[16px] text-[#5B5675] leading-[1.65]">
                  {isEn
                    ? 'We never deploy AI without strict corridors. Every agent is governed by explicit rules agreed upon before the system goes live.'
                    : 'Kami tidak melepas AI berjalan tanpa koridor. Setiap agent dibatasi aturan main yang disepakati bersama sebelum sistem diaktifkan.'}
                </p>
              </div>

              <Card variant="soft">
                <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#6A3FD0] font-semibold">
                  {isEn ? 'Full Control Principle' : 'Prinsip Kendali Penuh'}
                </p>
                <p className="mt-2 text-[14px] text-[#17122B] leading-[1.65]">
                  {isEn
                    ? 'You hold full control over your database, audit logs, and an instant pause button (kill-switch) whenever needed.'
                    : 'Kamu memegang kendali atas database, riwayat log, dan tombol jeda (kill-switch) kapan pun dibutuhkan.'}
                </p>
              </Card>
            </div>

            {/* Right Column: 4-Row Specification Ledger */}
            <div className="lg:col-span-7">
              <Reveal staggerSelector=".guardrail-row">
                <div className="rounded-[24px] bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)] divide-y divide-[rgba(91,60,196,0.14)] overflow-hidden">
                  {(isEn
                    ? [
                        {
                          num: '01',
                          icon: <ShieldCheck size={18} className="text-[#6A3FD0]" />,
                          title: 'Explicit authority boundaries',
                          desc: 'The agent only executes tools approved upfront—such as checking schedule slots and logging reservations, with zero permission to delete data.',
                        },
                        {
                          num: '02',
                          icon: <UserCheck size={18} className="text-[#6A3FD0]" />,
                          title: 'Smooth human escalation (Human Handover)',
                          desc: 'Out-of-SOP questions, custom negotiations, or complaints are immediately routed to your staff with full conversation context.',
                        },
                        {
                          num: '03',
                          icon: <FileCheck size={18} className="text-[#6A3FD0]" />,
                          title: 'Every action is logged',
                          desc: 'Every incoming message, parameter parse, and tool execution is recorded in a transparent audit log you can inspect anytime.',
                        },
                        {
                          num: '04',
                          icon: <Lock size={18} className="text-[#6A3FD0]" />,
                          title: 'Your data stays yours',
                          desc: 'You choose the storage infrastructure—whether on your internal company database (on-premise) or a private cloud.',
                        },
                      ]
                    : [
                        {
                          num: '01',
                          icon: <ShieldCheck size={18} className="text-[#6A3FD0]" />,
                          title: 'Batas wewenang jelas',
                          desc: 'Agent hanya mengeksekusi tool yang diizinkan sejak awal—seperti cek slot jadwal dan catat reservasi, tanpa akses hapus data.',
                        },
                        {
                          num: '02',
                          icon: <UserCheck size={18} className="text-[#6A3FD0]" />,
                          title: 'Serah mulus ke manusia (Human Handover)',
                          desc: 'Pertanyaan di luar SOP, negosiasi khusus, atau komplain langsung dialihkan ke stafmu beserta konteks percakapan utuh.',
                        },
                        {
                          num: '03',
                          icon: <FileCheck size={18} className="text-[#6A3FD0]" />,
                          title: 'Semua tindakan tercatat',
                          desc: 'Setiap pesan masuk, pembacaan parameter, dan eksekusi tool terekam di log transparan yang mudah diaudit kapan saja.',
                        },
                        {
                          num: '04',
                          icon: <Lock size={18} className="text-[#6A3FD0]" />,
                          title: 'Data tetap milikmu',
                          desc: 'Infrastruktur penyimpanan bebas kamu pilih—baik di database internal perusahaanmu (on-premise) maupun private cloud.',
                        },
                      ]
                  ).map((row) => (
                    <div
                      key={row.num}
                      className="guardrail-row p-5 md:p-6 flex flex-col sm:flex-row sm:items-start gap-4 hover:bg-[#EFEAFB]/40 transition-colors"
                    >
                      <div className="flex items-center gap-3 sm:w-48 shrink-0">
                        <span className="font-mono text-[11px] text-[#6A3FD0] font-semibold">
                          {row.num}
                        </span>
                        <div className="w-8 h-8 rounded-[10px] bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)] flex items-center justify-center shrink-0">
                          {row.icon}
                        </div>
                        <h3 className="text-[16px] font-semibold text-[#17122B] sm:hidden">
                          {row.title}
                        </h3>
                      </div>
                      <div className="flex-1">
                        <h3 className="hidden sm:block text-[16px] font-semibold text-[#17122B]">
                          {row.title}
                        </h3>
                        <p className="mt-1 text-[14px] md:text-[15px] text-[#5B5675] leading-[1.65]">
                          {row.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* =====================================================
          9. STACK (CONFIRMED TOOLS)
          ===================================================== */}
      <section className="py-12 md:py-16 bg-[#F8F6FE] border-b border-[rgba(91,60,196,0.14)] cv-auto">
        <Container className="text-center">
          <Tag>{isEn ? 'PRODUCTION TECHNOLOGY' : 'TEKNOLOGI PRODUKSI'}</Tag>
          <WordRevealHeading
            as="h2"
            text={
              isEn
                ? 'Built with tools we know inside out'
                : 'Dibangun dengan tool yang kami kuasai'
            }
            className="mt-2"
          />
          <p className="mt-2 text-[15px] text-[#5B5675] max-w-lg mx-auto">
            {isEn
              ? 'A stable, lightweight technical foundation that is easy to maintain long-term.'
              : 'Fondasi teknis yang stabil, ringan, dan mudah dirawat jangka panjang.'}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {[
              'React',
              'Node.js',
              'Python',
              'PostgreSQL',
              'WhatsApp Cloud API',
              'n8n Workflow',
            ].map((tool) => (
              <span
                key={tool}
                className="px-4 py-2 rounded-full bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)] font-mono text-[12px] font-medium text-[#17122B]"
              >
                {tool}
              </span>
            ))}
          </div>
        </Container>
      </section>

      {/* =====================================================
          10. CARA KERJA (4 STEPS TIMELINE WITH SCROLL-SCRUBBED LINE)
          ===================================================== */}
      <section
        id="cara-kerja"
        ref={processSectionRef}
        className="py-16 md:py-24 bg-[#FFFFFF] border-b border-[rgba(91,60,196,0.14)] cv-auto"
      >
        <Container>
          <SectionHeading
            eyebrow={isEn ? '6-PHASE ENGINEERING' : 'ALUR 6 TAHAP'}
            title={
              isEn
                ? 'How we work without guesswork'
                : 'Cara kerja dengan kepastian tertulis'
            }
            description={
              isEn
                ? 'A disciplined six-phase process from 30-minute free audit to final release and handover.'
                : 'Enam tahap terstruktur dari audit gratis 30 menit hingga peluncuran dan serah terima.'
            }
            action={
              <Button
                to={toLocalizedHref('/cara-kerja', locale, prefixMode)}
                variant="secondary"
              >
                <span>{isEn ? 'View all 6 phases' : 'Lihat 6 tahap lengkap'}</span>
                <ArrowRight size={15} className="text-[#6A3FD0]" />
              </Button>
            }
          />

          {/* Horizontal Scroll-Scrubbed Progress Line (transform: scaleX) */}
          <div
            aria-hidden="true"
            className="hidden md:block w-full h-1 rounded-full bg-[#EFEAFB] mb-6 overflow-hidden"
          >
            <div
              ref={processLineFillRef}
              style={{
                transform: 'scaleX(0.25)',
                transformOrigin: 'left',
                transition: 'transform 220ms cubic-bezier(0.22, 1, 0.36, 1)',
              }}
              className="w-full h-full bg-[#6A3FD0] rounded-full"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {PROCESS_PHASES.map((phase, idx) => {
              const isLit = idx <= activeProcessStep;
              return (
                <Card
                  key={phase.number}
                  variant={isLit ? 'white' : 'soft'}
                  className={`h-full flex flex-col justify-between transition-colors duration-300 ${
                    isLit ? 'border-[#6A3FD0]/40' : ''
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-[rgba(91,60,196,0.14)] font-mono text-[11px] uppercase tracking-[0.08em]">
                      <span className="text-[#6A3FD0] font-semibold flex items-center gap-1.5">
                        <span
                          className={`w-2 h-2 rounded-full transition-transform duration-300 ${
                            isLit ? 'bg-[#6A3FD0] scale-110' : 'bg-[#B9A2F2]/60 scale-100'
                          }`}
                        />
                        <span>{isEn ? `Phase ${phase.number}` : `Tahap ${phase.number}`}</span>
                      </span>
                    </div>
                    <h3>{isEn ? phase.titleEn : phase.titleId}</h3>
                    <p className="mt-2 text-[14px] text-[#5B5675] leading-[1.65]">
                      {isEn ? phase.descEn : phase.descId}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      {/* =====================================================
          11. PROYEK INTERNAL (SHARED INTERNAL DEMO DATASET)
          ===================================================== */}
      <section
        id="proyek"
        className="py-16 md:py-24 bg-[#F8F6FE] border-b border-[rgba(91,60,196,0.14)] cv-auto"
      >
        <Container>
          <SectionHeading
            eyebrow={isEn ? 'INTERNAL PROJECTS' : 'PROYEK INTERNAL'}
            title={
              isEn
                ? 'Internal projects we have built'
                : 'Proyek internal yang kami bangun'
            }
            description={
              isEn
                ? 'Internal CHESTAADOTCOM demos and prototypes built to validate workflows across different industries.'
                : 'Demo dan prototipe internal CHESTAADOTCOM yang kami bangun untuk menguji alur kerja di berbagai industri.'
            }
            action={
              <Button
                to={toLocalizedHref('/portfolio', locale, prefixMode)}
                variant="secondary"
              >
                <span>{isEn ? 'View all projects' : 'Lihat semua proyek'}</span>
                <ArrowRight size={15} className="text-[#6A3FD0]" />
              </Button>
            }
          />

          <Reveal staggerSelector=".project-blueprint-card">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
              {featuredInternalProjects.map((project) => {
                const imgAsset = getImageMeta(project.cover, locale);
                const projectHref = toLocalizedHref(
                  `/portfolio/${project.slug}`,
                  locale,
                  prefixMode
                );
                return (
                  <Card
                    key={project.slug}
                    as="article"
                    variant="white"
                    padding="none"
                    className="project-blueprint-card h-full flex flex-col justify-between overflow-hidden"
                  >
                    <div>
                      <Link
                        to={projectHref}
                        className="relative block aspect-video bg-[#F8F6FE] border-b border-[rgba(91,60,196,0.14)] overflow-hidden"
                      >
                        <ImageWithFallback
                          src={imgAsset.src}
                          alt={imgAsset.alt}
                          width={imgAsset.width}
                          height={imgAsset.height}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 left-3 flex flex-wrap items-center gap-2">
                          <Badge variant="tint">{project.internalBadgeLabel}</Badge>
                          <Badge variant="outline" className="bg-[#FFFFFF]/90">
                            {project.categoryLabel}
                          </Badge>
                        </div>
                      </Link>
                      <div className="p-5 md:p-6 space-y-4">
                        <div>
                          <Tag>{project.industry}</Tag>
                          <h3 className="mt-1">
                            <Link
                              to={projectHref}
                              className="hover:text-[#6A3FD0] transition-colors"
                            >
                              {project.title}
                            </Link>
                          </h3>
                        </div>

                        <p className="text-[14px] text-[#5B5675] leading-[1.6]">
                          {project.oneLiner}
                        </p>

                        <p className="p-3 rounded-[14px] bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)] text-[#6A3FD0] font-mono text-[11px]">
                          {isEn ? 'Design target:' : 'Target desain:'} {project.targetNote}
                        </p>
                      </div>
                    </div>

                    <div className="p-5 md:p-6 pt-0">
                      <Button to={projectHref} variant="tint" fullWidth>
                        <span>
                          {isEn ? 'View project details' : 'Lihat detail proyek'}
                        </span>
                        <ArrowUpRight size={14} />
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* =====================================================
          12. HARGA (CLEAR PRICING)
          ===================================================== */}
      <section
        id="harga"
        className="py-16 md:py-24 bg-[#FFFFFF] border-b border-[rgba(91,60,196,0.14)] cv-auto"
      >
        <Container>
          <SectionHeading
            eyebrow={isEn ? 'COST TRANSPARENCY' : 'TRANSPARANSI BIAYA'}
            title={
              isEn
                ? 'Clear pricing from day one'
                : 'Harga yang jelas dari awal'
            }
            description={
              isEn
                ? 'Zero hidden fees. You know the exact system scope before development begins.'
                : 'Tanpa biaya tersembunyi. Kamu tahu persis cakupan sistem sebelum pengerjaan dimulai.'
            }
            action={
              <Button
                to={toLocalizedHref('/harga', locale, prefixMode)}
                variant="secondary"
              >
                <span>{isEn ? 'View full pricing & packages' : 'Lihat rincian harga & paket lengkap'}</span>
                <ArrowRight size={15} className="text-[#6A3FD0]" />
              </Button>
            }
          />

          <Reveal staggerSelector=".pricing-card-item">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
              <Card variant="soft" className="pricing-card-item h-full flex flex-col justify-between">
                <div>
                  <Tag>{isEn ? 'Fast Package' : 'Paket Cepat'}</Tag>
                  <h3 className="mt-1">Landing Page</h3>
                  <div className="mt-4 flex items-baseline gap-1.5">
                    <span className="font-mono text-[12px] text-[#5B5675]">
                      {isEn ? 'from' : 'mulai'}
                    </span>
                    <span className="font-display text-[28px] font-semibold text-[#6A3FD0] tracking-tight">
                      {isEn ? 'IDR 1,200,000' : 'Rp1.200.000'}
                    </span>
                  </div>
                  <p className="mt-2 text-[14px] text-[#5B5675]">
                    {isEn
                      ? 'For ad campaigns, concise company profiles, and conversion-focused offer pages.'
                      : 'Untuk kampanye iklan, profil bisnis ringkas, dan halaman penawaran fokus konversi.'}
                  </p>

                  <ul className="mt-6 space-y-2.5 text-[14px] text-[#17122B]">
                    <li className="flex items-center gap-2.5">
                      <Check size={16} className="text-[#6A3FD0] shrink-0" />
                      <span>
                        {isEn
                          ? 'Fast mobile-first design'
                          : 'Desain mobile-first cepat'}
                      </span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check size={16} className="text-[#6A3FD0] shrink-0" />
                      <span>
                        {isEn
                          ? 'SEO structure & JSON-LD Schema'
                          : 'Struktur SEO & Schema JSON-LD'}
                      </span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check size={16} className="text-[#6A3FD0] shrink-0" />
                      <span>
                        {isEn
                          ? 'Formatted WhatsApp CTA integration'
                          : 'Integrasi CTA WhatsApp terformat'}
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="mt-8">
                  <Button
                    href={buildWaUrl(
                      isEn
                        ? 'Hello Chesta & Zeeshan, I want to order a Landing Page (starting from IDR 1,200,000).'
                        : 'Halo Chesta & Zeeshan, saya ingin pesan Landing Page (mulai Rp1.200.000).'
                    )}
                    variant="secondary"
                    fullWidth
                  >
                    <span>
                      {isEn ? 'Order Landing Page' : 'Pesan Landing Page'}
                    </span>
                    <ArrowUpRight size={14} />
                  </Button>
                </div>
              </Card>

              <Card variant="highlighted" className="pricing-card-item h-full flex flex-col justify-between">
                <div>
                  <Tag>{isEn ? 'Custom System' : 'Sistem Khusus'}</Tag>
                  <h3 className="mt-1">Web App &amp; Dashboard</h3>
                  <div className="mt-4 flex items-baseline gap-1.5">
                    <span className="font-display text-[28px] font-semibold text-[#17122B] tracking-tight">
                      {isEn ? 'Scoped to Fit' : 'Sesuai Scope'}
                    </span>
                  </div>
                  <p className="mt-2 text-[14px] text-[#5B5675]">
                    {isEn
                      ? 'Investment scales with module count, user roles, and database structure.'
                      : 'Biaya menyesuaikan jumlah modul, peran pengguna, dan struktur database.'}
                  </p>

                  <ul className="mt-6 space-y-2.5 text-[14px] text-[#17122B]">
                    <li className="flex items-center gap-2.5">
                      <Check size={16} className="text-[#6A3FD0] shrink-0" />
                      <span>
                        {isEn
                          ? 'Internal operations dashboard'
                          : 'Dashboard operasional internal'}
                      </span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check size={16} className="text-[#6A3FD0] shrink-0" />
                      <span>
                        {isEn
                          ? 'Multi-page & API integrations'
                          : 'Multi-halaman & integrasi API'}
                      </span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check size={16} className="text-[#6A3FD0] shrink-0" />
                      <span>
                        {isEn
                          ? 'Full source code ownership'
                          : 'Kepemilikan penuh source code'}
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="mt-8">
                  <Button
                    href={buildWaUrl(
                      isEn
                        ? 'Hello Chesta & Zeeshan, I would like to consult on building a custom Web App & Dashboard.'
                        : 'Halo Chesta & Zeeshan, saya ingin konsultasi pembuatan Web App & Dashboard custom.'
                    )}
                    variant="primary"
                    fullWidth
                  >
                    <span>
                      {isEn ? 'Consult on Scope' : 'Konsultasi Lingkup Kerja'}
                    </span>
                    <ArrowUpRight size={14} />
                  </Button>
                </div>
              </Card>

              <Card variant="soft" className="pricing-card-item h-full flex flex-col justify-between">
                <div>
                  <Tag>Agentic AI</Tag>
                  <h3 className="mt-1">
                    {isEn ? 'AI Agent & Automation' : 'AI Agent & Otomasi'}
                  </h3>
                  <div className="mt-4 flex items-baseline gap-1.5">
                    <span className="font-display text-[24px] font-semibold text-[#6A3FD0] tracking-tight">
                      {isEn ? 'After Free Audit' : 'Setelah Audit Gratis'}
                    </span>
                  </div>
                  <p className="mt-2 text-[14px] text-[#5B5675]">
                    {isEn
                      ? 'Calculated transparently based on the number of connected tools and workflow rules.'
                      : 'Dihitung transparan berdasarkan jumlah tool dan aturan alur kerja yang dihubungkan.'}
                  </p>

                  <ul className="mt-6 space-y-2.5 text-[14px] text-[#17122B]">
                    <li className="flex items-center gap-2.5">
                      <Check size={16} className="text-[#6A3FD0] shrink-0" />
                      <span>
                        {isEn
                          ? 'Free 30-minute workflow audit'
                          : 'Audit alur 30 menit tanpa biaya'}
                      </span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check size={16} className="text-[#6A3FD0] shrink-0" />
                      <span>
                        {isEn
                          ? 'WhatsApp, Calendar & CRM automation'
                          : 'Otomasi WhatsApp, Kalender & CRM'}
                      </span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check size={16} className="text-[#6A3FD0] shrink-0" />
                      <span>Guardrails &amp; Human Handover</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-8">
                  <Button
                    href={buildWaUrl(
                      isEn
                        ? 'Hello Chesta & Zeeshan, I would like to schedule a free 30-minute audit for an AI agent.'
                        : 'Halo Chesta & Zeeshan, saya ingin jadwalkan audit gratis 30 menit untuk AI agent.'
                    )}
                    variant="secondary"
                    fullWidth
                  >
                    <span>
                      {isEn ? 'Schedule Free Audit' : 'Jadwalkan Audit Gratis'}
                    </span>
                    <ArrowUpRight size={14} />
                  </Button>
                </div>
              </Card>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* =====================================================
          13. FOUNDERS (EQUAL CO-FOUNDERS)
          ===================================================== */}
      <section className="py-16 md:py-24 bg-[#F8F6FE] border-b border-[rgba(91,60,196,0.14)] cv-auto">
        <Container>
          <SectionHeading
            eyebrow={isEn ? 'CO-FOUNDING TEAM' : 'TIM CO-FOUNDER'}
            title={
              isEn
                ? 'Built directly by the founders'
                : 'Dikerjakan langsung oleh pendiri'
            }
            description={
              isEn
                ? 'No account executive middlemen. You discuss and design your system directly with the engineers building it.'
                : 'Tanpa perantara account executive. Kamu berdiskusi dan merancang sistem langsung bersama pembuatnya.'
            }
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            <Card variant="white" className="h-full flex items-start gap-4">
              <div className="w-14 h-14 rounded-[16px] overflow-hidden bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)] shrink-0">
                <img
                  src="/favicon.svg"
                  alt="Chesta Azka"
                  width={56}
                  height={56}
                  loading="lazy"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div>
                <h3>Chesta Azka</h3>
                <Tag className="block mt-0.5">
                  {isEn
                    ? 'Architecture, product, and technology'
                    : 'Arsitektur, produk, dan teknologi'}
                </Tag>
                <p className="mt-2 text-[14px] text-[#5B5675] leading-[1.65]">
                  {isEn
                    ? 'Leads software engineering, Core Web Vitals speed, SEO/AEO structure, and AI agent tool integrations.'
                    : 'Memimpin rekayasa kode, kecepatan Core Web Vitals, struktur SEO/AEO, serta integrasi tool AI agent.'}
                </p>
              </div>
            </Card>

            <Card variant="white" className="h-full flex items-start gap-4">
              <div className="w-14 h-14 rounded-[16px] bg-[#EFEAFB] text-[#6A3FD0] font-display font-semibold text-[18px] flex items-center justify-center shrink-0 border border-[rgba(91,60,196,0.14)]">
                Z
              </div>
              <div>
                <h3>Zeeshan</h3>
                <Tag className="block mt-0.5">
                  {isEn
                    ? 'Operations and client success'
                    : 'Operasional dan client success'}
                </Tag>
                <p className="mt-2 text-[14px] text-[#5B5675] leading-[1.65]">
                  {isEn
                    ? 'Leads client workflow mapping, admin SOP alignment, release schedules, and post-launch onboarding.'
                    : 'Memimpin pemetaan alur kerja bisnis klien, kepatuhan SOP admin, jadwal rilis, dan pendampingan pasca-launch.'}
                </p>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      {/* =====================================================
          14. BLOG TERBARU (3 LATEST POSTS WITH SHARED VIEW TRANSITION)
          ===================================================== */}
      <section className="py-16 md:py-24 bg-[#FFFFFF] border-b border-[rgba(91,60,196,0.14)] cv-auto">
        <Container>
          <SectionHeading
            eyebrow={isEn ? 'EDUCATION & INSIGHTS' : 'EDUKASI & WAWASAN'}
            title={
              isEn
                ? 'Latest articles & guides'
                : 'Artikel & panduan terbaru'
            }
            description={
              isEn
                ? 'Technical notes and practical cost breakdowns for business owners.'
                : 'Catatan teknis dan hitungan biaya praktis untuk pemilik bisnis.'
            }
            action={
              <Button
                to={toLocalizedHref('/blog', locale, prefixMode)}
                variant="secondary"
              >
                <span>{isEn ? 'All Articles' : 'Semua Artikel'}</span>
                <ArrowRight size={15} className="text-[#6A3FD0]" />
              </Button>
            }
          />

          <Reveal staggerSelector=".home-blog-card">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
              {latestPosts.map((post) => (
                <Card
                  key={post.slug}
                  as="article"
                  variant="soft"
                  padding="none"
                  className="home-blog-card h-full flex flex-col justify-between overflow-hidden group"
                >
                  <div>
                    <Link
                      to={toLocalizedHref(`/blog/${post.slug}`, locale, prefixMode)}
                      className="block aspect-video bg-[#FFFFFF] border-b border-[rgba(91,60,196,0.14)] overflow-hidden"
                    >
                      <ImageWithFallback
                        src={post.coverImage}
                        alt={post.coverAlt}
                        width={1280}
                        height={720}
                        viewTransitionName={`blog-cover-${post.slug}`}
                        className="w-full h-full object-cover"
                      />
                    </Link>
                    <div className="p-5 md:p-6">
                      <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-[#5B5675]">
                        <span className="text-[#6A3FD0] font-semibold">{post.category}</span>
                        <span>·</span>
                        <span>{post.readTime}</span>
                      </div>
                      <h3 className="mt-2 group-hover:text-[#6A3FD0] transition-colors line-clamp-2">
                        <Link
                          to={toLocalizedHref(`/blog/${post.slug}`, locale, prefixMode)}
                        >
                          {post.title}
                        </Link>
                      </h3>
                      <p className="mt-2 text-[14px] text-[#5B5675] line-clamp-3 leading-[1.65]">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="px-5 md:px-6 pb-5 md:pb-6">
                    <Link
                      to={toLocalizedHref(`/blog/${post.slug}`, locale, prefixMode)}
                      className="link-underline inline-flex items-center gap-1.5 min-h-[44px] text-[14px] font-semibold text-[#6A3FD0]"
                    >
                      <span>{isEn ? 'Read Guide' : 'Baca Panduan'}</span>
                      <ArrowRight size={14} className="icon-slide-hover" />
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* =====================================================
          15. FAQ ACCORDION
          ===================================================== */}
      <section
        id="faq"
        className="py-16 md:py-24 bg-[#F8F6FE] border-b border-[rgba(91,60,196,0.14)] cv-auto"
      >
        <Container className="max-w-[768px]">
          <SectionHeading
            align="center"
            eyebrow={isEn ? 'COMMON QUESTIONS' : 'PERTANYAAN UMUM'}
            title={
              isEn
                ? 'Frequently asked questions'
                : 'Pertanyaan yang sering ditanyakan'
            }
            description={
              isEn
                ? 'Direct answers about how we work, cost estimates, and data security.'
                : 'Jawaban langsung seputar cara kerja, estimasi biaya, dan keamanan data.'
            }
          />

          <FAQAccordion items={faqs} defaultOpenIndex={0} />
        </Container>
      </section>

      {/* =====================================================
          16. FINAL CTA
          ===================================================== */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-[#F8F6FE] to-[#EFEAFB] cv-auto">
        <Container className="max-w-[860px]">
          <CTABlock
            title={
              isEn
                ? 'Tell us the repetitive task that drains your team the most.'
                : 'Ceritakan kerjaan yang paling bikin capek.'
            }
            description={
              isEn
                ? 'We will tell you honestly whether it is worth automating and what it will cost.'
                : 'Kami bilang jujur apakah layak diotomasi, dan berapa estimasi biayanya.'
            }
            whatsappContext={{ type: 'default', url: location.pathname }}
          />
        </Container>
      </section>
    </div>
  );
}
