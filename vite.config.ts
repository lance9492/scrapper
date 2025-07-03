import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react']
  },
  server: {
    historyApiFallback: true,
    middleware: [
      (req, res, next) => {
        // Handle client-side routing
        if (!req.url.includes('.') && req.url !== '/') {
          req.url = '/';
        }
        next();
      }
    ]
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
  base: '/'
});