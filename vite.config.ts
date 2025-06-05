import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  optimizeDeps: {
    include: ['mammoth', 'pdfjs-dist'],
  },
  build: {
    cssCodeSplit: true, // 确保 CSS 文件分割正常
    outDir: 'dist', // 确保输出目录为 dist
    assetsDir: 'assets', // 确保静态资源存放在 assets 中
    chunkSizeWarningLimit: 1500,
  },
  server: {
    port: 3000,
    host: true, // 确保可以通过局域网访问
    proxy: {
      '/api': {
        target: 'https://101.37.171.135:8000', // 确保地址和端口正确
        changeOrigin: true,
      },
    },
  },
  base: './',
});