import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import {
  BLOG_POSTS,
  ENGLISH_BLOG_POSTS,
  BLOG_CATEGORIES,
  getBlogPaginationSlice,
} from '../src/data/blog-posts';
import { ALL_CANONICAL_COVER_SPECS } from '../src/data/blog-cover-specs';
import {
  buildCover,
  buildOgCardSvg,
  buildGenericPageOgCardSvg,
  getRouteOgPngPath,
} from '../src/lib/cover-generator';
import { getAllSitemapRoutes } from '../src/utils/sitemapGenerator';
import { getMetaTagsForUrl } from '../src/lib/social-meta';
import { parseLocalizedPath } from '../src/lib/i18n';
import { ALL_SERVICE_AREA_PAGES_ID } from '../src/data/areas';
import { getServiceAreaPath } from '../src/data/services';
import { getAllUnifiedAreaPages, getUnifiedAreaPath } from '../src/data/unified-areas';

import { getRealProjectBySlug } from '../src/data/experience';

async function renderSvgToPngFile(svgString: string, outAbsPath: string): Promise<void> {
  fs.mkdirSync(path.dirname(outAbsPath), { recursive: true });
  const pngBuffer = await sharp(Buffer.from(svgString, 'utf8'))
    .resize(1200, 630, { fit: 'fill' })
    .png({ compressionLevel: 9, palette: true, quality: 90 })
    .toBuffer();
  fs.writeFileSync(outAbsPath, pngBuffer);
}

function getCategoryLabelForRoute(routePath: string, locale: 'id' | 'en'): string {
  const { barePath } = parseLocalizedPath(routePath);
  if (barePath === '/') {
    return locale === 'en' ? 'WEB & AI AGENT STUDIO' : 'STUDIO WEB & AI AGENT';
  }
  if (barePath.startsWith('/jasa/') && barePath.split('/').length === 4) {
    return locale === 'en' ? 'LOCAL SERVICE AREA' : 'AREA LAYANAN LOKAL';
  }
  if (barePath.startsWith('/jasa/')) {
    return locale === 'en' ? 'CORE SERVICE' : 'LAYANAN UTAMA';
  }
  if (barePath.startsWith('/area/')) {
    return locale === 'en' ? 'LOCAL SERVICE AREA' : 'AREA LAYANAN LOKAL';
  }
  if (barePath === '/area') {
    return locale === 'en' ? 'SERVICE AREAS' : 'AREA LAYANAN';
  }
  if (barePath.startsWith('/portfolio/')) {
    const slug = barePath.replace('/portfolio/', '').trim();
    if (getRealProjectBySlug(slug)) {
      return locale === 'en' ? 'REAL PROJECT' : 'PROYEK NYATA';
    }
    return locale === 'en' ? 'SAMPLE PROJECT' : 'CONTOH PROYEK';
  }
  if (barePath === '/portfolio') {
    return locale === 'en' ? 'PROJECTS' : 'PROYEK';
  }
  if (barePath.startsWith('/case-studies/')) {
    return locale === 'en' ? 'SAMPLE CASE STUDY' : 'STUDI KASUS CONTOH';
  }
  if (barePath === '/case-studies') {
    return locale === 'en' ? 'SAMPLE CASE STUDIES' : 'STUDI KASUS CONTOH';
  }
  if (barePath.startsWith('/blog/topik/')) {
    return locale === 'en' ? 'TOPIC CLUSTER' : 'KLASTER TOPIK';
  }
  if (barePath.startsWith('/blog')) {
    return locale === 'en' ? 'ENGINEERING NOTES' : 'CATATAN REKAYASA';
  }
  return 'CHESTAADOTCOM';
}

