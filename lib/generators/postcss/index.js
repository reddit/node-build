import { generatorLoader } from 'lib/generators';
import Autoprefixer from './Autoprefixer';

export const getPostCSS = generatorLoader('postcsshooks', [
  Autoprefixer,
]);
