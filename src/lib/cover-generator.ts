import { CoverSpec, CoverHeroId, fnv1a32 } from '../data/blog-cover-specs';

/**
 * Locked Design Tokens for CHESTAADOTCOM Generative Cover Engine
 * Tokens only: white, lavender, purple scale, ink.
 * No filters, no blur, no gradients beyond the single soft purple glow.
 */
export const COVER_TOKENS = {
  bgSoft: '#F8F6FE',
  bgTint: '#EFEAFB',
  white: '#FFFFFF',
  line: '#DED8F2',
  lineStrong: '#C5B8EC',
  purple200: '#D8C8FF',
  purple300: '#B9A2F2',
  purple400: '#9E7BF0',
  purple500: '#7C54E0',
  purple600: '#6A3FD0',
  purple700: '#5230B0',
  purple900: '#2B1763',
  ink: '#17122B',
  inkSoft: '#3E3954',
  inkMuted: '#5B5675',
} as const;

const GLOW_POSITIONS: ReadonlyArray<{ cx: number; cy: number }> = [
  { cx: 340, cy: 230 },
  { cx: 800, cy: 200 },
  { cx: 1260, cy: 240 },
  { cx: 360, cy: 670 },
  { cx: 800, cy: 700 },
  { cx: 1240, cy: 660 },
];

