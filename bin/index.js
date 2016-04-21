var build = require('../lib/build');
var makeBuild = require('../lib/makeBuild').makeBuild;

var argv = require('yargs')
  .alias('r', 'rawconfig')
  .describe('r', 'path to a raw-config via a node file with moduel.exports = config')
  .default('r', '../examples/client/exampleConfig')
  .argv;

  function loadConfigFromPath(path) {
    var builds = require(path);
    if (!Array.isArray(builds)) {
      builds = [ builds ];
    }

    return { builds: builds.map(makeBuild) };
  }

if (argv.rawconfig) {
  var config = loadConfigFromPath(argv.rawconfig);
  build(config);
  return;
}
