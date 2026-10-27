import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { BLOG_POSTS, ENGLISH_BLOG_POSTS } from '../src/data/blog-posts';
import { ALL_CANONICAL_COVER_SPECS } from '../src/data/blog-cover-specs';
import { generateAllCoversAndOgCards } from './generate-covers';

const CANVAS_W = 1600;
const CANVAS_H = 900;
const RASTER_W = 64;
const RASTER_H = 36;

interface Matrix2D {
  // [a, c, e, b, d, f] representing:
  // x' = a*x + c*y + e
  // y' = b*x + d*y + f
  a: number;
  b: number;
  c: number;
  d: number;
  e: number;
  f: number;
}

const IDENTITY_MATRIX: Matrix2D = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 };

function multiplyMatrix(m1: Matrix2D, m2: Matrix2D): Matrix2D {
  return {
    a: m1.a * m2.a + m1.c * m2.b,
    b: m1.b * m2.a + m1.d * m2.b,
    c: m1.a * m2.c + m1.c * m2.d,
    d: m1.b * m2.c + m1.d * m2.d,
    e: m1.a * m2.e + m1.c * m2.f + m1.e,
    f: m1.b * m2.e + m1.d * m2.f + m1.f,
  };
}

function invertMatrix(m: Matrix2D): Matrix2D {
  const det = m.a * m.d - m.b * m.c;
  if (Math.abs(det) < 1e-8) return IDENTITY_MATRIX;
  const invDet = 1 / det;
  return {
    a: m.d * invDet,
    b: -m.b * invDet,
    c: -m.c * invDet,
    d: m.a * invDet,
    e: (m.c * m.f - m.d * m.e) * invDet,
    f: (m.b * m.e - m.a * m.f) * invDet,
  };
}

function applyMatrix(m: Matrix2D, x: number, y: number): { x: number; y: number } {
  return {
    x: m.a * x + m.c * y + m.e,
    y: m.b * x + m.d * y + m.f,
  };
}

function parseTransformAttr(transformStr: string): Matrix2D {
  let mat = IDENTITY_MATRIX;
  if (!transformStr) return mat;

  const regex = /(translate|scale|rotate)\(\s*([^)]+)\s*\)/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(transformStr)) !== null) {
    const fn = match[1];
    const nums = match[2]
      .trim()
      .split(/[\s,]+/)
      .map((n) => parseFloat(n));

    if (fn === 'translate') {
      const tx = nums[0] || 0;
      const ty = nums[1] || 0;
      mat = multiplyMatrix(mat, { a: 1, b: 0, c: 0, d: 1, e: tx, f: ty });
    } else if (fn === 'scale') {
      const sx = nums[0] ?? 1;
      const sy = nums[1] ?? sx;
      mat = multiplyMatrix(mat, { a: sx, b: 0, c: 0, d: sy, e: 0, f: 0 });
    } else if (fn === 'rotate') {
      const deg = nums[0] || 0;
      const cx = nums[1] || 0;
      const cy = nums[2] || 0;
      const rad = (deg * Math.PI) / 180;
      const cos = Math.cos(rad);
      const sin = Math.sin(rad);
      if (cx !== 0 || cy !== 0) {
        mat = multiplyMatrix(mat, { a: 1, b: 0, c: 0, d: 1, e: cx, f: cy });
        mat = multiplyMatrix(mat, { a: cos, b: sin, c: -sin, d: cos, e: 0, f: 0 });
        mat = multiplyMatrix(mat, { a: 1, b: 0, c: 0, d: 1, e: -cx, f: -cy });
      } else {
        mat = multiplyMatrix(mat, { a: cos, b: sin, c: -sin, d: cos, e: 0, f: 0 });
      }
    }
  }
  return mat;
}

function hexToLuma(hex: string): number | null {
  if (!hex || hex === 'none' || hex.startsWith('url(')) return null;
  const clean = hex.trim().replace(/^#/, '');
  if (clean.length !== 6) return null;
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b)) return null;
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

function parseAttrs(tagContent: string): Record<string, string> {
  const attrs: Record<string, string> = {};
  const regex = /([a-zA-Z0-9_-]+)\s*=\s*"([^"]*)"/g;
  let m: RegExpExecArray | null;
  while ((m = regex.exec(tagContent)) !== null) {
    attrs[m[1]] = m[2];
  }
  return attrs;
}

