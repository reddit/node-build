import { NoErrorsPlugin } from 'webpack';
import { Generator } from 'lib/generators/Generator';

export default Generator('abort-if-errors', () => new NoErrorsPlugin());
