import "./Hello.less";
import React from 'react';

export default (props) => {
  return (
    <div className='Hello'>
      <div className='Hello__text'>Hello</div>
      <div className='Hello__subtext'>Welcome to the Future</div>
      <div className='Hello__children'>
        { props.children }
      </div>
    </div>
  );
};
