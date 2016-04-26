var tryToLoadGenerator = require('../tryToLoadGenerator').tryToLoadGenerator;

var ESNextReactLoader = require('./ESNextReactLoader');
var ES5ReactLoader = require('./ES5ReactLoader');
var JSONLoader = require('./JSONLoader');
var CSSLoader = require('./CSSLoader');
var LessLoader = require('./LessLoader');
var IgnoreStylesLoader = require('./IgnoreStylesLoader');

var loaders = {
  'esnextreact': ESNextReactLoader,
  'ESNextReact': ESNextReactLoader,
  'es5react': ES5ReactLoader,
  'ES5React': ES5ReactLoader,
  'json': JSONLoader,
  'css': CSSLoader,
  'less': LessLoader,
  'ignore-styles': IgnoreStylesLoader,
}

var getLoader = function(loaderName) {
  return tryToLoadGenerator(loaderName, loaders, 'loader');
}

module.exports = {
  loaders,
  getLoader,
};
