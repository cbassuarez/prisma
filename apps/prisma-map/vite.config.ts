import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  base: "/prisma/",
  resolve: {
    alias: {
      '@prisma/config': path.resolve(__dirname, '../../packages/prisma-config/src')
    }
  },
  server: {
    port: 5173
  },
  build: {
    sourcemap: true
  }
});

