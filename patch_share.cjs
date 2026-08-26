const fs = require('fs');

// ProjectDetailPage
let projectContent = fs.readFileSync('src/pages/ProjectDetailPage.tsx', 'utf8');
projectContent = projectContent.replace(
  "import Breadcrumbs from '../components/atoms/Breadcrumbs';",
  "import Breadcrumbs from '../components/atoms/Breadcrumbs';\nimport ShareButton from '../components/atoms/ShareButton';"
);
projectContent = projectContent.replace(
  /<Breadcrumbs items=\{\[\s*\{\s*label:\s*'Showcase',\s*path:\s*'\/portfolio'\s*\},\s*\{\s*label:\s*project\.title\s*\}\s*\]\}\s*\/>/s,
  `<div className="flex justify-between items-center mt-12 mb-8">
          <Breadcrumbs items={[
            { label: 'Showcase', path: '/portfolio' },
            { label: project.title }
          ]} />
          <ShareButton title={project.title} text={project.description} className="text-slate-500 hover:text-indigo-600 bg-white shadow-sm border border-slate-200 px-4 py-2 rounded-full transition-colors" />
        </div>`
);
fs.writeFileSync('src/pages/ProjectDetailPage.tsx', projectContent);

// ServiceDetailPage
let serviceContent = fs.readFileSync('src/pages/ServiceDetailPage.tsx', 'utf8');
serviceContent = serviceContent.replace(
  "import Breadcrumbs from '../components/atoms/Breadcrumbs';",
  "import Breadcrumbs from '../components/atoms/Breadcrumbs';\nimport ShareButton from '../components/atoms/ShareButton';"
);
serviceContent = serviceContent.replace(
  /<Breadcrumbs items=\{\[\s*\{\s*label:\s*'Layanan',\s*path:\s*'\/layanan'\s*\},\s*\{\s*label:\s*service\.title\s*\}\s*\]\}\s*\/>/s,
  `<div className="flex justify-between items-center mb-8">
          <Breadcrumbs items={[
            { label: 'Layanan', path: '/services' },
            { label: service.title }
          ]} />
          <ShareButton title={service.title} text={service.description} className="text-slate-500 hover:text-indigo-600 bg-white shadow-sm border border-slate-200 px-4 py-2 rounded-full transition-colors" />
        </div>`
);
fs.writeFileSync('src/pages/ServiceDetailPage.tsx', serviceContent);
