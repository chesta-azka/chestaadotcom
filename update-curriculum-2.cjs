const fs = require('fs');
const data = require('./src/data/academy-curriculum.json');

data['nextjs-enterprise'] = {
  title: 'Next.js Enterprise Architect',
  modules: [
    {
      id: 'module-1',
      title: 'Modul 1: Next.js App Router Masterclass',
      submodules: [
        {
          id: 'sub-1-1',
          title: '1.1 Server Components vs Client Components',
          content: 'Next.js membedakan komponen secara fundamental. Server components merender HTML di server dan tidak mengirimkan bundle JS yang besar ke browser, meningkatkan performa.',
          lang: 'tsx',
          filename: 'page.tsx',
          code: 'export default async function ServerPage() {\n  const data = await db.query();\n  return <div>{data.title}</div>;\n}'
        }
      ]
    }
  ]
};

fs.writeFileSync('./src/data/academy-curriculum.json', JSON.stringify(data, null, 2));
