import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  envDir: '../',
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    port: 5173,
    watch: {
      usePolling: true,
    },
    allowedHosts: ['.nip.io', '.sslip.io'],
  },
});
// http://aleman.18.188.44.65.nip.io:5173/ mi servidor

/*
DNS comodin 
Configurar DNS wildcard.
*/
