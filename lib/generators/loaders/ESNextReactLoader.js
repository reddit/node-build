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
      // 'transform-react-constant-elements',
      // 'transform-react-inline-elements',
      'transform-object-rest-spread',
      'transform-es2015-destructuring',
      ['transform-builtin-extend', {
        globals: [
          'Error',
        ],
      }],
      'lodash', // fixes the babel budnling issue
    ].map(function(p) {
      if (Array.isArray(p)) {
        return [
          require.resolve(`babel-plugin-${p[0]}`),
          ...p.slice(1),
        ];
      }

      return require.resolve('babel-plugin-' + p);
    }),
  }
};
