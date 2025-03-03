import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      '846c-187-190-28-36.ngrok-free.app',
      // Puedes añadir otros hosts si los necesitas
    ]
  }
})