const fs = require('fs');
let content = fs.readFileSync('src/app/academy/[slug]/page.tsx', 'utf-8');

// Remove the import from the middle
content = content.replace("import { codeToHtml } from 'shiki';\n", "");
content = content.replace("import { codeToHtml } from 'shiki';\r\n", "");

// Add it to the top
content = "import { codeToHtml } from 'shiki';\n" + content;

// Replace CodeBlock usage with PremiumCodeBlock
content = content.replace("<CodeBlock code={sub.code} language={sub.lang} title={sub.filename} />", "<PremiumCodeBlock code={sub.code} language={sub.lang} title={sub.filename} />");

fs.writeFileSync('src/app/academy/[slug]/page.tsx', content);
