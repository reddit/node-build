var DefaultClientConfig = require('./DefaultClientConfig');
var DefaultProductionClientConfig = require('./DefaultProductionClientConfig');
var DefaultServerConfig = require('./DefaultServerConfig');
var DefaultProductionServerConfig = require('./DefaultProductionServerConfig');

function getBuild(production, debugConfig, productionConfig) {
  return production ? productionConfig : debugConfig;
}

function getClientConfig(production) {
  return getBuild(production, DefaultClientConfig, DefaultProductionClientConfig);
}

function getServerConfig(production) {
  return getBuild(production, DefaultServerConfig, DefaultProductionServerConfig);
}

module.exports = {
  DefaultClientConfig,
  DefaultProductionClientConfig,
  DefaultServerConfig,
  DefaultProductionServerConfig,
  getClientConfig,
  getServerConfig,
};
