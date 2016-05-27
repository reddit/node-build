#!/usr/bin/env node
var glob = require('glob');
var path = require('path');
var webfontsGenerator = require('webfonts-generator');

var SRC = path.resolve('./assets/svg/*.svg');

glob(SRC, function(error, files) {
  console.log('generating font from:\n', files);

  webfontsGenerator({
    files: files,
    dest: path.resolve('./assets/fonts'),
    fontName: 'rfont',
    css: true,
    cssDest: path.resolve('./assets/fonts/rfont.css'),
    cssFontsUrl: '/fonts',
    html: true,
    types: ['svg', 'ttf', 'woff', 'eot'],
    normalize: true,
  })
});
