const fs = require('fs');
const { compiler } = require('markdown-to-jsx');

let content = fs.readFileSync('src/content/vibeCodingArticle.ts', 'utf-8');
const prefix = "export const vibeCodingMdx = ";
let mdx = JSON.parse(content.substring(prefix.length, content.length - 2));

console.log("MDX Length:", mdx.length);
console.log("Number of paragraphs (double newlines):", mdx.split('\n\n').length);
