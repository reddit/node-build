import { Generator } from 'lib/generators/Generator';
import autoprefixer from 'autoprefixer';

export default Generator('autoprefixer', options => (autoprefixer({
  browsers: [`last ${options.numVersions || 2} versions` ],
})));
