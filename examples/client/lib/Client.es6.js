/*
  try building with 'blueprints -i --client --production'
    : -w || --watch if you want to experiment

  if you're developing blueprints:
      build with something like node /../../bin/index.js -i -c -p -w

  The file size for this minifed, with React, React Dom, Lodash, and owrn own code is 141KB.
  Note how the production minifed build of React Dom on Facebooks site is 143KB,
  that's where most of the size comes from.

  Lodash is being heavily tree-shaken in this example because of babel-plugin-lodash-loader
  (it's enabled in /lib/generators/loaders/ESNextReactLoader.js). Without it this
  build would be 190KB (minified, NOT gzipped).

  Still looking into tree-shaking react-dom if possible but it seems unlikely.

  The React components Unused and AsloUnused are removed as well automatically by
  webpack's tree shaking.

  For developing: you can use git@github.com:ksmith97/GzipSimpleHTTPServer.git
  to run a very simple webserver that automatically gzips things.
  Min & gzipped sizes comapred to reddit-mobile?
  Reddit Mobile: 347 KB
  This: 42KB

  Update: After adding less/css loaders the build size increased 4KB from 141KB minified
  to 145KB. Really not sure what's happening, it looks like webpack add somes cruft for the loaders.
  I'll try to find a better way to do that later.
*/
import React from 'react';
import ReactDom from 'react-dom';
import { omit } from 'lodash'; // mostly unused, thanks to the babel-lodash-loader
import Hello from './components/Hello/Hello';

const HelloWrapper = (props) => {
  const ommited = omit(props, 'ommited');

  return (
    <div classname='foo'>
      <Hello {...ommited} />
    </div>
  );
};

const Unused = (props) => {
  return (
    <div className='verify-im-not-included'>
      <div className='tree-shaking-yo' />
    </div>
  );
};

const AlsoUnused = (props) => {
  return (
    <div className='verify-im-not-included-either'>
      <div className='foobar-tree-shaking' />
    </div>
  );
};

console.log('rendering');
ReactDom.render(<HelloWrapper />, document.getElementById('react-container'));
