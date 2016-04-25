var autoprefixer = require('autoprefixer');

module.exports = function(options) {
  return new autoprefixer({ browsers: ['last ' + options.numVersions + ' versions']});
};
