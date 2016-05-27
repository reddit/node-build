var webpack = require('webpack');

module.exports = new webpack.BannerPlugin({
  banner: '#!/usr/bin/env node',
  raw: true,
  entryOnly: true,
});
