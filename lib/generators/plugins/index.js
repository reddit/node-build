var tryToLoadGenerator = require('../tryToLoadGenerator').tryToLoadGenerator;
var AbortIfErrorsPlugin = require('./AbortIfErrorsPlugin');
var BundleCommonChunksPlugin = require('./BundleCommonChunksPlugin');
var CleanDirectoriesPlugin = require('./CleanDirectoriesPlugin');
var CopyStaticFilesPlugin = require('./CopyStaticFilesPlugin');
var EnableProductionLoadersPlugin = require('./EnableProductionLoadersPlugin');
var ExtractCSSPlugin = require('./ExtractCSSPlugin');
var MinifyAndTreeShakePlugin = require('./MinifyAndTreeShakePlugin');
var NodeLoadSourceMapsPlugin = require('./NodeLoadSourceMapsPlugin');

var plugins = {
  'abort-if-errors': AbortIfErrorsPlugin,
  'bundle-common': BundleCommonChunksPlugin,
  'clean-directories': CleanDirectoriesPlugin,
  'copy-static-files': CopyStaticFilesPlugin,
  'extract-css': ExtractCSSPlugin,
  'production-loaders': EnableProductionLoadersPlugin,
  'minify-and-treeshake': MinifyAndTreeShakePlugin,
  'node-load-sourcemaps': NodeLoadSourceMapsPlugin,
};

function getPlugin(pluginName) {
  return tryToLoadGenerator(pluginName, plugins, 'plugin');
}

module.exports = {
  plugins,
  getPlugin,
};
