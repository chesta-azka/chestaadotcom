const fs = require('fs');

let content = fs.readFileSync('src/app/academy/[slug]/page.tsx', 'utf-8');

const regex = /try \{\s*\$\{files\['main.js'\]\}\s*\} catch \(e\) \{\s*console.error\(e.message\);\s*\}/;

const newExec = `
            // Load main.js dynamically so static imports work, catching errors in promise
            const mainContent = \`\${files['main.js']}\`;
            const blob = new Blob([mainContent], { type: 'application/javascript' });
            const url = URL.createObjectURL(blob);
            import(url).catch(e => console.error(e.message));
`;

content = content.replace(regex, newExec);
fs.writeFileSync('src/app/academy/[slug]/page.tsx', content);

