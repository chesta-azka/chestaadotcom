const fs = require('fs');
let code = fs.readFileSync('src/components/atoms/MetaTags.tsx', 'utf8');

// Insert generateLocalBusinessSchema into the helmet
if (!code.includes('const localBusinessLd = generateLocalBusinessSchema();')) {
  code = code.replace(
    /const websiteLd = generateWebSiteSchema\(\);/,
    'const websiteLd = generateWebSiteSchema();\n  const localBusinessLd = generateLocalBusinessSchema();'
  );

  code = code.replace(
    /<script type="application\/ld\+json">\{JSON.stringify\(websiteLd\)\}<\/script>/,
    '<script type="application/ld+json">{JSON.stringify(websiteLd)}</script>\n      <script type="application/ld+json">{JSON.stringify(localBusinessLd)}</script>'
  );
  
  fs.writeFileSync('src/components/atoms/MetaTags.tsx', code);
}
