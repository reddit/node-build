import fs from 'fs';

const prependCommonjs = (modules, name) => {
  modules[name] = `commonjs ${name}`;
  return modules;
};

const lodashSubmodules = [
  'array', 'collection', 'date', 'function', 'lang', 'math',
  'number', 'object', 'seq', 'string', 'util', 'properties', 'methods',
].map(name => `lodash/${name}`);

export const loadNodeModules = additional => {
  const nodeModules = {};

  fs.readdirSync('node_modules')
    .filter(function(x) { return ['.bin'].indexOf(x) === -1; })
    .reduce(prependCommonjs, nodeModules);

  if (additional) {
    additional.reduce(prependCommonjs, nodeModules);
  }

  if (nodeModules.lodash) {
    lodashSubmodules.reduce(prependCommonjs, nodeModules);
  }

  return nodeModules;
};
