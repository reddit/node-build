#!/usr/bin/env node
var glob = require('glob');
var path = require('path');
var webfontsGenerator = require('webfonts-generator');

var SRC = path.join(__dirname, '/assets/svg/*.svg');

glob(SRC, function(error, files) {
  console.log('generating font from:\n', files);

  webfontsGenerator({
    files: files,
    dest: path.join(__dirname, '/assets/fonts'),
    fontName: 'rfont',
    css: true,
    cssDest: path.join(__dirname, '/src/client/rfont.css'),
    cssFontsPath: '/assets/fonts',
    html: true,
    types: ['svg', 'ttf', 'woff', 'eot'],
    normalize: true,
  })
});
