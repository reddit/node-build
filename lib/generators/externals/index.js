import { loadNodeModules } from './loadNodeModules';

const loaderName = 'node-modules';

export const getExternals = externals => {
  if (typeof externals === 'string') {
    if (externals === loaderName) {
      return loadNodeModules();
    }

    throw new Error(`Invalid externals loader name, did you mean: ${loaderName} ?`);
  }

  if (typeof externals === 'object') {
    if (externals.generator === loaderName) {
      return loadNodeModules(externals.additional);
    }

    return externals;
  }
};
