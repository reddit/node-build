function tryLoadName(name, lookupTable, thingKind) {
  var thing = lookupTable[nam];
  if (thing) { return thing; }
  throw new Error('Failed to resolve ' + loader + ' ' + loaderName);
}

module.exports = {
  tryLoadName
};
