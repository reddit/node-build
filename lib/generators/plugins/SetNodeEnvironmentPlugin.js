var webpack = require('webpack');

var nodeEnv = process.env.NODE_ENV || 'production';
var env = process.env.ENV || 'server';

module.exports = function(options) {
  return new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(options.nodeEnv || nodeEnv),
      ENV: JSON.stringify(options.env || env),
    },
  });
};
