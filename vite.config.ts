import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import copy from 'vite-plugin-copy'; // Adjust if necessary

export default defineConfig({
  plugins: [react(), copy({
    targets: [
      { src: 'src/legal.html', dest: 'dist' },
      { src: 'src/privacy.html', dest: 'dist' },
      { src: 'src/final project/login-signup page/login.html', dest: 'dist' }
    ]
  })],
  build: {
    outDir: 'dist', // Ensure this matches your publish directory
    rollupOptions: {
      external: [],
      manualChunks: {}
    }
  }
});