function escapeXml(raw: string): string {
  return (raw || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function seededUnit(seed: number, salt: number): number {
  const h = fnv1a32(`${seed}:${salt}`);
  return (h % 10000) / 10000;
}

function seededInt(seed: number, salt: number, min: number, max: number): number {
  const u = seededUnit(seed, salt);
  return min + Math.floor(u * (max - min + 1));
}

function renderLabelPill(
  x: number,
  y: number,
  text: string,
  isAccent: boolean
): string {
  const clean = escapeXml(text.slice(0, 14).toUpperCase());
  const w = Math.max(76, clean.length * 8.2 + 24);
  const h = 26;
  const rx = 6;
  const fill = isAccent ? COVER_TOKENS.purple900 : COVER_TOKENS.white;
  const stroke = isAccent ? COVER_TOKENS.purple600 : COVER_TOKENS.lineStrong;
  const textFill = isAccent ? COVER_TOKENS.white : COVER_TOKENS.ink;

  return `<g transform="translate(${Math.round(x - w / 2)}, ${Math.round(y - h / 2)})">
    <rect width="${Math.round(w)}" height="${h}" rx="${rx}" fill="${fill}" stroke="${stroke}" stroke-width="1" />
    <text x="${Math.round(w / 2)}" y="17" text-anchor="middle" font-family="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace" font-size="11" font-weight="600" letter-spacing="0.06em" fill="${textFill}">${clean}</text>
  </g>`;
}

/**
 * Generates 3–6 supporting structural nodes, anchor plates, and 1px connector lines
 * placed deterministically from the seed and layoutVariant.
 */
function renderSupportingNodesAndPlates(spec: CoverSpec): string {
  const { seed, layoutVariant } = spec;
  const nodeCount = 3 + (seed % 4); // 3 to 6 nodes
  const accentIdx = (seed >>> 3) % nodeCount;

  // Macro structural anchor blocks in distinct quadrants per layoutVariant + seed
  // These provide strong editorial structure and ensure distinct luminance topography
  const quadrantAnchors: Array<{ x: number; y: number; w: number; h: number; fill: string }> = [];
  const qMode = (seed >>> 4) % 8;

  if (layoutVariant === 'A') {
    quadrantAnchors.push(
      {
        x: 88 + (qMode % 3) * 28,
        y: 96 + ((seed >>> 7) % 3) * 24,
        w: 220,
        h: 130,
        fill: qMode % 2 === 0 ? COVER_TOKENS.ink : COVER_TOKENS.purple900,
      },
      {
        x: 1270 - (qMode % 2) * 30,
        y: 640 - ((seed >>> 9) % 3) * 20,
        w: 230,
        h: 140,
        fill: COVER_TOKENS.bgTint,
      }
    );
  } else if (layoutVariant === 'B') {
    quadrantAnchors.push(
      {
        x: 1240 - (qMode % 3) * 24,
        y: 92 + ((seed >>> 6) % 3) * 26,
        w: 250,
        h: 150,
        fill: qMode % 2 === 0 ? COVER_TOKENS.purple900 : COVER_TOKENS.ink,
      },
      {
        x: 92 + (qMode % 2) * 32,
        y: 620 - ((seed >>> 8) % 3) * 22,
        w: 240,
        h: 150,
        fill: COVER_TOKENS.purple700,
      }
    );
  } else if (layoutVariant === 'C') {
    quadrantAnchors.push(
      {
        x: 96 + (qMode % 3) * 22,
        y: 610 - ((seed >>> 5) % 3) * 26,
        w: 260,
        h: 160,
        fill: COVER_TOKENS.ink,
      },
      {
        x: 1230 - (qMode % 2) * 28,
        y: 110 + ((seed >>> 10) % 3) * 24,
        w: 240,
        h: 130,
        fill: COVER_TOKENS.purple300,
      }
    );
  } else {
    quadrantAnchors.push(
      {
        x: 1220 - (qMode % 3) * 26,
        y: 600 - ((seed >>> 6) % 3) * 28,
        w: 260,
        h: 165,
        fill: COVER_TOKENS.ink,
      },
      {
        x: 104 + (qMode % 2) * 30,
        y: 108 + ((seed >>> 9) % 3) * 22,
        w: 230,
        h: 145,
        fill: COVER_TOKENS.purple600,
      }
    );
  }

  // Add a third seed-derived peripheral structural bar so each of the 35 seeds has a unique perimeter signature
  const barSide = seed % 4;
  if (barSide === 0) {
    quadrantAnchors.push({
      x: 520 + (seed % 180),
      y: 64,
      w: 340,
      h: 48,
      fill: COVER_TOKENS.purple900,
    });
  } else if (barSide === 1) {
    quadrantAnchors.push({
      x: 540 + (seed % 160),
      y: 788,
      w: 360,
      h: 48,
      fill: COVER_TOKENS.ink,
    });
  } else if (barSide === 2) {
    quadrantAnchors.push({
      x: 72,
      y: 340 + (seed % 140),
      w: 140,
      h: 210,
      fill: COVER_TOKENS.purple700,
    });
  } else {
    quadrantAnchors.push({
      x: 1388,
      y: 330 + (seed % 140),
      w: 140,
      h: 210,
      fill: COVER_TOKENS.ink,
    });
  }

  const anchorSvg = quadrantAnchors
    .map((a, idx) => {
      const innerLines =
        a.fill === COVER_TOKENS.ink ||
        a.fill === COVER_TOKENS.purple900 ||
        a.fill === COVER_TOKENS.purple700
          ? `<rect x="${a.x + 18}" y="${a.y + 20}" width="${Math.max(40, a.w - 60)}" height="10" rx="5" fill="${COVER_TOKENS.purple300}" />
             <rect x="${a.x + 18}" y="${a.y + 40}" width="${Math.max(30, a.w - 100)}" height="8" rx="4" fill="${COVER_TOKENS.bgTint}" fill-opacity="0.45" />`
          : `<rect x="${a.x + 18}" y="${a.y + 20}" width="${Math.max(40, a.w - 60)}" height="10" rx="5" fill="${COVER_TOKENS.purple700}" />
             <rect x="${a.x + 18}" y="${a.y + 40}" width="${Math.max(30, a.w - 100)}" height="8" rx="4" fill="${COVER_TOKENS.ink}" fill-opacity="0.25" />`;
      return `<g key="anchor-${idx}">
        <rect x="${a.x}" y="${a.y}" width="${a.w}" height="${a.h}" rx="14" fill="${a.fill}" stroke="${COVER_TOKENS.line}" stroke-width="1" />
        ${innerLines}
      </g>`;
    })
    .join('\n');

  const candidateCoords = [
    { x: 180, y: 260 },
    { x: 1420, y: 250 },
    { x: 190, y: 640 },
    { x: 1410, y: 650 },
    { x: 310, y: 150 },
    { x: 1290, y: 155 },
    { x: 300, y: 755 },
    { x: 1300, y: 745 },
  ];

  const nodes: Array<{ x: number; y: number; r: number; isAccent: boolean }> = [];
  for (let i = 0; i < nodeCount; i++) {
    const base = candidateCoords[(i + (seed % candidateCoords.length)) % candidateCoords.length];
    const jitterX = seededInt(seed, i * 11 + 1, -36, 36);
    const jitterY = seededInt(seed, i * 17 + 2, -28, 28);
    const r = i === accentIdx ? 20 : 14;
    nodes.push({
      x: base.x + jitterX,
      y: base.y + jitterY,
      r,
      isAccent: i === accentIdx,
    });
  }

  const linesSvg = nodes
    .map((n, idx) => {
      const targetX = 800 + (idx % 2 === 0 ? -240 : 240);
      const targetY = 450 + (idx < 3 ? -120 : 120);
      return `<line x1="${n.x}" y1="${n.y}" x2="${targetX}" y2="${targetY}" stroke="${COVER_TOKENS.lineStrong}" stroke-width="1" stroke-dasharray="${
        idx % 2 === 0 ? '4 4' : 'none'
      }" />`;
    })
    .join('\n');

  const circlesSvg = nodes
    .map((n) => {
      const fill = n.isAccent ? COVER_TOKENS.purple600 : COVER_TOKENS.white;
      const stroke = n.isAccent ? COVER_TOKENS.ink : COVER_TOKENS.lineStrong;
      const dotFill = n.isAccent ? COVER_TOKENS.white : COVER_TOKENS.purple600;
      return `<g>
        <circle cx="${n.x}" cy="${n.y}" r="${n.r}" fill="${fill}" stroke="${stroke}" stroke-width="1" />
        <circle cx="${n.x}" cy="${n.y}" r="4" fill="${dotFill}" />
      </g>`;
    })
    .join('\n');

  return `${anchorSvg}\n${linesSvg}\n${circlesSvg}`;
}

/**
 * Renders the primary Hero Scene occupying 55–65% of the 1600×900 canvas (approx 920×540 centered around 800, 450).
 * Every hero has distinct A and B variants and seed-driven internal proportions.
 */
function renderHeroScene(spec: CoverSpec): string {
  const { hero, variant, seed } = spec;
  const isB = variant === 'B';
  const s1 = seededInt(seed, 101, 0, 60);
  const s2 = seededInt(seed, 202, 0, 50);

  switch (hero) {
    case 'speed-gauge': {
      // A speed ring with slow and fast bars
      const gaugeCx = isB ? 610 : 980;
      const barsX = isB ? 870 : 340;
      return `<g>
        <rect x="300" y="180" width="1000" height="540" rx="24" fill="${COVER_TOKENS.white}" stroke="${COVER_TOKENS.lineStrong}" stroke-width="1" />
        <rect x="300" y="180" width="1000" height="58" rx="24" fill="${COVER_TOKENS.ink}" />
        <circle cx="340" cy="209" r="7" fill="${COVER_TOKENS.purple400}" />
        <circle cx="364" cy="209" r="7" fill="${COVER_TOKENS.purple300}" />
        <circle cx="388" cy="209" r="7" fill="${COVER_TOKENS.bgTint}" />
        <!-- Speed Ring -->
        <circle cx="${gaugeCx}" cy="465" r="175" fill="${COVER_TOKENS.bgSoft}" stroke="${COVER_TOKENS.line}" stroke-width="22" />
        <path d="M ${gaugeCx - 145} 555 A 175 175 0 1 1 ${gaugeCx + 150} 380" fill="none" stroke="${COVER_TOKENS.purple600}" stroke-width="24" stroke-linecap="round" />
        <circle cx="${gaugeCx}" cy="465" r="95" fill="${COVER_TOKENS.ink}" />
        <line x1="${gaugeCx}" y1="465" x2="${gaugeCx + (isB ? 95 : 115)}" y2="${isB ? 360 : 385}" stroke="${COVER_TOKENS.purple300}" stroke-width="6" stroke-linecap="round" />
        <circle cx="${gaugeCx}" cy="465" r="14" fill="${COVER_TOKENS.white}" />
        <!-- Slow vs Fast Bars -->
        <rect x="${barsX}" y="290" width="${340 - s1}" height="46" rx="10" fill="${COVER_TOKENS.purple900}" />
        <rect x="${barsX}" y="356" width="${220 + s2}" height="46" rx="10" fill="${COVER_TOKENS.purple600}" />
        <rect x="${barsX}" y="422" width="${150 + s1}" height="46" rx="10" fill="${COVER_TOKENS.purple300}" />
        <rect x="${barsX}" y="495" width="360" height="120" rx="14" fill="${COVER_TOKENS.bgTint}" stroke="${COVER_TOKENS.lineStrong}" stroke-width="1" />
        <rect x="${barsX + 24}" y="525" width="190" height="22" rx="6" fill="${COVER_TOKENS.ink}" />
        <rect x="${barsX + 24}" y="562" width="280" height="18" rx="6" fill="${COVER_TOKENS.purple600}" />
      </g>`;
    }

    case 'three-gauges':
    case 'vitals-trio': {
      // Three small rings labeled LCP, INP, CLS
      const yOff = isB ? -25 : 20;
      return `<g>
        <rect x="270" y="185" width="1060" height="530" rx="24" fill="${COVER_TOKENS.white}" stroke="${COVER_TOKENS.lineStrong}" stroke-width="1" />
        <!-- Card 1: LCP -->
        <rect x="310" y="${230 + yOff}" width="300" height="430" rx="18" fill="${COVER_TOKENS.ink}" />
        <circle cx="460" cy="${385 + yOff}" r="96" fill="none" stroke="${COVER_TOKENS.purple900}" stroke-width="18" />
        <path d="M 380 ${435 + yOff} A 96 96 0 1 1 545 ${345 + yOff}" fill="none" stroke="${COVER_TOKENS.purple400}" stroke-width="18" stroke-linecap="round" />
        <circle cx="460" cy="${385 + yOff}" r="36" fill="${COVER_TOKENS.white}" />
        <rect x="355" y="${535 + yOff}" width="210" height="32" rx="8" fill="${COVER_TOKENS.purple600}" />
        <!-- Card 2: INP -->
        <rect x="650" y="${230 - yOff}" width="300" height="430" rx="18" fill="${COVER_TOKENS.bgSoft}" stroke="${COVER_TOKENS.lineStrong}" stroke-width="1" />
        <circle cx="800" cy="${385 - yOff}" r="96" fill="none" stroke="${COVER_TOKENS.line}" stroke-width="18" />
        <path d="M 715 ${425 - yOff} A 96 96 0 1 1 885 ${355 - yOff}" fill="none" stroke="${COVER_TOKENS.purple600}" stroke-width="18" stroke-linecap="round" />
        <circle cx="800" cy="${385 - yOff}" r="38" fill="${COVER_TOKENS.ink}" />
        <rect x="695" y="${535 - yOff}" width="210" height="32" rx="8" fill="${COVER_TOKENS.ink}" />
        <!-- Card 3: CLS -->
        <rect x="990" y="${230 + yOff}" width="300" height="430" rx="18" fill="${COVER_TOKENS.purple900}" />
        <circle cx="1140" cy="${385 + yOff}" r="96" fill="none" stroke="${COVER_TOKENS.purple700}" stroke-width="18" />
        <path d="M 1055 ${415 + yOff} A 96 96 0 1 1 1225 ${365 + yOff}" fill="none" stroke="${COVER_TOKENS.white}" stroke-width="18" stroke-linecap="round" />
        <circle cx="1140" cy="${385 + yOff}" r="36" fill="${COVER_TOKENS.purple400}" />
        <rect x="1035" y="${535 + yOff}" width="210" height="32" rx="8" fill="${COVER_TOKENS.bgTint}" />
      </g>`;
    }

    case 'price-tiers': {
      // Stacked layers / columns of increasing height
      return `<g>
        <rect x="280" y="175" width="1040" height="550" rx="24" fill="${COVER_TOKENS.white}" stroke="${COVER_TOKENS.lineStrong}" stroke-width="1" />
        <!-- Tier 1 -->
        <rect x="340" y="430" width="260" height="240" rx="16" fill="${COVER_TOKENS.bgTint}" stroke="${COVER_TOKENS.lineStrong}" stroke-width="1" />
        <rect x="370" y="465" width="140" height="24" rx="6" fill="${COVER_TOKENS.purple700}" />
        <rect x="370" y="510" width="200" height="14" rx="4" fill="${COVER_TOKENS.purple300}" />
        <rect x="370" y="538" width="175" height="14" rx="4" fill="${COVER_TOKENS.purple300}" />
        <!-- Tier 2 -->
        <rect x="650" y="320" width="280" height="350" rx="16" fill="${COVER_TOKENS.purple600}" />
        <rect x="685" y="360" width="170" height="28" rx="6" fill="${COVER_TOKENS.white}" />
        <rect x="685" y="415" width="210" height="16" rx="4" fill="${COVER_TOKENS.purple200}" />
        <rect x="685" y="448" width="190" height="16" rx="4" fill="${COVER_TOKENS.purple200}" />
        <rect x="685" y="575" width="210" height="54" rx="10" fill="${COVER_TOKENS.ink}" />
        <!-- Tier 3 -->
        <rect x="980" y="220" width="280" height="450" rx="16" fill="${COVER_TOKENS.ink}" />
        <rect x="1015" y="265" width="180" height="30" rx="6" fill="${COVER_TOKENS.purple400}" />
        <rect x="1015" y="320" width="210" height="16" rx="4" fill="${COVER_TOKENS.purple300}" />
        <rect x="1015" y="355" width="190" height="16" rx="4" fill="${COVER_TOKENS.purple300}" />
        <rect x="1015" y="390" width="210" height="90" rx="12" fill="${COVER_TOKENS.purple900}" stroke="${COVER_TOKENS.purple500}" stroke-width="1" />
        <rect x="1015" y="575" width="210" height="54" rx="10" fill="${COVER_TOKENS.white}" />
      </g>`;
    }

    case 'cost-bars': {
      // An agent node above bars
      return `<g>
        <rect x="310" y="180" width="980" height="540" rx="24" fill="${COVER_TOKENS.white}" stroke="${COVER_TOKENS.lineStrong}" stroke-width="1" />
        <circle cx="800" cy="285" r="64" fill="${COVER_TOKENS.ink}" stroke="${COVER_TOKENS.purple500}" stroke-width="4" />
        <circle cx="800" cy="285" r="24" fill="${COVER_TOKENS.purple400}" />
        <line x1="800" y1="349" x2="480" y2="430" stroke="${COVER_TOKENS.ink}" stroke-width="2" />
        <line x1="800" y1="349" x2="800" y2="410" stroke="${COVER_TOKENS.ink}" stroke-width="2" />
        <line x1="800" y1="349" x2="1120" y2="450" stroke="${COVER_TOKENS.ink}" stroke-width="2" />
        <rect x="390" y="430" width="180" height="230" rx="12" fill="${COVER_TOKENS.purple900}" />
        <rect x="710" y="410" width="180" height="250" rx="12" fill="${COVER_TOKENS.purple600}" />
        <rect x="1030" y="450" width="180" height="210" rx="12" fill="${COVER_TOKENS.ink}" />
      </g>`;
    }

    case 'usage-meter': {
      // A meter with monthly ticks
      return `<g>
        <rect x="290" y="185" width="1020" height="530" rx="24" fill="${COVER_TOKENS.ink}" stroke="${COVER_TOKENS.lineStrong}" stroke-width="1" />
        <rect x="345" y="245" width="910" height="190" rx="18" fill="${COVER_TOKENS.white}" />
        <!-- Monthly tick bars -->
        <rect x="385" y="310" width="54" height="90" rx="6" fill="${COVER_TOKENS.bgTint}" />
        <rect x="465" y="295" width="54" height="105" rx="6" fill="${COVER_TOKENS.purple300}" />
        <rect x="545" y="275" width="54" height="125" rx="6" fill="${COVER_TOKENS.purple500}" />
        <rect x="625" y="265" width="54" height="135" rx="6" fill="${COVER_TOKENS.purple700}" />
        <rect x="705" y="285" width="54" height="115" rx="6" fill="${COVER_TOKENS.ink}" />
        <rect x="785" y="260" width="54" height="140" rx="6" fill="${COVER_TOKENS.purple600}" />
        <rect x="865" y="300" width="54" height="100" rx="6" fill="${COVER_TOKENS.purple400}" />
        <!-- Right summary dial -->
        <circle cx="1095" cy="340" r="68" fill="${COVER_TOKENS.ink}" />
        <circle cx="1095" cy="340" r="32" fill="${COVER_TOKENS.purple400}" />
        <!-- Bottom quota track -->
        <rect x="345" y="475" width="910" height="180" rx="18" fill="${COVER_TOKENS.purple900}" stroke="${COVER_TOKENS.purple600}" stroke-width="1" />
        <rect x="385" y="515" width="830" height="36" rx="18" fill="${COVER_TOKENS.white}" />
        <rect x="385" y="515" width="560" height="36" rx="18" fill="${COVER_TOKENS.purple600}" />
        <rect x="385" y="580" width="380" height="34" rx="8" fill="${COVER_TOKENS.purple400}" />
        <rect x="815" y="580" width="400" height="34" rx="8" fill="${COVER_TOKENS.bgTint}" />
      </g>`;
    }

    case 'wrench-calendar': {
      // A gear beside a calendar
      return `<g>
        <rect x="280" y="180" width="1040" height="540" rx="24" fill="${COVER_TOKENS.white}" stroke="${COVER_TOKENS.lineStrong}" stroke-width="1" />
        <!-- Left Gear Assembly -->
        <rect x="325" y="225" width="390" height="450" rx="20" fill="${COVER_TOKENS.purple900}" />
        <circle cx="520" cy="450" r="118" fill="${COVER_TOKENS.purple600}" stroke="${COVER_TOKENS.white}" stroke-width="12" stroke-dasharray="28 18" />
        <circle cx="520" cy="450" r="62" fill="${COVER_TOKENS.ink}" stroke="${COVER_TOKENS.purple300}" stroke-width="4" />
        <circle cx="520" cy="450" r="22" fill="${COVER_TOKENS.white}" />
        <!-- Right Calendar Grid -->
        <rect x="755" y="225" width="520" height="450" rx="20" fill="${COVER_TOKENS.bgSoft}" stroke="${COVER_TOKENS.lineStrong}" stroke-width="1" />
        <rect x="755" y="225" width="520" height="74" rx="20" fill="${COVER_TOKENS.ink}" />
        <rect x="795" y="335" width="120" height="85" rx="10" fill="${COVER_TOKENS.white}" stroke="${COVER_TOKENS.lineStrong}" />
        <rect x="945" y="335" width="120" height="85" rx="10" fill="${COVER_TOKENS.purple600}" />
        <rect x="1095" y="335" width="135" height="85" rx="10" fill="${COVER_TOKENS.white}" stroke="${COVER_TOKENS.lineStrong}" />
        <rect x="795" y="445" width="120" height="85" rx="10" fill="${COVER_TOKENS.ink}" />
        <rect x="945" y="445" width="120" height="85" rx="10" fill="${COVER_TOKENS.white}" stroke="${COVER_TOKENS.lineStrong}" />
        <rect x="1095" y="445" width="135" height="85" rx="10" fill="${COVER_TOKENS.purple700}" />
        <rect x="795" y="555" width="435" height="75" rx="12" fill="${COVER_TOKENS.bgTint}" />
      </g>`;
    }

    case 'chat-to-calendar': {
      // Chat bubbles flowing into a calendar grid
      return `<g>
        <rect x="270" y="180" width="1060" height="540" rx="24" fill="${COVER_TOKENS.white}" stroke="${COVER_TOKENS.lineStrong}" stroke-width="1" />
        <!-- Left Chat Stream -->
        <rect x="315" y="230" width="420" height="440" rx="18" fill="${COVER_TOKENS.bgSoft}" stroke="${COVER_TOKENS.lineStrong}" />
        <rect x="345" y="265" width="290" height="78" rx="16" fill="${COVER_TOKENS.ink}" />
        <rect x="415" y="368" width="290" height="82" rx="16" fill="${COVER_TOKENS.purple600}" />
        <rect x="345" y="475" width="310" height="78" rx="16" fill="${COVER_TOKENS.purple900}" />
        <rect x="345" y="580" width="360" height="52" rx="12" fill="${COVER_TOKENS.white}" stroke="${COVER_TOKENS.lineStrong}" />
        <!-- Flow Arrow Bridge -->
        <path d="M 735 450 L 815 450" stroke="${COVER_TOKENS.purple600}" stroke-width="6" />
        <circle cx="775" cy="450" r="24" fill="${COVER_TOKENS.purple600}" />
        <!-- Right Calendar Grid -->
        <rect x="815" y="230" width="470" height="440" rx="18" fill="${COVER_TOKENS.ink}" />
        <rect x="850" y="275" width="400" height="56" rx="10" fill="${COVER_TOKENS.purple700}" />
        <rect x="850" y="355" width="120" height="90" rx="10" fill="${COVER_TOKENS.white}" />
        <rect x="990" y="355" width="120" height="90" rx="10" fill="${COVER_TOKENS.purple400}" />
        <rect x="1130" y="355" width="120" height="90" rx="10" fill="${COVER_TOKENS.bgTint}" />
        <rect x="850" y="468" width="120" height="90" rx="10" fill="${COVER_TOKENS.purple600}" />
        <rect x="990" y="468" width="260" height="90" rx="10" fill="${COVER_TOKENS.white}" />
        <rect x="850" y="582" width="400" height="52" rx="10" fill="${COVER_TOKENS.purple900}" />
      </g>`;
    }

    case 'page-checklist': {
      // Page wireframe with check marks
      return `<g>
        <rect x="310" y="165" width="980" height="570" rx="24" fill="${COVER_TOKENS.white}" stroke="${COVER_TOKENS.lineStrong}" stroke-width="1" />
        <rect x="310" y="165" width="980" height="62" rx="24" fill="${COVER_TOKENS.purple900}" />
        <!-- Left Wireframe Hero Preview -->
        <rect x="355" y="265" width="460" height="425" rx="16" fill="${COVER_TOKENS.ink}" />
        <rect x="390" y="305" width="320" height="36" rx="8" fill="${COVER_TOKENS.white}" />
        <rect x="390" y="360" width="380" height="22" rx="6" fill="${COVER_TOKENS.purple300}" />
        <rect x="390" y="415" width="390" height="150" rx="12" fill="${COVER_TOKENS.purple900}" stroke="${COVER_TOKENS.purple500}" />
        <rect x="390" y="595" width="220" height="56" rx="12" fill="${COVER_TOKENS.purple500}" />
        <!-- Right Checklist Rows -->
        <rect x="855" y="265" width="390" height="92" rx="14" fill="${COVER_TOKENS.bgSoft}" stroke="${COVER_TOKENS.lineStrong}" />
        <circle cx="905" cy="311" r="22" fill="${COVER_TOKENS.purple600}" />
        <path d="M 895 311 L 903 319 L 917 303" fill="none" stroke="${COVER_TOKENS.white}" stroke-width="4" stroke-linecap="round" />
        <rect x="945" y="298" width="260" height="26" rx="6" fill="${COVER_TOKENS.ink}" />

        <rect x="855" y="376" width="390" height="92" rx="14" fill="${COVER_TOKENS.bgSoft}" stroke="${COVER_TOKENS.lineStrong}" />
        <circle cx="905" cy="422" r="22" fill="${COVER_TOKENS.ink}" />
        <path d="M 895 422 L 903 430 L 917 414" fill="none" stroke="${COVER_TOKENS.purple300}" stroke-width="4" stroke-linecap="round" />
        <rect x="945" y="409" width="240" height="26" rx="6" fill="${COVER_TOKENS.purple700}" />

        <rect x="855" y="487" width="390" height="92" rx="14" fill="${COVER_TOKENS.purple900}" />
        <circle cx="905" cy="533" r="22" fill="${COVER_TOKENS.white}" />
        <path d="M 895 533 L 903 541 L 917 525" fill="none" stroke="${COVER_TOKENS.purple700}" stroke-width="4" stroke-linecap="round" />
        <rect x="945" y="520" width="250" height="26" rx="6" fill="${COVER_TOKENS.white}" />

        <rect x="855" y="598" width="390" height="92" rx="14" fill="${COVER_TOKENS.bgTint}" stroke="${COVER_TOKENS.lineStrong}" />
        <circle cx="905" cy="644" r="22" fill="${COVER_TOKENS.purple600}" />
        <rect x="945" y="631" width="220" height="26" rx="6" fill="${COVER_TOKENS.ink}" />
      </g>`;
    }

    case 'question-checklist': {
      // Twelve small check dots around a central blueprint page
      const ringRadiusX = 410;
      const ringRadiusY = 235;
      const dots: string[] = [];
      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2;
        const dx = Math.round(800 + Math.cos(angle) * ringRadiusX);
        const dy = Math.round(450 + Math.sin(angle) * ringRadiusY);
        const isDark = i % 3 === 0;
        dots.push(`<g>
          <line x1="800" y1="450" x2="${dx}" y2="${dy}" stroke="${COVER_TOKENS.lineStrong}" stroke-width="1" />
          <rect x="${dx - 38}" y="${dy - 24}" width="76" height="48" rx="12" fill="${
            isDark ? COVER_TOKENS.ink : i % 2 === 0 ? COVER_TOKENS.purple600 : COVER_TOKENS.white
          }" stroke="${COVER_TOKENS.lineStrong}" stroke-width="1" />
          <circle cx="${dx}" cy="${dy}" r="9" fill="${
            isDark ? COVER_TOKENS.purple300 : i % 2 === 0 ? COVER_TOKENS.white : COVER_TOKENS.purple700
          }" />
        </g>`);
      }
      return `<g>
        ${dots.join('\n')}
        <rect x="540" y="250" width="520" height="400" rx="22" fill="${COVER_TOKENS.ink}" stroke="${COVER_TOKENS.purple400}" stroke-width="2" />
        <rect x="580" y="295" width="440" height="54" rx="10" fill="${COVER_TOKENS.purple600}" />
        <rect x="580" y="375" width="205" height="110" rx="12" fill="${COVER_TOKENS.white}" />
        <rect x="815" y="375" width="205" height="110" rx="12" fill="${COVER_TOKENS.purple300}" />
        <rect x="580" y="510" width="440" height="95" rx="12" fill="${COVER_TOKENS.purple900}" />
      </g>`;
    }

    case 'area-network': {
      // A hub with area nodes (schematic, not a map)
      const areaNodes = [
        { x: 410, y: 250, w: 210, h: 110, fill: COVER_TOKENS.ink },
        { x: 1010, y: 235, w: 220, h: 110, fill: COVER_TOKENS.purple700 },
        { x: 360, y: 550, w: 220, h: 115, fill: COVER_TOKENS.purple900 },
        { x: 1000, y: 560, w: 230, h: 115, fill: COVER_TOKENS.ink },
        { x: 700, y: 175, w: 200, h: 95, fill: COVER_TOKENS.bgTint },
        { x: 695, y: 635, w: 210, h: 95, fill: COVER_TOKENS.purple600 },
      ];
      return `<g>
        <rect x="290" y="150" width="1020" height="600" rx="28" fill="${COVER_TOKENS.white}" stroke="${COVER_TOKENS.lineStrong}" stroke-width="1" />
        ${areaNodes
          .map(
            (n) => `<g>
          <line x1="800" y1="450" x2="${n.x + n.w / 2}" y2="${n.y + n.h / 2}" stroke="${COVER_TOKENS.ink}" stroke-width="2" />
          <rect x="${n.x}" y="${n.y}" width="${n.w}" height="${n.h}" rx="16" fill="${n.fill}" stroke="${COVER_TOKENS.lineStrong}" />
          <rect x="${n.x + 24}" y="${n.y + 28}" width="${n.w - 60}" height="18" rx="5" fill="${
            n.fill === COVER_TOKENS.bgTint ? COVER_TOKENS.ink : COVER_TOKENS.white
          }" />
          <rect x="${n.x + 24}" y="${n.y + 58}" width="${n.w - 95}" height="14" rx="4" fill="${COVER_TOKENS.purple300}" />
        </g>`
          )
          .join('\n')}
        <circle cx="800" cy="450" r="108" fill="${COVER_TOKENS.ink}" stroke="${COVER_TOKENS.purple400}" stroke-width="6" />
        <circle cx="800" cy="450" r="52" fill="${COVER_TOKENS.purple600}" />
        <circle cx="800" cy="450" r="18" fill="${COVER_TOKENS.white}" />
      </g>`;
    }

    case 'compare-two': {
      // A single bubble beside a connected agent graph
      const leftX = isB ? 835 : 310;
      const rightX = isB ? 310 : 835;
      return `<g>
        <!-- Panel 1: Simple Bubble / Single Unit -->
        <rect x="${leftX}" y="185" width="455" height="530" rx="24" fill="${COVER_TOKENS.bgSoft}" stroke="${COVER_TOKENS.lineStrong}" stroke-width="1" />
        <rect x="${leftX + 55}" y="255" width="345" height="120" rx="20" fill="${COVER_TOKENS.white}" stroke="${COVER_TOKENS.lineStrong}" />
        <rect x="${leftX + 90}" y="295" width="220" height="24" rx="6" fill="${COVER_TOKENS.ink}" />
        <circle cx="${leftX + 227}" cy="515" r="76" fill="${COVER_TOKENS.purple300}" />
        <circle cx="${leftX + 227}" cy="515" r="32" fill="${COVER_TOKENS.ink}" />

        <!-- Panel 2: Connected Agent Graph -->
        <rect x="${rightX}" y="185" width="455" height="530" rx="24" fill="${COVER_TOKENS.ink}" />
        <line x1="${rightX + 227}" y1="330" x2="${rightX + 115}" y2="520" stroke="${COVER_TOKENS.purple400}" stroke-width="3" />
        <line x1="${rightX + 227}" y1="330" x2="${rightX + 340}" y2="520" stroke="${COVER_TOKENS.purple400}" stroke-width="3" />
        <line x1="${rightX + 115}" y1="520" x2="${rightX + 340}" y2="520" stroke="${COVER_TOKENS.purple400}" stroke-width="3" />
        <circle cx="${rightX + 227}" cy="330" r="64" fill="${COVER_TOKENS.purple600}" stroke="${COVER_TOKENS.white}" stroke-width="3" />
        <rect x="${rightX + 55}" y="475" width="125" height="95" rx="16" fill="${COVER_TOKENS.white}" />
        <rect x="${rightX + 275}" y="475" width="125" height="95" rx="16" fill="${COVER_TOKENS.purple400}" />
      </g>`;
    }

    case 'compare-frames': {
      // Two browser/application frames side by side
      const swap = isB;
      const frame1X = swap ? 820 : 290;
      const frame2X = swap ? 290 : 820;
      return `<g>
        <!-- Frame 1: Modern Modular Stack -->
        <rect x="${frame1X}" y="180" width="490" height="540" rx="22" fill="${COVER_TOKENS.ink}" />
        <rect x="${frame1X + 32}" y="235" width="426" height="56" rx="10" fill="${COVER_TOKENS.purple600}" />
        <rect x="${frame1X + 32}" y="315" width="200" height="175" rx="14" fill="${COVER_TOKENS.white}" />
        <rect x="${frame1X + 258}" y="315" width="200" height="175" rx="14" fill="${COVER_TOKENS.purple400}" />
        <rect x="${frame1X + 32}" y="515" width="426" height="160" rx="14" fill="${COVER_TOKENS.purple900}" stroke="${COVER_TOKENS.purple500}" />

        <!-- Frame 2: Monolithic / Multi-layer Frame -->
        <rect x="${frame2X}" y="180" width="490" height="540" rx="22" fill="${COVER_TOKENS.white}" stroke="${COVER_TOKENS.lineStrong}" stroke-width="1" />
        <rect x="${frame2X}" y="180" width="490" height="56" rx="22" fill="${COVER_TOKENS.purple700}" />
        <rect x="${frame2X + 36}" y="270" width="418" height="82" rx="12" fill="${COVER_TOKENS.bgTint}" />
        <rect x="${frame2X + 36}" y="376" width="418" height="82" rx="12" fill="${COVER_TOKENS.purple300}" />
        <rect x="${frame2X + 36}" y="482" width="418" height="82" rx="12" fill="${COVER_TOKENS.ink}" />
        <rect x="${frame2X + 36}" y="588" width="260" height="82" rx="12" fill="${COVER_TOKENS.purple600}" />
      </g>`;
    }

    case 'before-after': {
      // Tangled / fragmented state on left, clean ordered architecture on right
      const yShift = isB ? 35 : 0;
      return `<g>
        <rect x="280" y="180" width="480" height="540" rx="22" fill="${COVER_TOKENS.bgSoft}" stroke="${COVER_TOKENS.lineStrong}" />
        <rect x="325" y="${235 + yShift}" width="180" height="95" rx="12" fill="${COVER_TOKENS.purple300}" />
        <rect x="490" y="${295 - yShift}" width="210" height="110" rx="12" fill="${COVER_TOKENS.ink}" />
        <rect x="345" y="435" width="220" height="105" rx="12" fill="${COVER_TOKENS.purple700}" />
        <rect x="520" y="545" width="190" height="115" rx="12" fill="${COVER_TOKENS.white}" stroke="${COVER_TOKENS.lineStrong}" />
        <line x1="415" y1="280" x2="595" y2="350" stroke="${COVER_TOKENS.ink}" stroke-width="2" />
        <line x1="595" y1="350" x2="455" y2="485" stroke="${COVER_TOKENS.ink}" stroke-width="2" />

        <!-- Right: Structured Grid -->
        <rect x="840" y="180" width="480" height="540" rx="22" fill="${COVER_TOKENS.ink}" />
        <rect x="885" y="230" width="390" height="110" rx="14" fill="${COVER_TOKENS.white}" />
        <rect x="885" y="370" width="182" height="145" rx="14" fill="${COVER_TOKENS.purple600}" />
        <rect x="1093" y="370" width="182" height="145" rx="14" fill="${COVER_TOKENS.purple400}" />
        <rect x="885" y="545" width="390" height="125" rx="14" fill="${COVER_TOKENS.purple900}" stroke="${COVER_TOKENS.purple400}" />
      </g>`;
    }

    case 'doc-to-table': {
      // Document sheet transforming into structured table rows
      return `<g>
        <rect x="280" y="180" width="1040" height="540" rx="24" fill="${COVER_TOKENS.white}" stroke="${COVER_TOKENS.lineStrong}" />
        <!-- Left Document Card -->
        <rect x="330" y="230" width="340" height="440" rx="18" fill="${COVER_TOKENS.purple900}" />
        <rect x="370" y="280" width="180" height="26" rx="6" fill="${COVER_TOKENS.white}" />
        <rect x="370" y="330" width="260" height="16" rx="4" fill="${COVER_TOKENS.purple300}" />
        <rect x="370" y="365" width="240" height="16" rx="4" fill="${COVER_TOKENS.purple300}" />
        <rect x="370" y="420" width="260" height="120" rx="12" fill="${COVER_TOKENS.ink}" />
        <rect x="370" y="570" width="160" height="48" rx="10" fill="${COVER_TOKENS.purple500}" />
        <!-- Center Extraction Node -->
        <circle cx="745" cy="450" r="44" fill="${COVER_TOKENS.purple600}" stroke="${COVER_TOKENS.white}" stroke-width="4" />
        <!-- Right Structured Table -->
        <rect x="820" y="230" width="450" height="440" rx="18" fill="${COVER_TOKENS.bgSoft}" stroke="${COVER_TOKENS.lineStrong}" />
        <rect x="820" y="230" width="450" height="68" rx="18" fill="${COVER_TOKENS.ink}" />
        <rect x="850" y="325" width="390" height="64" rx="10" fill="${COVER_TOKENS.white}" stroke="${COVER_TOKENS.lineStrong}" />
        <rect x="850" y="410" width="390" height="64" rx="10" fill="${COVER_TOKENS.purple600}" />
        <rect x="850" y="495" width="390" height="64" rx="10" fill="${COVER_TOKENS.white}" stroke="${COVER_TOKENS.lineStrong}" />
        <rect x="850" y="580" width="390" height="64" rx="10" fill="${COVER_TOKENS.ink}" />
      </g>`;
    }

    case 'doc-search': {
      // Document chunks + vector search lens + grounded answer card
      return `<g>
        <rect x="275" y="180" width="1050" height="540" rx="24" fill="${COVER_TOKENS.white}" stroke="${COVER_TOKENS.lineStrong}" />
        <!-- Left Document Chunks -->
        <rect x="320" y="225" width="270" height="125" rx="14" fill="${COVER_TOKENS.bgTint}" stroke="${COVER_TOKENS.lineStrong}" />
        <rect x="320" y="385" width="270" height="125" rx="14" fill="${COVER_TOKENS.ink}" />
        <rect x="320" y="545" width="270" height="125" rx="14" fill="${COVER_TOKENS.purple900}" />
        <!-- Center Vector Retriever Ring -->
        <circle cx="785" cy="445" r="128" fill="${COVER_TOKENS.bgSoft}" stroke="${COVER_TOKENS.purple600}" stroke-width="14" />
        <circle cx="785" cy="445" r="64" fill="${COVER_TOKENS.ink}" />
        <line x1="875" y1="535" x2="945" y2="605" stroke="${COVER_TOKENS.ink}" stroke-width="18" stroke-linecap="round" />
        <!-- Right Cited Answer Card -->
        <rect x="975" y="235" width="305" height="430" rx="18" fill="${COVER_TOKENS.purple600}" />
        <rect x="1008" y="280" width="240" height="90" rx="12" fill="${COVER_TOKENS.white}" />
        <rect x="1008" y="395" width="240" height="120" rx="12" fill="${COVER_TOKENS.ink}" />
        <rect x="1008" y="545" width="180" height="68" rx="12" fill="${COVER_TOKENS.purple200}" />
      </g>`;
    }

    case 'usb-ports': {
      // MCP / Tool-Use standardized connector ports
      const hubY = isB ? 480 : 250;
      const portsY = isB ? 220 : 510;
      return `<g>
        <rect x="280" y="175" width="1040" height="550" rx="24" fill="${COVER_TOKENS.white}" stroke="${COVER_TOKENS.lineStrong}" />
        <!-- Host Bus Bar -->
        <rect x="340" y="${hubY}" width="920" height="150" rx="20" fill="${COVER_TOKENS.ink}" />
        <rect x="385" y="${hubY + 38}" width="260" height="74" rx="12" fill="${COVER_TOKENS.purple600}" />
        <rect x="680" y="${hubY + 38}" width="260" height="74" rx="12" fill="${COVER_TOKENS.white}" />
        <rect x="975" y="${hubY + 38}" width="240" height="74" rx="12" fill="${COVER_TOKENS.purple400}" />
        <!-- 3 Standardized Port Modules -->
        <line x1="515" y1="400" x2="515" y2="510" stroke="${COVER_TOKENS.ink}" stroke-width="6" />
        <line x1="810" y1="400" x2="810" y2="510" stroke="${COVER_TOKENS.purple600}" stroke-width="6" />
        <line x1="1095" y1="400" x2="1095" y2="510" stroke="${COVER_TOKENS.ink}" stroke-width="6" />
        <rect x="360" y="${portsY}" width="280" height="165" rx="16" fill="${COVER_TOKENS.purple900}" />
        <rect x="665" y="${portsY}" width="280" height="165" rx="16" fill="${COVER_TOKENS.bgTint}" stroke="${COVER_TOKENS.lineStrong}" />
        <rect x="970" y="${portsY}" width="280" height="165" rx="16" fill="${COVER_TOKENS.purple600}" />
      </g>`;
    }

    case 'kpi-grid': {
      // Operational dashboard KPI grid
      return `<g>
        <rect x="275" y="175" width="1050" height="550" rx="24" fill="${COVER_TOKENS.ink}" />
        <!-- Top KPI Row -->
        <rect x="315" y="215" width="300" height="160" rx="16" fill="${COVER_TOKENS.white}" />
        <rect x="345" y="245" width="140" height="22" rx="6" fill="${COVER_TOKENS.purple700}" />
        <rect x="345" y="290" width="210" height="52" rx="8" fill="${COVER_TOKENS.ink}" />

        <rect x="650" y="215" width="300" height="160" rx="16" fill="${COVER_TOKENS.purple600}" />
        <rect x="680" y="245" width="140" height="22" rx="6" fill="${COVER_TOKENS.purple200}" />
        <rect x="680" y="290" width="210" height="52" rx="8" fill="${COVER_TOKENS.white}" />

        <rect x="985" y="215" width="300" height="160" rx="16" fill="${COVER_TOKENS.purple900}" stroke="${COVER_TOKENS.purple400}" />
        <rect x="1015" y="245" width="140" height="22" rx="6" fill="${COVER_TOKENS.purple300}" />
        <rect x="1015" y="290" width="210" height="52" rx="8" fill="${COVER_TOKENS.purple400}" />

        <!-- Bottom Chart & Alert Panels -->
        <rect x="315" y="405" width="635" height="280" rx="18" fill="${COVER_TOKENS.bgSoft}" />
        <rect x="355" y="555" width="75" height="95" rx="8" fill="${COVER_TOKENS.purple400}" />
        <rect x="455" y="505" width="75" height="145" rx="8" fill="${COVER_TOKENS.purple600}" />
        <rect x="555" y="460" width="75" height="190" rx="8" fill="${COVER_TOKENS.ink}" />
        <rect x="655" y="520" width="75" height="130" rx="8" fill="${COVER_TOKENS.purple700}" />
        <rect x="755" y="445" width="140" height="205" rx="10" fill="${COVER_TOKENS.purple900}" />

        <rect x="985" y="405" width="300" height="280" rx="18" fill="${COVER_TOKENS.white}" />
        <rect x="1015" y="440" width="240" height="65" rx="10" fill="${COVER_TOKENS.ink}" />
        <rect x="1015" y="525" width="240" height="65" rx="10" fill="${COVER_TOKENS.purple600}" />
        <rect x="1015" y="610" width="170" height="45" rx="8" fill="${COVER_TOKENS.purple300}" />
      </g>`;
    }

    case 'loop-steps': {
      // Agentic AI closed-loop reasoning cycle: Plan -> Act -> Observe
      return `<g>
        <rect x="285" y="175" width="1030" height="550" rx="28" fill="${COVER_TOKENS.white}" stroke="${COVER_TOKENS.lineStrong}" />
        <circle cx="800" cy="450" r="215" fill="none" stroke="${COVER_TOKENS.purple300}" stroke-width="14" stroke-dasharray="24 14" />
        <circle cx="800" cy="450" r="95" fill="${COVER_TOKENS.ink}" />
        <circle cx="800" cy="450" r="36" fill="${COVER_TOKENS.purple500}" />
        <!-- Step 1: Plan (Top) -->
        <rect x="640" y="195" width="320" height="110" rx="18" fill="${COVER_TOKENS.purple900}" />
        <rect x="680" y="230" width="240" height="40" rx="8" fill="${COVER_TOKENS.white}" />
        <!-- Step 2: Act (Bottom Left) -->
        <rect x="330" y="520" width="320" height="145" rx="18" fill="${COVER_TOKENS.ink}" />
        <rect x="365" y="555" width="250" height="34" rx="8" fill="${COVER_TOKENS.purple400}" />
        <rect x="365" y="605" width="180" height="26" rx="6" fill="${COVER_TOKENS.bgTint}" />
        <!-- Step 3: Observe (Bottom Right) -->
        <rect x="950" y="520" width="320" height="145" rx="18" fill="${COVER_TOKENS.purple600}" />
        <rect x="985" y="555" width="250" height="34" rx="8" fill="${COVER_TOKENS.white}" />
        <rect x="985" y="605" width="190" height="26" rx="6" fill="${COVER_TOKENS.ink}" />
      </g>`;
    }

    case 'memory-layers': {
      // Three horizontal architectural memory layers
      return `<g>
        <rect x="290" y="175" width="1020" height="550" rx="24" fill="${COVER_TOKENS.white}" stroke="${COVER_TOKENS.lineStrong}" />
        <!-- Layer 1: Short-term Working Context -->
        <rect x="340" y="215" width="920" height="135" rx="18" fill="${COVER_TOKENS.ink}" />
        <rect x="380" y="255" width="260" height="55" rx="10" fill="${COVER_TOKENS.purple400}" />
        <rect x="675" y="255" width="540" height="55" rx="10" fill="${COVER_TOKENS.white}" />
        <!-- Layer 2: Long-term Vector Index -->
        <rect x="390" y="382" width="820" height="135" rx="18" fill="${COVER_TOKENS.purple600}" />
        <rect x="430" y="422" width="230" height="55" rx="10" fill="${COVER_TOKENS.ink}" />
        <rect x="690" y="422" width="480" height="55" rx="10" fill="${COVER_TOKENS.purple200}" />
        <!-- Layer 3: Episodic Audit & Retention Store -->
        <rect x="440" y="550" width="720" height="135" rx="18" fill="${COVER_TOKENS.purple900}" />
        <rect x="480" y="590" width="310" height="55" rx="10" fill="${COVER_TOKENS.white}" />
        <rect x="820" y="590" width="300" height="55" rx="10" fill="${COVER_TOKENS.purple500}" />
      </g>`;
    }

    case 'shield-gate': {
      // Prompt injection filter shield gate between untrusted input and protected DB
      return `<g>
        <rect x="275" y="180" width="1050" height="540" rx="24" fill="${COVER_TOKENS.white}" stroke="${COVER_TOKENS.lineStrong}" />
        <!-- Left Untrusted Input Stream -->
        <rect x="320" y="250" width="280" height="400" rx="18" fill="${COVER_TOKENS.bgTint}" stroke="${COVER_TOKENS.lineStrong}" />
        <rect x="355" y="295" width="210" height="65" rx="10" fill="${COVER_TOKENS.ink}" />
        <rect x="355" y="390" width="210" height="65" rx="10" fill="${COVER_TOKENS.purple700}" />
        <rect x="355" y="485" width="210" height="115" rx="10" fill="${COVER_TOKENS.white}" stroke="${COVER_TOKENS.lineStrong}" />
        <!-- Center Shield Gate -->
        <path d="M 800 215 L 955 275 L 955 465 C 955 575 800 665 800 665 C 800 665 645 575 645 465 L 645 275 Z" fill="${COVER_TOKENS.ink}" stroke="${COVER_TOKENS.purple500}" stroke-width="6" />
        <circle cx="800" cy="435" r="56" fill="${COVER_TOKENS.purple600}" />
        <rect x="782" y="410" width="36" height="50" rx="8" fill="${COVER_TOKENS.white}" />
        <!-- Right Protected Core -->
        <rect x="1000" y="250" width="280" height="400" rx="18" fill="${COVER_TOKENS.purple900}" />
        <rect x="1035" y="300" width="210" height="130" rx="12" fill="${COVER_TOKENS.white}" />
        <rect x="1035" y="465" width="210" height="130" rx="12" fill="${COVER_TOKENS.purple500}" />
      </g>`;
    }

    case 'eval-matrix': {
      // Evaluation matrix grid with pass/fail cells and score bars
      return `<g>
        <rect x="280" y="175" width="1040" height="550" rx="24" fill="${COVER_TOKENS.ink}" />
        <rect x="325" y="220" width="950" height="72" rx="14" fill="${COVER_TOKENS.purple900}" />
        <!-- 3x3 Evaluation Cells -->
        <rect x="325" y="320" width="295" height="165" rx="14" fill="${COVER_TOKENS.white}" />
        <rect x="652" y="320" width="295" height="165" rx="14" fill="${COVER_TOKENS.purple600}" />
        <rect x="980" y="320" width="295" height="165" rx="14" fill="${COVER_TOKENS.bgTint}" />

        <rect x="325" y="510" width="295" height="170" rx="14" fill="${COVER_TOKENS.purple400}" />
        <rect x="652" y="510" width="295" height="170" rx="14" fill="${COVER_TOKENS.white}" />
        <rect x="980" y="510" width="295" height="170" rx="14" fill="${COVER_TOKENS.purple700}" />

        <circle cx="472" cy="402" r="34" fill="${COVER_TOKENS.ink}" />
        <circle cx="800" cy="402" r="34" fill="${COVER_TOKENS.white}" />
        <circle cx="1127" cy="402" r="34" fill="${COVER_TOKENS.purple700}" />
      </g>`;
    }

    case 'handoff-bridge': {
      // AI triage node handing context summary over a bridge to human operator console
      return `<g>
        <rect x="275" y="180" width="1050" height="540" rx="24" fill="${COVER_TOKENS.white}" stroke="${COVER_TOKENS.lineStrong}" />
        <!-- Left AI Triage Unit -->
        <rect x="315" y="240" width="310" height="420" rx="20" fill="${COVER_TOKENS.ink}" />
        <circle cx="470" cy="365" r="68" fill="${COVER_TOKENS.purple600}" />
        <rect x="355" y="475" width="230" height="130" rx="12" fill="${COVER_TOKENS.purple900}" />
        <!-- Center Context Handoff Bridge -->
        <rect x="655" y="370" width="290" height="160" rx="18" fill="${COVER_TOKENS.purple600}" />
        <rect x="685" y="405" width="230" height="36" rx="8" fill="${COVER_TOKENS.white}" />
        <rect x="685" y="458" width="170" height="36" rx="8" fill="${COVER_TOKENS.ink}" />
        <!-- Right Human Operator Console -->
        <rect x="975" y="240" width="310" height="420" rx="20" fill="${COVER_TOKENS.bgSoft}" stroke="${COVER_TOKENS.lineStrong}" />
        <rect x="1010" y="285" width="240" height="140" rx="14" fill="${COVER_TOKENS.purple900}" />
        <rect x="1010" y="455" width="240" height="160" rx="14" fill="${COVER_TOKENS.white}" stroke="${COVER_TOKENS.lineStrong}" />
      </g>`;
    }

    case 'consent-flow': {
      // UU PDP Consent Checkpoint -> Data Minimization -> Encrypted Vault
      return `<g>
        <rect x="280" y="180" width="1040" height="540" rx="24" fill="${COVER_TOKENS.bgSoft}" stroke="${COVER_TOKENS.lineStrong}" />
        <!-- Stage 1: Consent Card -->
        <rect x="320" y="240" width="290" height="420" rx="18" fill="${COVER_TOKENS.white}" stroke="${COVER_TOKENS.lineStrong}" />
        <rect x="355" y="285" width="220" height="90" rx="12" fill="${COVER_TOKENS.ink}" />
        <circle cx="465" cy="485" r="54" fill="${COVER_TOKENS.purple600}" />
        <path d="M 445 485 L 460 500 L 490 468" fill="none" stroke="${COVER_TOKENS.white}" stroke-width="6" stroke-linecap="round" />
        <!-- Stage 2: Redaction / Minimization Filter -->
        <rect x="655" y="240" width="290" height="420" rx="18" fill="${COVER_TOKENS.purple900}" />
        <rect x="690" y="300" width="220" height="42" rx="8" fill="${COVER_TOKENS.white}" />
        <rect x="690" y="370" width="220" height="42" rx="8" fill="${COVER_TOKENS.purple500}" />
        <rect x="690" y="440" width="220" height="160" rx="12" fill="${COVER_TOKENS.ink}" />
        <!-- Stage 3: Retention Vault -->
        <rect x="990" y="240" width="290" height="420" rx="18" fill="${COVER_TOKENS.ink}" />
        <circle cx="1135" cy="410" r="82" fill="${COVER_TOKENS.purple400}" />
        <circle cx="1135" cy="410" r="34" fill="${COVER_TOKENS.ink}" />
        <rect x="1030" y="535" width="210" height="75" rx="12" fill="${COVER_TOKENS.white}" />
      </g>`;
    }

    case 'webhook-pipe': {
      // Event Payload -> Router Pipe -> Destination Endpoints
      const invert = isB;
      return `<g>
        <rect x="275" y="180" width="1050" height="540" rx="24" fill="${
          invert ? COVER_TOKENS.ink : COVER_TOKENS.white
        }" stroke="${COVER_TOKENS.lineStrong}" />
        <!-- Left Source Event Box -->
        <rect x="325" y="290" width="260" height="320" rx="18" fill="${
          invert ? COVER_TOKENS.white : COVER_TOKENS.ink
        }" />
        <rect x="360" y="340" width="190" height="55" rx="10" fill="${COVER_TOKENS.purple600}" />
        <rect x="360" y="425" width="190" height="135" rx="10" fill="${COVER_TOKENS.purple300}" />
        <!-- Center Pipe & Router Hub -->
        <rect x="585" y="415" width="430" height="70" fill="${COVER_TOKENS.purple600}" />
        <circle cx="800" cy="450" r="88" fill="${COVER_TOKENS.purple900}" stroke="${COVER_TOKENS.white}" stroke-width="5" />
        <circle cx="800" cy="450" r="34" fill="${COVER_TOKENS.purple300}" />
        <!-- Right Target Nodes -->
        <rect x="1015" y="225" width="260" height="190" rx="18" fill="${COVER_TOKENS.purple700}" />
        <rect x="1015" y="485" width="260" height="190" rx="18" fill="${
          invert ? COVER_TOKENS.bgTint : COVER_TOKENS.ink
        }" />
      </g>`;
    }

    case 'sheet-to-app': {
      // Spreadsheet grid on left -> AI property/unit app cards on right
      return `<g>
        <rect x="280" y="180" width="1040" height="540" rx="24" fill="${COVER_TOKENS.white}" stroke="${COVER_TOKENS.lineStrong}" />
        <!-- Left Spreadsheet Matrix -->
        <rect x="320" y="230" width="430" height="440" rx="16" fill="${COVER_TOKENS.bgSoft}" stroke="${COVER_TOKENS.lineStrong}" />
        <rect x="320" y="230" width="430" height="64" rx="16" fill="${COVER_TOKENS.purple900}" />
        <rect x="350" y="320" width="175" height="68" rx="8" fill="${COVER_TOKENS.ink}" />
        <rect x="545" y="320" width="175" height="68" rx="8" fill="${COVER_TOKENS.white}" stroke="${COVER_TOKENS.lineStrong}" />
        <rect x="350" y="410" width="175" height="68" rx="8" fill="${COVER_TOKENS.purple600}" />
        <rect x="545" y="410" width="175" height="68" rx="8" fill="${COVER_TOKENS.ink}" />
        <rect x="350" y="500" width="370" height="130" rx="12" fill="${COVER_TOKENS.purple300}" />
        <!-- Right Property Unit Cards -->
        <rect x="810" y="230" width="470" height="205" rx="18" fill="${COVER_TOKENS.ink}" />
        <rect x="845" y="268" width="160" height="130" rx="12" fill="${COVER_TOKENS.purple500}" />
        <rect x="1030" y="268" width="215" height="52" rx="8" fill="${COVER_TOKENS.white}" />
        <rect x="1030" y="340" width="160" height="58" rx="8" fill="${COVER_TOKENS.purple300}" />

        <rect x="810" y="465" width="470" height="205" rx="18" fill="${COVER_TOKENS.purple600}" />
        <rect x="845" y="503" width="160" height="130" rx="12" fill="${COVER_TOKENS.white}" />
        <rect x="1030" y="503" width="215" height="52" rx="8" fill="${COVER_TOKENS.ink}" />
        <rect x="1030" y="575" width="180" height="58" rx="8" fill="${COVER_TOKENS.purple900}" />
      </g>`;
    }

    case 'map-card': {
      // Local Business Profile Card & Verification Pin Schematic
      return `<g>
        <rect x="290" y="180" width="1020" height="540" rx="24" fill="${COVER_TOKENS.white}" stroke="${COVER_TOKENS.lineStrong}" />
        <rect x="335" y="225" width="440" height="450" rx="18" fill="${COVER_TOKENS.ink}" />
        <circle cx="555" cy="390" r="85" fill="${COVER_TOKENS.purple600}" />
        <circle cx="555" cy="390" r="32" fill="${COVER_TOKENS.white}" />
        <rect x="415" y="520" width="280" height="105" rx="12" fill="${COVER_TOKENS.purple900}" />
        <rect x="815" y="225" width="450" height="450" rx="18" fill="${COVER_TOKENS.bgTint}" />
        <rect x="855" y="270" width="370" height="90" rx="12" fill="${COVER_TOKENS.white}" />
        <rect x="855" y="390" width="370" height="110" rx="12" fill="${COVER_TOKENS.purple700}" />
        <rect x="855" y="530" width="260" height="95" rx="12" fill="${COVER_TOKENS.ink}" />
      </g>`;
    }

    case 'schema-tree': {
      // Root @graph node branching to Organization, LocalBusiness, Service, FAQPage
      return `<g>
        <rect x="280" y="175" width="1040" height="550" rx="24" fill="${COVER_TOKENS.ink}" />
        <!-- Root @graph Node -->
        <rect x="630" y="220" width="340" height="110" rx="18" fill="${COVER_TOKENS.white}" />
        <rect x="675" y="255" width="250" height="40" rx="8" fill="${COVER_TOKENS.purple700}" />
        <!-- Branch Lines -->
        <line x1="800" y1="330" x2="450" y2="480" stroke="${COVER_TOKENS.purple300}" stroke-width="4" />
        <line x1="800" y1="330" x2="800" y2="480" stroke="${COVER_TOKENS.purple300}" stroke-width="4" />
        <line x1="800" y1="330" x2="1150" y2="480" stroke="${COVER_TOKENS.purple300}" stroke-width="4" />
        <!-- Child Schema Nodes -->
        <rect x="330" y="480" width="260" height="190" rx="18" fill="${COVER_TOKENS.purple600}" />
        <rect x="365" y="520" width="190" height="45" rx="8" fill="${COVER_TOKENS.white}" />
        <rect x="365" y="585" width="150" height="45" rx="8" fill="${COVER_TOKENS.ink}" />

        <rect x="670" y="480" width="260" height="190" rx="18" fill="${COVER_TOKENS.purple300}" />
        <rect x="705" y="520" width="190" height="45" rx="8" fill="${COVER_TOKENS.ink}" />
        <rect x="705" y="585" width="150" height="45" rx="8" fill="${COVER_TOKENS.white}" />

        <rect x="1010" y="480" width="260" height="190" rx="18" fill="${COVER_TOKENS.white}" />
        <rect x="1045" y="520" width="190" height="45" rx="8" fill="${COVER_TOKENS.ink}" />
        <rect x="1045" y="585" width="150" height="45" rx="8" fill="${COVER_TOKENS.purple600}" />
      </g>`;
    }

    case 'answer-box': {
      // GEO / AEO Answer Extraction Capsule + Source Citations
      return `<g>
        <rect x="285" y="175" width="1030" height="550" rx="24" fill="${COVER_TOKENS.white}" stroke="${COVER_TOKENS.lineStrong}" />
        <!-- Top AI Answer Summary Box -->
        <rect x="335" y="220" width="930" height="250" rx="20" fill="${COVER_TOKENS.ink}" />
        <rect x="380" y="260" width="240" height="36" rx="8" fill="${COVER_TOKENS.purple500}" />
        <rect x="380" y="320" width="820" height="32" rx="6" fill="${COVER_TOKENS.white}" />
        <rect x="380" y="372" width="680" height="32" rx="6" fill="${COVER_TOKENS.purple300}" />
        <!-- Bottom 3 Citation Source Cards -->
        <rect x="335" y="505" width="290" height="175" rx="16" fill="${COVER_TOKENS.purple600}" />
        <rect x="370" y="545" width="220" height="40" rx="8" fill="${COVER_TOKENS.white}" />

        <rect x="655" y="505" width="290" height="175" rx="16" fill="${COVER_TOKENS.bgTint}" stroke="${COVER_TOKENS.lineStrong}" />
        <rect x="690" y="545" width="220" height="40" rx="8" fill="${COVER_TOKENS.ink}" />

        <rect x="975" y="505" width="290" height="175" rx="16" fill="${COVER_TOKENS.purple900}" />
        <rect x="1010" y="545" width="220" height="40" rx="8" fill="${COVER_TOKENS.purple300}" />
      </g>`;
    }

    case 'form-to-wa': {
      // Conversation state machine / lead capture flowing into WhatsApp routing branches
      return `<g>
        <rect x="280" y="180" width="1040" height="540" rx="24" fill="${COVER_TOKENS.bgSoft}" stroke="${COVER_TOKENS.lineStrong}" />
        <!-- Left Entry Card -->
        <rect x="325" y="250" width="290" height="400" rx="18" fill="${COVER_TOKENS.ink}" />
        <rect x="360" y="300" width="220" height="56" rx="10" fill="${COVER_TOKENS.white}" />
        <rect x="360" y="385" width="220" height="110" rx="10" fill="${COVER_TOKENS.purple600}" />
        <rect x="360" y="525" width="160" height="75" rx="10" fill="${COVER_TOKENS.purple300}" />
        <!-- Center Decision Diamond / Hub -->
        <polygon points="800,310 920,450 800,590 680,450" fill="${COVER_TOKENS.purple600}" stroke="${COVER_TOKENS.ink}" stroke-width="4" />
        <circle cx="800" cy="450" r="30" fill="${COVER_TOKENS.white}" />
        <!-- Right Branch Cards -->
        <rect x="980" y="225" width="290" height="195" rx="18" fill="${COVER_TOKENS.white}" stroke="${COVER_TOKENS.lineStrong}" />
        <rect x="1015" y="275" width="220" height="95" rx="12" fill="${COVER_TOKENS.purple900}" />
        <rect x="980" y="480" width="290" height="195" rx="18" fill="${COVER_TOKENS.ink}" />
        <rect x="1015" y="530" width="220" height="95" rx="12" fill="${COVER_TOKENS.purple400}" />
      </g>`;
    }

    case 'https-lock': {
      // HTTPS Lock Vault + 12 Security Controls
      return `<g>
        <rect x="285" y="175" width="1030" height="550" rx="24" fill="${COVER_TOKENS.ink}" />
        <!-- Shackle & Lock Core -->
        <path d="M 710 350 L 710 275 A 90 90 0 0 1 890 275 L 890 350" fill="none" stroke="${COVER_TOKENS.white}" stroke-width="26" stroke-linecap="round" />
        <rect x="640" y="350" width="320" height="290" rx="28" fill="${COVER_TOKENS.purple600}" stroke="${COVER_TOKENS.white}" stroke-width="4" />
        <circle cx="800" cy="475" r="36" fill="${COVER_TOKENS.ink}" />
        <rect x="784" y="495" width="32" height="68" rx="8" fill="${COVER_TOKENS.white}" />
        <!-- Left & Right Security Check Pillars -->
        <rect x="335" y="245" width="240" height="120" rx="14" fill="${COVER_TOKENS.white}" />
        <rect x="335" y="395" width="240" height="120" rx="14" fill="${COVER_TOKENS.purple400}" />
        <rect x="335" y="545" width="240" height="115" rx="14" fill="${COVER_TOKENS.purple900}" stroke="${COVER_TOKENS.purple400}" />

        <rect x="1025" y="245" width="240" height="120" rx="14" fill="${COVER_TOKENS.purple300}" />
        <rect x="1025" y="395" width="240" height="120" rx="14" fill="${COVER_TOKENS.white}" />
        <rect x="1025" y="545" width="240" height="115" rx="14" fill="${COVER_TOKENS.purple700}" />
      </g>`;
    }

    case 'vendor-matrix':
    default: {
      // Automation / Vendor Decision Matrix (4 quadrant comparison)
      return `<g>
        <rect x="285" y="175" width="1030" height="550" rx="24" fill="${COVER_TOKENS.white}" stroke="${COVER_TOKENS.lineStrong}" />
        <rect x="330" y="220" width="445" height="215" rx="18" fill="${COVER_TOKENS.ink}" />
        <rect x="370" y="265" width="240" height="42" rx="8" fill="${COVER_TOKENS.purple400}" />
        <rect x="370" y="330" width="340" height="60" rx="10" fill="${COVER_TOKENS.white}" />

        <rect x="825" y="220" width="445" height="215" rx="18" fill="${COVER_TOKENS.purple600}" />
        <rect x="865" y="265" width="240" height="42" rx="8" fill="${COVER_TOKENS.white}" />
        <rect x="865" y="330" width="340" height="60" rx="10" fill="${COVER_TOKENS.ink}" />

        <rect x="330" y="465" width="445" height="215" rx="18" fill="${COVER_TOKENS.bgTint}" stroke="${COVER_TOKENS.lineStrong}" />
        <rect x="370" y="510" width="240" height="42" rx="8" fill="${COVER_TOKENS.purple700}" />
        <rect x="370" y="575" width="340" height="60" rx="10" fill="${COVER_TOKENS.ink}" />

        <rect x="825" y="465" width="445" height="215" rx="18" fill="${COVER_TOKENS.purple900}" />
        <rect x="865" y="510" width="240" height="42" rx="8" fill="${COVER_TOKENS.purple300}" />
        <rect x="865" y="575" width="340" height="60" rx="10" fill="${COVER_TOKENS.white}" />
      </g>`;
    }
  }
}

