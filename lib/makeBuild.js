var _ = require('lodash');
var generators = require('./generators');
var getLoader = generators.getLoader;
var getPlugin = generators.getPlugin;
var getOutput = generators.getOutput;
var getResolver = generators.getResolver;
var getEntry = generators.getEntry;
var getPostCSS = generators.getPostCSS;
import { getExternals } from 'lib/generators/externals';

function makeBuild(shortBuild) {
  return buildObject(shortBuild.name,
    shortBuild.watch,
    parseWebpackConfig(shortBuild.webpack, shortBuild.name))
}

function buildObject(buildName, watch, webpackConfig) {
  return {
    watch,
    buildName,
    webpackConfig,
  };
}

function parseWebpackConfig(shortHandConfig, buildName) {
  var webpackConfig = {};

  Object.keys(shortHandConfig).forEach(function(key) {
    var obj = shortHandConfig[key];

    if (key === 'loaders') {
      _.defaults(webpackConfig, { module: { loaders: [] }});
      concatInPlace(
        webpackConfig.module.loaders,
        obj.map(getLoader)
      );
    }

    if (key === 'plugins') {
      webpackConfig.plugins = obj.map(getPlugin);
    }

    if (key === 'output') {
      webpackConfig.output = getOutput(obj);
    }

    if (key === 'resolve') {
      webpackConfig.resolve = getResolver(obj);
    }

    if (key === 'entry') {
      webpackConfig.entry = getEntry(obj, buildName);
    }

    if (key === 'postcss') {
      webpackConfig.postcss = obj.map(getPostCSS);
    }

    if (key === 'externals') {
      webpackConfig.externals = getExternals(obj);
    }
  });

  return _.extend(webpackConfig, _.omit(shortHandConfig,
    Object.keys(webpackConfig).concat('loaders')));
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
};
