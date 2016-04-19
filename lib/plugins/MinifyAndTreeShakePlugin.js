var webpack = require('webpack');

module.exportgs = new webpack.optimize.UglifyJsPlugin({
  compress: {
    warnings: false
  },
  output: {
    comments: false
  },
  sourceMap: true,
});
