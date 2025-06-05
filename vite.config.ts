import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  optimizeDeps: {
    include: ['mammoth', 'pdfjs-dist'],
  },
  build: {
    chunkSizeWarningLimit: 1500,
  },
  server: {
    port: 3000,
    host: true, // 确保可以通过局域网访问
    proxy: {
      '/api': {
        target: 'http://101.37.171.135:8000', // 确保地址和端口正确
        changeOrigin: true,
        secure: false, // 忽略 SSL 验证（仅用于开发环境）
      },
    },
  },
  base: './',
});