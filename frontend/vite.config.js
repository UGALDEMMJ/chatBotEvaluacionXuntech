import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'; 

// Check if SSL certificates exist
let httpsConfig;
try {
  const key = fs.readFileSync('./certs/localhost-key.pem');
  const cert = fs.readFileSync('./certs/localhost.pem');
  httpsConfig = { key, cert };
} catch (error) {
  console.log('SSL certificates not found, running without HTTPS');
  httpsConfig = false;
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    https: httpsConfig,
    port: 5173,
    host: true,
  }
})
