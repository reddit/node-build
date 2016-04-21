var _ = require('lodash');

function tryToLoadGenerator(nameOrObject, lookupTable, thingKind) {
  var parsed = parseNameOrObject(nameOrObject);
  if (!parsed) {
    return nameOrObject;
  }

  var thing = lookupTable[parsed.name];
  if (!thing){
    throw new Error('Failed to resolve ' + nameOrObject + ' ' + thingKind);
    return;
  }
  if (typeof thing === 'function') {
    return thing(parsed.options);
  }

  return thing;
}

function parseNameOrObject(nameOrObject) {
  if (typeof nameOrObject === 'string') {
    return { name: nameOrObject, options: {} };
  }

  if (typeof nameOrObject === 'object') {
    var name = nameOrObject.generator;
    if (typeof name === 'string') {
      return { name, options: _.omit(nameOrObject, 'name') };
    }
  }

  return nameOrObject;
}

module.exports = {
  tryToLoadGenerator
};
