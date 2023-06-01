/// <reference types="vitest" />
/** @type {import('vite').UserConfig} */

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    exclude: ['node_modules', 'e2e'],
  },
  resolve: {
    alias: {
      '@lib': '/src/lib',
    },
  },
})
