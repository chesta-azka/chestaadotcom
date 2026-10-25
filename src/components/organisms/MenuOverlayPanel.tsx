import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  LazyMotion,
  domAnimation,
  m,
  useReducedMotion,
} from 'framer-motion';
import {
  ArrowUpRight,
  Bot,
  Camera,
  ChevronDown,
  Code2,
  Globe,
  MessageCircle,
  Workflow,
} from 'lucide-react';
import {
  getLanguageSwitchLinks,
  getTranslation,
  LocaleCode,
  parseLocalizedPath,
  toLocalizedHref,
} from '../../lib/i18n';

export interface MenuServiceItem {
  title: string;
  href: string;
  desc: string;
  icon: React.ReactNode;
}

export interface MenuSecondaryLink {
  label: string;
  href: string;
}

export function getMenuServices(
  locale: LocaleCode = 'id',
  prefixMode: 'default' | 'ind' | 'eng' = 'default'
): MenuServiceItem[] {
  return [
    {
      title: getTranslation(locale, 'service.web.title'),
      href: toLocalizedHref('/jasa/pembuatan-website', locale, prefixMode),
      desc: getTranslation(locale, 'service.web.desc'),
      icon: <Globe size={18} className="text-[#6A3FD0]" />,
    },
    {
      title: getTranslation(locale, 'service.ai.title'),
      href: toLocalizedHref('/jasa/ai-agent', locale, prefixMode),
      desc: getTranslation(locale, 'service.ai.desc'),
      icon: <Bot size={18} className="text-[#6A3FD0]" />,
    },
    {
      title: getTranslation(locale, 'service.software.title'),
      href: toLocalizedHref('/jasa/software-custom', locale, prefixMode),
      desc: getTranslation(locale, 'service.software.desc'),
      icon: <Code2 size={18} className="text-[#6A3FD0]" />,
    },
    {
      title: getTranslation(locale, 'service.workflow.title'),
      href: toLocalizedHref('/jasa/otomasi-workflow', locale, prefixMode),
      desc: getTranslation(locale, 'service.workflow.desc'),
      icon: <Workflow size={18} className="text-[#6A3FD0]" />,
    },
  ];
}

export function getMenuSecondaryLinks(
  locale: LocaleCode = 'id',
  prefixMode: 'default' | 'ind' | 'eng' = 'default'
): MenuSecondaryLink[] {
  return [
    {
      label: getTranslation(locale, 'nav.projects'),
      href: toLocalizedHref('/portfolio', locale, prefixMode),
    },
    {
      label: getTranslation(locale, 'nav.caseStudies'),
      href: toLocalizedHref('/case-studies', locale, prefixMode),
    },
    {
      label: getTranslation(locale, 'nav.blog'),
      href: toLocalizedHref('/blog', locale, prefixMode),
    },
    {
      label: getTranslation(locale, 'nav.howItWorks'),
      href: toLocalizedHref('/#cara-kerja', locale, prefixMode),
    },
    {
      label: getTranslation(locale, 'nav.pricing'),
      href: toLocalizedHref('/#harga', locale, prefixMode),
    },
    {
      label: getTranslation(locale, 'nav.faq'),
      href: toLocalizedHref('/#faq', locale, prefixMode),
    },
  ];
}

export const MENU_SERVICES: MenuServiceItem[] = getMenuServices('id', 'default');
export const MENU_SECONDARY_LINKS: MenuSecondaryLink[] = getMenuSecondaryLinks('id', 'default');

let serviceRoutePreloaded = false;
export function prefetchServiceRoute() {
  if (serviceRoutePreloaded) return;
  serviceRoutePreloaded = true;
  import('../../pages/ServiceDetailPage').catch(() => {});
}

interface MenuOverlayPanelProps {
  isOpen: boolean;
  scrolled?: boolean;
  onClose: () => void;
  onNavigate: (href: string) => void;
  pathname: string;
  hash: string;
  whatsappUrl: string;
  hamburgerButtonRef: React.RefObject<HTMLButtonElement | null>;
}

