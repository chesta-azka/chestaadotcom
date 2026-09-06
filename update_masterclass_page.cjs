const fs = require('fs');
let code = fs.readFileSync('src/pages/AcademyMasterclassPage.tsx', 'utf8');

// Helper function to format markdown so single-newline lists are formatted correctly
const helperCode = `
// Helper to ensure markdown lists render with correct spacing
function formatMarkdownContent(content: string) {
  if (!content) return '';
  let formatted = content.replace(/\\n(\\d+\\.\\s)/g, '\\n\\n$1');
  formatted = formatted.replace(/\\n([\\*\\-]\\s)/g, '\\n\\n$1');
  return formatted;
}
`;

// Insert helper before markdownOptions
code = code.replace('const markdownOptions = {', helperCode + '\nconst markdownOptions = {');

// Update Markdown component call to use formatMarkdownContent(sub.content)
code = code.replace(
  /<Markdown options=\{markdownOptions\}>\{sub\.content\}<\/Markdown>/g,
  '<Markdown options={markdownOptions}>{formatMarkdownContent(sub.content)}</Markdown>'
);

// Update typography in markdownOptions for 1.5-line height (leading-relaxed) and 2rem vertical margins (mb-8)
const newMarkdownOptions = `
const markdownOptions = {
  overrides: {
    p: {
      component: (props: any) => <p className="text-base text-slate-700 leading-relaxed mb-8" {...props} />
    },
    ul: {
      component: (props: any) => <ul className="list-disc pl-6 space-y-3 mb-8 text-slate-700 leading-relaxed" {...props} />
    },
    ol: {
      component: (props: any) => <ol className="list-decimal pl-6 space-y-3 mb-8 text-slate-700 leading-relaxed" {...props} />
    },
    li: {
      component: (props: any) => <li className="leading-relaxed mb-2" {...props} />
    },
    h1: {
      component: (props: any) => <h1 className="text-2xl md:text-3xl font-display font-bold text-slate-900 mt-12 mb-6 tracking-tight" {...props} />
    },
    h2: {
      component: (props: any) => <h2 className="text-xl md:text-2xl font-display font-bold text-slate-900 mt-12 mb-6 tracking-tight" {...props} />
    },
    h3: {
      component: (props: any) => <h3 className="text-lg md:text-xl font-display font-semibold text-slate-900 mt-10 mb-6 tracking-tight" {...props} />
    }
  }
};
`;

const startIdx = code.indexOf('const markdownOptions = {');
const endIdx = code.indexOf('};', startIdx) + 2;
code = code.substring(0, startIdx) + newMarkdownOptions + code.substring(endIdx);

fs.writeFileSync('src/pages/AcademyMasterclassPage.tsx', code);
console.log('Updated AcademyMasterclassPage with Markdown preprocessor and standardized typography');
