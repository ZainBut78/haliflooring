import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    watch: {
      usePolling: true,
    },
  },
  build: {
    // Image assets in src/assets/Images are referenced from content.js.
    assetsInlineLimit: 2048,
    cssCodeSplit: false,
  },
})
