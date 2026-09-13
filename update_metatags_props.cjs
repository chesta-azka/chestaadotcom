const fs = require('fs');
let code = fs.readFileSync('src/components/atoms/MetaTags.tsx', 'utf8');

code = code.replace(
  /interface MetaTagsProps \{/,
  'interface MetaTagsProps {\n  schemaString?: string;'
);

code = code.replace(
  /export default function MetaTags\(\{ title, description, path = '\/', breadcrumbs, serviceName, cityName \}: MetaTagsProps\) \{/,
  'export default function MetaTags({ title, description, path = \'/\', breadcrumbs, serviceName, cityName, schemaString }: MetaTagsProps) {'
);

code = code.replace(
  /\{cityGeoLd && <script type="application\/ld\+json">\{JSON.stringify\(cityGeoLd\)\}<\/script>\}/,
  '{cityGeoLd && <script type="application/ld+json">{JSON.stringify(cityGeoLd)}</script>}\n      {schemaString && <script type="application/ld+json">{schemaString}</script>}'
);

fs.writeFileSync('src/components/atoms/MetaTags.tsx', code);
