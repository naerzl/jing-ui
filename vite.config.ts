import path from 'node:path'
import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const root = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  base: process.env.GITHUB_PAGES === 'true' ? '/jing-ui/' : '/',
  plugins: [react()],
  resolve: {
    alias: { '@': path.join(root, 'src') },
  },
})
