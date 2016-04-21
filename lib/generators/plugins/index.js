var tryToLoadGenerator = require('../tryToLoadGenerator').tryToLoadGenerator;
var AbortIfErrorsPlugin = require('./AbortIfErrorsPlugin');
var BundleCommonChunksPlugin = require('./BundleCommonChunksPlugin');
var EnableProductionLoadersPlugin = require('./EnableProductionLoadersPlugin');
var MinifyAndTreeShakePlugin = require('./MinifyAndTreeShakePlugin');
var NodeLoadSourceMapsPlugin = require('./NodeLoadSourceMapsPlugin');
var SetNodeEnvironmentPlugin = require('./SetNodeEnvironmentPlugin');

var plugins = {
  'abort-if-errors': AbortIfErrorsPlugin,
  'bundle-common': BundleCommonChunksPlugin,
  'production-loaders': EnableProductionLoadersPlugin,
  'minify-and-treeshake': MinifyAndTreeShakePlugin,
  'node-load-sourcemaps': NodeLoadSourceMapsPlugin,
  'set-node-env': SetNodeEnvironmentPlugin,
};

function getPlugin(pluginName) {
  return tryToLoadGenerator(pluginName, plugins, 'plugin');
}

module.exports = {
  plugins,
  getPlugin,
};
