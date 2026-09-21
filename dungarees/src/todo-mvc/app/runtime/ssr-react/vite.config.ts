import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  // The packages this app is built from are workspace symlinks under the repository root, which
  // sits above this project root.
  server: {
    fs: { allow: ['../../../../../..'] },
  },
  build: {
    emptyOutDir: true,
  },
})
