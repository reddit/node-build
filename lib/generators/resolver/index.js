import { generatorLoader } from 'lib/generators/tryToLoad';

import ModulesResolver from './Modules';
import NPMAndModulesResolver from './NPMAndModules';
import Simple from './Simple';

export const getResolver = generatorLoader('resolver', [
  ModulesResolver,
  NPMAndModulesResolver,
  Simple,
]);
