var ExtractTextPlugin = require('extract-text-webpack-plugin');

// Extracts css into a bundled file. If you pass contenthash === true the output
// filename will contain a content hash for cache-busing. If you go that route
// you should use a manifest plugin like 'webpack-manifest-plugin'.
module.exports = function(options) {
  return new ExtractTextPlugin({
    filename: options.contenthash ? '[name].[contenthash].css' : '[name].css',
  });
};
