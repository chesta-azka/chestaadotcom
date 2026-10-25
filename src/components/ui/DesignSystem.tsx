import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, MessageCircle, ArrowUpRight } from 'lucide-react';
import SmartImage from '../atoms/SmartImage';
import {
  revealElement,
  staggerElements,
  animateCountUp,
  detectMotionMode,
  MOTION_TOKENS,
} from '../../lib/motion';
import { getTranslation, toLocalizedHref } from '../../lib/i18n';

export const WHATSAPP_NUMBER = '6282125447232';

export function buildWaUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/* ============================================================================
 * 1. CONTAINER
 * Spec: max-width 1120px, side padding 20px mobile / 32px desktop
 * ========================================================================== */
export interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'article' | 'header' | 'nav';
}

export function Container({
  children,
  className = '',
  as: Component = 'div',
}: ContainerProps) {
  return (
    <Component className={`w-full max-w-[1120px] mx-auto px-5 md:px-8 ${className}`}>
      {children}
    </Component>
  );
}

/* ============================================================================
 * 1B. WORD REVEAL HEADING & SUBTITLE REVEAL
 * Spec:
 * - Splits text by words (never letters), wraps each in .word-mask > .word-inner
 * - Keeps original text in DOM for screen readers and SEO (aria-label on parent + .sr-only)
 * - Handles wrapping naturally in both ID and EN with zero CLS
 * ========================================================================== */
export interface WordRevealHeadingProps {
  as?: 'h1' | 'h2' | 'h3';
  text: string;
  className?: string;
  priority?: boolean;
}

export function WordRevealHeading({
  as: TagName = 'h2',
  text,
  className = '',
  priority = false,
}: WordRevealHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (detectMotionMode() === 'reduced') {
      setRevealed(true);
      return;
    }

    if (priority) {
      const raf = requestAnimationFrame(() => setRevealed(true));
      return () => cancelAnimationFrame(raf);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setRevealed(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -28px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [priority, text]);

  const words = text.trim().split(/\s+/);

  return (
    <TagName
      ref={ref}
      aria-label={text}
      data-revealed={revealed ? 'true' : 'false'}
      className={className}
    >
      <span className="sr-only">{text}</span>
      {words.map((word, idx) => {
        // Cap stagger at 8 words so long bilingual headlines finish briskly
        const delayMs = Math.min(idx, MOTION_TOKENS.stagger.maxItems - 1) * 42;
        return (
          <React.Fragment key={`${word}-${idx}`}>
            <span className="word-mask" aria-hidden="true">
              <span
                className="word-inner"
                style={{ transitionDelay: `${delayMs}ms` }}
              >
                {word}
              </span>
            </span>
            {idx < words.length - 1 ? ' ' : ''}
          </React.Fragment>
        );
      })}
    </TagName>
  );
}

/* ============================================================================
 * 1C. COUNT UP METRIC
 * Spec: Count-up for metric values only when real data exists (once on view)
 * ========================================================================== */
export interface CountUpMetricProps {
  value: string;
  className?: string;
}

export function CountUpMetric({ value, className = '' }: CountUpMetricProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    return animateCountUp(ref.current, value);
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}

/* ============================================================================
 * 2. BUTTON
 * Spec:
 * - Magnetic pull on desktop primary buttons (max 8px, spring return)
 * - Vertical text-swap hover on primary/secondary buttons
 * - Press state scale .98
 * - Arrow icon slides 4px on hover
 * ========================================================================== */
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'tint';
  href?: string;
  to?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  ariaLabel?: string;
}

function renderSwappableChildren(children: React.ReactNode): React.ReactNode {
  return React.Children.map(children, (child) => {
    if (typeof child === 'string') {
      return (
        <span className="btn-text-swap" data-text={child}>
          <span className="btn-text-swap-inner">{child}</span>
        </span>
      );
    }
    if (
      React.isValidElement<{ children?: React.ReactNode; className?: string }>(child) &&
      child.type === 'span' &&
      typeof child.props.children === 'string'
    ) {
      const label = child.props.children;
      return (
        <span
          className={`btn-text-swap ${child.props.className || ''}`}
          data-text={label}
        >
          <span className="btn-text-swap-inner">{label}</span>
        </span>
      );
    }
    return child;
  });
}

