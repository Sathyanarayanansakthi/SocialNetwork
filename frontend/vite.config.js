import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
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
    },
  },
});
