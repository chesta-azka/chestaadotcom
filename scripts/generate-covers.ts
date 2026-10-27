import fs from 'fs';
import path from 'path';
import { BLOG_POSTS, ENGLISH_BLOG_POSTS } from '../src/data/blog-posts';
import { ALL_CANONICAL_COVER_SPECS } from '../src/data/blog-cover-specs';
import { buildCover, buildOgCardSvg } from '../src/lib/cover-generator';

export function generateAllCoversAndOgCards(): {
  coversWritten: number;
  ogCardsWritten: number;
} {
  const coversDir = path.resolve(process.cwd(), 'public/images/blog/covers');
  const ogIdDir = path.resolve(process.cwd(), 'public/images/og/blog/id');
  const ogEnDir = path.resolve(process.cwd(), 'public/images/og/blog/en');

  fs.mkdirSync(coversDir, { recursive: true });
  fs.mkdirSync(ogIdDir, { recursive: true });
  fs.mkdirSync(ogEnDir, { recursive: true });

  let coversWritten = 0;
  for (const spec of ALL_CANONICAL_COVER_SPECS) {
    const svg = buildCover(spec);
    const outPath = path.join(coversDir, `${spec.canonicalSlug}.svg`);
    fs.writeFileSync(outPath, svg, 'utf8');
    coversWritten++;
  }

  let ogCardsWritten = 0;
  for (const idPost of BLOG_POSTS) {
    const ogSvg = buildOgCardSvg({
      title: idPost.title,
      category: idPost.category,
      locale: 'id',
      spec: idPost.coverSpec,
    });
    const outPath = path.join(ogIdDir, `${idPost.slug}.svg`);
    fs.writeFileSync(outPath, ogSvg, 'utf8');
    ogCardsWritten++;
  }

  for (const enPost of ENGLISH_BLOG_POSTS) {
    const ogSvg = buildOgCardSvg({
      title: enPost.title,
      category: enPost.category,
      locale: 'en',
      spec: enPost.coverSpec,
    });
    const outPath = path.join(ogEnDir, `${enPost.slug}.svg`);
    fs.writeFileSync(outPath, ogSvg, 'utf8');
    ogCardsWritten++;
  }

  return { coversWritten, ogCardsWritten };
}

const isDirectRun =
  process.argv[1] &&
  (process.argv[1].endsWith('generate-covers.ts') ||
    process.argv[1].endsWith('generate-covers.mjs'));

if (isDirectRun) {
  const { coversWritten, ogCardsWritten } = generateAllCoversAndOgCards();
  console.log(
    `Generated ${coversWritten} unique 1600x900 cover SVGs and ${ogCardsWritten} localized 1200x630 OpenGraph SVGs.`
  );
}
