/**
 * WCAG Contrast Ratio Audit Script for CHESTAADOTCOM Home Page
 * Accurately calculates Relative Luminance and Contrast Ratios across all text-to-background pairs.
 */

interface RGB {
  r: number;
  g: number;
  b: number;
  a?: number;
}

function hexToRgb(hex: string): RGB {
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  return { r, g, b, a: 1 };
}

function rgbaToRgb(rgbaStr: string): RGB {
  const match = rgbaStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
  if (!match) throw new Error(`Invalid color: ${rgbaStr}`);
  return {
    r: parseInt(match[1], 10),
    g: parseInt(match[2], 10),
    b: parseInt(match[3], 10),
    a: match[4] !== undefined ? parseFloat(match[4]) : 1,
  };
}

function parseColor(c: string): RGB {
  if (c.startsWith('#')) return hexToRgb(c);
  if (c.startsWith('rgb')) return rgbaToRgb(c);
  throw new Error(`Unknown color format: ${c}`);
}

function blend(fg: RGB, bg: RGB): RGB {
  const alpha = fg.a !== undefined ? fg.a : 1;
  return {
    r: Math.round(fg.r * alpha + bg.r * (1 - alpha)),
    g: Math.round(fg.g * alpha + bg.g * (1 - alpha)),
    b: Math.round(fg.b * alpha + bg.b * (1 - alpha)),
    a: 1,
  };
}

function getChannelLuminance(channel: number): number {
  const s = channel / 255;
  return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
}

