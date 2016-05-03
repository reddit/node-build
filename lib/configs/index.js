var DefaultClientConfig = require('./DefaultClientConfig');
var DefaultProductionClientConfig = require('./DefaultProductionClientConfig');
var DefaultServerConfig = require('./DefaultServerConfig');
var DefaultProductionServerConfig = require('./DefaultProductionServerConfig');
var DefaultTestingConfig = require('./DefaultTestingConfig');

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
  DefaultTestingConfig,
  getClientConfig,
  getServerConfig,
};
