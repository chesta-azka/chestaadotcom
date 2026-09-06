const fs = require('fs');
let content = fs.readFileSync('src/app/academy/[slug]/page.tsx', 'utf-8');

content = content.replace("let elements: React.ReactNode[] = [text];", "let elements: any[] = [text];");
fs.writeFileSync('src/app/academy/[slug]/page.tsx', content);
