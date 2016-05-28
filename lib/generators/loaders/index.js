import { generatorLoader } from 'lib/generators';

import CSSLoader from './CSS';
import ESNextReactLoader from './ESNextReact';
import IgnoreStylesLoader from './IgnoreStyles';
import JSONLoader from './JSON';
import LessLoader from './Less';

export const getLoader = generatorLoader('loader', [
  CSSLoader,
  ESNextReactLoader,
  IgnoreStylesLoader,
  JSONLoader,
  LessLoader,
]);
