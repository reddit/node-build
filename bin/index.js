var build = require('../lib/build');;
var argv = require('yargs')
  .alias('r', 'rawconfig')
  .describe('r', 'path to a raw-config via a node file with moduel.exports = config')
  .default('r', '../examples/client/exampleConfig')
  .argv;

if (argv.rawconfig) {
  config = require(argv.rawconfig);
  build(config);
  return;
}