const EASE_OUT_EXPO: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function MenuOverlayPanel({
  isOpen,
  scrolled = false,
  onClose,
  onNavigate,
  pathname,
  hash,
  whatsappUrl,
  hamburgerButtonRef,
}: MenuOverlayPanelProps) {
  const prefersReducedMotion = useReducedMotion();
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const servicesDropdownTriggerRef = useRef<HTMLButtonElement | null>(null);
  const serviceItemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [visualState, setVisualState] = useState<'closed' | 'open' | 'closing'>('closed');
  const [isAnimating, setIsAnimating] = useState(false);

  const { locale, prefixMode, barePath } = parseLocalizedPath(pathname);
  const isInServiceRoute = barePath.startsWith('/jasa/');
  const [mobileServicesOpen, setMobileServicesOpen] = useState<boolean>(isInServiceRoute);

  useEffect(() => {
    setMobileServicesOpen(barePath.startsWith('/jasa/'));
  }, [barePath, isOpen]);

  const servicesList = getMenuServices(locale, prefixMode);
  const exploreLinks = getMenuSecondaryLinks(locale, prefixMode);
  const langLinks = getLanguageSwitchLinks(pathname);
  const homeHref = toLocalizedHref('/', locale, prefixMode);

  const handleDropdownToggleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!mobileServicesOpen) {
        setMobileServicesOpen(true);
      }
      setTimeout(() => {
        serviceItemRefs.current[0]?.focus();
      }, 50);
    } else if (e.key === 'Escape' && mobileServicesOpen) {
      e.preventDefault();
      setMobileServicesOpen(false);
    }
  };

  const handleServiceItemKeyDown = (index: number, e: React.KeyboardEvent<HTMLAnchorElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (index < servicesList.length - 1) {
        serviceItemRefs.current[index + 1]?.focus();
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (index > 0) {
        serviceItemRefs.current[index - 1]?.focus();
      } else {
        servicesDropdownTriggerRef.current?.focus();
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setMobileServicesOpen(false);
      servicesDropdownTriggerRef.current?.focus();
    }
  };

  // Sync native <dialog> showModal() / close() with isOpen & exit animation
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        try {
          dialog.showModal();
        } catch {
          dialog.setAttribute('open', '');
        }
      }
      // Trigger backdrop opacity transition on next frame
      requestAnimationFrame(() => {
        dialog.setAttribute('data-backdrop-visible', 'true');
      });
      setVisualState('open');

      const focusTimer = window.setTimeout(() => {
        const firstInteractive = dialog.querySelector<HTMLElement>(
          'nav a[href], button[data-mobile-services-trigger="true"]'
        );
        if (firstInteractive) {
          firstInteractive.focus();
        } else {
          closeButtonRef.current?.focus();
        }
      }, 30);

      return () => window.clearTimeout(focusTimer);
    } else if (dialog.open) {
      dialog.removeAttribute('data-backdrop-visible');
      setVisualState('closing');

      const exitDurationMs = prefersReducedMotion ? 150 : 180;
      const closeTimer = window.setTimeout(() => {
        if (dialog.open) {
          dialog.close();
        }
        setVisualState('closed');
      }, exitDurationMs);

      return () => window.clearTimeout(closeTimer);
    }
  }, [isOpen, prefersReducedMotion]);

  const handleRequestClose = () => {
    onClose();
    window.setTimeout(() => {
      hamburgerButtonRef.current?.focus();
    }, prefersReducedMotion ? 160 : 190);
  };

  // Intercept native Esc cancel event so exit animation runs cleanly
  const handleDialogCancel = (e: React.SyntheticEvent<HTMLDialogElement, Event>) => {
    e.preventDefault();
    handleRequestClose();
  };

  // Clicking on the <dialog> backdrop area outside the pill/panel closes the menu
  const handleDialogClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      handleRequestClose();
    }
  };

  const isRouteActive = (href: string) => {
    const targetParsed = parseLocalizedPath(href);
    if (targetParsed.barePath.startsWith('/#')) {
      const targetHash = targetParsed.barePath.slice(1);
      return barePath === '/' && hash === targetHash;
    }
    return (
      barePath === targetParsed.barePath ||
      barePath.startsWith(`${targetParsed.barePath}/`)
    );
  };

  const panelVariants = prefersReducedMotion
    ? {
        closed: { opacity: 0 },
        open: {
          opacity: 1,
          transition: { duration: 0.15 },
        },
        closing: {
          opacity: 0,
          transition: { duration: 0.15 },
        },
      }
    : {
        closed: {
          opacity: 0,
          y: -8,
          scale: 0.98,
        },
        open: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.28,
            ease: EASE_OUT_EXPO,
            delayChildren: 0.06,
            staggerChildren: 0.04,
          },
        },
        closing: {
          opacity: 0,
          y: -8,
          scale: 0.98,
          transition: {
            duration: 0.18,
            ease: EASE_OUT_EXPO,
          },
        },
      };

  const childVariants = prefersReducedMotion
    ? {
        closed: { opacity: 0 },
        open: { opacity: 1, transition: { duration: 0.15 } },
        closing: { opacity: 0, transition: { duration: 0.1 } },
      }
    : {
        closed: { opacity: 0, y: 10 },
        open: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.24, ease: EASE_OUT_EXPO },
        },
        closing: {
          opacity: 0,
          transition: { duration: 0.12 },
        },
      };

  const hamburgerLineTransition = prefersReducedMotion
    ? { duration: 0.15 }
    : { duration: 0.25, ease: EASE_OUT_EXPO };

  const activeLabel = getTranslation(locale, 'nav.activePage');

  return (
    <LazyMotion features={domAnimation} strict>
      <dialog
        id="site-menu-panel"
        ref={dialogRef}
        aria-label={getTranslation(locale, 'nav.menuDialogLabel')}
        onCancel={handleDialogCancel}
        onClick={handleDialogClick}
        className="site-menu-dialog pointer-events-auto"
      >
        {/* Top-level flex wrapper inside dialog; clicking empty area closes dialog */}
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              handleRequestClose();
            }
          }}
          style={{
            paddingTop: scrolled
              ? 'max(0.75rem, env(safe-area-inset-top))'
              : 'max(1rem, env(safe-area-inset-top))',
            paddingLeft: 'max(1.25rem, env(safe-area-inset-left))',
            paddingRight: 'max(1.25rem, env(safe-area-inset-right))',
          }}
          className="w-full h-full flex flex-col items-center md:px-8 pointer-events-auto"
        >
          {/* Floating Glass Pill Bar (keeps capsule bar visible above mobile sheet and desktop panel with the same X button) */}
          <div className="w-full max-w-[1120px] rounded-full glass-pill px-4 sm:px-5 md:px-6 py-2 flex items-center justify-between gap-2 shrink-0 pointer-events-auto">
            <Link
              to={homeHref}
              onClick={handleRequestClose}
              className="inline-flex items-center gap-2 min-h-[44px] px-1 group shrink-0 cursor-pointer"
              aria-label={getTranslation(locale, 'nav.brandAria')}
            >
              <span className="w-2 h-2 rounded-full bg-[#6A3FD0]" />
              <span className="font-display text-[14px] md:text-[15px] font-semibold tracking-tight text-[#17122B] whitespace-nowrap">
                CHESTAADOTCOM
              </span>
            </Link>

            <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleRequestClose}
                className="hidden min-[380px]:inline-flex items-center gap-1.5 min-h-[38px] px-3.5 sm:px-4 py-1.5 rounded-full bg-[#6A3FD0] hover:bg-[#5230B0] text-[#FFFFFF] text-[12.5px] sm:text-[13px] font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer"
              >
                <MessageCircle size={14} className="shrink-0" />
                <span>{getTranslation(locale, 'nav.freeConsultation')}</span>
              </a>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={handleRequestClose}
                className="inline-flex items-center justify-center w-11 h-11 text-[#17122B] hover:text-[#6A3FD0] transition-colors cursor-pointer bg-transparent border-0 p-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6A3FD0]/40 rounded-full shrink-0"
                aria-label={getTranslation(locale, 'nav.closeMenu')}
                aria-expanded={isOpen}
                aria-controls="site-menu-panel"
              >
                <span className="sr-only">{getTranslation(locale, 'nav.closeMenu')}</span>
                <span
                  className="relative w-5 h-5 flex items-center justify-center"
                  aria-hidden="true"
                >
                  <m.span
                    initial={false}
                    animate={
                      visualState === 'open'
                        ? { y: 0, rotate: 45 }
                        : { y: -3.5, rotate: 0 }
                    }
                    transition={hamburgerLineTransition}
                    className="block absolute w-[18px] h-[1.5px] bg-current rounded-full origin-center"
                  />
                  <m.span
                    initial={false}
                    animate={
                      visualState === 'open'
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

          {/* Menu Panel Wrapper */}
          <div
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                handleRequestClose();
              }
            }}
            className="w-full max-w-[1120px] flex-1 flex justify-end relative overflow-hidden lg:overflow-visible pointer-events-auto"
          >
            <m.div
              variants={panelVariants}
              initial="closed"
              animate={visualState}
              onAnimationStart={() => setIsAnimating(true)}
              onAnimationComplete={() => setIsAnimating(false)}
              style={{
                willChange: isAnimating ? 'transform, opacity' : 'auto',
                paddingBottom: 'env(safe-area-inset-bottom)',
              }}
              className="mt-2.5 w-full h-[calc(100%-0.625rem)] lg:h-auto lg:w-[min(980px,calc(100vw-48px))] rounded-t-[28px] lg:rounded-[28px] bg-[#FFFFFF]/95 backdrop-blur-[20px] border-t lg:border border-[rgba(91,60,196,0.16)] shadow-[0_24px_60px_-15px_rgba(23,18,43,0.14)] origin-top lg:origin-top-right flex flex-col justify-between overflow-y-auto lg:overflow-hidden pointer-events-auto"
            >
              {/* =========================================================
                  DESKTOP VIEW (lg: two columns + bottom row)
                  ========================================================= */}
              <div className="hidden lg:block p-7">
                <div className="grid grid-cols-12 gap-8 items-start">
                  {/* Left Column: Layanan / Services (4 direct links with icon, title, comfortable description) */}
                  <div className="col-span-7 pr-5 border-r border-[rgba(91,60,196,0.12)]">
                    <m.div variants={childVariants} className="mb-3 px-2 flex items-center justify-between">
                      <span className="font-mono text-[11px] uppercase tracking-[0.08em] font-semibold text-[#5B5675]">
                        {getTranslation(locale, 'nav.servicesGroup')}
                      </span>
                      <Link
                        to={toLocalizedHref('/#layanan', locale, prefixMode)}
                        onClick={() => onNavigate(toLocalizedHref('/#layanan', locale, prefixMode))}
                        className="font-mono text-[11px] uppercase tracking-[0.08em] font-semibold text-[#6A3FD0] hover:underline cursor-pointer"
                      >
                        {locale === 'en' ? 'Overview' : 'Ringkasan'}
                      </Link>
                    </m.div>

                    <nav
                      aria-label={getTranslation(locale, 'nav.servicesGroup')}
                      className="space-y-1.5"
                    >
                      {servicesList.map((srv) => {
                        const active = isRouteActive(srv.href);
                        return (
                          <m.div key={srv.href} variants={childVariants}>
                            <Link
                              to={srv.href}
                              onMouseEnter={prefetchServiceRoute}
                              onFocus={prefetchServiceRoute}
                              onClick={() => onNavigate(srv.href)}
                              className={`group flex items-start gap-3.5 p-3 rounded-[18px] transition-colors cursor-pointer pointer-events-auto ${
                                active
                                  ? 'bg-[#EFEAFB]/90 text-[#17122B]'
                                  : 'hover:bg-[#F8F6FE] text-[#17122B]'
                              }`}
                            >
                              <div className="w-10 h-10 rounded-[12px] bg-[#EFEAFB] border border-[rgba(91,60,196,0.14)] flex items-center justify-center shrink-0 mt-0.5 group-hover:border-[#6A3FD0]/40 transition-colors">
                                {srv.icon}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="font-display text-[15px] font-semibold tracking-tight text-[#17122B] group-hover:text-[#6A3FD0] transition-colors leading-snug">
                                    {srv.title}
                                  </span>
                                  {active && (
                                    <span
                                      className="w-2 h-2 rounded-full bg-[#6A3FD0] shrink-0"
                                      aria-label={activeLabel}
                                    />
                                  )}
                                </div>
                                <p className="mt-0.5 text-[13px] text-[#5B5675] leading-snug line-clamp-2">
                                  {srv.desc}
                                </p>
                              </div>
                            </Link>
                          </m.div>
                        );
                      })}
                    </nav>
                  </div>

                  {/* Right Column: Jelajahi / Explore (clean links with responsive width) */}
                  <div className="col-span-5 flex flex-col justify-between h-full">
                    <div>
                      <m.div variants={childVariants} className="mb-3 px-3">
                        <span className="font-mono text-[11px] uppercase tracking-[0.08em] font-semibold text-[#5B5675]">
                          {getTranslation(locale, 'nav.exploreGroup')}
                        </span>
                      </m.div>

                      <nav
                        aria-label={getTranslation(locale, 'nav.exploreGroup')}
                        className="space-y-1"
                      >
                        {exploreLinks.map((item) => {
                          const active = isRouteActive(item.href);
                          return (
                            <m.div key={item.href} variants={childVariants}>
                              <Link
                                to={item.href}
                                onClick={() => onNavigate(item.href)}
                                className={`group flex items-center justify-between gap-3 px-3 py-2.5 rounded-[14px] text-[15px] font-medium transition-colors cursor-pointer pointer-events-auto ${
                                  active
                                    ? 'bg-[#EFEAFB]/80 text-[#6A3FD0] font-semibold'
                                    : 'text-[#17122B] hover:bg-[#F8F6FE] hover:text-[#6A3FD0]'
                                }`}
                              >
                                <span className="inline-flex items-center gap-2.5 min-w-0">
                                  <span className="leading-snug">{item.label}</span>
                                  {active && (
                                    <span
                                      className="w-2 h-2 rounded-full bg-[#6A3FD0] shrink-0"
                                      aria-label={activeLabel}
                                    />
                                  )}
                                </span>
                                <ArrowUpRight
                                  size={15}
                                  className="text-[#5B5675] shrink-0 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-[#6A3FD0] transition-all duration-150"
                                />
                              </Link>
                            </m.div>
                          );
                        })}
                      </nav>
                    </div>
                  </div>
                </div>

                {/* Desktop Footer Row: Service Areas + Language Switcher (ID | EN) + WhatsApp + Instagram */}
                <m.div
                  variants={childVariants}
                  className="mt-6 pt-4 border-t border-[rgba(91,60,196,0.14)] flex flex-wrap items-center justify-between gap-y-2 gap-x-4 text-[13px]"
                >
                  <p className="text-[#5B5675] leading-snug">
                    {getTranslation(locale, 'nav.areasLine')}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 sm:gap-5 shrink-0">
                    {/* Language Switcher: real <a href> links to the equivalent page in the other language */}
                    <div
                      aria-label={getTranslation(locale, 'nav.langSwitchLabel')}
                      className="inline-flex items-center gap-1.5 font-mono text-[12px] px-2.5 py-1 rounded-full bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)]"
                    >
                      <a
                        href={langLinks.idHref}
                        hrefLang="id-ID"
                        onClick={() => onNavigate(langLinks.idHref)}
                        className={`px-1.5 py-0.5 rounded-full transition-colors cursor-pointer ${
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
                        onClick={() => onNavigate(langLinks.enHref)}
                        className={`px-1.5 py-0.5 rounded-full transition-colors cursor-pointer ${
                          locale === 'en'
                            ? 'bg-[#6A3FD0] text-[#FFFFFF] font-semibold'
                            : 'text-[#5B5675] hover:text-[#17122B]'
                        }`}
                      >
                        EN
                      </a>
                    </div>

                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleRequestClose}
                      className="inline-flex items-center gap-1.5 font-semibold text-[#6A3FD0] hover:text-[#5230B0] transition-colors whitespace-nowrap cursor-pointer"
                    >
                      <MessageCircle size={15} className="shrink-0" />
                      <span>WhatsApp</span>
                    </a>

                    <a
                      href="https://instagram.com/chestaadotcom"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleRequestClose}
                      className="inline-flex items-center gap-1.5 font-medium text-[#17122B] hover:text-[#6A3FD0] transition-colors whitespace-nowrap cursor-pointer"
                    >
                      <Camera size={15} className="text-[#6A3FD0] shrink-0" />
                      <span>@chestaadotcom</span>
                    </a>
                  </div>
                </m.div>
              </div>

              {/* =========================================================
                  MOBILE VIEW (Clean, minimalist sheet below capsule bar)
                  ========================================================= */}
              <div className="lg:hidden flex flex-col justify-between min-h-full p-4 sm:p-5 pb-6 pointer-events-auto">
                <div className="space-y-2">
                  {/* Primary Mobile Navigation List with Direct "Layanan" Navigation + Collapsible Dropdown Toggle */}
                  <div className="divide-y divide-[rgba(91,60,196,0.1)] border-y border-[rgba(91,60,196,0.1)]">
                    {/* 1. "Layanan / Services" Item: Direct Link on text; accessible Dropdown toggle on chevron */}
                    <m.div variants={childVariants} className="py-1">
                      <div className="flex items-center justify-between gap-2">
                        {/* Direct Page Link: Tapping "Layanan" / "Services" directs directly to the services overview */}
                        <Link
                          to={toLocalizedHref('/#layanan', locale, prefixMode)}
                          onClick={() => onNavigate(toLocalizedHref('/#layanan', locale, prefixMode))}
                          className="min-w-0 flex-1 py-2.5 flex items-center justify-between gap-2 cursor-pointer group"
                        >
                          <span
                            className={`font-display text-[20px] sm:text-[22px] font-semibold tracking-tight transition-colors ${
                              isInServiceRoute || mobileServicesOpen
                                ? 'text-[#6A3FD0]'
                                : 'text-[#17122B] group-hover:text-[#6A3FD0]'
                            }`}
                          >
                            {getTranslation(locale, 'nav.servicesGroup')}
                          </span>
                          <ArrowUpRight
                            size={17}
                            className="text-[#5B5675] group-hover:text-[#6A3FD0] transition-colors shrink-0"
                          />
                        </Link>

                        {/* Dedicated Accessible Dropdown Toggle Button (preserves user focus, >= 44x44px touch target) */}
                        <button
                          type="button"
                          ref={servicesDropdownTriggerRef}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setMobileServicesOpen((prev) => !prev);
                          }}
                          onKeyDown={handleDropdownToggleKeyDown}
                          aria-expanded={mobileServicesOpen}
                          aria-controls="mobile-services-dropdown"
                          aria-label={
                            mobileServicesOpen
                              ? (locale === 'en' ? 'Collapse services submenu' : 'Tutup submenu layanan')
                              : (locale === 'en' ? 'Expand services submenu' : 'Buka submenu layanan')
                          }
                          className={`w-11 h-11 min-w-[44px] min-h-[44px] rounded-full flex items-center justify-center shrink-0 border transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#6A3FD0] ${
                            mobileServicesOpen
                              ? 'bg-[#EFEAFB] text-[#6A3FD0] border-[#6A3FD0]/30'
                              : 'bg-[#F8F6FE] text-[#5B5675] border-[rgba(91,60,196,0.12)] hover:text-[#6A3FD0]'
                          }`}
                        >
                          <ChevronDown
                            size={18}
                            className={`transition-transform duration-200 ${
                              mobileServicesOpen ? 'rotate-180' : 'rotate-0'
                            }`}
                          />
                        </button>
                      </div>

                      {/* Collapsible Services Dropdown Panel */}
                      <div
                        id="mobile-services-dropdown"
                        className={`accordion-content ${mobileServicesOpen ? 'open' : ''}`}
                      >
                        <div className="accordion-inner">
                          <nav
                            aria-label={`${getTranslation(locale, 'nav.servicesGroup')} Mobile`}
                            className="pt-1.5 pb-2.5 space-y-1.5"
                          >
                            {servicesList.map((srv, idx) => {
                              const active = isRouteActive(srv.href);
                              return (
                                <Link
                                  key={srv.href}
                                  ref={(el) => {
                                    serviceItemRefs.current[idx] = el;
                                  }}
                                  to={srv.href}
                                  onTouchStart={prefetchServiceRoute}
                                  onFocus={prefetchServiceRoute}
                                  onClick={() => onNavigate(srv.href)}
                                  onKeyDown={(e) => handleServiceItemKeyDown(idx, e)}
                                  className={`p-2.5 rounded-[14px] border flex items-center gap-3 transition-colors cursor-pointer pointer-events-auto ${
                                    active
                                      ? 'bg-[#EFEAFB] border-[#6A3FD0]/30 text-[#17122B]'
                                      : 'bg-[#F8F6FE] border-[rgba(91,60,196,0.1)] hover:bg-[#EFEAFB]/70 text-[#17122B]'
                                  }`}
                                >
                                  <div className="w-8 h-8 rounded-[8px] bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)] flex items-center justify-center shrink-0">
                                    {srv.icon}
                                  </div>
                                  <span
                                    className={`flex-1 font-display text-[14.5px] sm:text-[15px] font-semibold tracking-tight break-words ${
                                      active ? 'text-[#6A3FD0]' : 'text-[#17122B]'
                                    }`}
                                  >
                                    {srv.title}
                                  </span>
                                  <ArrowUpRight
                                    size={15}
                                    className="text-[#6A3FD0] shrink-0 opacity-70"
                                  />
                                </Link>
                              );
                            })}
                          </nav>
                        </div>
                      </div>
                    </m.div>

                    {/* 2. Top-Level Explore Links */}
                    <nav
                      aria-label={`${getTranslation(locale, 'nav.exploreGroup')} Mobile`}
                      className="divide-y divide-[rgba(91,60,196,0.08)]"
                    >
                      {exploreLinks.map((item) => {
                        const active = isRouteActive(item.href);
                        return (
                          <m.div key={item.href} variants={childVariants}>
                            <Link
                              to={item.href}
                              onClick={() => onNavigate(item.href)}
                              className={`py-2.5 flex items-center justify-between gap-3 text-[18px] sm:text-[20px] font-display font-semibold tracking-tight cursor-pointer pointer-events-auto transition-colors ${
                                active ? 'text-[#6A3FD0]' : 'text-[#17122B] hover:text-[#6A3FD0]'
                              }`}
                            >
                              <span className="inline-flex items-center gap-2 min-w-0">
                                <span className="break-words">{item.label}</span>
                                {active && (
                                  <span
                                    className="w-1.5 h-1.5 rounded-full bg-[#6A3FD0] shrink-0"
                                    aria-label={activeLabel}
                                  />
                                )}
                              </span>
                              <ArrowUpRight size={17} className="text-[#5B5675] opacity-60 shrink-0" />
                            </Link>
                          </m.div>
                        );
                      })}
                    </nav>
                  </div>
                </div>

                {/* Pinned Bottom CTA & Language Switcher on Mobile */}
                <m.div
                  variants={childVariants}
                  style={{
                    paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))',
                  }}
                  className="sticky bottom-0 pt-4 mt-6 bg-gradient-to-t from-[#FFFFFF] via-[#FFFFFF]/95 to-transparent space-y-3 pointer-events-auto"
                >
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleRequestClose}
                    className="w-full min-h-[48px] px-5 py-3 rounded-full bg-[#6A3FD0] hover:bg-[#5230B0] text-[#FFFFFF] font-semibold text-[14px] sm:text-[15px] leading-snug text-center flex items-center justify-center gap-2 shadow-[0_10px_24px_-8px_rgba(106,63,208,0.45)] transition-colors cursor-pointer pointer-events-auto"
                  >
                    <MessageCircle size={17} className="shrink-0" />
                    <span>{getTranslation(locale, 'nav.freeConsultationWa')}</span>
                  </a>

                  <div className="flex flex-wrap items-center justify-between gap-2 text-[12px] text-[#5B5675] px-1 pointer-events-auto">
                    <span className="truncate max-w-[55%] sm:max-w-none">
                      {getTranslation(locale, 'nav.areasLineShort')}
                    </span>

                    <div className="flex items-center gap-3 shrink-0">
                      <div
                        aria-label={getTranslation(locale, 'nav.langSwitchLabel')}
                        className="inline-flex items-center gap-1 font-mono text-[11px] px-2 py-0.5 rounded-full bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)]"
                      >
                        <a
                          href={langLinks.idHref}
                          hrefLang="id-ID"
                          onClick={() => onNavigate(langLinks.idHref)}
                          className={`px-1.5 py-0.5 rounded-full transition-colors cursor-pointer ${
                            locale === 'id'
                              ? 'bg-[#6A3FD0] text-[#FFFFFF] font-semibold'
                              : 'text-[#5B5675]'
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
                          onClick={() => onNavigate(langLinks.enHref)}
                          className={`px-1.5 py-0.5 rounded-full transition-colors cursor-pointer ${
                            locale === 'en'
                              ? 'bg-[#6A3FD0] text-[#FFFFFF] font-semibold'
                              : 'text-[#5B5675]'
                          }`}
                        >
                          EN
                        </a>
                      </div>

                      <a
                        href="https://instagram.com/chestaadotcom"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-[#6A3FD0] whitespace-nowrap cursor-pointer"
                      >
                        @chestaadotcom
                      </a>
                    </div>
                  </div>
                </m.div>
              </div>
            </m.div>
          </div>
        </div>
      </dialog>
    </LazyMotion>
  );
}
