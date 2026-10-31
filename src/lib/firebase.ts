// Lightweight zero-SDK stub replacing Firebase client SDK.
// Zero network requests to *.googleapis.com or *.firebaseio.com.

export const app: any = null;
export const db: any = null;
export const auth: any = null;
export const storage: any = null;

export const logAnalyticsEvent = (_eventName: string, _eventParams?: Record<string, any>) => {
  // No-op: Plausible cookieless analytics is used via src/lib/analytics.ts
};
