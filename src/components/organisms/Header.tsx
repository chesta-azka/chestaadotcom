import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  buildWhatsAppLink,
  resolveWhatsAppContextFromPathname,
} from '../../lib/whatsapp';
import { trackLanguageSwitch } from '../../lib/analytics';
import { getActiveLenis, prefersReducedMotion } from '../../lib/motion';

const MenuOverlayPanel = React.lazy(() => import('./MenuOverlayPanel'));
import {
  getLanguageSwitchLinks,
  getTranslation,
  parseLocalizedPath,
  toLocalizedHref,
} from '../../lib/i18n';
import { getServicePath } from '../../data/service-slugs';
import {
  ChevronDown,
  Globe,
  Bot,
  Code2,
  Workflow,
  ArrowUpRight,
  ArrowRight,
  MessageCircle,
} from 'lucide-react';

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
  const [menuOpen, setMenuOpen] = useState(false);
  const [hasOpenedMenu, setHasOpenedMenu] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [indicatorStyle, setIndicatorStyle] = useState<{
    width: number;
    x: number;
    opacity: number;
  }>({ width: 0, x: 0, opacity: 0 });

  const hamburgerButtonRef = useRef<HTMLButtonElement | null>(null);
  const navContainerRef = useRef<HTMLDivElement | null>(null);
  const navItemRefs = useRef<(HTMLElement | null)[]>([]);
  const dropdownContainerRef = useRef<HTMLDivElement | null>(null);
  const dropdownTimeoutRef = useRef<number | null>(null);

  const location = useLocation();
  const navigate = useNavigate();
  const isReducedMotion = prefersReducedMotion();

  const { locale, prefixMode, barePath } = parseLocalizedPath(location.pathname);
  const homeHref = toLocalizedHref('/', locale, prefixMode);

  const quickNavItems = [
    {
      label: getTranslation(locale, 'nav.servicesGroup'),
      href: toLocalizedHref('/#layanan', locale, prefixMode),
      matchPrefixes: ['/jasa', '/services', '/layanan'],
      isDropdown: true,
    },
    {
      label: locale === 'en' ? 'About Us' : 'Tentang',
      href: toLocalizedHref('/about', locale, prefixMode),
      matchPrefixes: ['/about', '/tentang'],
    },
    {
      label: locale === 'en' ? 'How We Work' : 'Cara Kerja',
      href: toLocalizedHref('/cara-kerja', locale, prefixMode),
      matchPrefixes: ['/cara-kerja', '/how-it-works'],
    },
    {
      label: locale === 'en' ? 'Pricing' : 'Harga',
      href: toLocalizedHref('/harga', locale, prefixMode),
      matchPrefixes: ['/harga', '/pricing'],
    },
    {
      label: getTranslation(locale, 'nav.projects'),
      href: toLocalizedHref('/portfolio', locale, prefixMode),
      matchPrefixes: ['/portfolio'],
    },
    {
      label: getTranslation(locale, 'nav.caseStudies'),
      href: toLocalizedHref('/case-studies', locale, prefixMode),
      matchPrefixes: ['/case-studies', '/studi-kasus'],
    },
    {
      label: 'FAQ',
      href: toLocalizedHref('/faq', locale, prefixMode),
      matchPrefixes: ['/faq'],
    },
    {
      label: getTranslation(locale, 'nav.blog'),
      href: toLocalizedHref('/blog', locale, prefixMode),
      matchPrefixes: ['/blog'],
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

  // Ultra-responsive, lightweight sticky scroll detection (always stays visible, snappy 150ms transition)
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 12);
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-close on route or hash change
  useEffect(() => {
    setMenuOpen(false);
    setServicesDropdownOpen(false);
  }, [location.pathname, location.hash]);

  // Outside click & Escape key listener for desktop services dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownContainerRef.current &&
        !dropdownContainerRef.current.contains(e.target as Node)
      ) {
        setServicesDropdownOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setServicesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
      if (dropdownTimeoutRef.current) {
        window.clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  const handleDropdownMouseEnter = () => {
    if (dropdownTimeoutRef.current) {
      window.clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setServicesDropdownOpen(true);
  };

  const handleDropdownMouseLeave = () => {
    dropdownTimeoutRef.current = window.setTimeout(() => {
      setServicesDropdownOpen(false);
    }, 180);
  };

  const servicesList = [
    {
      title: getTranslation(locale, 'service.web.title'),
      href: getServicePath('pembuatan-website', locale),
      desc: getTranslation(locale, 'service.web.desc'),
      icon: <Globe size={16} className="text-current" />,
    },
    {
      title: getTranslation(locale, 'service.ai.title'),
      href: getServicePath('ai-agent', locale),
      desc: getTranslation(locale, 'service.ai.desc'),
      icon: <Bot size={16} className="text-current" />,
    },
    {
      title: getTranslation(locale, 'service.software.title'),
      href: getServicePath('software-custom', locale),
      desc: getTranslation(locale, 'service.software.desc'),
      icon: <Code2 size={16} className="text-current" />,
    },
    {
      title: getTranslation(locale, 'service.workflow.title'),
      href: getServicePath('otomasi-workflow', locale),
      desc: getTranslation(locale, 'service.workflow.desc'),
      icon: <Workflow size={16} className="text-current" />,
    },
  ];

  const langLinks = getLanguageSwitchLinks(location.pathname);

  // Lock page scroll (scrollbar-gutter: stable) and pause unified Lenis when dialog is open
  useEffect(() => {
    const htmlEl = document.documentElement;
    const bodyEl = document.body;
    const lenis = getActiveLenis();

    if (menuOpen) {
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
    ? { duration: 0.08 }
    : { duration: 0.12, ease: [0.16, 1, 0.3, 1] as const };

  const buttonLabel = menuOpen
    ? getTranslation(locale, 'nav.closeMenu')
    : getTranslation(locale, 'nav.openMenu');

  return (
    <>
      {/* Thin 2px Purple Scroll Progress Bar at Top (transform: scaleX only) */}
      <div className="scroll-progress-bar" aria-hidden="true" />

      <header
        className={`fixed top-0 inset-x-0 z-50 flex flex-col items-center px-4 sm:px-6 md:px-8 transition-[padding] duration-150 ease-out ${
          menuOpen ? 'pointer-events-auto' : 'pointer-events-none'
        } ${scrolled ? 'pt-2 md:pt-2.5' : 'pt-3 sm:pt-4'} translate-y-0`}
      >
        {/* Floating Glass Pill Container (always sticky, snappy 150ms transition, fast response) */}
        <div
          className={`relative z-50 w-full max-w-[1160px] transition-all duration-150 ease-out pointer-events-auto rounded-full glass-pill px-4 sm:px-5 md:px-6 py-2 flex items-center justify-between gap-2 ${
            scrolled && !menuOpen
              ? 'scale-[0.99] shadow-md border-[rgba(91,60,196,0.22)] bg-white/95'
              : 'scale-100 shadow-xs bg-white/85'
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

          {/* Center: Desktop Quick-Nav with Gliding Active Indicator & Services Dropdown */}
          <div
            ref={navContainerRef}
            onMouseLeave={() => {
              if (!servicesDropdownOpen) {
                setHoveredIdx(null);
              }
            }}
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

              if (item.isDropdown) {
                return (
                  <div
                    key={item.href}
                    ref={dropdownContainerRef}
                    className="relative"
                    onMouseEnter={handleDropdownMouseEnter}
                    onMouseLeave={handleDropdownMouseLeave}
                  >
                    <button
                      ref={(el) => {
                        navItemRefs.current[idx] = el;
                      }}
                      type="button"
                      onClick={() => setServicesDropdownOpen((prev) => !prev)}
                      onMouseEnter={() => setHoveredIdx(idx)}
                      onFocus={() => {
                        setHoveredIdx(idx);
                        setServicesDropdownOpen(true);
                      }}
                      className={`relative z-10 px-3.5 py-1.5 text-[13px] font-medium rounded-full inline-flex items-center gap-1 transition-colors duration-150 cursor-pointer ${
                        isActive
                          ? 'text-[#6A3FD0] font-semibold'
                          : 'text-[#5B5675] hover:text-[#17122B]'
                      }`}
                      aria-expanded={servicesDropdownOpen}
                      aria-haspopup="true"
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        size={13}
                        className={`transition-transform duration-200 text-[#6A3FD0] ${
                          servicesDropdownOpen ? 'rotate-180' : 'rotate-0'
                        }`}
                      />
                    </button>

                    {/* Services Dropdown Panel */}
                    {servicesDropdownOpen && (
                      <div
                        role="menu"
                        className="absolute top-full left-0 mt-2.5 w-[330px] p-2 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-[rgba(91,60,196,0.18)] z-50 animate-in fade-in zoom-in-95 duration-150"
                      >
                        <div className="px-3 pt-2 pb-1.5 flex items-center justify-between border-b border-[rgba(91,60,196,0.08)] mb-1">
                          <span className="text-[11px] font-semibold tracking-wider uppercase text-[#7E7993]">
                            {locale === 'en' ? 'Core Services' : 'Layanan Utama'}
                          </span>
                          <Link
                            to={item.href}
                            onClick={(e) => {
                              e.preventDefault();
                              setServicesDropdownOpen(false);
                              handleNavigate(item.href);
                            }}
                            className="text-[11px] font-semibold text-[#6A3FD0] hover:underline cursor-pointer"
                          >
                            {locale === 'en' ? 'Overview' : 'Ringkasan'}
                          </Link>
                        </div>

                        <div className="space-y-1">
                          {servicesList.map((service) => {
                            const isServiceActive = barePath === service.href || barePath.startsWith(service.href);
                            return (
                              <Link
                                key={service.href}
                                to={service.href}
                                onClick={(e) => {
                                  e.preventDefault();
                                  setServicesDropdownOpen(false);
                                  handleNavigate(service.href);
                                }}
                                className={`flex items-start gap-3 p-2 rounded-xl transition-all group cursor-pointer ${
                                  isServiceActive
                                    ? 'bg-[#EFEAFB] text-[#6A3FD0]'
                                    : 'hover:bg-[#F8F6FE] text-[#17122B]'
                                }`}
                              >
                                <div
                                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                                    isServiceActive
                                      ? 'bg-[#6A3FD0] text-white'
                                      : 'bg-[#F2EDFD] text-[#6A3FD0] group-hover:bg-[#EAE2FB]'
                                  }`}
                                >
                                  {service.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between">
                                    <p className="text-[13px] font-semibold tracking-tight text-[#17122B] group-hover:text-[#6A3FD0] transition-colors truncate">
                                      {service.title}
                                    </p>
                                    <ArrowUpRight
                                      size={13}
                                      className="text-[#7E7993] group-hover:text-[#6A3FD0] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all opacity-0 group-hover:opacity-100 shrink-0 ml-1"
                                    />
                                  </div>
                                  <p className="text-[11px] text-[#5B5675] line-clamp-1 mt-0.5 leading-snug">
                                    {service.desc}
                                  </p>
                                </div>
                              </Link>
                            );
                          })}
                        </div>

                        <div className="mt-1.5 pt-1.5 border-t border-[rgba(91,60,196,0.08)]">
                          <Link
                            to={item.href}
                            onClick={(e) => {
                              e.preventDefault();
                              setServicesDropdownOpen(false);
                              handleNavigate(item.href);
                            }}
                            className="flex items-center justify-between px-3 py-1.5 rounded-xl text-[12px] font-semibold text-[#6A3FD0] hover:bg-[#F8F6FE] transition-colors cursor-pointer"
                          >
                            <span>{locale === 'en' ? 'View All 4 Services' : 'Lihat Semua 4 Layanan'}</span>
                            <ArrowRight size={13} />
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

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

          {/* Right: Desktop CTA & Lang on desktop; Prominent 44x44px Hamburger on mobile (<lg) */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Desktop Language Switcher */}
            <div
              aria-label={getTranslation(locale, 'nav.langSwitchLabel')}
              className="hidden lg:inline-flex items-center gap-1 font-mono text-[11px] px-2 py-1 rounded-full bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)]"
            >
              <a
                href={langLinks.idHref}
                hrefLang="id-ID"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigate(langLinks.idHref);
                }}
                className={`px-1.5 py-0.5 rounded-full transition-colors cursor-pointer ${
                  locale === 'id'
                    ? 'bg-[#6A3FD0] text-[#FFFFFF] font-semibold shadow-xs'
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
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigate(langLinks.enHref);
                }}
                className={`px-1.5 py-0.5 rounded-full transition-colors cursor-pointer ${
                  locale === 'en'
                    ? 'bg-[#6A3FD0] text-[#FFFFFF] font-semibold shadow-xs'
                    : 'text-[#5B5675] hover:text-[#17122B]'
                }`}
              >
                EN
              </a>
            </div>

            {/* Desktop Consultation CTA button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#6A3FD0] hover:bg-[#5833B0] text-white text-[12.5px] font-semibold tracking-tight transition-all shadow-xs hover:shadow-sm shrink-0 cursor-pointer"
            >
              <MessageCircle size={14} className="shrink-0" />
              <span>{locale === 'en' ? 'Audit 30 Min' : 'Audit 30 Menit'}</span>
            </a>

            {/* Mobile/Tablet Hamburger button - strictly hidden on desktop (lg:hidden) */}
            <button
              ref={hamburgerButtonRef}
              type="button"
              onMouseEnter={() => setHasOpenedMenu(true)}
              onFocus={() => setHasOpenedMenu(true)}
              onClick={() => {
                setHasOpenedMenu(true);
                setMenuOpen((prev) => !prev);
              }}
              className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-full bg-[#F6F3FF]/90 hover:bg-[#EDE6FF] border border-[rgba(106,63,208,0.22)] text-[#17122B] hover:text-[#6A3FD0] shadow-xs transition-all duration-100 cursor-pointer p-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6A3FD0]/40 shrink-0 active:scale-[0.94]"
              aria-label={buttonLabel}
              aria-expanded={menuOpen}
              aria-controls="site-menu-panel"
            >
              <span className="sr-only">{buttonLabel}</span>
              {/* Two 18x2px lines that morph into an X with snappy 120ms transition */}
              <span
                className="relative w-5 h-5 flex items-center justify-center"
                aria-hidden="true"
              >
                <span
                  style={{
                    transform: menuOpen ? 'translateY(0) rotate(45deg)' : 'translateY(-3.5px) rotate(0deg)',
                    transition: isReducedMotion ? 'none' : 'transform 120ms cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  className="block absolute w-[18px] h-[2px] bg-current rounded-full origin-center"
                />
                <span
                  style={{
                    transform: menuOpen ? 'translateY(0) rotate(-45deg)' : 'translateY(3.5px) rotate(0deg)',
                    transition: isReducedMotion ? 'none' : 'transform 120ms cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  className="block absolute w-[18px] h-[2px] bg-current rounded-full origin-center"
                />
              </span>
            </button>
          </div>
        </div>

        {/* Lazy-loaded Native <dialog> Menu Overlay Panel (mounted on interaction) */}
        {(menuOpen || hasOpenedMenu) && (
          <React.Suspense fallback={null}>
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
          </React.Suspense>
        )}
      </header>
    </>
  );
}
