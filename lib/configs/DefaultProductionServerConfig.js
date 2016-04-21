module.exports = {
  name: 'ProductionServer',
  webpack: {
    entry: './Server.es6.js',
    output: {
      generator: 'simple',
      dest: '../bin',
    },
    resolve: {
      generator: 'npm-and-modules',
      extensions: ['', '.js', '.jsx', 'es6.js', '.json']
    },
    loaders: [
      'esnextreact',
      'json',
    ],
    plugins: [
      'bundle-common',
      'production-loaders',
      'set-node-env',
      'minify-and-treeshake',
      'abort-if-errors',
    ],
  },
};
