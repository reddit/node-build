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

var yargs = require('yargs');
console.log("yargs?", yargs);

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

console.log('...Reading Blueprints', argv.blueprintsPath);
console.log('...cwd', process.cwd());

function loadBuildsFromPath(configPath) {
  try {
    console.log('...loading bluerprints from', configPath)
    var builds = require(path.resolve(configPath));
    console.log('builds?', builds)
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

function applyExtensions(builds, extensions) {
  var ext = extensions || {};
  console.log('...applying extensions', extensions);
  return builds.map(function(build) { return _.merge(build, ext ); });
}

function makeConfig(builds, extensions) {
  return { builds: applyExtensions(builds, extensions).map(makeBuild) };
}

var builds = [];
var extensions = {};

if (argv.blueprintsPath && !argv.ignoreBlueprints) {
  var blueprints = loadBuildsFromPath(argv.blueprintsPath);
  if (blueprints.extensions) {
    extensions = blueprints.extensions;
  } else if (blueprints.builds && blueprints.builds.length) {
    builds = blueprints.builds;
  }
}

function loadDefaultConfigs() {
  console.log('...using default configs');
  if (argv.runTest) {
    console.log('...Setting up tests:');
    builds = [ configs.DefaultTestingConfig ];
    builds[0].webpack.entry = getWebpackEntryForTest('./');
  } else if (argv.client) {
    console.log('...client');
    builds = [ configs.getClientConfig(argv.production) ];
  } else if (argv.server) {
    console.log('...server');
    builds = [ configs.getServerConfig(argv.production) ];
  } else if (argv.clientAndServer) {
    console.log('...both');
    builds = [
      configs.getClientConfig(argv.production),
      configs.getServerConfig(argv.production),
    ];
  }
}

if (!builds.length) {
  loadDefaultConfigs();
}

if (argv.watch) {
  extensions.watch = true;
}

build(makeConfig(builds, extensions), function(stats) {
  if (stats.errors && stats.errors.length > 0 && !argv.watch) {
    console.log(colors.red(
      'ERROR IN BUILD. Aborting.'
    ));

    process.exit(1);
  }

  if (argv.runTest) {
    console.log(colors.magenta(
      '\n   ******************************' +
      '\n   *       RUNNING TESTS        *' +
      '\n   ******************************'
    ));

    var m = new Mocha();
    stats.assets.forEach(function(asset) {
      var path = './.test/' + asset.name;
      m.addFile(path);
    });
    m.run()
      .on('end', function() {
        rimraf('./.test/', function() {});
      });
  }
});
