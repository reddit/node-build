import ExtractTextPlugin from 'extract-text-webpack-plugin';

import { Generator } from 'lib/generators';

export default Generator('less', {
  test: /\.less$/,
  loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!less-loader'),
});
