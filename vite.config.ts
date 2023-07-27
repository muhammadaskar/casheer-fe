import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: ['0.0.0.0', '127.0.0.1'], // Replace with your desired IP address or leave it as '0.0.0.0'
    port: 3000,
  },
});
