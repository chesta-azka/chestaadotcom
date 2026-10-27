import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Card,
  Badge,
  Tag,
} from '../components/ui/DesignSystem';
import coversManifest from '../data/generated-covers-manifest.json';

interface ManifestItem {
  coverId: string;
  canonicalSlug: string;
  enSlug: string;
  cluster: string;
  hero: string;
  variant: string;
  motif: string;
  layoutVariant: string;
  accentToken: string;
  seed: number;
  labels: string[];
  coverPath: string;
  idOgPath: string;
  enOgPath: string;
  byteSize: number;
  sha256: string;
  dHashHex: string;
  altId: string;
  altIdLen: number;
  altEn: string;
  altEnLen: number;
  minHammingDistance: number;
  nearestNeighborSlug: string;
}

export default function DevCoversPage() {
  const [viewMode, setViewMode] = useState<'covers' | 'og-id' | 'og-en'>('covers');
  const [selectedCluster, setSelectedCluster] = useState<string>('all');

  const items = (coversManifest.items || []) as ManifestItem[];
  const filtered =
    selectedCluster === 'all'
      ? items
      : items.filter((item) => item.cluster === selectedCluster);

  const clusters = Array.from(new Set(items.map((item) => item.cluster)));

  return (
    <div className="bg-[#FFFFFF] text-[#17122B] min-h-screen pt-28 pb-24">
      <section>
        <Container>
          <header className="max-w-4xl mb-10 space-y-3">
            <Badge variant="tint">DEV VERIFICATION · GENERATIVE BLOG COVER ENGINE</Badge>
            <h1 className="text-[32px] md:text-[42px] font-semibold tracking-tight text-[#17122B]">
              Blog Cover &amp; OpenGraph Verification Grid ({items.length} Bilingual Pairs)
            </h1>
            <p className="text-[15.5px] text-[#5B5675] leading-[1.68]">
              Every post renders a deterministic 1600×900 cover SVG and localized 1200×630 OpenGraph cards with zero shared fallbacks, unique SHA-256 content hashes, unique <code>(cluster, motif, layoutVariant, accentToken)</code> tuples, and pairwise 64-bit perceptual <code>dHash</code> Hamming distance &ge; 10 bits (current minimum across 595 pairs:{' '}
              <strong className="text-[#6A3FD0]">
                {coversManifest.minPairwiseHammingDistance} bits
              </strong>
              ).
            </p>

            <div className="pt-3 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setViewMode('covers')}
                  className={`px-4 py-2 rounded-full font-mono text-[11px] uppercase tracking-[0.08em] cursor-pointer transition-colors ${
                    viewMode === 'covers'
                      ? 'bg-[#6A3FD0] text-[#FFFFFF] font-semibold'
                      : 'bg-[#F8F6FE] text-[#17122B] border border-[rgba(91,60,196,0.16)]'
                  }`}
                >
                  1600×900 Article Covers (35)
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('og-id')}
                  className={`px-4 py-2 rounded-full font-mono text-[11px] uppercase tracking-[0.08em] cursor-pointer transition-colors ${
                    viewMode === 'og-id'
                      ? 'bg-[#6A3FD0] text-[#FFFFFF] font-semibold'
                      : 'bg-[#F8F6FE] text-[#17122B] border border-[rgba(91,60,196,0.16)]'
                  }`}
                >
                  1200×630 OG Cards · ID (35)
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('og-en')}
                  className={`px-4 py-2 rounded-full font-mono text-[11px] uppercase tracking-[0.08em] cursor-pointer transition-colors ${
                    viewMode === 'og-en'
                      ? 'bg-[#6A3FD0] text-[#FFFFFF] font-semibold'
                      : 'bg-[#F8F6FE] text-[#17122B] border border-[rgba(91,60,196,0.16)]'
                  }`}
                >
                  1200×630 OG Cards · EN (35)
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setSelectedCluster('all')}
                  className={`px-3 py-1.5 rounded-full font-mono text-[11px] uppercase cursor-pointer ${
                    selectedCluster === 'all'
                      ? 'bg-[#17122B] text-[#FFFFFF]'
                      : 'bg-[#F8F6FE] text-[#5B5675] border border-[rgba(91,60,196,0.14)]'
                  }`}
                >
                  All ({items.length})
                </button>
                {clusters.map((cluster) => (
                  <button
                    key={cluster}
                    type="button"
                    onClick={() => setSelectedCluster(cluster)}
                    className={`px-3 py-1.5 rounded-full font-mono text-[11px] cursor-pointer ${
                      selectedCluster === cluster
                        ? 'bg-[#17122B] text-[#FFFFFF]'
                        : 'bg-[#F8F6FE] text-[#5B5675] border border-[rgba(91,60,196,0.14)]'
                    }`}
                  >
                    {cluster}
                  </button>
                ))}
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item, idx) => {
              const imgSrc =
                viewMode === 'covers'
                  ? item.coverPath
                  : viewMode === 'og-id'
                    ? item.idOgPath
                    : item.enOgPath;
              const imgAlt = viewMode === 'og-en' ? item.altEn : item.altId;

              return (
                <Card
                  key={item.coverId}
                  variant="soft"
                  padding="none"
                  className="overflow-hidden flex flex-col justify-between border border-[rgba(91,60,196,0.16)]"
                >
                  <div>
                    <div className="bg-[#F8F6FE] border-b border-[rgba(91,60,196,0.14)] overflow-hidden">
                      <img
                        src={imgSrc}
                        alt={imgAlt}
                        width={viewMode === 'covers' ? 1600 : 1200}
                        height={viewMode === 'covers' ? 900 : 630}
                        loading={idx < 6 ? 'eager' : 'lazy'}
                        className="w-full h-auto block"
                      />
                    </div>

                    <div className="p-5 space-y-3">
                      <div className="flex items-center justify-between gap-2 font-mono text-[11px] text-[#6A3FD0]">
                        <span className="font-semibold">
                          #{idx + 1} · {item.hero} ({item.variant})
                        </span>
                        <span>{(item.byteSize / 1024).toFixed(1)} KB</span>
                      </div>

                      <div>
                        <Tag>{item.cluster}</Tag>
                        <h2 className="mt-1 text-[15px] font-semibold text-[#17122B] leading-snug">
                          <Link
                            to={`/id/blog/${item.canonicalSlug}`}
                            className="hover:text-[#6A3FD0] transition-colors"
                          >
                            {item.canonicalSlug}
                          </Link>
                        </h2>
                        <p className="mt-0.5 font-mono text-[11px] text-[#5B5675] truncate">
                          EN:{' '}
                          <Link
                            to={`/en/blog/${item.enSlug}`}
                            className="hover:text-[#6A3FD0] underline"
                          >
                            {item.enSlug}
                          </Link>
                        </p>
                      </div>

                      <div className="p-3 rounded-[14px] bg-[#FFFFFF] border border-[rgba(91,60,196,0.12)] font-mono text-[11px] text-[#3E3954] space-y-1">
                        <div>
                          <span className="text-[#5B5675]">Tuple:</span> {item.motif} ·{' '}
                          {item.layoutVariant} · {item.accentToken}
                        </div>
                        <div>
                          <span className="text-[#5B5675]">Seed:</span> {item.seed} ·{' '}
                          <span className="text-[#5B5675]">Labels:</span>{' '}
                          {item.labels.join(' / ')}
                        </div>
                        <div>
                          <span className="text-[#5B5675]">SHA-256:</span>{' '}
                          {item.sha256.slice(0, 16)}…
                        </div>
                        <div>
                          <span className="text-[#5B5675]">dHash:</span> 0x{item.dHashHex}{' '}
                          <span className="text-[#6A3FD0] font-semibold">
                            (min dist: {item.minHammingDistance}b)
                          </span>
                        </div>
                      </div>

                      <div className="text-[12px] text-[#5B5675] space-y-1">
                        <p>
                          <strong className="text-[#17122B]">
                            Alt ID ({item.altIdLen}c):
                          </strong>{' '}
                          {item.altId}
                        </p>
                        <p>
                          <strong className="text-[#17122B]">
                            Alt EN ({item.altEnLen}c):
                          </strong>{' '}
                          {item.altEn}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>
    </div>
  );
}
