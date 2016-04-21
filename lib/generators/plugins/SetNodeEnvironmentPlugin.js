var webpack = require('webpack');

var nodeEnv = process.env.NODE_ENV || 'production';

module.exports = new webpack.DefinePlugin({
 'process.env': { NODE_ENV: JSON.stringify(nodeEnv) }
});
