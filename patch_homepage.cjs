const fs = require('fs');
let content = fs.readFileSync('src/pages/HomePage.tsx', 'utf-8');

// Add import
const importToAdd = "import InsightsSection from '../components/organisms/InsightsSection.tsx';\n";
content = content.replace("import BlogSection", importToAdd + "import BlogSection");

// Add section
const target = `<SectionGlassCard index={8} metaLabel="INSIGHTS">
        <BlogSection />
      </SectionGlassCard>`;
const replacement = `<SectionGlassCard index={8} metaLabel="INSIGHTS & BLOG">
        <BlogSection />
      </SectionGlassCard>

      <SectionSeparator />
      <SectionGlassCard index={9} metaLabel="TECH TRENDS">
        <InsightsSection />
      </SectionGlassCard>`;
      
content = content.replace(target, replacement);

fs.writeFileSync('src/pages/HomePage.tsx', content);
console.log("Patched HomePage.tsx");
