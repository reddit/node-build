import { tryToLoadGenerator } from 'lib/generators/tryToLoad';
var AutoprefixerPostCSS = require('./AutoprexiferPostCSS');

var postCSSHooks = {
  'autoprefixer-custom': AutoprefixerPostCSS,
  'autoprefixer': AutoprefixerPostCSS({ numVersions: 2 }),
};

var getPostCSS = function(postCSSHookName) {
  return tryToLoadGenerator(postCSSHookName, postCSSHooks, 'postcsshooks');
}

module.exports = {
  postCSSHooks,
  getPostCSS,
};
