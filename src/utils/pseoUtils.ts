export interface PseoData {
  industry: string;
  city: string;
  title: string;
  description: string;
  hook: string;
  body: string;
  metric: string;
  metricLabel: string;
}

export function generateDynamicCopy(industryParam: string, cityParam: string): PseoData {
  const industry = industryParam ? industryParam.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : "Enterprise";
  const city = cityParam ? cityParam.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : "Jakarta";

  return {
    industry,
    city,
    title: `Jasa Web & AI ${industry} di ${city} | Chestaa B2B`,
    description: `Tinggalkan cara manual. Chestaa ngebangun arsitektur digital otonom khusus buat perusahaan ${industry} di ${city} biar ROAS meroket dan operasional autopilot.`,
    hook: `Jujurly, bisnis ${industry} di ${city} lagi red ocean banget. Kalau infrastruktur digital lo masih pakai template jadul, prospek lo bakal langsung lari ke kompetitor.`,
    body: `Kami menghadirkan solusi teknologi tingkat lanjut yang dirancang khusus untuk mengeliminasi inefisiensi operasional ${industry}. Dari integrasi sistem pembayaran otonom hingga pelacakan prospek berbasis AI di ${city}, Chestaa memastikan bisnis Anda memimpin pasar.`,
    metric: "Hingga 4.5x",
    metricLabel: `Lonjakan konversi digital untuk ${industry} di ${city}`
  };
}
