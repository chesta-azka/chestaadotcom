const fs = require('fs');
let code = fs.readFileSync('src/pages/ServiceDetailPage.tsx', 'utf-8');

if (!code.includes('import RelatedServices')) {
  code = code.replace(
    /import Breadcrumbs from '\.\.\/components\/atoms\/Breadcrumbs';/,
    `import Breadcrumbs from '../components/atoms/Breadcrumbs';\nimport RelatedServices from '../components/organisms/RelatedServices';`
  );
  
  code = code.replace(
    /<div className="max-w-\[1400px\] mx-auto px-6 md:px-12 py-32">\s*\{\/\* Core Benefits \*\/\}/,
    `<div className="max-w-[1400px] mx-auto px-6 md:px-12 py-32 flex flex-col lg:flex-row gap-16 lg:items-start">\n        <div className="flex-1 w-full">\n        {/* Core Benefits */}`
  );

  code = code.replace(
    /        <\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*\);\s*\}/,
    `        </div>\n        </div>\n        <aside className="w-full lg:w-[360px] shrink-0 sticky top-32">\n          <RelatedServices currentSlug={slug!} />\n        </aside>\n      </div>\n    </div>\n  );\n}`
  );

  fs.writeFileSync('src/pages/ServiceDetailPage.tsx', code);
  console.log('ServiceDetailPage updated.');
} else {
  console.log('Already updated.');
}
