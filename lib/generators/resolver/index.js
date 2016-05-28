import { generatorLoader } from 'lib/generators';

import ModulesResolver from './Modules';
import NPMAndModulesResolver from './NPMAndModules';
import Simple from './Simple';

export const getResolver = generatorLoader('resolver', [
  ModulesResolver,
  NPMAndModulesResolver,
  Simple,
]);
