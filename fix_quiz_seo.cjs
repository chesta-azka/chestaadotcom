const fs = require('fs');
let code = fs.readFileSync('src/lib/seo.ts', 'utf8');

const providerObj = `{
      "@type": ["Organization", "LocalBusiness", "EducationalOrganization"],
      "name": "CHESTAADOTCOM Academy",
      "sameAs": "https://chestaa.com/academy",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "BSD Green Office Park",
        "addressLocality": "Cisauk, Tangerang",
        "addressRegion": "Banten",
        "addressCountry": "ID"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": -6.3042,
        "longitude": 106.6439
      },
      "areaServed": [
        { "@type": "City", "name": "BSD City" },
        { "@type": "City", "name": "Cisauk" },
        { "@type": "City", "name": "Tangerang" }
      ]
    }`;

code = code.replace(
  /"about":\s*\{\s*"@type":\s*"Thing",\s*"name":\s*"Tech & Web Development Assessment"\s*\}/,
  `"about": {
      "@type": "Thing",
      "name": "Tech & Web Development Assessment"
    },
    "provider": ${providerObj}`
);

fs.writeFileSync('src/lib/seo.ts', code);
