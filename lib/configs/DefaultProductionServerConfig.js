var loadNodeModules = require('./loadNodeModules');

module.exports = {
  name: 'ProductionServer',
  webpack: {
    entry: './src/Server.es6.js',
    output: {
      generator: 'simple',
      dest: './bin',
    },
    externals: loadNodeModules(),
    resolve: {
      generator: 'npm-and-modules',
      extensions: ['', '.js', '.jsx', '.es6.js', '.json']
    },
    loaders: [
      'esnextreact',
      'json',
      'ignore-styles',
    ],
    plugins: [
      'production-loaders',
      'set-node-env',
      'minify-and-treeshake',
      'abort-if-errors',
    ],
    node: {
      Buffer: false,
      process: false,
      global: false,
      __filename: true,
      __dirname: true,
    },
  },
};
