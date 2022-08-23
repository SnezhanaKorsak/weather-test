const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@/api': path.resolve(__dirname, 'src/api'),
      '@/App': path.resolve(__dirname, 'src/App'),
      '@/assets': path.resolve(__dirname, 'src/assets'),
      '@/components': path.resolve(__dirname, 'src/components'),
      '@/weather': path.resolve(__dirname, 'src/components/weather'),
      '@/constants': path.resolve(__dirname, 'src/constants'),
      '@/helpers': path.resolve(__dirname, 'src/helpers'),
      '@/hooks': path.resolve(__dirname, 'src/hooks'),
      '@/sass': path.resolve(__dirname, 'src/sass'),
      '@/store': path.resolve(__dirname, 'src/state/store.ts'),
      '@/sagas': path.resolve(__dirname, 'src/state/sagas'),
      '@/reducers': path.resolve(__dirname, 'src/state/reducers'),
      '@/types': path.resolve(__dirname, 'src/types'),
    },
  },
};
