import { Generator } from 'lib/generators/Generator';
import SimpleOutput from './Simple';
const simple = SimpleOutput.objectOrFunction; // is a function

export default Generator(['this', 'commonjs', 'commonjs2', 'amd', 'umd'], options => ({
  ...simple(options),
  library: options.libraryName || '[name].js',
  // use options.generator to know the name we've been passed, which will be one of the above ^
  libraryTarget: options.target || options.generator || 'var',
}));
