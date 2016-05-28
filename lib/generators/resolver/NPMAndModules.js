import { Generator } from 'lib/generators';
import ModulesResolver from './Modules';
const modules = ModulesResolver.objectOrFunction; // its a function;

export default Generator('npm-and-modules', options => {
  const result = modules(options);
  return {
    ...result,
    modules: result.modules.concat('node_modules'),
  };
});
