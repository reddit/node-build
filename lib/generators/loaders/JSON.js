import { Generator } from 'lib/generators/Generator';

export default Generator('json', {
  test: /\.json$/,
  loader: 'json-loader',
});
