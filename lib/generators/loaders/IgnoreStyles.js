import { Generator } from 'lib/generators';

export default Generator('ignore-styles', {
  test: /\.css$|\.less$/,
  loader: 'ignore-loader',
});
