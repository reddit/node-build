var _ = require('lodash');
var loadNodeModules = require('./loadNodeModules');

module.exports = {
  name: 'Test',
  webpack: {
    devtool: 'source-map',
    output: {
      path: './.test',
      filename: '[name]',
    },
    resolve: {
      generator: 'npm-and-modules',
      paths: ['src', 'lib'],
      extensions: ['', '.js', '.jsx', '.es6.js', '.json'],
    },
    loaders: [
      'esnextreact',
      'json',
      'ignore-styles',
    ],
    plugins: [
      'extract-css',
      'abort-if-errors',
    ],
    externals: _.extend({}, loadNodeModules(), {
      '@r/platform/createTest': 'commonjs @r/platform/createTest',
    }),
  }
}