export function Button({
  variant = 'primary',
  href,
  to,
  onClick,
  disabled = false,
  fullWidth = false,
  className = '',
  children,
  type = 'button',
  ariaLabel,
}: ButtonProps) {
  const isMagnetic = variant === 'primary' && !disabled;

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (!isMagnetic || e.pointerType !== 'mouse' || detectMotionMode() !== 'full') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = ((e.clientX - centerX) / (rect.width / 2)) * 7;
    const deltaY = ((e.clientY - centerY) / (rect.height / 2)) * 7;
    const clampedX = Math.max(-8, Math.min(8, deltaX));
    const clampedY = Math.max(-8, Math.min(8, deltaY));
    e.currentTarget.style.setProperty('--mag-x', `${clampedX.toFixed(2)}px`);
    e.currentTarget.style.setProperty('--mag-y', `${clampedY.toFixed(2)}px`);
  };

  const handlePointerLeave = (e: React.PointerEvent<HTMLElement>) => {
    if (!isMagnetic) return;
    e.currentTarget.style.setProperty('--mag-x', '0px');
    e.currentTarget.style.setProperty('--mag-y', '0px');
  };

  const baseStyles =
    'group inline-flex items-center justify-center gap-2 min-h-[44px] w-auto max-w-full px-5 sm:px-6 py-2.5 rounded-full text-[14px] font-medium leading-snug text-center whitespace-normal sm:whitespace-nowrap select-none cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6A3FD0] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none [&>svg]:shrink-0 [&>svg]:transition-transform [&>svg]:duration-150 hover:[&>svg]:translate-x-1';

  const variantStyles: Record<NonNullable<ButtonProps['variant']>, string> = {
    primary:
      'btn-magnetic bg-[#6A3FD0] text-[#FFFFFF] hover:bg-[#5230B0] shadow-[0_4px_14px_rgba(106,63,208,0.18)] transition-colors duration-150',
    secondary:
      'bg-[#FFFFFF] text-[#17122B] border border-[rgba(91,60,196,0.14)] hover:bg-[#F8F6FE] hover:border-[#7C54E0] transition-colors duration-150',
    tint:
      'bg-[#EFEAFB] text-[#6A3FD0] border border-[rgba(91,60,196,0.14)] hover:bg-[#6A3FD0] hover:text-[#FFFFFF] transition-colors duration-150',
    ghost:
      'bg-transparent text-[#6A3FD0] hover:bg-[#F8F6FE] px-4 transition-colors duration-150',
  };

  const widthClass = fullWidth ? 'w-full' : '';
  const combined = `${baseStyles} ${variantStyles[variant]} ${widthClass} ${className}`;
  const enhancedChildren = renderSwappableChildren(children);

  if (href) {
    const isExternal = href.startsWith('http');
    return (
      <a
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        onClick={onClick}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        aria-label={ariaLabel}
        className={combined}
      >
        {enhancedChildren}
      </a>
    );
  }

  if (to) {
    return (
      <Link
        to={to}
        onClick={onClick}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        aria-label={ariaLabel}
        className={combined}
      >
        {enhancedChildren}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      aria-label={ariaLabel}
      className={combined}
    >
      {enhancedChildren}
    </button>
  );
}

/* ============================================================================
 * 3. CARD (Bento & Cards with Cursor Spotlight, 3D Tilt up to 4deg, Glare)
 * Spec:
 * - Cursor spotlight (--spot-x, --spot-y, desktop only)
 * - 3D tilt up to 4 degrees with glare layer via CSS (no JS on touch)
 * - Image inside cards scales 1.04 inside clipped frame, arrow slides 4px
 * ========================================================================== */
export interface CardProps {
  children: React.ReactNode;
  variant?: 'white' | 'soft' | 'tint' | 'highlighted' | 'glass' | 'dark';
  padding?: 'default' | 'none' | 'lg';
  as?: 'div' | 'article' | 'section';
  className?: string;
  interactive?: boolean;
  style?: React.CSSProperties;
}

