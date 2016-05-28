import { Generator } from 'lib/generators';

export default Generator('json', {
  test: /\.json$/,
  loader: 'json-loader',
});
