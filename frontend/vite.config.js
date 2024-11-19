import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server:{
    proxy:{
      '/backend' : {
        target: 'http://localhost:5000',
        secure: false,
      },
    },
  },
  plugins: [react()],
})
