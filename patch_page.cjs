const fs = require('fs');
const filePath = 'src/app/case-studies/[slug]/page.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Add the import for RelatedCaseStudiesSlider
if (!content.includes('RelatedCaseStudiesSlider')) {
  content = content.replace(
    "import ROITrendChart from '../../../components/organisms/ROITrendChart';",
    "import ROITrendChart from '../../../components/organisms/ROITrendChart';\nimport RelatedCaseStudiesSlider from '../../../components/organisms/RelatedCaseStudiesSlider';"
  );
}

// 2. Replace the Related Case Studies Section with the new component
const startTag = "{/* Related Case Studies Section */}";
const endTag = "      </div>\n    </main>";
const startIndex = content.indexOf(startTag);
const endIndex = content.indexOf(endTag);

if (startIndex !== -1 && endIndex !== -1) {
  content = content.substring(0, startIndex) +
    `<RelatedCaseStudiesSlider relatedStudies={relatedStudies} />\n` +
    content.substring(endIndex);
  
  fs.writeFileSync(filePath, content);
  console.log("Patched page.tsx successfully!");
} else {
  console.log("Could not find start/end tags in page.tsx");
}
