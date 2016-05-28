import { optimize } from 'webpack';
const { UglifyJsPlugin } = optimize;
import { Generator } from 'lib/generators';

export default Generator('minify-and-treeshake', () => (new UglifyJsPlugin({
  compress: { warnings: false },
  output: { comments: false },
  sourceMap: true,
})));
