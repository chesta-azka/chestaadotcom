import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(({command}) => {
  if (command === 'build') {
    (process.env as Record<string, string | undefined>).NODE_ENV = 'production';
  }
  return {
    plugins: [react(), tailwindcss()],
    envPrefix: ['VITE_', 'NEXT_PUBLIC_'],
    define:
      command === 'build'
        ? {
            'process.env.NODE_ENV': JSON.stringify('production'),
          }
        : undefined,
    build: {
      target: 'esnext',
      minify: 'esbuild',
      cssMinify: true,
      modulePreload: false,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/recharts')) {
              return 'vendor-recharts';
            }
            if (id.includes('node_modules/jspdf')) {
              return 'vendor-jspdf';
            }
            if (id.includes('node_modules/motion') || id.includes('node_modules/framer-motion')) {
              return 'vendor-motion';
            }
            if (id.includes('node_modules/@google/genai') || id.includes('node_modules/@ai-sdk')) {
              return 'vendor-ai';
            }
            if (id.includes('node_modules/react-syntax-highlighter')) {
              return 'vendor-syntax';
            }
            if (id.includes('node_modules/gsap') || id.includes('node_modules/lenis')) {
              return 'vendor-gsap';
            }
            if (id.includes('node_modules/cmdk')) {
              return 'vendor-cmdk';
            }
            if (
              /node_modules\/(react|react-dom|scheduler|react-router|react-router-dom)\//.test(id)
            ) {
              return 'vendor-react';
            }
          },
        },
      },
      chunkSizeWarningLimit: 1500,
      reportCompressedSize: false,
    },
    resolve: {
      conditions: command === 'build' ? ['module', 'browser', 'production'] : undefined,
      alias: {
        'firebase/app': path.resolve(__dirname, 'src/lib/firebase-stub.ts'),
        'firebase/auth': path.resolve(__dirname, 'src/lib/firebase-stub.ts'),
        'firebase/firestore': path.resolve(__dirname, 'src/lib/firebase-stub.ts'),
        'firebase/storage': path.resolve(__dirname, 'src/lib/firebase-stub.ts'),
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
