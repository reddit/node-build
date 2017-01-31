var getDefaultClientConfig = require('./getDefaultClientConfig');
var getDefaultProductionClientConfig = require('./getDefaultProductionClientConfig');
var getDefaultServerConfig = require('./getDefaultServerConfig');
var getDefaultProductionServerConfig = require('./getDefaultProductionServerConfig');
var getDefaultTestingConfig = require('./getDefaultTestingConfig');

function getClientConfig(isProduction, options) {
  var passedOptions = options || {};
  return isProduction ? getDefaultProductionClientConfig(passedOptions) : getDefaultClientConfig(passedOptions);
}

function getServerConfig(isProduction, options) {
  var passedOptions = options || {};
  return isProduction ? getDefaultProductionServerConfig(passedOptions) : getDefaultServerConfig(passedOptions);
}

module.exports = {
  getDefaultClientConfig,
  getDefaultProductionClientConfig,
  getDefaultServerConfig,
  getDefaultProductionServerConfig,
  getDefaultTestingConfig,
  getClientConfig,
  getServerConfig,
};
