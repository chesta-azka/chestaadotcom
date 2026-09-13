const fs = require('fs');
let data = JSON.parse(fs.readFileSync('src/data/academy-curriculum.json', 'utf8'));

if (!data['ai-agent-automation-bsd']) {
  data['ai-agent-automation-bsd'] = {
    title: "AI Agent Automation for Enterprise",
    modules: [
      {
        id: "module-1",
        title: "Fundamental Agentic AI",
        submodules: [
          {
            id: "sub-1-1",
            title: "Pengenalan Arsitektur Agentic",
            content: "Dalam modul pertama ini, kita akan membahas pergeseran paradigma dari aplikasi konvensional ke AI mandiri (Agentic AI). Agentic AI memungkinkan sistem tidak hanya memproses input statis, tetapi mengambil keputusan dan menjalankan alat (tools) secara dinamis.\n\n### Mengapa Enterprise Membutuhkan AI Agents?\n1. **Otomatisasi Keputusan:** Sistem dapat membaca email masuk, membedakan komplain pelanggan vs pertanyaan umum, dan mengambil tindakan.\n2. **Integrasi Tools:** AI dapat langsung query ke database SQL atau mengakses API CRM eksternal tanpa campur tangan manusia.\n3. **Efisiensi Skala Besar:** Memangkas biaya operasional Customer Support dan Data Entry hingga 80%.",
            lang: "typescript",
            filename: "agent.ts",
            code: "import { GoogleGenAI } from '@google/genai';\n\nconst ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });\n\nasync function runAgent() {\n  // Inisialisasi model\n  const response = await ai.models.generateContent({\n    model: 'gemini-3.5-pro',\n    contents: 'Jelaskan arsitektur AI agent.',\n  });\n  console.log(response.text);\n}"
          },
          {
            id: "sub-1-2",
            title: "Membangun Tools API untuk Gemini",
            content: "Untuk membuat AI agent kita benar-benar sakti, kita harus memberikannya 'tangan' untuk berinteraksi dengan dunia luar. Dalam arsitektur Google Gen AI, ini dikenal sebagai **Function Calling** atau **Tool Usage**.\n\nKita akan mendefinisikan skema fungsi yang bisa dipanggil oleh model, dan bagaimana kita memproses argumen yang dihasilkan model untuk menjalankan aksi di server lokal kita (seperti query ke Cloud SQL).",
            lang: "typescript",
            filename: "tools.ts",
            code: "const searchDatabaseTool = {\n  name: 'search_database',\n  description: 'Mencari informasi pelanggan berdasarkan nama atau ID.',\n  parameters: {\n    type: 'OBJECT',\n    properties: {\n      query: { type: 'STRING' }\n    },\n    required: ['query']\n  }\n};\n\n// AI akan merespons dengan call untuk fungsi ini jika diperlukan."
          }
        ]
      }
    ]
  };
  fs.writeFileSync('src/data/academy-curriculum.json', JSON.stringify(data, null, 2));
}
