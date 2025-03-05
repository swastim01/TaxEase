import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: '.',  // Ensure Vite starts from the correct directory
  build: {
    outDir: 'build',  // Ensures the output folder is correct
  }
});
