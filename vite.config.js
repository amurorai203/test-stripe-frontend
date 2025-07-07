/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/create-checkout-session': 'http://localhost:8888',
    },
  },
  test: {
    environment: 'jsdom', // for React component tests
    globals: true,
    setupFiles: './src/setupTests.js', // optional for setup
  },
});
