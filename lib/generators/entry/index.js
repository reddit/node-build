import path from 'path';

export const getEntry = (pathOrObject, buildName) => {
  // for now takes the path to the file, and the build name and makes
  // the entry point object. in the future we can do things like auto traverers
  // the module paths you're resolving and generate tree-shaking-less umd ready builds
  // but if everything internal is using the build project its a little pointless
  // return tryToLoadGenerator(entryName, entryGenerators, 'entry');
  if (typeof pathOrObject === 'object') {
    return pathOrObject;
  }

  const entryConfig = {};
  entryConfig[buildName] = path.resolve(pathOrObject);
  return entryConfig;
};
