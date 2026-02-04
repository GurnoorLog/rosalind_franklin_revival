// *VITE CONFIG* ⚙️
// Build Configuration - Gurnoor Tamber's development setup!
// All the build settings and environment variables! 🔧

import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// *CONFIG EXPORT* Gurnoor's Vite configuration! 🎯
export default defineConfig(({ mode }) => {
    // *ENV LOADER* Load environment variables! 🔑
    const env = loadEnv(mode, '.', '');
    return {
      // *SERVER SETTINGS* Port 3000, accessible from anywhere! 🌐
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()], // *REACT PLUGIN* Enable React support! ⚛️
      define: {
        // *API KEYS* Define environment variables for the build! 🔐
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'), // *PATH ALIAS* Shortcut for imports! 📁
        }
      }
    };
});
