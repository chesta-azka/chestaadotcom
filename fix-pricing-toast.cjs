const fs = require('fs');
const path = 'src/components/organisms/AutomatedPricingLogic.tsx';
let code = fs.readFileSync(path, 'utf-8');

if (!code.includes("import toast from 'react-hot-toast';")) {
    code = code.replace("import React, { useState, useEffect } from 'react';", "import React, { useState, useEffect } from 'react';\nimport toast from 'react-hot-toast';");
}

code = code.replace(
  "setIsCalculating(true);\n    setTimeout(() => {",
  "setIsCalculating(true);\n    const toastId = toast.loading('Menghitung estimasi proyek...');\n    setTimeout(() => {\n      toast.success('Estimasi berhasil dihitung!', { id: toastId });"
);

fs.writeFileSync(path, code);
