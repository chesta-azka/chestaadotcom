import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MessageCircle, ArrowUpRight } from 'lucide-react';
import { parseLocalizedPath } from '../../lib/i18n';
import {
  buildWhatsAppLink,
  getWhatsAppCtaLabel,
  resolveWhatsAppContextFromPathname,
} from '../../lib/whatsapp';
import { trackWaClick } from '../../lib/analytics';

export default function StickyMobileWhatsApp() {
  const [visible, setVisible] = useState(false);
  const location = useLocation();
  const { locale } = parseLocalizedPath(location.pathname);
  const isEn = locale === 'en';

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;

      // Show after scrolling past hero (420px), hide well before bottom CTA & footer (680px)
      const isPastHero = scrollY > 420;
      const isNearBottom = scrollY + winHeight > docHeight - 680;

      setVisible(isPastHero && !isNearBottom);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const waContext = resolveWhatsAppContextFromPathname(location.pathname, locale);
  const whatsappUrl = buildWhatsAppLink(waContext, locale);
  const ctaLabel = getWhatsAppCtaLabel(locale);

  if (!visible) return null;

  return (
    <aside
      aria-label={ctaLabel}
      className="fixed bottom-4 inset-x-4 sm:inset-x-5 z-40 md:hidden flex justify-center pointer-events-none"
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener"
        onClick={() =>
          trackWaClick(waContext.type || 'default', 'sticky_mobile_wa', locale)
        }
        className="pointer-events-auto max-w-[400px] w-full min-h-[48px] py-2 px-3.5 sm:px-4 rounded-full glass-pill flex items-center justify-between gap-2.5 text-[#17122B] active:scale-[0.99] transition-transform"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-full bg-[#6A3FD0] text-[#FFFFFF] flex items-center justify-center shrink-0">
            <MessageCircle size={15} />
          </div>
          <div className="min-w-0 text-left">
            <p className="font-mono text-[10px] uppercase tracking-[0.06em] text-[#6A3FD0] font-semibold truncate leading-tight">
              {isEn ? 'Web IDR 1.2M · Free AI Audit' : 'Web Rp1,2jt · Audit AI Gratis'}
            </p>
            <p className="text-[12.5px] sm:text-[13px] font-semibold text-[#17122B] truncate leading-tight">
              {ctaLabel}
            </p>
          </div>
        </div>
        <div className="w-7 h-7 rounded-full bg-[#EFEAFB] flex items-center justify-center text-[#6A3FD0] shrink-0">
          <ArrowUpRight size={14} />
        </div>
      </a>
    </aside>
  );
}
