module.exports = {
  name: 'Client',
  webpack: {
    entry: './Client.es6.js',
    output: {
      generator: 'simple',
      dest: './bin',
    },
    resolve: {
      generator: 'npm-and-modules',
      extensions: ['', '.js', '.jsx', 'es6.js', '.json'],
    },
    loaders: [
      'esnextreact',
      'json',
    ],
    plugins: [
      'abort-if-errors',
    ],
  },
};
