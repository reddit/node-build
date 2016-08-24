#!/usr/bin/env node
var _ = require('lodash');
var fs = require('fs');
var glob = require('glob');
var path = require('path');
var Mocha = require('mocha');
var colors = require('colors');
var rimraf = require('rimraf');
var mochaNotifier = require('mocha-notifier-reporter');

var build = require('../lib/build');
var makeBuild = require('../lib/makeBuild').makeBuild;
var configs = require('../lib/configs');
var getWebpackEntryForTest = require('../lib/getWebpackEntryForTest');
var constants = require('../lib/constants');


var argv = require('yargs')
  .alias('b', 'blueprintsPath')
    .describe('b', 'path to a raw-config via a node file with moduel.exports = config')
    .default('b', './blueprints.config.js')
  .alias('w', 'watch')
    .describe('w', '[DEFAULT=false] force watching of all builds')
    .default('w', false)
  .alias('i', 'ignoreBlueprints')
    .describe('ignore the blueprints.config.js file in the current directory and use defaults')
    .default('i', false)
  .alias('e', 'env')
    .describe('the environment to build for <production | dev>')
    .default('e', 'dev')
  .alias('t', 'target')
    .describe('the target to build')
    .default('t', null)
  .argv;

function loadBlueprintsFromPath(options) {
  try {
    console.log('...loading blueprints from', options.blueprintsPath)
    var builds = require(path.resolve(options.blueprintsPath));

    // build configuration files are written in js and can be:
    //   a) a function that takes isProduction (boolean) and returns an array of builds
    //   b) object with property named extensions, to extend / override default builds
    //   c) an array of builds
    // The array is most straightforward and the function seems infinitely
    // more useful than the extensions object, and easier to understand. I'd
    // like to deprecate the extensions object if its not being used in many places.
    if (typeof builds === 'function') {
      builds = builds(options);
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
  var isProduction = options.env === constants.PRODUCTION_ENV;
  switch (options.target) {
    case constants.TARGETS.TEST:
      console.log('...Setting up tests:');
      var config = _.merge(
        {},
        configs.DefaultTestingConfig,
        { webpack: { entry: getWebpackEntryForTest('./') } }
      );

      return [ config ];
    case constants.TARGETS.CLIENT:
      console.log('...client');
      return [ configs.getClientConfig(isProduction) ];
    case constants.TARGETS.SERVER:
      console.log('...server');
      return [ configs.getServerConfig(isProduction) ];
    default:
      console.log('...both');
      return [
        configs.getClientConfig(isProduction),
        configs.getServerConfig(isProduction),
      ];

  }
}

function makeConfig(options) {
  var builds;
  var extensions = {};

  if (options.blueprintsPath && !options.ignoreBlueprints) {
    var blueprints = loadBlueprintsFromPath(options);

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
var isTest = argv.target === constants.TARGETS.TEST;

build(config, function(stats) {
  if (stats.errors && stats.errors.length > 0 && !argv.watch) {
    console.log(colors.red('ERROR IN BUILD. Aborting.'));
    process.exit(1);
  }

  if (isTest) {
    console.log(colors.magenta(
      '\n   ******************************' +
      '\n   *       RUNNING TESTS        *' +
      '\n   ******************************'
    ));

    var testDirectories = config.builds.map(function(build) {
      return build.webpackConfig.output.path;
    });

    m = new Mocha({ reporter: mochaNotifier.decorate('spec') });
    glob('{' + testDirectories.join(',') + '}/**/*.compiledtest', function (err, files) {
      files.forEach(m.addFile.bind(m))
      m.run();

      // we want to remove these from the require cache while we have path
      // references to them to ensure they get tested on the next rebuild
      m.files.forEach(function(filePath) {
        delete require.cache[require.resolve(path.resolve(filePath))];
      });
    });

    // Hacky way to handle webpacks file output
    function cleanup(err) {
      if (err) {
        console.error(err.stack);
      }

      try {
        testDirectories.forEach(function(dir) {
          rimraf.sync(path.join(process.cwd(), dir));
        });
      } catch (e) {
        console.warn('unable to delete test artifacts: ', e.toString());
      }

      process.exit();
    }

    process.on('SIGINT', cleanup);
    process.on('exit', cleanup);
    process.on('uncaughtException', cleanup);
  }
});