export function Card({
  children,
  variant = 'soft',
  padding = 'default',
  as: Component = 'div',
  className = '',
  interactive = true,
  style,
}: CardProps) {
  const variantClasses: Record<NonNullable<CardProps['variant']>, string> = {
    white:
      'bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)] shadow-[0_6px_20px_-6px_rgba(106,63,208,0.05)]',
    soft:
      'bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)]',
    tint:
      'bg-[#EFEAFB] border border-[rgba(91,60,196,0.14)]',
    highlighted:
      'bg-[#FFFFFF] border-2 border-[#6A3FD0] shadow-[0_10px_28px_-8px_rgba(106,63,208,0.12)]',
    glass:
      'glass-card',
    dark:
      'glass-dark text-[#FFFFFF]',
  };

  const padClasses: Record<NonNullable<CardProps['padding']>, string> = {
    none: 'p-0',
    default: 'p-5 md:p-6',
    lg: 'p-6 md:p-8',
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (!interactive || e.pointerType !== 'mouse' || detectMotionMode() !== 'full') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const pctX = x / rect.width - 0.5;
    const pctY = y / rect.height - 0.5;
    // Max 3.5 deg (under 4 deg spec)
    const tiltX = (-pctY * 6.5).toFixed(2);
    const tiltY = (pctX * 6.5).toFixed(2);
    e.currentTarget.style.setProperty('--spot-x', `${x.toFixed(0)}px`);
    e.currentTarget.style.setProperty('--spot-y', `${y.toFixed(0)}px`);
    e.currentTarget.style.setProperty('--tilt-x', `${tiltX}deg`);
    e.currentTarget.style.setProperty('--tilt-y', `${tiltY}deg`);
  };

  const handlePointerLeave = (e: React.PointerEvent<HTMLElement>) => {
    if (!interactive || e.pointerType !== 'mouse') return;
    e.currentTarget.style.setProperty('--tilt-x', '0deg');
    e.currentTarget.style.setProperty('--tilt-y', '0deg');
  };

  return (
    <Component
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={style}
      className={`group rounded-[24px] transition-colors duration-200 ${
        interactive ? 'bento-card' : ''
      } ${variantClasses[variant]} ${padClasses[padding]} ${className}`}
    >
      {children}
    </Component>
  );
}

/* ============================================================================
 * 4. BADGE & 5. TAG
 * ========================================================================== */
export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'tint' | 'outline' | 'dark';
  className?: string;
}

