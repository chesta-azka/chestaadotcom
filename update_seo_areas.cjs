const fs = require('fs');
let code = fs.readFileSync('src/lib/seo.ts', 'utf8');

const newAreas = `    "areaServed": [
      { "@type": "City", "name": "BSD City" },
      { "@type": "City", "name": "Cisauk" },
      { "@type": "City", "name": "Tangerang Selatan" },
      { "@type": "City", "name": "Tangerang" },
      { "@type": "City", "name": "Jakarta Selatan" },
      { "@type": "City", "name": "Jakarta Kota" },
      { "@type": "City", "name": "Bogor Rumpin" },
      { "@type": "City", "name": "Bogor Barat" },
      { "@type": "City", "name": "Bogor Utara" },
      { "@type": "City", "name": "Bogor Kota" },
      { "@type": "City", "name": "Depok" },
      { "@type": "City", "name": "Margonda" }
    ],`;

code = code.replace(
  /"areaServed": \[\s*\{\s*"@type":\s*"City",\s*"name":\s*"BSD City"\s*\},\s*\{\s*"@type":\s*"City",\s*"name":\s*"Cisauk"\s*\}\s*\],/,
  newAreas
);

const newProviderAreas = `      "areaServed": [
        { "@type": "City", "name": "BSD City" },
        { "@type": "City", "name": "Cisauk" },
        { "@type": "City", "name": "Tangerang Selatan" },
        { "@type": "City", "name": "Tangerang" },
        { "@type": "City", "name": "Jakarta Selatan" },
        { "@type": "City", "name": "Jakarta Kota" },
        { "@type": "City", "name": "Bogor" },
        { "@type": "City", "name": "Depok" }
      ]`;

code = code.replace(
  /"areaServed": \[\s*\{\s*"@type":\s*"City",\s*"name":\s*"BSD City"\s*\},\s*\{\s*"@type":\s*"City",\s*"name":\s*"Cisauk"\s*\},\s*\{\s*"@type":\s*"City",\s*"name":\s*"Tangerang"\s*\}\s*\]/g,
  newProviderAreas
);

fs.writeFileSync('src/lib/seo.ts', code);
