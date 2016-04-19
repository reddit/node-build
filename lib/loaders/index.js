var tryLoadName = require('../utils').tryLoadName;

var ESNextReactLoader = require('./ESNextReactLoader');
var JSONLoader = require('./JSONLoader');

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
