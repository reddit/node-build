import { BannerPlugin } from 'webpack';
import { Generator } from 'lib/generators/Generator';

export default Generator('node-executable', () => (new BannerPlugin({
  banner: '#!/usr/bin/env node',
  raw: true,
  entryOnly: true,
})));
