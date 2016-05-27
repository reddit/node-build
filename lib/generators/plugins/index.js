import { generatorLoader } from 'lib/generators/tryToLoad';

import AbortIfErrorsPlugin from './AbortIfErrors';
import BundleCommonChunksPlugin from './BundleCommonChunks';
import EnableProductionLoadersPlugin from './EnableProductionLoaders';
import ExtractCSSPlugin from './ExtractCSS';
import MinifyAndTreeShakePlugin from './MinifyAndTreeShake';
import NodeExecutablePlugin from './NodeExecutable';
import NodeLoadSourceMapsPlugin from './NodeLoadSourceMaps';
import SetNodeEnvironmentPlugin from './SetNodeEnvironment';

export const getPlugin = generatorLoader('plugin', [
  AbortIfErrorsPlugin,
  BundleCommonChunksPlugin,
  EnableProductionLoadersPlugin,
  ExtractCSSPlugin,
  MinifyAndTreeShakePlugin,
  NodeExecutablePlugin,
  NodeLoadSourceMapsPlugin,
  SetNodeEnvironmentPlugin,
]);
