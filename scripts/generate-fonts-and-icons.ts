import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

async function downloadFont(cssUrl: string, outPath: string) {
  const res = await fetch(cssUrl, {
    headers: {
      // Modern Chrome User-Agent to receive WOFF2 latin subset
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    },
  });
  const css = await res.text();
  // Match the/* latin */ block URL or the last url(...) in the CSS
  const latinBlockMatch = css.match(/\/\*\s*latin\s*\*\/[\s\S]*?src:\s*url\((https:\/\/[^)]+\.woff2)\)/i);
  const fallbackMatch = css.match(/url\((https:\/\/[^)]+\.woff2)\)/i);
  const woff2Url = latinBlockMatch?.[1] || fallbackMatch?.[1];
  if (!woff2Url) {
    throw new Error(`Could not find woff2 URL in CSS from ${cssUrl}`);
  }
  const fontRes = await fetch(woff2Url);
  const buf = Buffer.from(await fontRes.arrayBuffer());
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, buf);
  console.log(`Saved ${outPath} (${(buf.length / 1024).toFixed(1)} KB)`);
}

function createIcoFromPng(pngBuffer: Buffer, width = 32, height = 32): Buffer {
  // Standard ICO header (6 bytes) + 1 directory entry (16 bytes) + PNG payload
  const header = Buffer.alloc(22);
  header.writeUInt16LE(0, 0); // Reserved
  header.writeUInt16LE(1, 2); // Type 1 = ICO
  header.writeUInt16LE(1, 4); // 1 image

  header.writeUInt8(width === 256 ? 0 : width, 6); // Width
  header.writeUInt8(height === 256 ? 0 : height, 7); // Height
  header.writeUInt8(0, 8); // Color palette
  header.writeUInt8(0, 9); // Reserved
  header.writeUInt16LE(1, 10); // Color planes
  header.writeUInt16LE(32, 12); // Bits per pixel
  header.writeUInt32LE(pngBuffer.length, 14); // Image size
  header.writeUInt32LE(22, 18); // Offset to image data

  return Buffer.concat([header, pngBuffer]);
}

async function main() {
  const publicDir = path.resolve(process.cwd(), 'public');
  const fontsDir = path.join(publicDir, 'fonts');
  fs.mkdirSync(fontsDir, { recursive: true });

  // 1. Download Plus Jakarta Sans (variable latin woff2) and Inter (variable latin woff2)
  await downloadFont(
    'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700&display=swap',
    path.join(fontsDir, 'plus-jakarta-sans-latin.woff2')
  );
  await downloadFont(
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap',
    path.join(fontsDir, 'inter-latin.woff2')
  );

  // 2. Write brand mark on --purple-600 (#6A3FD0) background to public/favicon.svg
  const faviconSvg = `<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" rx="112" fill="#6A3FD0"/>
  <path d="M356 172C282 122 164 126 144 232C124 338 184 388 262 388C320 388 350 350 368 310" stroke="#FFFFFF" stroke-width="48" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <circle cx="352" cy="240" r="24" fill="#B9A2F2"/>
</svg>
`;
  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), faviconSvg, 'utf8');
  console.log('Saved public/favicon.svg');

  // Maskable 512x512 SVG (full bleed #6A3FD0 background with safe zone padding)
  const maskableSvg = `<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" fill="#6A3FD0"/>
  <path d="M346 184C280 140 176 144 158 236C140 328 194 372 262 372C314 372 340 338 356 304" stroke="#FFFFFF" stroke-width="44" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <circle cx="342" cy="244" r="22" fill="#B9A2F2"/>
</svg>
`;

  const svgBuf = Buffer.from(faviconSvg);
  const maskableBuf = Buffer.from(maskableSvg);

  // 3. Generate favicon.ico (32x32)
  const png32 = await sharp(svgBuf).resize(32, 32).png({ compressionLevel: 9 }).toBuffer();
  const icoBuf = createIcoFromPng(png32, 32, 32);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuf);
  console.log(`Saved public/favicon.ico (${icoBuf.length} bytes)`);

  // 4. Generate apple-touch-icon.png (180x180)
  await sharp(maskableBuf)
    .resize(180, 180)
    .png({ compressionLevel: 9 })
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('Saved public/apple-touch-icon.png (180x180)');

  // 5. Generate icon-192.png (192x192)
  await sharp(svgBuf)
    .resize(192, 192)
    .png({ compressionLevel: 9 })
    .toFile(path.join(publicDir, 'icon-192.png'));
  console.log('Saved public/icon-192.png (192x192)');

  // 6. Generate icon-512.png (512x512 maskable)
  await sharp(maskableBuf)
    .resize(512, 512)
    .png({ compressionLevel: 9 })
    .toFile(path.join(publicDir, 'icon-512.png'));
  console.log('Saved public/icon-512.png (512x512 maskable)');

  // 7. Write public/site.webmanifest
  const manifest = {
    name: 'CHESTAADOTCOM — Software Custom & AI Agent',
    short_name: 'CHESTAADOTCOM',
    description:
      'Pengembangan software custom, AI agent WhatsApp, otomasi workflow, dan pembuatan website di BSD, Tangerang Selatan dan Jabodetabek. Mulai Rp1.200.000.',
    start_url: '/id',
    display: 'standalone',
    background_color: '#FFFFFF',
    theme_color: '#6A3FD0',
    icons: [
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
  };
  fs.writeFileSync(path.join(publicDir, 'site.webmanifest'), JSON.stringify(manifest, null, 2) + '\n', 'utf8');
  console.log('Saved public/site.webmanifest');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
