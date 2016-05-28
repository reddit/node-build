import ClientConfig from './Client';
import ProudctionClientConfig from './ProductionClient';
import ServerConfig from './Server';
import ProductionServerConfig from './ProductionServer';

const getBuild = (production, debugConfig, productionConfig) => {
  return production ? productionConfig : debugConfig;
};

export const getClientConfig = production => (
  getBuild(production, ClientConfig, ProudctionClientConfig));

export const getServerConfig = production => (
  getBuild(production, ServerConfig, ProductionServerConfig));
