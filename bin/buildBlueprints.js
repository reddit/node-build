#!/usr/bin/env node
var _ = require('lodash');
var fs = require('fs-extra');
var path = require('path');
var debug = require('debug')('blueprints');
var Mocha = require('mocha');
var mochaNotifier = require('mocha-notifier-reporter');
var colors = require('colors');
var rimraf = require('rimraf');
var process = require('process');

var build = require('../lib/build');
var makeBuild = require('../lib/makeBuild').makeBuild;
var configs = require('../lib/configs');
var getWebpackEntryForTest = require('../lib/getWebpackEntryForTest');
var testDirectory = configs.DefaultTestingConfig.webpack.output.path;

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

// Given the path of a source file, copies its compiled test file to a new path with a cache buster (timestamp).
// This is necessary because we want to be able to run tests in watch mode, and Mocha has
// some caching going on that's dependant on the filename (likely because `require` caches on the filename)
function cachebustTestFile(filePath) {
  return cachebustFile(testFilePath(filePath));
}

function cachebustFile(srcPath) {
  return copyFile(srcPath, cacheBustedPath(srcPath));
}

function testFilePath(filePath) {
  return path.join(testDirectory, filePath);
}

function cacheBustedPath(srcPath) {
  return srcPath + '-' + (new Date()).getTime();
}

function copyFile(src, dest) {
  return new Promise(function(resolve, reject) {
    fs.copy(path.resolve(src), path.resolve(dest), function() {
      resolve(dest);
    });
  })
}

function globForCachebustedTests(rootDirectory) {
  var glob = rootDirectory;
  if (glob[glob.length - 1] !== '/') {
    glob += '/';
  }

  return glob + '**/*.compiledtest-*';
}

// Removes all compiled test files if its safe to do so, then calls a callback. It's not safe
// to remove the original compiled files if we're running in watch mode, as webpack relies on them.
// We can however remove the cache-busted versions of the files to free up space.
function removeCompiledTests(watching,  cb) {
  var callback = cb || function() {};

  if (watching) {
    rimraf(globForCachebustedTests(testDirectory), callback);
    return;
  }

  rimraf(testDirectory, callback);
}

// Mocha outputs to console by default. mochaNotifier will add node-notifier notifications,
// but we need to tell it to also pass through to spec so that results are still console.log'd
function notifyingMochaInstance() {
  return new Mocha({ reporter: mochaNotifier.decorate('spec') })
}

build(makeConfig(builds, extensions), function(stats) {
  if (argv.runTest) {
    console.log(colors.magenta(
      '\n   ******************************' +
      '\n   *       RUNNING TESTS        *' +
      '\n   ******************************'
    ));

    var mochaInstance = notifyingMochaInstance();
    var addFileToMocha = mochaInstance.addFile.bind(mochaInstance);

    function prepareAssetForMocha(asset) {
      return cachebustTestFile(asset.name).then(addFileToMocha);
    }

    Promise.all(stats.assets.map(prepareAssetForMocha)).then(function() {
      mochaInstance.run()
        .on('end', function() {
          removeCompiledTests(extensions.watch);
        });
    });
  }
});

process.on('SIGINT', function() {
  if (argv.runTest && extensions.watch) {
    removeCompiledTests(false, process.exit); // remove everything now that we're done
    return;
  }

  process.exit();
});
