import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  envDir: '../',
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    watch: {
      usePolling: true,
    },
    allowedHosts: ['.nip.io', '.sslip.io'],
    // proxy: {
    //   '/api': {
    //     target: Env.VITE_API_URL,
    //     changeOrigin: true,
    //     secure: false,
    //   },
    //   '/media': {
    //     target: Env.VITE_API_URL,
    //     changeOrigin: true,
    //     secure: false,
    //   },
    //   '/static': {
    //     target: Env.VITE_API_URL,
    //     changeOrigin: true,
    //     secure: false,
    //   },
    // },
  },
});
// http://admin.18.188.44.65.nip.io:5173/ mi servidor
