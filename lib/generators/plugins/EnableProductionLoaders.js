import { LoaderOptionsPlugin } from 'webpack';
import { Generator } from 'lib/generators/Generator';

export default Generator('production-loaders', () => (new LoaderOptionsPlugin({
  minimize: true,
  debug: false
})));
