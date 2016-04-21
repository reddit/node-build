var webpack = require('webpack');
var path = require('path');
var makeBuild = require('../../lib/makeBuild').makeBuild;

// simple manually build example config file that does es6 / es7 / JSX
// along with tree shaking and generating source-maps
// note the paths are because we want to be able to run npm run build from the top level directory
module.exports = {
  builds: [
    makeBuild({
      name: 'ExampleClient',
      watch: true,
      webpack: {
        entry: './examples/client/client.es6.js',
        output: {
          generator: 'umd',
          dest: './examples/client/bin',
        },
        resolve: {
          generator: 'npm-and-modules',
          extensions: ['', '.js', '.jsx', '.es6.js'],
        },
        loaders: [
          'esnextreact',
          'json',
        ],
        plugins: [
          'bundle-common',
          'production-loaders',
          'set-node-env',
          'minify-and-treeshake',
          'node-load-sourcemaps',
          'abort-if-errors',
        ],
      }
    })
  ]
};


/* The above will generate a config that looks something like this
module.exports = {
  builds:
  [
    {
      watch: false,
      buildName: 'ExampleClient',
      webpackConfig: {
        entry: { ExampleClient: './examples/client/client.es6.js' },
        output: {
          path: path.join(__dirname, 'bin'),
          filename :'[name].js',
          libray: '[name].js'
          libraryOfTarget: 'umd',
        },
        resolve: {
          extensions: ['', '.es6.js', '.jsx', '.js', '.json'],
          modules: [
            path.resolve('./src'),
            'node_modules',
          ],
        },
        module: {
          loaders: [
            {
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
                ],
              },
            },
            {
              test: /\.json$/,
              loader: 'json-loader',
            },
          ],
        },
        plugins: [
        // split entry points common code into a vendor bundle
        new webpack.optimize.CommonsChunkPlugin({
           name: 'vendor',
           minChunks: Infinity,
           filename: 'vendor.bundle.js'
         }),

         // minification
         new webpack.LoaderOptionsPlugin({
           minimize: true,
           debug: false
         }),

         // uglify and more minifiaction,
         new webpack.optimize.UglifyJsPlugin({
           compress: {
             warnings: false
           },
           output: {
             comments: false
           },

           sourceMap: false
         }),

         // provide process.env variable based on compile
         new webpack.DefinePlugin({
           'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development') }
         }),

         // avoid overrwriting builds if there were errors
         new webpack.NoErrorsPlugin(),
       ]
     }
   }
 ]
};
*/
