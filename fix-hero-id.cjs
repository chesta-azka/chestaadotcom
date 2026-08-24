const fs = require('fs');
const path = 'src/components/organisms/HeroSection.tsx';
let code = fs.readFileSync(path, 'utf-8');

code = code.replace(
  "Kami membangun Scalable Cloud Architecture dan menerapkan Agentic AI Integration untuk mengakselerasi ekspansi dan automasi proses bisnis.",
  "Kami merancang arsitektur cloud berkinerja tinggi dan mengintegrasikan kecerdasan buatan (AI) terdepan untuk mempercepat ekspansi serta otomatisasi bisnis Anda."
);
code = code.replace(">Agentic Automation<", ">Otomatisasi Cerdas<");
code = code.replace(">Enterprise Security<", ">Keamanan Korporasi<");

fs.writeFileSync(path, code);
