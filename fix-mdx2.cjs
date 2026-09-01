const fs = require('fs');
let content = fs.readFileSync('src/content/vibeCodingArticle.ts', 'utf-8');
const prefix = "export const vibeCodingMdx = ";
if (content.startsWith(prefix)) {
  const strStr = content.substring(prefix.length, content.length - 2); // remove ;\n
  let mdx = JSON.parse(strStr);
  if (mdx.startsWith('---')) {
    const end = mdx.indexOf('---', 3);
    if (end !== -1) {
      mdx = mdx.substring(end + 3).trim();
      fs.writeFileSync('src/content/vibeCodingArticle.ts', prefix + JSON.stringify(mdx) + ";\n");
      console.log("Fixed!");
    }
  }
}
