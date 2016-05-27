import { tryToLoadGenerator } from 'lib/generators/tryToLoad';

var SimpleResolver = require('./SimpleResolver');
var ModulesResolver = require('./ModulesResolver');
var NPMAndModulesResolver = require('./NPMAndModulesResolver');

var resolvers = {
  'simple': SimpleResolver,
  'modules': ModulesResolver,
  'npm-and-modules': NPMAndModulesResolver,
};

function getResolver(resolverName) {
  return tryToLoadGenerator(resolverName, resolvers, 'resolver');
}

module.exports = {
  resolvers,
  getResolver,
}
