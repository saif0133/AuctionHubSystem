import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: {
    include: [
      '@mui/material',
      '@mui/system',
      '@mui/styled-engine',
      '@mui/utils',
    ],
  },
  build: {
    rollupOptions: {
      external: [
        '@mui/material/styles',
        '@mui/system',
        '@mui/styled-engine',
        '@mui/utils',
      ],
    },
  },
});
