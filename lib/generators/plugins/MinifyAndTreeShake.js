import { optimize } from 'webpack';
const { UglifyJsPlugin } = optimize;
import { Generator } from 'lib/generators/Generator';

export default Generator('minify-and-treeshake', () => {
  return new UglifyJsPlugin({
  compress: { warnings: false },
  output: { comments: false },
  sourceMap: true,
});});
