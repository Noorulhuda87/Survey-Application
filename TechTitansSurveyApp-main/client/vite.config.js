/*import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})*/
/*
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  plugins: [react()],
  build: {
    manifest: true,
    rollupOptions: {
      input: "./src/main.jsx",
    },
  },
});
*/

import dotenv from 'dotenv';
dotenv.config();

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const { PORT = 3000 } = process.env;

const isLocal = process.env.NODE_ENV === 'development';

// https://vitejs.dev/config/
export default defineConfig({
    base: './',
    plugins: [react()],
    server: {
        proxy: {
            '/api': {
                target: isLocal ? `http://localhost:${PORT}` : 'https://techtitanssurveyapp.onrender.com',
                changeOrigin: true,
            },
            '/auth': {
                target: isLocal ? `http://localhost:${PORT}` : 'https://techtitanssurveyapp.onrender.com',
                changeOrigin: true,
            },
            
        },
    },
    build: {
        outDir: '../dist/app',
    },
});
