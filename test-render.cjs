require('ts-node').register();
const mdx = require('./src/content/vibeCodingArticle.ts').vibeCodingMdx;
console.log(mdx.substring(0, 1000));
