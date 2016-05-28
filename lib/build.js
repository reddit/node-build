import webpack from 'webpack';
import notifier from 'node-notifier';
import fs from 'fs';

const nodeEnv = process.env.NODE_ENV || 'development';

export const build = (config, cb) => {
  const callback = cb || (() => {});
  const run = build => exectuteBuild(build, callback);
  config.builds.forEach(run);
};

const exectuteBuild = (build, cb) => {
  const compiler = webpack(build.webpackConfig);
  if (build.watch) {
    compiler.watch({}, (err, stats) => {
      outputBuild(build.buildName)(err, stats);
      cb(stats.toJson());
    });

    return;
  }

  compiler.run((err, stats) => {
    console.log(stats.toString({
      colors: !build.disableColors,
      chunks: false,
      version: false,
    }));

    cb(stats.toJson());
  });
};

const formatAsset = asset => {
  const name = asset.name;
  const  size = asset.size;
  let sizeStr = size + " B";

  if (size > 1000) sizeStr = Math.ceil(size / 1000) + " kB";
  if (size > 1000000) sizeStr = Math.ceil(size / 1000000) + " MB";

  return `${name} [${sizeStr}]`;
};

const outputBuild = type => (err, stats) => {
  if (err) {
    console.log(`error in build`, err);
    return;
  }

  console.log(stats.toString({
    colors: true,
    chunks: false,
    version: false,
  }));

  const buildStats = stats.toJson();
  const { errors } = buildStats

  if (errors && errors.length) {
    notifier.notify({
      title: `${type} - ERROR!`,
      message: 'Check the console for errors',
    });
    return;
  }

  notifier.notify({
    title: `${type} - Build complete`,
    message: buildStats.assets.map(formatAsset).join('\n'),
  });
};
