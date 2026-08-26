const fs = require('fs');
let code = fs.readFileSync('src/pages/ServicesPage.tsx', 'utf8');

// 1. Add variants
const variantDefinitions = `
const sectionVariants = {
  hidden: { scale: 0.94, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: {
      type: "spring", stiffness: 100, damping: 14, mass: 1,
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};
`;

code = code.replace("const FAQS = [", variantDefinitions + "\nconst FAQS = [");

// 2. Replace section motion props with variants
// Because of the exact strings, let's use regex
code = code.replace(/initial=\{\{ scale: 0\.94, opacity: 0 \}\} whileInView=\{\{ scale: 1, opacity: 1 \}\} transition=\{\{ type: "spring", stiffness: 100, damping: 14, mass: 1 \}\}/g, 'variants={sectionVariants} initial="hidden" whileInView="visible"');

// 3. Update children in each section
// Replace `initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}`
code = code.replace(/initial=\{\{ opacity: 0, y: 30 \}\} whileInView=\{\{ opacity: 1, y: 0 \}\} viewport=\{\{ once: true \}\} transition=\{\{ delay: i \* 0\.1 \}\}/g, 'variants={itemVariants}');
code = code.replace(/initial=\{\{ opacity: 0, y: 20 \}\} whileInView=\{\{ opacity: 1, y: 0 \}\} viewport=\{\{ once: true \}\} transition=\{\{ delay: i \* 0\.1 \}\}/g, 'variants={itemVariants}');
code = code.replace(/initial=\{\{ opacity: 0, scale: 0\.9 \}\} whileInView=\{\{ opacity: 1, scale: 1 \}\} viewport=\{\{ once: true \}\} transition=\{\{ delay: i \* 0\.1 \}\}/g, 'variants={itemVariants}');

// Remove hardcoded delays in non-mapped elements if we want them to stagger too
code = code.replace(/initial=\{\{ opacity: 0, y: 20 \}\} whileInView=\{\{ opacity: 1, y: 0 \}\} viewport=\{\{ once: true \}\}/g, 'variants={itemVariants}');
code = code.replace(/initial=\{\{ opacity: 0, y: 30 \}\} whileInView=\{\{ opacity: 1, y: 0 \}\} viewport=\{\{ once: true \}\}/g, 'variants={itemVariants}');
code = code.replace(/initial=\{\{ opacity: 0, x: -20 \}\} whileInView=\{\{ opacity: 1, x: 0 \}\} viewport=\{\{ once: true \}\}/g, 'variants={itemVariants}');
code = code.replace(/initial=\{\{ opacity: 0, scale: 0\.9 \}\} whileInView=\{\{ opacity: 1, scale: 1 \}\} viewport=\{\{ once: true \}\}/g, 'variants={itemVariants}');

fs.writeFileSync('src/pages/ServicesPage.tsx', code);
