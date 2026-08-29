const fs = require('fs');

function replaceViewport(path) {
  if (fs.existsSync(path)) {
    let code = fs.readFileSync(path, 'utf8');
    let newCode = code.replace(/viewport={{ once: true, margin: "-150px" }}/g, 'viewport={{ once: true, margin: "0px 0px -300px 0px" }}');
    if (code !== newCode) {
      fs.writeFileSync(path, newCode);
      console.log('Patched ' + path);
    }
  }
}

replaceViewport('src/pages/AboutPage.tsx');
replaceViewport('src/components/organisms/AboutMeSection.tsx');
