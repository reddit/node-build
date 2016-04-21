var path = require('path');

module.exports = function(options){
  return {
    path: path.resolve(options.dest),
    filename: options.name || '[name].js',
  };
};
