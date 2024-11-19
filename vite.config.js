import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import fs from 'fs';
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    port: 3000,
    host: true,
    proxy: {
      '/api': 'http://localhost:8080', // Replace with your backend server's URL
    },
    cors: true,
    // https: {
    //   key: fs.readFileSync('./localhost-key.pem'),
    //   cert: fs.readFileSync('./localhost.pem'),
    // },
    https: false,
  },
})
