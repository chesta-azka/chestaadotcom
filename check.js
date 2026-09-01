import fs from 'fs';
const content = fs.readFileSync('src/content/vibeCodingArticle.ts', 'utf-8');
const match = content.match(/export const vibeCodingMdx = (".*");$/s);
if (match) {
  const str = JSON.parse(match[1]);
  console.log("String length:", str.length);
  console.log("Lines in string:", str.split('\n').length);
} else {
  console.log("Regex didn't match");
}
