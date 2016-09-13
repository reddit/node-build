var webpack = require('webpack');
var merge = require('lodash/merge');


module.exports = function(options) {
  const pluginOptions = merge({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production'),
      ENV: JSON.stringify(process.env.ENV || 'server'),
    },
  }, options);

  return new webpack.DefinePlugin(pluginOptions);
};
