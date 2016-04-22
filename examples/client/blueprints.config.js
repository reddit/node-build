var autoprefixer = require('autoprefixer');

module.exports = {
  extensions: true,
  webpack: {
    postcss: [
      autoprefixer({
        browsers: ['last 4 versions'],
      }),
    ],
  },
};
