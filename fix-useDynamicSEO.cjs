const fs = require('fs');

let code = fs.readFileSync('src/lib/useDynamicSEO.ts', 'utf-8');

code = code.replace(
  /catch \(err\) \{\s*console\.error\("Failed to fetch dynamic SEO:", err\);\s*\}/,
  `catch (err: any) {
        // Fallback to default SEO if offline or permission denied
        if (err.message && err.message.includes('offline')) {
          console.warn("Firestore is offline. Using default SEO metadata.");
        } else {
          console.warn("Failed to fetch dynamic SEO (using defaults):", err.message);
        }
      }`
);

fs.writeFileSync('src/lib/useDynamicSEO.ts', code);
