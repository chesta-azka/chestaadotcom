import type { SupportedLocale } from './i18n';

export type AnalyticsEventName =
  | 'wa_click'
  | 'audit_form_compose'
  | 'service_card_click'
  | 'case_study_open'
  | 'language_switch';

export type AnalyticsProvider = 'plausible' | 'umami' | 'custom';

export interface AnalyticsEventPayload {
  page?: string;
  locale?: SupportedLocale;
  context?: string;
  slug?: string;
  from?: string;
  to?: string;
  [key: string]: string | number | boolean | undefined;
}

declare global {
  interface Window {
    plausible?: (
      eventName: string,
      options?: { props?: Record<string, string | number | boolean> },
    ) => void;
    umami?: {
      track: (eventName: string, data?: Record<string, string | number | boolean>) => void;
    };
    __CHESTAA_ANALYTICS_PROVIDER__?: AnalyticsProvider;
    __CHESTAA_CUSTOM_TRACKER__?: (
      eventName: string,
      props: Record<string, string | number | boolean>,
    ) => void;
  }
}

function getCleanPathname(explicitPath?: string): string {
  if (explicitPath) {
    return explicitPath.split('?')[0].split('#')[0] || '/';
  }
  if (typeof window !== 'undefined' && window.location) {
    return window.location.pathname || '/';
  }
  return '/';
}

/**
 * Cookieless, privacy-friendly event dispatcher (< 2 KB).
 * Default provider: Plausible Analytics (window.plausible), with configurable
 * adapter support for Umami or a custom hook. Never sets cookies or Fingerprints.
 */
export function trackEvent(
  name: AnalyticsEventName,
  payload: AnalyticsEventPayload = {},
): void {
  if (typeof window === 'undefined') return;

  try {
    const props: Record<string, string | number | boolean> = {};
    for (const [key, value] of Object.entries(payload)) {
      if (value !== undefined && value !== '') {
        props[key] = value;
      }
    }
    if (!props.page) {
      props.page = getCleanPathname();
    }

    const provider: AnalyticsProvider =
      window.__CHESTAA_ANALYTICS_PROVIDER__ || 'plausible';

    if (provider === 'plausible' && typeof window.plausible === 'function') {
      window.plausible(name, { props });
    } else if (
      provider === 'umami' &&
      window.umami &&
      typeof window.umami.track === 'function'
    ) {
      window.umami.track(name, props);
    } else if (
      provider === 'custom' &&
      typeof window.__CHESTAA_CUSTOM_TRACKER__ === 'function'
    ) {
      window.__CHESTAA_CUSTOM_TRACKER__(name, props);
    } else if (typeof window.plausible === 'function') {
      window.plausible(name, { props });
    }
  } catch {
    // Never block user navigation if analytics script is blocked by browser
  }
}

export function trackWaClick(params: {
  page?: string;
  locale: SupportedLocale;
  context: string;
}): void {
  trackEvent('wa_click', {
    page: getCleanPathname(params.page),
    locale: params.locale,
    context: params.context,
  });
}

export function trackAuditFormCompose(params: {
  locale: SupportedLocale;
  need?: string;
}): void {
  trackEvent('audit_form_compose', {
    page: params.locale === 'en' ? '/en/free-audit' : '/id/audit-gratis',
    locale: params.locale,
    ...(params.need ? { context: params.need } : {}),
  });
}

export function trackServiceCardClick(params: {
  slug: string;
  locale: SupportedLocale;
  page?: string;
}): void {
  trackEvent('service_card_click', {
    slug: params.slug,
    locale: params.locale,
    page: getCleanPathname(params.page),
  });
}

export function trackCaseStudyOpen(params: {
  slug: string;
  locale: SupportedLocale;
  page?: string;
}): void {
  trackEvent('case_study_open', {
    slug: params.slug,
    locale: params.locale,
    page: getCleanPathname(params.page),
  });
}

export function trackLanguageSwitch(params: {
  from: SupportedLocale;
  to: SupportedLocale;
  page?: string;
}): void {
  trackEvent('language_switch', {
    from: params.from,
    to: params.to,
    page: getCleanPathname(params.page),
  });
}
