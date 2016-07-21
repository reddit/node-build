/* eslint-disable */

var webpack = require('webpack');
var notifier = require('node-notifier');
var _ = require('lodash');
var fs = require('fs');
var colors = require('colors');

const nodeEnv = process.env.NODE_ENV || 'development';

module.exports = function(config, cb) {
  if (!cb) { cb = function() {}; }

  var builds = config.builds.slice();

  // Run each build serially so the server can do things like read an app
  // manifest file that's genrated during the client build step.
  var runNextBuild = function() {
    if (!builds.length) { return; } // this shouldn't happen

    var build = builds.shift();
    var buildCallback = builds.length ? runNextBuild : cb;
    console.log(colors.cyan('[Starting build]'), build.buildName);
    executeBuild(build, buildCallback);
  };

  runNextBuild();
}

function executeBuild(build, cb) {
  var compiler = webpack(build.webpackConfig);
  if (build.watch) {
    compiler.watch({}, function(err, stats) {
      outputBuild(build.buildName)(err, stats);
      cb(stats.toJson());
    });
  } else {
    compiler.run(function(err, stats) {
      console.log(stats.toString({
        colors: !build.disableColors,
        chunks: false,
        version: false,
        children: false,
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
  return function(err, stats) {
    if (!err) {
      console.log(stats.toString({
        colors: true,
        chunks: false,
        version: false,
        children: false,
      }));

      var s = stats.toJson();

      if (s.errors && s.errors.length) {
        notifier.notify({
          "title": type + " – ERROR!",
          "message": "Check the console for errors",
        });
      } else {
        notifier.notify({
          "title": type + " – Build complete",
          "message": s.assets.map(formatAsset).join("\n"),
        });
      }
    }
  }
}
