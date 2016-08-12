module.exports = {
  test: /\.es6\.js$|\.js$|\.jsx$/,
  exclude: /node_modules/,
  loader: 'babel',
  query: {
    presets: [
      'es2015-native-modules',
      'stage-2',
      'react',
    ].map(function(p) { return require.resolve('babel-preset-' + p) }),
    plugins: [
      'transform-class-properties',
      'transform-react-constant-elements',
      'transform-react-inline-elements',
      'lodash', // fixes the babel budnling issue
    ].map(function(p) { return require.resolve('babel-plugin-' + p) }),
  }
};
