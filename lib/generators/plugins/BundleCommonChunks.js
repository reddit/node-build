import { optimize } from 'webpack';
const { CommonsChunkPlugin } = optimize;
import { Generator } from 'lib/generators/Generator';

export default Generator('bundle-common', () => (new CommonsChunkPlugin({
   name: 'vendor',
   minChunks: Infinity,
   filename: 'vendor.bundle.js'
 })));
