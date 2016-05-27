import { DefinePlugin } from 'webpack';
import { Generator } from 'lib/generators/Generator';

export default Generator('set-node-env', options => {
  const nodeEnv = process.env.NODE_ENV || 'production';
  const env = process.env.ENV || 'server';

  return new DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(options.nodeEnv || nodeEnv),
      ENV: JSON.stringify(options.env || env),
    },
  });
});
