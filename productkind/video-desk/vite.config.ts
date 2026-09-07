import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

/** The API is a separate stdlib python process; the dev server proxies to it so there is no CORS. */
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5273,
    proxy: { '/api': 'http://127.0.0.1:5274' },
  },
})
