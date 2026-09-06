const fs = require('fs');
let code = fs.readFileSync('src/pages/AcademyMasterclassPage.tsx', 'utf8');

// 1. Remove Header import and usage
code = code.replace("import Header from '../components/organisms/Header.tsx';\n", "");
code = code.replace("      <Header />\n", "");

// 2. Improve formatMarkdownContent to ensure every line/step/sentence has its own spacing
const newHelper = `
// Helper to ensure markdown lines and steps render with distinct paragraph spacing
function formatMarkdownContent(content: string) {
  if (!content) return '';
  // Normalize newlines
  let formatted = content.replace(/\\r\\n/g, '\\n');
  // Replace single newlines with double newlines so markdown-to-jsx creates distinct block paragraphs
  formatted = formatted.replace(/\\n+/g, '\\n\\n');
  return formatted;
}
`;

const startHelper = code.indexOf('function formatMarkdownContent');
const endHelper = code.indexOf('}', startHelper) + 1;
if (startHelper !== -1) {
  code = code.substring(0, startHelper) + newHelper + code.substring(endHelper);
} else {
  code = newHelper + code;
}

fs.writeFileSync('src/pages/AcademyMasterclassPage.tsx', code);
console.log('Removed Header and updated formatMarkdownContent in AcademyMasterclassPage');
