var loadNodeModules = require('./loadNodeModules');

var loaderName = 'node-modules';

function getExternals(externals) {
  if (typeof externals === 'string') {
    if (externals === loaderName) {
      return loadNodeModules();
    } else {
      throw new Error('invalid externals loader name, did you mean: ' + loaderName + '?');
    }
  }

  if (typeof externals === 'object') {
    if (externals.generator === loaderName) {
      return loadNodeModules(externals.additional);
    }

    return externals;
  }
}

module.exports = {
  getExternals,
};
