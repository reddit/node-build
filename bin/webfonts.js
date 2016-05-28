#!/usr/bin/env node
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

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

	"use strict";
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_colors__ = __webpack_require__(4);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_colors___default = __WEBPACK_IMPORTED_MODULE_0_colors__ && __WEBPACK_IMPORTED_MODULE_0_colors__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0_colors__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0_colors__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_0_colors___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_0_colors___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_glob__ = __webpack_require__(0);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_glob___default = __WEBPACK_IMPORTED_MODULE_1_glob__ && __WEBPACK_IMPORTED_MODULE_1_glob__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_1_glob__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_1_glob__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_1_glob___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_1_glob___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_path__ = __webpack_require__(1);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_path___default = __WEBPACK_IMPORTED_MODULE_2_path__ && __WEBPACK_IMPORTED_MODULE_2_path__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_2_path__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_2_path__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_2_path___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_2_path___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_webfonts_generator__ = __webpack_require__(2);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_webfonts_generator___default = __WEBPACK_IMPORTED_MODULE_3_webfonts_generator__ && __WEBPACK_IMPORTED_MODULE_3_webfonts_generator__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_3_webfonts_generator__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_3_webfonts_generator__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_3_webfonts_generator___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_3_webfonts_generator___default });





	var SRC = /* harmony import */__WEBPACK_IMPORTED_MODULE_2_path___default.a.resolve('./assets/svg/*.svg');

	/* harmony import */__WEBPACK_IMPORTED_MODULE_1_glob___default.a.bind()(SRC, function (error, files) {
	  /* eslint-disable max-len */
	  console.log(/* harmony import */__WEBPACK_IMPORTED_MODULE_0_colors___default.a.yellow('[Webfonts] generating from') + ' ' + /* harmony import */__WEBPACK_IMPORTED_MODULE_0_colors___default.a.white(JSON.stringify(files, null, 2)));
	  /* eslint-enable */

	  if (error) {
	    console.log(/* harmony import */__WEBPACK_IMPORTED_MODULE_0_colors___default.a.red('[Error]') + ' ' + /* harmony import */__WEBPACK_IMPORTED_MODULE_0_colors___default.a.white(JSON.stringify(error, null, 2)));
	  }

	  /* harmony import */__WEBPACK_IMPORTED_MODULE_3_webfonts_generator___default.a.bind()({
	    files: files,
	    dest: /* harmony import */__WEBPACK_IMPORTED_MODULE_2_path___default.a.resolve('./assets/fonts'),
	    fontName: 'rfont',
	    css: true,
	    cssDest: /* harmony import */__WEBPACK_IMPORTED_MODULE_2_path___default.a.resolve('./assets/fonts/rfont.css'),
	    cssFontsUrl: '/fonts',
	    html: true,
	    types: ['svg', 'ttf', 'woff', 'eot'],
	    normalize: true
	  });
	});

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("colors");

/***/ }
/******/ ]);