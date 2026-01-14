import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

const BACKEND_URL = 'http://localhost:8000';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    watch: {
      usePolling: true,
    },
    allowedHosts: ['.nip.io', '.sslip.io'],
    proxy: {
      '/api': {
        target: BACKEND_URL,
        changeOrigin: true,
        secure: false,
      },
      '/media': {
        target: BACKEND_URL,
        changeOrigin: true,
        secure: false,
      },
      '/static': {
        target: BACKEND_URL,
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
// http://admin.18.188.44.65.nip.io:5173/ mi servidor
