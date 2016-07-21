var path = require('path');
var rimraf = require('rimraf');

// Use this for cleaning out directories at the beginning of build steps.
// It's recommended this be used as the first, or one of the first, plugins
// in your config. You configure this with an array of paths that should be
// be cleaned. The directory will be removed.
module.exports = function(options) {
  return function() {

    var cwd = process.cwd();

    // run rimraf on given directories to clean them
    options.paths.forEach(function(pathToClean) {
      rimraf(path.join(cwd, pathToClean), {}, function() {});
    });
  };
};
