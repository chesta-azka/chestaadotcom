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

export function trackWaClick(...args: any[]): void {
  const [first, second, third] = args;
  if (typeof first === 'object' && first !== null) {
    trackEvent('wa_click', {
      page: getCleanPathname(first.page),
      locale: first.locale || 'id',
      context: first.context || 'general',
    });
  } else {
    trackEvent('wa_click', {
      page: getCleanPathname(first),
      locale: third || 'id',
      context: second || 'general',
    });
  }
}

export function trackAuditFormCompose(...args: any[]): void {
  const [first, second] = args;
  if (typeof first === 'object' && first !== null) {
    trackEvent('audit_form_compose', {
      page: first.locale === 'en' ? '/en/free-audit' : '/id/audit-gratis',
      locale: first.locale || 'id',
      ...(first.need ? { context: first.need } : {}),
    });
  } else {
    trackEvent('audit_form_compose', {
      page: second === 'en' ? '/en/free-audit' : '/id/audit-gratis',
      locale: second || 'id',
      ...(first ? { context: first } : {}),
    });
  }
}

export function trackServiceCardClick(...args: any[]): void {
  const [first, second, third] = args;
  if (typeof first === 'object' && first !== null) {
    trackEvent('service_card_click', {
      slug: first.slug,
      locale: first.locale || 'id',
      page: getCleanPathname(first.page),
    });
  } else {
    trackEvent('service_card_click', {
      slug: first,
      locale: second || 'id',
      page: getCleanPathname(third),
    });
  }
}

export function trackCaseStudyOpen(...args: any[]): void {
  const [first, second, third] = args;
  if (typeof first === 'object' && first !== null) {
    trackEvent('case_study_open', {
      slug: first.slug,
      locale: first.locale || 'id',
      page: getCleanPathname(first.page),
    });
  } else {
    trackEvent('case_study_open', {
      slug: first,
      locale: second || 'id',
      page: getCleanPathname(third),
    });
  }
}

export function trackLanguageSwitch(...args: any[]): void {
  const [first, second, third] = args;
  if (typeof first === 'object' && first !== null) {
    trackEvent('language_switch', {
      from: first.from,
      to: first.to,
      page: getCleanPathname(first.page),
    });
  } else {
    trackEvent('language_switch', {
      from: first,
      to: second,
      page: getCleanPathname(third),
    });
  }
}
