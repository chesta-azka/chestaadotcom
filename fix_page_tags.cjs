const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

// Fix closing tag for Portfolio section
code = code.replace(
  /<FeaturedCaseStudies \/>\n      <\/section>/,
  '<FeaturedCaseStudies />\n      </motion.section>'
);

// Fix extra closing div before the last </motion.section>
code = code.replace(
  /<\/div>\n        <\/div>\n        <\/div>\n      <\/motion\.section>/,
  '</div>\n        </div>\n      </motion.section>'
);

// Insert <hr /> separators after sections
code = code.replace(
  /<\/div>\n      <\/section>\n\n      \{\/\* Portfolio \/ Featured Case Studies Section \*\/\}/,
  '</div>\n      </section>\n      \n      <hr className="w-full border-t border-slate-200 m-0 p-0" />\n\n      {/* Portfolio / Featured Case Studies Section */}'
);

code = code.replace(
  /<\/FeaturedCaseStudies>\n      <\/motion\.section>\n\n      \{\/\* Simplified 'About' Section focused on IT Solution Expertise \*\/\}/,
  '</FeaturedCaseStudies>\n      </motion.section>\n      \n      <hr className="w-full border-t border-slate-200 m-0 p-0" />\n\n      {/* Simplified \'About\' Section focused on IT Solution Expertise */}'
);

fs.writeFileSync('src/app/page.tsx', code);
