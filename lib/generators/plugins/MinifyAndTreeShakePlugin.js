var webpack = require('webpack');

module.exports = new webpack.optimize.UglifyJsPlugin({
  compress: {
    warnings: false
  },
  output: {
    comments: false
  },
  sourceMap: true,
});
