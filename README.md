# r-build
r/Build aims to be a configurable build system for ES6/7 projects based on on Webpack. Out of the box it includes some default configurations for building clients (all pre-packaked, minifed, and tree-shaken), and servers (common code bundled into a vendor file that node can run). It can also handle less/css (defining sass is easy and left as an excercise for the reader), and webfonts

### Generators
r/Build is built off a system of defining shorthand for webpack build configurations. This way you can define configs via simple names if you want to build your own config. The goal being you can define your own configs (as `/<project-root>/blueprints.config.js`) that either:
* use the built in generators via their shorthand name e.g. `esnextreact` (to read how its configured, read into [/lib/generators/loaders/index.js](https://github.com/schwers/r-build/blob/master/lib/generators/loaders/index.js) and [/lib/makeBuild.js](https://github.com/schwers/r-build/blob/master/lib/makeBuild.js))
* pass in a on object that with arguments to give to built in generators:

  ```javascript
  resolve: {
    generator: 'npm-and-modules',
    extensions: ['', '.js', '.jsx', '.es6.js'],
  }
  ```
(This relies on the [/lib/generators/resolvers/NPMAndModulesResolver](https://github.com/schwers/r-build/blob/master/lib/generators/resolver/NPMAndModulesResolver.js) and the configuration syntax defined in [/lib/generators/tryToLoadGenerator](https://github.com/schwers/r-build/blob/master/lib/generators/tryToLoadGenerator.js)
* raw webpack objects. in any section of a webpack config, you can pass in an object that won't be resolved and used directly. you can also add keys to the webpack config for parameters not handled by the current build system and they'll automatically get passed to webpack:

  ```javascript
  /* To add autoprefixing to the default configs, you would define a blueprints.config.js in your root directory and write: */
  var autoprefixer = require('autoprefixer');
  module.exports = {
    extensions: true
    webpack: {
      postcss: [
        autoprefixer({
          browsers: ['last 2 versions'],
        }),
      ],
    }
  };
  ```

### Configs
See [/lib/build/makeBuild](https://github.com/schwers/r-build/blob/master/lib/makeBuild.js) and [/bin/buildBlueprints.js](https://github.com/schwers/r-build/blob/master/bin/buildBlueprints.js) To understand more how builds work.

In practice, say you have a simple client you want to build with less, css, es6/7, and you want it to watch. you would run `buildBlueprints -c -w`, or you could define your own (in this case equivalent) config in a `blueprints.config.js` with the contents:

```javascript
module.exports = [{
  name: 'Client',
  webpack: {
    entry: './lib/Client.es6.js',
    output: {
      generator: 'simple',
      dest: './bin',
    },
    resolve: {
      generator: 'npm-and-modules',
      extensions: ['', '.js', '.jsx', 'es6.js', '.json'],
    },
    loaders: [
      'esnextreact',
      'json',
      'css',
      'less',
    ],
    plugins: [
      'extract-css',
      'abort-if-errors',
    ],
  },
}];
```

## Future goals
* automatically managing of peer-depedencies for smaller builds. Right now there's tree shaking and you can target UMD, but it'd be nice to see how far we can take the optimizations.
* Self-hosting: build build with build, check in a compiled copy, which would be the in `/bin` and then write new developments of build in es6/7
