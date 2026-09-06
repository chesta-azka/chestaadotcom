const fs = require('fs');
let code = fs.readFileSync('src/pages/AcademyMasterclassPage.tsx', 'utf8');

const markdownOverrides = `
// Markdown styling overrides for optimal readability
const markdownOptions = {
  overrides: {
    p: {
      component: (props: any) => <p className="text-[15px] text-slate-700 leading-[1.75] mb-6" {...props} />
    },
    ul: {
      component: (props: any) => <ul className="list-disc pl-6 space-y-2.5 mb-6 text-slate-700" {...props} />
    },
    ol: {
      component: (props: any) => <ol className="list-decimal pl-6 space-y-2.5 mb-6 text-slate-700" {...props} />
    },
    li: {
      component: (props: any) => <li className="leading-relaxed" {...props} />
    },
    h1: {
      component: (props: any) => <h1 className="text-2xl md:text-3xl font-display font-bold text-slate-900 mt-8 mb-4 tracking-tight" {...props} />
    },
    h2: {
      component: (props: any) => <h2 className="text-xl md:text-2xl font-display font-bold text-slate-900 mt-8 mb-4 tracking-tight" {...props} />
    },
    h3: {
      component: (props: any) => <h3 className="text-lg md:text-xl font-display font-semibold text-slate-900 mt-6 mb-3 tracking-tight" {...props} />
    }
  }
};
`;

// Insert markdownOptions before component or right after PremiumCodeBlock
code = code.replace('export default function AcademyMasterclassPage() {', markdownOverrides + '\nexport default function AcademyMasterclassPage() {');

// Update <Markdown>{sub.content}</Markdown> to <Markdown options={markdownOptions}>{sub.content}</Markdown>
code = code.replace(/<Markdown>\{sub\.content\}<\/Markdown>/g, '<Markdown options={markdownOptions}>{sub.content}</Markdown>');

fs.writeFileSync('src/pages/AcademyMasterclassPage.tsx', code);
console.log('Added Markdown overrides for typography and spacing');
