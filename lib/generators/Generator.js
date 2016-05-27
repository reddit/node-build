export const Generator = (nameOrNames, objectOrFunction) => {
  let names =nameOrNames;
  if (!Array.isArray(names)) {
    names = [ names ];
  }

  return {
    names,
    objectOrFunction,
  };
};
