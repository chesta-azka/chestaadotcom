const fs = require('fs');
let code = fs.readFileSync('src/pages/BlogHubPage.tsx', 'utf8');

const oldEffect = `  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () =>
      <SEOProvider `;

const newEffect = `  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [selectedCategory, searchQuery, selectedTag, onlyRecommended]);

  return (
    <>
      <SEOProvider `;

if (code.includes(oldEffect)) {
    code = code.replace(oldEffect, newEffect);
    fs.writeFileSync('src/pages/BlogHubPage.tsx', code);
}
