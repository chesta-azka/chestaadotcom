const fs = require('fs');

let code = fs.readFileSync('src/pages/ServicesPage.tsx', 'utf8');

// If using window scroll, we shouldn't use h-screen overflow-y-auto. We should let it scroll naturally.
code = code.replace(
  '<div ref={containerRef} className="h-screen w-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory bg-[#fbfbfd]">',
  '<div ref={containerRef} className="w-full bg-[#fbfbfd] pt-24 pb-0">'
);

fs.writeFileSync('src/pages/ServicesPage.tsx', code);
