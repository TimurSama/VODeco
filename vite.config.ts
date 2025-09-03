import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: path.resolve(__dirname, "client"),
  base: '/',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client/src"),
      "@assets": path.resolve(__dirname, "client/src/assets"),
      "@components": path.resolve(__dirname, "client/src/components"),
      "@pages": path.resolve(__dirname, "client/src/pages"),
      "@hooks": path.resolve(__dirname, "client/src/hooks"),
      "@lib": path.resolve(__dirname, "client/src/lib"),
      "@types": path.resolve(__dirname, "client/src/types"),
      "@services": path.resolve(__dirname, "client/src/services"),
      "@context": path.resolve(__dirname, "client/src/context"),
      "@locales": path.resolve(__dirname, "client/src/locales"),
      "@shared": path.resolve(__dirname, "shared"),
    },
  },
  build: {
    target: 'es2015',
    outDir: 'dist/client',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-tabs'],
          utils: ['framer-motion', 'lucide-react', 'date-fns'],
          web3: ['ethers', '@tanstack/react-query'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  server: {
    port: 3000,
    host: true,
  },
  preview: {
    port: 4173,
    host: true,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', 'lucide-react'],
  },
})