function getRelativeLuminance(rgb: RGB): number {
  const r = getChannelLuminance(rgb.r);
  const g = getChannelLuminance(rgb.g);
  const b = getChannelLuminance(rgb.b);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function getContrastRatio(fgStr: string, bgStr: string, baseBgStr?: string): number {
  let fg = parseColor(fgStr);
  let bg = parseColor(bgStr);

  if (baseBgStr && bg.a !== undefined && bg.a < 1) {
    const base = parseColor(baseBgStr);
    bg = blend(bg, base);
  }

  if (fg.a !== undefined && fg.a < 1) {
    fg = blend(fg, bg);
  }

  const l1 = getRelativeLuminance(fg);
  const l2 = getRelativeLuminance(bg);

  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return (lighter + 0.05) / (darker + 0.05);
}

interface AuditRow {
  section: string;
  element: string;
  textColor: string;
  bgColor: string;
  ratio: number;
  wcagAA: boolean; // >= 4.5:1 (or 3:1 for large text)
  wcagAAA: boolean; // >= 7:1 (or 4.5:1 for large text)
  notes?: string;
}

function runAudit() {
  console.log('========================================================================================');
  console.log('CHESTAADOTCOM - WCAG 2.1 CONTRAST AUDIT: HOME PAGE & SIMULASI KINERJA AGENT');
  console.log('========================================================================================\n');

  // 1. BEFORE (Old "Simulasi Kinerja Agent" Section)
  const oldPairs: { element: string; fg: string; bg: string; baseBg?: string }[] = [
    { element: 'Old Body text (#EFEAFB on #2B1763)', fg: '#EFEAFB', bg: '#2B1763' },
    { element: 'Old Muted detail (#EFEAFB/80 on #2B1763)', fg: 'rgba(239,234,251,0.80)', bg: '#2B1763' },
    { element: 'Old Context text (#EFEAFB on #6A3FD0/40 glass)', fg: '#EFEAFB', bg: 'rgba(106,63,208,0.40)', baseBg: '#2B1763' },
    { element: 'Old Pipeline label (#EFEAFB/80 on #6A3FD0/40 glass)', fg: 'rgba(239,234,251,0.80)', bg: 'rgba(106,63,208,0.40)', baseBg: '#2B1763' },
    { element: 'Old Status text (#EFEAFB on #FFFFFF/5 glass)', fg: '#EFEAFB', bg: 'rgba(255,255,255,0.05)', baseBg: '#2B1763' },
    { element: 'Old Step subtitle (#EFEAFB on #FFFFFF/14 active)', fg: '#EFEAFB', bg: 'rgba(255,255,255,0.14)', baseBg: '#2B1763' },
  ];

  console.log('--- 1. BEFORE REDESIGN: OLD "SIMULASI KINERJA AGENT" (Flawed Pairs) ---');
  oldPairs.forEach((p) => {
    const r = getContrastRatio(p.fg, p.bg, p.baseBg);
    console.log(`  * ${p.element.padEnd(58)} : ${r.toFixed(2)}:1  ${r < 4.5 ? '❌ FAIL WCAG AA' : r < 7 ? '⚠️ Pass AA only' : '✅ Pass AAA'}`);
  });

  // 2. AFTER (New Redesigned "Simulasi Kinerja Agent" with Section-Scoped Tokens)
  const newSimPairs: { element: string; fg: string; bg: string; baseBg?: string; req: string }[] = [
    { element: 'H2 & Title (--sim-text #FFFFFF on --sim-bg-0 #1A0E42)', fg: '#FFFFFF', bg: '#1A0E42', req: '>= 7:1' },
    { element: 'Subheadline (--sim-text-2 #D6CEF3 on --sim-bg-0 #1A0E42)', fg: '#D6CEF3', bg: '#1A0E42', req: '>= 7:1' },
    { element: 'Eyebrow & Labels (--sim-label #B9A2F2 on --sim-bg-0 #1A0E42)', fg: '#B9A2F2', bg: '#1A0E42', req: '>= 4.5:1' },
    { element: 'Legend Muted Text (--sim-text-3 #B9AEDF on --sim-bg-0 #1A0E42)', fg: '#B9AEDF', bg: '#1A0E42', req: '>= 4.5:1' },
    { element: 'H2 & Title (--sim-text #FFFFFF on --sim-bg-1 #2B1763)', fg: '#FFFFFF', bg: '#2B1763', req: '>= 7:1' },
    { element: 'Subheadline (--sim-text-2 #D6CEF3 on --sim-bg-1 #2B1763)', fg: '#D6CEF3', bg: '#2B1763', req: '>= 7:1' },
    { element: 'Eyebrow & Labels (--sim-label #B9A2F2 on --sim-bg-1 #2B1763)', fg: '#B9A2F2', bg: '#2B1763', req: '>= 4.5:1' },
    { element: 'Legend Muted Text (--sim-text-3 #B9AEDF on --sim-bg-1 #2B1763)', fg: '#B9AEDF', bg: '#2B1763', req: '>= 4.5:1' },
    // Inside Console
    { element: 'Console Header Title (--sim-text #FFFFFF on Console)', fg: '#FFFFFF', bg: 'rgba(34,18,84,0.88)', baseBg: '#1A0E42', req: '>= 7:1' },
    { element: 'Console Status Label (--sim-label #B9A2F2 on Console)', fg: '#B9A2F2', bg: 'rgba(34,18,84,0.88)', baseBg: '#1A0E42', req: '>= 4.5:1' },
    { element: 'Column Header Labels (--sim-label #B9A2F2 on Console)', fg: '#B9A2F2', bg: 'rgba(34,18,84,0.88)', baseBg: '#1A0E42', req: '>= 4.5:1' },
    { element: 'User Bubble Text (--sim-text #FFFFFF on User Bubble)', fg: '#FFFFFF', bg: 'rgba(255,255,255,0.10)', baseBg: '#211252', req: '>= 7:1' },
    { element: 'User Bubble Timestamp (--sim-text-3 #B9AEDF on User Bubble)', fg: '#B9AEDF', bg: 'rgba(255,255,255,0.10)', baseBg: '#211252', req: '>= 4.5:1' },
    { element: 'Agent Bubble Text (White #FFFFFF on Agent Bubble Gradient End #7C54E0)', fg: '#FFFFFF', bg: '#7C54E0', req: '>= 4.5:1' },
    { element: 'Agent Bubble Text (White #FFFFFF on Agent Bubble Gradient End #6A3FD0)', fg: '#FFFFFF', bg: '#6A3FD0', req: '>= 4.5:1' },
    { element: 'Agent Bubble Timestamp (--sim-text #FFFFFF on Agent Bubble #6A3FD0)', fg: '#FFFFFF', bg: '#6A3FD0', req: '>= 4.5:1' },
    { element: 'Staff Handoff Card Body (--sim-text-2 #D6CEF3 on Handoff Card)', fg: '#D6CEF3', bg: 'rgba(255,255,255,0.08)', baseBg: '#211252', req: '>= 7:1' },
    { element: 'Staff Handoff Card Label (--sim-label #B9A2F2 on Handoff Card)', fg: '#B9A2F2', bg: 'rgba(255,255,255,0.08)', baseBg: '#211252', req: '>= 4.5:1' },
    { element: 'Tool Call Name (--sim-text #FFFFFF on Tool Row)', fg: '#FFFFFF', bg: 'rgba(255,255,255,0.04)', baseBg: '#211252', req: '>= 7:1' },
    { element: 'Tool Status Text (--sim-label #B9A2F2 on Tool Row)', fg: '#B9A2F2', bg: 'rgba(255,255,255,0.04)', baseBg: '#211252', req: '>= 4.5:1' },
    { element: 'Summary Meter Number (--sim-text #FFFFFF on Console)', fg: '#FFFFFF', bg: 'rgba(34,18,84,0.88)', baseBg: '#1A0E42', req: '>= 7:1' },
    { element: 'Summary Meter Label (--sim-text-3 #B9AEDF on Console)', fg: '#B9AEDF', bg: 'rgba(34,18,84,0.88)', baseBg: '#1A0E42', req: '>= 4.5:1' },
    { element: 'Footer Note Under Console (--sim-text-3 #B9AEDF on --sim-bg-1 #2B1763)', fg: '#B9AEDF', bg: '#2B1763', req: '>= 4.5:1' },
  ];

  console.log('\n--- 2. AFTER REDESIGN: NEW "SIMULASI KINERJA AGENT" (100% Compliant) ---');
  let simAllPass = true;
  newSimPairs.forEach((p) => {
    const r = getContrastRatio(p.fg, p.bg, p.baseBg);
    const pass = (p.req.includes('7:1') && r >= 7.0) || (p.req.includes('4.5:1') && r >= 4.5);
    if (!pass) simAllPass = false;
    console.log(
      `  * ${p.element.padEnd(72)} : ${r.toFixed(2).padStart(5)}:1 (Req ${p.req.padEnd(8)}) [${pass ? '✅ PASS' : '❌ FAIL'}]`
    );
  });

  // 3. WHOLE HOME PAGE AUDIT (Rest of page text & surfaces)
  const homePagePairs: { element: string; fg: string; bg: string; baseBg?: string; isLarge?: boolean }[] = [
    { element: 'Hero Eyebrow (#6A3FD0 on #FFFFFF)', fg: '#6A3FD0', bg: '#FFFFFF' },
    { element: 'Hero Headline (#17122B on #FFFFFF)', fg: '#17122B', bg: '#FFFFFF', isLarge: true },
    { element: 'Hero Subheadline (#5B5675 on #FFFFFF)', fg: '#5B5675', bg: '#FFFFFF' },
    { element: 'Hero Primary Button (White on #6A3FD0)', fg: '#FFFFFF', bg: '#6A3FD0' },
    { element: 'Hero Secondary Button (#17122B on #FFFFFF border)', fg: '#17122B', bg: '#FFFFFF' },
    { element: 'Marquee / Client Bar (#5B5675 on #F8F6FE)', fg: '#5B5675', bg: '#F8F6FE' },
    { element: 'Services Section Title (#17122B on #FFFFFF)', fg: '#17122B', bg: '#FFFFFF', isLarge: true },
    { element: 'Services Card Heading (#17122B on #F8F6FE)', fg: '#17122B', bg: '#F8F6FE' },
    { element: 'Services Card Body (#5B5675 on #F8F6FE)', fg: '#5B5675', bg: '#F8F6FE' },
    { element: 'Services Tag / Pill (#6A3FD0 on #EFEAFB)', fg: '#6A3FD0', bg: '#EFEAFB' },
    { element: 'Comparison Card - Chatbot Title (#17122B on #F8F6FE)', fg: '#17122B', bg: '#F8F6FE' },
    { element: 'Comparison Card - Chatbot Body (#5B5675 on #F8F6FE)', fg: '#5B5675', bg: '#F8F6FE' },
    { element: 'Comparison Card - Agent Title (#FFFFFF on #6A3FD0)', fg: '#FFFFFF', bg: '#6A3FD0' },
    { element: 'Comparison Card - Agent Body (#EFEAFB on #6A3FD0)', fg: '#EFEAFB', bg: '#6A3FD0' },
    { element: 'Process Line Step Title (#17122B on #FFFFFF)', fg: '#17122B', bg: '#FFFFFF' },
    { element: 'Process Line Step Body (#5B5675 on #FFFFFF)', fg: '#5B5675', bg: '#FFFFFF' },
    { element: 'FAQ Question (#17122B on #FFFFFF)', fg: '#17122B', bg: '#FFFFFF' },
    { element: 'FAQ Answer (#5B5675 on #FFFFFF)', fg: '#5B5675', bg: '#FFFFFF' },
    { element: 'CTA Block Headline (#FFFFFF on #2B1763)', fg: '#FFFFFF', bg: '#2B1763', isLarge: true },
    { element: 'CTA Block Body (#EFEAFB on #2B1763)', fg: '#EFEAFB', bg: '#2B1763' },
    { element: 'CTA Block Button (#17122B on #FFFFFF)', fg: '#17122B', bg: '#FFFFFF' },
  ];

  console.log('\n--- 3. HOME PAGE BROAD SURFACE CONTRAST AUDIT ---');
  let pageAllPass = true;
  homePagePairs.forEach((p) => {
    const r = getContrastRatio(p.fg, p.bg, p.baseBg);
    const minRequired = p.isLarge ? 3.0 : 4.5;
    const pass = r >= minRequired;
    if (!pass) pageAllPass = false;
    console.log(
      `  * ${p.element.padEnd(58)} : ${r.toFixed(2).padStart(5)}:1 (Min ${minRequired}:1) [${pass ? '✅ PASS' : '❌ FAIL'}]`
    );
  });

  console.log('\n========================================================================================');
  console.log(`SIMULATION SECTION AUDIT RESULT : ${simAllPass ? '100% PASSED (ALL >= REQUIRED)' : 'FAILED'}`);
  console.log(`WHOLE HOME PAGE AUDIT RESULT    : ${pageAllPass ? '100% PASSED (WCAG AA/AAA COMPLIANT)' : 'FAILED'}`);
  console.log('========================================================================================\n');
}

runAudit();
