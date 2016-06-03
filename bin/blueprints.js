#!/usr/bin/env node
var SUPER_SECRET_REQUIRE_ONLY_CONFIG_LOADING_SHOULD_USE = require;
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
/******/ 	return __webpack_require__(__webpack_require__.s = 48);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var Generator = function Generator(nameOrNames, objectOrFunction) {
	  var names = nameOrNames;
	  if (!Array.isArray(names)) {
	    names = [names];
	  }

	  return {
	    names: names,
	    objectOrFunction: objectOrFunction
	  };
	};
	/* harmony export */ Object.defineProperty(exports, "a", {configurable: false, enumerable: true, get: function() { return Generator; }});

	var applyGenerators = function applyGenerators(loaders, generator) {
	  generator.names.forEach(function (name) {
	    loaders[name] = generator.objectOrFunction;
	  });

	  return loaders;
	};

	var generatorLoader = function generatorLoader(thingKind, generators) {
	  var loaders = generators.reduce(function (prev, generator) {
	    return applyGenerators(_extends({}, prev), generator);
	  }, {});
	  return function (loaderName) {
	    return tryToLoadGenerator(loaderName, loaders, thingKind);
	  };
	};
	/* harmony export */ Object.defineProperty(exports, "b", {configurable: false, enumerable: true, get: function() { return generatorLoader; }});

	var tryToLoadGenerator = function tryToLoadGenerator(nameOrObject, lookupTable, thingKind) {
	  var parsed = parseNameOrObject(nameOrObject);
	  if (!parsed) {
	    return nameOrObject;
	  }

	  var thing = lookupTable[parsed.name];
	  if (!thing) {
	    throw new Error('Failed to resolve ' + nameOrObject + ' - ' + thingKind);
	  }

	  if (typeof thing === 'function') {
	    return thing(parsed.options);
	  }

	  return thing;
	};/* unused harmony export tryToLoadGenerator */

	var parseNameOrObject = function parseNameOrObject(nameOrObject) {
	  if (typeof nameOrObject === 'string') {
	    return { name: nameOrObject, options: {} };
	  }

	  if ((typeof nameOrObject === 'undefined' ? 'undefined' : _typeof(nameOrObject)) === 'object') {
	    var name = nameOrObject.generator;
	    if (typeof name === 'string') {
	      return { name: name, options: nameOrObject };
	    }
	  }
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("webpack");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("extract-text-webpack-plugin");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("colors");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("lodash/object");

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_path__ = __webpack_require__(2);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_path___default = __WEBPACK_IMPORTED_MODULE_0_path__ && __WEBPACK_IMPORTED_MODULE_0_path__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0_path__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0_path__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_0_path___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_0_path___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lib_generators__ = __webpack_require__(0);




	/* harmony default export */ exports["a"] = /* harmony import */__WEBPACK_IMPORTED_MODULE_1_lib_generators__["a"].bind()('simple', function (options) {
	  return {
	    path: /* harmony import */__WEBPACK_IMPORTED_MODULE_0_path___default.a.resolve(options.dest),
	    filename: options.name || '[name].js'
	  };
	});

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_path__ = __webpack_require__(2);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_path___default = __WEBPACK_IMPORTED_MODULE_0_path__ && __WEBPACK_IMPORTED_MODULE_0_path__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0_path__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0_path__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_0_path___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_0_path___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lib_generators__ = __webpack_require__(0);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Simple__ = __webpack_require__(8);
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };




	var simple = /* harmony import */__WEBPACK_IMPORTED_MODULE_2__Simple__["a"].objectOrFunction; // its a function;

	var resolvePath = function resolvePath(strPath) {
	  return /* harmony import */__WEBPACK_IMPORTED_MODULE_0_path___default.a.resolve(strPath);
	};

	/* harmony default export */ exports["a"] = /* harmony import */__WEBPACK_IMPORTED_MODULE_1_lib_generators__["a"].bind()('modules', function (options) {
	  return _extends({}, simple(options), {
	    modules: (options.paths || []).map(resolvePath)
	  });
	});

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lib_generators__ = __webpack_require__(0);


	/* harmony default export */ exports["a"] = /* harmony import */__WEBPACK_IMPORTED_MODULE_0_lib_generators__["a"].bind()('simple', function (options) {
	  return {
	    extensions: options.extensions
	  };
	});

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webpack__ = __webpack_require__(1);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webpack___default = __WEBPACK_IMPORTED_MODULE_0_webpack__ && __WEBPACK_IMPORTED_MODULE_0_webpack__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0_webpack__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0_webpack__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_0_webpack___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_0_webpack___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_node_notifier__ = __webpack_require__(50);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_node_notifier___default = __WEBPACK_IMPORTED_MODULE_1_node_notifier__ && __WEBPACK_IMPORTED_MODULE_1_node_notifier__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_1_node_notifier__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_1_node_notifier__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_1_node_notifier___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_1_node_notifier___default });



	var build = function build(config, cb) {
	  var callback = cb || function () {};
	  var run = function run(build) {
	    return executeBuild(build, callback);
	  };
	  config.builds.forEach(run);
	};
	/* harmony export */ Object.defineProperty(exports, "a", {configurable: false, enumerable: true, get: function() { return build; }});

	var executeBuild = function executeBuild(build, cb) {
	  var compiler = /* harmony import */__WEBPACK_IMPORTED_MODULE_0_webpack___default.a.bind()(build.wepback);
	  if (build.watch) {
	    compiler.watch({}, function (err, stats) {
	      outputBuild(build.name)(err, stats);
	      cb(stats.toJson());
	    });

	    return;
	  }

	  compiler.run(function (err, stats) {
	    console.log(stats.toString({
	      colors: !build.disableColors,
	      chunks: false,
	      version: false
	    }));

	    cb(stats.toJson());
	  });
	};

	var formatAsset = function formatAsset(asset) {
	  var name = asset.name;
	  var size = asset.size;
	  var sizeStr = size + ' B';

	  if (size > 1000) {
	    sizeStr = Math.ceil(size / 1000) + ' kB';
	  }
	  if (size > 1000000) {
	    sizeStr = Math.ceil(size / 1000000) + ' MB';
	  }

	  return name + ' [' + sizeStr + ']';
	};

	var outputBuild = function outputBuild(type) {
	  return function (err, stats) {
	    if (err) {
	      console.log('error in build', err);
	      return;
	    }

	    console.log(stats.toString({
	      colors: true,
	      chunks: false,
	      version: false
	    }));

	    var buildStats = stats.toJson();
	    var errors = buildStats.errors;


	    if (errors && errors.length) {
	      /* harmony import */__WEBPACK_IMPORTED_MODULE_1_node_notifier___default.a.notify({
	        title: type + ' - ERROR!',
	        message: 'Check the console for errors'
	      });
	      return;
	    }

	    /* harmony import */__WEBPACK_IMPORTED_MODULE_1_node_notifier___default.a.notify({
	      title: type + ' - Build complete',
	      message: buildStats.assets.map(formatAsset).join('\n')
	    });
	  };
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/* harmony default export */ exports["a"] = {
	  name: 'Test',
	  webpack: {
	    devtool: 'source-map',
	    output: {
	      path: './.test',
	      filename: '[name]'
	    },
	    resolve: {
	      generator: 'npm-and-modules',
	      paths: ['src', 'lib'],
	      extensions: ['', '.js', '.jsx', '.es6.js', '.json']
	    },
	    loaders: ['esnextreact', 'json', 'ignore-styles'],
	    plugins: ['extract-css', 'abort-if-errors'],
	    externals: {
	      generator: 'node-modules',
	      additional: ['@r/platform/createTest']
	    }
	  }
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Client__ = __webpack_require__(19);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ProductionClient__ = __webpack_require__(20);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Server__ = __webpack_require__(22);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ProductionServer__ = __webpack_require__(21);





	var getBuild = function getBuild(production, debugConfig, productionConfig) {
	  return production ? productionConfig : debugConfig;
	};

	var getClientConfig = function getClientConfig(production) {
	  return getBuild(production, /* harmony import */__WEBPACK_IMPORTED_MODULE_0__Client__["a"], /* harmony import */__WEBPACK_IMPORTED_MODULE_1__ProductionClient__["a"]);
	};
	/* harmony export */ Object.defineProperty(exports, "a", {configurable: false, enumerable: true, get: function() { return getClientConfig; }});

	var getServerConfig = function getServerConfig(production) {
	  return getBuild(production, /* harmony import */__WEBPACK_IMPORTED_MODULE_2__Server__["a"], /* harmony import */__WEBPACK_IMPORTED_MODULE_3__ProductionServer__["a"]);
	};
	/* harmony export */ Object.defineProperty(exports, "b", {configurable: false, enumerable: true, get: function() { return getServerConfig; }});

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_colors__ = __webpack_require__(4);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_colors___default = __WEBPACK_IMPORTED_MODULE_0_colors__ && __WEBPACK_IMPORTED_MODULE_0_colors__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0_colors__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0_colors__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_0_colors___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_0_colors___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__getTestFiles__ = __webpack_require__(47);



	var magenta = /* harmony import */__WEBPACK_IMPORTED_MODULE_0_colors___default.a.magenta;


	var getWebpackEntryForTest = function getWebpackEntryForTest(dir) {
	  console.log(magenta('Searching for tests in ' + process.cwd()));

	  var files = /* harmony import */__WEBPACK_IMPORTED_MODULE_1__getTestFiles__["a"].bind()(dir, '.test.');
	  console.log(magenta('Found ' + files.length + ' test' + (files.length ? 's' : '')));

	  return files.reduce(function (prev, cur) {
	    var moduleName = cur.path.split('.test')[0].split('./')[1] + '.compiledtest';
	    prev[moduleName] = cur.path;
	    return prev;
	  }, {});
	};
	/* harmony export */ Object.defineProperty(exports, "a", {configurable: false, enumerable: true, get: function() { return getWebpackEntryForTest; }});

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_object__ = __webpack_require__(5);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_object___default = __WEBPACK_IMPORTED_MODULE_0_lodash_object__ && __WEBPACK_IMPORTED_MODULE_0_lodash_object__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0_lodash_object__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0_lodash_object__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_0_lodash_object___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_0_lodash_object___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lib_generators_loaders__ = __webpack_require__(31);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lib_generators_plugins__ = __webpack_require__(42);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lib_generators_output__ = __webpack_require__(33);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_lib_generators_resolver__ = __webpack_require__(46);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_lib_generators_entry__ = __webpack_require__(23);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_lib_generators_postcss__ = __webpack_require__(44);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_lib_generators_externals__ = __webpack_require__(24);
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };











	// ShortBuild is an object that looks like {
	//  name: String,
	//  watch: Bool,
	//  webpack: Object, shorthand webpack config
	//}

	var makeBuild = function makeBuild(shortBuild) {
	  return _extends({}, shortBuild, {
	    wepback: parseWebpackConfig(shortBuild.webpack, shortBuild.name)
	  });
	};
	/* harmony export */ Object.defineProperty(exports, "a", {configurable: false, enumerable: true, get: function() { return makeBuild; }});

	var mapNullable = function mapNullable(arrayOrNull, fn) {
	  return (arrayOrNull || []).map(fn);
	};

	var parseWebpackConfig = function parseWebpackConfig(shortHandConfig, buildName) {
	  var webpackConfig = {
	    entry: /* harmony import */__WEBPACK_IMPORTED_MODULE_5_lib_generators_entry__["a"].bind()(shortHandConfig.entry, buildName),
	    output: /* harmony import */__WEBPACK_IMPORTED_MODULE_3_lib_generators_output__["a"].bind()(shortHandConfig.output),
	    module: {
	      loaders: mapNullable(shortHandConfig.loaders, /* harmony import */__WEBPACK_IMPORTED_MODULE_1_lib_generators_loaders__["a"])
	    },
	    plugins: mapNullable(shortHandConfig.plugins, /* harmony import */__WEBPACK_IMPORTED_MODULE_2_lib_generators_plugins__["a"]),
	    resolve: /* harmony import */__WEBPACK_IMPORTED_MODULE_4_lib_generators_resolver__["a"].bind()(shortHandConfig.resolve),
	    postcss: mapNullable(shortHandConfig.postcss, /* harmony import */__WEBPACK_IMPORTED_MODULE_6_lib_generators_postcss__["a"]),
	    externals: /* harmony import */__WEBPACK_IMPORTED_MODULE_7_lib_generators_externals__["a"].bind()(shortHandConfig.externals)
	  };

	  return _extends({}, webpackConfig, /* harmony import */__WEBPACK_IMPORTED_MODULE_0_lodash_object__["omit"].bind()(shortHandConfig, Object.keys(webpackConfig).concat('loaders')));
	};

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = require("debug");

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = require("mocha");

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = require("rimraf");

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = require("yargs");

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/* harmony default export */ exports["a"] = {
	  name: 'Client',
	  webpack: {
	    devtool: 'source-map',
	    entry: './src/Client.js',
	    output: {
	      generator: 'simple',
	      dest: './bin'
	    },
	    resolve: {
	      generator: 'npm-and-modules',
	      paths: ['src', 'lib'],
	      extensions: ['', '.js', '.jsx', '.es6.js', '.json']
	    },
	    loaders: ['esnextreact', 'json', 'css', 'less'],
	    plugins: ['extract-css', 'abort-if-errors', {
	      generator: 'set-node-env',
	      env: 'client'
	    }]
	  }
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/* harmony default export */ exports["a"] = {
	  name: 'ProductionClient',
	  webpack: {
	    devtool: 'source-map',
	    entry: './src/Client.js',
	    output: {
	      generator: 'simple',
	      dest: './bin'
	    },
	    resolve: {
	      generator: 'npm-and-modules',
	      paths: ['src', 'lib'],
	      extensions: ['', '.js', '.jsx', '.es6.js', '.json']
	    },
	    loaders: ['esnextreact', 'json', 'css', 'less'],
	    plugins: ['extract-css', {
	      generator: 'set-node-env',
	      env: 'client'
	    }, 'production-loaders', 'minify-and-treeshake', 'abort-if-errors']
	  }
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/* harmony default export */ exports["a"] = {
	  name: 'ProductionServer',
	  webpack: {
	    devtool: 'source-map',
	    entry: './src/Server.js',
	    output: {
	      generator: 'simple',
	      dest: './bin'
	    },
	    externals: {
	      generator: 'node-modules',
	      additional: ['os']
	    },
	    resolve: {
	      generator: 'npm-and-modules',
	      paths: ['src', 'lib'],
	      extensions: ['', '.js', '.jsx', '.es6.js', '.json']
	    },
	    loaders: ['esnextreact', 'json', 'ignore-styles'],
	    plugins: ['production-loaders', 'minify-and-treeshake', 'abort-if-errors', 'node-load-sourcemaps'],
	    node: {
	      Buffer: false,
	      process: false,
	      global: false,
	      __filename: true,
	      __dirname: true
	    }
	  }
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/* harmony default export */ exports["a"] = {
	  name: 'Server',
	  webpack: {
	    devtool: 'source-map',
	    entry: './src/Server.js',
	    output: {
	      generator: 'simple',
	      dest: './bin'
	    },
	    externals: {
	      generator: 'node-modules',
	      additional: ['os']
	    },
	    resolve: {
	      generator: 'npm-and-modules',
	      paths: ['src', 'lib'],
	      extensions: ['', '.js', '.jsx', '.es6.js', '.json']
	    },
	    loaders: ['esnextreact', 'json', 'ignore-styles'],
	    plugins: ['abort-if-errors', 'node-load-sourcemaps'],
	    node: {
	      Buffer: false,
	      process: false,
	      global: false,
	      __filename: true,
	      __dirname: true,
	      os: false
	    }
	  }
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_path__ = __webpack_require__(2);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_path___default = __WEBPACK_IMPORTED_MODULE_0_path__ && __WEBPACK_IMPORTED_MODULE_0_path__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0_path__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0_path__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_0_path___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_0_path___default });
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };



	var getEntry = function getEntry(pathOrObject, buildName) {
	  // for now takes the path to the file, and the build name and makes
	  // the entry point object. in the future we can do things like auto traverers
	  // the module paths you're resolving and generate tree-shaking-less umd ready builds
	  // but if everything internal is using the build project its a little pointless
	  // return tryToLoadGenerator(entryName, entryGenerators, 'entry');
	  if ((typeof pathOrObject === 'undefined' ? 'undefined' : _typeof(pathOrObject)) === 'object') {
	    return pathOrObject;
	  }

	  var entryConfig = {};
	  entryConfig[buildName] = /* harmony import */__WEBPACK_IMPORTED_MODULE_0_path___default.a.resolve(pathOrObject);
	  return entryConfig;
	};
	/* harmony export */ Object.defineProperty(exports, "a", {configurable: false, enumerable: true, get: function() { return getEntry; }});

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__loadNodeModules__ = __webpack_require__(25);
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };



	var loaderName = 'node-modules';

	var getExternals = function getExternals(externals) {
	  if (typeof externals === 'string') {
	    if (externals === loaderName) {
	      return /* harmony import */__WEBPACK_IMPORTED_MODULE_0__loadNodeModules__["a"].bind()();
	    }

	    throw new Error('Invalid externals loader name, did you mean: ' + loaderName + ' ?');
	  }

	  if ((typeof externals === 'undefined' ? 'undefined' : _typeof(externals)) === 'object') {
	    if (externals.generator === loaderName) {
	      return /* harmony import */__WEBPACK_IMPORTED_MODULE_0__loadNodeModules__["a"].bind()(externals.additional);
	    }

	    return externals;
	  }
	};
	/* harmony export */ Object.defineProperty(exports, "a", {configurable: false, enumerable: true, get: function() { return getExternals; }});

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_fs__ = __webpack_require__(9);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_fs___default = __WEBPACK_IMPORTED_MODULE_0_fs__ && __WEBPACK_IMPORTED_MODULE_0_fs__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0_fs__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0_fs__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_0_fs___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_0_fs___default });


	var prependCommonjs = function prependCommonjs(modules, name) {
	  modules[name] = 'commonjs ' + name;
	  return modules;
	};

	var lodashSubmodules = ['array', 'collection', 'date', 'function', 'lang', 'math', 'number', 'object', 'seq', 'string', 'util', 'properties', 'methods'].map(function (name) {
	  return 'lodash/' + name;
	});

	var loadNodeModules = function loadNodeModules(additional) {
	  var nodeModules = {};

	  /* harmony import */__WEBPACK_IMPORTED_MODULE_0_fs___default.a.readdirSync('node_modules').filter(function (x) {
	    return ['.bin'].indexOf(x) === -1;
	  }).reduce(prependCommonjs, nodeModules);

	  if (additional) {
	    additional.reduce(prependCommonjs, nodeModules);
	  }

	  if (nodeModules.lodash) {
	    lodashSubmodules.reduce(prependCommonjs, nodeModules);
	  }

	  return nodeModules;
	};
	/* harmony export */ Object.defineProperty(exports, "a", {configurable: false, enumerable: true, get: function() { return loadNodeModules; }});

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_extract_text_webpack_plugin__ = __webpack_require__(3);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_extract_text_webpack_plugin___default = __WEBPACK_IMPORTED_MODULE_0_extract_text_webpack_plugin__ && __WEBPACK_IMPORTED_MODULE_0_extract_text_webpack_plugin__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0_extract_text_webpack_plugin__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0_extract_text_webpack_plugin__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_0_extract_text_webpack_plugin___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_0_extract_text_webpack_plugin___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lib_generators__ = __webpack_require__(0);




	/* harmony default export */ exports["a"] = /* harmony import */__WEBPACK_IMPORTED_MODULE_1_lib_generators__["a"].bind()('css', {
	  test: /\.css$/,
	  loader: /* harmony import */__WEBPACK_IMPORTED_MODULE_0_extract_text_webpack_plugin___default.a.extract('style-loader', 'css-loader!postcss-loader')
	});

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lib_generators__ = __webpack_require__(0);


	/* harmony default export */ exports["a"] = /* harmony import */__WEBPACK_IMPORTED_MODULE_0_lib_generators__["a"].bind()(['esnextreact', 'ESNextReact'], {
	  test: /\.es6\.js$|\.js$|\.jsx$/,
	  exclude: /node_modules/,
	  loader: 'babel',
	  query: {
	    presets: ['es2015-native-modules', 'stage-2', 'react'],
	    plugins: ['transform-class-properties', 'transform-react-constant-elements', 'transform-react-inline-elements', 'lodash']
	  }
	});

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lib_generators__ = __webpack_require__(0);


	/* harmony default export */ exports["a"] = /* harmony import */__WEBPACK_IMPORTED_MODULE_0_lib_generators__["a"].bind()('ignore-styles', {
	  test: /\.css$|\.less$/,
	  loader: 'ignore-loader'
	});

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lib_generators__ = __webpack_require__(0);


	/* harmony default export */ exports["a"] = /* harmony import */__WEBPACK_IMPORTED_MODULE_0_lib_generators__["a"].bind()('json', {
	  test: /\.json$/,
	  loader: 'json-loader'
	});

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_extract_text_webpack_plugin__ = __webpack_require__(3);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_extract_text_webpack_plugin___default = __WEBPACK_IMPORTED_MODULE_0_extract_text_webpack_plugin__ && __WEBPACK_IMPORTED_MODULE_0_extract_text_webpack_plugin__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0_extract_text_webpack_plugin__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0_extract_text_webpack_plugin__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_0_extract_text_webpack_plugin___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_0_extract_text_webpack_plugin___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lib_generators__ = __webpack_require__(0);




	/* harmony default export */ exports["a"] = /* harmony import */__WEBPACK_IMPORTED_MODULE_1_lib_generators__["a"].bind()('less', {
	  test: /\.less$/,
	  loader: /* harmony import */__WEBPACK_IMPORTED_MODULE_0_extract_text_webpack_plugin___default.a.extract('style-loader', 'css-loader!postcss-loader!less-loader')
	});

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lib_generators__ = __webpack_require__(0);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__CSS__ = __webpack_require__(26);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ESNextReact__ = __webpack_require__(27);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__IgnoreStyles__ = __webpack_require__(28);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__JSON__ = __webpack_require__(29);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Less__ = __webpack_require__(30);








	var getLoader = /* harmony import */__WEBPACK_IMPORTED_MODULE_0_lib_generators__["b"].bind()('loader', [/* harmony import */__WEBPACK_IMPORTED_MODULE_1__CSS__["a"], /* harmony import */__WEBPACK_IMPORTED_MODULE_2__ESNextReact__["a"], /* harmony import */__WEBPACK_IMPORTED_MODULE_3__IgnoreStyles__["a"], /* harmony import */__WEBPACK_IMPORTED_MODULE_4__JSON__["a"], /* harmony import */__WEBPACK_IMPORTED_MODULE_5__Less__["a"]]);
	/* harmony export */ Object.defineProperty(exports, "a", {configurable: false, enumerable: true, get: function() { return getLoader; }});

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lib_generators__ = __webpack_require__(0);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Simple__ = __webpack_require__(6);
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



	var simple = /* harmony import */__WEBPACK_IMPORTED_MODULE_1__Simple__["a"].objectOrFunction; // is a function

	/* harmony default export */ exports["a"] = /* harmony import */__WEBPACK_IMPORTED_MODULE_0_lib_generators__["a"].bind()(['this', 'commonjs', 'commonjs2', 'amd', 'umd'], function (options) {
	  return _extends({}, simple(options), {
	    library: options.libraryName || '[name].js',
	    // use options.generator to know the name we've been passed, which will be one of the above ^
	    libraryTarget: options.target || options.generator || 'var'
	  });
	});

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lib_generators__ = __webpack_require__(0);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Library__ = __webpack_require__(32);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Simple__ = __webpack_require__(6);





	var getOutput = /* harmony import */__WEBPACK_IMPORTED_MODULE_0_lib_generators__["b"].bind()('output', [/* harmony import */__WEBPACK_IMPORTED_MODULE_1__Library__["a"], /* harmony import */__WEBPACK_IMPORTED_MODULE_2__Simple__["a"]]);
	/* harmony export */ Object.defineProperty(exports, "a", {configurable: false, enumerable: true, get: function() { return getOutput; }});

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webpack__ = __webpack_require__(1);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webpack___default = __WEBPACK_IMPORTED_MODULE_0_webpack__ && __WEBPACK_IMPORTED_MODULE_0_webpack__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0_webpack__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0_webpack__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_0_webpack___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_0_webpack___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lib_generators__ = __webpack_require__(0);



	/* harmony default export */ exports["a"] = /* harmony import */__WEBPACK_IMPORTED_MODULE_1_lib_generators__["a"].bind()('abort-if-errors', function () {
	  return new /* harmony import */__WEBPACK_IMPORTED_MODULE_0_webpack__["NoErrorsPlugin"]();
	});

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webpack__ = __webpack_require__(1);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webpack___default = __WEBPACK_IMPORTED_MODULE_0_webpack__ && __WEBPACK_IMPORTED_MODULE_0_webpack__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0_webpack__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0_webpack__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_0_webpack___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_0_webpack___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lib_generators__ = __webpack_require__(0);

	var CommonsChunkPlugin = /* harmony import */__WEBPACK_IMPORTED_MODULE_0_webpack__["optimize"].CommonsChunkPlugin;



	/* harmony default export */ exports["a"] = /* harmony import */__WEBPACK_IMPORTED_MODULE_1_lib_generators__["a"].bind()('bundle-common', function () {
	  return new CommonsChunkPlugin({
	    name: 'vendor',
	    minChunks: Infinity,
	    filename: 'vendor.bundle.js'
	  });
	});

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webpack__ = __webpack_require__(1);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webpack___default = __WEBPACK_IMPORTED_MODULE_0_webpack__ && __WEBPACK_IMPORTED_MODULE_0_webpack__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0_webpack__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0_webpack__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_0_webpack___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_0_webpack___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lib_generators__ = __webpack_require__(0);



	/* harmony default export */ exports["a"] = /* harmony import */__WEBPACK_IMPORTED_MODULE_1_lib_generators__["a"].bind()('production-loaders', function () {
	  return new /* harmony import */__WEBPACK_IMPORTED_MODULE_0_webpack__["LoaderOptionsPlugin"]({
	    minimize: true,
	    debug: false
	  });
	});

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_extract_text_webpack_plugin__ = __webpack_require__(3);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_extract_text_webpack_plugin___default = __WEBPACK_IMPORTED_MODULE_0_extract_text_webpack_plugin__ && __WEBPACK_IMPORTED_MODULE_0_extract_text_webpack_plugin__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0_extract_text_webpack_plugin__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0_extract_text_webpack_plugin__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_0_extract_text_webpack_plugin___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_0_extract_text_webpack_plugin___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lib_generators__ = __webpack_require__(0);



	/* harmony default export */ exports["a"] = new /* harmony import */__WEBPACK_IMPORTED_MODULE_1_lib_generators__["a"]('extract-css', function () {
	  return new /* harmony import */__WEBPACK_IMPORTED_MODULE_0_extract_text_webpack_plugin___default.a('[name].css');
	});

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webpack__ = __webpack_require__(1);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webpack___default = __WEBPACK_IMPORTED_MODULE_0_webpack__ && __WEBPACK_IMPORTED_MODULE_0_webpack__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0_webpack__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0_webpack__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_0_webpack___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_0_webpack___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lib_generators__ = __webpack_require__(0);

	var UglifyJsPlugin = /* harmony import */__WEBPACK_IMPORTED_MODULE_0_webpack__["optimize"].UglifyJsPlugin;



	/* harmony default export */ exports["a"] = /* harmony import */__WEBPACK_IMPORTED_MODULE_1_lib_generators__["a"].bind()('minify-and-treeshake', function () {
	  return new UglifyJsPlugin({
	    compress: { warnings: false },
	    output: { comments: false },
	    sourceMap: true
	  });
	});

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webpack__ = __webpack_require__(1);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webpack___default = __WEBPACK_IMPORTED_MODULE_0_webpack__ && __WEBPACK_IMPORTED_MODULE_0_webpack__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0_webpack__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0_webpack__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_0_webpack___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_0_webpack___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lib_generators__ = __webpack_require__(0);



	/* harmony default export */ exports["a"] = /* harmony import */__WEBPACK_IMPORTED_MODULE_1_lib_generators__["a"].bind()('node-executable', function () {
	  return new /* harmony import */__WEBPACK_IMPORTED_MODULE_0_webpack__["BannerPlugin"]({
	    banner: '#!/usr/bin/env node',
	    raw: true,
	    entryOnly: true
	  });
	});

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webpack__ = __webpack_require__(1);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webpack___default = __WEBPACK_IMPORTED_MODULE_0_webpack__ && __WEBPACK_IMPORTED_MODULE_0_webpack__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0_webpack__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0_webpack__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_0_webpack___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_0_webpack___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lib_generators__ = __webpack_require__(0);



	/* harmony default export */ exports["a"] = /* harmony import */__WEBPACK_IMPORTED_MODULE_1_lib_generators__["a"].bind()('node-load-sourcemaps', function () {
	  return new /* harmony import */__WEBPACK_IMPORTED_MODULE_0_webpack__["BannerPlugin"]({
	    banner: 'require("source-map-support").install();',
	    raw: true,
	    entryOnly: false
	  });
	});

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webpack__ = __webpack_require__(1);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_webpack___default = __WEBPACK_IMPORTED_MODULE_0_webpack__ && __WEBPACK_IMPORTED_MODULE_0_webpack__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0_webpack__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0_webpack__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_0_webpack___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_0_webpack___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lib_generators__ = __webpack_require__(0);



	/* harmony default export */ exports["a"] = /* harmony import */__WEBPACK_IMPORTED_MODULE_1_lib_generators__["a"].bind()('set-node-env', function (options) {
	  var nodeEnv = "production" || 'production';
	  var env = "server" || 'server';

	  return new /* harmony import */__WEBPACK_IMPORTED_MODULE_0_webpack__["DefinePlugin"]({
	    'process.env': {
	      NODE_ENV: JSON.stringify(options.nodeEnv || nodeEnv),
	      ENV: JSON.stringify(options.env || env)
	    }
	  });
	});

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lib_generators__ = __webpack_require__(0);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__AbortIfErrors__ = __webpack_require__(34);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__BundleCommonChunks__ = __webpack_require__(35);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__EnableProductionLoaders__ = __webpack_require__(36);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ExtractCSS__ = __webpack_require__(37);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__MinifyAndTreeShake__ = __webpack_require__(38);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__NodeExecutable__ = __webpack_require__(39);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__NodeLoadSourceMaps__ = __webpack_require__(40);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__SetNodeEnvironment__ = __webpack_require__(41);











	var getPlugin = /* harmony import */__WEBPACK_IMPORTED_MODULE_0_lib_generators__["b"].bind()('plugin', [/* harmony import */__WEBPACK_IMPORTED_MODULE_1__AbortIfErrors__["a"], /* harmony import */__WEBPACK_IMPORTED_MODULE_2__BundleCommonChunks__["a"], /* harmony import */__WEBPACK_IMPORTED_MODULE_3__EnableProductionLoaders__["a"], /* harmony import */__WEBPACK_IMPORTED_MODULE_4__ExtractCSS__["a"], /* harmony import */__WEBPACK_IMPORTED_MODULE_5__MinifyAndTreeShake__["a"], /* harmony import */__WEBPACK_IMPORTED_MODULE_6__NodeExecutable__["a"], /* harmony import */__WEBPACK_IMPORTED_MODULE_7__NodeLoadSourceMaps__["a"], /* harmony import */__WEBPACK_IMPORTED_MODULE_8__SetNodeEnvironment__["a"]]);
	/* harmony export */ Object.defineProperty(exports, "a", {configurable: false, enumerable: true, get: function() { return getPlugin; }});

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lib_generators__ = __webpack_require__(0);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_autoprefixer__ = __webpack_require__(49);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_autoprefixer___default = __WEBPACK_IMPORTED_MODULE_1_autoprefixer__ && __WEBPACK_IMPORTED_MODULE_1_autoprefixer__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_1_autoprefixer__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_1_autoprefixer__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_1_autoprefixer___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_1_autoprefixer___default });



	/* harmony default export */ exports["a"] = /* harmony import */__WEBPACK_IMPORTED_MODULE_0_lib_generators__["a"].bind()('autoprefixer', function (options) {
	  return /* harmony import */__WEBPACK_IMPORTED_MODULE_1_autoprefixer___default.a.bind()({
	    browsers: ['last ' + (options.numVersions || 2) + ' versions']
	  });
	});

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lib_generators__ = __webpack_require__(0);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Autoprefixer__ = __webpack_require__(43);



	var getPostCSS = /* harmony import */__WEBPACK_IMPORTED_MODULE_0_lib_generators__["b"].bind()('postcsshooks', [/* harmony import */__WEBPACK_IMPORTED_MODULE_1__Autoprefixer__["a"]]);
	/* harmony export */ Object.defineProperty(exports, "a", {configurable: false, enumerable: true, get: function() { return getPostCSS; }});

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lib_generators__ = __webpack_require__(0);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Modules__ = __webpack_require__(7);
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



	var modules = /* harmony import */__WEBPACK_IMPORTED_MODULE_1__Modules__["a"].objectOrFunction; // its a function;

	/* harmony default export */ exports["a"] = /* harmony import */__WEBPACK_IMPORTED_MODULE_0_lib_generators__["a"].bind()('npm-and-modules', function (options) {
	  var result = modules(options);
	  return _extends({}, result, {
	    modules: result.modules.concat('node_modules')
	  });
	});

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lib_generators__ = __webpack_require__(0);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Modules__ = __webpack_require__(7);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__NPMAndModules__ = __webpack_require__(45);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Simple__ = __webpack_require__(8);






	var getResolver = /* harmony import */__WEBPACK_IMPORTED_MODULE_0_lib_generators__["b"].bind()('resolver', [/* harmony import */__WEBPACK_IMPORTED_MODULE_1__Modules__["a"], /* harmony import */__WEBPACK_IMPORTED_MODULE_2__NPMAndModules__["a"], /* harmony import */__WEBPACK_IMPORTED_MODULE_3__Simple__["a"]]);
	/* harmony export */ Object.defineProperty(exports, "a", {configurable: false, enumerable: true, get: function() { return getResolver; }});

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_fs__ = __webpack_require__(9);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_fs___default = __WEBPACK_IMPORTED_MODULE_0_fs__ && __WEBPACK_IMPORTED_MODULE_0_fs__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0_fs__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0_fs__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_0_fs___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_0_fs___default });


	var getTestFiles = function getTestFiles(dir, ext) {
	  if (dir.indexOf('node_modules') > -1) {
	    return;
	  }
	  if (dir.indexOf('.git') > -1) {
	    return;
	  }

	  var files = [];
	  try {
	    files = /* harmony import */__WEBPACK_IMPORTED_MODULE_0_fs___default.a.readdirSync(dir);
	  } catch (e) {
	    files = [];
	  }

	  return files.map(function (file) {
	    var path = '' + dir + file;

	    try {
	      var stats = /* harmony import */__WEBPACK_IMPORTED_MODULE_0_fs___default.a.statSync(path);
	      if (stats.isDirectory()) {
	        return getTestFiles(path + '/' + ext);
	      }
	      if (file.indexOf(ext) > -1) {
	        return { file: file, path: path };
	      }
	      return null;
	    } catch (e) {
	      return null;
	    }
	  }).filter(function (x) {
	    return x;
	  }).reduce(function (prev, cur) {
	    if (Array.isArray(cur)) {
	      return prev.concat(cur);
	    }

	    return prev.concat([cur]);
	  }, []);
	};
	/* harmony export */ Object.defineProperty(exports, "a", {configurable: false, enumerable: true, get: function() { return getTestFiles; }});

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_object__ = __webpack_require__(5);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_object___default = __WEBPACK_IMPORTED_MODULE_0_lodash_object__ && __WEBPACK_IMPORTED_MODULE_0_lodash_object__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0_lodash_object__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0_lodash_object__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_0_lodash_object___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_0_lodash_object___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_colors__ = __webpack_require__(4);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_colors___default = __WEBPACK_IMPORTED_MODULE_1_colors__ && __WEBPACK_IMPORTED_MODULE_1_colors__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_1_colors__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_1_colors__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_1_colors___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_1_colors___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_debug__ = __webpack_require__(15);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_debug___default = __WEBPACK_IMPORTED_MODULE_2_debug__ && __WEBPACK_IMPORTED_MODULE_2_debug__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_2_debug__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_2_debug__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_2_debug___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_2_debug___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_mocha__ = __webpack_require__(16);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_mocha___default = __WEBPACK_IMPORTED_MODULE_3_mocha__ && __WEBPACK_IMPORTED_MODULE_3_mocha__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_3_mocha__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_3_mocha__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_3_mocha___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_3_mocha___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_path__ = __webpack_require__(2);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_path___default = __WEBPACK_IMPORTED_MODULE_4_path__ && __WEBPACK_IMPORTED_MODULE_4_path__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_4_path__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_4_path__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_4_path___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_4_path___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rimraf__ = __webpack_require__(17);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rimraf___default = __WEBPACK_IMPORTED_MODULE_5_rimraf__ && __WEBPACK_IMPORTED_MODULE_5_rimraf__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_5_rimraf__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_5_rimraf__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_5_rimraf___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_5_rimraf___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_yargs__ = __webpack_require__(18);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_yargs___default = __WEBPACK_IMPORTED_MODULE_6_yargs__ && __WEBPACK_IMPORTED_MODULE_6_yargs__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_6_yargs__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_6_yargs__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_6_yargs___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_6_yargs___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_lib_build__ = __webpack_require__(10);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_lib_makeBuild__ = __webpack_require__(14);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_lib_configs__ = __webpack_require__(12);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_lib_configs_Testing__ = __webpack_require__(11);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_lib_getWebpackEntryForTest__ = __webpack_require__(13);
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };















	var debug = /* harmony import */__WEBPACK_IMPORTED_MODULE_2_debug___default.a.bind()('blueprints');

	var blue = /* harmony import */__WEBPACK_IMPORTED_MODULE_1_colors___default.a.blue;
	var white = /* harmony import */__WEBPACK_IMPORTED_MODULE_1_colors___default.a.white;
	var magenta = /* harmony import */__WEBPACK_IMPORTED_MODULE_1_colors___default.a.magenta;
	var red = /* harmony import */__WEBPACK_IMPORTED_MODULE_1_colors___default.a.red;

	/* eslint-disable max-len */

	var argv = /* harmony import */__WEBPACK_IMPORTED_MODULE_6_yargs___default.a.alias('b', 'blueprintsPath').describe('b', 'path to a raw-config via a node file with moduel.exports = config').default('b', './blueprints.config.js').alias('p', 'production').describe('p', 'enable production settings for the default build cofings').default('p', false).alias('c', 'client').describe('c', 'use the default client build, assumes you have an entry point to a client at ~/lib/client.[some es6.js or .js or .jsx]').default('c', false).alias('s', 'server').describe('s', 'use the default server build, assumes you have an entry point to a server at ~/lib/server[some es6.js or .js or .jsx]').default('s', false).alias('a', 'clientAndServer').describe('a', '[DEFAULT=true] use both a client and a server build. checks if you have an extend build and applies it.').default('a', true).alias('w', 'watch').describe('w', '[DEFAULT=false] force watching of all builds').default('w', false).alias('i', 'ignoreBlueprints').describe('ignore the blueprints.config.js file in the current directory and use defaults').default('i', false).alias('t', 'runTest').describe('search for test files and run them').default('t', false).argv;
	/* eslint-enable */

	var loadBuildsFromPath = function loadBuildsFromPath(filePath) {
	  try {
	    console.log(blue('..loading config ' + filePath));
	    /* eslint-disable no-undef */
	    // SUPER_SECRET_REQUIRE_ONLY_CONFIG_LOADING_SHOULD_USE is our hook outside of
	    // webpack's normal requires -- webpack normally resolves requires at compile time
	    // and turns require statments that are dynamic, or that it can't resolve, into error throwing
	    // thunks. I tried doing this with require.ensure, and webpack turned that into
	    // error throwing thunks as well, so this seems like the 'cleanest' solution.
	    var builds = SUPER_SECRET_REQUIRE_ONLY_CONFIG_LOADING_SHOULD_USE(/* harmony import */__WEBPACK_IMPORTED_MODULE_4_path___default.a.resolve(filePath));
	    /* eslint-enable */
	    if (!Array.isArray(builds)) {
	      if (builds.extensions === true) {
	        return { extensions: /* harmony import */__WEBPACK_IMPORTED_MODULE_0_lodash_object__["omit"].bind()(builds, 'extensions') };
	      }
	      builds = [builds];
	    }

	    return { builds: builds };
	  } catch (e) {
	    debug(e);
	    return {};
	  }
	};

	var loadDefaultConfigs = function loadDefaultConfigs(options) {
	  console.log(blue('..using default configs'));
	  if (options.runTest) {
	    console.log(magenta('..Setting up tests:'));
	    return [_extends({}, /* harmony import */__WEBPACK_IMPORTED_MODULE_10_lib_configs_Testing__["a"], {
	      webpack: {
	        entry: /* harmony import */__WEBPACK_IMPORTED_MODULE_11_lib_getWebpackEntryForTest__["a"].bind()('./')
	      }
	    })];
	  } else if (options.client) {
	    console.log(blue('..client'));
	    return [/* harmony import */__WEBPACK_IMPORTED_MODULE_9_lib_configs__["a"].bind()(options.production)];
	  } else if (options.server) {
	    console.log(blue('..server'));
	    return [/* harmony import */__WEBPACK_IMPORTED_MODULE_9_lib_configs__["b"].bind()(options.production)];
	  } else if (options.clientAndServer) {
	    console.log(blue('..both'));
	    return [/* harmony import */__WEBPACK_IMPORTED_MODULE_9_lib_configs__["a"].bind()(options.production), /* harmony import */__WEBPACK_IMPORTED_MODULE_9_lib_configs__["b"].bind()(options.production)];
	  }

	  return [];
	};

	var makeConfig = function makeConfig(options) {
	  console.log(blue('[Blueprints] reading from ' + options.blueprintsPath));
	  console.log(blue('[cwd] ' + process.cwd()));

	  var builds = [];
	  var extensions = {};

	  if (options.blueprintsPath && !options.ignoreBlueprints) {
	    var blueprints = loadBuildsFromPath(options.blueprintsPath);
	    if (blueprints.extensions) {
	      extensions = blueprints.extensions;
	    } else if (blueprints.builds && blueprints.builds.length) {
	      builds = blueprints.builds;
	    }
	  }

	  if (!builds.length) {
	    loadDefaultConfigs();
	  }

	  if (options.watch) {
	    extensions.watch = true;
	  }

	  return {
	    builds: applyExtensions(builds, extensions).map(/* harmony import */__WEBPACK_IMPORTED_MODULE_8_lib_makeBuild__["a"])
	  };
	};

	var applyExtensions = function applyExtensions(builds, extensions) {
	  var ext = extensions || {};
	  if (Object.keys(ext).length > 0) {
	    console.log(blue('[extensions]') + ': ' + white(JSON.stringify(extensions, null, 2)));
	  }

	  return builds.map(function (build) {
	    return _extends({}, build, ext);
	  });
	};

	/* harmony import */__WEBPACK_IMPORTED_MODULE_7_lib_build__["a"].bind()(makeConfig(argv), function (stats) {
	  if (stats.errors && stats.errors.length > 0 && !argv.watch) {
	    console.log(red('ERROR IN BUILD. Aborting.'));

	    process.exit(1);
	  }

	  if (argv.runTest) {
	    (function () {
	      console.log(magenta('\n   ******************************' + '\n   *       RUNNING TESTS        *' + '\n   ******************************'));

	      var mochaInstance = new /* harmony import */__WEBPACK_IMPORTED_MODULE_3_mocha___default.a();
	      stats.assets.forEach(function (asset) {
	        mochaInstance.addFile('./.test/' + asset.name);
	      });

	      mochaInstance.run().on('end', function () {
	        /* harmony import */__WEBPACK_IMPORTED_MODULE_5_rimraf___default.a.bind()('./.test/', function () {});
	      });
	    })();
	  }
	});

/***/ },
/* 49 */
/***/ function(module, exports) {

	module.exports = require("autoprefixer");

/***/ },
/* 50 */
/***/ function(module, exports) {

	module.exports = require("node-notifier");

/***/ }
/******/ ]);