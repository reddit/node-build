var loadNodeModules = require('./loadNodeModules');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  name: 'Server',
  webpack: {
    devtool: 'source-map',
    entry: './src/Server.js',
    output: {
      generator: 'simple',
      dest: './bin',
    },
    externals: loadNodeModules(),
    resolve: {
      generator: 'npm-and-modules',
      paths: ['src', 'lib'],
      extensions: ['', '.js', '.jsx', '.es6.js', '.json']
    },
    loaders: [
      'esnextreact',
      'json',
      'ignore-styles',
    ],
    plugins: [
      'abort-if-errors',
      'node-load-sourcemaps',
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