export async function generateAllCoversAndOgCards(): Promise<{
  coversWritten: number;
  ogCardsWritten: number;
}> {
  const coversDir = path.resolve(process.cwd(), 'public/images/blog/covers');
  fs.mkdirSync(coversDir, { recursive: true });

  let coversWritten = 0;
  for (const spec of ALL_CANONICAL_COVER_SPECS) {
    const svg = buildCover(spec);
    const outPath = path.join(coversDir, `${spec.canonicalSlug}.svg`);
    fs.writeFileSync(outPath, svg, 'utf8');
    coversWritten++;
  }

  let ogCardsWritten = 0;
  const writtenOgPaths = new Set<string>();

  // 1. Render 1200x630 PNGs for all 35 ID + 35 EN blog posts
  for (const idPost of BLOG_POSTS) {
    const ogSvg = buildOgCardSvg({
      title: idPost.title,
      category: idPost.category,
      locale: 'id',
      spec: idPost.coverSpec,
    });
    const relPath = idPost.ogImage; // /images/og/id/blog/{slug}.png
    const outPath = path.resolve(process.cwd(), 'public', relPath.replace(/^\//, ''));
    await renderSvgToPngFile(ogSvg, outPath);
    writtenOgPaths.add(relPath);
    ogCardsWritten++;
  }

  for (const enPost of ENGLISH_BLOG_POSTS) {
    const ogSvg = buildOgCardSvg({
      title: enPost.title,
      category: enPost.category,
      locale: 'en',
      spec: enPost.coverSpec,
    });
    const relPath = enPost.ogImage; // /images/og/en/blog/{slug}.png
    const outPath = path.resolve(process.cwd(), 'public', relPath.replace(/^\//, ''));
    await renderSvgToPngFile(ogSvg, outPath);
    writtenOgPaths.add(relPath);
    ogCardsWritten++;
  }

  // 2. Collect all non-blog routes (sitemap routes + paginated blog + prepared area routes + categories)
  const routeSet = new Set<string>();
  for (const r of getAllSitemapRoutes()) {
    routeSet.add(r.path);
  }
  const { totalPages } = getBlogPaginationSlice('id', 1);
  for (let p = 2; p <= totalPages; p++) {
    routeSet.add(`/id/blog/halaman/${p}`);
    routeSet.add(`/en/blog/page/${p}`);
  }
  for (const areaPage of ALL_SERVICE_AREA_PAGES_ID) {
    routeSet.add(getServiceAreaPath(areaPage.serviceSlug, areaPage.areaSlug, 'id'));
    routeSet.add(getServiceAreaPath(areaPage.serviceSlug, areaPage.areaSlug, 'en'));
  }
  for (const unifiedArea of getAllUnifiedAreaPages('id')) {
    routeSet.add(getUnifiedAreaPath(unifiedArea.slug, 'id'));
    routeSet.add(getUnifiedAreaPath(unifiedArea.slug, 'en'));
  }
  for (const cat of BLOG_CATEGORIES) {
    routeSet.add(`/id/blog/kategori/${cat.slug}`);
    routeSet.add(`/en/blog/kategori/${cat.slug}`);
  }

  for (const routePath of routeSet) {
    const relOgPath = getRouteOgPngPath(routePath);
    if (writtenOgPaths.has(relOgPath)) continue;

    const { locale } = parseLocalizedPath(routePath);
    const meta = getMetaTagsForUrl(routePath);
    const categoryLabel = getCategoryLabelForRoute(routePath, locale);
    const ogSvg = buildGenericPageOgCardSvg({
      routePath,
      title: meta.title,
      category: categoryLabel,
      locale,
    });
    const outPath = path.resolve(process.cwd(), 'public', relOgPath.replace(/^\//, ''));
    await renderSvgToPngFile(ogSvg, outPath);
    writtenOgPaths.add(relOgPath);
    ogCardsWritten++;
  }

  return { coversWritten, ogCardsWritten };
}

const isDirectRun =
  process.argv[1] &&
  (process.argv[1].endsWith('generate-covers.ts') ||
    process.argv[1].endsWith('generate-covers.mjs'));

if (isDirectRun) {
  generateAllCoversAndOgCards()
    .then(({ coversWritten, ogCardsWritten }) => {
      console.log(
        `Generated ${coversWritten} unique 1600x900 cover SVGs and ${ogCardsWritten} localized 1200x630 OpenGraph PNGs.`
      );
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
