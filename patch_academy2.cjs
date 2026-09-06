const fs = require('fs');
const path = 'src/pages/AcademyMasterclassPage.tsx';
let content = fs.readFileSync(path, 'utf8');

// The react-markdown component was added, but the outer wrapper has Tailwind prose classes
// which might be conflicting or not rendering Markdown correctly. We need to apply proper Markdown styling using a library 
// or clean up the CSS so Markdown renders elements properly. We can use markdown-to-jsx instead since it works great with tailwind prose.

if(!content.includes("import Markdown from 'markdown-to-jsx';")){
    content = content.replace("import Markdown from 'react-markdown';", "import Markdown from 'markdown-to-jsx';");
}

// Ensure the class list is properly targeting markdown tags 
content = content.replace(
    /className="text-lg md:text-xl text-slate-600 leading-relaxed mb-10 markdown-body prose-p:mb-4 prose-strong:text-purple-900 prose-strong:font-bold prose-ul:list-disc prose-ul:pl-6 prose-li:mb-2"/g,
    'className="prose prose-lg prose-slate max-w-none text-slate-600 prose-headings:font-display prose-headings:font-medium prose-strong:text-slate-900 prose-strong:font-bold prose-ul:list-disc prose-p:leading-relaxed prose-a:text-purple-700"'
);


fs.writeFileSync(path, content);
console.log('Patched Academy Masterclass Page to use markdown-to-jsx and proper tailwind prose.');
