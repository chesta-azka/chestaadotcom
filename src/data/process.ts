export interface ProcessPhase {
  number: string;
  titleId: string;
  titleEn: string;
  descId: string;
  descEn: string;
}

export const PROCESS_PHASES: ProcessPhase[] = [
  {
    number: '01',
    titleId: 'Audit gratis (30 menit)',
    titleEn: 'Free audit (30 minutes)',
    descId:
      'Kamu cerita kerjaan yang paling menyita waktu. Kami bertanya, mencatat, dan bilang terus terang apa yang layak dikerjakan. Hasilnya: rekomendasi dan perkiraan biaya serta waktu.',
    descEn:
      'You share the work that consumes the most time. We ask questions, take notes, and speak candidly about what is worth building. Result: clear recommendations, estimated cost, and schedule.',
  },
  {
    number: '02',
    titleId: 'Proposal dan kesepakatan',
    titleEn: 'Proposal and agreement',
    descId:
      'Proposal tertulis memuat ruang lingkup, yang termasuk dan tidak termasuk, harga, jadwal, dan batas revisi. Biasanya kami kirim dalam 1x24 jam setelah audit. DP 50% dibayar sebelum pengerjaan dimulai.',
    descEn:
      'A written proposal details scope, inclusions and exclusions, price, schedule, and revision limits. Typically sent within 24 hours after the audit. 50% deposit before work begins.',
  },
  {
    number: '03',
    titleId: 'Rancang dan prototipe',
    titleEn: 'Design and prototype',
    descId:
      'Kamu melihat struktur atau alurnya sebelum dibangun penuh. Kami lanjut setelah kamu menyetujui bentuknya.',
    descEn:
      'You review the structure or flow before full construction. We proceed once you approve the layout.',
  },
  {
    number: '04',
    titleId: 'Bangun dan uji',
    titleEn: 'Build and test',
    descId:
      'Sistem dibangun dan diuji di HP serta dengan data contoh. Kamu menerima kabar progres rutin lewat WhatsApp.',
    descEn:
      'The system is built and tested on mobile devices and sample data. You receive regular progress updates via WhatsApp.',
  },
  {
    number: '05',
    titleId: 'Rilis dan handover',
    titleEn: 'Release and handover',
    descId:
      'Setelah uji akhir, sistem dirilis. Pelunasan dilakukan sebelum handover. Kamu menerima akses, dokumen, dan panduan singkat. Domain dan hosting atas namamu.',
    descEn:
      'Following final testing, the system is released. Final payment is made prior to handover. You receive full credentials, documentation, and a quick guide. Domain and hosting registered in your name.',
  },
  {
    number: '06',
    titleId: 'Rawat (opsional)',
    titleEn: 'Maintenance (optional)',
    descId:
      'Paket rawat bulanan mencakup pembaruan, cadangan, pengecekan kecepatan, dan penyesuaian.',
    descEn:
      'An optional monthly care package covers software updates, backups, speed checks, and minor adjustments.',
  },
];
