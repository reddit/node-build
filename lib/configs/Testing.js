export default {
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
    externals: {
      generator: 'node-modules',
      additional: ['@r/platform/createTest'],
    },
  },
};
