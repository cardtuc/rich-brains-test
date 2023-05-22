const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@APP': path.resolve(__dirname, 'src')
    }
  }
};
