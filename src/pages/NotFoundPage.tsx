import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Home, Sparkles } from 'lucide-react';
import SEOMetadata from '../components/atoms/SEOMetadata';
import { Container, Card, Button, Badge } from '../components/ui/DesignSystem';

export default function NotFoundPage() {
  const location = useLocation();
  const path = location.pathname;

  let contextTitle = 'Halaman Tidak Ditemukan';
  let contextDesc =
    'Tautan yang kamu tuju tidak tersedia atau telah dipindahkan ke alamat baru.';
  let primaryActionLink = '/';
  let primaryActionLabel = 'Kembali ke Beranda';

  if (path.startsWith('/blog')) {
    contextTitle = 'Artikel Tidak Ditemukan';
    contextDesc =
      'Panduan yang kamu cari di direktori blog kami tidak tersedia atau slug-nya telah diperbarui.';
    primaryActionLink = '/blog';
    primaryActionLabel = 'Kembali ke Direktori Blog';
  } else if (path.startsWith('/services') || path.startsWith('/layanan') || path.startsWith('/jasa')) {
    contextTitle = 'Layanan Tidak Ditemukan';
    contextDesc = 'Halaman spesifikasi layanan yang kamu cari belum tersedia.';
    primaryActionLink = '/#layanan';
    primaryActionLabel = 'Lihat Layanan Kami';
  } else if (path.startsWith('/portfolio') || path.startsWith('/proyek')) {
    contextTitle = 'Blueprint Portofolio Tidak Ditemukan';
    contextDesc = 'Studi kasus yang kamu tuju belum terdaftar di basis data kami.';
    primaryActionLink = '/portfolio';
    primaryActionLabel = 'Lihat Semua Portofolio';
  }

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#17122B] flex flex-col items-center justify-center py-24 relative overflow-hidden">
      <SEOMetadata
        title={`${contextTitle} · CHESTAADOTCOM`}
        description={contextDesc}
        path={path}
        noindex
      />

      <Container className="max-w-xl">
        <Card variant="soft" padding="lg" className="text-center space-y-6">
          <Badge variant="outline">
            <Sparkles size={13} />
            <span>Error 404 · Halaman Hilang</span>
          </Badge>

          <div className="space-y-3">
            <h1>{contextTitle}</h1>
            <p className="text-[#5B5675] text-[15px] leading-[1.65]">
              {contextDesc}
            </p>
            <div className="pt-1 font-mono text-[11px] text-[#6A3FD0]">
              [ Alamat: {path} ]
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 pt-2">
            <Button to={primaryActionLink} variant="primary">
              <ArrowLeft size={16} />
              <span>{primaryActionLabel}</span>
            </Button>
            <Button to="/" variant="secondary">
              <Home size={16} />
              <span>Beranda</span>
            </Button>
          </div>

          <div className="pt-6 border-t border-[rgba(91,60,196,0.14)] flex flex-wrap justify-center gap-3 font-mono text-[11px] uppercase tracking-[0.08em] text-[#5B5675]">
            <Link to="/#layanan" className="py-1 hover:text-[#6A3FD0] transition-colors">
              Layanan
            </Link>
            <span>·</span>
            <Link to="/workflow" className="py-1 hover:text-[#6A3FD0] transition-colors">
              Cara Kerja
            </Link>
            <span>·</span>
            <Link to="/portfolio" className="py-1 hover:text-[#6A3FD0] transition-colors">
              Portofolio
            </Link>
            <span>·</span>
            <Link to="/blog" className="py-1 hover:text-[#6A3FD0] transition-colors">
              Blog
            </Link>
            <span>·</span>
            <Link to="/about" className="py-1 hover:text-[#6A3FD0] transition-colors">
              Tentang
            </Link>
          </div>
        </Card>
      </Container>
    </div>
  );
}
