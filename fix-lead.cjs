const fs = require('fs');
const path = 'src/components/organisms/LeadCaptureForm.tsx';
let code = fs.readFileSync(path, 'utf-8');

if (!code.includes("import toast from 'react-hot-toast';")) {
    code = code.replace("import React, { useState } from 'react';", "import React, { useState } from 'react';\nimport toast from 'react-hot-toast';");
}

code = code.replace(
  "setIsSubmitted(true);",
  "setIsSubmitted(true);\n    toast.success('Formulir berhasil diproses! Mengarahkan ke WhatsApp...');"
);

fs.writeFileSync(path, code);
