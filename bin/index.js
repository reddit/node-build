var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var build = require('../lib/build');
var makeBuild = require('../lib/makeBuild').makeBuild;

var argv = require('yargs')
  .alias('r', 'rawconfig')
  .describe('r', 'path to a raw-config via a node file with moduel.exports = config')
  .default('r', './blueprints.config.js')
  .argv;

console.log('starting');
console.log('cwd', process.cwd());

function loadRawConfigModule(configPath, extensions) {
  var builds = require(path.resolve(configPath));
  if (!Array.isArray(builds)) {
    builds = [builds];
  }

  return makeConfig(applyExtensions(builds, extensions));
}

function applyExtensions(builds, extensions) {
  var ext = extensions || {};
  return builds.map(function(build) { return _.extend(build, ext); });
}

function makeConfig(builds) {
  return { builds: builds.map(makeBuild) };
}

function loadConfigFromPath(path, extensions) {
  return loadRawConfigModule(path, extensions);
}

if (argv.rawconfig) {
  var config = loadConfigFromPath(argv.rawconfig);
  build(config);
  return;
}