/**
 * Pure TypeScript 64×36 grayscale software rasterizer for cover SVGs.
 * Evaluates backgrounds, radial glow, structural rects, circles, polygons, and lines
 * with group transforms to produce a deterministic 64×36 grayscale buffer.
 */
export function rasterizeCoverSvgTo64x36(svgContent: string): Float64Array {
  const buffer = new Float64Array(RASTER_W * RASTER_H);
  // Base background (#F8F6FE -> luma ~248)
  const baseLuma = hexToLuma('#F8F6FE') ?? 248;
  buffer.fill(baseLuma);

  // Extract radialGradient glow center if present
  const glowMatch = svgContent.match(
    /<radialGradient[^>]+id="purpleGlow"[^>]+cx="(\d+)"[^>]+cy="(\d+)"[^>]+r="(\d+)"/
  );
  if (glowMatch) {
    const gCx = parseFloat(glowMatch[1]);
    const gCy = parseFloat(glowMatch[2]);
    const gR = parseFloat(glowMatch[3]);
    const glowLuma = hexToLuma('#B9A2F2') ?? 182;

    for (let py = 0; py < RASTER_H; py++) {
      const sy = ((py + 0.5) / RASTER_H) * CANVAS_H;
      for (let px = 0; px < RASTER_W; px++) {
        const sx = ((px + 0.5) / RASTER_W) * CANVAS_W;
        const dist = Math.hypot(sx - gCx, sy - gCy);
        if (dist < gR) {
          const alpha = (1 - dist / gR) * 0.42;
          const idx = py * RASTER_W + px;
          buffer[idx] = buffer[idx] * (1 - alpha) + glowLuma * alpha;
        }
      }
    }
  }

  // Strip <defs>...</defs> before scanning drawable primitives
  const body = svgContent.replace(/<defs>[\s\S]*?<\/defs>/g, '');

  const transformStack: Matrix2D[] = [IDENTITY_MATRIX];
  const tokenRegex = /<\/?([a-zA-Z0-9]+)\b([^>]*?)(\/?)>/g;
  let match: RegExpExecArray | null;

  while ((match = tokenRegex.exec(body)) !== null) {
    const fullTag = match[0];
    const tagName = match[1].toLowerCase();
    const attrStr = match[2];
    const isSelfClosing = match[3] === '/' || fullTag.endsWith('/>');
    const isClosing = fullTag.startsWith('</');

    if (isClosing) {
      if (tagName === 'g' && transformStack.length > 1) {
        transformStack.pop();
      }
      continue;
    }

    const attrs = parseAttrs(attrStr);
    const currentMat = transformStack[transformStack.length - 1];
    const localMat = attrs.transform
      ? multiplyMatrix(currentMat, parseTransformAttr(attrs.transform))
      : currentMat;

    if (tagName === 'g') {
      if (!isSelfClosing) {
        transformStack.push(localMat);
      }
      continue;
    }

    const invMat = invertMatrix(localMat);
    const fillLuma = hexToLuma(attrs.fill || '');
    const strokeLuma = hexToLuma(attrs.stroke || '');
    const fillOpacity = attrs['fill-opacity'] ? parseFloat(attrs['fill-opacity']) : 1;

    if (tagName === 'rect') {
      const rx = parseFloat(attrs.x || '0');
      const ry = parseFloat(attrs.y || '0');
      const rw = parseFloat(attrs.width || '0');
      const rh = parseFloat(attrs.height || '0');
      // Skip full-canvas background rects already handled
      if (rw >= 1590 && rh >= 890) continue;
      if (rw <= 0 || rh <= 0 || fillLuma === null) continue;

      for (let py = 0; py < RASTER_H; py++) {
        const sy = ((py + 0.5) / RASTER_H) * CANVAS_H;
        for (let px = 0; px < RASTER_W; px++) {
          const sx = ((px + 0.5) / RASTER_W) * CANVAS_W;
          const local = applyMatrix(invMat, sx, sy);
          if (
            local.x >= rx &&
            local.x <= rx + rw &&
            local.y >= ry &&
            local.y <= ry + rh
          ) {
            const idx = py * RASTER_W + px;
            buffer[idx] = buffer[idx] * (1 - fillOpacity) + fillLuma * fillOpacity;
          }
        }
      }
    } else if (tagName === 'circle') {
      const cx = parseFloat(attrs.cx || '0');
      const cy = parseFloat(attrs.cy || '0');
      const r = parseFloat(attrs.r || '0');
      const strokeW = parseFloat(attrs['stroke-width'] || '0');
      if (r <= 0) continue;

      for (let py = 0; py < RASTER_H; py++) {
        const sy = ((py + 0.5) / RASTER_H) * CANVAS_H;
        for (let px = 0; px < RASTER_W; px++) {
          const sx = ((px + 0.5) / RASTER_W) * CANVAS_W;
          const local = applyMatrix(invMat, sx, sy);
          const dist = Math.hypot(local.x - cx, local.y - cy);
          const idx = py * RASTER_W + px;
          if (fillLuma !== null && dist <= r) {
            buffer[idx] = buffer[idx] * (1 - fillOpacity) + fillLuma * fillOpacity;
          } else if (
            strokeLuma !== null &&
            strokeW > 0 &&
            Math.abs(dist - r) <= Math.max(strokeW / 2, 12)
          ) {
            buffer[idx] = strokeLuma;
          }
        }
      }
    } else if (tagName === 'polygon' && attrs.points && fillLuma !== null) {
      const pts = attrs.points
        .trim()
        .split(/\s+/)
        .map((pair) => {
          const [pxStr, pyStr] = pair.split(',');
          return { x: parseFloat(pxStr), y: parseFloat(pyStr) };
        });
      if (pts.length >= 3) {
        const minX = Math.min(...pts.map((p) => p.x));
        const maxX = Math.max(...pts.map((p) => p.x));
        const minY = Math.min(...pts.map((p) => p.y));
        const maxY = Math.max(...pts.map((p) => p.y));
        for (let py = 0; py < RASTER_H; py++) {
          const sy = ((py + 0.5) / RASTER_H) * CANVAS_H;
          for (let px = 0; px < RASTER_W; px++) {
            const sx = ((px + 0.5) / RASTER_W) * CANVAS_W;
            const local = applyMatrix(invMat, sx, sy);
            if (
              local.x >= minX &&
              local.x <= maxX &&
              local.y >= minY &&
              local.y <= maxY
            ) {
              buffer[py * RASTER_W + px] = fillLuma;
            }
          }
        }
      }
    } else if (tagName === 'line' && strokeLuma !== null) {
      const x1 = parseFloat(attrs.x1 || '0');
      const y1 = parseFloat(attrs.y1 || '0');
      const x2 = parseFloat(attrs.x2 || '0');
      const y2 = parseFloat(attrs.y2 || '0');
      const steps = 32;
      for (let s = 0; s <= steps; s++) {
        const t = s / steps;
        const lx = x1 + (x2 - x1) * t;
        const ly = y1 + (y2 - y1) * t;
        const world = applyMatrix(localMat, lx, ly);
        const px = Math.floor((world.x / CANVAS_W) * RASTER_W);
        const py = Math.floor((world.y / CANVAS_H) * RASTER_H);
        if (px >= 0 && px < RASTER_W && py >= 0 && py < RASTER_H) {
          const idx = py * RASTER_W + px;
          buffer[idx] = buffer[idx] * 0.5 + strokeLuma * 0.5;
        }
      }
    }
  }

  return buffer;
}

