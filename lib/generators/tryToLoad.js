const applyGenerators = (loaders, generator) => {
  generator.names.forEach(name => {
    loaders[name] = generator.objectOrFunction;
  });

  return loaders;
};

export const generatorLoader = (thingKind, generators) => {
  const loaders = generators.reduce((prev, generator) => applyGenerators({...prev}, generator), {});
  return (loaderName) => tryToLoadGenerator(loaderName, loaders, thingKind);
};

export const tryToLoadGenerator = (nameOrObject, lookupTable, thingKind) => {
  const parsed = parseNameOrObject(nameOrObject);
  if (!parsed) {
    return nameOrObject;
  }

  const thing = lookupTable[parsed.name];
  if (!thing) {
    throw new Error(`Failed to resolve ${nameOrObject} - ${thingKind}`);
  }

  if (typeof thing === 'function') {
    return thing(parsed.options);
  }

  return thing;
};

const parseNameOrObject = (nameOrObject) => {
  if (typeof nameOrObject === 'string') {
    return { name: nameOrObject, options: {} };
  }

  if (typeof nameOrObject === 'object') {
    const name = nameOrObject.generator;
    if (typeof name === 'string') {
      return { name, options: nameOrObject };
    }
  }
};
