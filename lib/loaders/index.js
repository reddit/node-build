var ESNextReactLoader = require('./ESNextReactLoader');
var JSONLoader = require('./JSONLoader');
var tryLoadName = require('./loaderUtils').tryLoadName;

var loaders = {
  'esnextreact': ESNextReactLoader,
  'ESNextReact': ESNextReactLoader,
  'json': JSONLoader,
}

var getLoader = function(loaderName) {
  return tryLoadName(loaderName, loaders, 'loader');
}

module.exports = {
  loaders,
  getLoader,
};
