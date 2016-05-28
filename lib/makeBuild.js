import { omit } from 'lodash/object';

import { getLoader } from 'lib/generators/loaders';
import { getPlugin } from 'lib/generators/plugins';
import { getOutput } from 'lib/generators/output';
import { getResolver } from 'lib/generators/resolver';
import { getEntry } from 'lib/generators/entry';
import { getPostCSS } from 'lib/generators/postcss';
import { getExternals } from 'lib/generators/externals';

export const makeBuild = shortBuild => (buildObject(
  shortBuild.name,
  shortBuild.watch,
  parseWebpackConfig(shortBuild.webpack, shortBuild.name)
));

const buildObject = (buildName, watch, webpackConfig) => ({
  watch,
  buildName,
  webpackConfig,
});

const mapNullable = (arrayOrNull, fn) => (arrayOrNull || []).map(fn);

const parseWebpackConfig = (shortHandConfig, buildName) => {
  const webpackConfig = {
    entry: getEntry(shortHandConfig.entry, buildName),
    output: getOutput(shortHandConfig.output),
    module: {
      loaders: mapNullable(shortHandConfig.loaders, getLoader),
    },
    plugins: mapNullable(shortHandConfig.plugins, getPlugin),
    resolve: getResolver(shortHandConfig.resolve),
    postcss: mapNullable(shortHandConfig.postcss, getPostCSS),
    externals: getExternals(shortHandConfig.externals),
  };

  return {
    ...webpackConfig,
    ...omit(shortHandConfig, Object.keys(webpackConfig).concat('loaders')),
  };
};
