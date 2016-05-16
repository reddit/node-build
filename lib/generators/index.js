var getLoader = require('./loaders').getLoader;
var getPlugin = require('./plugins').getPlugin;
var getOutput = require('./output').getOutput;
var getResolver = require('./resolver').getResolver;
var getEntry = require('./entry').getEntry;
var getExternals = require('./externals').getExternals;
var getPostCSS = require('./postcss').getPostCSS;

module.exports = {
  getLoader,
  getPlugin,
  getOutput,
  getResolver,
  getEntry,
  getExternals,
  getPostCSS,
};
