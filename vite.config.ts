import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/planets-frontend/',
  // forward requests to api/* to Railway backend
  server: {
    proxy: {
      '/api': {
        target: 'https://planets-backend-production.up.railway.app',
        changeOrigin: true,
        secure: false,
        // remove the /api prefix when forwarding to the target
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
})
