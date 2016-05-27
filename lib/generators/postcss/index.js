import { generatorLoader } from 'lib/generators/tryToLoad';
import Autoprefixer from './Autoprefixer';

export const getPostCSS = generatorLoader('postcsshooks', [
  Autoprefixer,
]);
