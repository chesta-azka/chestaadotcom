const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

// Update Portfolio Section
code = code.replace(
  /<section className="w-full max-w-6xl mx-auto mt-12 flex flex-col items-center relative z-10 px-4">/,
  `<motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
        }}
        className="w-full max-w-6xl mx-auto mt-12 flex flex-col items-center relative z-10 px-4">`
);
// Make sure to replace its closing tag
code = code.replace(
  /<\/FeaturedCaseStudies>\s*<\/section>/,
  '</FeaturedCaseStudies>\n      </motion.section>'
);

// Update About Section
code = code.replace(
  /<section className="w-full max-w-6xl mx-auto mt-24 mb-16 px-4 relative z-10">/,
  `<motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
        }}
        className="w-full max-w-6xl mx-auto mt-24 mb-16 px-4 relative z-10">`
);

// Make sure to replace its closing tag
code = code.replace(
  /<\/div>\s*<\/section>\s*<\/main>/,
  '</div>\n        </div>\n      </motion.section>\n    </main>'
);

fs.writeFileSync('src/app/page.tsx', code);
