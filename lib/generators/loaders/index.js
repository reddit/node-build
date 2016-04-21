var tryToLoadGenerator = require('../tryToLoadGenerator').tryToLoadGenerator;

var ESNextReactLoader = require('./ESNextReactLoader');
var JSONLoader = require('./JSONLoader');

var loaders = {
  'esnextreact': ESNextReactLoader,
  'ESNextReact': ESNextReactLoader,
  'json': JSONLoader,
}

var getLoader = function(loaderName) {
  return tryToLoadGenerator(loaderName, loaders, 'loader');
}

module.exports = {
  loaders,
  getLoader,
};
