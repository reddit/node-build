var ManifestPlugin = require('webpack-manifest-plugin');
var loaders = require('./clientLoaders');

module.exports = function() {
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
        'extract-css',
        'abort-if-errors',
        {
          generator: 'set-node-env',
          'process.env': { ENV: JSON.stringify('client') },
        },
        new ManifestPlugin(),
      ],
    },
  };
};
