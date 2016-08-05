module.exports = [
  'esnextreact',
  'json',
  'css',
  // Enable less and tell webpack that our static asses all live in <project>/assets
  {
    generator: 'less',
    assetsDirectory: 'assets',
    publicPath: './',
  },
  // resolves webfonts urls, assumes they all live in <project>/assets/fonts
  {
    test: /\/fonts\/.*\.(eot|woff|ttf|svg)(\?.+)?$/,
    loader: 'file?emitFile=false&name=fonts/[name].[ext]',
  },
  // resolves images as urls, assumes they all live in <project>/assets/img
  {
    test: /\/img\/.*\.(png|svg|jpe?g|gif|tiff)$/,
    loader: 'file?emitFile=false&name=img/[name].[ext]',
  },
];
