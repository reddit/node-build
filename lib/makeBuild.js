import { omit } from 'lodash/object';

import { getLoader } from 'lib/generators/loaders';
import { getPlugin } from 'lib/generators/plugins';
import { getOutput } from 'lib/generators/output';
import { getResolver } from 'lib/generators/resolver';
import { getEntry } from 'lib/generators/entry';
import { getPostCSS } from 'lib/generators/postcss';
import { getExternals } from 'lib/generators/externals';

// ShortBuild is an object that looks like {
//  name: String,
//  watch: Bool,
//  webpack: Object, shorthand webpack config
//}

export const makeBuild = shortBuild => ({
  ...shortBuild,
  wepback: parseWebpackConfig(shortBuild.webpack, shortBuild.name),
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
