const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

// The replacement was:
// code = code.replace(
//   /<\/FeaturedCaseStudies>\s*<\/section>/,
//   '</FeaturedCaseStudies>\n      </motion.section>'
// );
// Wait, the original code had: <FeaturedCaseStudies />\n      </section>
// Let's use string operations instead.

code = code.replace(/<\/section>/g, '</motion.section>');

// Remove the extra </div> we accidentally added at the end
code = code.replace(/<\/div>\n        <\/div>\n      <\/motion\.section>\n    <\/main>/, '</div>\n      </motion.section>\n    </main>');

fs.writeFileSync('src/app/page.tsx', code);
