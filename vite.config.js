import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/eduwave-landing/',
  server: {
    port: 3000,
    open: true
  },
  define: {
    global: 'globalThis',
  },
  optimizeDeps: {
    include: ['vue']
  }
})
