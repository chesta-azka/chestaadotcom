import { compiler } from 'markdown-to-jsx';
import fs from 'fs';
const content = fs.readFileSync('src/content/vibeCodingArticle.ts', 'utf-8');
const match = content.match(/export const vibeCodingMdx = (".*");$/s);
if (match) {
  const mdx = JSON.parse(match[1]);
  console.log("Includes literal \\n?", mdx.includes("\\n"));
  console.log("Includes actual newline?", mdx.includes("\n"));
}
