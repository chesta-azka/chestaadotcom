const fs = require('fs');
const path = 'src/pages/BlogHubPage.tsx';
let code = fs.readFileSync(path, 'utf-8');

if (!code.includes('import Breadcrumbs')) {
    code = code.replace("import BlogSEO from '../components/atoms/BlogSEO.tsx';", "import BlogSEO from '../components/atoms/BlogSEO.tsx';\nimport Breadcrumbs from '../components/atoms/Breadcrumbs';");
}

const targetGrid = `<div className="mx-auto max-w-7xl px-6 w-full relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">`;
const replacementGrid = `<div className="mx-auto max-w-7xl px-6 w-full relative z-10">
                <Breadcrumbs items={[{ label: 'Insight', path: '/blog' }]} />
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mt-4">`;

if (code.includes(targetGrid)) {
    code = code.replace(targetGrid, replacementGrid);
    console.log("Updated BlogHubPage grid view");
}

const targetArticle = `<MetaTags 
              title={\`\${activeArticle.title} — CHESTADOTCOM Journal\`}`;
const replacementArticle = `<Breadcrumbs items={[{ label: 'Insight', path: '/blog' }, { label: activeArticle.title }]} />
            <MetaTags 
              title={\`\${activeArticle.title} — CHESTADOTCOM Journal\`}`;

if (code.includes(targetArticle)) {
    code = code.replace(targetArticle, replacementArticle);
    console.log("Updated BlogHubPage article view");
}

fs.writeFileSync(path, code);
