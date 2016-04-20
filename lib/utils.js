var _ = require('lodash');

function tryLoadName(name, lookupTable, thingKind) {
  var parsed = parseName(name);

  var thing = lookupTable[parsed[0]];
  if (!thing) {
    throw new Error('Failed to resolve ' + name + ' ' + thingKind);
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
  var functionName = splitName[0];
  var args = parseArgs(_.drop(splitName).join(':'));
  return [functionName, args];
}

function parseArgs(argString) {
  try {
    console.log('arg string is', argString);
    var parsed =  makePairs(argString).map(parseKeyValuePair).reduce(_.extend, {});
    console.log('parsed all paris', parsed);
    return parsed;

  } catch (e){
    console.error('error parsing function argument string', e);
    throw e;
  }
}

function makePairs(argString) {
  var splitOnEqual = argString.split('=');
  var unzippedPairs = [];
  splitOnEqual.forEach(function(part) {
    console.log('part', part);
    var splitOnComma = part.split(',');
    console.log('split', splitOnComma);
    if (splitOnComma.length === 1) {
      unzippedPairs.push(splitOnComma[0].trim());
      console.log('single part');
      return;
    }

    var nextKeyword = splitOnComma.pop();
    console.log('splitting into', splitOnComma.join(', ').trim(), nextKeyword.trim());
    unzippedPairs.push(splitOnComma.join(', ').trim());
    unzippedPairs.push(nextKeyword.trim());
  });

  var pairs =  _.chunk(unzippedPairs, 2);
  console.log('made pairs', pairs);
  return pairs;
}

function parseKeyValuePair(pair) {
  if (pair.length !== 2) { throw new Error('parse key value pair passed invalid pair', pair); }
  var value = pair[1];

  if (value[0] === '[' || value[0] === '{') {
    console.log('parsing', value);
    value = JSON.parse(value);
  }

  var res = {};
  res[pair[0]] = value;
  console.log('turned', pair, 'into', res);
  return res;
}

module.exports = {
  tryLoadName,
  parseName,
  parseArgs,
};
