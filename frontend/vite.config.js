import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/register': {
        target: 'http://localhost:3000', // Backend server
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      '@shardcn/ui': '/node_modules/@shardcn/ui',
      'pdfjs-dist': path.resolve(__dirname, 'node_modules/pdfjs-dist'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'pdf.worker': ['pdfjs-dist/build/pdf.worker.mjs'],
        },
      },
    },
  },
});
