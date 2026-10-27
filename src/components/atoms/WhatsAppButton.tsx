import React from 'react';
import { MessageCircle } from 'lucide-react';
import {
  buildWhatsAppLink,
  getWhatsAppCtaLabel,
  type WhatsAppContext,
} from '../../lib/whatsapp';
import { trackWaClick } from '../../lib/analytics';
import type { SupportedLocale } from '../../lib/i18n';

export interface WhatsAppButtonProps {
  context?: WhatsAppContext;
  locale?: SupportedLocale;
  label?: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'nav';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showIcon?: boolean;
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

/**
 * Progressive-enhancement WhatsApp CTA link.
 * Always renders a plain `<a href="https://wa.me/..." target="_blank" rel="noopener">`
 * in HTML, and enhances the click with cookieless event tracking and live URL resolution.
 */
export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  context = { type: 'default' },
  locale: propLocale,
  label,
  variant = 'primary',
  size = 'md',
  className = '',
  showIcon = true,
  children,
  onClick,
}) => {
  const locale: SupportedLocale = propLocale || context.locale || 'id';
  const href = buildWhatsAppLink({ ...context, locale }, locale);
  const visibleText = children ?? label ?? getWhatsAppCtaLabel(locale);

  const baseStyles =
    'inline-flex items-center justify-center gap-2 font-medium transition-all duration-150 rounded-[12px] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6A3FD0] focus-visible:ring-offset-2 active:scale-[0.99]';

  const variantStyles: Record<NonNullable<WhatsAppButtonProps['variant']>, string> = {
    primary:
      'bg-[#6A3FD0] text-white hover:bg-[#532FB0] shadow-[0_8px_20px_-4px_rgba(106,63,208,0.28)]',
    secondary:
      'bg-white text-[#17122B] border border-[#E6E0F5] hover:bg-[#F8F6FE] hover:border-[#CEC2F2]',
    ghost: 'bg-transparent text-[#6A3FD0] hover:bg-[#EFEAFB]',
    nav: 'bg-[#6A3FD0] text-white hover:bg-[#532FB0] shadow-[0_6px_16px_-4px_rgba(106,63,208,0.28)]',
  };

  const sizeStyles: Record<NonNullable<WhatsAppButtonProps['size']>, string> = {
    sm: 'h-[40px] px-4 text-[13px]',
    md: 'h-[48px] px-6 text-[15px]',
    lg: 'h-[52px] px-7 text-[16px]',
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    trackWaClick({
      page: context.url,
      locale,
      context: context.type || 'default',
    });
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      onClick={handleClick}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`.trim()}
    >
      {showIcon && <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />}
      <span>{visibleText}</span>
    </a>
  );
};

export default WhatsAppButton;
