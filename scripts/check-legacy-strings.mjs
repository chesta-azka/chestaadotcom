import fs from 'fs';
import path from 'path';

const BANNED_STRINGS = [
  'Principal Architecture',
  'Autonomous AI Systems',
  'dominasi pasar',
  'CHESTAA Enterprise',
  'chesta.png',
];

const EXCLUDED_DIRS = ['.git', 'node_modules', 'dist', '.next', '.aistudio', 'docs'];

function scanDirectory(dirPath, violations = []) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    if (EXCLUDED_DIRS.includes(entry.name)) continue;

    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      scanDirectory(fullPath, violations);
    } else if (entry.isFile()) {
      // Only check text / source / metadata / config files
      if (
        /\.(tsx?|jsx?|mjs|cjs|json|html|css|md|txt|xml|yml|yaml|svg)$/i.test(
          entry.name
        )
      ) {
        // Skip checker and parity scripts themselves if they contain string literals
        if (entry.name === 'check-legacy-strings.mjs' || entry.name === 'parity.mjs') continue;

        const content = fs.readFileSync(fullPath, 'utf8');
        for (const banned of BANNED_STRINGS) {
          if (content.includes(banned)) {
            violations.push({
              file: path.relative(process.cwd(), fullPath),
              banned,
            });
          }
        }
      }
    }
  }

  return violations;
}

console.log('======================================================================');
console.log(' CHESTAADOTCOM — LEGACY STRINGS LINT GATE');
console.log('======================================================================');

const violations = scanDirectory(process.cwd());

// Verify Google Search Console meta tag in index.html
const indexHtmlPath = path.resolve(process.cwd(), 'index.html');
const indexHtmlContent = fs.readFileSync(indexHtmlPath, 'utf8');
if (!indexHtmlContent.includes('qsI5diUIpk_GpZYdwmC6zaFNWkBiQSkLMnr701rO34w')) {
  violations.push({
    file: 'index.html',
    banned: 'MISSING_GOOGLE_SITE_VERIFICATION_TAG',
  });
}

if (violations.length > 0) {
  console.error('\n❌ FAIL: Found legacy prohibited strings or missing verification tags in repository:\n');
  console.table(violations);
  process.exit(1);
} else {
  console.log('✓ SUCCESS: 0 legacy strings found & Google Search Console verification tag verified.');
  process.exit(0);
}
