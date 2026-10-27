import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LazyMotion,
  domAnimation,
  m,
  useReducedMotion,
} from 'framer-motion';
import {
  buildWhatsAppLink,
  getWhatsAppCtaLabel,
  resolveWhatsAppContextFromPathname,
} from '../../lib/whatsapp';
import { trackLanguageSwitch, trackWaClick } from '../../lib/analytics';
import MenuOverlayPanel from './MenuOverlayPanel';
import { getActiveLenis } from '../../lib/motion';
import {
  getTranslation,
  parseLocalizedPath,
  toLocalizedHref,
} from '../../lib/i18n';

const EASE_OUT_EXPO: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * Shared Navbar (Header) component
 * - Thin 2px purple scroll progress bar at the top (transform: scaleX(var(--scroll-progress)))
 * - Floating glass pill that shrinks subtly on scroll (scale-[0.985]), hides on scroll down, shows on scroll up
 * - Desktop quick-nav links with an active link indicator that glides smoothly via transform: translate3d
 * - Keeps framer-motion strictly for the menu icon & overlay (LazyMotion, domAnimation, m)
 */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [indicatorStyle, setIndicatorStyle] = useState<{
    width: number;
    x: number;
    opacity: number;
  }>({ width: 0, x: 0, opacity: 0 });

  const lastScrollY = useRef(0);
  const hamburgerButtonRef = useRef<HTMLButtonElement | null>(null);
  const navContainerRef = useRef<HTMLDivElement | null>(null);
  const navItemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const location = useLocation();
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();

  const { locale, prefixMode, barePath } = parseLocalizedPath(location.pathname);
  const homeHref = toLocalizedHref('/', locale, prefixMode);

  const quickNavItems = [
    {
      label: getTranslation(locale, 'nav.servicesGroup'),
      href: toLocalizedHref('/#layanan', locale, prefixMode),
      matchPrefixes: ['/jasa', '/services', '/area', '/areas'],
    },
    {
      label: getTranslation(locale, 'nav.projects'),
      href: toLocalizedHref('/portfolio', locale, prefixMode),
      matchPrefixes: ['/portfolio'],
    },
    {
      label: getTranslation(locale, 'nav.caseStudies'),
      href: toLocalizedHref('/case-studies', locale, prefixMode),
      matchPrefixes: ['/case-studies'],
    },
    {
      label: getTranslation(locale, 'nav.blog'),
      href: toLocalizedHref('/blog', locale, prefixMode),
      matchPrefixes: ['/blog'],
    },
    {
      label: locale === 'en' ? 'Free Audit' : 'Audit Gratis',
      href: toLocalizedHref('/audit-gratis', locale, prefixMode),
      matchPrefixes: ['/audit-gratis', '/free-audit'],
    },
  ];

  const activeNavIndex = quickNavItems.findIndex((item) =>
    item.matchPrefixes.some((p) => barePath.startsWith(p))
  );
  const currentTargetIndex = hoveredIdx !== null ? hoveredIdx : activeNavIndex;

  // Gliding active link indicator using transform: translate3d and scale
  useEffect(() => {
    const updateIndicator = () => {
      if (currentTargetIndex < 0 || !navContainerRef.current) {
        setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
        return;
      }
      const targetEl = navItemRefs.current[currentTargetIndex];
      const containerEl = navContainerRef.current;
      if (!targetEl || !containerEl) return;

      const containerRect = containerEl.getBoundingClientRect();
      const targetRect = targetEl.getBoundingClientRect();
      setIndicatorStyle({
        width: targetRect.width,
        x: targetRect.left - containerRect.left,
        opacity: 1,
      });
    };

    updateIndicator();
    window.addEventListener('resize', updateIndicator, { passive: true });
    return () => window.removeEventListener('resize', updateIndicator);
  }, [currentTargetIndex, locale, location.pathname]);

  // Shrink-on-scroll & hide-on-scroll-down (never hide while menu is open)
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 24);

      if (menuOpen) {
        setHidden(false);
      } else if (currentScrollY > 120 && currentScrollY > lastScrollY.current + 4) {
        setHidden(true);
      } else if (currentScrollY < lastScrollY.current - 4 || currentScrollY <= 40) {
        setHidden(false);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [menuOpen]);

  // Auto-close on route or hash change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.hash]);

  // Lock page scroll (scrollbar-gutter: stable) and pause unified Lenis when dialog is open
  useEffect(() => {
    const htmlEl = document.documentElement;
    const bodyEl = document.body;
    const lenis = getActiveLenis();

    if (menuOpen) {
      setHidden(false);
      htmlEl.style.scrollbarGutter = 'stable';
      bodyEl.style.overflow = 'hidden';
      lenis?.stop();
    } else {
      bodyEl.style.overflow = '';
      lenis?.start();
    }

    return () => {
      bodyEl.style.overflow = '';
      lenis?.start();
    };
  }, [menuOpen]);

  const waContext = resolveWhatsAppContextFromPathname(location.pathname, locale);
  const whatsappUrl = buildWhatsAppLink(waContext, locale);
  const whatsappCtaLabel = getWhatsAppCtaLabel(locale);

  const triggerViewTransitionNavigate = (targetUrl: string, isLangSwitch = false) => {
    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => { finished: Promise<void> };
    };
    if (isLangSwitch) {
      document.documentElement.setAttribute('data-lang-switching', 'true');
    }
    if (doc.startViewTransition && !prefersReducedMotion) {
      const vt = doc.startViewTransition(() => {
        navigate(targetUrl);
      });
      vt.finished.finally(() => {
        document.documentElement.removeAttribute('data-lang-switching');
      });
    } else {
      navigate(targetUrl);
      window.setTimeout(() => {
        document.documentElement.removeAttribute('data-lang-switching');
      }, 140);
    }
  };

  const handleNavigate = (href: string) => {
    setMenuOpen(false);
    const parsedTarget = parseLocalizedPath(href);
    const isLangSwitch = parsedTarget.locale !== locale;
    if (isLangSwitch) {
      trackLanguageSwitch(locale, parsedTarget.locale, location.pathname);
    }

    if (parsedTarget.barePath.startsWith('/#')) {
      const id = parsedTarget.barePath.replace('/#', '');
      if (barePath === '/' && !isLangSwitch) {
        window.setTimeout(() => {
          const el = document.getElementById(id);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 50);
      } else {
        triggerViewTransitionNavigate(
          toLocalizedHref(parsedTarget.barePath, parsedTarget.locale, parsedTarget.prefixMode),
          isLangSwitch
        );
      }
    } else {
      triggerViewTransitionNavigate(
        toLocalizedHref(parsedTarget.barePath, parsedTarget.locale, parsedTarget.prefixMode),
        isLangSwitch
      );
    }
  };

  const hamburgerLineTransition = prefersReducedMotion
    ? { duration: 0.15 }
    : { duration: 0.25, ease: EASE_OUT_EXPO };

  const buttonLabel = menuOpen
    ? getTranslation(locale, 'nav.closeMenu')
    : getTranslation(locale, 'nav.openMenu');

  return (
    <LazyMotion features={domAnimation} strict>
      {/* Thin 2px Purple Scroll Progress Bar at Top (transform: scaleX only) */}
      <div className="scroll-progress-bar" aria-hidden="true" />

      <header
        className={`fixed top-0 inset-x-0 z-50 flex flex-col items-center px-5 md:px-8 transition-transform duration-300 ${
          menuOpen ? 'pointer-events-auto' : 'pointer-events-none'
        } ${scrolled ? 'pt-2.5' : 'pt-4'} ${
          hidden && !menuOpen ? '-translate-y-24' : 'translate-y-0'
        }`}
      >
        {/* Floating Glass Pill Container (shrinks slightly on scroll via transform scale) */}
        <div
          className={`relative z-50 w-full max-w-[1120px] transition-transform duration-300 pointer-events-auto rounded-full glass-pill px-4 sm:px-5 md:px-6 py-2 flex items-center justify-between gap-2 ${
            scrolled && !menuOpen ? 'scale-[0.985]' : 'scale-100'
          }`}
        >
          {/* Left: Wordmark Logo */}
          <Link
            to={homeHref}
            onClick={(e) => {
              e.preventDefault();
              handleNavigate(homeHref);
            }}
            className="inline-flex items-center gap-2 min-h-[44px] px-1 group shrink-0"
            aria-label={getTranslation(locale, 'nav.brandAria')}
          >
            <span className="w-2 h-2 rounded-full bg-[#6A3FD0] transition-transform duration-200 group-hover:scale-125" />
            <span className="font-display text-[14px] md:text-[15px] font-semibold tracking-tight text-[#17122B] whitespace-nowrap">
              CHESTAADOTCOM
            </span>
          </Link>

          {/* Center: Desktop Quick-Nav with Gliding Active Indicator (transform: translate3d) */}
          <div
            ref={navContainerRef}
            onMouseLeave={() => setHoveredIdx(null)}
            className="hidden lg:flex items-center relative px-1 py-1 rounded-full"
          >
            <span
              aria-hidden="true"
              style={{
                width: `${indicatorStyle.width}px`,
                 opacity: indicatorStyle.opacity,
                transform: `translate3d(${indicatorStyle.x}px, 0, 0)`,
                transition:
                  'transform 260ms cubic-bezier(0.22, 1, 0.36, 1), width 260ms cubic-bezier(0.22, 1, 0.36, 1), opacity 180ms cubic-bezier(0.22, 1, 0.36, 1)',
              }}
              className="pointer-events-none absolute left-0 top-1 bottom-1 rounded-full bg-[#EFEAFB]/90 border border-[rgba(91,60,196,0.14)]"
            />
            {quickNavItems.map((item, idx) => {
              const isActive = idx === activeNavIndex;
              return (
                <Link
                  key={item.href}
                  ref={(el) => {
                    navItemRefs.current[idx] = el;
                  }}
                  to={item.href}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onFocus={() => setHoveredIdx(idx)}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigate(item.href);
                  }}
                  className={`relative z-10 px-3.5 py-1.5 text-[13px] font-medium rounded-full transition-colors duration-150 ${
                    isActive
                      ? 'text-[#6A3FD0] font-semibold'
                      : 'text-[#5B5675] hover:text-[#17122B]'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Right: "Konsultasi gratis" / "Free consultation" button + 44x44px 2-line hamburger button */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener"
              onClick={() => {
                trackWaClick(waContext.type || 'default', 'header_cta', locale);
                setMenuOpen(false);
              }}
              className="hidden md:inline-flex items-center gap-1.5 min-h-[38px] px-3.5 sm:px-4 py-1.5 rounded-full bg-[#6A3FD0] hover:bg-[#5230B0] text-[#FFFFFF] text-[12.5px] sm:text-[13px] font-semibold whitespace-nowrap shrink-0 transition-colors active:scale-[0.98]"
            >
              <MessageCircle size={14} className="shrink-0" />
              <span>{whatsappCtaLabel}</span>
            </a>

            <button
              ref={hamburgerButtonRef}
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              className="inline-flex items-center justify-center w-11 h-11 text-[#17122B] hover:text-[#6A3FD0] transition-colors cursor-pointer bg-transparent border-0 p-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6A3FD0]/40 rounded-full shrink-0"
              aria-label={buttonLabel}
              aria-expanded={menuOpen}
              aria-controls="site-menu-panel"
            >
              <span className="sr-only">{buttonLabel}</span>
              {/* Two 18x1.5px lines that morph into an X via framer-motion m.span (translateY + rotate only) */}
              <span
                className="relative w-5 h-5 flex items-center justify-center"
                aria-hidden="true"
              >
                <m.span
                  initial={false}
                  animate={
                    menuOpen
                      ? { y: 0, rotate: 45 }
                      : { y: -3.5, rotate: 0 }
                  }
                  transition={hamburgerLineTransition}
                  className="block absolute w-[18px] h-[1.5px] bg-current rounded-full origin-center"
                />
                <m.span
                  initial={false}
                  animate={
                    menuOpen
                      ? { y: 0, rotate: -45 }
                      : { y: 3.5, rotate: 0 }
                  }
                  transition={hamburgerLineTransition}
                  className="block absolute w-[18px] h-[1.5px] bg-current rounded-full origin-center"
                />
              </span>
            </button>
          </div>
        </div>

        {/* Native <dialog> Menu Overlay Panel — always rendered in DOM so crawlers see all links */}
        <MenuOverlayPanel
          isOpen={menuOpen}
          scrolled={scrolled}
          onClose={() => setMenuOpen(false)}
          onNavigate={handleNavigate}
          pathname={location.pathname}
          hash={location.hash}
          whatsappUrl={whatsappUrl}
          hamburgerButtonRef={hamburgerButtonRef}
        />
      </header>
    </LazyMotion>
  );
}
