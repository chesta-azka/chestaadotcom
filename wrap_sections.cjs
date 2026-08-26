const fs = require('fs');
let code = fs.readFileSync('patch_snap_bookmark.cjs_temp', 'utf8');

// The spring component that wraps section content
const springProps = 'initial={{ scale: 0.95, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 120, damping: 14, mass: 1 }} viewport={{ amount: 0.3 }}';

// For each section, we can replace `<section id="..." ...>` with the same section, and wrap its children in `<motion.div className="w-full max-w-full flex flex-col justify-center" ${springProps}>`
// However, the structure is already complex, adding a wrapper might mess up some absolute positioning (like in Hero or AI scope).
// It's safer to apply the spring props directly to the `<section>` elements! Let's just change `<section` to `<motion.section` and add the props!

const springPropsAttr = ' initial={{ scale: 0.96, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 200, damping: 20, mass: 1 }} viewport={{ amount: 0.1, margin: "-50px" }} ';

code = code.replace(/<section id="([^"]+)" className="/g, '<motion.section id="$1" ' + springPropsAttr + ' className="');
code = code.replace(/<\/section>/g, '</motion.section>');

// We also need to fix Hero section which is already modified? No, I didn't replace `<section>` tags previously.
// Let's write it to the actual file.
fs.writeFileSync('src/pages/ServicesPage.tsx', code);
