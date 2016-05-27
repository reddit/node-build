import { generatorLoader } from 'lib/generators/tryToLoad';

import LibraryOutput from './Library';
import SimpleOutput from './Simple';

export const getOutput = generatorLoader('output', [
  LibraryOutput,
  SimpleOutput,
]);
