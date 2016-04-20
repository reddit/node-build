var _ = require('lodash');
var SimpleOutput = require('./SimpleOutput');

module.exports = function(options) {
  return _.extend(SimpleOutput(options), {
    library: options.libraryName || '[name].js',
    libraryTarget: options.target || 'var',
  });
};
