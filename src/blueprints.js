import { omit } from 'lodash/object';
import colors from 'colors';
import debugModule from 'debug';
import Mocha from 'mocha';
import path from 'path';
import rimraf from 'rimraf';
import yargs from 'yargs';

import { build } from 'lib/build';
import { makeBuild } from 'lib/makeBuild';
import { getClientConfig, getServerConfig } from 'lib/configs';
import TestingConfig from 'lib/configs/Testing';
import { getWebpackEntryForTest } from 'lib/getWebpackEntryForTest';

const debug = debugModule('blueprints');

const { blue, white, magenta, red } = colors;

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

const loadBuildsFromPath = filePath => {
  try {
    console.log(blue(`..loading config ${filePath}`));
    /* eslint-disable no-undef */
    // SUPER_SECRET_REQUIRE_ONLY_CONFIG_LOADING_SHOULD_USE is our hook outside of
    // webpack's normal requires -- webpack normally resolves requires at compile time
    // and turns require statments that are dynamic, or that it can't resolve, into error throwing
    // thunks. I tried doing this with require.ensure, and webpack turned that into
    // error throwing thunks as well, so this seems like the 'cleanest' solution.
    let builds = SUPER_SECRET_REQUIRE_ONLY_CONFIG_LOADING_SHOULD_USE(path.resolve(filePath));
    /* eslint-enable */
    if (!Array.isArray(builds)) {
      if (builds.extensions === true) {
        return { extensions: omit(builds, 'extensions') };
      }
      builds = [builds];
    }

    return { builds };
  } catch (e) {
    debug(e);
    return {};
  }
};

const loadDefaultConfigs = options => {
  console.log(blue('..using default configs'));
  if (options.runTest) {
    console.log(magenta('..Setting up tests:'));
    return [{
      ...TestingConfig,
      ...{
        webpack: {
          entry: getWebpackEntryForTest('./'),
        },
      },
    }];
  } else if (options.client) {
    console.log(blue('..client'));
    return [ getClientConfig(options.production) ];
  } else if (options.server) {
    console.log(blue('..server'));
    return [ getServerConfig(options.production) ];
  } else if (options.clientAndServer) {
    console.log(blue('..both'));
    return [
      getClientConfig(options.production),
      getServerConfig(options.production),
    ];
  }

  return [];
};

const makeConfig = options => {
  console.log(blue(`[Blueprints] reading from ${options.blueprintsPath}`));
  console.log(blue(`[cwd] ${process.cwd()}`));

  let builds = [];
  let extensions = {};

  if (options.blueprintsPath && !options.ignoreBlueprints) {
    const blueprints = loadBuildsFromPath(options.blueprintsPath);
    if (blueprints.extensions) {
      extensions = blueprints.extensions;
    } else if (blueprints.builds && blueprints.builds.length) {
      builds = blueprints.builds;
    }
  }

  if (!builds.length) {
    loadDefaultConfigs();
  }

  if (options.watch) {
    extensions.watch = true;
  }

  return {
    builds: applyExtensions(builds, extensions).map(makeBuild),
  };
};

const applyExtensions = (builds, extensions) => {
  const ext = extensions || {};
  if (Object.keys(ext).length > 0) {
    console.log(`${blue('[extensions]')}: ${white(JSON.stringify(
      extensions, null, 2))}`);
  }

  return builds.map(build => ({ ...build, ...ext }));
};

build(makeConfig(argv), stats => {
  if (stats.errors && stats.errors.length > 0 && !argv.watch) {
    console.log(red(
      'ERROR IN BUILD. Aborting.'
    ));

    process.exit(1);
  }

  if (argv.runTest) {
    console.log(magenta(
      '\n   ******************************' +
      '\n   *       RUNNING TESTS        *' +
      '\n   ******************************'
    ));

    const mochaInstance = new Mocha();
    stats.assets.forEach(asset => {
      mochaInstance.addFile(`./.test/${asset.name}`);
    });

    mochaInstance.run()
      .on('end', function() {
        rimraf('./.test/', function() {});
      });
  }
});
