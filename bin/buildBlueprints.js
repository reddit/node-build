var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var build = require('../lib/build');
var makeBuild = require('../lib/makeBuild').makeBuild;
var configs = require('../lib/configs');

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
  .alias('b', 'both')
    .describe('b', '[DEFAULT=true] use both a client and a server build. checks if you have an extend build and applies it.')
    .default('b', true)
  .alias('w', 'watch')
    .describe('w', '[DEFAULT=false] force watching of all builds')
    .default('w', false)
  .alias('i', 'ignoreBlueprints')
    .describe('ignore the blueprints.config.js file in the current directory and use defaults')
    .default('i', false)
  .argv;

console.log('starting');
console.log('cwd', process.cwd());

function loadBuildsFromPath(configPath) {
  var builds = require(path.resolve(configPath));
  if (!Array.isArray(builds)) {
    if (builds.extensions === true) {
      return { extensions: _.omit(builds, 'extensions') };
    }
    builds = [builds];
  }

  return { builds }
}

function applyExtensions(builds, extensions) {
  var ext = extensions || {};
  return builds.map(function(build) { return _.extend(build, ext); });
}

function makeConfig(builds, extensions) {
  return { builds: applyExtensions(builds, extensions).map(makeBuild) };
}

var builds = [];
var extensions = {};

if (argv.blueprintsPath && !argv.ignoreBlueprints) {
  var blueprints = loadBuildsFromPath(configPath);
  if (blueprints.extensions) {
    extensions = blueprints.extensions;
  } else if (blueprints.builds.length) {
    builds = blueprints.builds;
  }
}

function loadDefaultConfigs() {
  if (argv.client) {
    builds = [ configs.getClientConfig(argv.production) ];
  } else if (argv.server) {
    builds = [ configs.getServerConfig(argv.production) ];
  } else if (argv.both) {
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

build(makeConfig(builds, extensions));