/**
 * Computes a 64-bit horizontal gradient difference hash (dHash) from a 64×36 grayscale raster.
 * Downsamples the 64×36 buffer into a 9×8 luminance grid and compares col[x] > col[x+1].
 */
export function compute64BitDHash(raster64x36: Float64Array): bigint {
  const cols = 9;
  const rows = 8;
  const grid = new Float64Array(cols * rows);

  for (let r = 0; r < rows; r++) {
    const yStart = Math.floor((r * RASTER_H) / rows);
    const yEnd = Math.max(yStart + 1, Math.floor(((r + 1) * RASTER_H) / rows));
    for (let c = 0; c < cols; c++) {
      const xStart = Math.floor((c * RASTER_W) / cols);
      const xEnd = Math.max(xStart + 1, Math.floor(((c + 1) * RASTER_W) / cols));
      let sum = 0;
      let count = 0;
      for (let y = yStart; y < yEnd; y++) {
        for (let x = xStart; x < xEnd; x++) {
          sum += raster64x36[y * RASTER_W + x];
          count++;
        }
      }
      grid[r * cols + c] = count > 0 ? sum / count : 0;
    }
  }

  let hash = 0n;
  let bitIndex = 0n;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < 8; c++) {
      const left = grid[r * cols + c];
      const right = grid[r * cols + c + 1];
      if (left > right) {
        hash |= 1n << bitIndex;
      }
      bitIndex++;
    }
  }
  return hash;
}

