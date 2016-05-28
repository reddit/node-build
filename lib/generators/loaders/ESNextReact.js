import { Generator } from 'lib/generators';

export default Generator(['esnextreact', 'ESNextReact'], {
  test: /\.es6\.js$|\.js$|\.jsx$/,
  exclude: /node_modules/,
  loader: 'babel',
  query: {
    presets: [
      'es2015-native-modules',
      'stage-2',
      'react',
    ],
    plugins: [
      'transform-class-properties',
      'transform-react-constant-elements',
      'transform-react-inline-elements',
      'lodash', // fixes the babel budnling issue
    ],
  },
});
