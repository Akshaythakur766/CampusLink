import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@CampusLink/core': path.resolve(__dirname, 'src/core'),
      '@CampusLink/coreComponents': path.resolve(__dirname, 'src/components'),
      '@CampusLink/common': path.resolve(__dirname, 'src/common'),
      '@CampusLink/auth': path.resolve(__dirname, 'src/auth'),
      '@CampusLink/assets': path.resolve(__dirname, 'src/assets'),
      '@CampusLink/pages': path.resolve(__dirname, 'src/pages'),
      '@CampusLink/setting-module': path.resolve(__dirname, 'src/libs/settings-module'),
      '@CampusLink/calendar-module': path.resolve(__dirname, 'src/libs/calendar-module'),
      '@CampusLink/appComponents': path.resolve(__dirname, 'src/libs/components'),
      '@CampusLink/hooks': path.resolve(__dirname, 'src/libs/hooks'),
      '@CampusLink/config': path.resolve(__dirname, 'src/libs/config'),
      '@CampusLink/helper': path.resolve(__dirname, 'src/libs/helper'),

    },
  },
});
