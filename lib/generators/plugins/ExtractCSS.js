import ExtractTextPlugin from 'extract-text-webpack-plugin';
import { Generator } from 'lib/generators';

export default Generator('extract-css', () => (new ExtractTextPlugin('[name].css')));
