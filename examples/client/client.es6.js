import React from 'react';
import lodash from 'lodash'; // also unused

const Hellow = (props) => {
  return (
    <div className='foo'>
      <div className='bar'>Hello</div>
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

React.render(<Hello />, document.getElementById('react-container'));
