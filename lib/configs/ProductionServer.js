export default {
  name: 'ProductionServer',
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
      extensions: ['', '.js', '.jsx', '.es6.js', '.json'],
    },
    loaders: [
      'esnextreact',
      'json',
      'ignore-styles',
    ],
    plugins: [
      'production-loaders',
      'minify-and-treeshake',
      'abort-if-errors',
      'node-load-sourcemaps',
    ],
    node: {
      Buffer: false,
      process: false,
      global: false,
      __filename: true,
      __dirname: true,
    },
  },
};
