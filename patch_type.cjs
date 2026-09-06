const fs = require('fs');
const filePath = 'src/components/organisms/RelatedCaseStudiesSlider.tsx';
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace("id: string;", "id: number | string;");
fs.writeFileSync(filePath, content);
console.log("Fixed type mismatch");
