var webpack = require('webpack');

module.exports = new webpack.optimize.CommonsChunkPlugin({
   name: 'vendor',
   minChunks: Infinity,
   filename: 'vendor.bundle.js'
 });
