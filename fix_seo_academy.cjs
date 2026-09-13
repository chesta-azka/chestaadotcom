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

// Update generateCourseSchema
code = code.replace(
  /"provider":\s*\{\s*"@type":\s*"Organization",\s*"name":\s*"CHESTAADOTCOM Academy",\s*"sameAs":\s*"https:\/\/chestaa.com\/academy"\s*\}/,
  `"provider": ${providerObj}`
);

code = code.replace(
  /"provider":\s*\{\s*"@type":\s*"Organization",\s*"name":\s*"CHESTAADOTCOM Academy"\s*\}/,
  `"provider": ${providerObj}`
);

// We should also check for generateQuizSchema which might have similar provider
code = code.replace(
  /"provider":\s*\{\s*"@type":\s*"Organization",\s*"name":\s*"CHESTAADOTCOM Academy"\s*\}/g,
  `"provider": ${providerObj}`
);

fs.writeFileSync('src/lib/seo.ts', code);
