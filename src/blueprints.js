import colors from 'colors';
import debugModule from 'debug'
import fs from 'fs';
import { omit } from 'lodash/object';
import Mocha from 'mocha';
import path from 'path';
import rimraf from 'rimraf';
import yargs from 'yargs';

import { build } from 'lib/build';
import { makeBuild } from 'lib/makeBuild';
import configs from 'lib/configs';
import { getWebpackEntryForTest } from 'lib/getWebpackEntryForTest';

const debug = debugModule('blueprints');

/* eslint-disable max-len */
const argv = yargs
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
/* eslint-enable */

console.log(colors.blue(`[Blueprints] reading from ${argv.blueprintsPath}`));
console.log(colors.blue(`[cwd] ${process.cwd()}`));

const loadBuildsFromPath = configPath => {
  try {
    conslole.log(colors.blue(`..loading config ${configPath}`));
    let builds = require(path.resolve(configPath));
    if (!Array.isArray(builds)) {
      if (builds.extensions === true) {
        return { extensions: omit(builds, 'extensions') };
      }
      builds = [builds];
    }

    return { builds }
  } catch (e) {
    debug(e);
    return {};
  }
};

const applyExtensions = (builds, extensions) => {
  const ext = extensions || {};
  if (Object.keys(ext).length > 0) {
    /* eslint-disable max-len */
    console.log(`${colors.blue('[extensions]')}: ${colors.white(JSON.stringify(extensions, null, 2))}`);
    /* eslint-enable */
  }

  return builds.map(build => ({ ...build, ...ext }));
};

const makeConfig = (builds, extensions) => ({
  builds: applyExtensions(builds, extensions).map(makeBuild)
})

let builds = [];
let extensions = {};

if (argv.blueprintsPath && !argv.ignoreBlueprints) {
  const blueprints = loadBuildsFromPath(argv.blueprintsPath);
  if (blueprints.extensions) {
    extensions = blueprints.extensions;
  } else if (blueprints.builds && blueprints.builds.length) {
    builds = blueprints.builds;
  }
}

const loadDefaultConfigs = () => {
  console.log(colors.blue('..using default configs'));
  if (argv.runTest) {
    console.log(colors.magenta('..Setting up tests:'));
    builds = [ configs.DefaultTestingConfig ];
    builds[0].webpack.entry = getWebpackEntryForTest('./');
  } else if (argv.client) {
    console.log(colors.blue('..client'));
    builds = [ configs.getClientConfig(argv.production) ];
  } else if (argv.server) {
    console.log(colors.blue('..server'));
    builds = [ configs.getServerConfig(argv.production) ];
  } else if (argv.clientAndServer) {
    console.log(colors.blue('..both'));
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

build(makeConfig(builds, extensions), stats => {
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
