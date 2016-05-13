module.exports = {
  name: 'ProductionClient',
  webpack: {
    devtool: 'source-map',
    entry: './src/Client.js',
    output: {
      generator: 'simple',
      dest: './bin',
    },
    resolve: {
      generator: 'npm-and-modules',
      paths: ['src', 'lib'],
      extensions: ['', '.js', '.jsx', '.es6.js', '.json']
    },
    loaders: [
      'esnextreact',
      'json',
      'css',
      'less',
    ],
    plugins: [
      'extract-css',
      'set-node-env',
      'production-loaders',
      'minify-and-treeshake',
      'abort-if-errors',
    ],
  },
};
