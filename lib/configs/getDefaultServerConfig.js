var webpack = require('webpack');

module.exports = function(options) {
  return {
    name: 'Server',
    webpack: {
      devtool: 'source-map',
      entry: './src/Server.js',
      output: {
        generator: 'simple',
        dest: './bin',
      },
      externals: {
        generator: 'node-modules',
        additional: ['os'],
      },
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
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('development'),
          'process.env.ENV': JSON.stringify('server'),
          '__GLOBALS__': {
            release: JSON.stringify(options.release || ''),
          },
        }),
        'abort-if-errors',
        'node-load-sourcemaps',
      ],
      node: {
        Buffer: false,
        process: false,
        global: false,
        __filename: true,
        __dirname: true,
        os: false,
      },
    },
  };
};