export function Badge({ children, variant = 'tint', className = '' }: BadgeProps) {
  const styles = {
    tint: 'bg-[#EFEAFB] text-[#6A3FD0] border border-[rgba(91,60,196,0.14)]',
    outline: 'bg-[#FFFFFF] text-[#6A3FD0] border border-[rgba(91,60,196,0.14)]',
    dark: 'bg-[#6A3FD0] text-[#FFFFFF] border border-[#B9A2F2]/30',
  };
  return (
    <span
      className={`inline-flex items-center gap-2 max-w-full flex-wrap px-3 py-1 rounded-full font-mono text-[11px] uppercase tracking-[0.08em] font-semibold leading-snug [&>svg]:shrink-0 ${styles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

export interface TagProps {
  children: React.ReactNode;
  className?: string;
}

export function Tag({ children, className = '' }: TagProps) {
  return (
    <span
      className={`font-mono text-[11px] md:text-[12px] uppercase tracking-[0.08em] font-semibold text-[#6A3FD0] ${className}`}
    >
      {children}
    </span>
  );
}

/* ============================================================================
 * 6. SECTION HEADING
 * Spec: Word-masked headline reveal + light blur-to-sharp subtitle fade-up (<700ms)
 * ========================================================================== */
export interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  dark?: boolean;
  action?: React.ReactNode;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  dark = false,
  action,
  className = '',
}: SectionHeadingProps) {
  const subRef = useRef<HTMLParagraphElement>(null);
  const [subRevealed, setSubRevealed] = useState(false);

  useEffect(() => {
    const el = subRef.current;
    if (!el) return;
    if (detectMotionMode() === 'reduced') {
      setSubRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSubRevealed(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -24px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [description]);

  if (align === 'center') {
    return (
      <div className={`max-w-2xl mx-auto text-center mb-12 ${className}`}>
        <span
          className={`block font-mono text-[11px] md:text-[12px] uppercase tracking-[0.08em] font-semibold ${
            dark ? 'text-[#B9A2F2]' : 'text-[#6A3FD0]'
          }`}
        >
          {eyebrow}
        </span>
        <WordRevealHeading
          as="h2"
          text={title}
          className={`mt-2 ${dark ? 'text-[#FFFFFF]' : 'text-[#17122B]'}`}
        />
        {description && (
          <p
            ref={subRef}
            data-revealed={subRevealed ? 'true' : 'false'}
            className={`subtitle-reveal mt-3 text-[15px] md:text-[16px] leading-[1.65] ${
              dark ? 'text-[#EFEAFB]' : 'text-[#5B5675]'
            }`}
          >
            {description}
          </p>
        )}
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 ${className}`}
    >
      <div className="max-w-2xl">
        <span
          className={`block font-mono text-[11px] md:text-[12px] uppercase tracking-[0.08em] font-semibold ${
            dark ? 'text-[#B9A2F2]' : 'text-[#6A3FD0]'
          }`}
        >
          {eyebrow}
        </span>
        <WordRevealHeading
          as="h2"
          text={title}
          className={`mt-2 ${dark ? 'text-[#FFFFFF]' : 'text-[#17122B]'}`}
        />
        {description && (
          <p
            ref={subRef}
            data-revealed={subRevealed ? 'true' : 'false'}
            className={`subtitle-reveal mt-3 text-[15px] md:text-[16px] leading-[1.65] ${
              dark ? 'text-[#EFEAFB]' : 'text-[#5B5675]'
            }`}
          >
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

/* ============================================================================
 * 7. REVEAL
 * Spec:
 * - One Reveal primitive (fade + 24px rise, optional blur)
 * - Group stagger via data-reveal-stagger attribute (max 8 items staggered)
 * - Uses CSS scroll-driven animations (animation-timeline: view()) where supported
 *   with IntersectionObserver fallback
 * ========================================================================== */
export interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  blur?: boolean;
  staggerSelector?: string;
  className?: string;
}

export function Reveal({
  children,
  delay = 0,
  blur = false,
  staggerSelector,
  className = '',
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (staggerSelector) {
      return staggerElements(ref.current, staggerSelector, { delay });
    }
    return revealElement(ref.current, { delay, blur });
  }, [delay, blur, staggerSelector]);

  return (
    <div
      ref={ref}
      data-reveal-stagger={staggerSelector ? 'true' : undefined}
      className={className}
    >
      {children}
    </div>
  );
}

/* ============================================================================
 * 8. FAQ ACCORDION
 * Spec: smooth grid-template-rows 0fr -> 1fr with inner opacity, chevron rotates,
 * single item open at a time
 * ========================================================================== */
export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQAccordionProps {
  items: FAQItem[];
  defaultOpenIndex?: number | null;
}

export function FAQAccordion({ items, defaultOpenIndex = 0 }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);

  return (
    <div className="space-y-3">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={item.question}
            className="rounded-[20px] bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)] overflow-hidden transition-colors"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              aria-expanded={isOpen}
              className="w-full min-h-[52px] px-5 md:px-6 py-4 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#F8F6FE] transition-colors"
            >
              <span className="text-[15px] md:text-[16px] font-semibold text-[#17122B] leading-snug">
                {item.question}
              </span>
              <ChevronDown
                size={18}
                className={`text-[#6A3FD0] shrink-0 transition-transform duration-300 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            <div className={`accordion-content ${isOpen ? 'open' : ''}`}>
              <div className="accordion-inner px-5 md:px-6 pb-5 pt-3 text-[15px] text-[#5B5675] leading-[1.65] border-t border-[rgba(91,60,196,0.14)]">
                {item.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ============================================================================
 * 9. CTA BLOCK (Footer & Final CTA)
 * Spec: CTA glass card rises on scroll and its purple glow breathes slowly (opacity only, 6s)
 * ========================================================================== */
export interface CTABlockProps {
  eyebrow?: string;
  title: string;
  description: string;
  buttonLabel?: string;
  whatsappMessage?: string;
  secondaryAction?: React.ReactNode;
}

export function CTABlock({
  eyebrow,
  title,
  description,
  buttonLabel,
  whatsappMessage,
  secondaryAction,
}: CTABlockProps) {
  const location = useLocation();
  const resolvedEyebrow = eyebrow || getTranslation(location.pathname, 'cta.defaultEyebrow');
  const resolvedButtonLabel = buttonLabel || getTranslation(location.pathname, 'cta.defaultButton');
  const resolvedWhatsappMessage =
    whatsappMessage || getTranslation(location.pathname, 'cta.defaultWaMessage');
  const footerSubline = getTranslation(location.pathname, 'cta.footerSubline');

  return (
    <Reveal>
      <Card
        variant="glass"
        padding="lg"
        className="text-center border border-[rgba(91,60,196,0.14)] relative overflow-hidden"
      >
        <div
          aria-hidden="true"
          className="cta-glow-breathe pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[480px] h-[240px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(124, 84, 224, 0.24) 0%, rgba(185, 162, 242, 0.08) 55%, transparent 75%)',
          }}
        />
        <div className="relative z-10">
          <Badge variant="tint" className="mb-4">
            {resolvedEyebrow}
          </Badge>
          <WordRevealHeading
            as="h2"
            text={title}
            className="max-w-xl mx-auto text-[#17122B]"
          />
          <p className="mt-3 text-[15px] md:text-[16px] text-[#5B5675] max-w-lg mx-auto leading-[1.65]">
            {description}
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
            <Button href={buildWaUrl(resolvedWhatsappMessage)} variant="primary">
              <MessageCircle size={16} />
              <span>{resolvedButtonLabel}</span>
              <ArrowUpRight size={15} />
            </Button>
            {secondaryAction}
          </div>
          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.08em] text-[#5B5675]">
            {footerSubline}
          </p>
        </div>
      </Card>
    </Reveal>
  );
}

/* ============================================================================
 * 10. BREADCRUMB
 * ========================================================================== */
export interface BreadcrumbItem {
  label: string;
  to?: string;
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  const location = useLocation();
  const homeHref = toLocalizedHref('/', location.pathname);
  const homeLabel = getTranslation(location.pathname, 'breadcrumb.home');

  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-8 font-mono text-[11px] md:text-[12px] uppercase tracking-[0.08em] text-[#5B5675] flex flex-wrap items-center gap-2"
    >
      <Link to={homeHref} className="link-underline hover:text-[#6A3FD0] transition-colors py-1">
        {homeLabel}
      </Link>
      {items.map((item, idx) => (
        <React.Fragment key={`${item.label}-${idx}`}>
          <span aria-hidden="true">/</span>
          {item.to ? (
            <Link
              to={toLocalizedHref(item.to, location.pathname)}
              className="link-underline hover:text-[#6A3FD0] transition-colors py-1"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-[#17122B] font-semibold truncate max-w-[240px] sm:max-w-md py-1">
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}

/* ============================================================================
 * 11. IMAGE WITH FALLBACK
 * ========================================================================== */
export interface ImageWithFallbackProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  viewTransitionName?: string;
}

export function ImageWithFallback({
  src,
  alt,
  width = 1280,
  height = 720,
  priority = false,
  className = '',
  viewTransitionName,
}: ImageWithFallbackProps) {
  return (
    <SmartImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={className}
      viewTransitionName={viewTransitionName}
    />
  );
}

/* ============================================================================
 * 12. NAVBAR & FOOTER RE-EXPORTS
 * ========================================================================== */
export { default as Navbar } from '../organisms/Header';
export { default as Footer } from '../organisms/FooterSection';
