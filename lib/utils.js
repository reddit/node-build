var _ = require('lodash');

function tryLoadName(name, lookupTable, thingKind) {
  // todo: consider passing in variables via a name like 'uglify:compress=true'
  var parsed = parseName(name);

  var thing = lookupTable[parsed[0]];
  if (!thing) {
    throw new Error('Failed to resolve ' + name + ' ' + thingKind);
    return;
  }

  if (typeof thing === 'function') {
    var options = parsed[1];
    return thing(parsed[1]);
  }

  return thing;
}

function parseName(name) {
  var splitName = name.split(':');
  if (splitName.length === 1) { return splitName };
  if (splitName.length !== 2) { throw new Error('invalid argument syntax in: ' + name); };
  var functionName = splitName[0];
  var args = parseArgs(splitName[1]);
  return [functionName, args];
}

function parseArgs(argString) {
  var argsPairs = argString.split(',');
  return argsPairs.map(parseArgPair).reduce(_.extend, {});
}

function parseArgPair(argPair) {
  var pair = argPair.trim().split('=');
  if (pair.length !== 2) { throw new Error('invalid argument pair ' + argPair); }
  var res = {};
  res[pair[0]] = JSON.parse('"' + pair[1] + '"');
  return res;
}

module.exports = {
  tryLoadName,
  parseName,
  parseArgs,
  parseArgPair,
};
