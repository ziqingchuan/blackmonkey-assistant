import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  optimizeDeps: {
    include: ['mammoth','pdfjs-dist']
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'pdf.worker': ['pdfjs-dist/build/pdf.worker.min.mjs'],
        },
      },
    },
  },
  server: {
    port: 3000,
    host: false,
    proxy: {
      '/api': {
        target: 'http://0.0.0.0:8000',
      },
    },
  },
  base: './'
})
