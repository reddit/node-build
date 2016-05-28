import { generatorLoader } from 'lib/generators';

import LibraryOutput from './Library';
import SimpleOutput from './Simple';

export const getOutput = generatorLoader('output', [
  LibraryOutput,
  SimpleOutput,
]);
