module.exports = {
  extensions: true,
  webpack: {
    postcss: [
      {
        generator: 'autoprefixer-custom',
        numVersions: 4,
      },
    ],
  },
};
