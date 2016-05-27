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
/******/ 	return __webpack_require__(__webpack_require__.s = 49);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	module.exports = require("lodash");

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("webpack");

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _ = __webpack_require__(0);

	function tryToLoadGenerator(nameOrObject, lookupTable, thingKind) {
	  var parsed = parseNameOrObject(nameOrObject);
	  if (!parsed) {
	    return nameOrObject;
	  }

	  var thing = lookupTable[parsed.name];
	  if (!thing) {
	    throw new Error('Failed to resolve ' + nameOrObject + ' ' + thingKind);
	    return;
	  }
	  if (typeof thing === 'function') {
	    return thing(parsed.options);
	  }

	  return thing;
	}

	function parseNameOrObject(nameOrObject) {
	  if (typeof nameOrObject === 'string') {
	    return { name: nameOrObject, options: {} };
	  }

	  if ((typeof nameOrObject === 'undefined' ? 'undefined' : _typeof(nameOrObject)) === 'object') {
	    var name = nameOrObject.generator;
	    if (typeof name === 'string') {
	      return { name: name, options: _.omit(nameOrObject, 'name') };
	    }
	  }
	}

	module.exports = {
	  tryToLoadGenerator: tryToLoadGenerator
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("yargs");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("extract-text-webpack-plugin");

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var path = __webpack_require__(4);

	module.exports = function (options) {
	  return {
	    path: path.resolve(options.dest),
	    filename: options.name || '[name].js'
	  };
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(0);
	var path = __webpack_require__(4);
	var SimpleResolver = __webpack_require__(9);

	function resolvePath(strPath) {
	  return path.resolve(strPath); // path.resolve seems to have a binding issue;
	}

	module.exports = function (options) {
	  return _.extend(SimpleResolver(options), {
	    modules: (options.paths || []).map(resolvePath)
	  });
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = function (options) {
	  return {
	    extensions: options.extensions
	  };
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/* eslint-disable */

	var webpack = __webpack_require__(1);
	var notifier = __webpack_require__(51);
	var _ = __webpack_require__(0);
	var fs = __webpack_require__(3);

	var nodeEnv = "production" || 'development';

	module.exports = function (config, cb) {
	  if (!cb) {
	    cb = function cb() {};
	  }
	  config.builds.forEach(function (build) {
	    exectuteBuild(build, cb);
	  });
	};

	function exectuteBuild(build, cb) {
	  var compiler = webpack(build.webpackConfig);
	  if (build.watch) {
	    compiler.watch({}, function (err, stats) {
	      outputBuild(build.buildName)(err, stats);
	      cb(stats.toJson());
	    });
	  } else {
	    compiler.run(function (err, stats) {
	      console.log(stats.toString({
	        colors: !build.disableColors,
	        chunks: false,
	        version: false
	      }));
	      cb(stats.toJson());
	    });
	  }
	}

	function formatAsset(asset) {
	  var name = asset.name;
	  var size = asset.size;
	  var sizeStr = size + " B";

	  if (size > 1000) sizeStr = Math.ceil(size / 1000) + " kB";
	  if (size > 1000000) sizeStr = Math.ceil(size / 1000000) + " MB";

	  return name + " [" + sizeStr + "]";
	}

	function outputBuild(type) {
	  return function (err, stats) {
	    if (!err) {
	      console.log(stats.toString({
	        colors: true,
	        chunks: false,
	        version: false
	      }));

	      var s = stats.toJson();

	      if (s.errors && s.errors.length) {
	        notifier.notify({
	          "title": type + " – ERROR!",
	          "message": "Check the console for errors"
	        });
	      } else {
	        notifier.notify({
	          "title": type + " – Build complete",
	          "message": s.assets.map(formatAsset).join("\n")
	        });
	      }
	    }
	  };
	}

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var DefaultClientConfig = __webpack_require__(19);
	var DefaultProductionClientConfig = __webpack_require__(20);
	var DefaultServerConfig = __webpack_require__(22);
	var DefaultProductionServerConfig = __webpack_require__(21);
	var DefaultTestingConfig = __webpack_require__(23);

	function getBuild(production, debugConfig, productionConfig) {
	  return production ? productionConfig : debugConfig;
	}

	function getClientConfig(production) {
	  return getBuild(production, DefaultClientConfig, DefaultProductionClientConfig);
	}

	function getServerConfig(production) {
	  return getBuild(production, DefaultServerConfig, DefaultProductionServerConfig);
	}

	module.exports = {
	  DefaultClientConfig: DefaultClientConfig,
	  DefaultProductionClientConfig: DefaultProductionClientConfig,
	  DefaultServerConfig: DefaultServerConfig,
	  DefaultProductionServerConfig: DefaultProductionServerConfig,
	  DefaultTestingConfig: DefaultTestingConfig,
	  getClientConfig: getClientConfig,
	  getServerConfig: getServerConfig
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var getTestFiles = __webpack_require__(48);

	module.exports = function getWebpackEntryForTest(dir) {
	  console.log('   Searching for tests in', process.cwd());
	  var files = getTestFiles(dir, '.test.');
	  console.log('   Found ' + files.length + ' test' + (files.length > 1 ? 's' : ''));

	  return files.reduce(function (prev, cur) {
	    var moduleName = cur.path.split('.test')[0].split('./')[1] + '.compiledtest';
	    prev[moduleName] = cur.path;
	    return prev;
	  }, {});
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(0);
	var generators = __webpack_require__(27);
	var getLoader = generators.getLoader;
	var getPlugin = generators.getPlugin;
	var getOutput = generators.getOutput;
	var getResolver = generators.getResolver;
	var getEntry = generators.getEntry;
	var getPostCSS = generators.getPostCSS;
	var getExternals = generators.getExternals;

	function makeBuild(shortBuild) {
	  return buildObject(shortBuild.name, shortBuild.watch, parseWebpackConfig(shortBuild.webpack, shortBuild.name));
	}

	function buildObject(buildName, watch, webpackConfig) {
	  return {
	    watch: watch,
	    buildName: buildName,
	    webpackConfig: webpackConfig
	  };
	}

	function parseWebpackConfig(shortHandConfig, buildName) {
	  var webpackConfig = {};

	  Object.keys(shortHandConfig).forEach(function (key) {
	    var obj = shortHandConfig[key];

	    if (key === 'loaders') {
	      _.defaults(webpackConfig, { module: { loaders: [] } });
	      concatInPlace(webpackConfig.module.loaders, obj.map(getLoader));
	    }

	    if (key === 'plugins') {
	      webpackConfig.plugins = obj.map(getPlugin);
	    }

	    if (key === 'output') {
	      webpackConfig.output = getOutput(obj);
	    }

	    if (key === 'resolve') {
	      webpackConfig.resolve = getResolver(obj);
	    }

	    if (key === 'entry') {
	      webpackConfig.entry = getEntry(obj, buildName);
	    }

	    if (key === 'postcss') {
	      webpackConfig.postcss = obj.map(getPostCSS);
	    }

	    if (key === 'externals') {
	      webpackConfig.externals = getExternals(obj);
	    }
	  });

	  return _.extend(webpackConfig, _.omit(shortHandConfig, Object.keys(webpackConfig).concat('loaders')));
	}

	function concatInPlace(dest, source) {
	  source.forEach(function (thing) {
	    dest.push(thing);
	  });
	}

	function loadNameOrUseSource(thing, load) {
	  if (typeof thing === 'string') {
	    return load(thing);
	  }

	  return thing;
	}

	function mapLoadNameOrUseSource(array, loader) {
	  return array.map(loader);
	}

	module.exports = {
	  makeBuild: makeBuild,
	  buildObject: buildObject,
	  parseWebpackConfig: parseWebpackConfig,
	  loadNameOrUseSource: loadNameOrUseSource
	};

/***/ },
/* 14 */
/***/ function(module, exports) {

	function webpackEmptyContext(req) {
		throw new Error("Cannot find module '" + req + "'.");
	}
	webpackEmptyContext.keys = function() { return []; };
	webpackEmptyContext.resolve = webpackEmptyContext;
	module.exports = webpackEmptyContext;
	webpackEmptyContext.id = 14;


/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = require("colors");

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = require("debug");

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = require("mocha");

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = require("rimraf");

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = {
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
/***/ function(module, exports) {

	module.exports = {
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
/***/ function(module, exports) {

	module.exports = {
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
/***/ function(module, exports) {

	module.exports = {
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

	var _ = __webpack_require__(0);

	module.exports = {
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
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var path = __webpack_require__(4);
	var _ = __webpack_require__(0);
	var tryToLoadGenerator = __webpack_require__(2).tryToLoadGenerator;

	var entryGenerators = {};

	function getEntry(pathOrObject, buildName) {
	  // for now takes the path to the file, and the build name and makes
	  // the entry point object. in the future we can do things like auto traverers
	  // the module paths you're resolving and generate tree-shaking-less umd ready builds
	  // but if everything internal is using the build project its a little pointless
	  // return tryToLoadGenerator(entryName, entryGenerators, 'entry');
	  if ((typeof pathOrObject === 'undefined' ? 'undefined' : _typeof(pathOrObject)) === 'object') {
	    return pathOrObject;
	  }

	  var entryConfig = {};
	  entryConfig[buildName] = path.resolve(pathOrObject);
	  return entryConfig;
	};

	module.exports = {
	  getEntry: getEntry,
	  entryGenerators: entryGenerators
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var loadNodeModules = __webpack_require__(26);

	var loaderName = 'node-modules';

	function getExternals(externals) {
	  if (typeof externals === 'string') {
	    if (externals === loaderName) {
	      return loadNodeModules();
	    } else {
	      throw new Error('invalid externals loader name, did you mean: ' + loaderName + '?');
	    }
	  }

	  if ((typeof externals === 'undefined' ? 'undefined' : _typeof(externals)) === 'object') {
	    if (externals.generator === loaderName) {
	      return loadNodeModules(externals.additional);
	    }

	    return externals;
	  }
	}

	module.exports = {
	  getExternals: getExternals
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var fs = __webpack_require__(3);

	function prependCommonjs(modules, name) {
	  modules[name] = 'commonjs ' + name;
	  return modules;
	}

	var lodashSubmodules = ['array', 'collection', 'date', 'function', 'lang', 'math', 'number', 'object', 'seq', 'string', 'util', 'properties', 'methods'].map(function (name) {
	  return 'lodash/' + name;
	});

	module.exports = function (additional) {
	  var nodeModules = {};

	  fs.readdirSync('node_modules').filter(function (x) {
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

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var getLoader = __webpack_require__(33).getLoader;
	var getPlugin = __webpack_require__(43).getPlugin;
	var getOutput = __webpack_require__(35).getOutput;
	var getResolver = __webpack_require__(47).getResolver;
	var getEntry = __webpack_require__(24).getEntry;
	var getExternals = __webpack_require__(25).getExternals;
	var getPostCSS = __webpack_require__(45).getPostCSS;

	module.exports = {
	  getLoader: getLoader,
	  getPlugin: getPlugin,
	  getOutput: getOutput,
	  getResolver: getResolver,
	  getEntry: getEntry,
	  getExternals: getExternals,
	  getPostCSS: getPostCSS
	};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var ExtractTextPlugin = __webpack_require__(6);

	module.exports = {
	  test: /\.css$/,
	  loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')
	};

/***/ },
/* 29 */
/***/ function(module, exports) {

	module.exports = {
	  test: /\.es6\.js$|\.js$|\.jsx$/,
	  exclude: /node_modules/,
	  loader: 'babel',
	  query: {
	    presets: ['es2015-native-modules', 'stage-2', 'react'],
	    plugins: ['transform-class-properties', 'transform-react-constant-elements', 'transform-react-inline-elements', 'lodash']
	  }
	};

/***/ },
/* 30 */
/***/ function(module, exports) {

	module.exports = {
	  test: /\.css$|\.less$/,
	  loader: 'ignore-loader'
	};

/***/ },
/* 31 */
/***/ function(module, exports) {

	module.exports = {
	  test: /\.json$/,
	  loader: 'json-loader'
	};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var ExtractTextPlugin = __webpack_require__(6);

	module.exports = {
	  test: /\.less$/,
	  loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!less-loader')
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var tryToLoadGenerator = __webpack_require__(2).tryToLoadGenerator;

	var ESNextReactLoader = __webpack_require__(29);
	var JSONLoader = __webpack_require__(31);
	var CSSLoader = __webpack_require__(28);
	var LessLoader = __webpack_require__(32);
	var IgnoreStylesLoader = __webpack_require__(30);

	var loaders = {
	  'esnextreact': ESNextReactLoader,
	  'ESNextReact': ESNextReactLoader,
	  'json': JSONLoader,
	  'css': CSSLoader,
	  'less': LessLoader,
	  'ignore-styles': IgnoreStylesLoader
	};

	var getLoader = function getLoader(loaderName) {
	  return tryToLoadGenerator(loaderName, loaders, 'loader');
	};

	module.exports = {
	  loaders: loaders,
	  getLoader: getLoader
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(0);
	var SimpleOutput = __webpack_require__(7);

	module.exports = function (options) {
	  return _.extend(SimpleOutput(options), {
	    library: options.libraryName || '[name].js',
	    libraryTarget: options.target || 'var'
	  });
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(0);
	var tryToLoadGenerator = __webpack_require__(2).tryToLoadGenerator;

	var SimpleOutput = __webpack_require__(7);
	var LibraryOutput = __webpack_require__(34);

	function libraryOfTarget(target) {
	  return function (options) {
	    return LibraryOutput(_.extend(options, {
	      target: target
	    }));
	  };
	}

	var outputs = {
	  simple: SimpleOutput,
	  library: LibraryOutput,
	  this: libraryOfTarget('this'),
	  commonjs: libraryOfTarget('commonjs'),
	  commonjs2: libraryOfTarget('commonjs2'),
	  amd: libraryOfTarget('amd'),
	  umd: libraryOfTarget('umd')
	};

	var getOutput = function getOutput(outputName) {
	  return tryToLoadGenerator(outputName, outputs, 'output');
	};

	module.exports = {
	  outputs: outputs,
	  getOutput: getOutput
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var webpack = __webpack_require__(1);

	module.exports = new webpack.NoErrorsPlugin();

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var webpack = __webpack_require__(1);

	module.exports = new webpack.optimize.CommonsChunkPlugin({
	   name: 'vendor',
	   minChunks: Infinity,
	   filename: 'vendor.bundle.js'
	});

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var webpack = __webpack_require__(1);

	module.exports = new webpack.LoaderOptionsPlugin({
	  minimize: true,
	  debug: false
	});

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var ExtractTextPlugin = __webpack_require__(6);

	module.exports = new ExtractTextPlugin('[name].css');

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var webpack = __webpack_require__(1);

	module.exports = new webpack.optimize.UglifyJsPlugin({
	  compress: {
	    warnings: false
	  },
	  output: {
	    comments: false
	  },
	  sourceMap: true
	});

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var webpack = __webpack_require__(1);

	module.exports = new webpack.BannerPlugin({
	  banner: 'require("source-map-support").install();',
	  raw: true,
	  entryOnly: false
	});

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var webpack = __webpack_require__(1);

	var nodeEnv = "production" || 'production';
	var env = "server" || 'server';

	module.exports = function (options) {
	  return new webpack.DefinePlugin({
	    'process.env': {
	      NODE_ENV: JSON.stringify(options.nodeEnv || nodeEnv),
	      ENV: JSON.stringify(options.env || env)
	    }
	  });
	};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var tryToLoadGenerator = __webpack_require__(2).tryToLoadGenerator;
	var AbortIfErrorsPlugin = __webpack_require__(36);
	var BundleCommonChunksPlugin = __webpack_require__(37);
	var EnableProductionLoadersPlugin = __webpack_require__(38);
	var ExtractCSSPlugin = __webpack_require__(39);
	var MinifyAndTreeShakePlugin = __webpack_require__(40);
	var NodeLoadSourceMapsPlugin = __webpack_require__(41);
	var SetNodeEnvironmentPlugin = __webpack_require__(42);

	var plugins = {
	  'abort-if-errors': AbortIfErrorsPlugin,
	  'bundle-common': BundleCommonChunksPlugin,
	  'extract-css': ExtractCSSPlugin,
	  'production-loaders': EnableProductionLoadersPlugin,
	  'minify-and-treeshake': MinifyAndTreeShakePlugin,
	  'node-load-sourcemaps': NodeLoadSourceMapsPlugin,
	  'set-node-env': SetNodeEnvironmentPlugin
	};

	function getPlugin(pluginName) {
	  return tryToLoadGenerator(pluginName, plugins, 'plugin');
	}

	module.exports = {
	  plugins: plugins,
	  getPlugin: getPlugin
	};

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var autoprefixer = __webpack_require__(50);

	module.exports = function (options) {
	  return autoprefixer({ browsers: ['last ' + options.numVersions + ' versions'] });
	};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var tryToLoadGenerator = __webpack_require__(2).tryToLoadGenerator;
	var AutoprefixerPostCSS = __webpack_require__(44);

	var postCSSHooks = {
	  'autoprefixer-custom': AutoprefixerPostCSS,
	  'autoprefixer': AutoprefixerPostCSS({ numVersions: 2 })
	};

	var getPostCSS = function getPostCSS(postCSSHookName) {
	  return tryToLoadGenerator(postCSSHookName, postCSSHooks, 'postcsshooks');
	};

	module.exports = {
	  postCSSHooks: postCSSHooks,
	  getPostCSS: getPostCSS
	};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(0);
	var ModulesResolver = __webpack_require__(8);

	module.exports = function (options) {
	  var result = ModulesResolver(options);
	  result.modules = result.modules.concat('node_modules');
	  return result;
	};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var tryToLoadGenerator = __webpack_require__(2).tryToLoadGenerator;

	var SimpleResolver = __webpack_require__(9);
	var ModulesResolver = __webpack_require__(8);
	var NPMAndModulesResolver = __webpack_require__(46);

	var resolvers = {
	  'simple': SimpleResolver,
	  'modules': ModulesResolver,
	  'npm-and-modules': NPMAndModulesResolver
	};

	function getResolver(resolverName) {
	  return tryToLoadGenerator(resolverName, resolvers, 'resolver');
	}

	module.exports = {
	  resolvers: resolvers,
	  getResolver: getResolver
	};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(0);
	var fs = __webpack_require__(3);

	module.exports = function getTestFiles(dir, ext) {
	  if (dir.indexOf('node_modules') > -1) {
	    return;
	  }
	  if (dir.indexOf('.git') > -1) {
	    return;
	  }

	  var files = [];
	  try {
	    files = fs.readdirSync(dir);
	  } catch (e) {
	    files = [];
	  }

	  return files.map(function (file) {
	    var path = dir + file;

	    try {
	      var stats = fs.statSync(path);
	      if (stats.isDirectory()) {
	        return getTestFiles(path + '/', ext);
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
	    if (_.isArray(cur)) {
	      return prev.concat(cur);
	    } else {
	      return prev.concat([cur]);
	    }
	  }, []);
	};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(0);
	var fs = __webpack_require__(3);
	var path = __webpack_require__(4);
	var debug = __webpack_require__(16)('blueprints');
	var Mocha = __webpack_require__(17);
	var colors = __webpack_require__(15);
	var rimraf = __webpack_require__(18);

	var build = __webpack_require__(10);
	var makeBuild = __webpack_require__(13).makeBuild;
	var configs = __webpack_require__(11);
	var getWebpackEntryForTest = __webpack_require__(12);

	var yargs = __webpack_require__(5);
	console.log("yargs?", yargs);

	var argv = __webpack_require__(5).alias('b', 'blueprintsPath').describe('b', 'path to a raw-config via a node file with moduel.exports = config').default('b', './blueprints.config.js').alias('p', 'production').describe('p', 'enable production settings for the default build cofings').default('p', false).alias('c', 'client').describe('c', 'use the default client build, assumes you have an entry point to a client at ~/lib/client.[some es6.js or .js or .jsx]').default('c', false).alias('s', 'server').describe('s', 'use the default server build, assumes you have an entry point to a server at ~/lib/server[some es6.js or .js or .jsx]').default('s', false).alias('a', 'clientAndServer').describe('a', '[DEFAULT=true] use both a client and a server build. checks if you have an extend build and applies it.').default('a', true).alias('w', 'watch').describe('w', '[DEFAULT=false] force watching of all builds').default('w', false).alias('i', 'ignoreBlueprints').describe('ignore the blueprints.config.js file in the current directory and use defaults').default('i', false).alias('t', 'runTest').describe('search for test files and run them').default('t', false).argv;

	console.log('...Reading Blueprints', argv.blueprintsPath);
	console.log('...cwd', process.cwd());

	function loadBuildsFromPath(configPath) {
	  try {
	    console.log('...loading bluerprints from', configPath);
	    var builds = !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND'; throw e; }());
	    console.log('builds?', builds);
	    if (!Array.isArray(builds)) {
	      if (builds.extensions === true) {
	        return { extensions: _.omit(builds, 'extensions') };
	      }
	      builds = [builds];
	    }

	    return { builds: builds };
	  } catch (e) {
	    debug(e);
	    return {};
	  }
	}

	function applyExtensions(builds, extensions) {
	  var ext = extensions || {};
	  console.log('...applying extensions', extensions);
	  return builds.map(function (build) {
	    return _.merge(build, ext);
	  });
	}

	function makeConfig(builds, extensions) {
	  return { builds: applyExtensions(builds, extensions).map(makeBuild) };
	}

	var builds = [];
	var extensions = {};

	if (argv.blueprintsPath && !argv.ignoreBlueprints) {
	  var blueprints = loadBuildsFromPath(argv.blueprintsPath);
	  if (blueprints.extensions) {
	    extensions = blueprints.extensions;
	  } else if (blueprints.builds && blueprints.builds.length) {
	    builds = blueprints.builds;
	  }
	}

	function loadDefaultConfigs() {
	  console.log('...using default configs');
	  if (argv.runTest) {
	    console.log('...Setting up tests:');
	    builds = [configs.DefaultTestingConfig];
	    builds[0].webpack.entry = getWebpackEntryForTest('./');
	  } else if (argv.client) {
	    console.log('...client');
	    builds = [configs.getClientConfig(argv.production)];
	  } else if (argv.server) {
	    console.log('...server');
	    builds = [configs.getServerConfig(argv.production)];
	  } else if (argv.clientAndServer) {
	    console.log('...both');
	    builds = [configs.getClientConfig(argv.production), configs.getServerConfig(argv.production)];
	  }
	}

	if (!builds.length) {
	  loadDefaultConfigs();
	}

	if (argv.watch) {
	  extensions.watch = true;
	}

	build(makeConfig(builds, extensions), function (stats) {
	  if (stats.errors && stats.errors.length > 0 && !argv.watch) {
	    console.log(colors.red('ERROR IN BUILD. Aborting.'));

	    process.exit(1);
	  }

	  if (argv.runTest) {
	    console.log(colors.magenta('\n   ******************************' + '\n   *       RUNNING TESTS        *' + '\n   ******************************'));

	    var m = new Mocha();
	    stats.assets.forEach(function (asset) {
	      var path = './.test/' + asset.name;
	      m.addFile(path);
	    });
	    m.run().on('end', function () {
	      rimraf('./.test/', function () {});
	    });
	  }
	});

/***/ },
/* 50 */
/***/ function(module, exports) {

	module.exports = require("autoprefixer");

/***/ },
/* 51 */
/***/ function(module, exports) {

	module.exports = require("node-notifier");

/***/ }
/******/ ]);