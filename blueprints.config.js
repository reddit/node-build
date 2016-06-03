/* eslint-disable */
// It would be cool to start compiling blueprings configs so you could write
// ES6+ for your ES6+ but that might be getting excessive.
var webpack = require('webpack');
var _ = require('lodash');

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

function requireHookPlugin() {
  return new webpack.BannerPlugin({
    banner: 'var SUPER_SECRET_REQUIRE_ONLY_CONFIG_LOADING_SHOULD_USE = require;',
    raw: true,
    entryOnly: true,
  });
}

function makeBlueprintsConfig() {
  var blueprintsConfig = makeConfig('blueprints');

  // Blueprints is special because config files are written as node targeted javascript.
  // To pull this off the blueprints compiled file needs a way to dynamicaly require files
  // based on the arguments passed to it via CLI. Webpack normally resolves all require
  // statements, and dynamic require's get turned into Errors (technically an automatic annonymous
  // functions that throw errors). To get around this we use a banner plugin that defines a variable
  // which is defined to be require. Banner plugins can run as raw, bypassing them compilation step which gets us around
  // webpack's require re-writing. I tried doing this with require.ensure (which should work),
  // but this also produced error throwing functions.
  return _.merge(
    {},
    blueprintsConfig, {
      webpack: {
        plugins: [ requireHookPlugin() ].concat(blueprintsConfig.webpack.plugins),
      },
    }
  );
}

module.exports = [
  makeBlueprintsConfig(),
  makeConfig('webfonts'),
];
