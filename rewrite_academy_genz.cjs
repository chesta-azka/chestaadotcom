const fs = require('fs');

const curriculum = {
  "tutorialContent": [
    {
      "id": "module-1",
      "title": "Modul 1: The Blueprint (Web Architecture 101)",
      "content": "Welcome to the Academy, ngab! Modul ini bakal ngebekalin lo dengan basic concept & environment setup ala Pro Dev Enterprise. Biar lo nggak cuma jago ngetik kode, tapi ngerti fondasinya dari awal. No cap, ini penting banget sebelum lo terjun ke backend atau AI.",
      "submodules": [
        {
          "id": "sub-1-1",
          "title": "1.1. Paradigma Web: CSR vs SSR vs SSG vs ISR",
          "content": "Biar lo nggak fomo, lo harus paham bedanya rendering strategies. \n\n- **CSR (Client-Side Rendering)**: Semua di-render di browser lo (kayak React biasa). Red flag buat SEO karena lemot di awal.\n- **SSR (Server-Side Rendering)**: Di-render di server pas ada request masuk. Selalu fresh, tapi server lo bisa ngos-ngosan.\n- **SSG (Static Site Generation)**: Pre-render HTML pas build time. Super ngebut, cocok buat blog. \n- **ISR (Incremental Static Regeneration)**: Gabungan SSG + bisa update data di background tanpa nge-rebuild seluruh site. GOAT tier fr fr."
        },
        {
          "id": "sub-1-2",
          "title": "1.2. Setup Lingkungan Kerja (Node.js & NVM)",
          "content": "Jangan asal install Node.js dari website-nya, ntar bentrok versi! Pake NVM (Node Version Manager) biar lo bisa switch versi Node dengan gampang. Ini best practice di industri, biar project A dan project B lo nggak saling berantem dependensinya.",
          "code": "nvm install 20\nnvm use 20\nnode -v",
          "lang": "bash"
        },
        {
          "id": "sub-1-3",
          "title": "1.3. Inisialisasi Project (Next.js App Router)",
          "content": "Sekarang kita spin up project Next.js pake App Router terbaru. Kita pake TypeScript (biar strict & ga banyak bug siluman), Tailwind CSS (biar styling sat-set), dan ESLint. \n\nJalankan command ini di terminal lo:",
          "code": "npx create-next-app@latest enterprise-saas --typescript --tailwind --eslint\ncd enterprise-saas\nnpm run dev",
          "lang": "bash"
        },
        {
          "id": "sub-1-4",
          "title": "1.4. Konvensi Struktur Folder (Enterprise Standard)",
          "content": "Struktur folder yang rapi itu kunci kewarasan pas project udah gede. Jangan asal taro file di root! Ini contoh struktur folder ala Enterprise (Domain-Driven Design / Feature-based) yang biasa dipake di tech company gede:\n\n```text\nenterprise-saas/\n├── src/\n│   ├── app/              # Routing utama (App Router), layout, & page\n│   │   ├── (auth)/       # Route group (ngelompokin route auth)\n│   │   │   ├── login/page.tsx\n│   │   │   └── register/page.tsx\n│   │   ├── dashboard/    # Protected routes\n│   │   │   └── page.tsx\n│   │   ├── layout.tsx\n│   │   └── page.tsx      # Landing page\n│   ├── components/       # UI Components (Reusable)\n│   │   ├── atoms/        # Komponen terkecil (Button, Input)\n│   │   ├── molecules/    # Gabungan atoms (SearchBar, Card)\n│   │   └── organisms/    # Gabungan molecules (Header, Sidebar)\n│   ├── lib/              # Utility functions, config, instance (db, axios)\n│   ├── hooks/            # Custom React hooks (useAuth, useFetch)\n│   ├── types/            # TypeScript interfaces & types (global)\n│   └── styles/           # Global CSS (Tailwind base)\n├── public/               # Static assets (images, icons, fonts)\n├── next.config.mjs       # Config Next.js\n└── package.json\n```\n\nKenapa dipisah bgini? Biar gampang dicari, ngab! Bayangin lo punya 100 komponen, kalo disatuin semua di folder `components/` doang, pasti pusing carinya. Pake Atomic Design (atoms/molecules/organisms) bikin hirarki komponen lo lebih clear.",
          "lang": "text",
          "filename": "Folder Structure"
        }
      ]
    },
    {
      "id": "module-2",
      "title": "Modul 2: Vibe Coding & AI Integration",
      "content": "Masuk ke materi daging! Kita bakal bahas cara lo bisa chill sambil ngoding pake bantuan AI (Vibe Coding). Dan yang terpenting, gimana cara nyambungin LLM kayak Gemini ke dalam backend lo.",
      "submodules": [
        {
          "id": "sub-2-1",
          "title": "2.1. Apa itu Vibe Coding?",
          "content": "Vibe coding itu mindset ngoding di mana lo fokus ke 'flow' dan logika arsitektur, sisanya (ngetik boilerplate, nge-debug syntax error) serahin ke AI. Intinya lo jadi *Director*, AI jadi *Coder* lo. \n\nRules-nya:\n1. Tulis komentar yang jelas tentang *apa* yang mau lo buat (bukan *gimana*).\n2. Review code dari AI, jangan asal copy-paste (blind trust is a red flag!).\n3. Fokus ke struktur data dan flow aplikasi."
        },
        {
          "id": "sub-2-2",
          "title": "2.2. Setup Google Gemini SDK",
          "content": "Gak usah pusing bikin AI dari nol. Kita consume API dari Google Gemini. Pertama, install SDK resminya. \n\nInget, API Key itu rahasia (secret)! JANGAN PERNAH lo taruh di client-side (browser) atau di-push ke GitHub. Taro di `.env` dan panggil cuma dari server-side.",
          "code": "npm install @google/genai\n\n# Di dalam .env\nGEMINI_API_KEY=AIzaSyLoKeyLuBocorkePublikBahayaBosq",
          "lang": "bash"
        },
        {
          "id": "sub-2-3",
          "title": "2.3. Eksekusi API di Server-Side",
          "content": "Next.js App Router itu default-nya Server Component. Jadi aman buat manggil API key di sini. Ini contoh simpel bikin endpoint API buat generate text pake Gemini. \n\nPerhatiin kita pake `process.env.GEMINI_API_KEY`, ini ga bakal terekspos ke user di browser.",
          "code": "import { GoogleGenAI } from '@google/genai';\nimport { NextRequest, NextResponse } from 'next/server';\n\n// Initialize SDK pake key lo\nconst ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });\n\nexport async function POST(req: NextRequest) {\n  try {\n    const body = await req.json();\n    const prompt = body.prompt || 'Ceritain joke bapak-bapak dong';\n\n    const response = await ai.models.generateContent({\n      model: 'gemini-2.5-flash',\n      contents: prompt,\n    });\n\n    return NextResponse.json({ success: true, text: response.text });\n  } catch (error) {\n    return NextResponse.json({ success: false, message: 'Waduh, server ngambek' }, { status: 500 });\n  }\n}",
          "lang": "typescript",
          "filename": "app/api/generate/route.ts"
        }
      ]
    }
  ]
};

fs.writeFileSync('src/data/academy-curriculum.json', JSON.stringify(curriculum, null, 2));
console.log('Curriculum updated with Gen-Z tone and folder structure!');
