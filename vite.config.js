import { defineConfig } from 'vite' 
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  base: "/",  // Ensure correct asset loading
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});