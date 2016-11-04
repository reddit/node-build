#!/usr/bin/env node
var fs = require('fs');
var path = require('path');

var _ = require('lodash');
var Mocha = require('mocha');
var colors = require('colors');
var rimraf = require('rimraf');
var mochaNotifier = require('mocha-notifier-reporter');

var build = require('../lib/build');
var makeBuild = require('../lib/makeBuild').makeBuild;
var configs = require('../lib/configs');
var getWebpackEntryForTest = require('../lib/getWebpackEntryForTest');
var uploadToSentry = require('../lib/uploadToSentry');

var argv = require('yargs')
  .alias('b', 'blueprintsPath')
    .describe('b', 'path to a raw-config via a node file with moduel.exports = config')
    .default('b', './blueprints.config.js')
  .alias('p', 'production')
    .describe('p', 'enable production settings for the default build configs')
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

function loadBlueprintsFromPath(filePath, isProduction) {
  try {
    console.log('...loading blueprints from', filePath)
    var builds = require(path.resolve(filePath));

    // build configuration files are written in js and can be:
    //   a) a function that takes isProduction (boolean) and returns an array of builds
    //   b) object with property named extensions, to extend / override default builds
    //   c) an array of builds
    // The array is most straightforward and the function seems infinitely
    // more useful than the extensions object, and easier to understand. I'd
    // like to deprecate the extensions object if its not being used in many places.
    if (typeof builds === 'function') {
      builds = builds(isProduction);
    } else if (!Array.isArray(builds)) {
      if (builds.extensions === true) {
        return { extensions: _.omit(builds, 'extensions') };
      }
      builds = [builds];
    }

    return { builds };
  } catch (e) {
    console.log(colors.red('Error in loading blueprints'), e);
    process.exit(1);
  }
}

function loadDefaultConfigs(options) {
  console.log('...using default configs');
  if (options.runTest) {
    console.log('...Setting up tests:');
    var config = _.merge(
      {},
      configs.getDefaultTestingConfig(),
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

  if (options.blueprintsPath && !options.ignoreBlueprints && !options.runTest) {
    var blueprints = loadBlueprintsFromPath(options.blueprintsPath, options.production);

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

  return builds.reduce(function(namedBuilds, build) {
    namedBuilds[build.name] = makeBuild(_.merge(build, extensions));
    return namedBuilds;
  }, {});
}


console.log('...Reading Blueprints', argv.blueprintsPath);
console.log('...cwd', process.cwd());

var config = makeConfig(argv);
var JS_REGEX = /.*\.js(\.map)?$/;
var WHITELISTED_BUILD_NAMES = ['ProductionClient'];

function shouldUploadToSentry(sentryProject, buildName) {
  return (
    sentryProject &&
    argv.production &&
    WHITELISTED_BUILD_NAMES.indexOf(buildName) > -1 &&
    process.env.SENTRY_KEY &&
    process.env.SENTRY_RELEASE_ENDPOINT
  );
}

build(config, function(buildName, stats) {
  if (stats.errors && stats.errors.length > 0 && !argv.watch) {
    console.log(colors.red('ERROR IN BUILD. Aborting.'));
    process.exit(1);
  }

  // upload to Sentry if applicable
  var build = config[buildName];
  if (shouldUploadToSentry(build.sentryProject, buildName)) {
    var buildPath = build.webpackConfig.output.path;
    var assets = stats.assets
      .filter(function(a) { return JS_REGEX.test(a.name); })
      .map(function(a) { return path.join(buildPath, a.name); });

    uploadToSentry(build.sentryProject, build.release, assets);
  }

  if (argv.runTest) {
    console.log(colors.magenta(
      '\n   ******************************' +
      '\n   *       RUNNING TESTS        *' +
      '\n   ******************************'
    ));

    m = new Mocha({ reporter: mochaNotifier.decorate('spec') });
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
    var testDirectory = configs.getDefaultTestingConfig().webpack.output.path;
    rimraf(path.resolve(testDirectory), {}, process.exit);
  } else {
    process.exit();
  }
});
