import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  MessageCircle,
  Search,
  ChevronDown,
  ArrowRight,
  User,
  Send,
  HelpCircle,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import SEOMetadata from '../components/atoms/SEOMetadata';
import TrustStrip from '../components/atoms/TrustStrip';
import { FAQ_CATEGORIES, FAQ_THREADS, FAQThread } from '../data/faq';
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

export default function FAQPage() {
  const location = useLocation();
  const { locale, prefixMode } = parseLocalizedPath(location.pathname);
  const isEn = locale === 'en';

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [allExpanded, setAllExpanded] = useState<boolean>(false);
  const [openThreadIds, setOpenThreadIds] = useState<Record<string, boolean>>({});
  const [customQuestion, setCustomQuestion] = useState('');

  const homeHref = toLocalizedHref('/', locale, prefixMode);
  const auditHref = toLocalizedHref('/audit-gratis', locale, prefixMode);
  const waCtaLabel = getWhatsAppCtaLabel(locale);

  // Auto-expand and scroll to thread on hash change / load
  useEffect(() => {
    if (location.hash) {
      const hashId = location.hash.replace('#', '');
      if (hashId) {
        setOpenThreadIds((prev) => ({ ...prev, [hashId]: true }));
        window.setTimeout(() => {
          const el = document.getElementById(hashId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 150);
      }
    }
  }, [location.hash]);

  // Filter threads by search query & active category
  const filteredThreads = FAQ_THREADS.filter((thread) => {
    const matchesCategory =
      activeCategory === 'all' || thread.category === activeCategory;

    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesCategory;

    const questionText = isEn
      ? thread.questionEn.toLowerCase()
      : thread.questionId.toLowerCase();
    const answerText = isEn
      ? thread.answerEn.toLowerCase()
      : thread.answerId.toLowerCase();

    const matchesSearch = questionText.includes(q) || answerText.includes(q);
    return matchesCategory && matchesSearch;
  });

  const handleToggleExpandAll = () => {
    const nextState = !allExpanded;
    setAllExpanded(nextState);
    const newMap: Record<string, boolean> = {};
    FAQ_THREADS.forEach((t) => {
      newMap[t.id] = nextState;
    });
    setOpenThreadIds(newMap);
  };

  const handleThreadToggle = (threadId: string, isOpen: boolean) => {
    setOpenThreadIds((prev) => ({ ...prev, [threadId]: isOpen }));
  };

  const handleComposerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQuestion.trim()) return;

    const waUrl = buildWhatsAppLink(
      {
        type: 'custom',
        message: isEn
          ? `Halo Chesta & Zeeshan, saya punya pertanyaan:\n"${customQuestion.trim()}"`
          : `Halo Chesta & Zeeshan, saya punya pertanyaan:\n"${customQuestion.trim()}"`,
      },
      locale
    );

    trackWaClick('custom', 'faq_composer', locale);
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  // Group filtered threads by category for rendering
  const groupedCategories = FAQ_CATEGORIES.map((cat) => {
    const threadsInCat = filteredThreads.filter((t) => t.category === cat.id);
    return {
      ...cat,
      threads: threadsInCat,
    };
  }).filter((cat) => cat.threads.length > 0);

  // JSON-LD Schema: FAQPage + WebPage + BreadcrumbList
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `https://chestaa.com${location.pathname}#webpage`,
        url: `https://chestaa.com${location.pathname}`,
        name: isEn
          ? 'FAQ: Pricing, Process, and Business AI Agents | CHESTAADOTCOM'
          : 'FAQ: Harga, Proses, dan AI Agent untuk Bisnis | CHESTAADOTCOM',
        description: isEn
          ? 'Candid answers on pricing, deposit, delivery time, AI agents, data privacy, and working with CHESTAADOTCOM.'
          : 'Jawaban jujur soal harga, DP, waktu pengerjaan, AI agent, data, dan kerja sama dengan CHESTAADOTCOM. Tanya langsung kalau belum ketemu.',
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
            name: 'FAQ',
            item: `https://chestaa.com${location.pathname}`,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `https://chestaa.com${location.pathname}#faq`,
        mainEntity: FAQ_THREADS.map((thread) => ({
          '@type': 'Question',
          name: isEn ? thread.questionEn : thread.questionId,
          acceptedAnswer: {
            '@type': 'Answer',
            text: isEn ? thread.answerEn : thread.answerId,
          },
        })),
      },
    ],
  };

  return (
    <div className="pt-24 pb-20 bg-[#FFFFFF] text-[#17122B]">
      <SEOMetadata
        title={
          isEn
            ? 'FAQ: Pricing, Process, and Business AI Agents | CHESTAADOTCOM'
            : 'FAQ: Harga, Proses, dan AI Agent untuk Bisnis | CHESTAADOTCOM'
        }
        description={
          isEn
            ? 'Candid answers on pricing, deposit, delivery time, AI agents, data privacy, and working with CHESTAADOTCOM.'
            : 'Jawaban jujur soal harga, DP, waktu pengerjaan, AI agent, data, dan kerja sama dengan CHESTAADOTCOM. Tanya langsung kalau belum ketemu.'
        }
        path={location.pathname}
        jsonLd={jsonLd}
      />

      <Container>
        {/* 1. HERO SECTION */}
        <section className="mb-8">
          <Breadcrumb
            items={[
              { label: isEn ? 'Home' : 'Beranda', href: homeHref },
              { label: 'FAQ' },
            ]}
          />

          <Reveal className="mt-6">
            <Badge className="mb-3">
              {isEn ? 'Frequently Asked Questions' : 'Pertanyaan Sering Diajukan'}
            </Badge>
            <h1 className="font-display text-[32px] sm:text-[42px] md:text-[48px] font-semibold tracking-tight text-[#17122B] leading-[1.15] max-w-3xl">
              {isEn
                ? 'Questions we receive most often'
                : 'Pertanyaan yang sering kami terima'}
            </h1>
            <p className="mt-4 text-[16px] sm:text-[18px] text-[#5B5675] leading-[1.6] max-w-2xl">
              {isEn
                ? 'Answered directly by Chesta and Zeeshan. If your question is not listed, ask us directly below.'
                : 'Dijawab langsung oleh Chesta dan Zeeshan. Kalau pertanyaanmu belum ada, tanya langsung di bawah.'}
            </p>
          </Reveal>
        </section>
      </Container>

      {/* Trust Strip */}
      <TrustStrip locale={locale} className="my-8" />

      <Container>
        <div className="max-w-[760px] mx-auto">
          {/* 2. TOOLBAR (Search Field, Categories & Open All Toggle) */}
          <section className="my-8 sticky top-20 z-20 pt-2 pb-4 bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[rgba(91,60,196,0.12)]">
            <div className="space-y-3">
              {/* Search Field & Expand All Toggle */}
              <div className="flex flex-col sm:flex-row items-center gap-2.5">
                <div className="relative flex-1 w-full">
                  <Search
                    size={17}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5B5675]"
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={
                      isEn
                        ? 'Search questions or answers...'
                        : 'Cari pertanyaan atau jawaban...'
                    }
                    className="w-full pl-10 pr-4 py-2.5 rounded-full bg-[#F8F6FE] border border-[rgba(91,60,196,0.18)] text-[14px] text-[#17122B] placeholder-[#5B5675] focus:outline-none focus:border-[#6A3FD0] focus:ring-2 focus:ring-[#6A3FD0]/20 transition-all"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[12px] font-bold text-[#5B5675] hover:text-[#17122B]"
                    >
                      ✕
                    </button>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleToggleExpandAll}
                  className="px-4 py-2.5 rounded-full bg-[#EFEAFB] text-[#6A3FD0] text-[13px] font-semibold hover:bg-[#6A3FD0] hover:text-[#FFFFFF] transition-colors whitespace-nowrap shrink-0 border border-[rgba(91,60,196,0.18)]"
                >
                  {allExpanded
                    ? isEn
                      ? 'Close All'
                      : 'Tutup Semua'
                    : isEn
                    ? 'Open All'
                    : 'Buka Semua'}
                </button>
              </div>

              {/* Category Filter Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[13px] scrollbar-none">
                <button
                  type="button"
                  onClick={() => setActiveCategory('all')}
                  className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-colors border ${
                    activeCategory === 'all'
                      ? 'bg-[#6A3FD0] text-[#FFFFFF] border-[#6A3FD0] font-semibold'
                      : 'bg-[#F8F6FE] text-[#5B5675] border-[rgba(91,60,196,0.14)] hover:text-[#17122B]'
                  }`}
                >
                  {isEn ? 'All Categories' : 'Semua Kategori'}
                </button>

                {FAQ_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-colors border ${
                      activeCategory === cat.id
                        ? 'bg-[#6A3FD0] text-[#FFFFFF] border-[#6A3FD0] font-semibold'
                        : 'bg-[#F8F6FE] text-[#5B5675] border-[rgba(91,60,196,0.14)] hover:text-[#17122B]'
                    }`}
                  >
                    {isEn ? cat.nameEn : cat.nameId}
                  </button>
                ))}
              </div>

              {/* Live Search Count Announcement */}
              <div
                aria-live="polite"
                className="text-[12.5px] font-mono text-[#5B5675] pt-0.5"
              >
                {filteredThreads.length === 0 ? (
                  <span className="text-[#D93838]">
                    {isEn
                      ? 'No results found. Ask us directly below.'
                      : 'Tidak ada hasil. Tanya langsung di bawah.'}
                  </span>
                ) : (
                  <span>
                    {isEn
                      ? `Showing ${filteredThreads.length} questions`
                      : `Menampilkan ${filteredThreads.length} pertanyaan`}
                  </span>
                )}
              </div>
            </div>
          </section>

          {/* 3. THREADS GROUPED BY CATEGORY */}
          {groupedCategories.length === 0 ? (
            <div className="my-12 p-8 rounded-[20px] bg-[#F8F6FE] border border-[rgba(91,60,196,0.18)] text-center space-y-3">
              <p className="text-[15px] font-medium text-[#17122B]">
                {isEn
                  ? 'No questions matched your search term.'
                  : 'Tidak ada pertanyaan yang sesuai dengan kata kuncimu.'}
              </p>
              <p className="text-[13.5px] text-[#5B5675]">
                {isEn
                  ? 'Type your question in the composer below and send it directly via WhatsApp.'
                  : 'Tulis pertanyaanmu di kolom bawah dan kirim langsung lewat WhatsApp.'}
              </p>
            </div>
          ) : (
            <div className="space-y-10 my-8">
              {groupedCategories.map((category) => (
                <div key={category.id} className="space-y-4">
                  {/* Category Header */}
                  <h2 className="font-display text-[20px] font-semibold text-[#17122B] tracking-tight border-b border-[rgba(91,60,196,0.15)] pb-2 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#6A3FD0]" />
                    <span>{isEn ? category.nameEn : category.nameId}</span>
                  </h2>

                  {/* Thread Items */}
                  <div className="space-y-4">
                    {category.threads.map((thread) => {
                      const isOpen = !!openThreadIds[thread.id];
                      const questionText = isEn
                        ? thread.questionEn
                        : thread.questionId;
                      const answerText = isEn
                        ? thread.answerEn
                        : thread.answerId;
                      const authorName =
                        thread.author === 'chesta' ? 'Chesta Azka' : 'Zeeshan';
                      const authorMonogram =
                        thread.author === 'chesta' ? 'CA' : 'Z';

                      const threadWaUrl = buildWhatsAppLink(
                        {
                          type: 'custom',
                          message: isEn
                            ? `Halo Chesta & Zeeshan, saya ingin bertanya tentang FAQ: "${questionText}"`
                            : `Halo Chesta & Zeeshan, saya ingin bertanya tentang FAQ: "${questionText}"`,
                        },
                        locale
                      );

                      return (
                        <details
                          key={thread.id}
                          id={thread.id}
                          open={isOpen}
                          onToggle={(e) => {
                            const target = e.target as HTMLDetailsElement;
                            handleThreadToggle(thread.id, target.open);
                          }}
                          className="group border border-[rgba(91,60,196,0.16)] rounded-[20px] bg-[#FFFFFF] transition-all duration-200 overflow-hidden"
                        >
                          {/* Summary Row (The Comment) */}
                          <summary className="p-4 sm:p-5 cursor-pointer list-none flex items-start justify-between gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6A3FD0]/40 rounded-[20px]">
                            <div className="flex items-start gap-3">
                              {/* Prospective Client Avatar */}
                              <div className="w-8 h-8 rounded-full bg-[#EFEAFB] border border-[rgba(91,60,196,0.2)] flex items-center justify-center shrink-0 mt-0.5">
                                <User size={15} className="text-[#5B5675]" />
                              </div>

                              <div className="space-y-1">
                                <span className="font-mono text-[11px] font-semibold text-[#5B5675] uppercase tracking-wider block">
                                  {isEn ? 'Prospective Client' : 'Calon Klien'}
                                </span>
                                <h3 className="font-display text-[15.5px] sm:text-[16.5px] font-semibold text-[#17122B] leading-snug">
                                  {questionText}
                                </h3>
                              </div>
                            </div>

                            <ChevronDown
                              size={18}
                              className="text-[#5B5675] transition-transform duration-200 group-open:rotate-180 shrink-0 mt-1"
                            />
                          </summary>

                          {/* Reply Body (Open State) */}
                          <div className="px-4 pb-5 sm:px-5 sm:pb-5 pt-1 border-t border-[rgba(91,60,196,0.1)] bg-[#F8F6FE]/40 space-y-4">
                            {/* CSS Typing Dots Indicator */}
                            <div
                              aria-hidden="true"
                              className="pt-2 flex items-center gap-1.5 text-[#6A3FD0]"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-[#6A3FD0] animate-bounce" />
                              <span className="w-1.5 h-1.5 rounded-full bg-[#6A3FD0] animate-bounce [animation-delay:150ms]" />
                              <span className="w-1.5 h-1.5 rounded-full bg-[#6A3FD0] animate-bounce [animation-delay:300ms]" />
                              <span className="text-[11px] font-mono text-[#5B5675] ml-1">
                                {authorName} {isEn ? 'typing...' : 'mengetik...'}
                              </span>
                            </div>

                            {/* Reply Bubble */}
                            <div className="p-4 sm:p-5 rounded-[18px] bg-[#FFFFFF] border border-[rgba(91,60,196,0.18)] shadow-[0_4px_16px_rgba(23,18,43,0.04)] space-y-3">
                              <div className="flex items-center gap-2.5">
                                <div className="w-7 h-7 rounded-full bg-[#6A3FD0] text-[#FFFFFF] flex items-center justify-center font-display font-bold text-[12px] shrink-0">
                                  {authorMonogram}
                                </div>
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="font-display font-semibold text-[14px] text-[#17122B]">
                                    {authorName}
                                  </span>
                                  <span className="text-[11px] font-mono font-medium text-[#6A3FD0] bg-[#EFEAFB] px-2 py-0.5 rounded-md border border-[rgba(91,60,196,0.15)]">
                                    Tim CHESTAADOTCOM
                                  </span>
                                </div>
                              </div>

                              <p className="text-[14.5px] sm:text-[15px] text-[#17122B] leading-[1.65]">
                                {answerText}
                              </p>

                              {/* Cross-Links if applicable */}
                              {thread.crossLinks && thread.crossLinks.length > 0 && (
                                <div className="pt-2 border-t border-[rgba(91,60,196,0.1)] flex flex-wrap items-center gap-3 text-[13px]">
                                  <span className="font-semibold text-[#5B5675]">
                                    {isEn ? 'See also:' : 'Lihat juga:'}
                                  </span>
                                  {thread.crossLinks.map((link, lIdx) => (
                                    <Link
                                      key={lIdx}
                                      to={toLocalizedHref(
                                        link.href,
                                        locale,
                                        prefixMode
                                      )}
                                      className="text-[#6A3FD0] font-medium hover:underline flex items-center gap-1"
                                    >
                                      <span>
                                        {isEn ? link.labelEn : link.labelId}
                                      </span>
                                      <ExternalLink size={12} />
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>

                            {/* WhatsApp Thread Action Button */}
                            <div className="pt-1 flex items-center justify-end">
                              <a
                                href={threadWaUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() =>
                                  trackWaClick('custom', 'faq_thread', locale)
                                }
                                className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#6A3FD0] hover:text-[#5230B0] transition-colors py-1 px-2"
                              >
                                <MessageCircle size={14} />
                                <span>
                                  {isEn
                                    ? 'Ask a similar question via WhatsApp'
                                    : 'Tanya hal serupa lewat WhatsApp'}
                                </span>
                              </a>
                            </div>
                          </div>
                        </details>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 4. "PUNYA PERTANYAAN LAIN?" WHATSAPP COMPOSER */}
          <section className="my-16">
            <div className="p-6 sm:p-8 rounded-[24px] bg-[#F8F6FE] border border-[rgba(91,60,196,0.18)] space-y-4">
              <div className="flex items-center gap-2">
                <HelpCircle size={20} className="text-[#6A3FD0]" />
                <h2 className="font-display text-[20px] sm:text-[22px] font-semibold text-[#17122B] tracking-tight">
                  {isEn ? 'Have another question?' : 'Punya pertanyaan lain?'}
                </h2>
              </div>

              <p className="text-[14px] text-[#5B5675] leading-[1.6]">
                {isEn
                  ? 'Type your question below. Clicking submit formats it into a prefilled WhatsApp message directly to Chesta & Zeeshan.'
                  : 'Tulis pertanyaanmu di bawah. Menekan kirim akan menyusunnya menjadi pesan WhatsApp langsung ke Chesta & Zeeshan.'}
              </p>

              <form onSubmit={handleComposerSubmit} className="space-y-3">
                <textarea
                  value={customQuestion}
                  onChange={(e) => setCustomQuestion(e.target.value)}
                  rows={3}
                  placeholder={
                    isEn
                      ? 'Type your specific question here...'
                      : 'Tulis pertanyaan spesifikmu di sini...'
                  }
                  className="w-full p-4 rounded-[16px] bg-[#FFFFFF] border border-[rgba(91,60,196,0.18)] text-[14px] text-[#17122B] placeholder-[#5B5675] focus:outline-none focus:border-[#6A3FD0] focus:ring-2 focus:ring-[#6A3FD0]/20 transition-all resize-y min-h-[90px]"
                />

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <span className="text-[12px] font-mono text-[#5B5675]">
                    {isEn
                      ? 'This question is formatted into a WhatsApp message and is not stored on the site.'
                      : 'Pertanyaan ini hanya disusun menjadi pesan WhatsApp dan tidak disimpan di situs.'}
                  </span>

                  <button
                    type="submit"
                    disabled={!customQuestion.trim()}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#6A3FD0] hover:bg-[#5230B0] disabled:bg-[#D5CCF6] text-[#FFFFFF] text-[13.5px] font-semibold transition-colors shrink-0 cursor-pointer disabled:cursor-not-allowed"
                  >
                    <Send size={15} />
                    <span>{isEn ? 'Send via WhatsApp' : 'Kirim lewat WhatsApp'}</span>
                  </button>
                </div>
              </form>
            </div>
          </section>

          {/* 5. FINAL CTA SECTION */}
          <section className="my-16">
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
                <Button href={auditHref} variant="primary" size="lg">
                  <span>{isEn ? 'Free 30-Minute Audit' : 'Audit Gratis 30 Menit'}</span>
                  <ArrowRight size={16} />
                </Button>

                <Button
                  href={buildWhatsAppLink({ type: 'default' }, locale)}
                  onClick={() => trackWaClick('default', 'faq_bottom_cta', locale)}
                  variant="secondary"
                  size="lg"
                >
                  <MessageCircle size={18} />
                  <span>{waCtaLabel}</span>
                </Button>
              </div>
            </div>
          </section>
        </div>
      </Container>
    </div>
  );
}
