import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: 'ColorGrid_Game',
  test:{
    globals: true,
    environment: "jsdom",
    setupFiles:"./src/setupTests.js",
  },
});
