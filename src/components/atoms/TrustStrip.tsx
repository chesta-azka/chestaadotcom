import React from 'react';
import { Container } from '../ui/DesignSystem';

export interface TrustStripProps {
  locale?: 'id' | 'en';
  className?: string;
}

const TRUST_ITEMS = [
  {
    id: 'coding-since-2021',
    labelId: 'Menulis kode sejak 2021',
    labelEn: 'Writing code since 2021',
  },
  {
    id: 'real-systems',
    labelId: 'Sistem untuk produksi, pesantren, dan gudang logistik',
    labelEn: 'Systems for production, pesantren, and logistics warehouses',
  },
  {
    id: 'written-terms',
    labelId: 'Harga dan lingkup tertulis sebelum kamu bayar',
    labelEn: 'Price and scope written before you pay',
  },
  {
    id: 'client-ownership',
    labelId: 'Domain dan hosting atas namamu',
    labelEn: 'Domain and hosting in your name',
  },
];

export default function TrustStrip({ locale = 'id', className = '' }: TrustStripProps) {
  const isEn = locale === 'en';

  return (
    <div
      className={`w-full border-y border-[rgba(91,60,196,0.14)] bg-[#FFFFFF] py-3.5 ${className}`}
    >
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-3.5 gap-x-4 md:gap-x-6 items-center text-center">
          {TRUST_ITEMS.map((item) => (
            <div
              key={item.id}
              className="font-mono text-[11px] sm:text-[12px] uppercase tracking-[0.06em] text-[#5B5675] font-medium leading-tight flex items-center justify-center px-1"
            >
              <span>{isEn ? item.labelEn : item.labelId}</span>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
