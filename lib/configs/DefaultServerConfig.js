module.exports = {
  name: 'ProductionServer',
  webpack: {
    entry: './src/Server.es6.js',
    output: {
      generator: 'simple',
      dest: './bin',
    },
    resolve: {
      generator: 'npm-and-modules',
      extensions: ['', '.js', '.jsx', 'es6.js', '.json']
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
    postcss: [
      'autoprefixer',
    ]
  },
};
