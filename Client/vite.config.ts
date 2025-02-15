import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@CampusLink/core': path.resolve(__dirname, 'src/core'),
      '@CampusLink/Components': path.resolve(__dirname, 'src/components'),
      '@CampusLink/common': path.resolve(__dirname, 'src/common'),
      '@CampusLink/auth': path.resolve(__dirname, 'src/auth'),
      '@CampusLink/assets': path.resolve(__dirname, 'src/assets'),
      '@CampusLink/pages': path.resolve(__dirname, 'src/pages'),
    },
  },
});
