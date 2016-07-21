var _ = require('lodash');
var tryToLoadGenerator = require('../tryToLoadGenerator').tryToLoadGenerator;

var ContentHashOutput = require('./ContentHashOutput');
var SimpleOutput = require('./SimpleOutput');
var LibraryOutput = require('./LibraryOutput');

function libraryOfTarget(target) {
  return function(options) {
    return LibraryOutput(_.extend(options, {
      target: target,
    }));
  }
}

var outputs = {
  contenthash: ContentHashOutput, // this uses chunk hash should you probably
  // only use it in production for long-lived files that need cache-busting
  simple: SimpleOutput,
  library: LibraryOutput,
  this: libraryOfTarget('this'),
  commonjs: libraryOfTarget('commonjs'),
  commonjs2: libraryOfTarget('commonjs2'),
  amd: libraryOfTarget('amd'),
  umd: libraryOfTarget('umd'),
};

var getOutput = function(outputName) {
  return tryToLoadGenerator(outputName, outputs, 'output');
}

module.exports = {
  outputs,
  getOutput,
}
