module.exports = {
  name: 'ProductionServer',
  webpack: {
    entry: './lib/Server.es6.js',
    output: {
      generator: 'simple',
      dest: './bin',
    },
    resolve: {
      generator: 'npm-and-modules',
      extensions: ['', '.js', '.jsx', 'es6.js', '.json']
    },
    loaders: [
      'esnextreact',
      'json',
      'css',
      'less',
    ],
    plugins: [
      'extract-css',
      'bundle-common',
      'production-loaders',
      'set-node-env',
      'minify-and-treeshake',
      'abort-if-errors',
    ],
  },
};
