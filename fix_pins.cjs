const fs = require('fs');
let code = fs.readFileSync('src/pages/ServicesPage.tsx', 'utf8');

if (!code.includes('<SectionPin sectionId="philosophy" />')) {
  code = code.replace(
    '<motion.section id="philosophy"',
    '<motion.section id="philosophy"' // Wait, this doesn't help. Let's do it after <motion.section id="philosophy"... >
  );
  code = code.replace(
    /(<motion\.section id="philosophy"[^>]+>)/,
    '$1\n          <SectionPin sectionId="philosophy" />'
  );
}

if (!code.includes('<SectionPin sectionId="ai-scope" />')) {
  code = code.replace(
    /(<motion\.section id="ai-scope"[^>]+>)/,
    '$1\n          <SectionPin sectionId="ai-scope" />'
  );
}

if (!code.includes('<SectionPin sectionId="metrics" />')) {
  code = code.replace(
    /(<motion\.section id="metrics"[^>]+>)/,
    '$1\n          <SectionPin sectionId="metrics" />'
  );
}

if (!code.includes('<SectionPin sectionId="faq" />')) {
  code = code.replace(
    /(<motion\.section id="faq"[^>]+>)/,
    '$1\n          <SectionPin sectionId="faq" />'
  );
}

fs.writeFileSync('src/pages/ServicesPage.tsx', code);
