import ExtractTextPlugin from 'extract-text-webpack-plugin';

import { Generator } from 'lib/generators/Generator';

export default Generator('css', {
  test: /\.css$/,
  loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader'),
});
