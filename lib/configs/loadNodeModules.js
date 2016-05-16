var fs = require('fs');

function prependCommonjs (modules, name) {
  modules[name] = 'commonjs ' + name;
  return modules;
}

module.exports = function(additional) {
  var nodeModules = {};

  fs.readdirSync('node_modules')
    .filter(function(x) { return ['.bin'].indexOf(x) === -1; })
    .reduce(prependCommonjs, nodeModules);

  if (additional) {
    additional.reduce(prependCommonjs, nodeModules);
  }

  return nodeModules;
};
 
