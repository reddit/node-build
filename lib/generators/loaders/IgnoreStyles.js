import { Generator } from 'lib/generators/Generator';

export default Generator('ignore-styles', {
  test: /\.css$|\.less$/,
  loader: 'ignore-loader',
});
