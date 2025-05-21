import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
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
