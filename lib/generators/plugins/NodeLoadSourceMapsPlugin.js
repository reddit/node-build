var webpack = require('webpack');

module.exports = new webpack.BannerPlugin({
  banner: 'require("source-map-support").install();',
  raw: true,
  entryOnly: false,
});
