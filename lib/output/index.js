var _ = require('lodash');
var tryLoadName = require('../utils').tryLoadName;
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
  simple: SimpleOutput,
  library: LibraryOutput,
  this: libraryOfTarget('this'),
  commonjs: libraryOfTarget('commonjs'),
  commonjs2: libraryOfTarget('commonjs2'),
  amd: libraryOfTarget('amd'),
  umd: libraryOfTarget('umd'),
};

var getOutput = function(outputName) {
  return tryLoadName(outputName, outputs, 'output');
}

module.exports = {
  outputs,
  getOutput,
}
