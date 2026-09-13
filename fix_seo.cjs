const fs = require('fs');
let code = fs.readFileSync('src/lib/seo.ts', 'utf8');

if (!code.includes('generateQuizSchema')) {
  code += `\n
export const generateQuizSchema = (title: string, description: string, url: string) => {
  return {
    "@context": "https://schema.org",
    "@type": "Quiz",
    "name": title,
    "description": description,
    "url": url,
    "provider": {
      "@type": "Organization",
      "name": "CHESTAADOTCOM Academy"
    }
  };
};

export const generateCourseSchema = (title: string, description: string, url: string) => {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": title,
    "description": description,
    "provider": {
      "@type": "Organization",
      "name": "CHESTAADOTCOM Academy",
      "sameAs": "https://chestaa.com"
    }
  };
};
`;
  fs.writeFileSync('src/lib/seo.ts', code);
}
