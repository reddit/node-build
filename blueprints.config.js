function makeConfig(name) {
  var entry = {};
  entry[name] = './src/' + name + '.js';

  return {
    name: name,
    webpack: {
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
      node: {
        path: false,
        process: false,
        __filename: false,
        __dirname: false,
        os: false,
        global: false,
        Buffer: false,
        require: false,
      },
    },
  };
}

module.exports = [ makeConfig('blueprints'), makeConfig('webfonts') ];
