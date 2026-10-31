import React, { useEffect, useRef, useState } from 'react';
import { detectMotionMode } from '../../lib/motion';

interface SmartImageProps {
  imageKey?: string;
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  badgeLabel?: string;
  viewTransitionName?: string;
  disableClipReveal?: boolean;
}

const IMAGE_KEY_MAP: Record<string, { src: string; alt: string; width: number; height: number }> = {
  ogDefault: {
    src: '/images/og-default.svg',
    alt: 'Ilustrasi layanan pembuatan website, AI agent, software custom, dan otomasi workflow CHESTAADOTCOM',
    width: 1200,
    height: 630,
  },
  projectWaConciergeKlinik: {
    src: '/images/portfolio/klinik-estetika-bsd.svg',
    alt: 'Ilustrasi contoh proyek WA Concierge agen booking WhatsApp untuk klinik dengan pengecekan slot terapis',
    width: 1200,
    height: 900,
  },
  projectDashboardKafe: {
    src: '/images/portfolio/dashboard-logistik-tangsel.svg',
    alt: 'Ilustrasi contoh proyek Dashboard Operasional Kafe untuk memantau stok bahan dan penjualan harian cabang',
    width: 1200,
    height: 900,
  },
  projectLeadProperti: {
    src: '/images/portfolio/properti-interior-bintaro.svg',
    alt: 'Ilustrasi contoh proyek Alur Lead Properti dari formulir iklan ke CRM dan jadwal follow-up otomatis',
    width: 1200,
    height: 900,
  },
  projectLandingKlinikEstetika: {
    src: '/images/blog/checklist-landing-page-konversi.svg',
    alt: 'Ilustrasi contoh proyek Landing Page Klinik Estetika dengan daftar perawatan, harga mulai dari, dan tombol WhatsApp',
    width: 1280,
    height: 720,
  },
  projectChestaaV2: {
    src: '/images/blog/landing-page-lambat-iklan-boncos.svg',
    alt: 'Ilustrasi contoh proyek membangun ulang situs dua bahasa chestaa.com yang statis dan cepat',
    width: 1280,
    height: 720,
  },
  projectPemrosesDokumen: {
    src: '/images/portfolio/asisten-kualifikasi-klien-konsultan.svg',
    alt: 'Ilustrasi contoh proyek Pemroses Dokumen AI yang mengekstrak data dokumen ke tabel dengan tinjauan manusia',
    width: 1200,
    height: 900,
  },
};

export default function SmartImage({
  imageKey,
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
  badgeLabel,
  viewTransitionName,
  disableClipReveal = false,
}: SmartImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(priority);
  const [inView, setInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);

  const keyOrSrc = imageKey || src || 'ogDefault';
  const mapped = IMAGE_KEY_MAP[keyOrSrc];
  const resolvedSrc = src && (src.startsWith('/') || src.startsWith('http'))
    ? src
    : mapped?.src || (keyOrSrc.startsWith('cover-') ? `/images/blog/covers/${keyOrSrc.slice(6)}.svg` : '/images/og-default.svg');
  const resolvedAlt = alt || mapped?.alt || 'Ilustrasi software custom dan AI agent CHESTAADOTCOM';
  const resolvedWidth = width || mapped?.width || 1200;
  const resolvedHeight = height || mapped?.height || 900;

  useEffect(() => {
    const el = imgRef.current;
    if (!el || priority) {
      setInView(true);
      return;
    }
    if (detectMotionMode() === 'reduced') {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -24px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [priority]);

  const transitionStyle: React.CSSProperties | undefined = viewTransitionName
    ? ({ viewTransitionName } as React.CSSProperties)
    : undefined;

  if (hasError || !resolvedSrc) {
    return (
      <div
        role="img"
        aria-label={resolvedAlt}
        className={`relative overflow-hidden bg-gradient-to-br from-[#FFFFFF] via-[#F8F6FE] to-[#EFEAFB] border border-[rgba(91,60,196,0.14)] flex flex-col justify-between p-6 select-none ${className}`}
        style={{
          aspectRatio: `${resolvedWidth} / ${resolvedHeight}`,
          ...transitionStyle,
        }}
      >
        <div className="relative z-10 flex items-center justify-between text-xs font-mono text-[#5B5675]">
          <span className="font-semibold text-[#17122B]">CHESTAADOTCOM</span>
          {badgeLabel && <span className="text-[#6A3FD0] font-medium">{badgeLabel}</span>}
        </div>
        <div className="relative z-10 my-auto py-4">
          <div className="w-10 h-0.5 bg-[#7C54E0] mb-3 rounded-full" />
          <p className="text-sm sm:text-base font-semibold text-[#17122B] line-clamp-2 max-w-md">
            {resolvedAlt}
          </p>
        </div>
      </div>
    );
  }

  const revealedState = isLoaded && inView ? 'loaded' : 'pending';

  return (
    <img
      ref={imgRef}
      src={resolvedSrc}
      alt={resolvedAlt}
      width={resolvedWidth}
      height={resolvedHeight}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'async' : 'async'}
      // @ts-ignore
      fetchPriority={priority ? 'high' : 'auto'}
      onLoad={() => setIsLoaded(true)}
      onError={() => setHasError(true)}
      data-img-state={disableClipReveal ? 'loaded' : revealedState}
      style={transitionStyle}
      className={`bg-[#F8F6FE] object-cover card-image-zoom ${
        disableClipReveal ? '' : 'img-clip-reveal'
      } ${isLoaded ? 'opacity-100' : 'opacity-90'} ${className}`}
    />
  );
}
