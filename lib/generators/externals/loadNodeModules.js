var fs = require('fs');

function prependCommonjs (modules, name) {
  modules[name] = 'commonjs ' + name;
  return modules;
}

function reduceNamespaces (module) {
  if (module.charAt(0) === '@') {
    return (
      fs.readdirSync('node_modules/' + module)
        .map(function(m) { return module + '/' + m; })
    );
  }

  return module;
}

var lodashSubmodules = [
  'array', 'collection', 'date', 'function', 'lang', 'math',
  'number', 'object', 'seq', 'string', 'util', 'properties', 'methods'
].map(function(name) { return 'lodash/' + name });

module.exports = function(additional) {
  var nodeModules = {};

  fs.readdirSync('node_modules')
    .filter(function(x) { return ['.bin'].indexOf(x) === -1; })
    .map(reduceNamespaces)
    .reduce(prependCommonjs, nodeModules);

  if (additional) {
    additional.reduce(prependCommonjs, nodeModules);
  }

  if (nodeModules.lodash) {
    lodashSubmodules.reduce(prependCommonjs, nodeModules);
  }

  return nodeModules;
};
