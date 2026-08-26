const fs = require('fs');
let code = `import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';

interface SEOProviderProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  keywords?: string;
}

export default function SEOProvider({ title: defaultTitle, description: defaultDesc, canonicalUrl, keywords }: SEOProviderProps) {
  const location = useLocation();
  const canonical = canonicalUrl || \`https://chestaa.com\${location.pathname}\`;
  
  const [title, setTitle] = useState(defaultTitle);
  const [description, setDescription] = useState(defaultDesc);
  const [ogImage, setOgImage] = useState('');

  useEffect(() => {
    // Reset to defaults when route changes
    setTitle(defaultTitle);
    setDescription(defaultDesc);
    setOgImage('');
    
    // Fetch custom overrides from Firestore
    const fetchDynamicSEO = async () => {
      try {
        const docId = location.pathname === '/' ? 'home' : location.pathname.replace(/\\//g, '_');
        const docRef = doc(db, 'seo_settings', docId);
        const snap = await getDoc(docRef);
        
        if (snap.exists()) {
          const data = snap.data();
          if (data.title) setTitle(data.title);
          if (data.description) setDescription(data.description);
          if (data.ogImage) setOgImage(data.ogImage);
        }
      } catch (err) {
        console.error("Failed to fetch dynamic SEO:", err);
      }
    };
    
    fetchDynamicSEO();
  }, [location.pathname, defaultTitle, defaultDesc]);

  return (
    <Helmet htmlAttributes={{ lang: 'id-ID' }}>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* OpenGraph Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content="website" />
      {ogImage && <meta property="og:image" content={ogImage} />}
      
      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}

      <link rel="canonical" href={canonical} />
    </Helmet>
  );
}
`;
fs.writeFileSync('src/components/atoms/SEOProvider.tsx', code);
