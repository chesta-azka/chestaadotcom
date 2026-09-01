const fs = require('fs');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const Markdown = require('markdown-to-jsx').default || require('markdown-to-jsx');

let content = fs.readFileSync('src/content/vibeCodingArticle.ts', 'utf-8');
const prefix = "export const vibeCodingMdx = ";
let mdx = JSON.parse(content.substring(prefix.length, content.length - 2));

const el = React.createElement(Markdown, {}, mdx);
const html = renderToStaticMarkup(el);
console.log("HTML length:", html.length);
console.log("Paragraphs in HTML:", html.split('<p>').length - 1);
console.log("H2s in HTML:", html.split('<h2>').length - 1);
