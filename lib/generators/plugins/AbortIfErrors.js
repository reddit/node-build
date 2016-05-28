import { NoErrorsPlugin } from 'webpack';
import { Generator } from 'lib/generators';

export default Generator('abort-if-errors', () => new NoErrorsPlugin());
