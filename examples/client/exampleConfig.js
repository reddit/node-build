var webpack = require('webpack');
var path = require('path');

// simple manually build example config file that does es6 / es7 / JSX
// along with tree shaking and generating source-maps

module.exports = {
  builds:
  [
    {
      watch: false,
      buildName: 'ExampleClient',
      devtool: 'source-map',
      webpackConfig: {
        entry: { ExampleClient: './examples/client/client.es6.js' },
        output: {
          path: path.join(__dirname, 'bin'),
          filename :'[name].js',
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
