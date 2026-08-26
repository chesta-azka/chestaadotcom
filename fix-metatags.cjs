const fs = require('fs');

let code = fs.readFileSync('src/components/atoms/MetaTags.tsx', 'utf-8');

code = code.replace(
  /catch \(e\) \{\s*console\.error\("Failed to fetch dynamic SEO:", e\);\s*\}/,
  `catch (e: any) {
        if (e.message && e.message.includes('offline')) {
          console.warn("Firestore is offline. Using default MetaTags.");
        } else {
          console.warn("Failed to fetch dynamic SEO (using defaults):", e.message);
        }
      }`
);

fs.writeFileSync('src/components/atoms/MetaTags.tsx', code);
