#!/usr/bin/env node
var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var debug = require('debug')('blueprints');
var Mocha = require('mocha');
var colors = require('colors');
var rimraf = require('rimraf');

var build = require('../lib/build');
var makeBuild = require('../lib/makeBuild').makeBuild;
var configs = require('../lib/configs');
var getWebpackEntryForTest = require('../lib/getWebpackEntryForTest');

var argv = require('yargs')
  .alias('b', 'blueprintsPath')
    .describe('b', 'path to a raw-config via a node file with moduel.exports = config')
    .default('b', './blueprints.config.js')
  .alias('p', 'production')
    .describe('p', 'enable production settings for the default build cofings')
    .default('p', false)
  .alias('c', 'client')
    .describe('c', 'use the default client build, assumes you have an entry point to a client at ~/lib/client.[some es6.js or .js or .jsx]')
    .default('c', false)
  .alias('s', 'server')
    .describe('s', 'use the default server build, assumes you have an entry point to a server at ~/lib/server[some es6.js or .js or .jsx]')
    .default('s', false)
  .alias('a', 'clientAndServer')
    .describe('a', '[DEFAULT=true] use both a client and a server build. checks if you have an extend build and applies it.')
    .default('a', true)
  .alias('w', 'watch')
    .describe('w', '[DEFAULT=false] force watching of all builds')
    .default('w', false)
  .alias('i', 'ignoreBlueprints')
    .describe('ignore the blueprints.config.js file in the current directory and use defaults')
    .default('i', false)
  .alias('t', 'runTest')
    .describe('search for test files and run them')
    .default('t', false)
  .argv;

function loadBlueprintsFromPath(filePath) {
  try {
    console.log('...loading blueprints from', filePath)
    var builds = require(path.resolve(filePath));
    if (!Array.isArray(builds)) {
      if (builds.extensions === true) {
        return { extensions: _.omit(builds, 'extensions') };
      }
      builds = [builds];
    }

    return { builds }
  } catch (e) {
    debug(e);
    return {};
  }
}

function loadDefaultConfigs(options) {
  console.log('...using default configs');
  if (options.runTest) {
    console.log('...Setting up tests:');
    var config = _.merge(
      {},
      configs.DefaultTestingConfig,
      { webpack: { entry: getWebpackEntryForTest('./') } }
    );
    return [ config ];

  } else if (options.client) {
    console.log('...client');
    return [ configs.getClientConfig(options.production) ];

  } else if (options.server) {
    console.log('...server');
    return [ configs.getServerConfig(options.production) ];

  } else if (options.clientAndServer) {
    console.log('...both');
    return [
      configs.getClientConfig(options.production),
      configs.getServerConfig(options.production),
    ];
  }
}

function makeConfig(options) {
  var builds;
  var extensions = {};

  if (options.blueprintsPath && !options.ignoreBlueprints) {
    var blueprints = loadBlueprintsFromPath(options.blueprintsPath);

    if (blueprints.extensions) {
      extensions = blueprints.extensions;

    } else if (blueprints.builds && blueprints.builds.length) {
      builds = blueprints.builds;
    }
  }

  if (!builds) {
    builds = loadDefaultConfigs(options);
  }

  if (options.watch) {
    extensions.watch = true;
  }

  return {
    builds: builds.map(function(build) {
      return makeBuild(_.merge(build, extensions));
    }),
  };
};


console.log('...Reading Blueprints', argv.blueprintsPath);
console.log('...cwd', process.cwd());

var config = makeConfig(argv);

build(config, function(stats) {
  if (stats.errors && stats.errors.length > 0 && !argv.watch) {
    console.log(colors.red('ERROR IN BUILD. Aborting.'));
    process.exit(1);
  }

  if (argv.runTest) {
    console.log(colors.magenta(
      '\n   ******************************' +
      '\n   *       RUNNING TESTS        *' +
      '\n   ******************************'
    ));

    m = new Mocha();
    stats.assets.forEach(function(asset) {
      m.addFile('./.test/' + asset.name);
    });
    m.run();

    // we want to remove these from the require cache while we have path
    // references to them to ensure they get tested on the next rebuild
    m.files.forEach(function(filePath) {
      delete require.cache[require.resolve(path.resolve(filePath))];
    });
  }
});

// Hacky way to handle webpacks file output
process.on('SIGINT', function() {
  if (argv.runTest) {
    var testDirectory = configs.DefaultTestingConfig.webpack.output.path;
    rimraf(path.resolve(testDirectory), {}, process.exit);
  } else {
    process.exit();
  }
});
