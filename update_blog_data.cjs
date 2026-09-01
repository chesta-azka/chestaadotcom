const fs = require('fs');

const path = 'src/data/blogData.ts';
let data = fs.readFileSync(path, 'utf8');

// Add imports
data = data.replace(
  "import { vibeCodingMdx } from '../content/vibeCodingArticle';",
  "import { vibeCodingMdx } from '../content/vibeCodingArticle';\nimport filosofiChestaMdx from '../content/filosofi-chesta-azka.mdx?raw';\nimport panduanSeoMdx from '../content/panduan-seo-lokal.mdx?raw';"
);

// Add to filosofi chesta
data = data.replace(
  "slug: 'filosofi-chesta-azka-programmer-estetika-mewah-harga-masuk-akal',",
  "slug: 'filosofi-chesta-azka-programmer-estetika-mewah-harga-masuk-akal', mdxContent: filosofiChestaMdx,"
);

// Add to panduan seo
data = data.replace(
  "slug: 'panduan-seo-lokal-cisauk-bsd-ranking-1-google',",
  "slug: 'panduan-seo-lokal-cisauk-bsd-ranking-1-google', mdxContent: panduanSeoMdx,"
);

fs.writeFileSync(path, data);
