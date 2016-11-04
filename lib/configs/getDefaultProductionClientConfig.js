var ManifestPlugin = require('webpack-manifest-plugin');
var loaders = require('./clientLoaders');

module.exports = function(options) {
  return {
    name: 'ProductionClient',
    sentryProject: options.sentryProject || '',
    release: options.release || '',
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
        {
          generator: 'clean-directories',
          paths: [ 'build/' ],
        },
        {
          generator: 'extract-css',
          contenthash: true,
        },
        {
          generator: 'set-node-env',
          'process.env': { ENV: JSON.stringify('client') },
          '__GLOBALS__': { release: JSON.stringify(options.release || '') },
        },
        'production-loaders',
        'minify-and-treeshake',
        'abort-if-errors',
        new ManifestPlugin(),
      ],
    },
  };
};
