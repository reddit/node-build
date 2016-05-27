function makeConfig(name) {
  var entryPath = './src/' + name + '.js';
  var outputName = name + '.js';

  return {
    name: name,
    webpack: {
      entry: { name: entryPath },
      output: {
        generator: 'simple',
        dest: './bin',
        name: outputName,
      },
      resovlve: {
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
        // 'minify-and-treeshake',
      ],
      externals: 'node-modules',
      target: 'node',
      node: {
        process: false,
        global: false,
        __filename: false,
        __dirname: false,
        os: false,
        fs: false,
        console: false,
      }
    },
  };
}

console.log(makeConfig('blueprints'));

module.exports = [ makeConfig('blueprints') ];
