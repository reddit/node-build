var _ = require('lodash');
var loadNodeModules = require('./loadNodeModules');

module.exports = {
  name: 'Test',
  webpack: {
    output: {
      path: './.test',
      filename: '[name]',
    },
    resolve: {
      generator: 'npm-and-modules',
      extensions: ['', '.js', '.jsx', '.es6.js', '.json'],
    },
    loaders: [
      'esnextreact',
      'json',
      'css',
      'less',
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
