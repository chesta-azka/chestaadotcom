export interface RealProjectExperience {
  id: string;
  tagId: string;
  tagEn: string;
  titleId: string;
  titleEn: string;
  descriptionId: string;
  descriptionEn: string;
  valueNoteId?: string;
  valueNoteEn?: string;
}

export const REAL_PROJECTS_EXPERIENCE: RealProjectExperience[] = [
  {
    id: 'minuman',
    tagId: 'Proyek nyata · klien dirahasiakan',
    tagEn: 'Real project · client kept confidential',
    titleId: 'Sistem pencatatan untuk brand minuman',
    titleEn: 'Recording system for a beverage brand',
    descriptionId:
      'Sistem yang mencatat dan menghitung suhu, membukukan barang, dan melacak barang yang gagal untuk sebuah brand minuman. Proyek ini bernilai di atas Rp100 juta.',
    descriptionEn:
      'A system that records and logs temperature, logs inventory, and tracks defective items for a beverage brand. This project was valued above IDR 100 million.',
    valueNoteId: 'Bernilai di atas Rp100 juta',
    valueNoteEn: 'Valued above IDR 100 million',
  },
  {
    id: 'pesantren',
    tagId: 'Proyek nyata · klien dirahasiakan',
    tagEn: 'Real project · client kept confidential',
    titleId: 'Sistem internal pondok pesantren',
    titleEn: 'Internal system for an Islamic boarding school (pesantren)',
    descriptionId: 'Sistem internal untuk menunjang operasional sebuah pondok pesantren.',
    descriptionEn: 'An internal system to support operations for an Islamic boarding school (pesantren).',
  },
  {
    id: 'gudang',
    tagId: 'Proyek nyata · klien dirahasiakan',
    tagEn: 'Real project · client kept confidential',
    titleId: 'Sistem gudang logistik',
    titleEn: 'Logistics warehouse management system',
    descriptionId: 'Sistem untuk mengelola operasional sebuah gudang logistik.',
    descriptionEn: 'A system to manage operations for a logistics warehouse.',
  },
];

export const EXPERIENCE_FOOTER_NOTE = {
  id: 'Masih ada beberapa proyek lain. Kami ceritakan detailnya saat audit gratis, sesuai izin klien.',
  en: 'We have built several other projects. We share details during the free audit, subject to client permission.',
};

export const EXPERIENCE_DISCLOSURE_NOTE = {
  id: 'Nama klien tidak kami tampilkan tanpa izin tertulis. Studi kasus bernama kami tambahkan setelah klien mengizinkan.',
  en: 'Client names are not displayed without written permission. Named case studies are added once clients grant permission.',
};
