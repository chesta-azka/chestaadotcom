const fs = require('fs');

let content = fs.readFileSync('src/content/vibeCodingArticle.ts', 'utf-8');
const match = content.match(/export const vibeCodingMdx = (".*");$/s);
if (match) {
  let mdx = JSON.parse(match[1]);
  if (mdx.startsWith('---')) {
    const endOfFrontmatter = mdx.indexOf('---', 3);
    if (endOfFrontmatter !== -1) {
      mdx = mdx.substring(endOfFrontmatter + 3).trim();
      
      const newTs = `export const vibeCodingMdx = ${JSON.stringify(mdx)};\n`;
      fs.writeFileSync('src/content/vibeCodingArticle.ts', newTs);
      console.log("Stripped frontmatter successfully!");
    }
  } else {
    console.log("No frontmatter found.");
  }
} else {
  console.log("Failed to match regex.");
}
