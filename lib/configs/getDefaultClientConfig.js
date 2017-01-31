var webpack = require('webpack');
var ManifestPlugin = require('webpack-manifest-plugin');
var loaders = require('./clientLoaders');

module.exports = function(options) {
  return {
    name: 'Client',
    webpack: {
      devtool: 'source-map',
      entry: './src/Client.js',
      output: {
        generator: 'contenthash',
        dest: './build',
      },
      resolve: {
        generator: 'npm-and-modules',
        paths: ['src', 'lib'],
        extensions: ['', '.js', '.jsx', '.es6.js', '.json'],
      },
      loaders,
      plugins: [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('development'),
          'process.env.ENV': JSON.stringify('client'),
          '__GLOBALS__': {
            release: JSON.stringify(options.release || ''),
          },
        }),
        'extract-css',
        'abort-if-errors',
        new ManifestPlugin(),
      ],
    },
  };
};
