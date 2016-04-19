var _ = require('lodash');
var getLoader = require('./loaders').getLoader;
var getPlugin = require('./plugins').getPlugin;

function makeBuild(shortBuild) {
  return buildObject(shortBuild.name,
    shortBuild.watch,
    parseWebpackConfig(shortBuild.webpack))
}

function buildObject(buildName, watch, webpackConfig) {
    return {
      watch,
      buildName,
      webpackConfig,
    };
}

function parseWebpackConfig(shortHandConfig) {
  var webpackConfig = {};

  Object.keys(shortHandConfig).forEach(function(key) {
    var obj = shortHandConfig[key];

    if (key === 'loaders') {
      _.defaults(webpackConfig, { module: { loaders: [] }});
      concatInPlace(
        webpackConfig.module.loaders,
        mapLoadNameOrUseSource(obj, getLoader)
      );
    }

    if (key === 'plugins') {
      webpackConfig.plugins = mapLoadNameOrUseSource(obj, getPlugin);
    }
  });

  return webpackConfig;
}

function concatInPlace(dest, source) {
  source.forEach(function(thing) { dest.push(thing) });
}

function loadNameOrUseSource(thing, load) {
  if (typeof thing === 'string') {
    return load(thing);
  }

  return thing;
}

function mapLoadNameOrUseSource(array, loader) {
  return array.map(loader);
}

module.exports = {
  makeBuild,
  buildObject,
  parseWebpackConfig,
  loadNameOrUseSource,
  mapLoadNameOrUseSource
};
