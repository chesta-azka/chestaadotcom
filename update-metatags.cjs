const fs = require('fs');
let code = fs.readFileSync('src/components/atoms/MetaTags.tsx', 'utf-8');

const importsToAdd = `
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
`;

code = code.replace("import { Helmet } from 'react-helmet-async';", "import { Helmet } from 'react-helmet-async';" + importsToAdd);

const fetchLogic = `
  const [dynamicSeo, setDynamicSeo] = useState<{title?: string, description?: string}>({});

  useEffect(() => {
    const fetchSeo = async () => {
      try {
        const docId = path === '/' ? 'home' : path.replace(/\\//g, '_');
        const docRef = doc(db, 'seo_settings', docId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setDynamicSeo({
            title: data.title || undefined,
            description: data.description || undefined
          });
        }
      } catch (e) {
        console.error("Failed to fetch dynamic SEO:", e);
      }
    };
    fetchSeo();
  }, [path]);

  let finalTitle = dynamicSeo.title || title;
  finalTitle = finalTitle ? (finalTitle.includes('CHESTADOTCOM') || finalTitle.includes('chestaa') ? finalTitle : \`\${finalTitle} | CHESTADOTCOM\`) : defaultTitle;
`;

code = code.replace("let finalTitle = title ?", fetchLogic.replace("let finalTitle = dynamicSeo.title", "let finalTitle = dynamicSeo.title") + "\n  //");
code = code.replace("let finalTitle = title ? (title.includes('CHESTADOTCOM') || title.includes('chestaa') ? title : \`\${title} | CHESTADOTCOM\`) : defaultTitle;", "");
code = code.replace("let finalDesc = description || defaultDesc;", "let finalDesc = dynamicSeo.description || description || defaultDesc;");

fs.writeFileSync('src/components/atoms/MetaTags.tsx', code);
