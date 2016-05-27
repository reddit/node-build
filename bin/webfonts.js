#!/usr/bin/env node
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	module.exports = require("glob");

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("webfonts-generator");

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var glob = __webpack_require__(0);
	var path = __webpack_require__(1);
	var webfontsGenerator = __webpack_require__(2);
	
	var SRC = path.resolve('./assets/svg/*.svg');
	
	glob(SRC, function (error, files) {
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
	    normalize: true
	  });
	});

/***/ }
/******/ ]);
//# sourceMappingURL=webfonts.js.map