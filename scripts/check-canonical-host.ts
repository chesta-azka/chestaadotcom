import fs from 'fs';
import path from 'path';

/**
 * Verifies that:
 * 1. Canonical host https://chestaa.com is used consistently across all source, public, and dist files
 *    (no https://www.chestaa.com or http://chestaa.com in canonical, og:url, hreflang, sitemap, JSON-LD, RSS, or language switch).
 * 2. Zero plain-text email addresses (chestaadotcom@gmail.com, hello@chestaa.com) or mailto: links appear in HTML/JSON-LD/sitemaps.
 */

const FORBIDDEN_HOST_PATTERNS = [
  /https?:\/\/www\.chestaa\.com/i,
  /http:\/\/chestaa\.com/i,
];

const FORBIDDEN_EMAIL_PATTERNS = [
  /chestaadotcom@gmail\.com/i,
  /hello@chestaa\.com/i,
  /href=["']mailto:/i,
];

function walkFiles(dir: string, exts: string[]): string[] {
  const results: string[] = [];
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (['node_modules', '.git', '.next'].includes(entry.name)) continue;
      results.push(...walkFiles(full, exts));
    } else if (exts.some((ext) => entry.name.endsWith(ext))) {
      results.push(full);
    }
  }
  return results;
}

const filesToScan = [
  path.join(process.cwd(), 'index.html'),
  ...walkFiles(path.join(process.cwd(), 'src'), ['.ts', '.tsx']),
  ...walkFiles(path.join(process.cwd(), 'public'), ['.xml', '.txt', '.html', '.webmanifest']),
  ...walkFiles(path.join(process.cwd(), 'dist'), ['.xml', '.txt', '.html', '.webmanifest']),
];

const violations: string[] = [];

for (const file of filesToScan) {
  if (!fs.existsSync(file)) continue;
  const rel = path.relative(process.cwd(), file);
  const content = fs.readFileSync(file, 'utf-8');

  for (const pattern of FORBIDDEN_HOST_PATTERNS) {
    const match = content.match(pattern);
    if (match) {
      violations.push(`[HOST VIOLATION] ${rel} contains non-canonical URL "${match[0]}"`);
    }
  }

  for (const pattern of FORBIDDEN_EMAIL_PATTERNS) {
    const match = content.match(pattern);
    if (match) {
      violations.push(`[EMAIL VIOLATION] ${rel} contains plain-text email or mailto "${match[0]}"`);
    }
  }
}

if (violations.length > 0) {
  console.error('❌ Canonical host / plain-text email check failed:');
  for (const v of violations) {
    console.error('  -', v);
  }
  process.exit(1);
}

console.log(
  `✅ Canonical host & email check passed across ${filesToScan.length} files (100% https://chestaa.com, 0 plain-text emails).`
);
