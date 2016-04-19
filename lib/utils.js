function tryLoadName(name, lookupTable, thingKind) {
  // todo: consider passing in variables via a name like 'uglify:compress=true'
  var thing = lookupTable[name];
  if (thing) { return thing; }
  throw new Error('Failed to resolve ' + name + ' ' + thingKind);
}

module.exports = {
  tryLoadName
};