/**
 * Generates a static 1600×900 (16:9) SVG string for a blog post cover.
 * Deterministic, < 25 KB, zero external URLs, locked tokens only.
 */
export function buildCover(spec: CoverSpec): string {
  const { seed, labels } = spec;
  const glowPos = GLOW_POSITIONS[seed % GLOW_POSITIONS.length];
  const mirror = ((seed >>> 8) & 1) === 1;
  // Rotation within -5 to +5 degrees (strictly within 6 degrees)
  const degOptions = [-5, -3, -2, 2, 3, 5];
  const rotDeg = degOptions[(seed >>> 12) % degOptions.length];

  const supportingSvg = renderSupportingNodesAndPlates(spec);
  const heroSvg = renderHeroScene(spec);

  const transformParts: string[] = [];
  if (mirror) {
    transformParts.push('translate(1600, 0) scale(-1, 1)');
  }
  transformParts.push(`rotate(${rotDeg} 800 450)`);
  const heroTransform = transformParts.join(' ');

  const validLabels = labels.filter((l): l is string => Boolean(l)).slice(0, 3);
  const labelPositions = [
    { x: 380 + (seed % 90), y: 125 },
    { x: 800, y: 815 },
    { x: 1220 - (seed % 90), y: 125 },
  ];

  const labelsSvg = validLabels
    .map((lbl, idx) =>
      renderLabelPill(
        labelPositions[idx].x,
        labelPositions[idx].y,
        lbl,
        idx === seed % validLabels.length
      )
    )
    .join('\n');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" width="1600" height="900" fill="none" role="img" aria-label="${escapeXml(
    spec.alt
  )}">
  <defs>
    <pattern id="grid64" width="64" height="64" patternUnits="userSpaceOnUse">
      <path d="M 64 0 L 0 0 0 64" fill="none" stroke="${COVER_TOKENS.ink}" stroke-width="1" stroke-opacity="0.04" />
    </pattern>
    <radialGradient id="purpleGlow" cx="${glowPos.cx}" cy="${glowPos.cy}" r="620" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${COVER_TOKENS.purple300}" stop-opacity="0.42" />
      <stop offset="55%" stop-color="${COVER_TOKENS.bgTint}" stop-opacity="0.18" />
      <stop offset="100%" stop-color="${COVER_TOKENS.bgSoft}" stop-opacity="0" />
    </radialGradient>
  </defs>
  <rect width="1600" height="900" fill="${COVER_TOKENS.bgSoft}" />
  <rect width="1600" height="900" fill="url(#purpleGlow)" />
  <rect width="1600" height="900" fill="url(#grid64)" />
  ${supportingSvg}
  <g transform="${heroTransform}">
    ${heroSvg}
  </g>
  ${labelsSvg}
</svg>`;
}

function wrapTitleLines(title: string, maxCharsPerLine = 28, maxLines = 2): string[] {
  const words = (title || '').trim().split(/\s+/);
  const lines: string[] = [];
  let current = '';

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length <= maxCharsPerLine) {
      current = candidate;
    } else {
      if (lines.length < maxLines - 1) {
        if (current) lines.push(current);
        current = word;
      } else {
        const remaining = `${current} ${word}`.trim();
        current =
          remaining.length > maxCharsPerLine
            ? `${remaining.slice(0, maxCharsPerLine - 1).trim()}…`
            : remaining;
        break;
      }
    }
  }
  if (current && lines.length < maxLines) {
    lines.push(current);
  }
  return lines.slice(0, maxLines);
}

/**
 * Generates a static 1200×630 OpenGraph SVG card for a blog post and locale.
 * Includes category pill, 2-line clamped title, miniature hero diagram, and brand mark.
 */
export function buildOgCardSvg(options: {
  title: string;
  category: string;
  locale: 'id' | 'en';
  spec: CoverSpec;
}): string {
  const { title, category, locale, spec } = options;
  const titleLines = wrapTitleLines(title, 27, 2);
  const heroSvg = renderHeroScene(spec);
  const altText = locale === 'en' ? spec.altEn : spec.alt;
  const catText = escapeXml((category || 'BLOG').toUpperCase());
  const catWidth = Math.max(120, catText.length * 8.5 + 32);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630" fill="none" role="img" aria-label="${escapeXml(
    altText
  )}">
  <defs>
    <pattern id="ogGrid64" width="64" height="64" patternUnits="userSpaceOnUse">
      <path d="M 64 0 L 0 0 0 64" fill="none" stroke="${COVER_TOKENS.ink}" stroke-width="1" stroke-opacity="0.04" />
    </pattern>
    <radialGradient id="ogGlow" cx="920" cy="315" r="460" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${COVER_TOKENS.purple300}" stop-opacity="0.38" />
      <stop offset="100%" stop-color="${COVER_TOKENS.bgSoft}" stop-opacity="0" />
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="${COVER_TOKENS.bgSoft}" />
  <rect width="1200" height="630" fill="url(#ogGlow)" />
  <rect width="1200" height="630" fill="url(#ogGrid64)" />
  <rect x="24" y="24" width="1152" height="582" rx="28" fill="${COVER_TOKENS.white}" fill-opacity="0.65" stroke="${COVER_TOKENS.lineStrong}" stroke-width="1" />

  <!-- Left Editorial Column -->
  <g transform="translate(64, 76)">
    <rect width="${Math.round(catWidth)}" height="34" rx="17" fill="${COVER_TOKENS.bgTint}" stroke="${COVER_TOKENS.lineStrong}" stroke-width="1" />
    <text x="${Math.round(catWidth / 2)}" y="22" text-anchor="middle" font-family="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace" font-size="12" font-weight="600" letter-spacing="0.08em" fill="${COVER_TOKENS.purple600}">${catText}</text>

    <text x="0" y="112" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="38" font-weight="700" fill="${COVER_TOKENS.ink}">
      ${titleLines
        .map(
          (line, idx) =>
            `<tspan x="0" dy="${idx === 0 ? 0 : 48}">${escapeXml(line)}</tspan>`
        )
        .join('')}
    </text>

    <!-- Labels Row -->
    <g transform="translate(0, 250)">
      ${spec.labels
        .filter((l): l is string => Boolean(l))
        .slice(0, 3)
        .map((lbl, idx) => {
          const clean = escapeXml(lbl.toUpperCase());
          const xOff = idx * 132;
          return `<g transform="translate(${xOff}, 0)">
            <rect width="120" height="28" rx="6" fill="${
              idx === 0 ? COVER_TOKENS.ink : COVER_TOKENS.bgSoft
            }" stroke="${COVER_TOKENS.lineStrong}" stroke-width="1" />
            <text x="60" y="18" text-anchor="middle" font-family="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace" font-size="11" font-weight="600" fill="${
              idx === 0 ? COVER_TOKENS.white : COVER_TOKENS.ink
            }">${clean}</text>
          </g>`;
        })
        .join('')}
    </g>

    <!-- Brand Footer -->
    <g transform="translate(0, 425)">
      <rect width="38" height="38" rx="10" fill="${COVER_TOKENS.purple600}" />
      <text x="19" y="25" text-anchor="middle" font-family="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace" font-size="14" font-weight="700" fill="${COVER_TOKENS.white}">C</text>
      <text x="52" y="18" font-family="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace" font-size="13" font-weight="700" letter-spacing="0.08em" fill="${COVER_TOKENS.ink}">CHESTAADOTCOM</text>
      <text x="52" y="34" font-family="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace" font-size="11" fill="${COVER_TOKENS.inkMuted}">chestaa.com · ${
        locale === 'en' ? 'BSD &amp; South Tangerang' : 'BSD &amp; Tangerang Selatan'
      }</text>
    </g>
  </g>

  <!-- Right Miniature Hero Scene -->
  <g transform="translate(650, 95) scale(0.45)">
    ${heroSvg}
  </g>
</svg>`;
}
