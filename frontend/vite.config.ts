// C:\Users\KIIT\WebstormProjects\PollPixel\frontend\vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    proxy: {
      '/auth': 'http://localhost:3000',  // Proxy for authentication routes
      '/polls': 'http://localhost:3000', // Proxy for poll-related routes
    },
  },
});
