var path = require('path');

module.exports = function(options){
  return {
    path: path.join(process.cwd(), options.dest),
    filename: options.name || '[name].js',
    sourceMapFilename: '[name].js.map',
  };
};
