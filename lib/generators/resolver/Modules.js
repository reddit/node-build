import path from 'path';
import { Generator } from 'lib/generators';
import SimpleResolver from './Simple';
const simple = SimpleResolver.objectOrFunction; // its a function;

const resolvePath = strPath => path.resolve(strPath);

export default Generator('modules', options => ({
  ...simple(options),
  modules: (options.paths || []).map(resolvePath),
}));
