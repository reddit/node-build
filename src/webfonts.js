import colors from 'colors';
import glob from 'glob';
import path from 'path';
import webfontsGenerator from 'webfonts-generator';

const SRC = path.resolve('./assets/svg/*.svg');

glob(SRC, (error, files) => {
  /* eslint-disable max-len */
  console.log(`${colors.yellow('[Webfonts] generating from')} ${colors.white(JSON.stringify(files, null, 2))}`);
  /* eslint-enable */

  if (error) {
    console.log(`${colors.red('[Error]')} ${colors.white(JSON.stringify(error, null, 2))}`);
  }

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
