import React, { useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MessageCircle, Mail, MapPin, Camera } from 'lucide-react';
import { getPublishedBlogPosts } from '../../data/blog-posts';
import { getServiceAreasByServiceSlug } from '../../data/service-areas';
import { getServicePath, getServiceAreaPath } from '../../data/services';
import { Container, Button } from '../ui/DesignSystem';
import { staggerElements } from '../../lib/motion';
import {
  getLanguageSwitchLinks,
  getTranslation,
  parseLocalizedPath,
  toLocalizedHref,
} from '../../lib/i18n';
import {
  buildWhatsAppLink,
  getWhatsAppCtaLabel,
  resolveWhatsAppContextFromPathname,
} from '../../lib/whatsapp';
import { trackLanguageSwitch, trackWaClick } from '../../lib/analytics';

/**
 * Shared Footer (FooterSection) component
 * - Staggers footer link columns once on scroll into view
 * - Uses .link-underline animated underline on navigation links
 * - Uses instant <120ms opacity fade when switching between ID and EN
 */
export default function FooterSection() {
  const location = useLocation();
  const navigate = useNavigate();
  const footerGridRef = useRef<HTMLDivElement>(null);
  const { locale, prefixMode } = parseLocalizedPath(location.pathname);
  const langLinks = getLanguageSwitchLinks(location.pathname);

  useEffect(() => {
    return staggerElements(footerGridRef.current, '.footer-stagger-col', {
      stagger: 0.06,
      y: 20,
    });
  }, []);

  const handleLangSwitch = (e: React.MouseEvent<HTMLAnchorElement>, targetHref: string) => {
    e.preventDefault();
    const parsedTarget = parseLocalizedPath(targetHref);
    if (parsedTarget.locale !== locale) {
      trackLanguageSwitch(locale, parsedTarget.locale, location.pathname);
    }
    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => { finished: Promise<void> };
    };
    document.documentElement.setAttribute('data-lang-switching', 'true');
    if (doc.startViewTransition) {
      const vt = doc.startViewTransition(() => {
        navigate(targetHref);
      });
      vt.finished.finally(() => {
        document.documentElement.removeAttribute('data-lang-switching');
      });
    } else {
      navigate(targetHref);
      window.setTimeout(() => {
        document.documentElement.removeAttribute('data-lang-switching');
      }, 140);
    }
  };

  const waContext = resolveWhatsAppContextFromPathname(location.pathname, locale);
  const whatsappUrl = buildWhatsAppLink(waContext, locale);
  const whatsappCtaLabel = getWhatsAppCtaLabel(locale);

  const webAreaPages = getServiceAreasByServiceSlug('pembuatan-website', true, locale);
  const aiAreaPages = getServiceAreasByServiceSlug('ai-agent', true, locale);
  const footerBlogPosts = getPublishedBlogPosts(locale).slice(0, 5);
  const areasHubHref = locale === 'en' ? '/en/areas' : '/id/area';

  return (
    <footer className="bg-[#FFFFFF] text-[#5B5675] border-t border-[rgba(91,60,196,0.14)] pt-16 pb-24 md:pb-16">
      <Container>
        <div
          ref={footerGridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-[rgba(91,60,196,0.14)]"
        >
          {/* Col 1: Brand & Plain Summary */}
          <div className="footer-stagger-col lg:col-span-5 space-y-4">
            <Link
              to={toLocalizedHref('/', locale, prefixMode)}
              className="inline-flex items-center gap-2 min-h-[44px]"
            >
              <span className="w-2 h-2 rounded-full bg-[#6A3FD0]" />
              <span className="font-display text-[16px] font-semibold tracking-tight text-[#17122B]">
                CHESTAADOTCOM
              </span>
            </Link>
            <p className="text-[15px] text-[#5B5675] leading-[1.65] max-w-md">
              {getTranslation(locale, 'footer.brandDesc')}
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button
                href={whatsappUrl}
                onClick={() =>
                  trackWaClick(waContext.type || 'default', 'footer_cta', locale)
                }
                variant="primary"
                className="min-h-[40px] px-4 py-2"
              >
                <MessageCircle size={15} />
                <span>{whatsappCtaLabel}</span>
              </Button>
              <Button
                href="https://instagram.com/chestaadotcom"
                variant="secondary"
                className="min-h-[40px] px-4 py-2"
              >
                <Camera size={15} className="text-[#6A3FD0]" />
                <span>@chestaadotcom</span>
              </Button>
            </div>
          </div>

          {/* Col 2: Layanan / Services */}
          <div className="footer-stagger-col lg:col-span-3 space-y-3">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.08em] font-semibold text-[#17122B]">
              {getTranslation(locale, 'footer.mainServices')}
            </h3>
            <ul className="space-y-2 text-[14px]">
              <li>
                <Link
                  to={getServicePath('pembuatan-website', locale)}
                  className="link-underline inline-flex items-center py-1 hover:text-[#6A3FD0] transition-colors"
                >
                  {locale === 'en' ? 'Website & landing page development' : 'Jasa pembuatan website'}
                </Link>
              </li>
              <li>
                <Link
                  to={getServicePath('ai-agent', locale)}
                  className="link-underline inline-flex items-center py-1 hover:text-[#6A3FD0] transition-colors"
                >
                  {locale === 'en' ? 'AI agent development' : 'Jasa AI agent'}
                </Link>
              </li>
              <li>
                <Link
                  to={getServicePath('software-custom', locale)}
                  className="link-underline inline-flex items-center py-1 hover:text-[#6A3FD0] transition-colors"
                >
                  {locale === 'en' ? 'Custom software development' : 'Jasa software custom'}
                </Link>
              </li>
              <li>
                <Link
                  to={getServicePath('otomasi-workflow', locale)}
                  className="link-underline inline-flex items-center py-1 hover:text-[#6A3FD0] transition-colors"
                >
                  {locale === 'en' ? 'Workflow automation service' : 'Jasa otomasi workflow'}
                </Link>
              </li>
              <li>
                <Link
                  to={areasHubHref}
                  className="link-underline inline-flex items-center py-1 hover:text-[#6A3FD0] transition-colors font-medium text-[#6A3FD0]"
                >
                  {locale === 'en' ? 'Areas we serve in Greater Jakarta' : 'Area layanan Tangerang Selatan & sekitar'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Panduan & Artikel Blog */}
          <div className="footer-stagger-col lg:col-span-4 space-y-3">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.08em] font-semibold text-[#17122B]">
              {getTranslation(locale, 'footer.guidesAndBlog')}
            </h3>
            <ul className="space-y-2 text-[14px]">
              {footerBlogPosts.map((post) => (
                <li key={post.slug}>
                  <Link
                    to={toLocalizedHref(`/blog/${post.slug}`, locale, prefixMode)}
                    className="link-underline inline-block py-1 hover:text-[#6A3FD0] transition-colors line-clamp-1"
                  >
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Grouped Indexable Area Service Links (10 pages grouped cleanly per service) */}
        <div className="py-8 border-b border-[rgba(91,60,196,0.14)] grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2.5">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.08em] font-semibold text-[#17122B]">
              {getTranslation(locale, 'footer.webByArea')}
            </h3>
            <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[13px]">
              {webAreaPages.map((p) => (
                <Link
                  key={`${p.serviceSlug}-${p.areaSlug}`}
                  to={getServiceAreaPath('pembuatan-website', p.areaSlug, locale)}
                  className="link-underline py-0.5 hover:text-[#6A3FD0] transition-colors"
                >
                  {locale === 'en'
                    ? `Website development in ${p.areaName}`
                    : `Jasa pembuatan website ${p.areaName}`}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-2.5">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.08em] font-semibold text-[#17122B]">
              {getTranslation(locale, 'footer.aiByArea')}
            </h3>
            <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[13px]">
              {aiAreaPages.map((p) => (
                <Link
                  key={`${p.serviceSlug}-${p.areaSlug}`}
                  to={getServiceAreaPath('ai-agent', p.areaSlug, locale)}
                  className="link-underline py-0.5 hover:text-[#6A3FD0] transition-colors"
                >
                  {locale === 'en'
                    ? `AI agent development in ${p.areaName}`
                    : `Jasa AI agent ${p.areaName}`}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Contact & Local Coverage Strip */}
        <div className="py-8 border-b border-[rgba(91,60,196,0.14)] grid grid-cols-1 md:grid-cols-3 gap-6 text-[13px] text-[#5B5675]">
          <div className="flex items-start gap-3">
            <MapPin size={16} className="text-[#6A3FD0] shrink-0 mt-0.5" />
            <div>
              <p className="text-[#17122B] font-semibold">
                {getTranslation(locale, 'footer.baseAndCoverage')}
              </p>
              <p className="mt-1">
                {getTranslation(locale, 'footer.baseAndCoverageDesc')}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MessageCircle size={16} className="text-[#6A3FD0] shrink-0 mt-0.5" />
            <div>
              <p className="text-[#17122B] font-semibold">
                {getTranslation(locale, 'footer.coFounderWa')}
              </p>
              <p className="mt-1">
                {getTranslation(locale, 'footer.coFounderWaHours')}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Mail size={16} className="text-[#6A3FD0] shrink-0 mt-0.5" />
            <div>
              <p className="text-[#17122B] font-semibold">
                {getTranslation(locale, 'footer.emailAndIndex')}
              </p>
              <p className="mt-1">
                chestaadotcom@gmail.com ·{' '}
                <a href="/sitemap.xml" className="link-underline hover:text-[#6A3FD0]">
                  Sitemap
                </a>{' '}
                ·{' '}
                <a href="/llms.txt" className="link-underline hover:text-[#6A3FD0]">
                  llms.txt
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Language Switcher */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] text-[#5B5675]">
          <div className="flex flex-wrap items-center gap-4">
            <p>© {new Date().getFullYear()} CHESTAADOTCOM · Chesta Azka &amp; Zeeshan.</p>
            <div
              aria-label={getTranslation(locale, 'nav.langSwitchLabel')}
              className="inline-flex items-center gap-1 font-mono text-[11px] px-2.5 py-0.5 rounded-full bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)]"
            >
              <a
                href={langLinks.idHref}
                hrefLang="id-ID"
                onClick={(e) => handleLangSwitch(e, langLinks.idHref)}
                className={`px-1.5 py-0.5 rounded-full transition-colors ${
                  locale === 'id'
                    ? 'bg-[#6A3FD0] text-[#FFFFFF] font-semibold'
                    : 'text-[#5B5675] hover:text-[#17122B]'
                }`}
              >
                ID
              </a>
              <span className="text-[#5B5675]/40" aria-hidden="true">
                |
              </span>
              <a
                href={langLinks.enHref}
                hrefLang="en"
                onClick={(e) => handleLangSwitch(e, langLinks.enHref)}
                className={`px-1.5 py-0.5 rounded-full transition-colors ${
                  locale === 'en'
                    ? 'bg-[#6A3FD0] text-[#FFFFFF] font-semibold'
                    : 'text-[#5B5675] hover:text-[#17122B]'
                }`}
              >
                EN
              </a>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <Link
              to={toLocalizedHref('/audit-gratis', locale, prefixMode)}
              className="link-underline py-1 hover:text-[#17122B] transition-colors font-medium text-[#6A3FD0]"
            >
              {locale === 'en' ? 'Free 30-Min Audit' : 'Audit Gratis 30 Menit'}
            </Link>
            <Link
              to={toLocalizedHref('/about', locale, prefixMode)}
              className="link-underline py-1 hover:text-[#17122B] transition-colors"
            >
              {locale === 'en' ? 'About Us' : 'Tentang'}
            </Link>
            <Link
              to={toLocalizedHref('/cara-kerja', locale, prefixMode)}
              className="link-underline py-1 hover:text-[#17122B] transition-colors"
            >
              {locale === 'en' ? 'How We Work' : 'Cara Kerja'}
            </Link>
            <Link
              to={toLocalizedHref('/harga', locale, prefixMode)}
              className="link-underline py-1 hover:text-[#17122B] transition-colors"
            >
              {locale === 'en' ? 'Pricing' : 'Harga'}
            </Link>
            <Link
              to={toLocalizedHref('/faq', locale, prefixMode)}
              className="link-underline py-1 hover:text-[#17122B] transition-colors"
            >
              FAQ
            </Link>
            <Link
              to={toLocalizedHref('/portfolio', locale, prefixMode)}
              className="link-underline py-1 hover:text-[#17122B] transition-colors"
            >
              {getTranslation(locale, 'nav.projects')}
            </Link>
            <Link
              to={toLocalizedHref('/case-studies', locale, prefixMode)}
              className="link-underline py-1 hover:text-[#17122B] transition-colors"
            >
              {getTranslation(locale, 'nav.caseStudies')}
            </Link>
            <Link
              to={toLocalizedHref('/blog', locale, prefixMode)}
              className="link-underline py-1 hover:text-[#17122B] transition-colors"
            >
              {getTranslation(locale, 'nav.blog')}
            </Link>
            <Link
              to={toLocalizedHref('/privasi', locale, prefixMode)}
              className="link-underline py-1 hover:text-[#17122B] transition-colors"
            >
              {locale === 'en' ? 'Privacy Policy' : 'Kebijakan Privasi'}
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
