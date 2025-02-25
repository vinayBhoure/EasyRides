import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    allowedHosts: ['6b7a-2409-40c4-35e-53cf-31ef-ad40-a8c4-2874.ngrok-free.app'],
  },
})
