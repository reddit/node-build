var getDefaultClientConfig = require('./getDefaultClientConfig');
var getDefaultProductionClientConfig = require('./getDefaultProductionClientConfig');
var getDefaultServerConfig = require('./getDefaultServerConfig');
var getDefaultProductionServerConfig = require('./getDefaultProductionServerConfig');
var getDefaultTestingConfig = require('./getDefaultTestingConfig');

function getClientConfig(isProduction, options) {
  var options = options || {};
  return isProduction ? getDefaultProductionClientConfig(options) : getDefaultClientConfig();
}

function getServerConfig(isProduction) {
  return isProduction ? getDefaultProductionServerConfig() : getDefaultServerConfig();
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
