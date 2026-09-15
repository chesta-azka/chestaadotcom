export interface InstructorInfo {
  name: string;
  role: string;
  avatarUrl?: string;
  bio?: string;
}

export interface MasterclassModule {
  title: string;
  slug: string;
  color: string;
  glow: string;
  number: string;
  desc: string;
  content?: string;
  instructorInfo?: InstructorInfo;
  modules?: any[];
}

export const ACADEMY_DATA: MasterclassModule[] = [
  {
    title: "Agentic AI Fundamentals",
    slug: "ai-agent-automation-bsd",
    color: "#06B6D4",
    glow: "rgba(6, 182, 212, 0.3)",
    number: "PATH-01",
    desc: "Kuasai arsitektur Agentic AI, Google Gemini, dan pembuatan AI agent otonom untuk otomatisasi workflow korporat secara praktikal.",
    instructorInfo: {
      name: "Chesta Adotcom",
      role: "Lead AI Engineer",
    },
    modules: [
      {
        id: "module-1",
        title: "Modul 1: Fondasi Agentic AI & Arsitektur",
        submodules: [
          {
            id: "sub-1-1",
            title: "1.1 Pergeseran Paradigma: Dari Chatbot ke AI Agent Otonom",
            content: "Dalam lanskap B2B enterprise modern, AI bukan sekadar alat untuk menjawab pertanyaan (chatbot). Agentic AI merepresentasikan entitas otonom yang dapat mengambil keputusan, memanggil fungsi eksternal (API), merencanakan langkah-langkah, dan mengeksekusi tugas kompleks tanpa intervensi manusia secara langsung.\n\n### Learning Outcomes\n- Memahami perbedaan fundamental antara LLM statis dan AI Agent otonom.\n- Mengenal konsep ReAct (Reasoning and Acting) dalam arsitektur AI.\n- Mampu memetakan kebutuhan otomatisasi korporasi (seperti customer support, data processing) ke dalam model Agentic AI.",
            lang: "typescript",
            filename: "agent-intro.ts",
            code: "// Contoh sederhana inisialisasi AI Client dengan kapabilitas tools\nimport { GoogleGenAI } from \"@google/genai\";\n\nconst ai = new GoogleGenAI({\n  apiKey: process.env.GEMINI_API_KEY\n});\n\n// Agentic AI bukan hanya memanggil generateContent, \n// melainkan memanfaatkan sistem \"Tools\" agar model bisa bertindak."
          },
          {
            id: "sub-1-2",
            title: "1.2 Pengenalan Google Gemini & Kapabilitas Function Calling",
            content: "Inti dari Agentic AI adalah kemampuan LLM (seperti Gemini 1.5 Pro) untuk memahami kapan ia perlu mengumpulkan data dari sistem eksternal (seperti database SQL, CRM, atau sistem pembayaran) sebelum memberikan respons akhir.\n\nIni dicapai melalui mekanisme **Function Calling**.\n\n### Mengapa Function Calling Penting di Skala Enterprise?\n1. **Akurasi Data (No Hallucination):** Agent tidak menebak data inventaris; ia memanggil API inventaris secara langsung.\n2. **Tindakan (Action):** Agent dapat diotorisasi untuk melakukan tindakan, misalnya membatalkan pesanan atau menjadwalkan meeting.",
            lang: "typescript",
            filename: "function-calling-concept.ts",
            code: "const checkInventoryTool = {\n  name: \"check_inventory\",\n  description: \"Mengecek stok produk di gudang berdasarkan SKU\",\n  parameters: {\n    type: \"OBJECT\",\n    properties: {\n      sku: {\n        type: \"STRING\",\n        description: \"SKU produk, contoh: LAPTOP-X1\"\n      }\n    },\n    required: [\"sku\"]\n  }\n};\n\n// Model akan memberikan JSON argumen { sku: \"...\" } \n// yang kemudian kita proses di backend (Node.js/Next.js)."
          }
        ]
      },
      {
        id: "module-2",
        title: "Modul 2: Implementasi Tool Usage (Function Calling) di Node.js",
        submodules: [
          {
            id: "sub-2-1",
            title: "2.1 Mendefinisikan Tools (Schema Definition)",
            content: "Langkah pertama membangun AI Agent adalah mendefinisikan \"peralatan\" (Tools) apa saja yang ia miliki. Kita menggunakan standar OpenAPI schema untuk mendeskripsikan alat tersebut kepada model Gemini.\n\n### Learning Outcomes\n- Mampu mendefinisikan parameter yang kuat dan deskriptif untuk Tool.\n- Mampu mengelompokkan beberapa Tools menjadi sebuah Tool Array untuk Agent.",
            lang: "typescript",
            filename: "tools-definition.ts",
            code: "import { Type } from \"@google/genai\";\n\n// Tool untuk mengecek status tiket IT Support\nexport const getTicketStatusTool = {\n  name: \"getTicketStatus\",\n  description: \"Mendapatkan status tiket IT support saat ini.\",\n  parameters: {\n    type: Type.OBJECT,\n    properties: {\n      ticketId: {\n        type: Type.STRING,\n        description: \"ID Tiket, contoh: TCK-1029\"\n      }\n    },\n    required: [\"ticketId\"]\n  }\n};\n\nexport const enterpriseTools = [getTicketStatusTool];"
          },
          {
            id: "sub-2-2",
            title: "2.2 Mengeksekusi Tools dan Mengembalikan Hasil ke Model",
            content: "Ketika model memutuskan bahwa ia perlu menggunakan sebuah Tool, model akan memberikan status \"functionCall\" beserta nama fungsi dan argumennya. Sistem backend kita bertugas mengeksekusi fungsi aslinya dan mengembalikan (return) hasilnya kembali ke model agar model dapat melanjutkan penalaran.\n\n### Alur Kerja (Workflow)\n1. User input: \"Bagaimana status tiket TCK-1029?\"\n2. Model merespons dengan panggilan fungsi `getTicketStatus({ ticketId: \"TCK-1029\" })`.\n3. Backend mengeksekusi SQL query atau API call.\n4. Backend mengirim kembali hasil JSON `{ status: \"In Progress\" }` ke model.\n5. Model memberikan jawaban final ke User: \"Tiket Anda sedang diproses oleh tim kami.\"",
            lang: "typescript",
            filename: "agent-execution.ts",
            code: "async function processAgent(userPrompt: string) {\n  const response = await ai.models.generateContent({\n    model: \"gemini-1.5-flash\",\n    contents: userPrompt,\n    tools: [{ functionDeclarations: [getTicketStatusTool] }]\n  });\n\n  // Periksa apakah model ingin memanggil tool\n  if (response.functionCalls && response.functionCalls.length > 0) {\n    const call = response.functionCalls[0];\n    if (call.name === \"getTicketStatus\") {\n      // Eksekusi fungsi backend asli\n      const args = call.args as { ticketId: string };\n      const dbResult = await fetchFromDB(args.ticketId);\n      \n      // Kembalikan hasilnya ke model\n      const finalResponse = await ai.models.generateContent({\n        model: \"gemini-1.5-flash\",\n        contents: [\n          { role: \"user\", parts: [{ text: userPrompt }] },\n          { role: \"model\", parts: [{ functionCall: call }] },\n          { role: \"user\", parts: [{ functionResponse: {\n            name: \"getTicketStatus\",\n            response: dbResult\n          }}]}\n        ]\n      });\n      return finalResponse.text;\n    }\n  }\n  return response.text;\n}"
          }
        ]
      },
      {
        id: "module-3",
        title: "Modul 3: Arsitektur Stateful Multi-Turn Agent",
        submodules: [
          {
            id: "sub-3-1",
            title: "3.1 Membangun Chat Session",
            content: "Di lingkungan produksi (production), interaksi dengan AI Agent jarang terjadi hanya dalam satu kali tanya jawab (single-turn). Agent harus mengingat konteks percakapan sebelumnya untuk memberikan pengalaman asisten virtual yang mulus.\n\nGoogle Gen AI SDK menyediakan metode `chats` yang otomatis melacak *history* pesan.",
            lang: "typescript",
            filename: "chat-session.ts",
            code: "const chat = ai.chats.create({\n  model: \"gemini-1.5-flash\",\n  tools: [{ functionDeclarations: enterpriseTools }]\n});\n\n// Pesan pertama\nlet res = await chat.sendMessage({ message: \"Halo, saya ingin melacak tiket.\" });\nconsole.log(res.text);\n\n// Pesan kedua (model akan mengingat pesan pertama)\nres = await chat.sendMessage({ message: \"Nomor tiket saya TCK-9999\" });\nconsole.log(res.text); // Model akan otomatis memanggil getTicketStatusTool"
          }
        ]
      }
    ]
  },
  {
    title: "Next.js Enterprise Architect",
    slug: "nextjs-enterprise",
    color: "#A855F7",
    glow: "rgba(168, 85, 247, 0.3)",
    number: "PATH-02",
    desc: "Pelajari pola desain React tingkat lanjut, SSR, dan optimasi performa ekstrem (Lighthouse 100) untuk skala jutaan pengguna.",
    instructorInfo: {
      name: "Chesta Adotcom",
      role: "Lead Frontend Engineer",
    },
    modules: [
      {
        id: "module-1",
        title: "Modul 1: Next.js App Router Masterclass",
        submodules: [
          {
            id: "sub-1-1",
            title: "1.1 Server Components vs Client Components",
            content: "Next.js membedakan komponen secara fundamental. Server components merender HTML di server dan tidak mengirimkan bundle JS yang besar ke browser, meningkatkan performa.",
            lang: "tsx",
            filename: "page.tsx",
            code: "export default async function ServerPage() {\n  const data = await db.query();\n  return <div>{data.title}</div>;\n}"
          }
        ]
      }
    ]
  },
  {
    title: "Advanced Agentic AI Workflows",
    slug: "advanced-agentic-ai-workflows",
    color: "#F59E0B",
    glow: "rgba(245, 158, 11, 0.3)",
    number: "PATH-03",
    desc: "Pelajari workflow kompleks, multi-agent system, dan interaksi advanced menggunakan API terbaru dari AI model.",
    instructorInfo: {
      name: "Chesta Adotcom",
      role: "AI Workflow Specialist",
    },
    modules: [
      {
        id: "module-1",
        title: "Modul 1: Multi-Agent Systems",
        submodules: [
          {
            id: "sub-1-1",
            title: "1.1 Orkestrasi Multi-Agent",
            content: "Dalam sistem enterprise skala besar, kita membutuhkan banyak spesialis agent yang saling berkomunikasi. Anda akan mempelajari arsitektur hirarki agent.",
            lang: "typescript",
            filename: "multi-agent.ts",
            code: "const supervisorAgent = createAgent({ role: 'supervisor', subAgents: [researcherAgent, writerAgent] });"
          }
        ]
      }
    ]
  }
];
