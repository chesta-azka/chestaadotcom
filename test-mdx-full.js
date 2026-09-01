import { compiler } from 'markdown-to-jsx';
import fs from 'fs';

const content = fs.readFileSync('src/content/vibeCodingArticle.ts', 'utf-8');
const match = content.match(/export const vibeCodingMdx = (".*");$/s);
let mdx = "";
if (match) {
  mdx = JSON.parse(match[1]);
}
if (mdx.startsWith('---')) {
    const endOfFrontmatter = mdx.indexOf('---', 3);
    if (endOfFrontmatter !== -1) {
      mdx = mdx.substring(endOfFrontmatter + 3).trim();
    }
}
const el = compiler(mdx);
// el might be a single element or an array of elements
if (Array.isArray(el)) {
    console.log("Array length:", el.length);
} else {
    console.log("Children:", el.props.children.length);
}
