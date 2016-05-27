import ExtractTextPlugin from 'extract-text-webpack-plugin';
import { Generator } from 'lib/generators/Generator';

export default new Generator('extract-css', () => (new ExtractTextPlugin('[name].css')));
