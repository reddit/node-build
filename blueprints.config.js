function makeConfig(name) {
  var entry = {};
  entry[name] = './src/' + name + '.js';

  return {
    name: name,
    webpack: {
      devtool: 'source-map',
      entry,
      output: {
        generator: 'simple',
        dest: './bin',
      },
      resolve: {
        generator: 'npm-and-modules',
        paths: [ '' ],
        extensions: ['', '.js', '.json'],
      },
      loaders: [
        'esnextreact',
        'json',
      ],
      plugins: [
        'production-loaders',
        'set-node-env',
        'abort-if-errors',
        'node-executable',
        // 'node-load-sourcemaps',
        // 'minify-and-treeshake',
      ],
      externals: 'node-modules',
      target: 'node',
    },
  };
}

module.exports = [ makeConfig('blueprints'), makeConfig('webfonts') ];
