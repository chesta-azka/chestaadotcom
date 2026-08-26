const fs = require('fs');

let content = fs.readFileSync('src/utils/sitemap.ts', 'utf8');

// Add imports for PROJECTS and ALL_ARTICLES
content = content.replace(
  "import { SERVICE_DEFINITIONS } from '../data/ServiceDefinition';",
  "import { SERVICE_DEFINITIONS } from '../data/ServiceDefinition';\nimport { PROJECTS } from '../data/projects';\nimport { ALL_ARTICLES } from '../data/blogData';"
);

// Add project and article routes
content = content.replace(
  "const serviceRoutes = SERVICE_DEFINITIONS.map(service => `/layanan/${service.slug}`);",
  "const serviceRoutes = SERVICE_DEFINITIONS.map(service => `/layanan/${service.slug}`);\nconst projectRoutes = PROJECTS.map(p => `/portfolio/${p.id}`);\nconst articleRoutes = ALL_ARTICLES.map(a => `/blog?read=${a.slug}`);"
);

// Combine routes
content = content.replace(
  "const allRoutes = [...baseRoutes, ...areaRoutes, ...serviceRoutes, ...localGeoRoutes];",
  "const allRoutes = [...baseRoutes, ...areaRoutes, ...serviceRoutes, ...localGeoRoutes, ...projectRoutes, ...articleRoutes];"
);

fs.writeFileSync('src/utils/sitemap.ts', content);
