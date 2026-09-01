const fs = require('fs');
const path = 'src/data/blogData.ts';
let data = fs.readFileSync(path, 'utf8');

data = data.replace(
  "import filosofiChestaMdx from '../content/filosofi-chesta-azka.mdx?raw';",
  "import { filosofiChestaMdx } from '../content/filosofiChestaArticle';"
);

data = data.replace(
  "import panduanSeoMdx from '../content/panduan-seo-lokal.mdx?raw';",
  "import { panduanSeoMdx } from '../content/panduanSeoArticle';"
);

fs.writeFileSync(path, data);
