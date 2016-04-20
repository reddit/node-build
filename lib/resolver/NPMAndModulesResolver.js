var _ = require('lodash');
var ModulesResolver = require('./ModulesResolver');

module.exports = function(options){
  var result = ModulesResolver(options);
  result.modules = result.modules.concat('node_modules');
  return result;
}
