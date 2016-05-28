import path from 'path';

import { Generator } from 'lib/generators';

export default Generator('simple', options => ({
  path: path.resolve(options.dest),
  filename: options.name || '[name].js',
}));
