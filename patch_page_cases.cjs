const fs = require('fs');
let code = fs.readFileSync('src/app/case-studies/[slug]/page.tsx', 'utf8');

const importsToAdd = `import ProjectTimeline from '../../../components/organisms/ProjectTimeline';
import ROITrendChart from '../../../components/organisms/ROITrendChart';
`;

code = code.replace(/import ArtPlaceholder from '\.\.\/\.\.\/\.\.\/components\/atoms\/ArtPlaceholder';/, 
  "import ArtPlaceholder from '../../../components/atoms/ArtPlaceholder';\n" + importsToAdd);

const overviewRegex = /(<p className="text-slate-600 dark:text-slate-300 leading-relaxed">[\s\S]*?business impact.[\s\S]*?<\/p>)/;
code = code.replace(overviewRegex, "$1\n            <ProjectTimeline />");

const metricsRegex = /(<p className="text-slate-900 dark:text-white font-medium leading-snug">\{study.roi\}<\/p>[\s\S]*?<\/div>)/;
code = code.replace(metricsRegex, "$1\n            <ROITrendChart />");

fs.writeFileSync('src/app/case-studies/[slug]/page.tsx', code);
console.log('Patched case study page');
