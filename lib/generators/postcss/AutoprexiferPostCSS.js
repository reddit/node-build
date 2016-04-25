var autoprefixer = require('autoprefixer');

module.exports = function(options) {
  return autoprefixer({ browsers: ['last ' + options.numVersions + ' versions']});
};
