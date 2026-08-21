const fs = require('fs');
let meta = fs.readFileSync('src/components/atoms/MetaTags.tsx', 'utf-8');

const targetHelmet = `      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />`;

const replacementHelmet = `      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Local SEO / Geo Tags */}
      <meta name="geo.region" content="ID-BT" />
      <meta name="geo.placename" content={cityName || "Tangerang"} />
      <meta name="geo.position" content="-6.299;106.657" />
      <meta name="ICBM" content="-6.299, 106.657" />
`;

meta = meta.replace(targetHelmet, replacementHelmet);

fs.writeFileSync('src/components/atoms/MetaTags.tsx', meta);
console.log('Added geo tags to MetaTags.tsx');
