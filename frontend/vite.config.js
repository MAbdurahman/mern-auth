import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api/v1.0': {
        target: 'http://127.0.0.1:5000',
        secure: false,
      },
    },
  },
  plugins: [react()],
})