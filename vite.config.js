import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // o 3D (three.js) é pesado por natureza e carrega separado, sob demanda
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: { three: ['three'] },
      },
    },
  },
})
