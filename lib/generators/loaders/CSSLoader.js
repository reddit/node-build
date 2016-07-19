var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  test: /\.css$/,
  loader: ExtractTextPlugin.extract({ notExtractLoader: 'style-loader', loader: 'css-loader!postcss-loader'}),
};
