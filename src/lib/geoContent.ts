export const getGeoContent = (pathOrArea: string) => {
  const lower = pathOrArea.toLowerCase();
  let area = 'Indonesia';
  
  if (lower.includes('bsd')) area = 'BSD City';
  else if (lower.includes('cisauk')) area = 'Cisauk';
  else if (lower.includes('tangerang') || lower.includes('tangsel')) area = 'Tangerang';
  else if (lower.includes('jakarta')) area = 'Jakarta';
  else if (lower.includes('bogor')) area = 'Bogor';
  else if (lower.includes('depok')) area = 'Depok';

  return {
    areaName: area,
    title: `Software House Premium di ${area} | Jasa Pembuatan Website`,
    description: `CHESTAADOTCOM melayani jasa pembuatan website premium dan automasi AI untuk bisnis di kawasan ${area}. Tingkatkan konversi penjualan Anda dengan arsitektur web modern.`,
    headerTitle: `Mitra Transformasi Digital Anda di ${area}`,
    headerSub: `Meningkatkan skala bisnis Enterprise dan UMKM di kawasan ${area} dengan High-Performance Web Development dan otomasi AI.`,
    keywords: `jasa pembuatan website ${area}, software house ${area}, web developer ${area}, ai automation ${area}`
  };
};
