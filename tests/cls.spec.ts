import { test, expect } from '@playwright/test';

const BASE_URL = (process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000').replace(/\/+$/, '');

const VIEWPORTS = [
  { name: 'desktop-1280', width: 1280, height: 800 },
  { name: 'mobile-390', width: 390, height: 844 },
];

for (const vp of VIEWPORTS) {
  test(`CLS on /id during full scroll to footer is <= 0.05 (${vp.name})`, async ({ page }) => {
    await page.setViewportSize({ width: vp.width, height: vp.height });

    await page.addInitScript(() => {
      (window as any).__layoutShifts = [];
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries() as any[]) {
          if (!entry.hadRecentInput) {
            (window as any).__layoutShifts.push({
              value: entry.value,
              sources: (entry.sources || []).map((s: any) => ({
                node: s.node
                  ? `${s.node.tagName?.toLowerCase() || 'node'}.${(s.node.className || '').toString()}`
                  : 'unknown',
                previousRect: s.previousRect,
                currentRect: s.currentRect,
              })),
            });
          }
        }
      });
      observer.observe({ type: 'layout-shift', buffered: true });
    });

    await page.goto(`${BASE_URL}/id`, { waitUntil: 'networkidle' });

    // Scroll smoothly from top to footer
    await page.evaluate(async () => {
      const totalHeight = document.body.scrollHeight;
      for (let y = 0; y <= totalHeight; y += 300) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 60));
      }
      window.scrollTo(0, document.body.scrollHeight);
      await new Promise((r) => setTimeout(r, 300));
    });

    const shifts: Array<{ value: number; sources: any[] }> = await page.evaluate(
      () => (window as any).__layoutShifts || []
    );
    const totalCls = shifts.reduce((acc, s) => acc + s.value, 0);

    console.log(`[CLS ${vp.name}] total=${totalCls.toFixed(4)}`, JSON.stringify(shifts));
    expect(totalCls).toBeLessThanOrEqual(0.05);
  });
}
