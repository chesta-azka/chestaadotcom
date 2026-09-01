import { compiler } from 'markdown-to-jsx';
import fs from 'fs';

const content = fs.readFileSync('src/content/vibeCodingArticle.ts', 'utf-8');
const match = content.match(/export const vibeCodingMdx = (".*");$/s);
let mdx = "";
if (match) {
  mdx = JSON.parse(match[1]);
}
console.log("MDX length before strip:", mdx.length);
if (mdx.startsWith('---')) {
    const endOfFrontmatter = mdx.indexOf('---', 3);
    if (endOfFrontmatter !== -1) {
      mdx = mdx.substring(endOfFrontmatter + 3).trim();
    }
}
console.log("MDX length after strip:", mdx.length);
const el = compiler(mdx);
console.log(el ? "Parsed" : "Null");
