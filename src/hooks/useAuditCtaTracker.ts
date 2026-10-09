'use client';

import { useCallback } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface AuditClickPayload {
  serviceSlug?: string;
  serviceTitle?: string;
  ctaText?: string;
  href?: string;
}

export function detectReferralSource(): {
  source: string;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
} {
  if (typeof window === 'undefined') {
    return { source: 'Direct', utmSource: null, utmMedium: null, utmCampaign: null };
  }

  const urlParams = new URLSearchParams(window.location.search);
  const utmSource = urlParams.get('utm_source');
  const utmMedium = urlParams.get('utm_medium');
  const utmCampaign = urlParams.get('utm_campaign');
  const referrer = document.referrer || '';

  let detectedSource = utmSource || '';

  if (!detectedSource && referrer) {
    if (referrer.includes('google.')) detectedSource = 'Google Organic';
    else if (referrer.includes('instagram.com')) detectedSource = 'Instagram';
    else if (referrer.includes('tiktok.com')) detectedSource = 'TikTok';
    else if (referrer.includes('linkedin.com')) detectedSource = 'LinkedIn';
    else if (referrer.includes('facebook.com')) detectedSource = 'Facebook';
    else if (referrer.includes('twitter.com') || referrer.includes('t.co') || referrer.includes('x.com')) detectedSource = 'Twitter / X';
    else if (referrer.includes('whatsapp') || referrer.includes('wa.me')) detectedSource = 'WhatsApp';
    else if (referrer.includes(window.location.hostname)) detectedSource = 'Internal Navigation';
    else {
      try {
        const refUrl = new URL(referrer);
        detectedSource = refUrl.hostname;
      } catch {
        detectedSource = 'External Referral';
      }
    }
  }

  if (!detectedSource) {
    const cachedSource = sessionStorage.getItem('referral_source');
    detectedSource = cachedSource || 'Direct';
  } else {
    // Cache for session attribution
    try {
      sessionStorage.setItem('referral_source', detectedSource);
    } catch {
      // Ignore sessionStorage errors
    }
  }

  return {
    source: detectedSource,
    utmSource,
    utmMedium,
    utmCampaign,
  };
}

export function useAuditCtaTracker() {
  const trackAuditClick = useCallback(async (payload?: AuditClickPayload) => {
    if (typeof window === 'undefined') return;

    const { source, utmSource, utmMedium, utmCampaign } = detectReferralSource();
    const sessionId = sessionStorage.getItem('visitor_session_id') || `session_${Math.random().toString(36).slice(2, 10)}`;

    const ctaText = payload?.ctaText || 'Dapatkan Audit & Konsultasi Gratis';
    const serviceSlug = payload?.serviceSlug || 'general';
    const href = payload?.href || window.location.href;

    try {
      if (db) {
        // 1. Record to click_telemetry (read by Admin Dashboard interaction charts)
        await addDoc(collection(db, 'click_telemetry'), {
          elementId: 'btn-audit-konsultasi-gratis',
          elementText: ctaText,
          elementTag: 'a',
          elementHref: href,
          pagePath: window.location.pathname,
          referralSource: source,
          utmSource,
          utmMedium,
          utmCampaign,
          serviceSlug,
          sessionId,
          timestamp: serverTimestamp(),
        });

        // 2. Record to audit_cta_events (dedicated high-intent conversion stream)
        await addDoc(collection(db, 'audit_cta_events'), {
          event: 'audit_consultation_click',
          label: ctaText,
          slug: serviceSlug,
          title: payload?.serviceTitle || '',
          source,
          utmSource,
          utmMedium,
          utmCampaign,
          referrer: document.referrer || '',
          url: window.location.href,
          sessionId,
          createdAt: serverTimestamp(),
        });
      }
    } catch (err) {
      // Non-blocking telemetry failure
      console.warn('Audit CTA tracking notice:', err);
    }
  }, []);

  return {
    trackAuditClick,
    getReferralSource: detectReferralSource,
  };
}
