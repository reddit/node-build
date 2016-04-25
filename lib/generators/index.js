var getLoader = require('./loaders').getLoader;
var getPlugin = require('./plugins').getPlugin;
var getOutput = require('./output').getOutput;
var getResolver = require('./resolver').getResolver;
var getEntry = require('./entry').getEntry;
var getPostCSS = require('./postcss').getPostCSS;

module.exports = {
  getLoader,
  getPlugin,
  getOutput,
  getResolver,
  getEntry,
  getPostCSS,
};
