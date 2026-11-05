import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base relativo: funciona igual en GitHub Pages (/repo/) que en local
export default defineConfig({ plugins: [react()], base: './' })