export function hammingDistance64(a: bigint, b: bigint): number {
  let xor = a ^ b;
  let dist = 0;
  while (xor > 0n) {
    dist += Number(xor & 1n);
    xor >>= 1n;
  }
  return dist;
}

function sha256Short(content: string): string {
  return crypto.createHash('sha256').update(content).digest('hex').slice(0, 12);
}

function main() {
  console.log('======================================================================');
  console.log(' CHESTAADOTCOM — BLOG COVER & OPENGRAPH UNIQUENESS GATE (covers:check)');
  console.log('======================================================================\n');

  // Ensure all covers and OG SVGs are generated and fresh
  const { coversWritten, ogCardsWritten } = generateAllCoversAndOgCards();
  console.log(
    `[Generator] Synced ${coversWritten} cover SVGs (1600x900) and ${ogCardsWritten} OG card SVGs (1200x630).\n`
  );

  const errors: string[] = [];

  // 1. Root Cause Verification Table (Before Fix: Legacy Shared Assets)
  console.log('--- 1. ROOT CAUSE REPORT: LEGACY SHARED COVERS BEFORE FIX ---');
  console.log(
    '| # | Canonical Slug | Legacy Shared Path | Legacy File SHA-256 | Shared Count |'
  );
  console.log(
    '|---|----------------|--------------------|---------------------|--------------|'
  );

  const legacyPathCounts = new Map<string, number>();
  for (const spec of ALL_CANONICAL_COVER_SPECS) {
    const leg = spec.legacyImagePath || 'unknown';
    legacyPathCounts.set(leg, (legacyPathCounts.get(leg) || 0) + 1);
  }

  ALL_CANONICAL_COVER_SPECS.forEach((spec, idx) => {
    const legPath = spec.legacyImagePath || '';
    const diskLegPath = path.resolve(process.cwd(), 'public', legPath.replace(/^\//, ''));
    const legHash = fs.existsSync(diskLegPath)
      ? sha256Short(fs.readFileSync(diskLegPath, 'utf8'))
      : 'missing';
    const count = legacyPathCounts.get(legPath) || 1;
    console.log(
      `| ${idx + 1} | \`${spec.canonicalSlug}\` | \`${legPath}\` | \`${legHash}\` | ${count}x ${
        count > 1 ? '(DUPLICATE)' : '(UNIQUE)'
      } |`
    );
  });

  // 2. Verify all 35 Canonical Cover SVGs & Compute Perceptual 64-bit dHash
  interface CoverAuditRecord {
    index: number;
    coverId: string;
    canonicalSlug: string;
    enSlug: string;
    cluster: string;
    hero: string;
    variant: string;
    motif: string;
    layoutVariant: string;
    accentToken: string;
    seed: number;
    labels: string[];
    alt: string;
    altEn: string;
    coverPath: string;
    ogIdPath: string;
    ogEnPath: string;
    sha256: string;
    dHashHex: string;
    dHashBigInt: bigint;
    byteSize: number;
    nearestNeighborSlug: string;
    nearestHammingDistance: number;
  }

  const records: CoverAuditRecord[] = [];
  const seenCoverIds = new Set<string>();
  const seenTuples = new Map<string, string>();
  const seenHeroVariants = new Map<string, string>();
  const seenSha256 = new Map<string, string>();
  const seenAlts = new Map<string, string>();

  for (let i = 0; i < ALL_CANONICAL_COVER_SPECS.length; i++) {
    const spec = ALL_CANONICAL_COVER_SPECS[i];
    const coverPath = `/images/blog/covers/${spec.canonicalSlug}.svg`;
    const absCoverPath = path.resolve(
      process.cwd(),
      'public/images/blog/covers',
      `${spec.canonicalSlug}.svg`
    );

    if (!fs.existsSync(absCoverPath)) {
      errors.push(`[Missing Cover] ${coverPath} does not exist on disk.`);
      continue;
    }

    const svgRaw = fs.readFileSync(absCoverPath, 'utf8');
    const byteSize = Buffer.byteLength(svgRaw, 'utf8');
    const sha256 = sha256Short(svgRaw);

    // Gate: < 25 KB
    if (byteSize >= 25 * 1024) {
      errors.push(
        `[Size Gate] ${coverPath} is ${byteSize} bytes (must be < 25,600 bytes).`
      );
    }

    // Gate: Valid SVG & zero external URLs or @import (excluding xmlns="http://www.w3.org/2000/svg")
    if (!svgRaw.trim().startsWith('<svg') || !svgRaw.trim().endsWith('</svg>')) {
      errors.push(`[Parse Gate] ${coverPath} is not a well-formed <svg> document.`);
    }
    const svgWithoutXmlns = svgRaw.replace(/xmlns="http:\/\/www\.w3\.org\/2000\/svg"/g, '');
    if (/https?:\/\/|@import/i.test(svgWithoutXmlns)) {
      errors.push(
        `[Self-Contained Gate] ${coverPath} contains external URL or @import.`
      );
    }
    if (/<filter\b/i.test(svgRaw)) {
      errors.push(
        `[Style Gate] ${coverPath} contains forbidden <filter> element.`
      );
    }

    // Gate: Unique coverId
    if (seenCoverIds.has(spec.coverId)) {
      errors.push(`[Duplicate coverId] "${spec.coverId}" is used by multiple posts.`);
    }
    seenCoverIds.add(spec.coverId);

    // Gate: Unique (cluster, motif, layoutVariant, accentToken) tuple
    const tupleKey = `${spec.cluster}|${spec.motif}|${spec.layoutVariant}|${spec.accentToken}`;
    if (seenTuples.has(tupleKey)) {
      errors.push(
        `[Duplicate Tuple] (${tupleKey}) shared by "${spec.canonicalSlug}" and "${seenTuples.get(
          tupleKey
        )}".`
      );
    }
    seenTuples.set(tupleKey, spec.canonicalSlug);

    // Gate: Unique (hero, variant) pair
    const heroVarKey = `${spec.hero}:${spec.variant}`;
    if (seenHeroVariants.has(heroVarKey)) {
      errors.push(
        `[Duplicate Hero+Variant] (${heroVarKey}) shared by "${spec.canonicalSlug}" and "${seenHeroVariants.get(
          heroVarKey
        )}".`
      );
    }
    seenHeroVariants.set(heroVarKey, spec.canonicalSlug);

    // Gate: Unique SHA-256 content hash
    if (seenSha256.has(sha256)) {
      errors.push(
        `[Duplicate File Hash] ${sha256} shared by "${spec.canonicalSlug}" and "${seenSha256.get(
          sha256
        )}".`
      );
    }
    seenSha256.set(sha256, spec.canonicalSlug);

    // Gate: Alt text length (80–125 chars) and uniqueness
    if (spec.alt.length < 80 || spec.alt.length > 125) {
      errors.push(
        `[Alt Length ID] "${spec.canonicalSlug}" alt is ${spec.alt.length} chars (must be 80–125): "${spec.alt}"`
      );
    }
    if (spec.altEn.length < 80 || spec.altEn.length > 125) {
      errors.push(
        `[Alt Length EN] "${spec.enSlug}" altEn is ${spec.altEn.length} chars (must be 80–125): "${spec.altEn}"`
      );
    }
    if (seenAlts.has(spec.alt.toLowerCase())) {
      errors.push(`[Duplicate Alt ID] "${spec.alt}" reused across posts.`);
    }
    seenAlts.set(spec.alt.toLowerCase(), spec.canonicalSlug);
    if (seenAlts.has(spec.altEn.toLowerCase())) {
      errors.push(`[Duplicate Alt EN] "${spec.altEn}" reused across posts.`);
    }
    seenAlts.set(spec.altEn.toLowerCase(), spec.enSlug);

    // Compute 64x36 grayscale raster and 64-bit dHash
    const raster = rasterizeCoverSvgTo64x36(svgRaw);
    const dHashBigInt = compute64BitDHash(raster);
    const dHashHex = dHashBigInt.toString(16).padStart(16, '0');

    records.push({
      index: i + 1,
      coverId: spec.coverId,
      canonicalSlug: spec.canonicalSlug,
      enSlug: spec.enSlug,
      cluster: spec.cluster,
      hero: spec.hero,
      variant: spec.variant,
      motif: spec.motif,
      layoutVariant: spec.layoutVariant,
      accentToken: spec.accentToken,
      seed: spec.seed,
      labels: spec.labels.filter((l): l is string => Boolean(l)),
      alt: spec.alt,
      altEn: spec.altEn,
      coverPath,
      ogIdPath: `/images/og/blog/id/${spec.canonicalSlug}.svg`,
      ogEnPath: `/images/og/blog/en/${spec.enSlug}.svg`,
      sha256,
      dHashHex,
      dHashBigInt,
      byteSize,
      nearestNeighborSlug: '',
      nearestHammingDistance: 64,
    });
  }

  // 3. Pairwise Perceptual dHash Distance Check across all 35 covers
  let globalMinDistance = 64;
  let globalMinPair = '';

  for (let i = 0; i < records.length; i++) {
    let nearestDist = 64;
    let nearestSlug = '';
    for (let j = 0; j < records.length; j++) {
      if (i === j) continue;
      const dist = hammingDistance64(records[i].dHashBigInt, records[j].dHashBigInt);
      if (dist < nearestDist) {
        nearestDist = dist;
        nearestSlug = records[j].canonicalSlug;
      }
      if (dist < globalMinDistance) {
        globalMinDistance = dist;
        globalMinPair = `${records[i].canonicalSlug} <-> ${records[j].canonicalSlug}`;
      }
      if (dist < 10) {
        errors.push(
          `[Perceptual Similarity Gate] Covers "${records[i].canonicalSlug}" and "${records[j].canonicalSlug}" have 64-bit dHash Hamming distance ${dist} (must be >= 10).`
        );
      }
    }
    records[i].nearestHammingDistance = nearestDist;
    records[i].nearestNeighborSlug = nearestSlug;
  }

  // 4. Verify all 70 localized BlogPost entries (35 ID + 35 EN) & their 1200x630 OG cards
  const allPosts = [...BLOG_POSTS, ...ENGLISH_BLOG_POSTS];
  for (const post of allPosts) {
    const loc = post.locale || 'id';
    if (!post.coverSpec || !post.coverSpec.coverId) {
      errors.push(`[Post ${loc}:${post.slug}] Missing coverSpec.`);
    }
    const absOgPath = path.resolve(
      process.cwd(),
      'public',
      post.ogImage.replace(/^\//, '')
    );
    if (!fs.existsSync(absOgPath)) {
      errors.push(`[Missing OG Card] ${post.ogImage} does not exist on disk.`);
    } else {
      const ogContent = fs.readFileSync(absOgPath, 'utf8');
      const ogBytes = Buffer.byteLength(ogContent, 'utf8');
      if (ogBytes >= 25 * 1024) {
        errors.push(`[OG Size Gate] ${post.ogImage} is ${ogBytes} bytes (must be < 25 KB).`);
      }
      const ogWithoutXmlns = ogContent.replace(/xmlns="http:\/\/www\.w3\.org\/2000\/svg"/g, '');
      if (/https?:\/\/|@import/i.test(ogWithoutXmlns)) {
        errors.push(`[OG Self-Contained Gate] ${post.ogImage} contains external URL.`);
      }
    }
  }

  // 5. Print Complete New Cover Verification Table
  console.log('\n--- 2. NEW UNIQUE COVER & PERCEPTUAL DHASH VERIFICATION TABLE (35 PAIRS / 70 POSTS) ---');
  console.log(
    '| # | Canonical Slug | Hero (Var) | Tuple (Cluster / Motif / Layout / Accent) | SHA-256 | 64-Bit dHash | Size | Min Hamming Dist |'
  );
  console.log(
    '|---|----------------|------------|-------------------------------------------|---------|--------------|------|------------------|'
  );

  for (const r of records) {
    console.log(
      `| ${r.index} | \`${r.canonicalSlug}\` | \`${r.hero} (${r.variant})\` | \`${r.cluster}/${r.motif}/${r.layoutVariant}/${r.accentToken}\` | \`${r.sha256}\` | \`0x${r.dHashHex}\` | ${(
        r.byteSize / 1024
      ).toFixed(1)} KB | ${r.nearestHammingDistance} bits (\`${r.nearestNeighborSlug.slice(
        0,
        22
      )}...\`) |`
    );
  }

  console.log(
    `\nPairwise dHash summary across all ${records.length} covers: minimum Hamming distance = ${globalMinDistance} bits (${globalMinPair}).`
  );

  // 6. Write JSON manifest for /dev/covers gallery route
  const manifestPath = path.resolve(
    process.cwd(),
    'src/data/generated-covers-manifest.json'
  );
  const manifestPayload = records.map(({ dHashBigInt, ...rest }) => rest);
  fs.writeFileSync(manifestPath, JSON.stringify(manifestPayload, null, 2) + '\n', 'utf8');

  // 7. Write Markdown report to docs/cover-audit-report.md
  const reportLines: string[] = [
    '# Blog Cover & OpenGraph Uniqueness Audit Report — CHESTAADOTCOM',
    '',
    'Laporan ini mendokumentasikan akar masalah duplikasi gambar sampul (*cover image*) sebelumnya serta memverifikasi bahwa seluruh 35 pasang artikel blog dwibahasa (70 halaman total: 35 Bahasa Indonesia + 35 Bahasa Inggris) kini memiliki sampul SVG `1600×900` (`16:9`) dan kartu OpenGraph `1200×630` yang 100% unik.',
    '',
    '## 1. Akar Masalah Sebelumnya (Before Fix)',
    '- Artikel 21–30 menggunakan ulang 5 file SVG klaster generik (`cluster-agentic-ai.svg`, `cluster-website-performance.svg`, `cluster-cost-vendor.svg`, `cluster-automation-software.svg`, `cluster-local-seo.svg`).',
    '- Beberapa kunci gambar berbeda di `src/config/images.ts` (`blogRagBusiness`, `blogMcpBusinessGuide`, `blogSchemaLocalBusiness`, `blogInvoiceAutomation`, `blogAutomationToolStack`, `blogChooseWebAgency`, `blogMaintenanceCost`, `blogNextjsVsWordpress`, dll.) menunjuk ke file SVG fisik yang sama.',
    '',
    '## 2. Tabel Verifikasi Sampul Baru (`1600×900` Cover + `1200×630` OG)',
    '',
    '| # | Slug Indonesia | Slug Inggris | Hero (`Variant`) | Tuple `(Cluster / Motif / Layout / Accent)` | SHA-256 | 64-Bit dHash | Ukuran | Jarak Hamming Terdekat |',
    '|---|---|---|---|---|---|---|---|---|',
    ...records.map(
      (r) =>
        `| ${r.index} | \`${r.canonicalSlug}\` | \`${r.enSlug}\` | \`${r.hero} (${r.variant})\` | \`${r.cluster} / ${r.motif} / ${r.layoutVariant} / ${r.accentToken}\` | \`${r.sha256}\` | \`0x${r.dHashHex}\` | ${(
          r.byteSize / 1024
        ).toFixed(1)} KB | ${r.nearestHammingDistance} bit |`
    ),
    '',
  ];
  const reportPath = path.resolve(process.cwd(), 'docs/cover-audit-report.md');
  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  fs.writeFileSync(reportPath, reportLines.join('\n'), 'utf8');

  if (errors.length > 0) {
    console.error(`\nCOVERS CHECK FAILED WITH ${errors.length} ERROR(S):`);
    for (const err of errors) {
      console.error(`  ERROR: ${err}`);
    }
    process.exit(1);
  }

  console.log(
    `\nSUCCESS: All ${records.length} blog covers (1600x900) and ${allPosts.length} localized OG cards (1200x630) passed covers:check with 0 errors!`
  );
}

main();
