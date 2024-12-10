import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
    },
  },
  build: {
    outDir: './build',
    emptyOutDir: true,
  },
  //server: { https: true },
  plugins: [react() /*basicSsl()*/],
});
